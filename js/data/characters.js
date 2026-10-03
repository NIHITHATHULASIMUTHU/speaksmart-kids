/**
 * SpeakSmart Kids - Character Mascot Definitions & SVG Generators
 */

export const CHARACTERS = {
  bear: {
    id: 'bear',
    name: 'Buddy Bear',
    species: 'Bear',
    emoji: '🐻',
    color: '#F59E0B',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-400',
    unlockCost: 0,
    pitch: 1.1,
    rate: 0.9,
    greeting: "Hi there! I'm Buddy Bear! Let's learn English together!",
    encouragement: ["You're doing super great!", "Wow! So smart!", "High five buddy!", "Keep going!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Ears -->
        <circle cx="22" cy="22" r="14" fill="#B45309"/>
        <circle cx="22" cy="22" r="8" fill="#FDE68A"/>
        <circle cx="78" cy="22" r="14" fill="#B45309"/>
        <circle cx="78" cy="22" r="8" fill="#FDE68A"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="38" fill="#D97706"/>
        <!-- Muzzle -->
        <ellipse cx="50" cy="58" rx="20" ry="15" fill="#FEF3C7"/>
        <ellipse cx="50" cy="50" rx="8" ry="6" fill="#451A03"/>
        <!-- Mouth -->
        ${expression === 'talking' ? `
          <path d="M 42 60 Q 50 72 58 60 Z" fill="#991B1B"/>
        ` : `
          <path d="M 43 60 Q 50 67 57 60" stroke="#451A03" stroke-width="3" fill="none" stroke-linecap="round"/>
        `}
        <!-- Eyes -->
        <circle cx="36" cy="42" r="5" fill="#1E293B"/>
        <circle cx="64" cy="42" r="5" fill="#1E293B"/>
        <circle cx="34" cy="40" r="2" fill="#FFFFFF"/>
        <circle cx="62" cy="40" r="2" fill="#FFFFFF"/>
        <!-- Cheeks -->
        <circle cx="28" cy="52" r="5" fill="#F472B6" opacity="0.6"/>
        <circle cx="72" cy="52" r="5" fill="#F472B6" opacity="0.6"/>
      </svg>
    `
  },
  lion: {
    id: 'lion',
    name: 'Leo Lion',
    species: 'Lion',
    emoji: '🦁',
    color: '#EAB308',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-400',
    unlockCost: 30,
    pitch: 1.0,
    rate: 0.9,
    greeting: "Roar! I'm Leo Lion! Ready to be a brave speaker?",
    encouragement: ["Brave like a lion!", "Super roar power!", "Awesome work!", "You are a champion!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Mane -->
        <circle cx="50" cy="50" r="46" fill="#EA580C"/>
        <!-- Head -->
        <circle cx="50" cy="50" r="34" fill="#FACC15"/>
        <!-- Ears -->
        <circle cx="25" cy="25" r="10" fill="#EA580C"/>
        <circle cx="75" cy="25" r="10" fill="#EA580C"/>
        <!-- Muzzle -->
        <ellipse cx="50" cy="58" rx="16" ry="12" fill="#FEF08A"/>
        <polygon points="50,48 44,56 56,56" fill="#78350F"/>
        <!-- Mouth -->
        ${expression === 'talking' ? `
          <path d="M 44 60 Q 50 72 56 60 Z" fill="#991B1B"/>
        ` : `
          <path d="M 43 60 Q 50 66 57 60" stroke="#78350F" stroke-width="3" fill="none" stroke-linecap="round"/>
        `}
        <!-- Eyes -->
        <circle cx="36" cy="42" r="5" fill="#1E293B"/>
        <circle cx="64" cy="42" r="5" fill="#1E293B"/>
        <circle cx="34" cy="40" r="2" fill="#FFFFFF"/>
        <circle cx="62" cy="40" r="2" fill="#FFFFFF"/>
        <!-- Crown -->
        <polygon points="38,16 44,25 50,14 56,25 62,16 62,28 38,28" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
      </svg>
    `
  },
  penguin: {
    id: 'penguin',
    name: 'Penny Penguin',
    species: 'Penguin',
    emoji: '🐧',
    color: '#06B6D4',
    bgColor: 'bg-cyan-100',
    borderColor: 'border-cyan-400',
    unlockCost: 40,
    pitch: 1.3,
    rate: 0.95,
    greeting: "Waddle waddle! I'm Penny Penguin! Let's cool & learn!",
    encouragement: ["Cool moves!", "Ice cold perfection!", "Flap-tastic job!", "Super cool!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Body -->
        <ellipse cx="50" cy="52" rx="36" ry="40" fill="#1E293B"/>
        <!-- Belly -->
        <ellipse cx="50" cy="56" rx="24" ry="32" fill="#FFFFFF"/>
        <!-- Eyes -->
        <circle cx="38" cy="40" r="6" fill="#1E293B"/>
        <circle cx="62" cy="40" r="6" fill="#1E293B"/>
        <circle cx="36" cy="38" r="2.5" fill="#FFFFFF"/>
        <circle cx="60" cy="38" r="2.5" fill="#FFFFFF"/>
        <!-- Beak -->
        <polygon points="50,44 40,54 60,54" fill="#F97316"/>
        <!-- Cheeks -->
        <circle cx="28" cy="48" r="4" fill="#EC4899" opacity="0.6"/>
        <circle cx="72" cy="48" r="4" fill="#EC4899" opacity="0.6"/>
        <!-- Scarf -->
        <path d="M 24 64 Q 50 72 76 64 L 74 72 Q 50 80 26 72 Z" fill="#EF4444"/>
      </svg>
    `
  },
  bunny: {
    id: 'bunny',
    name: 'Rosie Bunny',
    species: 'Bunny',
    emoji: '🐰',
    color: '#EC4899',
    bgColor: 'bg-pink-100',
    borderColor: 'border-pink-400',
    unlockCost: 50,
    pitch: 1.4,
    rate: 0.95,
    greeting: "Hop hop! I'm Rosie Bunny! English is so much fun!",
    encouragement: ["Hip hop hooray!", "You are hop-tastic!", "Sweet word power!", "Awesome memory!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Ears -->
        <ellipse cx="32" cy="18" rx="8" ry="22" fill="#F472B6"/>
        <ellipse cx="32" cy="18" rx="4" ry="16" fill="#FBCFE8"/>
        <ellipse cx="68" cy="18" rx="8" ry="22" fill="#F472B6"/>
        <ellipse cx="68" cy="18" rx="4" ry="16" fill="#FBCFE8"/>
        <!-- Head -->
        <circle cx="50" cy="56" r="32" fill="#F472B6"/>
        <!-- Muzzle -->
        <ellipse cx="50" cy="62" rx="14" ry="10" fill="#FFFFFF"/>
        <polygon points="50,56 46,60 54,60" fill="#DB2777"/>
        <!-- Eyes -->
        <circle cx="36" cy="48" r="5" fill="#831843"/>
        <circle cx="64" cy="48" r="5" fill="#831843"/>
        <circle cx="34" cy="46" r="2" fill="#FFFFFF"/>
        <circle cx="62" cy="46" r="2" fill="#FFFFFF"/>
        <!-- Flower -->
        <circle cx="28" cy="38" r="5" fill="#FACC15"/>
      </svg>
    `
  },
  monkey: {
    id: 'monkey',
    name: 'Maya Monkey',
    species: 'Monkey',
    emoji: '🐒',
    color: '#10B981',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-400',
    unlockCost: 60,
    pitch: 1.2,
    rate: 1.0,
    greeting: "Ooh ooh ah ah! I'm Maya Monkey! Let's swing into learning!",
    encouragement: ["Banana-rific!", "Super clever monkey!", "Great job friend!", "You rock!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Ears -->
        <circle cx="18" cy="45" r="12" fill="#78350F"/>
        <circle cx="18" cy="45" r="7" fill="#FDE68A"/>
        <circle cx="82" cy="45" r="12" fill="#78350F"/>
        <circle cx="82" cy="45" r="7" fill="#FDE68A"/>
        <!-- Head -->
        <circle cx="50" cy="48" r="34" fill="#92400E"/>
        <!-- Face Mask -->
        <path d="M 32 38 C 32 26 44 26 50 36 C 56 26 68 26 68 38 C 68 56 50 68 50 68 C 50 68 32 56 32 38 Z" fill="#FDE68A"/>
        <!-- Nose -->
        <ellipse cx="50" cy="48" rx="5" ry="3" fill="#451A03"/>
        <!-- Mouth -->
        <path d="M 42 56 Q 50 64 58 56" stroke="#451A03" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Eyes -->
        <circle cx="40" cy="38" r="4.5" fill="#1E293B"/>
        <circle cx="60" cy="38" r="4.5" fill="#1E293B"/>
        <circle cx="38" cy="36" r="1.8" fill="#FFFFFF"/>
        <circle cx="58" cy="36" r="1.8" fill="#FFFFFF"/>
      </svg>
    `
  },
  owl: {
    id: 'owl',
    name: 'Ollie Owl',
    species: 'Owl',
    emoji: '🦉',
    color: '#8B5CF6',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-400',
    unlockCost: 75,
    pitch: 0.95,
    rate: 0.85,
    greeting: "Hoot hoot! I'm Ollie Owl! Wisdom begins with speaking clearly!",
    encouragement: ["Brilliant mind!", "Wise words!", "Masterful performance!", "Exceptional!"],
    svg: (expression = 'happy') => `
      <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
        <!-- Body -->
        <ellipse cx="50" cy="54" rx="34" ry="38" fill="#6D28D9"/>
        <!-- Eyes Rings -->
        <circle cx="36" cy="42" r="14" fill="#FEF08A"/>
        <circle cx="64" cy="42" r="14" fill="#FEF08A"/>
        <!-- Pupils -->
        <circle cx="36" cy="42" r="7" fill="#1E293B"/>
        <circle cx="64" cy="42" r="7" fill="#1E293B"/>
        <circle cx="34" cy="40" r="2.5" fill="#FFFFFF"/>
        <circle cx="62" cy="40" r="2.5" fill="#FFFFFF"/>
        <!-- Beak -->
        <polygon points="50,44 44,54 56,54" fill="#F97316"/>
        <!-- Grad Cap -->
        <polygon points="50,8 20,20 50,32 80,20" fill="#1E293B"/>
        <rect x="42" y="20" width="16" height="6" fill="#1E293B"/>
        <circle cx="50" cy="8" r="3" fill="#F59E0B"/>
      </svg>
    `
  }
};
