import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Service.extend(Ember.Evented, {
  isReady: false,
  visibility: null,
  hasIdentified: false,
  numUnreadMessages: 0,
  soundsEnabled: true,

  init() {
    this._super(...arguments);
    window.kayako.ready(() => this._onReady());
  },

  _onReady() {
    const kayako = window.kayako;

    this.set('isReady', true);
    this.set('visibility', kayako.visibility());

    kayako.on('chat_window_maximized', () => {
      this.set('visibility', kayako.visibility());
      this.trigger('chat_window_maximized');
    });

    kayako.on('chat_window_minimized', () => {
      this.set('visibility', kayako.visibility());
      this.trigger('chat_window_minimized');
    });

    kayako.on('chat_window_hidden', () => {
      this.set('visibility', kayako.visibility());
      this.trigger('chat_window_hidden');
    });

    kayako.on('chat_window_shown', () => {
      this.set('visibility', kayako.visibility());
      this.trigger('chat_window_shown');
    });

    kayako.on('identified', () => {
      this.set('hasIdentified', true);
      this.trigger('identified');
    });

    kayako.on('unread_messages_count_changed', (count) => {
      this.set('numUnreadMessages', count);
      this.trigger('unread_messages_count_changed', count);
    });

    kayako.on('chat_state_changed', (conversation, state) => this.trigger('chat_state_changed', conversation, state));
    kayako.on('chat_started',       (conversation)        => this.trigger('chat_started', conversation));
    kayako.on('chat_ended',         (conversation)        => this.trigger('chat_ended', conversation));

    this.onReady(kayako);
  },

  onReady(/* kayako */) {
    // override this in your app
    // kayako.setLogLevel('trace');
    // kayako.hideLauncher = true
    // etc...
  },

  identify({ name, email }) {
    return new RSVP.Promise(resolve => {
      window.kayako.ready(() => {
        window.kayako.identify(name, email);
        resolve();
      })
    });
  },

  isInChat() {
    this._ensureReady();
    return window.kayako.isInChat();
  },

  currentChat() {
    this._ensureReady();
    return window.kayako.getCurrentChat();
  },

  agentsAvailable(department) {
    this._ensureReady();
    return new RSVP.Promise(resolve => {
      if (department) {
        window.kayako.agentsAvailable(department, resolve);
      } else {
        window.kayako.agentsAvailable(resolve);
      }
    });
  },

  show() {
    this._ensureReady();
    return window.kayako.show();
  },

  hide() {
    this._ensureReady();
    return window.kayako.hide();
  },

  maximize() {
    this._ensureReady();
    return window.kayako.maximize();
  },

  minimize() {
    this._ensureReady();
    return window.kayako.minimize();
  },

  enableSounds() {
    this._ensureReady();
    this.set('soundsEnabled', true);
    return window.kayako.enableSounds();
  },

  disableSounds() {
    this._ensureReady();
    this.set('soundsEnabled', false);
    return window.kayako.disableSounds();
  },

  _ensureReady() {
    if (!this.get('isReady')) {
      throw new Error('Kayako messenger is not yet ready. Ensure messenger has loaded before calling it.');
    }
  }
});
