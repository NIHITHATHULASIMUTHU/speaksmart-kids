/**
 * SpeakSmart Kids - Welcome / Start Screen
 */

import { CHARACTERS } from '../data/characters.js';
import { storage } from '../storage.js';
import { sounds } from '../audio.js';
import { speech } from '../speech.js';

export function renderWelcomeScreen(container, navigateTo) {
  const userData = storage.get();
  const character = CHARACTERS[userData.activeCharacterId] || CHARACTERS.bear;

  container.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-between p-6 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
      
      <!-- Background Sparkles -->
      <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-10 left-10 text-4xl animate-bounce-gentle">✨</div>
        <div class="absolute top-24 right-12 text-3xl animate-float">🌟</div>
        <div class="absolute bottom-32 left-16 text-4xl animate-float">🎨</div>
        <div class="absolute bottom-20 right-10 text-4xl animate-bounce-gentle">🚀</div>
      </div>

      <!-- Header Title -->
      <div class="text-center mt-6 z-10 animate-pop-in">
        <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold mb-3 border border-white/30">
          <span>🎉 Zero Login • Instant Fun</span>
        </div>
        <h1 class="text-4xl sm:text-5xl font-extrabold tracking-wide drop-shadow-lg text-yellow-300">
          SpeakSmart Kids
        </h1>
        <p class="text-lg text-purple-100 mt-1 font-medium">Fun English for Little Champions!</p>
      </div>

      <!-- Mascot Character Section -->
      <div class="flex flex-col items-center my-4 z-10 w-full max-w-sm">
        
        <!-- Speech Bubble -->
        <div id="welcome-bubble" class="speech-bubble p-4 text-slate-800 text-center mb-4 cursor-pointer hover:scale-105 transition-transform w-full">
          <p class="font-bold text-lg text-indigo-700">${character.name} says:</p>
          <p class="text-base text-slate-600 mt-1">"${character.greeting}"</p>
          <span class="text-xs text-indigo-500 font-semibold block mt-1">🔊 Tap to hear voice</span>
        </div>

        <!-- Animated Mascot -->
        <div id="welcome-mascot" class="w-44 h-44 animate-float cursor-pointer hover:scale-110 transition-transform">
          ${character.svg('happy')}
        </div>
      </div>

      <!-- Action Card -->
      <div class="w-full max-w-sm bg-white/95 backdrop-blur-lg rounded-3xl p-6 text-slate-800 shadow-2xl z-10 border-4 border-yellow-300">
        
        <!-- Optional Name Input -->
        <div class="mb-4 text-left">
          <label class="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
            Child's Name (Optional)
          </label>
          <input 
            type="text" 
            id="child-name-input" 
            value="${userData.childName !== 'Little Explorer' ? userData.childName : ''}" 
            placeholder="Type your name (e.g. Alex)" 
            class="w-full px-4 py-3 rounded-2xl bg-indigo-50 border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-slate-800 font-bold text-lg text-center"
          />
        </div>

        <!-- Big Start Button -->
        <button 
          id="btn-start-playing" 
          class="btn-kid btn-kid-yellow w-full py-4 rounded-2xl font-extrabold text-2xl flex items-center justify-center gap-3 shadow-lg"
        >
          <span>🚀 START PLAYING!</span>
        </button>

        <p class="text-center text-xs text-slate-500 font-semibold mt-3">
          Tap button to start immediately • Progress saved automatically
        </p>
      </div>

      <!-- Footer Info -->
      <div class="text-center text-xs text-purple-200 z-10 mb-2">
        Ages 4–12 • Interactive Speaking & Vocabulary
      </div>
    </div>
  `;

  // Speech bubble audio trigger
  const bubble = container.querySelector('#welcome-bubble');
  const mascot = container.querySelector('#welcome-mascot');
  const playVoice = () => {
    sounds.playPop();
    speech.speak(character.greeting, character.pitch, character.rate);
  };
  bubble?.addEventListener('click', playVoice);
  mascot?.addEventListener('click', playVoice);

  // Auto greet on load
  setTimeout(() => {
    speech.speak(character.greeting, character.pitch, character.rate);
  }, 400);

  // Start button handler
  const startBtn = container.querySelector('#btn-start-playing');
  const nameInput = container.querySelector('#child-name-input');

  startBtn?.addEventListener('click', () => {
    sounds.playPop();
    sounds.playStar();
    if (nameInput && nameInput.value.trim()) {
      storage.setChildName(nameInput.value.trim());
    }
    navigateTo('home');
  });
}
