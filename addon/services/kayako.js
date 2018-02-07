import Service from '@ember/service';

export default Service.extend({
  show() {
    if (!window.kayako || !window.kayako.showMessenger) {
      return false;
    }

    window.kayako.showMessenger();
    return true;
  },

  hide() {
    if (!window.kayako || !window.kayako.hideMessenger) {
      return false;
    }

    window.kayako.hideMessenger();
    return true;
  }
});
