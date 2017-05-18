import Controller from 'ember-controller';
import service from 'ember-service/inject';

export default Controller.extend({
  kayako: service(),

  actions: {
    maximize() {
      this.get('kayako').maximize();
    },

    minimize() {
      this.get('kayako').minimize();
    },

    show() {
      this.get('kayako').show();
    },

    hide() {
      this.get('kayako').hide();
    }
  }
});
