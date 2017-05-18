import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend({
  isVisible: true,
  isMaximized: false,
  hasIdentified: false,

  init() {
    this._super(...arguments);
    const kayako = window.kayako;

    kayako.ready(() => {
      kayako.setLogLevel('trace');

      kayako.on('chat_window_maximized', () => this.set('isMaximized', true));
      kayako.on('chat_window_minimized', () => this.set('isMaximized', false));

      kayako.on('chat_window_hidden', () => this.set('isVisible', false));
      kayako.on('chat_window_shown', () => this.set('isVisible', true));

      kayako.on('identified', () => this.set('hasIdentified', true));

      // TODO - also hook into chat events etc, maybe with Ember.Evented?
    });
  },

  identify({ name, email }) {
    return window.kayako.identify(name, email);
  },

  isInChat() {
    return window.kayako.isInChat();
  },

  currentChat() {
    return window.kayako.getCurrentChat();
  },

  agentsAvailable(department) {
    return new RSVP.Promise(resolve => {
      if (department) {
        window.kayako.agentsAvailable(department, resolve);
      } else {
        window.kayako.agentsAvailable(resolve);
      }
    });
  },

  show() {
    return window.kayako.show();
  },

  hide() {
    return window.kayako.hide();
  },

  maximize() {
    return window.kayako.maximize();
  },

  minimize() {
    return window.kayako.minimize();
  },

  enableSounds() {
    return window.kayako.enableSounds();
  },

  disableSounds() {
    return window.kayako.disableSounds();
  }
});
