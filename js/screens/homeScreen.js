/**
 * SpeakSmart Kids - Home Dashboard Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { CURRICULUM } from '../data/curriculum.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';

export function renderHomeScreen(container, navigateTo) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;
  const currentLevelObj = CURRICULUM[userData.currentLevel] || CURRICULUM.beginner;

  container.innerHTML = `
    <div class="min-h-screen pb-24 bg-indigo-50 flex flex-col items-center">
      
      <!-- Top Navigation Header -->
      <div class="w-full bg-white shadow-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
        <div class="max-w-md mx-auto flex items-center justify-between">
          
          <!-- Child Name & Avatar -->
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-full ${character.bgColor} border-2 ${character.borderColor} p-1">
              ${character.svg('happy')}
            </div>
            <div>
              <h2 class="font-extrabold text-slate-800 leading-tight text-base">
                Hi, ${userData.childName}!
              </h2>
              <span class="text-xs text-indigo-600 font-bold">Level: ${currentLevelObj.levelName}</span>
            </div>
          </div>

          <!-- Stats: Streak & Stars -->
          <div class="flex items-center gap-2">
            <div class="bg-orange-100 border border-orange-300 px-3 py-1 rounded-full flex items-center gap-1 font-bold text-orange-700 text-sm">
              <span>🔥</span>
              <span>${userData.streak}</span>
            </div>
            <div class="bg-amber-100 border border-amber-300 px-3 py-1 rounded-full flex items-center gap-1 font-bold text-amber-700 text-sm">
              <span>⭐</span>
              <span>${userData.stars}</span>
            </div>
          </div>

        </div>
      </div>

      <div class="w-full max-w-md px-4 pt-4 flex flex-col gap-4">

        <!-- Mascot Greeting Banner -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-4 text-white shadow-lg flex items-center gap-4 relative overflow-hidden">
          <div id="home-mascot" class="w-24 h-24 flex-shrink-0 animate-bounce-gentle cursor-pointer">
            ${character.svg('happy')}
          </div>
          <div class="flex-1 text-left">
            <span class="bg-white/20 text-xs px-2.5 py-0.5 rounded-full font-bold">Mascot Helper</span>
            <p id="home-speech-text" class="font-bold text-sm sm:text-base mt-1 text-yellow-200">
              "${character.greeting}"
            </p>
            <button id="btn-home-speak" class="mt-2 text-xs bg-yellow-400 text-slate-900 px-3 py-1 rounded-full font-extrabold flex items-center gap-1 shadow hover:bg-yellow-300 transition-colors">
              <span>🔊 Tap to Hear</span>
            </button>
          </div>
        </div>

        <!-- Level Selector Pills -->
        <div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-200 flex items-center justify-between gap-1">
          <button data-level="beginner" class="btn-level flex-1 py-2 rounded-xl font-bold text-xs transition-all ${userData.currentLevel === 'beginner' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}">
            🌱 Beginner
          </button>
          <button data-level="intermediate" class="btn-level flex-1 py-2 rounded-xl font-bold text-xs transition-all ${userData.currentLevel === 'intermediate' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}">
            🚀 Intermediate
          </button>
          <button data-level="advanced" class="btn-level flex-1 py-2 rounded-xl font-bold text-xs transition-all ${userData.currentLevel === 'advanced' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}">
            👑 Advanced
          </button>
        </div>

        <!-- Section Title -->
        <div class="flex items-center justify-between">
          <h3 class="font-extrabold text-slate-800 text-lg">Choose an Activity</h3>
          <span class="text-xs text-indigo-600 font-bold">${currentLevelObj.ageRange}</span>
        </div>

        <!-- Activity Cards Grid -->
        <div class="grid grid-cols-2 gap-3">
          
          <!-- Card 1: Flashcards -->
          <div data-activity="flashcards" class="btn-activity bg-white border-2 border-indigo-100 hover:border-indigo-400 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
              🎴
            </div>
            <h4 class="font-extrabold text-slate-800 text-base">Flashcards</h4>
            <p class="text-xs text-slate-500 font-medium mt-0.5">Learn words & picture audio</p>
            <span class="mt-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold">Play NOW</span>
          </div>

          <!-- Card 2: Matching Game -->
          <div data-activity="matching" class="btn-activity bg-white border-2 border-amber-100 hover:border-amber-400 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
              🧩
            </div>
            <h4 class="font-extrabold text-slate-800 text-base">Word Match</h4>
            <p class="text-xs text-slate-500 font-medium mt-0.5">Match words with pictures</p>
            <span class="mt-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold">Play NOW</span>
          </div>

          <!-- Card 3: Sentence Builder -->
          <div data-activity="sentence" class="btn-activity bg-white border-2 border-emerald-100 hover:border-emerald-400 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
              🔤
            </div>
            <h4 class="font-extrabold text-slate-800 text-base">Sentence Builder</h4>
            <p class="text-xs text-slate-500 font-medium mt-0.5">Build fun sentences</p>
            <span class="mt-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold">Play NOW</span>
          </div>

          <!-- Card 4: Listen & Repeat -->
          <div data-activity="listen_repeat" class="btn-activity bg-white border-2 border-pink-100 hover:border-pink-400 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center">
            <div class="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
              🗣️
            </div>
            <h4 class="font-extrabold text-slate-800 text-base">Listen & Repeat</h4>
            <p class="text-xs text-slate-500 font-medium mt-0.5">Speak out loud</p>
            <span class="mt-3 bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold">Play NOW</span>
          </div>

        </div>

        <!-- Featured Banner: Speaking Practice Studio -->
        <div data-nav="speaking" class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-4 text-white shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity border-2 border-purple-300">
          <div class="flex items-center gap-3">
            <div class="text-4xl bg-white/20 p-2.5 rounded-2xl">🎙️</div>
            <div>
              <h4 class="font-extrabold text-lg text-yellow-300">Speaking Studio</h4>
              <p class="text-xs text-purple-100">Practice your voice & earn stars!</p>
            </div>
          </div>
          <span class="bg-yellow-400 text-slate-900 font-extrabold text-xs px-3 py-2 rounded-xl">Open Studio</span>
        </div>

        <!-- Featured Banner: Weekly Assessment -->
        <div data-nav="assessment" class="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-4 text-white shadow-md flex items-center justify-between cursor-pointer hover:opacity-95 transition-opacity border-2 border-yellow-200">
          <div class="flex items-center gap-3">
            <div class="text-4xl bg-white/20 p-2.5 rounded-2xl">🏆</div>
            <div>
              <h4 class="font-extrabold text-lg">Weekly Quiz Test</h4>
              <p class="text-xs text-amber-100">Test your skills & get a certificate!</p>
            </div>
          </div>
          <span class="bg-white text-orange-600 font-extrabold text-xs px-3 py-2 rounded-xl">Take Quiz</span>
        </div>

      </div>

      <!-- Bottom Global Navigation Bar -->
      ${renderBottomNav('home')}

    </div>
  `;

  // Audio Mascot trigger
  const btnSpeak = container.querySelector('#btn-home-speak');
  const mascot = container.querySelector('#home-mascot');
  const triggerVoice = () => {
    sounds.playPop();
    speech.speak(character.greeting, character.pitch, character.rate);
  };
  btnSpeak?.addEventListener('click', triggerVoice);
  mascot?.addEventListener('click', triggerVoice);

  // Level selector listeners
  container.querySelectorAll('.btn-level').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sounds.playPop();
      const level = e.currentTarget.getAttribute('data-level');
      storage.setLevel(level);
      renderHomeScreen(container, navigateTo);
    });
  });

  // Activity cards listeners
  container.querySelectorAll('.btn-activity').forEach(card => {
    card.addEventListener('click', (e) => {
      sounds.playPop();
      const activity = e.currentTarget.getAttribute('data-activity');
      navigateTo('activity', { type: activity });
    });
  });

  // Featured banner listeners
  container.querySelectorAll('[data-nav]').forEach(banner => {
    banner.addEventListener('click', (e) => {
      sounds.playPop();
      const target = e.currentTarget.getAttribute('data-nav');
      navigateTo(target);
    });
  });

  // Bottom Nav bar events
  bindBottomNav(container, navigateTo);
}

export function renderBottomNav(activeTab) {
  return `
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 shadow-lg z-30">
      <div class="max-w-md mx-auto flex items-center justify-around">
        
        <button data-tab="home" class="nav-btn flex flex-col items-center gap-0.5 ${activeTab === 'home' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400 font-semibold'}">
          <span class="text-2xl">🏠</span>
          <span class="text-[10px]">Home</span>
        </button>

        <button data-tab="speaking" class="nav-btn flex flex-col items-center gap-0.5 ${activeTab === 'speaking' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400 font-semibold'}">
          <span class="text-2xl">🗣️</span>
          <span class="text-[10px]">Speak Studio</span>
        </button>

        <button data-tab="assessment" class="nav-btn flex flex-col items-center gap-0.5 ${activeTab === 'assessment' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400 font-semibold'}">
          <span class="text-2xl">🏆</span>
          <span class="text-[10px]">Quiz Test</span>
        </button>

        <button data-tab="report" class="nav-btn flex flex-col items-center gap-0.5 ${activeTab === 'report' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400 font-semibold'}">
          <span class="text-2xl">📊</span>
          <span class="text-[10px]">Report</span>
        </button>

        <button data-tab="rewards" class="nav-btn flex flex-col items-center gap-0.5 ${activeTab === 'rewards' ? 'text-indigo-600 font-bold scale-105' : 'text-slate-400 font-semibold'}">
          <span class="text-2xl">🎁</span>
          <span class="text-[10px]">Rewards</span>
        </button>

      </div>
    </div>
  `;
}

export function bindBottomNav(container, navigateTo) {
  container.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sounds.playPop();
      const tab = e.currentTarget.getAttribute('data-tab');
      navigateTo(tab);
    });
  });
}
