/* JoãoOS XP — core: namespace, store, i18n, icon helpers, sfx, menus, balloons, app registry */
(function () {
  'use strict';
  const JOS = (window.JOS = window.JOS || {});

  // ------------------------------------------------------------------ tiny helpers
  JOS.$ = (s, r) => (r || document).querySelector(s);
  JOS.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  JOS.esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  JOS.clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  JOS.isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  const handlers = {};
  JOS.on = (ev, fn) => { (handlers[ev] = handlers[ev] || []).push(fn); };
  JOS.emit = (ev, ...a) => { (handlers[ev] || []).slice().forEach((fn) => { try { fn(...a); } catch (e) { console.error('[' + ev + ']', e); } }); };

  // ------------------------------------------------------------------ store (localStorage, never throws)
  JOS.store = {
    get(k, d) { try { const v = localStorage.getItem('jos.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('jos.' + k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
    sget(k, d) { try { const v = sessionStorage.getItem('jos.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    sset(k, v) { try { sessionStorage.setItem('jos.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
  };
  JOS.reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || JOS.store.get('motion', 'on') === 'off';

  // ------------------------------------------------------------------ i18n (pt / en)
  const detect = () => ((navigator.language || 'en').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
  JOS.lang = JOS.store.get('lang', null) || detect();
  JOS.t = (key, vars) => {
    const d = (JOS.strings && JOS.strings[JOS.lang]) || {};
    let s = d[key];
    if (s == null) s = (JOS.strings && JOS.strings.en && JOS.strings.en[key]);
    if (s == null) return key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? vars[k] : m));
    return s;
  };
  // Picks the current language from a {pt, en} object (plain strings pass through).
  JOS.L = (o) => (o && typeof o === 'object' ? (o[JOS.lang] != null ? o[JOS.lang] : o.en) : o);
  JOS.i18nApply = (root) => {
    JOS.$$('[data-i18n]', root).forEach((el) => { el.textContent = JOS.t(el.dataset.i18n); });
    JOS.$$('[data-i18n-attr]', root).forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => { const [a, k] = pair.split(':'); if (a && k) el.setAttribute(a.trim(), JOS.t(k.trim())); });
    });
  };
  JOS.setLang = (l) => {
    if (l !== 'pt' && l !== 'en') return;
    JOS.lang = l;
    JOS.store.set('lang', l);
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.title = JOS.t('meta.title');
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', JOS.t('meta.desc'));
    JOS.i18nApply(document);
    JOS.emit('langchange', l);
  };

  // ------------------------------------------------------------------ icons
  // Sprite icon (Silk, 16px grid). Sizes are integer scales: 1 (16px), 2 (32px), 3 (48px).
  // Every app/object icon is a pixel-native tile: a 24px-grid glyph on a banded color base.
  // Names are the legacy Silk names (kept as stable ids); unmapped names fall back to the Silk sprite.
  const T = {
    folder: ['folder', '#d9a21b'], folder_star: ['star', '#d9a21b'], folder_page: ['file', '#d9a21b'],
    folder_explore: ['globe', '#d9a21b'], folder_heart: ['heart', '#d9a21b'], folder_lightbulb: ['lightbulb', '#d9a21b'],
    page_white_text: ['file-text', '#3a7bd5'], page_white_acrobat: ['file-text', '#c8372d'], page_white_copy: ['copy', '#5a6a85'],
    briefcase: ['briefcase', '#a0652a'], book_open: ['university', '#2e7d5b'], bricks: ['sliders', '#8a4fd0'],
    medal_gold_1: ['trophy', '#e0a800'], medal_gold_2: ['trophy', '#9aa3b2'], medal_gold_3: ['trophy', '#b8733a'],
    award_star_gold_1: ['star', '#e0a800'], rosette: ['sparkles', '#d1498a'],
    email: ['mail', '#2f9ad0'], telephone: ['phone', '#2e9b52'], world: ['globe', '#2f7fd0'], vcard: ['user', '#0a66c2'],
    user_suit: ['human', '#3a7bd5'], house: ['home', '#2e7d5b'], computer: ['laptop', '#5a6a85'], monitor: ['monitor', '#3a7bd5'],
    server: ['server', '#5a6a85'], application_xp_terminal: ['terminal', '#2b2b33'], application_double: ['layout', '#5a6a85'],
    controller: ['gamepad', '#8a4fd0'], joystick: ['joystick', '#c8372d'], bug: ['bug', '#2e9b52'], lightbulb: ['lightbulb', '#e0a800'],
    image: ['image', '#2f9ad0'], link: ['link', '#3a7bd5'], lock: ['lock', '#9a6b1f'], magnifier: ['search', '#3a7bd5'],
    printer: ['printer', '#5a6a85'], disk: ['save', '#3a7bd5'], door_out: ['logout', '#c8372d'], arrow_refresh: ['reload', '#2e9b52'],
    information: ['info-box', '#3a7bd5'], star: ['star', '#e0a800'], skull: ['skull', '#6a1f2a'],
    flag_blue: ['flag', '#2f7fd0'], flag_green: ['flag', '#2e9b52'], flag_yellow: ['flag', '#e0a800'],
  };
  JOS.ico = (n, s, extra) => {
    const k = String(n), m = T[k];
    if (m) return '<span class="tile tile-s' + (s || 1) + (extra ? ' ' + extra : '') + '" style="--c:' + m[1] + ';--cl:' + JOS.shade(m[1], 0.28) + ';--cd:' + JOS.shade(m[1], -0.38) + '" aria-hidden="true">' + JOS.gl(m[0]) + '</span>';
    return '<i class="ico i-' + k.replace(/_/g, '-') + (s > 1 ? ' ico-' + s : '') + (extra ? ' ' + extra : '') + '" aria-hidden="true"></i>';
  };
  // Monochrome 24px-grid glyph (pixelarticons / pixelated brand marks), painted with currentColor.
  JOS.gl = (n, cls) => '<svg class="gl' + (cls ? ' ' + cls : '') + '" aria-hidden="true" focusable="false"><use href="#g-' + n + '"/></svg>';
  const hex = (h) => { h = h.replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16)); };
  JOS.shade = (h, amt) => {
    const c = hex(h).map((v) => Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt)));
    return '#' + c.map((v) => ('0' + JOS.clamp(v, 0, 255).toString(16)).slice(-2)).join('');
  };
  // Colored "app icon" tile: white glyph (or short text) on a brand color with pixel bevel.
  JOS.tile = (o) => {
    const c = o.color || '#478cbf';
    const inner = o.text ? '<span>' + JOS.esc(o.text) + '</span>' : JOS.gl(o.brand || o.glyph, o.glyphCls);
    return '<span class="tile' + (o.size ? ' tile-' + o.size : '') + '" style="--c:' + c + ';--cl:' + JOS.shade(c, 0.28) + ';--cd:' + JOS.shade(c, -0.38) + '">' + inner + '</span>';
  };
  JOS.cssId = (s) => String(s).replace(/[^a-z0-9_-]/gi, '_');

  // ------------------------------------------------------------------ misc utils
  JOS.openExternal = (url) => { window.open(url, '_blank', 'noopener,noreferrer'); };
  JOS.copy = (text) => {
    const fallback = () => {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ } ta.remove(); return ok;
    };
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(() => true, () => fallback());
    return Promise.resolve(fallback());
  };
  JOS.download = (name, text, mime) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: mime || 'text/plain;charset=utf-8' }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };
  JOS.years = () => Math.max(1, new Date().getFullYear() - ((JOS.data && JOS.data.me.since) || 2021));
  JOS.counter = (el, to, ms) => {
    if (JOS.reduceMotion()) { el.textContent = to; return; }
    const t0 = performance.now();
    (function step(t) {
      const p = Math.min(1, (t - t0) / (ms || 700));
      el.textContent = Math.round(to * (p < 1 ? Math.floor(p * 8) / 8 : 1)); // stepped = pixel feel
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };

  // ------------------------------------------------------------------ actions (event delegation)
  JOS.actions = {};
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]');
    if (!t) return;
    const fn = JOS.actions[t.dataset.act];
    if (fn) fn(t, e);
  });
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-act][role=button]:not(button):not(a)')) { e.preventDefault(); e.target.click(); }
  });

  // ------------------------------------------------------------------ app registry
  JOS.apps = {
    list: [],
    map: new Map(),
    register(def) { this.list.push(def); this.map.set(def.id, def); },
    get(id) { return this.map.get(id); },
  };

  // ------------------------------------------------------------------ sfx (WebAudio, off by default)
  JOS.sfx = (function () {
    let ctx = null;
    const patterns = {
      click: [[880, 0, 0.03, 'square']],
      open: [[523, 0, 0.05, 'square'], [784, 0.05, 0.08, 'square']],
      close: [[784, 0, 0.05, 'square'], [523, 0.05, 0.08, 'square']],
      min: [[440, 0, 0.06, 'triangle']],
      notify: [[988, 0, 0.08, 'square'], [1319, 0.09, 0.14, 'square']],
      error: [[196, 0, 0.12, 'sawtooth'], [147, 0.12, 0.18, 'sawtooth']],
      start: [[523, 0, 0.11, 'square'], [659, 0.11, 0.11, 'square'], [784, 0.22, 0.11, 'square'], [1047, 0.33, 0.35, 'square']],
    };
    function ensure() {
      if (!ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; ctx = new AC(); }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    }
    return {
      enabled: () => JOS.store.get('sound', false),
      play(name, force) {
        if (!force && !JOS.store.get('sound', false)) return;
        const c = ensure(); const p = patterns[name]; if (!c || !p) return;
        const now = c.currentTime;
        p.forEach(([f, at, d, type]) => {
          const o = c.createOscillator(), g = c.createGain();
          o.type = type; o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, now + at);
          g.gain.exponentialRampToValueAtTime(0.045, now + at + 0.005);
          g.gain.exponentialRampToValueAtTime(0.0001, now + at + d);
          o.connect(g); g.connect(c.destination); o.start(now + at); o.stop(now + at + d + 0.02);
        });
      },
    };
  })();

  // ------------------------------------------------------------------ menus (context menus + menubars)
  JOS.menu = (function () {
    let el = null, cleanup = null;
    function close() {
      if (!el) return;
      el.remove(); el = null;
      if (cleanup) { cleanup(); cleanup = null; }
    }
    // items: { label, ico, glyph, check, disabled, sep, key, bold, act }
    function show(items, x, y, opts) {
      close();
      opts = opts || {};
      el = document.createElement('div');
      el.className = 'menu'; el.setAttribute('role', 'menu');
      el.innerHTML = items.map((it, i) => {
        if (it.sep) return '<div class="msep" role="separator"></div>';
        const icon = it.check ? (it.checked ? JOS.gl('check', 'gl-12') : '') : it.ico ? JOS.ico(it.ico) : it.glyph ? JOS.gl(it.glyph, 'gl-12') : '';
        return '<button type="button" role="menuitem' + (it.check ? 'checkbox' : '') + '"' + (it.check ? ' aria-checked="' + (it.checked ? 'true' : 'false') + '"' : '') + ' data-i="' + i + '"' + (it.disabled ? ' disabled' : '') + '><span class="mi">' + icon + '</span><span>' + (it.bold ? '<b>' + JOS.esc(it.label) + '</b>' : JOS.esc(it.label)) + '</span>' + (it.key ? '<span class="mk">' + JOS.esc(it.key) + '</span>' : '') + '</button>';
      }).join('');
      document.getElementById('menus').appendChild(el);
      const r = el.getBoundingClientRect();
      const nx = JOS.clamp(x, 2, window.innerWidth - r.width - 4);
      const ny = y + r.height > window.innerHeight - 4 ? Math.max(2, (opts.flipY != null ? opts.flipY : y) - r.height) : y;
      el.style.left = nx + 'px'; el.style.top = ny + 'px';
      const btns = () => Array.from(el.querySelectorAll('button:not([disabled])'));
      el.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-i]'); if (!b) return;
        const it = items[+b.dataset.i]; close();
        if (it && it.act) it.act();
      });
      el.addEventListener('mousemove', (e) => { const b = e.target.closest('button'); if (b) { btns().forEach((n) => n.classList.remove('hl')); } });
      const onDown = (e) => { if (el && !el.contains(e.target)) close(); };
      const onKey = (e) => {
        if (!el) return;
        const list = btns(); let i = list.findIndex((n) => n.classList.contains('hl'));
        if (e.key === 'Escape') { e.preventDefault(); close(); if (opts.restoreFocus) opts.restoreFocus.focus(); }
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault(); list.forEach((n) => n.classList.remove('hl'));
          i = e.key === 'ArrowDown' ? (i + 1) % list.length : (i - 1 + list.length) % list.length; list[i].classList.add('hl'); list[i].focus();
        } else if (e.key === 'Enter' && i >= 0) { e.preventDefault(); list[i].click(); }
        else if (e.key === 'Tab') close();
      };
      document.addEventListener('pointerdown', onDown, true);
      document.addEventListener('keydown', onKey, true);
      window.addEventListener('blur', close); window.addEventListener('resize', close);
      cleanup = () => {
        document.removeEventListener('pointerdown', onDown, true); document.removeEventListener('keydown', onKey, true);
        window.removeEventListener('blur', close); window.removeEventListener('resize', close);
        if (opts.onClose) opts.onClose();
      };
      if (opts.focusFirst) { const f = btns()[0]; if (f) { f.classList.add('hl'); f.focus(); } }
      return el;
    }
    return { show, close, isOpen: () => !!el };
  })();

  // ------------------------------------------------------------------ balloons (tray notifications)
  JOS.balloon = function (o) {
    const host = document.getElementById('balloons');
    if (!host) return null;
    while (host.children.length >= 2) host.firstElementChild.remove();
    const b = document.createElement('div');
    b.className = 'balloon'; b.setAttribute('role', 'status');
    b.innerHTML = '<h4>' + (o.ico ? JOS.ico(o.ico) : '') + '<span>' + JOS.esc(o.title) + '</span></h4><p>' + JOS.esc(o.text) + '</p>'
      + (o.action ? '<button type="button" class="go">' + JOS.esc(o.action.label) + ' ' + JOS.gl('chevron-right', 'gl-12') + '</button>' : '')
      + '<button type="button" class="bx" aria-label="' + JOS.esc(JOS.t('close')) + '">' + JOS.gl('close', 'gl-12') + '</button>';
    const bye = () => { if (!b.isConnected) return; b.classList.add('bye'); setTimeout(() => b.remove(), 200); };
    b.querySelector('.bx').addEventListener('click', bye);
    const go = b.querySelector('.go');
    if (go) go.addEventListener('click', () => { bye(); o.action.run(); });
    host.appendChild(b);
    JOS.sfx.play('notify');
    if (o.timeout !== 0) setTimeout(bye, o.timeout || 11000);
    return { close: bye };
  };
})();
