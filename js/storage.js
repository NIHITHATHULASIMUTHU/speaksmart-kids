/**
 * SpeakSmart Kids - Local Storage State Manager
 * Zero-login persistent storage for stars, badges, streak, character unlocks, and progress metrics.
 */

const STORAGE_KEY = 'speaksmart_kids_user_data_v1';

const INITIAL_DATA = {
  childName: 'Little Explorer',
  stars: 25,
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLevel: 'beginner', // 'beginner' | 'intermediate' | 'advanced'
  activeCharacterId: 'bear',
  unlockedCharacters: ['bear'],
  completedActivitiesCount: 0,
  vocabularyScore: 85,
  speakingScore: 80,
  sentenceScore: 75,
  weeklyAssessmentPassed: false,
  badges: [
    { id: 'first_step', title: 'First Step', desc: 'Started your learning journey!', icon: '🐣', unlocked: true },
    { id: 'word_master', title: 'Word Master', desc: 'Learned 10 new words!', icon: '📚', unlocked: false },
    { id: 'brave_speaker', title: 'Brave Speaker', desc: 'Practiced 5 speaking tasks!', icon: '🗣️', unlocked: false },
    { id: 'daily_learner', title: 'Daily Learner', desc: 'Maintained a 3-day learning streak!', icon: '🔥', unlocked: false },
    { id: 'star_collector', title: 'Star Collector', desc: 'Collected 50 stars!', icon: '⭐', unlocked: false },
    { id: 'weekly_hero', title: 'Weekly Hero', desc: 'Completed the Weekly Assessment!', icon: '🏆', unlocked: false }
  ]
};

class StorageManager {
  constructor() {
    this.data = this.loadData();
    this.checkAndUpdateStreak();
  }

  loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...INITIAL_DATA, ...JSON.parse(raw) };
      }
    } catch (e) {
      console.warn("Error loading state from localStorage:", e);
    }
    return { ...INITIAL_DATA };
  }

  saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Error saving state to localStorage:", e);
    }
  }

  get() {
    return this.data;
  }

  setChildName(name) {
    if (name && name.trim()) {
      this.data.childName = name.trim();
      this.saveData();
    }
  }

  setLevel(level) {
    if (['beginner', 'intermediate', 'advanced'].includes(level)) {
      this.data.currentLevel = level;
      this.saveData();
    }
  }

  setActiveCharacter(charId) {
    if (this.data.unlockedCharacters.includes(charId)) {
      this.data.activeCharacterId = charId;
      this.saveData();
      return true;
    }
    return false;
  }

  unlockCharacter(charId, starCost) {
    if (this.data.stars >= starCost && !this.data.unlockedCharacters.includes(charId)) {
      this.data.stars -= starCost;
      this.data.unlockedCharacters.push(charId);
      this.data.activeCharacterId = charId;
      this.saveData();
      return true;
    }
    return false;
  }

  addStars(count) {
    this.data.stars += count;
    if (this.data.stars >= 50) {
      this.unlockBadge('star_collector');
    }
    this.saveData();
  }

  incrementActivityCount() {
    this.data.completedActivitiesCount += 1;
    if (this.data.completedActivitiesCount >= 5) {
      this.unlockBadge('word_master');
    }
    this.saveData();
  }

  updateSpeakingScore(score) {
    this.data.speakingScore = Math.min(100, Math.round((this.data.speakingScore + score) / 2));
    this.unlockBadge('brave_speaker');
    this.saveData();
  }

  updateVocabularyScore(score) {
    this.data.vocabularyScore = Math.min(100, Math.round((this.data.vocabularyScore + score) / 2));
    this.saveData();
  }

  unlockBadge(badgeId) {
    const badge = this.data.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      this.saveData();
      return badge;
    }
    return null;
  }

  completeAssessment(scorePct) {
    this.data.weeklyAssessmentPassed = true;
    this.addStars(30);
    this.unlockBadge('weekly_hero');
    this.saveData();
  }

  checkAndUpdateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const last = this.data.lastActiveDate;

    if (last === today) {
      return; // Already counted today
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (last === yesterday) {
      this.data.streak += 1;
    } else {
      this.data.streak = 1; // Streak reset if missed a day
    }

    this.data.lastActiveDate = today;

    if (this.data.streak >= 3) {
      this.unlockBadge('daily_learner');
    }

    this.saveData();
  }

  resetAll() {
    this.data = { ...INITIAL_DATA };
    this.saveData();
  }
}

export const storage = new StorageManager();
