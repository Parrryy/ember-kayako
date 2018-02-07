'use strict';

module.exports = {
  name: 'ember-kayako',

  isDevelopingAddon: function() { return true; },

  contentFor: function(type, env) {
    var config = env.kayako || {};

    if (!config.subdomain) {
      throw new Error('Kayako config requires subdomain');
    }

    var subdomain      = config.subdomain;
    var apiURL         = `https://${subdomain}.kayako.com/api/v1`;
    var cdnURL         = `https://${subdomain}.kayako.com/__apps/widget/assets/visitor`;
    var jsURL          = `https://${subdomain}.kayako.com/__apps/widget/assets/visitor/javascript/production.min.js`;
    var themeAvatar    = `https://${subdomain}.kayako.com/__apps/widget/assets/visitor/images/kayaker.png`;
    var defaultName    = config.defaultName || subdomain;
    var themeColor     = config.themeColor || "#3198B6";
    var welcomeMessage = config.welcomeMessage || `How can we help? We’d love to know what brought you to ${defaultName}`;

    if (type === 'body-footer') {
      return `
        <script type="text/javascript">
          ! function(a, e) {
              window.kayako = e, e.readyQueue = [], e._config = {
                  apiUrl: "${apiURL}",
                  cdnUrl: "${cdnURL}",
                  defaultName: "${defaultName}",
                  themeColor: "${themeColor}",
                  themeAvatar: "${themeAvatar}",
                  welcomeMessage: "${welcomeMessage}"
              }, e.ready = function(a) {
                  e.readyQueue.push(a)
              };
              var t = a.createElement("div");
              t.id = "Kykw__app", t["class"] = "k-widget", a.body.appendChild(t);
              var o = a.createElement("script");
              o.type = "text/javascript", o.async = !0;
              var i = "${jsURL}";
              o.src = i;
              var s = a.getElementsByTagName("script");
              s = s[s.length - 1], s.parentNode.insertBefore(o, s)
          }(document, window.kayako || []);
        </script>
      `;
    }
  }
};
