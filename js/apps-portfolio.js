/* JoãoOS XP — portfolio apps: Projects explorer, Project viewer, Malleus Maleficarum, Skills */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { esc, gl, ico } = JOS;
  const t = (k, v) => JOS.t(k, v);
  const L = (o) => JOS.L(o);
  const D = () => JOS.data;
  const reg = (def) => JOS.apps.register(def);
  const norm = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const tr = (k) => (k.indexOf('.') > 0 ? t(k) : k);
  const media = (id) => (window.MEDIA && window.MEDIA.projects && window.MEDIA.projects[id]) || null;
  const ext = (href, cls, inner, extra) => '<a class="' + cls + '" href="' + href + '" target="_blank" rel="noopener noreferrer"' + (extra || '') + '>' + inner + '</a>';
  const kindLabel = (p) => t('ex.kind.' + p.kind);
  const typeIco = { game: 'controller', serious: 'user_suit', xr: 'webcam', music: 'music' };

  // ====================================================================== Projects explorer
  const COLLS = [
    { id: 'all', ico: 'folder', label: 'ex.c.all', path: '', test: () => true },
    { id: 'featured', ico: 'folder_star', label: 'ex.c.featured', path: 'Featured', test: (p) => p.featured },
    { id: 'godot', ico: 'folder_page', label: 'Godot', path: 'Godot', test: (p) => p.eng.indexOf('Godot') >= 0 },
    { id: 'unity', ico: 'folder_explore', label: 'Unity', path: 'Unity', test: (p) => p.eng.indexOf('Unity') >= 0 },
    { id: 'xr', ico: 'folder_lightbulb', label: 'ex.c.xr', path: 'XR-Research', test: (p) => p.kind === 'xr' || p.kind === 'serious' },
    { id: 'music', ico: 'folder_heart', label: 'ex.c.music', path: 'Music', test: (p) => p.kind === 'music' },
  ];
  const coll = (id) => COLLS.find((c) => c.id === id) || COLLS[0];
  const SORTS = {
    featured: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
    name: (a, b) => a.title.localeCompare(b.title),
    engine: (a, b) => a.eng[0].localeCompare(b.eng[0]) || a.title.localeCompare(b.title),
    kind: (a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title),
  };
  function blob(p) {
    return p._q || (p._q = norm([p.title, p.desc && typeof p.desc === 'object' ? p.desc.pt + ' ' + p.desc.en : p.desc, p.eng.join(' '), (p.tags || []).map((x) => (typeof x === 'object' ? x.pt + ' ' + x.en : x)).join(' '), p.kind, p.role ? p.role.pt + ' ' + p.role.en : ''].join(' ')));
  }
  function xs(w) {
    if (!w.data.x) {
      const c = (w.params && w.params.coll) || 'all';
      w.data.x = { view: JOS.store.get('exView', 'thumbs'), q: (w.params && w.params.q) || '', coll: c, sort: { k: 'featured', d: 1 }, sel: null, hist: [c], hp: 0 };
    }
    return w.data.x;
  }
  function items(w) {
    const s = xs(w), c = coll(s.coll), q = norm(s.q.trim());
    const list = D().projects.filter((p) => c.test(p) && (!q || blob(p).indexOf(q) >= 0));
    const f = SORTS[s.sort.k] || SORTS.featured;
    return list.map((p, i) => [p, i]).sort((a, b) => f(a[0], b[0]) * s.sort.d || a[1] - b[1]).map((x) => x[0]);
  }
  const badges = (p) => (p.steam ? '<span class="xi-b steam">Steam</span>' : '') + (p.featured ? '<span class="xi-b star" title="' + esc(t('ex.c.featured')) + '">' + gl('star', 'gl-12') + '</span>' : '');
  function itemHTML(p, view, sel) {
    const attrs = ' class="xi' + (sel ? ' sel' : '') + '" role="option" aria-selected="' + (sel ? 'true' : 'false') + '" data-id="' + p.id + '" title="' + esc(p.title) + '"';
    if (view === 'list') {
      return '<button type="button"' + attrs + '><span class="xi-th">' + JOS.cover(p, 'thumb', { alt: '' }) + '</span><span class="xi-name">' + esc(p.title) + '</span><span class="xi-eng">' + esc(JOS.engineLabel(p)) + '</span></button>';
    }
    return '<button type="button"' + attrs + '><span class="xi-img">' + JOS.cover(p, 'thumb', { alt: '' }) + badges(p) + '</span><span class="xi-name">' + esc(p.title) + '</span><span class="xi-eng">' + esc(JOS.engineLabel(p)) + '</span></button>';
  }
  function viewHTML(w, list) {
    const s = xs(w);
    if (!list.length) return '<p class="xv-empty">' + ico('magnifier') + ' ' + esc(t('ex.none')) + '</p>';
    if (s.view === 'details') {
      const th = (k, label) => '<th scope="col" data-sort="' + k + '" aria-sort="' + (s.sort.k === k ? (s.sort.d > 0 ? 'ascending' : 'descending') : 'none') + '">' + esc(label) + (s.sort.k === k ? ' ' + gl(s.sort.d > 0 ? 'chevron-up' : 'chevron-down', 'gl-12') : '') + '</th>';
      return '<table class="xt"><thead><tr>' + th('name', t('ex.col.name')) + th('engine', t('ex.col.engine')) + th('kind', t('ex.col.type')) + '<th scope="col">' + esc(t('ex.col.tagline')) + '</th></tr></thead><tbody>'
        + list.map((p) => '<tr class="xi' + (s.sel === p.id ? ' sel' : '') + '" role="option" tabindex="-1" aria-selected="' + (s.sel === p.id ? 'true' : 'false') + '" data-id="' + p.id + '"><td><span class="xt-n"><span class="xi-th">' + JOS.cover(p, 'thumb', { alt: '' }) + '</span>' + esc(p.title) + (p.featured ? ' ' + gl('star', 'gl-12') : '') + '</span></td><td>' + esc(JOS.engineLabel(p)) + '</td><td>' + esc(kindLabel(p)) + '</td><td class="xt-d">' + esc(L(p.desc)) + '</td></tr>').join('')
        + '</tbody></table>';
    }
    return '<div class="xg xg-' + s.view + '">' + list.map((p) => itemHTML(p, s.view, s.sel === p.id)).join('') + '</div>';
  }
  function detailHTML(p) {
    const links = (p.steam ? ext(p.steam, 'btn sm steam', gl('steam', '') + ' Steam') : '') + (p.url ? ext(p.url, 'btn sm', gl(p.kind === 'music' ? 'ytmusic' : 'itch', '') + ' ' + esc(p.kind === 'music' ? t('ex.listen') : t('ex.play'))) : '');
    return '<div class="xd"><div class="xd-img">' + JOS.cover(p, 'thumb', { alt: p.title }) + '</div><h3>' + esc(p.title) + '</h3><p class="xd-desc">' + esc(L(p.desc)) + '</p>'
      + '<dl class="xd-dl"><dt>' + esc(t('ex.engine')) + '</dt><dd>' + esc(JOS.engineLabel(p)) + '</dd><dt>' + esc(t('ex.type')) + '</dt><dd>' + esc(kindLabel(p)) + '</dd>'
      + (p.role ? '<dt>' + esc(t('ex.role')) + '</dt><dd>' + esc(L(p.role)) + '</dd>' : '') + (p.award ? '<dt>' + esc(t('ex.award')) + '</dt><dd>' + esc(L(p.award)) + '</dd>' : '') + '</dl>'
      + '<div class="xd-btns"><button type="button" class="btn sm primary" data-act="proj-open" data-id="' + p.id + '">' + ico('image') + ' ' + esc(t('ex.open')) + '</button>' + links + '</div></div>';
  }
  function sideHTML(w) {
    const s = xs(w), all = D().projects;
    const collections = COLLS.map((c) => '<button type="button" class="xc' + (s.coll === c.id ? ' on' : '') + '" data-coll="' + c.id + '"' + (s.coll === c.id ? ' aria-current="true"' : '') + '>' + ico(c.ico) + '<span>' + esc(tr(c.label)) + '</span><i>' + all.filter(c.test).length + '</i></button>').join('');
    const sel = s.sel && JOS.project(s.sel);
    let det;
    if (sel) det = detailHTML(sel);
    else {
      const n = items(w).length;
      det = '<div class="xd xd-info">' + ico('folder_explore', 3) + '<h3>' + esc(tr(coll(s.coll).label)) + '</h3><p class="xd-desc">' + esc(t('ex.objects', { n })) + '</p><p class="xd-hint">' + esc(t('ex.hint')) + '</p></div>';
    }
    return '<section class="xp"><h4>' + esc(t('ex.coll')) + gl('chevron-up', 'gl-12') + '</h4><div class="xp-b">' + collections + '</div></section><section class="xp"><h4>' + esc(t('ex.details')) + gl('chevron-up', 'gl-12') + '</h4><div class="xp-b">' + det + '</div></section>';
  }
  function exUpdate(w, parts) {
    const s = xs(w), list = items(w); w.data.list = list;
    parts = parts || { view: 1, side: 1 };
    if (parts.view) w.$('.xv').innerHTML = viewHTML(w, list);
    if (parts.side) w.$('.xs').innerHTML = sideHTML(w);
    const c = coll(s.coll);
    w.$('.xaddr-t').textContent = 'C:\\Users\\JoaoAnisio\\Projects' + (c.path ? '\\' + c.path : '');
    w.$('[data-xb=back]').disabled = s.hp <= 0;
    w.$('[data-xb=fwd]').disabled = s.hp >= s.hist.length - 1;
    w.$('[data-xb=up]').disabled = s.coll === 'all';
    w.$$('.xviews button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === s.view ? 'true' : 'false'));
    const cs = w.$('.xcoll'); if (cs) cs.value = s.coll;
    const sel = s.sel && JOS.project(s.sel);
    w.setStatus([t('ex.objects', { n: list.length }), sel ? sel.title : '']);
  }
  function exSelect(w, id, scroll) {
    const s = xs(w); s.sel = id;
    w.$$('.xv .xi').forEach((n) => { const on = n.dataset.id === id; n.classList.toggle('sel', on); n.setAttribute('aria-selected', on ? 'true' : 'false'); if (on && scroll) n.scrollIntoView({ block: 'nearest' }); });
    w.$('.xs').innerHTML = sideHTML(w);
    const sel = id && JOS.project(id);
    w.setStatus([t('ex.objects', { n: (w.data.list || []).length }), sel ? sel.title : '']);
  }
  function exNav(w, id, push) {
    const s = xs(w); if (!COLLS.some((c) => c.id === id)) id = 'all';
    if (push !== false) { s.hist = s.hist.slice(0, s.hp + 1); s.hist.push(id); s.hp = s.hist.length - 1; }
    s.coll = id; s.sel = null; exUpdate(w);
  }
  const touchLike = (w) => window.matchMedia('(pointer: coarse)').matches || !w.$('.xs').offsetParent;
  JOS.actions['proj-open'] = (el) => JOS.wm.open('project', { key: el.dataset.id });

  reg({
    id: 'projects', desk: 2, pin: 2, ico: 'folder', label: { pt: 'Meus Projetos', en: 'My Projects' }, sub: () => t('qa.projects.s', { n: JOS.gamesCount() }),
    title: { pt: 'Meus Projetos', en: 'My Projects' }, w: 980, h: 640, minW: 340, minH: 320,
    render(w) {
      const s = xs(w);
      return '<div class="xpl"><div class="xb">'
        + '<button type="button" class="xbtn" data-xb="back" aria-label="' + esc(t('ex.back')) + '">' + gl('arrow-left') + '<span>' + esc(t('ex.back')) + '</span></button>'
        + '<button type="button" class="xbtn" data-xb="fwd" aria-label="' + esc(t('ex.fwd')) + '">' + gl('arrow-right') + '</button>'
        + '<button type="button" class="xbtn" data-xb="up" aria-label="' + esc(t('ex.up')) + '">' + gl('arrow-up') + '</button>'
        + '<div class="xaddr">' + ico('folder') + '<span class="xaddr-t"></span></div>'
        + '<select class="select xcoll" aria-label="' + esc(t('ex.coll')) + '">' + COLLS.map((c) => '<option value="' + c.id + '">' + esc(tr(c.label)) + '</option>').join('') + '</select>'
        + '<label class="xsearch">' + gl('search', 'gl-12') + '<input type="search" class="input" placeholder="' + esc(t('ex.search')) + '" aria-label="' + esc(t('ex.search')) + '" value="' + esc(s.q) + '"></label>'
        + '<div class="xviews" role="group" aria-label="' + esc(t('ex.view')) + '">'
        + [['thumbs', 'grid-3x3'], ['list', 'bulletlist'], ['details', 'list-box']].map((v) => '<button type="button" data-view="' + v[0] + '" title="' + esc(t('ex.view.' + v[0])) + '" aria-label="' + esc(t('ex.view.' + v[0])) + '">' + gl(v[1]) + '</button>').join('')
        + '</div>'
        + '<select class="select xsort" aria-label="' + esc(t('ex.sort')) + '">' + Object.keys(SORTS).map((k) => '<option value="' + k + '"' + (s.sort.k === k ? ' selected' : '') + '>' + esc(t('ex.sort') + ': ' + t('ex.sort.' + k)) + '</option>').join('') + '</select>'
        + '</div><div class="xm"><aside class="xs" aria-label="' + esc(t('ex.coll')) + '"></aside><div class="xv sel" role="listbox" tabindex="0" aria-label="' + esc(t('qa.projects')) + '"></div></div></div>';
    },
    mount(w) {
      const s = xs(w), xv = w.$('.xv');
      exUpdate(w);
      w.$('.xs').addEventListener('click', (e) => {
        const c = e.target.closest('[data-coll]'); if (c) exNav(w, c.dataset.coll);
      });
      w.$('.xb').addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        if (b.dataset.xb === 'back' && s.hp > 0) { s.hp--; exNav(w, s.hist[s.hp], false); }
        else if (b.dataset.xb === 'fwd' && s.hp < s.hist.length - 1) { s.hp++; exNav(w, s.hist[s.hp], false); }
        else if (b.dataset.xb === 'up') exNav(w, 'all');
        else if (b.dataset.view) { s.view = b.dataset.view; JOS.store.set('exView', s.view); exUpdate(w, { view: 1 }); }
      });
      w.$('.xcoll').addEventListener('change', (e) => exNav(w, e.target.value));
      w.$('.xsort').addEventListener('change', (e) => { s.sort = { k: e.target.value, d: 1 }; exUpdate(w, { view: 1 }); });
      w.$('.xsearch input').addEventListener('input', (e) => { s.q = e.target.value; s.sel = null; exUpdate(w); });
      xv.addEventListener('click', (e) => {
        const th = e.target.closest('th[data-sort]');
        if (th) { const k = th.dataset.sort; s.sort = { k, d: s.sort.k === k ? -s.sort.d : 1 }; exUpdate(w, { view: 1 }); return; }
        const it = e.target.closest('.xi'); if (!it) return;
        exSelect(w, it.dataset.id);
        if (touchLike(w)) JOS.wm.open('project', { key: it.dataset.id });
      });
      xv.addEventListener('dblclick', (e) => { const it = e.target.closest('.xi'); if (it) JOS.wm.open('project', { key: it.dataset.id }); });
      xv.addEventListener('keydown', (e) => {
        const list = w.data.list || []; if (!list.length) return;
        let i = list.findIndex((p) => p.id === s.sel);
        if (e.key === 'Enter' && i >= 0) { e.preventDefault(); JOS.wm.open('project', { key: s.sel }); return; }
        const step = { ArrowRight: 1, ArrowDown: s.view === 'thumbs' ? Math.max(1, Math.round(xv.clientWidth / ((xv.querySelector('.xi') || { offsetWidth: 150 }).offsetWidth + 8))) : 1, ArrowLeft: -1, ArrowUp: s.view === 'thumbs' ? -Math.max(1, Math.round(xv.clientWidth / ((xv.querySelector('.xi') || { offsetWidth: 150 }).offsetWidth + 8))) : -1 }[e.key];
        if (step) { e.preventDefault(); i = JOS.clamp((i < 0 ? 0 : i + step), 0, list.length - 1); exSelect(w, list[i].id, true); }
      });
    },
    onParams(w, p) {
      const s = xs(w);
      if (p.q != null) { s.q = p.q; const inp = w.$('.xsearch input'); if (inp) inp.value = p.q; }
      if (p.coll) exNav(w, p.coll); else exUpdate(w);
    },
  });

  // ====================================================================== Project viewer (picture-viewer style)
  function imagesOf(p) {
    const m = media(p.id), out = [];
    if (m) out.push({ src: 'assets/img/p/' + p.id + (m.lg ? '-lg' : '') + '.webp', thumb: 'assets/img/p/' + p.id + '.webp', w: (m.lg || m).w, h: (m.lg || m).h, pixel: m.pixel });
    else if (p.img) out.push({ src: p.img, thumb: p.img });
    JOS.shots(p).forEach((s) => out.push(s));
    return out;
  }
  function pvStage(w) {
    const p = JOS.project(w.params.key), imgs = imagesOf(p), i = w.data.idx || 0, im = imgs[i];
    w.$('.pv-img').innerHTML = (im ? '<img class="' + (im.pixel ? 'px' : '') + '" src="' + im.src + '"' + (im.w ? ' width="' + im.w + '" height="' + im.h + '"' : '') + ' alt="' + esc(p.title) + (imgs.length > 1 ? ' (' + (i + 1) + '/' + imgs.length + ')' : '') + '">' : JOS.cover(p, 'lg', { alt: p.title }))
      + (imgs.length > 1 ? '<button type="button" class="pv-nav prev" data-act="pv-img" data-d="-1" aria-label="' + esc(t('pv.prevImg')) + '">' + gl('chevron-left') + '</button><button type="button" class="pv-nav next" data-act="pv-img" data-d="1" aria-label="' + esc(t('pv.nextImg')) + '">' + gl('chevron-right') + '</button><span class="pv-count">' + (i + 1) + ' / ' + imgs.length + '</span>' : '');
    w.$$('.pv-strip button').forEach((b, k) => { b.setAttribute('aria-current', k === i ? 'true' : 'false'); });
  }
  JOS.actions['pv-img'] = (el) => {
    const w = JOS.winOf(el), p = JOS.project(w.params.key), n = imagesOf(p).length;
    w.data.idx = ((w.data.idx || 0) + (+el.dataset.d) + n) % n; pvStage(w);
  };
  JOS.actions['pv-thumb'] = (el) => { const w = JOS.winOf(el); w.data.idx = +el.dataset.i; pvStage(w); };
  JOS.actions['pv-proj'] = (el) => {
    const w = JOS.winOf(el), all = D().projects, i = all.findIndex((p) => p.id === w.params.key), n = all[(i + (+el.dataset.d) + all.length) % all.length];
    if (!JOS.wm.rekey(w, 'project:' + n.id)) return; // already open in another window: just focus it
    w.params.key = n.id; w.data.idx = 0; w.refresh();
    try { history.replaceState(null, '', '#project/' + n.id); } catch (e) { /* ignore */ }
  };
  JOS.actions['pv-copy'] = (el) => {
    const w = JOS.winOf(el), url = location.origin + location.pathname + '#project/' + w.params.key;
    JOS.copy(url).then((ok) => { el.querySelector('span').textContent = ok ? t('pv.copied') : url; setTimeout(() => { if (el.isConnected) el.querySelector('span').textContent = t('pv.copy'); }, 2200); });
  };
  reg({
    id: 'project', ico: 'image', label: { pt: 'Projeto', en: 'Project' }, title: (w) => (JOS.project(w.params.key) || { title: 'Project' }).title,
    w: 960, h: 620, minW: 340, minH: 340,
    render(w) {
      const p = JOS.project(w.params.key); if (!p) return '<p class="xv-empty">404</p>';
      const imgs = imagesOf(p);
      const chips = '<span class="chip blue">' + esc(JOS.engineLabel(p)) + '</span><span class="chip">' + esc(kindLabel(p)) + '</span>' + (p.featured ? '<span class="chip gold">' + gl('star', 'gl-12') + ' ' + esc(t('ex.c.featured')) + '</span>' : '') + (p.tags || []).map((x) => '<span class="chip">' + esc(L(x)) + '</span>').join('');
      const links = (p.steam ? ext(p.steam, 'btn steam', gl('steam', '') + ' <span>' + esc(t('pv.steam')) + '</span>') : '')
        + (p.url ? ext(p.url, 'btn green', gl(p.kind === 'music' ? 'ytmusic' : 'itch', '') + ' <span>' + esc(p.kind === 'music' ? t('ex.listen') : t('pv.play')) + '</span>') : '<span class="chip red">' + esc(t('pv.private')) + '</span>');
      const pr = D().projects, i = pr.findIndex((x) => x.id === p.id);
      return '<div class="pv" tabindex="0"><div class="pv-stage"><div class="pv-img"></div>'
        + (imgs.length > 1 ? '<div class="pv-strip">' + imgs.map((im, k) => '<button type="button" data-act="pv-thumb" data-i="' + k + '" aria-label="' + esc(t('pv.shot', { n: k + 1 })) + '"><img class="' + (im.pixel ? 'px' : '') + '" src="' + (im.thumb || im.src) + '" alt="" loading="lazy"></button>').join('') + '</div>' : '')
        + '</div><aside class="pv-info sel"><h2>' + esc(p.title) + '</h2><p class="pv-tag">' + esc(L(p.desc)) + '</p><div class="chips">' + chips + '</div>'
        + '<dl class="pv-meta">' + (p.role ? '<dt>' + esc(t('ex.role')) + '</dt><dd>' + esc(L(p.role)) + '</dd>' : '') + (p.award ? '<dt>' + esc(t('ex.award')) + '</dt><dd>' + ico('award_star_gold_1') + ' ' + esc(L(p.award)) + '</dd>' : '') + '<dt>' + esc(t('ex.engine')) + '</dt><dd>' + esc(JOS.engineLabel(p)) + '</dd></dl>'
        + '<div class="pv-btns">' + links + '<button type="button" class="btn" data-act="pv-copy">' + ico('link') + ' <span>' + esc(t('pv.copy')) + '</span></button></div>'
        + '<div class="pv-pn"><button type="button" class="btn sm" data-act="pv-proj" data-d="-1">' + gl('chevron-left') + ' ' + esc(t('pv.prev')) + '</button><span>' + (i + 1) + ' / ' + pr.length + '</span><button type="button" class="btn sm" data-act="pv-proj" data-d="1">' + esc(t('pv.next')) + ' ' + gl('chevron-right') + '</button></div></aside></div>';
    },
    mount(w) {
      pvStage(w);
      const root = w.$('.pv');
      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { const b = w.$('.pv-nav.prev'); b && b.click(); }
        else if (e.key === 'ArrowRight') { const b = w.$('.pv-nav.next'); b && b.click(); }
      });
      if (!w.data.focused) { w.data.focused = true; setTimeout(() => root.isConnected && root.focus({ preventScroll: true }), 60); }
    },
    status: (w) => { const p = JOS.project(w.params.key); return p ? [JOS.engineLabel(p), kindLabel(p)] : null; },
  });

  // ====================================================================== Malleus Maleficarum (featured, Steam-style)
  function malleusHTML() {
    const d = D(), g = d.malleus, p = JOS.project('malleusgame'), ln = d.links;
    return '<div class="mal sel"><div class="mal-hero">' + JOS.cover(p, 'lg', { eager: true, alt: p.title })
      + '<div class="mal-hero-t"><h2>Malleus Maleficarum</h2><p>' + esc(L(p.desc)) + '</p></div><span class="ribbon big">' + gl('star', 'gl-12') + ' ' + esc(t('feat.steam')) + '</span></div>'
      + '<div class="mal-body"><div class="mal-main"><p class="mal-desc">' + esc(L(g.text)) + '</p>'
      + '<div class="chips mal-tags">' + g.tags.map((x) => '<span class="chip dark">' + esc(L(x)) + '</span>').join('') + '</div>'
      + '<h3>' + esc(t('mal.team')) + '</h3><p class="mal-team">' + esc(g.team) + '</p></div>'
      + '<aside class="mal-side"><dl><dt>' + esc(t('mal.dev')) + '</dt><dd>João Anisio</dd><dt>' + esc(t('ex.role')) + '</dt><dd>' + esc(L(p.role)) + '</dd><dt>' + esc(t('ex.engine')) + '</dt><dd>Godot 4.4</dd>'
      + '<dt>' + esc(t('mal.status')) + '</dt><dd>' + esc(t('mal.released')) + '</dd><dt>' + esc(t('ex.award')) + '</dt><dd>' + esc(L(p.award)) + '</dd></dl>'
      + ext(ln.steam, 'btn steam block', gl('steam', '') + ' <span>' + esc(t('feat.view')) + '</span>') + ext(ln.itch.replace(/\/$/, '') + '/malleus-maleficarum', 'btn block', gl('itch', '') + ' <span>itch.io</span>')
      + '<button type="button" class="btn block" data-act="proj-open" data-id="malleusgame">' + ico('image') + ' <span>' + esc(t('mal.more')) + '</span></button></aside></div></div>';
  }
  reg({
    id: 'malleus', desk: 3, pin: 3, ico: 'skull', label: { pt: 'Malleus\nMaleficarum', en: 'Malleus\nMaleficarum' },
    big: { img: 'assets/img/malleus-24.png', w: 48, h: 48 }, pinIcon: '<img class="px" src="assets/img/malleus-24.png" width="32" height="32" alt="" style="width:32px;height:32px">',
    sub: () => t('feat.steam'), title: { pt: 'Malleus Maleficarum — Steam', en: 'Malleus Maleficarum — Steam' }, w: 880, h: 640, minW: 340, minH: 320,
    render: malleusHTML, status: () => [t('feat.steam'), 'Godot 4.4'],
  });

  // ====================================================================== Skills
  const CATS = ['all', 'dev', 'design', 'xr', 'prod'];
  function skState(w) { return w.data.sk || (w.data.sk = { cat: 'all', sel: 'godot' }); }
  function skDetail(sk) {
    const d = D(), used = sk.eng ? d.projects.filter((p) => p.eng.indexOf(sk.eng) >= 0) : [];
    const top = used.slice(0, 6).map((p) => '<button type="button" class="lnk" data-act="proj-open" data-id="' + p.id + '">' + esc(p.title) + '</button>').join(', ');
    return '<div class="sd-head">' + JOS.tile({ brand: sk.tile.brand, glyph: sk.tile.glyph, text: sk.tile.text, color: sk.tile.color, size: 'xl' }) + '<div><h3>' + esc(L(sk.name)) + '</h3><p>' + esc(L(sk.level)) + '</p></div></div>'
      + (sk.studying ? '<p class="sd-study">' + ico('lightbulb') + ' ' + esc(t('sk.studying')) + '</p>' : '')
      + (sk.note ? '<p class="sd-note">' + esc(L(sk.note)) + '</p>' : '')
      + (used.length ? '<h4>' + esc(t('sk.used', { n: used.length })) + '</h4><p class="sd-used">' + top + (used.length > 6 ? ', …' : '') + '</p><button type="button" class="btn sm primary" data-act="sk-show" data-eng="' + sk.eng + '">' + ico('folder') + ' ' + esc(t('sk.show', { n: used.length })) + '</button>' : '');
  }
  function skUpdate(w) {
    const s = skState(w), all = D().skills, list = all.filter((k) => s.cat === 'all' || k.cat === s.cat);
    if (!list.some((k) => k.id === s.sel)) s.sel = list[0] && list[0].id;
    w.$$('.sk .tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.cat === s.cat ? 'true' : 'false'));
    w.$('.sk-grid').innerHTML = list.map((k) => '<button type="button" role="listitem" class="sk-card' + (k.id === s.sel ? ' sel' : '') + '" data-id="' + k.id + '">'
      + JOS.tile({ brand: k.tile.brand, glyph: k.tile.glyph, text: k.tile.text, color: k.tile.color, size: 'lg' }) + '<b>' + esc(L(k.name)) + '</b><small>' + esc(L(k.level)) + '</small>' + (k.studying ? '<span class="chip gold sk-st">' + gl('lightbulb', 'gl-12') + '</span>' : '') + '</button>').join('');
    const sk = all.find((k) => k.id === s.sel);
    w.$('.sk-det').innerHTML = sk ? skDetail(sk) : '';
    w.setStatus(t('sk.count', { n: list.length }));
  }
  JOS.actions['sk-show'] = (el) => JOS.wm.open('projects', { coll: el.dataset.eng.toLowerCase() });
  reg({
    id: 'skills', desk: 5, ico: 'bricks', label: { pt: 'Habilidades', en: 'Skills' }, right: 3, sub: () => t('qa.skills.s', { n: D().skills.length }),
    title: { pt: 'Gerenciador de Habilidades', en: 'Skills Manager' }, w: 920, h: 620, minW: 340, minH: 320,
    render(w) {
      const s = skState(w);
      return '<div class="sk"><div class="tabs" role="tablist" aria-label="' + esc(t('sk.cat')) + '">' + CATS.map((c) => '<button type="button" role="tab" class="tab" data-cat="' + c + '" aria-selected="' + (s.cat === c ? 'true' : 'false') + '">' + esc(t('sk.' + c)) + '</button>').join('')
        + '</div><div class="sk-main"><div class="sk-grid" role="list"></div><aside class="sk-det sel" aria-live="polite"></aside></div></div>';
    },
    mount(w) {
      const s = skState(w);
      skUpdate(w);
      w.$('.tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (b) { s.cat = b.dataset.cat; skUpdate(w); } });
      w.$('.sk-grid').addEventListener('click', (e) => { const c = e.target.closest('.sk-card'); if (c) { s.sel = c.dataset.id; skUpdate(w); } });
    },
  });
})();
