/**
 * SpeakSmart Kids - Curriculum Data (Beginner, Intermediate, Advanced)
 */

export const CURRICULUM = {
  beginner: {
    levelName: "Beginner",
    ageRange: "Ages 4-6",
    color: "#10B981", // Green
    badgeIcon: "🌱",
    
    // Activity 1: Flashcards
    flashcards: [
      { id: 'b_f1', word: 'Apple', emoji: '🍎', phonetic: '/ˈæp.əl/', category: 'Fruits', sentence: 'An apple is sweet and red.' },
      { id: 'b_f2', word: 'Cat', emoji: '🐱', phonetic: '/kæt/', category: 'Animals', sentence: 'The cat says meow!' },
      { id: 'b_f3', word: 'Sun', emoji: '☀️', phonetic: '/sʌn/', category: 'Nature', sentence: 'The sun shines bright in the sky.' },
      { id: 'b_f4', word: 'Dog', emoji: '🐶', phonetic: '/dɒɡ/', category: 'Animals', sentence: 'The happy dog wags its tail.' },
      { id: 'b_f5', word: 'Ball', emoji: '⚽', phonetic: '/bɔːl/', category: 'Toys', sentence: 'I like to bounce the ball.' },
      { id: 'b_f6', word: 'Car', emoji: '🚗', phonetic: '/kɑːr/', category: 'Vehicles', sentence: 'The red car goes vroom!' },
      { id: 'b_f7', word: 'Fish', emoji: '🐟', phonetic: '/fɪʃ/', category: 'Animals', sentence: 'Fish swim in the blue water.' },
      { id: 'b_f8', word: 'Star', emoji: '⭐', phonetic: '/stɑːr/', category: 'Nature', sentence: 'A bright star shines at night.' }
    ],

    // Activity 2: Word-Picture Match (Pairs)
    matching: [
      { id: 'm1', word: 'Lion', emoji: '🦁' },
      { id: 'm2', word: 'Banana', emoji: '🍌' },
      { id: 'm3', word: 'Bus', emoji: '🚌' },
      { id: 'm4', word: 'Duck', emoji: '🦆' },
      { id: 'm5', word: 'Flower', emoji: '🌻' },
      { id: 'm6', word: 'Book', emoji: '📖' }
    ],

    // Activity 3: Sentence Building
    sentenceBuilding: [
      { id: 's1', target: 'I see a dog', words: ['I', 'see', 'a', 'dog'], hint: 'Say what animal you see!' },
      { id: 's2', target: 'The sun is big', words: ['The', 'sun', 'is', 'big'], hint: 'Describe the sun!' },
      { id: 's3', target: 'I love my cat', words: ['I', 'love', 'my', 'cat'], hint: 'Express your feelings!' },
      { id: 's4', target: 'This ball is red', words: ['This', 'ball', 'is', 'red'], hint: 'Describe the toy!' }
    ],

    // Activity 4: Listen & Repeat
    listenRepeat: [
      { id: 'lr1', text: 'Hello my friend!', hint: 'Wave and say hello!' },
      { id: 'lr2', text: 'Good morning!', hint: 'Greet the sun!' },
      { id: 'lr3', text: 'I am happy today!', hint: 'Smile and speak clearly!' },
      { id: 'lr4', text: 'Thank you very much!', hint: 'Be polite and kind!' }
    ]
  },

  intermediate: {
    levelName: "Intermediate",
    ageRange: "Ages 6-8",
    color: "#3B82F6", // Blue
    badgeIcon: "🚀",

    flashcards: [
      { id: 'i_f1', word: 'Rainbow', emoji: '🌈', phonetic: '/ˈreɪn.boʊ/', category: 'Nature', sentence: 'Look at the beautiful rainbow!' },
      { id: 'i_f2', word: 'Elephant', emoji: '🐘', phonetic: '/ˈel.ɪ.fənt/', category: 'Animals', sentence: 'The elephant has a long trunk.' },
      { id: 'i_f3', word: 'Bicycle', emoji: '🚲', phonetic: '/ˈbaɪ.sə.kəl/', category: 'Vehicles', sentence: 'I ride my bicycle in the park.' },
      { id: 'i_f4', word: 'Butterfly', emoji: '🦋', phonetic: '/ˈbʌt.ɚ.flaɪ/', category: 'Insects', sentence: 'The butterfly has colorful wings.' },
      { id: 'i_f5', word: 'Ice Cream', emoji: '🍦', phonetic: '/ˈaɪs ˌkriːm/', category: 'Food', sentence: 'Ice cream is delicious on warm days.' },
      { id: 'i_f6', word: 'Astronaut', emoji: '🧑‍🚀', phonetic: '/ˈæs.trə.nɑːt/', category: 'Jobs', sentence: 'An astronaut flies to outer space.' }
    ],

    matching: [
      { id: 'im1', word: 'Rocket', emoji: '🚀' },
      { id: 'im2', word: 'Guitar', emoji: '🎸' },
      { id: 'im3', word: 'Dolphin', emoji: '🐬' },
      { id: 'im4', word: 'Treehouse', emoji: '🏡' },
      { id: 'im5', word: 'Pencil', emoji: '✏️' },
      { id: 'im6', word: 'Pizza', emoji: '🍕' }
    ],

    sentenceBuilding: [
      { id: 'is1', target: 'The cat is sleeping on the mat', words: ['The', 'cat', 'is', 'sleeping', 'on', 'the', 'mat'], hint: 'Where is the cat?' },
      { id: 'is2', target: 'We play games in the playground', words: ['We', 'play', 'games', 'in', 'the', 'playground'], hint: 'What do we do?' },
      { id: 'is3', target: 'She eats a sweet red apple', words: ['She', 'eats', 'a', 'sweet', 'red', 'apple'], hint: 'What is she eating?' }
    ],

    listenRepeat: [
      { id: 'ilr1', text: 'Can I play with you?', hint: 'Ask politely to join!' },
      { id: 'ilr2', text: 'The birds are singing high in the tree.', hint: 'Listen and repeat the melody!' },
      { id: 'ilr3', text: 'My favorite color is bright yellow!', hint: 'Share your preference!' }
    ]
  },

  advanced: {
    levelName: "Advanced",
    ageRange: "Ages 8-12",
    color: "#8B5CF6", // Purple
    badgeIcon: "👑",

    flashcards: [
      { id: 'a_f1', word: 'Adventure', emoji: '🗺️', phonetic: '/ədˈven.tʃɚ/', category: 'Concepts', sentence: 'We went on a fun jungle adventure.' },
      { id: 'a_f2', word: 'Telescope', emoji: '🔭', phonetic: '/ˈtel.ə.skoʊp/', category: 'Science', sentence: 'Look through the telescope to see the stars.' },
      { id: 'a_f3', word: 'Curious', emoji: '🧐', phonetic: '/ˈkjʊr.i.əs/', category: 'Emotions', sentence: 'The curious puppy explored the garden.' },
      { id: 'a_f4', word: 'Masterpiece', emoji: '🎨', phonetic: '/ˈmæs.tɚ.piːs/', category: 'Art', sentence: 'She painted a gorgeous masterpiece.' }
    ],

    matching: [
      { id: 'am1', word: 'Microscope', emoji: '🔬' },
      { id: 'am2', word: 'Treasure', emoji: '💎' },
      { id: 'am3', word: 'Orchestra', emoji: '🎻' },
      { id: 'am4', word: 'Volcano', emoji: '🌋' }
    ],

    sentenceBuilding: [
      { id: 'as1', target: 'The brave astronaut explored the distant moon', words: ['The', 'brave', 'astronaut', 'explored', 'the', 'distant', 'moon'], hint: 'Tell the story of space!' },
      { id: 'as2', target: 'Reading books opens a magical world of knowledge', words: ['Reading', 'books', 'opens', 'a', 'magical', 'world', 'of', 'knowledge'], hint: 'Why do we read?' }
    ],

    listenRepeat: [
      { id: 'alr1', text: 'Every great journey begins with a single step.', hint: 'Speak with confidence and passion!' },
      { id: 'alr2', text: 'Practice makes perfect, and learning is fun!', hint: 'Express enthusiasm clearly!' }
    ]
  }
};

export const WEEKLY_ASSESSMENT = [
  {
    id: 'q1',
    type: 'word',
    question: 'Which word matches the image 🐶?',
    options: [
      { text: 'Cat', isCorrect: false },
      { text: 'Dog', isCorrect: true },
      { text: 'Fish', isCorrect: false }
    ]
  },
  {
    id: 'q2',
    type: 'word',
    question: 'What is the color of the sun ☀️?',
    options: [
      { text: 'Yellow', isCorrect: true },
      { text: 'Blue', isCorrect: false },
      { text: 'Green', isCorrect: false }
    ]
  },
  {
    id: 'q3',
    type: 'sentence',
    question: 'Put the words in correct order: "a / see / I / car"',
    words: ['I', 'see', 'a', 'car'],
    target: 'I see a car'
  },
  {
    id: 'q4',
    type: 'speaking',
    question: 'Speak out loud: "I love learning English!"',
    target: 'I love learning English!'
  },
  {
    id: 'q5',
    type: 'word',
    question: 'Select the animal that swims in water 🐟:',
    options: [
      { text: 'Fish', isCorrect: true },
      { text: 'Bird', isCorrect: false },
      { text: 'Rabbit', isCorrect: false }
    ]
  }
];
