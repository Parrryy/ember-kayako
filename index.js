/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-kayako',

  isDevelopingAddon: function() { return true; },

  contentFor: function(type, env) {
    if (type !== 'body-footer') { return; }

    const config = env.kayako || {};

    if (!config.subdomain) {
      throw new Error('Kayako config requires subdomain');
    }

    if (!config.teamName) {
      throw new Error('Kayako config requires teamName');
    }

    const subdomain    = config.subdomain;
    const teamName     = config.teamName;
    const homeTitle    = config.homeTitle    || "Hello! 👋";
    const homeSubtitle = config.homeSubtitle || `Welcome to ${teamName}. Let's chat — start a new conversation below.`;

    const widgets = config.widgets || {
      presence: {
        enabled: false
      },
      twitter: {
        enabled: false,
        twitterHandle: "18825184"
      },
      articles: {
        enabled: false,
        sectionId: 3
      }
    };

    const styles = Object.assign({
      primaryColor: "#25B0E9",
      homeBackground: "-180deg, #86CFEC 0%, #789AEC 100%",
      homePattern: "https://assets.kayako.com/messenger/pattern-1.svg",
      homeTextColor: "#2D3138"
    }, config.styles || {});

    const SETTINGS = {
      apiUrl: `https://${subdomain}.kayako.com/api/v1`,
      messengerUrl: `https://${subdomain}.kayakocdn.com/messenger`,
      realtimeUrl: "wss://kre.kayako.net/socket",
      teamName,
      homeTitle,
      homeSubtitle,
      widgets,
      styles
    };

    return `
      <script type="text/javascript">
        !function(a,b){function c(){var b=a.createElement("iframe");return b.id="kayako-messenger-frame",b.style.border="none",b.style.width="100%",b.style.height="100%",b}function d(){var c=a.createElement("script");return c.async=!0,c.type="text/javascript",c.src=b._settings.messengerUrl,c.crossOrigin="anonymous",c}function e(){var b=a.createElement("div");return b.id="kayako-messenger",b.style.position="fixed",b.style.right=0,b.style.bottom=0,b.style.width=0,b.style.height=0,b}window.kayako=b,b.readyQueue=[],b.ready=function(a){b.readyQueue.push(a)},b._settings=${JSON.stringify(SETTINGS)};var f=a.body.getElementsByTagName("script")[0],g=c(),h=e();f.parentNode.insertBefore(h,f),h.appendChild(g,f),g.contentWindow.document.open(),g.contentWindow.document.write("<!DOCTYPE html>"),g.contentWindow.document.write("<html>"),g.contentWindow.document.write("<head></head>"),g.contentWindow.document.write("<body></body>"),g.contentWindow.document.write("</html>"),g.contentWindow.document.body.appendChild(d()),g.contentWindow.document.close()}(document,window.kayako||{});
      </script>
    `;
  }
};
