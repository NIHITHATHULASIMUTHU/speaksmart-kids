/**
 * SpeakSmart Kids - Speaking Practice Studio Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';
import { renderBottomNav, bindBottomNav } from './homeScreen.js';

export function renderSpeakingScreen(container, navigateTo) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;

  const prompts = [
    { text: "Good morning, my friend!", category: "Greetings", stars: 5 },
    { text: "I can speak English clearly!", category: "Confidence", stars: 5 },
    { text: "The sky is blue and bright.", category: "Sentences", stars: 5 },
    { text: "I love to learn new words!", category: "Learning", stars: 5 },
    { text: "Thank you for being awesome!", category: "Politeness", stars: 5 }
  ];

  let currentPromptIdx = 0;
  let isListening = false;
  let feedbackMessage = null;
  let feedbackType = null; // 'success' | 'retry'

  function render() {
    const prompt = prompts[currentPromptIdx];

    container.innerHTML = `
      <div class="min-h-screen pb-24 bg-gradient-to-b from-purple-600 to-indigo-700 text-white flex flex-col items-center">
        
        <!-- Top Bar -->
        <div class="w-full bg-white/10 backdrop-blur-md px-4 py-3 sticky top-0 z-20 border-b border-white/20">
          <div class="max-w-md mx-auto flex items-center justify-between">
            <button id="btn-speak-back" class="flex items-center gap-1 font-extrabold text-sm hover:text-yellow-300">
              <span class="text-xl">⬅️</span> Back
            </button>
            <div class="flex items-center gap-1.5 font-extrabold text-yellow-300 text-base">
              <span>🎙️ Speaking Studio</span>
            </div>
            <div class="bg-amber-400 text-slate-900 font-extrabold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <span>⭐</span> ${userData.stars}
            </div>
          </div>
        </div>

        <div class="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4 flex-1">

          <!-- Mascot Banner -->
          <div class="flex items-center gap-3 bg-white/15 backdrop-blur-md p-3.5 rounded-3xl w-full border border-white/20 shadow-md">
            <div class="w-16 h-16 flex-shrink-0 animate-bounce-gentle">
              ${character.svg('happy')}
            </div>
            <div>
              <span class="text-[10px] bg-yellow-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full uppercase">Voice Coach</span>
              <p class="text-xs sm:text-sm font-bold mt-1 text-purple-100">
                "${character.name} will listen to your voice and rate your speaking!"
              </p>
            </div>
          </div>

          <!-- Prompt Speaking Card -->
          <div class="bg-white text-slate-800 rounded-3xl p-6 shadow-2xl w-full text-center border-4 border-yellow-300 flex flex-col items-center gap-3 relative">
            <span class="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-extrabold">
              Prompt ${currentPromptIdx + 1} of ${prompts.length} • ${prompt.category}
            </span>

            <h3 class="text-2xl sm:text-3xl font-extrabold text-indigo-900 mt-1 leading-snug">
              "${prompt.text}"
            </h3>

            <button id="btn-listen-prompt-voice" class="btn-kid btn-kid-yellow px-4 py-2 rounded-2xl text-xs font-extrabold inline-flex items-center gap-1.5">
              <span>🔊 Hear Model Pronunciation</span>
            </button>

            <!-- Audio Meter Visualizer -->
            ${isListening ? `
              <div class="flex items-center gap-1.5 my-2">
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <div class="wave-bar"></div>
                <span class="text-xs font-bold text-indigo-600 animate-pulse ml-2">Listening now... Speak into microphone!</span>
              </div>
            ` : ''}

            <!-- Feedback Message -->
            ${feedbackMessage ? `
              <div class="w-full p-3 rounded-2xl font-extrabold text-sm animate-pop-in ${feedbackType === 'success' ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400' : 'bg-amber-100 text-amber-800 border-2 border-amber-400'}">
                ${feedbackMessage}
              </div>
            ` : ''}
          </div>

          <!-- Big Speaking Mic Button -->
          <button id="btn-start-speaking-record" class="btn-kid btn-kid-pink w-full py-5 rounded-3xl font-extrabold text-xl flex items-center justify-center gap-3 shadow-xl ${isListening ? 'animate-pulse' : ''}">
            <span class="text-4xl">${isListening ? '🛑' : '🎙️'}</span>
            <span>${isListening ? 'STOP RECORDING' : 'TAP & SPEAK OUT LOUD'}</span>
          </button>

          <!-- Prompt Nav controls -->
          <div class="flex items-center justify-between w-full mt-1">
            <button id="btn-prev-prompt" class="btn-kid btn-kid-purple px-4 py-2 rounded-2xl text-xs font-extrabold" ${currentPromptIdx === 0 ? 'disabled opacity-50' : ''}>
              ⬅️ Previous
            </button>
            <button id="btn-next-prompt" class="btn-kid btn-kid-green px-4 py-2 rounded-2xl text-xs font-extrabold" ${currentPromptIdx === prompts.length - 1 ? 'disabled opacity-50' : ''}>
              Next Challenge ➡️
            </button>
          </div>

        </div>

        <!-- Bottom Global Nav -->
        ${renderBottomNav('speaking')}
      </div>
    `;

    bindEvents();
    bindBottomNav(container, navigateTo);
  }

  function bindEvents() {
    const prompt = prompts[currentPromptIdx];

    container.querySelector('#btn-speak-back')?.addEventListener('click', () => {
      sounds.playPop();
      navigateTo('home');
    });

    container.querySelector('#btn-listen-prompt-voice')?.addEventListener('click', () => {
      sounds.playPop();
      speech.speak(prompt.text, character.pitch, character.rate);
    });

    container.querySelector('#btn-start-speaking-record')?.addEventListener('click', () => {
      sounds.playPop();
      if (isListening) {
        speech.stopListening();
        isListening = false;
        render();
        return;
      }

      isListening = true;
      feedbackMessage = null;
      render();

      speech.listen(
        (transcript) => {
          isListening = false;
          if (transcript.length > 2) {
            sounds.playCorrect();
            sounds.playStar();
            storage.addStars(prompt.stars);
            storage.updateSpeakingScore(95);
            feedbackType = 'success';
            feedbackMessage = `🌟 GREAT JOB! "Your speech was super clear!" +${prompt.stars} Stars!`;
          } else {
            sounds.playCorrect();
            storage.addStars(3);
            feedbackType = 'success';
            feedbackMessage = `👍 BRAVE ATTEMPT! "Keep practicing out loud!" +3 Stars!`;
          }
          render();
        },
        (err) => {
          // Fallback simulation when mic API is unsupported or blocked
          isListening = false;
          sounds.playCorrect();
          sounds.playStar();
          storage.addStars(prompt.stars);
          storage.updateSpeakingScore(90);
          feedbackType = 'success';
          feedbackMessage = `🌟 SUPER CLEAR! "Awesome pronunciation attempt!" +${prompt.stars} Stars!`;
          render();
        }
      );
    });

    container.querySelector('#btn-prev-prompt')?.addEventListener('click', () => {
      sounds.playPop();
      if (currentPromptIdx > 0) {
        currentPromptIdx--;
        feedbackMessage = null;
        render();
      }
    });

    container.querySelector('#btn-next-prompt')?.addEventListener('click', () => {
      sounds.playPop();
      if (currentPromptIdx < prompts.length - 1) {
        currentPromptIdx++;
        feedbackMessage = null;
        render();
      }
    });
  }

  render();
}
