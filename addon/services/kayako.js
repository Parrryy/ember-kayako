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

    // Currently `ready` doesn't run if already ready
    // Remove this logic when that's fixed
    if (window.kayako.hide) {
      this._onReady();
    } else {
      window.kayako.ready(() => this._onReady());
    }
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
    this.set('soundsEnabled', true);
    return window.kayako.enableSounds();
  },

  disableSounds() {
    this.set('soundsEnabled', false);
    return window.kayako.disableSounds();
  }
});
