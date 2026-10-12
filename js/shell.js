/* JoãoOS XP — shell: desktop icons, start menu, taskbar, tray, context menus, boot/login/shutdown, hash router */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { $, esc, gl, ico } = JOS;
  const t = (k, v) => JOS.t(k, v);
  const L = (o) => JOS.L(o);

  const THEME_COLORS = { blue: '#245edb', olive: '#8ea25a', silver: '#c0c4de' };
  const state = { startOpen: false, startAll: false, hidden: null, ready: false };

  // ------------------------------------------------------------------ desktop icons
  // Pixel-native app tiles (24px-grid glyph on a banded color tile), one per desktop app.
  const TILES = {
    projects: { glyph: 'folder', color: '#d9a21b' },
    resume: { glyph: 'file-text', color: '#c8372d' },
    skills: { glyph: 'sliders', color: '#8a4fd0' },
    experience: { glyph: 'briefcase', color: '#a0652a' },
    education: { glyph: 'university', color: '#2e7d5b' },
    achievements: { glyph: 'trophy', color: '#e0a800' },
    about: { glyph: 'info-box', color: '#3a7bd5' },
    contact: { glyph: 'mail', color: '#2f9ad0' },
    terminal: { glyph: 'terminal', color: '#2b2b33' },
    display: { glyph: 'monitor', color: '#3a7bd5' },
    aboutos: { glyph: 'laptop', color: '#5a6a85' },
  };
  function bigIcon(app) {
    const b = app.big || (TILES[app.id] && { tile: TILES[app.id] });
    if (b && b.img) return '<img class="px" src="' + b.img + '" width="' + b.w + '" height="' + b.h + '" alt="">';
    if (b && b.tile) return JOS.tile(Object.assign({ size: 'lg' }, b.tile));
    return ico((b && b.ico) || app.ico, 3);
  }
  function renderIcons() {
    const apps = JOS.apps.list.filter((a) => a.desk).sort((a, b) => a.desk - b.desk);
    $('#icons').innerHTML = apps.map((a) =>
      '<button type="button" class="dicon" data-act="open-app" data-app="' + a.id + '"><span class="dv">' + bigIcon(a) + '</span><span class="dl">' + esc(L(a.label)) + '</span></button>'
    ).join('');
  }

  // ------------------------------------------------------------------ start menu
  function appIcon(a, size) {
    if (a.pinIcon && size === 2) return a.pinIcon;
    return ico(a.ico, size || 1);
  }
  function smItem(a, big) {
    const sub = typeof a.sub === 'function' ? a.sub() : L(a.sub);
    return '<button type="button" class="sm-item' + (big ? ' big' : '') + '" role="menuitem" data-act="open-app" data-app="' + a.id + '">'
      + appIcon(a, big ? 2 : 1) + '<span class="t"><b>' + esc(L(a.label)) + '</b>' + (big && sub ? '<small>' + esc(sub) + '</small>' : '') + '</span></button>';
  }
  function linkItem(href, tile, label) {
    return '<a class="sm-item" role="menuitem" href="' + href + '" target="_blank" rel="noopener noreferrer">' + JOS.tile(Object.assign({ size: 'sm' }, tile)) + '<span class="t"><b>' + esc(label) + '</b></span></a>';
  }
  function renderStart() {
    const d = JOS.data, el = $('#startmenu');
    const pinned = JOS.apps.list.filter((a) => a.pin).sort((a, b) => a.pin - b.pin);
    const right = JOS.apps.list.filter((a) => a.right).sort((a, b) => a.right - b.right);
    const left = state.startAll
      ? '<div class="sm-head-label" aria-hidden="true">' + esc(t('sm.all')) + '</div>' + JOS.apps.list.map((a) => smItem(a, false)).join('')
        + '<div class="sm-sep" role="separator"></div><button type="button" class="sm-item sm-back" role="menuitem" data-act="sm-back">' + gl('chevron-left') + '<span class="t"><b>' + esc(t('sm.back')) + '</b></span></button>'
      : pinned.map((a) => smItem(a, true)).join('')
        + '<div class="sm-sep" role="separator"></div><button type="button" class="sm-item sm-all" role="menuitem" data-act="sm-all"><span class="t"><b>' + esc(t('sm.all')) + '</b></span>' + gl('chevron-right') + '</button>';
    el.innerHTML =
      '<div class="sm-head"><img class="px" src="assets/img/me-24.png" width="48" height="48" alt=""><div><b>' + esc(d.me.short) + '</b><small>' + esc(L(d.me.headline)) + '</small></div></div>'
      + '<div class="sm-cols"><div class="sm-left" role="menu" aria-label="' + esc(t('sm.programs')) + '">' + left + '</div><div class="sm-right" role="menu" aria-label="' + esc(t('sm.places')) + '">'
      + right.map((a) => smItem(a, false)).join('')
      + '<div class="sm-sep" role="separator"></div>'
      + linkItem(d.links.linkedin, { glyph: 'linkedin', color: '#0a66c2' }, 'LinkedIn')
      + linkItem(d.links.github, { glyph: 'github', color: '#2b3137' }, 'GitHub')
      + linkItem(d.links.itch, { brand: 'itch', color: '#e8504f' }, 'itch.io')
      + linkItem(d.links.steam, { brand: 'steam', color: '#1b2838' }, 'Steam')
      + '</div></div>'
      + '<div class="sm-foot"><button type="button" data-act="logoff">' + ico('door_out') + '<span>' + esc(t('sm.logoff')) + '</span></button>'
      + '<button type="button" data-act="shutdown"><span class="pwr">' + gl('power') + '</span><span>' + esc(t('sm.turnoff')) + '</span></button></div>';
  }
  function setStart(open) {
    state.startOpen = open;
    const el = $('#startmenu'), btn = $('#start-btn');
    if (!open) state.startAll = false;
    if (open) renderStart();
    el.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) JOS.sfx.play('click');
  }
  const closeStart = () => { if (state.startOpen) setStart(false); };

  // ------------------------------------------------------------------ taskbar / tray
  function renderTasks() {
    const act = JOS.wm.active();
    $('#tasks').innerHTML = JOS.wm.list().map((w) =>
      '<button type="button" class="task' + (act && act.key === w.key && w.state !== 'min' ? ' on' : '') + (w.state === 'min' ? ' min' : '') + '" data-key="' + esc(w.key) + '" title="' + esc(w.titleEl.textContent) + '">'
      + w.iconEl.innerHTML + '<span>' + esc(w.titleEl.textContent) + '</span></button>'
    ).join('');
  }
  function updateTray() {
    const lb = $('#tray-lang');
    lb.textContent = JOS.lang.toUpperCase();
    const sb = $('#tray-sound');
    sb.setAttribute('aria-pressed', JOS.sfx.enabled() ? 'true' : 'false');
    if (!sb.firstChild) sb.innerHTML = gl('volume-2', 'gl-12 gl-snd-on') + gl('volume-x', 'gl-12 gl-snd-off');
    $('#show-desktop').innerHTML = '';
  }
  function updateClock() {
    const n = new Date(), c = $('#clock');
    c.textContent = n.toLocaleTimeString(JOS.lang === 'pt' ? 'pt-BR' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: JOS.lang !== 'pt' });
    c.dateTime = n.toISOString();
    c.title = n.toLocaleDateString(JOS.lang === 'pt' ? 'pt-BR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  JOS.setTheme = (name) => {
    if (!THEME_COLORS[name]) name = 'blue';
    document.documentElement.setAttribute('data-theme', name);
    JOS.store.set('theme', name);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', THEME_COLORS[name]);
    JOS.emit('themechange', name);
  };
  JOS.setSound = (on) => {
    JOS.store.set('sound', !!on);
    updateTray();
    if (on) JOS.sfx.play('notify', true);
    JOS.emit('soundchange', !!on);
  };
  JOS.setWallpaper = (kind) => { JOS.store.set('wall', kind); JOS.wallpaper.apply(); JOS.emit('wallchange', kind); };
  JOS.setMotion = (v) => { JOS.store.set('motion', v); document.documentElement.dataset.motion = JOS.reduceMotion() ? 'off' : 'on'; JOS.emit('motionchange', v); };

  // ------------------------------------------------------------------ actions
  const A = JOS.actions;
  A['open-app'] = (el) => {
    JOS.wm.open(el.dataset.app, el.dataset.key ? { key: el.dataset.key } : {});
    closeStart();
    el.classList && el.classList.contains('dicon') && JOS.$$('.dicon.sel').forEach((n) => n.classList.remove('sel'));
  };
  A['open-url'] = (el) => JOS.openExternal(el.dataset.url);
  A['sm-all'] = () => { state.startAll = true; renderStart(); const f = $('#startmenu .sm-item'); f && f.focus(); };
  A['sm-back'] = () => { state.startAll = false; renderStart(); };
  A.logoff = () => { closeStart(); logoff(); };
  A.shutdown = () => { closeStart(); shutdown(); };
  A['toggle-lang'] = () => JOS.setLang(JOS.lang === 'pt' ? 'en' : 'pt');

  // ------------------------------------------------------------------ routing (#app or #app/key)
  function parseHash() {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    if (!h) return null;
    const i = h.indexOf('/'), app = i < 0 ? h : h.slice(0, i), key = i < 0 ? null : h.slice(i + 1);
    return JOS.apps.get(app) ? { app, key: key || null } : null;
  }
  const openRoute = (r) => (r ? JOS.wm.open(r.app, r.key ? { key: r.key } : {}) : null);
  JOS.on('wm:focus', (w) => {
    if (!state.ready) return;
    const h = w ? '#' + w.app.id + (w.params && w.params.key ? '/' + encodeURIComponent(w.params.key) : '') : '';
    try { history.replaceState(null, '', h || location.pathname + location.search); } catch (e) { /* file:// etc. */ }
  });

  // ------------------------------------------------------------------ boot / login / shutdown
  function ready() {
    state.ready = true;
    const r = parseHash();
    openRoute(r) || JOS.wm.open('welcome');
    JOS.sfx.play('start');
    scheduleBalloons();
  }
  function boot() {
    const bootEl = $('#boot'), loginEl = $('#login');
    const reduce = JOS.reduceMotion();
    let done = false, phase = 'boot';
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const toDesktop = () => {
      if (done) return; done = true;
      timers.forEach(clearTimeout);
      JOS.store.sset('booted', true);
      loginEl.classList.add('out'); bootEl && bootEl.classList.add('out');
      ready();
      setTimeout(() => { loginEl.hidden = true; if (bootEl) bootEl.remove(); }, 400);
    };
    const toLogin = () => {
      if (done || phase !== 'boot') return; phase = 'login';
      loginEl.hidden = false;
      bootEl.classList.add('out');
      setTimeout(() => bootEl.remove(), 400);
      later(toDesktop, reduce ? 300 : 1700);
    };
    const bot = /bot|crawl|spider|slurp|facebookexternalhit|lighthouse|pagespeed|preview/i.test(navigator.userAgent);
    if (JOS.store.sget('booted', false) || bot || /[?&]noboot\b/.test(location.search)) {
      loginEl.hidden = true; bootEl.remove(); done = true; ready(); return;
    }
    later(toLogin, reduce ? 500 : 2300);
    const skip = () => { if (phase === 'boot') toLogin(); else toDesktop(); };
    document.addEventListener('keydown', function k(e) { if (done) { document.removeEventListener('keydown', k); return; } if (e.key !== 'Tab') skip(); });
    bootEl.addEventListener('pointerdown', skip);
    loginEl.addEventListener('pointerdown', skip);
  }
  function showLogin(after) {
    const loginEl = $('#login');
    loginEl.hidden = false; loginEl.classList.remove('out');
    let go = false;
    const enter = () => { if (go) return; go = true; loginEl.classList.add('out'); setTimeout(() => { loginEl.hidden = true; after && after(); }, 380); };
    loginEl.addEventListener('pointerdown', enter, { once: true });
    setTimeout(enter, JOS.reduceMotion() ? 300 : 1500);
  }
  function logoff() {
    JOS.wm.closeAll();
    showLogin(() => JOS.wm.open('welcome'));
  }
  function shutdown() {
    const s = $('#shutdown');
    JOS.wm.minimizeAll();
    s.hidden = false; s.style.opacity = 0; s.style.transition = 'opacity .5s steps(8)';
    requestAnimationFrame(() => { s.style.opacity = 1; });
    const f = $('#sd-restart'); f && f.focus();
  }

  // ------------------------------------------------------------------ balloons + easter egg
  function scheduleBalloons() {
    if (JOS.store.sget('bal', false)) return;
    JOS.store.sset('bal', true);
    setTimeout(() => {
      if (!JOS.wm.get('malleus')) JOS.balloon({ ico: 'skull', title: t('bal.malleus.t'), text: t('bal.malleus.x'), action: { label: t('bal.malleus.a'), run: () => JOS.wm.open('malleus') } });
    }, 6500);
    setTimeout(() => {
      if (!JOS.wm.get('contact')) JOS.balloon({ ico: 'email', title: t('bal.contact.t'), text: t('bal.contact.x'), action: { label: t('bal.contact.a'), run: () => JOS.wm.open('contact') } });
    }, 40000);
  }
  JOS.confetti = () => {
    if (JOS.reduceMotion()) return;
    const d = $('#desktop'), colors = ['#ff5d5d', '#ffd23f', '#3ddc84', '#4aa3ff', '#c77dff', '#ffffff'];
    for (let i = 0; i < 70; i++) {
      const c = document.createElement('i'); c.className = 'cf';
      c.style.cssText = 'left:' + Math.random() * 100 + '%;background:' + colors[i % colors.length] + ';animation-delay:' + Math.random() * 0.9 + 's;animation-duration:' + (1.8 + Math.random() * 1.6) + 's';
      d.appendChild(c); setTimeout(() => c.remove(), 4200);
    }
  };
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  document.addEventListener('keydown', (e) => {
    if (/input|textarea|select/i.test(e.target.tagName)) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    kpos = k === KONAMI[kpos] ? kpos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) { kpos = 0; JOS.confetti(); JOS.balloon({ ico: 'star', title: t('egg.t'), text: t('egg.x'), timeout: 7000 }); }
  });

  // ------------------------------------------------------------------ context menus
  function desktopMenu(x, y, iconApp) {
    const items = [];
    if (iconApp) items.push({ label: t('ctx.open'), ico: iconApp.ico, bold: true, act: () => JOS.wm.open(iconApp.id) }, { sep: true });
    items.push(
      { label: t('ctx.refresh'), ico: 'arrow_refresh', act: () => { JOS.wallpaper.apply(); renderIcons(); } },
      { sep: true },
      { label: t('ctx.display'), ico: 'monitor', act: () => JOS.wm.open('display') },
      { label: JOS.lang === 'pt' ? 'Switch to English' : 'Mudar para Português', ico: 'world', act: () => JOS.setLang(JOS.lang === 'pt' ? 'en' : 'pt') },
      { label: t('tray.sound'), check: true, checked: JOS.sfx.enabled(), act: () => JOS.setSound(!JOS.sfx.enabled()) },
      { sep: true },
      { label: t('ctx.projects'), ico: 'folder', act: () => JOS.wm.open('projects') },
      { label: t('ctx.terminal'), ico: 'application_xp_terminal', act: () => JOS.wm.open('terminal') },
      { sep: true },
      { label: t('ctx.about'), ico: 'information', act: () => JOS.wm.open('aboutos') }
    );
    JOS.menu.show(items, x, y);
  }

  // ------------------------------------------------------------------ init
  function init() {
    document.documentElement.dataset.motion = JOS.reduceMotion() ? 'off' : 'on';
    JOS.i18nApply(document);
    renderIcons(); renderStart(); updateTray(); updateClock(); renderTasks();
    setInterval(updateClock, 15000);
    JOS.wallpaper.apply();

    $('#start-btn').addEventListener('click', (e) => { e.stopPropagation(); setStart(!state.startOpen); if (state.startOpen) { const f = $('#startmenu .sm-item'); if (e.detail === 0 && f) f.focus(); } });
    document.addEventListener('pointerdown', (e) => {
      if (state.startOpen && !e.target.closest('#startmenu') && !e.target.closest('#start-btn')) closeStart();
      if (!e.target.closest('.dicon')) JOS.$$('.dicon.sel').forEach((n) => n.classList.remove('sel'));
    }, true);
    $('#startmenu').addEventListener('keydown', (e) => {
      const items = JOS.$$('#startmenu .sm-item'), i = items.indexOf(document.activeElement);
      if (e.key === 'Escape') { closeStart(); $('#start-btn').focus(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.startOpen) closeStart(); });

    $('#tasks').addEventListener('click', (e) => {
      const b = e.target.closest('.task'); if (!b) return;
      const w = JOS.wm.get(b.dataset.key); if (!w) return;
      const act = JOS.wm.active();
      if (w.state === 'min') JOS.wm.restore(w.key); else if (act && act.key === w.key) JOS.wm.minimize(w.key); else JOS.wm.focus(w.key);
    });
    $('#tasks').addEventListener('auxclick', (e) => { const b = e.target.closest('.task'); if (b && e.button === 1) { e.preventDefault(); JOS.wm.close(b.dataset.key); } });
    $('#tasks').addEventListener('contextmenu', (e) => {
      const b = e.target.closest('.task'); if (!b) return;
      e.preventDefault();
      const w = JOS.wm.get(b.dataset.key); if (!w) return;
      const r = b.getBoundingClientRect();
      JOS.menu.show([
        { label: t('wm.restore'), ico: 'application_double', disabled: w.state === 'normal', act: () => (w.state === 'min' ? JOS.wm.restore(w.key) : JOS.wm.toggleMax(w.key)) },
        { label: t('wm.min'), glyph: 'minus', disabled: w.state === 'min', act: () => JOS.wm.minimize(w.key) },
        { label: t('wm.max'), glyph: 'square', disabled: w.state === 'max', act: () => { if (w.state === 'min') JOS.wm.restore(w.key); JOS.wm.toggleMax(w.key); } },
        { sep: true },
        { label: t('wm.close'), glyph: 'close', bold: true, act: () => JOS.wm.close(w.key) },
      ], r.left, r.top, { flipY: r.top });
    });
    $('#tray-lang').addEventListener('click', () => JOS.setLang(JOS.lang === 'pt' ? 'en' : 'pt'));
    $('#tray-sound').addEventListener('click', () => JOS.setSound(!JOS.sfx.enabled()));
    $('#show-desktop').addEventListener('click', () => {
      if (state.hidden) { state.hidden.forEach((k) => JOS.wm.restore(k)); state.hidden = null; }
      else { const open = JOS.wm.list().filter((w) => w.state !== 'min').map((w) => w.key); if (open.length) { state.hidden = open; JOS.wm.minimizeAll(); } }
    });
    $('#desktop').addEventListener('contextmenu', (e) => {
      if (e.target.closest('.win')) return;
      e.preventDefault();
      const ic = e.target.closest('.dicon');
      desktopMenu(e.clientX, e.clientY, ic ? JOS.apps.get(ic.dataset.app) : null);
    });
    $('#icons').addEventListener('pointerdown', (e) => {
      const ic = e.target.closest('.dicon'); if (!ic) return;
      JOS.$$('.dicon.sel').forEach((n) => n.classList.remove('sel')); ic.classList.add('sel');
    });
    $('#login-user').addEventListener('click', () => {});
    $('#sd-restart').addEventListener('click', () => { JOS.store.sset('booted', false); JOS.store.sset('bal', false); location.reload(); });
    $('#sd-contact').addEventListener('click', () => { $('#shutdown').hidden = true; JOS.wm.restore && JOS.wm.list().forEach((w) => { if (w.state === 'min') JOS.wm.restore(w.key); }); JOS.wm.open('contact'); });
    window.addEventListener('hashchange', () => openRoute(parseHash()));

    JOS.on('langchange', () => { renderIcons(); renderStart(); updateTray(); updateClock(); renderTasks(); });
    JOS.on('wm:change', renderTasks);
    JOS.on('wm:open', () => closeStart());
    boot();
  }

  JOS.shell = { init, setStart, closeStart, shutdown, logoff, renderIcons, renderStart, THEME_COLORS };
})();
