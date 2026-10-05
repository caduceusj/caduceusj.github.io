/* JoãoOS XP — window manager: open / focus / drag / resize / minimize / maximize / close */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { esc, clamp, gl, ico, t } = { esc: JOS.esc, clamp: JOS.clamp, gl: JOS.gl, ico: JOS.ico, t: (k) => JOS.t(k) };

  const wins = new Map(); // key -> window
  let z = 100, active = null, cascade = 0;
  const MIN_VISIBLE = 90; // horizontal px of a window that must stay reachable

  const desk = () => document.getElementById('desktop');
  const dsize = () => ({ w: desk().clientWidth, h: desk().clientHeight });
  const titleOf = (w) => { const a = w.app; const v = typeof a.title === 'function' ? a.title(w) : a.title; return JOS.L(v) || JOS.L(a.label) || a.id; };
  const iconOf = (w) => (typeof w.app.ico === 'function' ? w.app.ico(w) : w.app.ico);

  function setRect(w, r) {
    const s = w.el.style;
    s.left = r.x + 'px'; s.top = r.y + 'px'; s.width = r.w + 'px'; s.height = r.h + 'px';
    w.rect = r;
  }

  function place(w, params) {
    const a = w.app, d = dsize();
    const minW = a.minW || 280, minH = a.minH || 160;
    const width = clamp(params.w || a.w || 640, Math.min(minW, d.w), Math.max(minW, d.w - 12));
    const height = clamp(params.h || a.h || 480, Math.min(minH, d.h), Math.max(minH, d.h - 12));
    const off = (cascade++ % 7) * 26;
    const x = clamp(Math.round((d.w - width) / 2 + off - 36), 0, Math.max(0, d.w - width));
    const y = clamp(Math.round((d.h - height) / 2 + off - 18), 0, Math.max(0, d.h - height));
    setRect(w, { x, y, w: width, h: height });
  }

  function build(key, app, params) {
    const el = document.createElement('section');
    const id = 'win-' + JOS.cssId(key);
    el.className = 'win'; el.id = id; el.dataset.key = key; el.dataset.app = app.id;
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-labelledby', id + '-t'); el.tabIndex = -1;
    el.innerHTML = '<div class="win-shadow"></div><div class="win-frame">'
      + '<header class="win-titlebar"><span class="wt-ico"></span><span class="win-title" id="' + id + '-t"></span>'
      + '<div class="win-ctrls">'
      + '<button type="button" class="wc min" data-wc="min">' + gl('minus', 'gl-12') + '</button>'
      + '<button type="button" class="wc max" data-wc="max">' + gl('square', 'gl-12') + '</button>'
      + '<button type="button" class="wc close" data-wc="close">' + gl('close', 'gl-12') + '</button>'
      + '</div></header>'
      + '<div class="win-menubar" hidden></div><div class="win-body"></div><footer class="win-status" hidden></footer></div>'
      + ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map((d) => '<i class="rz rz-' + d + '" data-rz="' + d + '"></i>').join('');
    const w = {
      key, app, params, el, id, state: 'normal', rect: null, prev: null, data: {},
      titlebar: el.querySelector('.win-titlebar'), titleEl: el.querySelector('.win-title'), iconEl: el.querySelector('.wt-ico'),
      body: el.querySelector('.win-body'), menubar: el.querySelector('.win-menubar'), status: el.querySelector('.win-status'),
      $: (s) => el.querySelector(s), $$: (s) => Array.from(el.querySelectorAll(s)),
      setTitle(s) { w.titleEl.textContent = s; JOS.emit('wm:change'); },
      setStatus(v) { setStatus(w, v); },
      refresh() { refresh(w); },
      close() { close(key); },
      focus() { focus(key); },
    };
    return w;
  }

  function setStatus(w, v) {
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) { w.status.hidden = true; w.status.innerHTML = ''; return; }
    const arr = Array.isArray(v) ? v : [v];
    w.status.hidden = false;
    w.status.innerHTML = arr.map((s, i) => '<div class="sf' + (i > 0 ? ' fix' : '') + '">' + esc(s) + '</div>').join('');
  }

  function buildMenubar(w) {
    const m = w.app.menu ? w.app.menu(w) : null;
    if (!m) { w.menubar.hidden = true; w.menubar.innerHTML = ''; return; }
    w.menubar.hidden = false;
    w.menubar.innerHTML = m.map((x, i) => '<button type="button" data-m="' + i + '">' + esc(x.label) + '</button>').join('');
    w.menubar.querySelectorAll('button').forEach((b) => b.addEventListener('click', (e) => {
      const r = b.getBoundingClientRect();
      b.classList.add('open');
      JOS.menu.show(m[+b.dataset.m].items, r.left, r.bottom, { flipY: r.top, onClose: () => b.classList.remove('open'), restoreFocus: b });
      e.stopPropagation();
    }));
  }

  function updateChrome(w) {
    const title = titleOf(w);
    w.titleEl.textContent = title;
    const ic = iconOf(w);
    w.iconEl.innerHTML = ic ? ico(ic) : '';
    w.el.querySelector('.wc.min').setAttribute('aria-label', t('wm.min'));
    w.el.querySelector('.wc.close').setAttribute('aria-label', t('wm.close'));
    const mx = w.el.querySelector('.wc.max');
    mx.setAttribute('aria-label', t(w.state === 'max' ? 'wm.restore' : 'wm.max'));
    mx.innerHTML = gl(w.state === 'max' ? 'copy' : 'square', 'gl-12');
    w.el.querySelectorAll('.wc.min,.wc.max,.rz').forEach((n) => { if (w.app.fixed) n.style.display = 'none'; });
  }

  function render(w) {
    const out = w.app.render ? w.app.render(w) : '';
    if (typeof out === 'string') w.body.innerHTML = out; else if (out) w.body.replaceChildren(out);
    if (w.app.mount) w.app.mount(w);
    const sv = w.app.status, st = typeof sv === 'function' ? sv(w) : (sv && typeof sv === 'object' && !Array.isArray(sv) ? JOS.L(sv) : sv);
    setStatus(w, st);
  }

  function refresh(w) {
    const st = w.body.scrollTop;
    updateChrome(w); buildMenubar(w); render(w);
    w.body.scrollTop = st;
    JOS.emit('wm:change');
  }

  // --------------------------------------------------------------- open / focus
  function open(appId, params) {
    params = params || {};
    const app = JOS.apps.get(appId);
    if (!app) return null;
    const key = params.key ? appId + ':' + params.key : appId;
    let w = wins.get(key);
    if (w) {
      if (w.state === 'min') restore(key); else focus(key);
      if (app.onParams) app.onParams(w, params);
      return w;
    }
    w = build(key, app, params);
    wins.set(key, w);
    place(w, params);
    updateChrome(w);
    buildMenubar(w);
    bindWindow(w);
    document.getElementById('windows').appendChild(w.el);
    render(w);
    focus(key);
    JOS.sfx.play('open');
    JOS.emit('wm:change');
    JOS.emit('wm:open', w);
    return w;
  }

  function focus(key) {
    const w = wins.get(key);
    if (!w || w.state === 'min') return;
    wins.forEach((x) => x.el.classList.remove('focused'));
    w.el.classList.add('focused');
    w.el.style.zIndex = ++z;
    const changed = active !== key;
    active = key;
    // keyboard users land inside the window (apps may move focus further, e.g. the terminal input)
    if (!w.el.contains(document.activeElement)) { try { w.el.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (changed) JOS.emit('wm:change');
    JOS.emit('wm:focus', w);
  }

  function focusTop() {
    let best = null;
    wins.forEach((w) => { if (w.state !== 'min' && !w.el.classList.contains('closing') && (!best || (+w.el.style.zIndex || 0) > (+best.el.style.zIndex || 0))) best = w; });
    if (best) focus(best.key); else { active = null; JOS.emit('wm:change'); JOS.emit('wm:focus', null); }
  }

  function afterAnim(w, cls, done) {
    let fired = false;
    const fin = () => { if (fired) return; fired = true; w.el.classList.remove(cls); done && done(); };
    w.el.addEventListener('animationend', (e) => { if (e.target === w.el) fin(); });
    setTimeout(fin, 320);
  }
  function taskRect(key) {
    const b = document.querySelector('.task[data-key="' + (window.CSS && CSS.escape ? CSS.escape(key) : key) + '"]');
    return b ? b.getBoundingClientRect() : null;
  }
  function flyVars(w, b) {
    const r = w.el.getBoundingClientRect();
    w.el.style.setProperty('--tx', Math.round(b.left + b.width / 2 - (r.left + r.width / 2)) + 'px');
    w.el.style.setProperty('--ty', Math.round(b.top + b.height / 2 - (r.top + r.height / 2)) + 'px');
  }

  function minimize(key) {
    const w = wins.get(key);
    if (!w || w.state === 'min') return;
    const b = taskRect(key);
    w.prevState = w.state; w.state = 'min';
    w.el.classList.remove('focused');
    if (active === key) { active = null; focusTop(); }
    if (JOS.reduceMotion() || !b) w.el.classList.add('min');
    else { flyVars(w, b); w.el.classList.add('minimizing'); afterAnim(w, 'minimizing', () => w.el.classList.add('min')); }
    JOS.sfx.play('min');
    JOS.emit('wm:change');
  }

  function restore(key) {
    const w = wins.get(key);
    if (!w || w.state !== 'min') return;
    w.state = w.prevState || 'normal';
    const b = taskRect(key);
    w.el.classList.remove('min');
    if (!JOS.reduceMotion() && b) { flyVars(w, b); w.el.classList.add('restoring'); afterAnim(w, 'restoring'); }
    focus(key);
    JOS.sfx.play('open');
    JOS.emit('wm:change');
  }

  function toggleMax(key) {
    const w = wins.get(key);
    if (!w || w.app.fixed || JOS.isMobile()) return;
    if (w.state === 'max') { w.state = 'normal'; w.el.classList.remove('max'); setRect(w, w.prev || w.rect); }
    else { w.prev = Object.assign({}, w.rect); w.state = 'max'; w.el.classList.add('max'); }
    updateChrome(w);
    focus(key);
    if (w.app.onResize) w.app.onResize(w);
    JOS.emit('wm:change');
  }

  function close(key) {
    const w = wins.get(key);
    if (!w) return;
    if (w.app.onClose) { try { w.app.onClose(w); } catch (e) { console.error(e); } }
    wins.delete(key);
    w.el.classList.add('closing');
    const rm = () => w.el.remove();
    w.el.addEventListener('animationend', (e) => { if (e.target === w.el) rm(); });
    setTimeout(rm, 240);
    if (active === key) { active = null; focusTop(); }
    JOS.sfx.play('close');
    JOS.emit('wm:change');
    JOS.emit('wm:close', w);
  }

  // --------------------------------------------------------------- pointer interactions
  function bindWindow(w) {
    w.el.addEventListener('pointerdown', () => { if (active !== w.key) focus(w.key); }, true);
    w.el.querySelector('.win-ctrls').addEventListener('click', (e) => {
      const b = e.target.closest('[data-wc]'); if (!b) return;
      e.stopPropagation();
      const k = b.dataset.wc;
      if (k === 'close') close(w.key); else if (k === 'min') minimize(w.key); else toggleMax(w.key);
    });
    w.titlebar.addEventListener('dblclick', (e) => { if (!e.target.closest('.win-ctrls')) toggleMax(w.key); });
    w.titlebar.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      JOS.menu.show([
        { label: t('wm.restore'), ico: 'application_double', disabled: w.state !== 'max', act: () => toggleMax(w.key) },
        { label: t('wm.min'), glyph: 'minus', act: () => minimize(w.key) },
        { label: t('wm.max'), glyph: 'square', disabled: w.state === 'max' || !!w.app.fixed, act: () => toggleMax(w.key) },
        { sep: true },
        { label: t('wm.close'), glyph: 'close', bold: true, act: () => close(w.key) },
      ], e.clientX, e.clientY);
    });

    // drag
    w.titlebar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('.win-ctrls') || JOS.isMobile() || w.state === 'max') return;
      if (e.pointerType === 'mouse') e.preventDefault();
      const s = { x: e.clientX, y: e.clientY, l: w.rect.x, t: w.rect.y };
      let nx = s.l, ny = s.t, raf = 0;
      try { w.titlebar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      w.el.classList.add('dragging');
      const move = (ev) => {
        const d = dsize();
        nx = clamp(s.l + ev.clientX - s.x, MIN_VISIBLE - w.rect.w, d.w - MIN_VISIBLE);
        ny = clamp(s.t + ev.clientY - s.y, 0, d.h - 30);
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; w.el.style.left = nx + 'px'; w.el.style.top = ny + 'px'; });
      };
      const up = () => {
        w.titlebar.removeEventListener('pointermove', move); w.titlebar.removeEventListener('pointerup', up); w.titlebar.removeEventListener('pointercancel', up);
        w.el.classList.remove('dragging');
        w.el.style.left = nx + 'px'; w.el.style.top = ny + 'px';
        w.rect.x = nx; w.rect.y = ny;
      };
      w.titlebar.addEventListener('pointermove', move); w.titlebar.addEventListener('pointerup', up); w.titlebar.addEventListener('pointercancel', up);
    });

    // resize
    w.el.querySelectorAll('.rz').forEach((h) => h.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || w.state === 'max' || JOS.isMobile()) return;
      e.preventDefault(); e.stopPropagation();
      focus(w.key);
      const dir = h.dataset.rz;
      const s = { x: e.clientX, y: e.clientY, r: Object.assign({}, w.rect) };
      const minW = w.app.minW || 280, minH = w.app.minH || 160;
      let cur = s.r, raf = 0;
      try { h.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      w.el.classList.add('resizing');
      const move = (ev) => {
        const d = dsize(), dx = ev.clientX - s.x, dy = ev.clientY - s.y;
        let x = s.r.x, y = s.r.y, ww = s.r.w, hh = s.r.h;
        if (dir.indexOf('e') >= 0) ww = clamp(s.r.w + dx, minW, Math.max(minW, d.w - x));
        if (dir.indexOf('s') >= 0) hh = clamp(s.r.h + dy, minH, Math.max(minH, d.h - y));
        if (dir.indexOf('w') >= 0) { const nw = clamp(s.r.w - dx, minW, s.r.x + s.r.w); x = s.r.x + s.r.w - nw; ww = nw; }
        if (dir.indexOf('n') >= 0) { const nh = clamp(s.r.h - dy, minH, s.r.y + s.r.h); y = s.r.y + s.r.h - nh; hh = nh; }
        cur = { x, y, w: ww, h: hh };
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; const st = w.el.style; st.left = cur.x + 'px'; st.top = cur.y + 'px'; st.width = cur.w + 'px'; st.height = cur.h + 'px'; });
      };
      const up = () => {
        h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); h.removeEventListener('pointercancel', up);
        w.el.classList.remove('resizing');
        setRect(w, cur);
        if (w.app.onResize) w.app.onResize(w);
      };
      h.addEventListener('pointermove', move); h.addEventListener('pointerup', up); h.addEventListener('pointercancel', up);
    }));
  }

  window.addEventListener('resize', () => {
    if (JOS.isMobile()) return;
    const d = dsize();
    wins.forEach((w) => {
      if (w.state === 'max' || !w.rect) return;
      const r = w.rect;
      const nw = Math.min(r.w, Math.max(w.app.minW || 280, d.w)), nh = Math.min(r.h, Math.max(w.app.minH || 160, d.h));
      const nx = clamp(r.x, 0, Math.max(0, d.w - nw)), ny = clamp(r.y, 0, Math.max(0, d.h - nh));
      if (nw !== r.w || nh !== r.h || nx !== r.x || ny !== r.y) setRect(w, { x: nx, y: ny, w: nw, h: nh });
    });
  });

  JOS.on('langchange', () => wins.forEach((w) => refresh(w)));

  // Moves a window to another key (e.g. the project viewer stepping to the next project).
  // If a window with the target key already exists it is focused and `false` is returned.
  function rekey(w, newKey) {
    if (wins.has(newKey) && wins.get(newKey) !== w) { const o = wins.get(newKey); if (o.state === 'min') restore(newKey); else focus(newKey); return false; }
    wins.delete(w.key); w.key = newKey; wins.set(newKey, w); w.el.dataset.key = newKey;
    if (active && !wins.has(active)) active = newKey;
    JOS.emit('wm:change');
    return true;
  }

  JOS.winOf = (el) => { const n = el && el.closest && el.closest('.win'); return n ? wins.get(n.dataset.key) : null; };

  JOS.wm = {
    open, close, focus, minimize, restore, toggleMax, rekey,
    get: (key) => wins.get(key),
    list: () => Array.from(wins.values()),
    active: () => (active ? wins.get(active) : null),
    minimizeAll() { wins.forEach((w) => { if (w.state !== 'min') minimize(w.key); }); },
    closeAll() { Array.from(wins.keys()).forEach((k) => close(k)); },
    refresh: () => wins.forEach((w) => refresh(w)),
  };
})();
