/**
 * SpeakSmart Kids - Core Application Controller & Router
 */

import { renderWelcomeScreen } from './screens/welcomeScreen.js';
import { renderHomeScreen } from './screens/homeScreen.js';
import { renderActivityScreen } from './screens/activityScreen.js';
import { renderSpeakingScreen } from './screens/speakingScreen.js';
import { renderAssessmentScreen } from './screens/assessmentScreen.js';
import { renderReportCardScreen } from './screens/reportCardScreen.js';
import { renderRewardsScreen } from './screens/rewardsScreen.js';
import { storage } from './storage.js';

class App {
  constructor() {
    this.container = document.getElementById('app-root');
    this.currentScreen = 'welcome';
  }

  init() {
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.screen) {
        this.navigateTo(e.state.screen, e.state.params, false);
      }
    });

    // Initial render
    this.navigateTo('welcome', {}, false);
  }

  navigateTo(screenName, params = {}, pushState = true) {
    this.currentScreen = screenName;

    if (pushState) {
      history.pushState({ screen: screenName, params }, '', `#${screenName}`);
    }

    // Scroll to top of app container
    window.scrollTo(0, 0);

    switch (screenName) {
      case 'welcome':
        renderWelcomeScreen(this.container, this.navigateTo.bind(this));
        break;
      case 'home':
        renderHomeScreen(this.container, this.navigateTo.bind(this));
        break;
      case 'activity':
        renderActivityScreen(this.container, this.navigateTo.bind(this), params);
        break;
      case 'speaking':
        renderSpeakingScreen(this.container, this.navigateTo.bind(this));
        break;
      case 'assessment':
        renderAssessmentScreen(this.container, this.navigateTo.bind(this));
        break;
      case 'report':
        renderReportCardScreen(this.container, this.navigateTo.bind(this));
        break;
      case 'rewards':
        renderRewardsScreen(this.container, this.navigateTo.bind(this));
        break;
      default:
        renderHomeScreen(this.container, this.navigateTo.bind(this));
        break;
    }
  }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
