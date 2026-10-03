/**
 * SpeakSmart Kids - Child-Friendly Report Card Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { renderBottomNav, bindBottomNav } from './homeScreen.js';

export function renderReportCardScreen(container, navigateTo) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;

  function getScoreColorClass(score) {
    if (score >= 80) return { bg: 'bg-emerald-500', text: 'text-emerald-700', lightBg: 'bg-emerald-50', border: 'border-emerald-200', tag: 'Awesome!' };
    if (score >= 50) return { bg: 'bg-amber-500', text: 'text-amber-700', lightBg: 'bg-amber-50', border: 'border-amber-200', tag: 'Keep Going!' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', lightBg: 'bg-rose-50', border: 'border-rose-200', tag: 'Needs Practice' };
  }

  const vocabStyle = getScoreColorClass(userData.vocabularyScore);
  const speakStyle = getScoreColorClass(userData.speakingScore);
  const activityPct = Math.min(100, userData.completedActivitiesCount * 10);
  const actStyle = getScoreColorClass(activityPct);

  container.innerHTML = `
    <div class="min-h-screen pb-24 bg-indigo-50 flex flex-col items-center">
      
      <!-- Top Bar -->
      <div class="w-full bg-white shadow-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
        <div class="max-w-md mx-auto flex items-center justify-between">
          <button id="btn-report-back" class="flex items-center gap-1 font-extrabold text-sm text-slate-600 hover:text-indigo-600">
            <span class="text-xl">⬅️</span> Back
          </button>
          <div class="flex items-center gap-1.5 font-extrabold text-indigo-700 text-base">
            <span>📊 Progress Report</span>
          </div>
          <div class="bg-indigo-100 text-indigo-700 font-extrabold px-3 py-1 rounded-full text-xs">
            ${userData.childName}
          </div>
        </div>
      </div>

      <div class="w-full max-w-md px-4 pt-4 flex flex-col gap-4 flex-1">

        <!-- Character Report Summary Header -->
        <div class="bg-white rounded-3xl p-4 shadow-md border-2 border-indigo-100 flex items-center gap-4">
          <div class="w-20 h-20 flex-shrink-0 animate-bounce-gentle">
            ${character.svg('happy')}
          </div>
          <div>
            <span class="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full font-extrabold">Report Summary</span>
            <h3 class="font-extrabold text-lg text-slate-800 mt-1">Super Job, ${userData.childName}!</h3>
            <p class="text-xs text-slate-500 font-bold">"You are making fantastic progress in English!"</p>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="flex flex-col gap-3">
          
          <!-- Vocabulary Score Card -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border ${vocabStyle.border}">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl">📚</span>
                <span class="font-extrabold text-slate-800 text-sm">Vocabulary Skill</span>
              </div>
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${vocabStyle.lightBg} ${vocabStyle.text}">
                ${vocabStyle.tag} (${userData.vocabularyScore}%)
              </span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
              <div class="${vocabStyle.bg} h-full rounded-full transition-all duration-500" style="width: ${userData.vocabularyScore}%"></div>
            </div>
          </div>

          <!-- Speaking Score Card -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border ${speakStyle.border}">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🗣️</span>
                <span class="font-extrabold text-slate-800 text-sm">Speaking Fluency</span>
              </div>
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${speakStyle.lightBg} ${speakStyle.text}">
                ${speakStyle.tag} (${userData.speakingScore}%)
              </span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
              <div class="${speakStyle.bg} h-full rounded-full transition-all duration-500" style="width: ${userData.speakingScore}%"></div>
            </div>
          </div>

          <!-- Activity Completion Card -->
          <div class="bg-white rounded-2xl p-4 shadow-sm border ${actStyle.border}">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🎮</span>
                <span class="font-extrabold text-slate-800 text-sm">Activity Completion</span>
              </div>
              <span class="text-xs font-extrabold px-2.5 py-1 rounded-full ${actStyle.lightBg} ${actStyle.text}">
                ${userData.completedActivitiesCount} Tasks
              </span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200">
              <div class="${actStyle.bg} h-full rounded-full transition-all duration-500" style="width: ${activityPct}%"></div>
            </div>
          </div>

        </div>

        <!-- Overall Highlights -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-amber-100 border border-amber-300 rounded-2xl p-3 text-center">
            <span class="text-3xl">🔥</span>
            <h4 class="font-extrabold text-amber-900 text-sm mt-1">Daily Streak</h4>
            <p class="text-2xl font-extrabold text-amber-700">${userData.streak} Days</p>
          </div>
          <div class="bg-purple-100 border border-purple-300 rounded-2xl p-3 text-center">
            <span class="text-3xl">⭐</span>
            <h4 class="font-extrabold text-purple-900 text-sm mt-1">Total Stars</h4>
            <p class="text-2xl font-extrabold text-purple-700">${userData.stars}</p>
          </div>
        </div>

        <!-- Management Actions -->
        <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col gap-2">
          <h4 class="font-extrabold text-slate-700 text-xs uppercase tracking-wider">Account Settings</h4>
          <button id="btn-reset-data" class="text-xs font-bold text-rose-600 hover:text-rose-800 text-left py-1 flex items-center gap-1">
            <span>🗑️ Reset All Local Progress Data</span>
          </button>
        </div>

      </div>

      <!-- Bottom Global Nav -->
      ${renderBottomNav('report')}
    </div>
  `;

  container.querySelector('#btn-report-back')?.addEventListener('click', () => {
    sounds.playPop();
    navigateTo('home');
  });

  container.querySelector('#btn-reset-data')?.addEventListener('click', () => {
    sounds.playPop();
    if (confirm("Are you sure you want to reset your local stars and progress?")) {
      storage.resetAll();
      renderReportCardScreen(container, navigateTo);
    }
  });

  bindBottomNav(container, navigateTo);
}
