/* JoãoOS XP — entry point */
(function () {
  'use strict';
  const JOS = window.JOS;
  function start() {
    JOS.setLang(JOS.lang); // applies <html lang>, title, meta description and static i18n
    JOS.shell.init();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
