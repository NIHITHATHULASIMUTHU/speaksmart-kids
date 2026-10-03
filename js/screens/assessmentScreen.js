/**
 * SpeakSmart Kids - Weekly Assessment & Certificate Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { WEEKLY_ASSESSMENT } from '../data/curriculum.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';
import { renderBottomNav, bindBottomNav } from './homeScreen.js';

export function renderAssessmentScreen(container, navigateTo) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;

  let stepIndex = 0;
  let correctCount = 0;
  let isCompleted = false;
  let userSentenceWords = [];

  function render() {
    if (isCompleted) {
      renderCertificate();
      return;
    }

    const question = WEEKLY_ASSESSMENT[stepIndex];

    container.innerHTML = `
      <div class="min-h-screen pb-24 bg-indigo-50 flex flex-col items-center">
        
        <!-- Header -->
        <div class="w-full bg-white shadow-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
          <div class="max-w-md mx-auto flex items-center justify-between">
            <button id="btn-quiz-back" class="flex items-center gap-1 font-extrabold text-sm text-slate-600 hover:text-indigo-600">
              <span class="text-xl">⬅️</span> Back
            </button>
            <div class="flex items-center gap-1.5 font-extrabold text-amber-600 text-base">
              <span>🏆 Weekly Assessment</span>
            </div>
            <span class="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
              Q${stepIndex + 1} / ${WEEKLY_ASSESSMENT.length}
            </span>
          </div>
        </div>

        <div class="w-full max-w-md px-4 pt-4 flex flex-col items-center gap-4 flex-1">

          <!-- Mascot Progress Indicator -->
          <div class="w-full bg-white rounded-2xl p-3 shadow-sm border border-slate-200 flex items-center gap-3">
            <div class="w-12 h-12 flex-shrink-0">
              ${character.svg('happy')}
            </div>
            <div class="flex-1">
              <div class="flex justify-between text-xs font-bold text-slate-600 mb-1">
                <span>Test Progress</span>
                <span>${Math.round((stepIndex / WEEKLY_ASSESSMENT.length) * 100)}%</span>
              </div>
              <div class="w-full bg-slate-150 rounded-full h-3 bg-slate-100 border border-slate-200 overflow-hidden">
                <div class="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-300" style="width: ${(stepIndex / WEEKLY_ASSESSMENT.length) * 100}%"></div>
              </div>
            </div>
          </div>

          <!-- Question Card -->
          <div class="bg-white rounded-3xl p-6 shadow-xl w-full border-4 border-amber-300 flex flex-col items-center text-center">
            <span class="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-extrabold uppercase">
              ${question.type === 'word' ? 'Word Recognition' : question.type === 'sentence' ? 'Sentence Builder' : 'Speaking Challenge'}
            </span>

            <h3 class="text-xl font-extrabold text-slate-800 mt-3 mb-4">
              ${question.question}
            </h3>

            <!-- Dynamic Question Content -->
            <div class="w-full">
              ${renderQuestionBody(question)}
            </div>
          </div>

        </div>

        <!-- Bottom Global Nav -->
        ${renderBottomNav('assessment')}
      </div>
    `;

    bindEvents(question);
    bindBottomNav(container, navigateTo);
  }

  function renderQuestionBody(question) {
    if (question.type === 'word') {
      return `
        <div class="flex flex-col gap-2.5 w-full">
          ${question.options.map((opt, idx) => `
            <button data-option-idx="${idx}" class="btn-kid btn-kid-primary w-full py-3.5 rounded-2xl font-extrabold text-lg text-white shadow-md">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      `;
    }

    if (question.type === 'sentence') {
      return `
        <div class="flex flex-col items-center gap-3 w-full">
          <div class="w-full min-h-[60px] bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-2xl p-2 flex flex-wrap items-center justify-center gap-2">
            ${userSentenceWords.length === 0 ? '<span class="text-slate-400 text-xs font-bold">Tap word pills below</span>' : ''}
            ${userSentenceWords.map((w, idx) => `
              <span class="bg-indigo-600 text-white font-extrabold px-3 py-1.5 rounded-xl text-sm">${w}</span>
            `).join('')}
          </div>

          <div class="flex flex-wrap items-center justify-center gap-2 w-full mt-2">
            ${question.words.map(w => `
              <button data-sentence-pill="${w}" class="btn-kid btn-kid-yellow px-4 py-2 rounded-2xl font-extrabold text-sm">
                ${w}
              </button>
            `).join('')}
          </div>

          <button id="btn-submit-sentence-quiz" class="btn-kid btn-kid-green w-full mt-3 py-3 rounded-2xl font-extrabold text-base">
            SUBMIT ANSWER
          </button>
        </div>
      `;
    }

    if (question.type === 'speaking') {
      return `
        <div class="flex flex-col items-center gap-4 w-full">
          <button id="btn-listen-target-quiz" class="btn-kid btn-kid-yellow px-4 py-2 rounded-2xl text-xs font-extrabold">
            🔊 Hear Model Sentence
          </button>

          <button id="btn-speak-quiz-mic" class="btn-kid btn-kid-pink w-full py-4 rounded-3xl font-extrabold text-lg flex items-center justify-center gap-2 shadow-lg">
            <span>🎙️</span>
            <span>TAP & SPEAK OUT LOUD</span>
          </button>

          <button id="btn-skip-speaking-quiz" class="text-xs font-bold text-slate-500 hover:text-indigo-600">
            Submit Speaking Attempt ➡️
          </button>
        </div>
      `;
    }

    return '';
  }

  function bindEvents(question) {
    container.querySelector('#btn-quiz-back')?.addEventListener('click', () => {
      sounds.playPop();
      navigateTo('home');
    });

    if (question.type === 'word') {
      container.querySelectorAll('[data-option-idx]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          const idx = parseInt(e.currentTarget.getAttribute('data-option-idx'));
          if (question.options[idx].isCorrect) {
            sounds.playCorrect();
            correctCount++;
          } else {
            sounds.playTryAgain();
          }
          advanceQuiz();
        });
      });
    }

    if (question.type === 'sentence') {
      container.querySelectorAll('[data-sentence-pill]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          sounds.playPop();
          const word = e.currentTarget.getAttribute('data-sentence-pill');
          userSentenceWords.push(word);
          render();
        });
      });

      container.querySelector('#btn-submit-sentence-quiz')?.addEventListener('click', () => {
        sounds.playPop();
        if (userSentenceWords.join(' ') === question.target) {
          sounds.playCorrect();
          correctCount++;
        } else {
          sounds.playTryAgain();
        }
        userSentenceWords = [];
        advanceQuiz();
      });
    }

    if (question.type === 'speaking') {
      container.querySelector('#btn-listen-target-quiz')?.addEventListener('click', () => {
        sounds.playPop();
        speech.speak(question.target, character.pitch, character.rate);
      });

      container.querySelector('#btn-speak-quiz-mic')?.addEventListener('click', () => {
        sounds.playPop();
        sounds.playCorrect();
        correctCount++;
        advanceQuiz();
      });

      container.querySelector('#btn-skip-speaking-quiz')?.addEventListener('click', () => {
        sounds.playPop();
        correctCount++;
        advanceQuiz();
      });
    }
  }

  function advanceQuiz() {
    if (stepIndex < WEEKLY_ASSESSMENT.length - 1) {
      stepIndex++;
      render();
    } else {
      isCompleted = true;
      const scorePct = Math.round((correctCount / WEEKLY_ASSESSMENT.length) * 100);
      storage.completeAssessment(scorePct);
      if (window.confetti) {
        window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      }
      sounds.playFanfare();
      render();
    }
  }

  function renderCertificate() {
    const scorePct = Math.round((correctCount / WEEKLY_ASSESSMENT.length) * 100);

    container.innerHTML = `
      <div class="min-h-screen pb-24 bg-gradient-to-b from-amber-500 to-orange-600 text-white flex flex-col items-center justify-center p-4">
        
        <div class="bg-white text-slate-800 rounded-3xl p-6 shadow-2xl max-w-md w-full border-8 border-yellow-300 text-center flex flex-col items-center gap-4 animate-pop-in">
          
          <div class="w-20 h-20 animate-bounce-gentle">
            ${character.svg('happy')}
          </div>

          <div class="border-b-2 border-amber-200 pb-3 w-full">
            <span class="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-extrabold uppercase">Official Certificate</span>
            <h2 class="text-3xl font-extrabold text-amber-600 mt-2">WEEKLY HERO!</h2>
            <p class="text-xs text-slate-500 font-bold mt-0.5">Awarded to: <span class="text-indigo-600">${userData.childName}</span></p>
          </div>

          <div class="flex items-center gap-4 my-2">
            <div class="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
              <span class="text-xs font-extrabold text-amber-700">Quiz Score</span>
              <p class="text-3xl font-extrabold text-amber-600">${scorePct}%</p>
            </div>
            <div class="bg-indigo-50 p-4 rounded-2xl border border-indigo-200 text-center">
              <span class="text-xs font-extrabold text-indigo-700">Stars Earned</span>
              <p class="text-3xl font-extrabold text-indigo-600">+30 ⭐</p>
            </div>
          </div>

          <p class="text-sm font-bold text-slate-700 bg-amber-50 p-3 rounded-2xl border border-amber-100">
            "${character.name}: You demonstrated awesome vocabulary and sentence skills!"
          </p>

          <button id="btn-cert-done" class="btn-kid btn-kid-yellow w-full py-4 rounded-2xl font-extrabold text-xl shadow-lg mt-2">
            🚀 RETURN TO HOME
          </button>

        </div>

      </div>
    `;

    container.querySelector('#btn-cert-done')?.addEventListener('click', () => {
      sounds.playPop();
      navigateTo('home');
    });
  }

  render();
}
