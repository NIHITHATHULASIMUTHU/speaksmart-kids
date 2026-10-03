/**
 * SpeakSmart Kids - Interactive Activity Screen (Flashcards, Matching, Sentence, Listen & Repeat)
 */

import { CHARACTERS } from '../data/characters.js';
import { CURRICULUM } from '../data/curriculum.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';
import { renderBottomNav, bindBottomNav } from './homeScreen.js';

export function renderActivityScreen(container, navigateTo, params = {}) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;
  const currentLevelData = CURRICULUM[userData.currentLevel] || CURRICULUM.beginner;
  const activityType = params.type || 'flashcards';

  let currentIndex = 0;
  let isFlipped = false;
  let starsEarned = 0;

  // Matching game state
  let selectedPicture = null;
  let selectedWord = null;
  let matchedIds = [];

  // Sentence builder state
  let currentSentenceIndex = 0;
  let builtWords = [];

  function render() {
    let activityTitle = 'Flashcards';
    let activityIcon = '🎴';

    if (activityType === 'matching') {
      activityTitle = 'Word-Picture Match';
      activityIcon = '🧩';
    } else if (activityType === 'sentence') {
      activityTitle = 'Sentence Builder';
      activityIcon = '🔤';
    } else if (activityType === 'listen_repeat') {
      activityTitle = 'Listen & Repeat';
      activityIcon = '🗣️';
    }

    container.innerHTML = `
      <div class="min-h-screen pb-24 bg-indigo-50 flex flex-col items-center">
        
        <!-- Header -->
        <div class="w-full bg-white shadow-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
          <div class="max-w-md mx-auto flex items-center justify-between">
            <button id="btn-back-home" class="flex items-center gap-1 text-slate-600 font-extrabold text-sm hover:text-indigo-600">
              <span class="text-xl">⬅️</span> Back
            </button>
            <div class="flex items-center gap-2">
              <span class="text-xl">${activityIcon}</span>
              <h2 class="font-extrabold text-slate-800 text-base">${activityTitle}</h2>
            </div>
            <div class="bg-amber-100 px-3 py-1 rounded-full font-extrabold text-amber-700 text-xs flex items-center gap-1">
              <span>⭐</span> ${userData.stars}
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="w-full max-w-md px-4 pt-4 flex flex-col items-center flex-1">
          
          <!-- Character Mini Guidance -->
          <div class="w-full bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex items-center gap-3 mb-4">
            <div class="w-12 h-12 flex-shrink-0">
              ${character.svg('happy')}
            </div>
            <p id="activity-guide-text" class="text-xs sm:text-sm font-bold text-slate-700">
              "${getGuidanceText(activityType, character.name)}"
            </p>
          </div>

          <!-- Activity Dynamic Body -->
          <div id="activity-body-container" class="w-full flex-1 flex flex-col items-center justify-center">
            ${renderActivityContent()}
          </div>

        </div>

        <!-- Bottom Global Nav -->
        ${renderBottomNav('')}
      </div>
    `;

    bindEvents();
    bindBottomNav(container, navigateTo);
  }

  function getGuidanceText(type, name) {
    switch (type) {
      case 'flashcards': return `${name}: Tap the card to flip it and hear the word!`;
      case 'matching': return `${name}: Tap a picture then tap the matching word!`;
      case 'sentence': return `${name}: Tap the word blocks in the right order!`;
      case 'listen_repeat': return `${name}: Listen carefully then tap the mic to speak!`;
      default: return `${name}: Let's play and learn!`;
    }
  }

  function renderActivityContent() {
    if (activityType === 'flashcards') {
      const card = currentLevelData.flashcards[currentIndex];
      return `
        <div class="w-full flex flex-col items-center gap-4">
          <!-- 3D Flip Card Container -->
          <div id="flashcard-element" class="flip-card w-full h-72 cursor-pointer ${isFlipped ? 'flipped' : ''}">
            <div class="flip-card-inner shadow-xl">
              
              <!-- Front Side -->
              <div class="flip-card-front bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white flex flex-col items-center justify-between border-4 border-yellow-300">
                <span class="bg-white/20 text-xs px-3 py-1 rounded-full font-bold">Category: ${card.category}</span>
                <div class="text-7xl animate-float my-2">${card.emoji}</div>
                <div class="text-center">
                  <h3 class="text-3xl font-extrabold text-yellow-300 tracking-wide">${card.word}</h3>
                  <p class="text-xs text-indigo-200 font-semibold mt-1">Tap card to see example 🔄</p>
                </div>
              </div>

              <!-- Back Side -->
              <div class="flip-card-back bg-white p-6 text-slate-800 flex flex-col items-center justify-between border-4 border-indigo-400">
                <span class="text-4xl">${card.emoji}</span>
                <div class="text-center">
                  <h3 class="text-2xl font-extrabold text-indigo-700">${card.word}</h3>
                  <p class="text-sm font-semibold text-slate-500 italic mt-0.5">${card.phonetic}</p>
                  <p class="text-base font-bold text-slate-800 mt-3 bg-indigo-50 p-3 rounded-2xl border border-indigo-100">
                    "${card.sentence}"
                  </p>
                </div>
                <button id="btn-speak-sentence" class="btn-kid btn-kid-primary px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1">
                  <span>🔊 Speak Sentence</span>
                </button>
              </div>

            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-between w-full mt-2">
            <button id="btn-prev-card" class="btn-kid btn-kid-purple px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-1" ${currentIndex === 0 ? 'disabled opacity-50' : ''}>
              <span>⬅️ Prev</span>
            </button>
            <button id="btn-speak-word" class="btn-kid btn-kid-yellow px-5 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-1.5 shadow-md">
              <span>🔊 Pronounce</span>
            </button>
            <button id="btn-next-card" class="btn-kid btn-kid-green px-4 py-2.5 rounded-2xl font-extrabold text-xs flex items-center gap-1">
              <span>Next ➡️</span>
            </button>
          </div>

          <!-- Card Counter -->
          <span class="text-xs font-bold text-slate-500">Card ${currentIndex + 1} of ${currentLevelData.flashcards.length}</span>
        </div>
      `;
    }

    if (activityType === 'matching') {
      const items = currentLevelData.matching;
      const pictures = [...items].sort(() => 0.5 - Math.random());
      const words = [...items].sort(() => 0.5 - Math.random());

      return `
        <div class="w-full flex flex-col items-center gap-4">
          <p class="text-xs font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
            Matches Completed: ${matchedIds.length} / ${items.length}
          </p>

          <!-- Matching Columns -->
          <div class="grid grid-cols-2 gap-3 w-full">
            
            <!-- Pictures Column -->
            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-extrabold text-slate-500 uppercase tracking-wider text-center">Pictures</h4>
              ${pictures.map(item => `
                <button 
                  data-match-pic="${item.id}"
                  class="btn-match-pic bg-white border-3 p-3 rounded-2xl shadow-sm flex items-center justify-center text-4xl transition-all ${matchedIds.includes(item.id) ? 'opacity-40 border-emerald-400 bg-emerald-50' : selectedPicture === item.id ? 'border-indigo-600 bg-indigo-100 scale-105 shadow-md' : 'border-slate-200 hover:border-indigo-300'}"
                  ${matchedIds.includes(item.id) ? 'disabled' : ''}
                >
                  <span>${item.emoji}</span>
                </button>
              `).join('')}
            </div>

            <!-- Words Column -->
            <div class="flex flex-col gap-2">
              <h4 class="text-xs font-extrabold text-slate-500 uppercase tracking-wider text-center">Words</h4>
              ${words.map(item => `
                <button 
                  data-match-word="${item.id}"
                  class="btn-match-word bg-white border-3 p-3 rounded-2xl shadow-sm flex items-center justify-center font-extrabold text-slate-800 text-base transition-all ${matchedIds.includes(item.id) ? 'opacity-40 border-emerald-400 bg-emerald-50' : selectedWord === item.id ? 'border-indigo-600 bg-indigo-100 scale-105 shadow-md' : 'border-slate-200 hover:border-indigo-300'}"
                  ${matchedIds.includes(item.id) ? 'disabled' : ''}
                >
                  <span>${item.word}</span>
                </button>
              `).join('')}
            </div>

          </div>
        </div>
      `;
    }

    if (activityType === 'sentence') {
      const sentenceObj = currentLevelData.sentenceBuilding[currentSentenceIndex];
      const scrambled = [...sentenceObj.words].sort(() => 0.5 - Math.random());

      return `
        <div class="w-full flex flex-col items-center gap-4">
          
          <div class="bg-indigo-600 text-white rounded-2xl p-4 w-full text-center shadow-md">
            <span class="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Hint</span>
            <p class="text-sm font-semibold mt-1 text-yellow-200">"${sentenceObj.hint}"</p>
          </div>

          <!-- Target Drop Box -->
          <div id="sentence-target-box" class="w-full min-h-[80px] bg-white border-3 border-dashed border-indigo-300 rounded-3xl p-3 flex flex-wrap items-center justify-center gap-2 shadow-inner">
            ${builtWords.length === 0 ? '<span class="text-slate-400 text-xs font-bold">Tap word pills below to form sentence</span>' : ''}
            ${builtWords.map((w, idx) => `
              <button data-remove-word-idx="${idx}" class="bg-indigo-600 text-white font-extrabold px-3.5 py-2 rounded-2xl text-sm shadow-sm flex items-center gap-1 hover:bg-indigo-700">
                <span>${w}</span>
                <span class="text-xs opacity-75">✕</span>
              </button>
            `).join('')}
          </div>

          <!-- Word Pills Pool -->
          <div class="flex flex-wrap items-center justify-center gap-2 w-full mt-2">
            ${scrambled.map((w, idx) => `
              <button data-add-word="${w}" class="btn-kid btn-kid-yellow px-4 py-2.5 rounded-2xl font-extrabold text-sm shadow">
                ${w}
              </button>
            `).join('')}
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-3 w-full mt-4">
            <button id="btn-reset-sentence" class="btn-kid btn-kid-purple py-3 px-4 rounded-2xl font-extrabold text-xs">
              🔄 Reset
            </button>
            <button id="btn-check-sentence" class="btn-kid btn-kid-green py-3 px-6 rounded-2xl font-extrabold text-base flex-1 shadow-lg">
              ✨ CHECK SENTENCE
            </button>
          </div>

        </div>
      `;
    }

    if (activityType === 'listen_repeat') {
      const item = currentLevelData.listenRepeat[currentIndex];
      return `
        <div class="w-full flex flex-col items-center gap-5 text-center">
          
          <!-- Character Animated Avatar -->
          <div class="w-36 h-36 animate-bounce-gentle">
            ${character.svg('happy')}
          </div>

          <!-- Prompt Card -->
          <div class="bg-white rounded-3xl p-6 shadow-md border-3 border-indigo-200 w-full">
            <span class="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold">Target Sentence</span>
            <h3 class="text-2xl font-extrabold text-indigo-900 mt-2">"${item.text}"</h3>
            <p class="text-xs text-slate-500 font-semibold mt-1">"${item.hint}"</p>

            <button id="btn-listen-prompt" class="btn-kid btn-kid-yellow mt-4 px-5 py-2.5 rounded-2xl font-extrabold text-sm inline-flex items-center gap-2">
              <span>🔊 Listen to Character</span>
            </button>
          </div>

          <!-- Mic Speak Trigger -->
          <button id="btn-repeat-mic" class="btn-kid btn-kid-pink w-full py-5 rounded-3xl font-extrabold text-xl flex items-center justify-center gap-3 shadow-xl animate-pulse-ring">
            <span class="text-3xl">🎙️</span>
            <span>TAP TO SPEAK OUT LOUD</span>
          </button>

          <!-- Feedback Status Box -->
          <div id="repeat-feedback-box" class="min-h-[50px] w-full flex items-center justify-center">
            <span class="text-xs font-bold text-slate-400">Tap button above and speak into your mic!</span>
          </div>

        </div>
      `;
    }

    return '';
  }

  function bindEvents() {
    // Back home button
    const backBtn = container.querySelector('#btn-back-home');
    backBtn?.addEventListener('click', () => {
      sounds.playPop();
      navigateTo('home');
    });

    if (activityType === 'flashcards') {
      const cardEl = container.querySelector('#flashcard-element');
      const speakWordBtn = container.querySelector('#btn-speak-word');
      const speakSentenceBtn = container.querySelector('#btn-speak-sentence');
      const nextBtn = container.querySelector('#btn-next-card');
      const prevBtn = container.querySelector('#btn-prev-card');

      cardEl?.addEventListener('click', (e) => {
        if (e.target.closest('#btn-speak-sentence')) return;
        sounds.playPop();
        isFlipped = !isFlipped;
        cardEl.classList.toggle('flipped', isFlipped);
      });

      speakWordBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playPop();
        const card = currentLevelData.flashcards[currentIndex];
        speech.speak(card.word, character.pitch, character.rate);
      });

      speakSentenceBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        sounds.playPop();
        const card = currentLevelData.flashcards[currentIndex];
        speech.speak(card.sentence, character.pitch, character.rate);
      });

      nextBtn?.addEventListener('click', () => {
        sounds.playPop();
        if (currentIndex < currentLevelData.flashcards.length - 1) {
          currentIndex++;
          isFlipped = false;
          storage.addStars(2);
          storage.incrementActivityCount();
          render();
        } else {
          showCompletionModal("Flashcards Completed!", "You earned +10 Stars!");
        }
      });

      prevBtn?.addEventListener('click', () => {
        sounds.playPop();
        if (currentIndex > 0) {
          currentIndex--;
          isFlipped = false;
          render();
        }
      });
    }

    if (activityType === 'matching') {
      container.querySelectorAll('.btn-match-pic').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          selectedPicture = e.currentTarget.getAttribute('data-match-pic');
          checkMatchingPair();
          render();
        });
      });

      container.querySelectorAll('.btn-match-word').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          selectedWord = e.currentTarget.getAttribute('data-match-word');
          checkMatchingPair();
          render();
        });
      });
    }

    if (activityType === 'sentence') {
      container.querySelectorAll('[data-add-word]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          const word = e.currentTarget.getAttribute('data-add-word');
          builtWords.push(word);
          render();
        });
      });

      container.querySelectorAll('[data-remove-word-idx]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          const idx = parseInt(e.currentTarget.getAttribute('data-remove-word-idx'));
          builtWords.splice(idx, 1);
          render();
        });
      });

      container.querySelector('#btn-reset-sentence')?.addEventListener('click', () => {
        sounds.playPop();
        builtWords = [];
        render();
      });

      container.querySelector('#btn-check-sentence')?.addEventListener('click', () => {
        const sentenceObj = currentLevelData.sentenceBuilding[currentSentenceIndex];
        const userSentence = builtWords.join(' ');
        if (userSentence === sentenceObj.target) {
          sounds.playCorrect();
          speech.speak(sentenceObj.target, character.pitch, character.rate);
          storage.addStars(5);
          storage.incrementActivityCount();
          
          if (currentSentenceIndex < currentLevelData.sentenceBuilding.length - 1) {
            currentSentenceIndex++;
            builtWords = [];
            setTimeout(() => render(), 1200);
          } else {
            showCompletionModal("Sentence Master!", "You built all sentences perfectly! +15 Stars!");
          }
        } else {
          sounds.playTryAgain();
          speech.speak("Try again!", character.pitch, character.rate);
        }
      });
    }

    if (activityType === 'listen_repeat') {
      const item = currentLevelData.listenRepeat[currentIndex];

      container.querySelector('#btn-listen-prompt')?.addEventListener('click', () => {
        sounds.playPop();
        speech.speak(item.text, character.pitch, character.rate);
      });

      container.querySelector('#btn-repeat-mic')?.addEventListener('click', () => {
        sounds.playPop();
        const feedbackBox = container.querySelector('#repeat-feedback-box');
        if (feedbackBox) {
          feedbackBox.innerHTML = `
            <div class="flex items-center gap-2 text-indigo-600 font-extrabold text-sm animate-pulse">
              <div class="wave-bar"></div><div class="wave-bar"></div><div class="wave-bar"></div>
              <span>Listening to your voice... Speak now!</span>
            </div>
          `;
        }

        speech.listen(
          (transcript) => {
            if (transcript.includes(item.text.toLowerCase().slice(0, 4))) {
              sounds.playCorrect();
              sounds.playStar();
              storage.addStars(5);
              storage.updateSpeakingScore(95);
              if (feedbackBox) {
                feedbackBox.innerHTML = `
                  <div class="bg-emerald-100 border border-emerald-400 text-emerald-800 font-extrabold px-4 py-2 rounded-2xl text-sm animate-pop-in">
                    🌟 GREAT JOB! "You pronounced it amazingly!" +5 Stars!
                  </div>
                `;
              }
            } else {
              sounds.playCorrect();
              storage.addStars(3);
              if (feedbackBox) {
                feedbackBox.innerHTML = `
                  <div class="bg-amber-100 border border-amber-400 text-amber-800 font-extrabold px-4 py-2 rounded-2xl text-sm animate-pop-in">
                    👍 AWESOME ATTEMPT! "Keep practicing!" +3 Stars!
                  </div>
                `;
              }
            }
          },
          (err) => {
            // Simulated fallback for browsers without active mic permissions
            sounds.playCorrect();
            storage.addStars(5);
            storage.updateSpeakingScore(90);
            if (feedbackBox) {
              feedbackBox.innerHTML = `
                <div class="bg-emerald-100 border border-emerald-400 text-emerald-800 font-extrabold px-4 py-2 rounded-2xl text-sm animate-pop-in">
                  🌟 AWESOME VOICE! "+5 Stars awarded!"
                </div>
              `;
            }
          }
        );
      });
    }
  }

  function checkMatchingPair() {
    if (selectedPicture && selectedWord) {
      if (selectedPicture === selectedWord) {
        sounds.playCorrect();
        matchedIds.push(selectedPicture);
        storage.addStars(3);
        if (matchedIds.length === currentLevelData.matching.length) {
          sounds.playFanfare();
          storage.incrementActivityCount();
          setTimeout(() => {
            showCompletionModal("Matching Champion!", "You matched all pictures perfectly! +15 Stars!");
          }, 500);
        }
      } else {
        sounds.playTryAgain();
      }
      selectedPicture = null;
      selectedWord = null;
    }
  }

  function showCompletionModal(title, subtext) {
    if (window.confetti) {
      window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    sounds.playFanfare();

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-pop-in';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-6 text-center max-w-sm w-full border-4 border-yellow-300 shadow-2xl">
        <div class="text-6xl mb-2 animate-bounce-gentle">🏆</div>
        <h3 class="text-2xl font-extrabold text-indigo-900">${title}</h3>
        <p class="text-sm font-bold text-slate-600 mt-1">${subtext}</p>
        <button id="btn-modal-done" class="btn-kid btn-kid-yellow w-full mt-6 py-3.5 rounded-2xl font-extrabold text-lg">
          🚀 BACK TO HOME
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#btn-modal-done')?.addEventListener('click', () => {
      sounds.playPop();
      modal.remove();
      navigateTo('home');
    });
  }

  render();
}
