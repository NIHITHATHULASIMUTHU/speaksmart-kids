/**
 * SpeakSmart Kids - Rewards, Badges & Character Shop Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';
import { renderBottomNav, bindBottomNav } from './homeScreen.js';

export function renderRewardsScreen(container, navigateTo) {
  const userData = storage.get();

  function render() {
    container.innerHTML = `
      <div class="min-h-screen pb-24 bg-indigo-50 flex flex-col items-center">
        
        <!-- Header -->
        <div class="w-full bg-white shadow-sm border-b border-indigo-100 px-4 py-3 sticky top-0 z-20">
          <div class="max-w-md mx-auto flex items-center justify-between">
            <button id="btn-rewards-back" class="flex items-center gap-1 font-extrabold text-sm text-slate-600 hover:text-indigo-600">
              <span class="text-xl">⬅️</span> Back
            </button>
            <div class="flex items-center gap-1.5 font-extrabold text-amber-600 text-base">
              <span>🎁 Rewards & Shop</span>
            </div>
            <div class="bg-amber-100 border border-amber-300 text-amber-800 font-extrabold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <span>⭐</span> ${userData.stars}
            </div>
          </div>
        </div>

        <div class="w-full max-w-md px-4 pt-4 flex flex-col gap-5 flex-1">

          <!-- Character Unlock Shop Section -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                <span>🧸</span> Mascot Buddy Shop
              </h3>
              <span class="text-xs font-bold text-indigo-600">Tap to select or unlock</span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              ${Object.values(CHARACTERS).map(char => {
                const isUnlocked = userData.unlockedCharacters.includes(char.id);
                const isActive = userData.activeCharacterId === char.id;

                return `
                  <div class="bg-white rounded-3xl p-4 shadow-sm border-2 ${isActive ? 'border-amber-400 ring-2 ring-amber-300' : 'border-slate-100'} flex flex-col items-center text-center relative overflow-hidden">
                    
                    ${isActive ? `<span class="absolute top-2 right-2 bg-amber-400 text-slate-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">Active</span>` : ''}

                    <div class="w-20 h-20 my-1 ${char.bgColor} rounded-full p-2 border-2 ${char.borderColor}">
                      ${char.svg('happy')}
                    </div>

                    <h4 class="font-extrabold text-slate-800 text-sm mt-1">${char.name}</h4>
                    
                    ${isUnlocked ? `
                      <button 
                        data-select-char="${char.id}"
                        class="btn-kid ${isActive ? 'btn-kid-yellow' : 'btn-kid-primary'} w-full mt-2 py-2 rounded-xl text-xs font-extrabold"
                      >
                        ${isActive ? 'Selected' : 'Use Buddy'}
                      </button>
                    ` : `
                      <button 
                        data-unlock-char="${char.id}"
                        data-cost="${char.unlockCost}"
                        class="btn-kid btn-kid-green w-full mt-2 py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1"
                        ${userData.stars < char.unlockCost ? 'opacity-60' : ''}
                      >
                        <span>Unlock</span>
                        <span class="bg-black/20 px-1.5 py-0.5 rounded text-[10px]">⭐ ${char.unlockCost}</span>
                      </button>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Badges Section -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                <span>🏅</span> Badges & Achievements
              </h3>
              <span class="text-xs font-bold text-slate-500">
                ${userData.badges.filter(b => b.unlocked).length} / ${userData.badges.length} Earned
              </span>
            </div>

            <div class="grid grid-cols-2 gap-3">
              ${userData.badges.map(badge => `
                <div class="bg-white rounded-2xl p-3 shadow-sm border ${badge.unlocked ? 'border-amber-200 bg-amber-50/50' : 'border-slate-200 opacity-60'} flex items-center gap-3">
                  <div class="text-3xl p-2 rounded-xl ${badge.unlocked ? 'bg-amber-100' : 'bg-slate-100'}">
                    ${badge.icon}
                  </div>
                  <div class="text-left">
                    <h4 class="font-extrabold text-slate-800 text-xs">${badge.title}</h4>
                    <p class="text-[10px] text-slate-500 font-semibold leading-tight mt-0.5">${badge.desc}</p>
                    <span class="text-[9px] font-bold ${badge.unlocked ? 'text-emerald-600' : 'text-slate-400'} block mt-1">
                      ${badge.unlocked ? '✓ Unlocked' : '🔒 Locked'}
                    </span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Bottom Global Nav -->
        ${renderBottomNav('rewards')}
      </div>
    `;

    bindEvents();
    bindBottomNav(container, navigateTo);
  }

  function bindEvents() {
    container.querySelector('#btn-rewards-back')?.addEventListener('click', () => {
      sounds.playPop();
      navigateTo('home');
    });

    container.querySelectorAll('[data-select-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playPop();
        const charId = e.currentTarget.getAttribute('data-select-char');
        storage.setActiveCharacter(charId);
        const char = CHARACTERS[charId];
        speech.speak(char.greeting, char.pitch, char.rate);
        render();
      });
    });

    container.querySelectorAll('[data-unlock-char]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const charId = e.currentTarget.getAttribute('data-unlock-char');
        const cost = parseInt(e.currentTarget.getAttribute('data-cost'));
        if (storage.unlockCharacter(charId, cost)) {
          if (window.confetti) {
            window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          }
          sounds.playFanfare();
          const char = CHARACTERS[charId];
          speech.speak(`Hooray! ${char.name} unlocked!`, char.pitch, char.rate);
          render();
        } else {
          sounds.playTryAgain();
          alert(`You need ${cost} stars to unlock this character! Keep completing activities!`);
        }
      });
    });
  }

  render();
}
