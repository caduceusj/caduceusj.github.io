/* JoãoOS XP — profile apps: João.exe (welcome), about_me.txt, Contact, LinkedIn, Resume */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { esc, gl, ico } = JOS;
  const t = (k, v) => JOS.t(k, v);
  const L = (o) => JOS.L(o);
  const D = () => JOS.data;
  const reg = (def) => JOS.apps.register(def);

  // ====================================================================== shared helpers
  const hue = (id) => { let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360; return h; };
  const STOP = /^(a|an|as|o|os|da|das|de|do|dos|e|em|no|na|of|the|and|but|i|\&)$/i;
  const initials = (title) => {
    const words = title.replace(/[^\p{L}\p{N} ]/gu, ' ').split(/\s+/).filter(Boolean);
    const main = words.filter((w) => w.length < 2 || !STOP.test(w));
    const use = main.length ? main : words;
    return (use.length === 1 ? use[0].slice(0, use[0].length <= 3 ? 3 : 2) : use.slice(0, 3).map((w) => w[0]).join('')).toUpperCase();
  };
  const media = (id) => (window.MEDIA && window.MEDIA.projects && window.MEDIA.projects[id]) || null;

  // Cover image for a project: optimized WebP if generated, raw `img` if set in data.js, else a generated pixel cover.
  JOS.cover = (p, size, o) => {
    o = o || {};
    const m = media(p.id);
    if (m || p.img) {
      let src, w, h;
      if (m) {
        if (size === 'lg' && m.lg) { src = 'assets/img/p/' + p.id + '-lg.webp'; w = m.lg.w; h = m.lg.h; }
        else { src = 'assets/img/p/' + p.id + '.webp'; w = m.w; h = m.h; }
      } else src = p.img;
      return '<img class="cover' + (m && m.pixel ? ' px' : '') + (o.cls ? ' ' + o.cls : '') + '" src="' + src + '"' + (w ? ' width="' + w + '" height="' + h + '"' : '') + ' alt="' + esc(o.alt != null ? o.alt : p.title) + '" loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async">';
    }
    const eng = p.eng[0] === 'Godot' ? 'godot' : p.eng[0] === 'Unity' ? 'unity' : p.kind === 'music' ? 'ytmusic' : null;
    return '<div class="cover ph' + (o.cls ? ' ' + o.cls : '') + '" ' + (o.alt === '' ? 'aria-hidden="true"' : 'role="img" aria-label="' + esc(o.alt != null ? o.alt : p.title) + '"') + ' style="--h:' + hue(p.id) + '"><span class="ph-t">' + esc(initials(p.title)) + '</span>' + (eng ? gl(eng, 'ph-e') : '') + '</div>';
  };
  JOS.shots = (p) => {
    const m = media(p.id);
    if (!m || !m.shots) return [];
    return m.shots.map((s, i) => ({ src: 'assets/img/p/' + p.id + '-s' + (i + 1) + '.webp', thumb: 'assets/img/p/' + p.id + '-s' + (i + 1) + '-t.webp', w: s.w, h: s.h, tw: s.tw, th: s.th, pixel: m.pixel }));
  };
  JOS.gamesCount = () => D().projects.filter((p) => p.kind !== 'music').length;

  const ext = (href, cls, inner, extra) => '<a class="' + cls + '" href="' + href + '" target="_blank" rel="noopener noreferrer"' + (extra || '') + '>' + inner + '</a>';

  // ====================================================================== João.exe (welcome)
  function welcomeHTML() {
    const d = D(), me = d.me, links = d.links;
    const m = JOS.project('malleusgame');
    const now = new Date(), frac = Math.round(((now - new Date(now.getFullYear(), 0, 1)) / (365 * 864e5)) * 100);
    const years = JOS.years();
    const sheet = [
      ['sheet.class', esc(L(me.headline))],
      ['sheet.level', '<b>' + years + '</b><span class="xpbar" title="' + esc(t('sheet.xp', { n: frac })) + '"><i style="width:' + frac + '%"></i></span>'],
      ['sheet.guild', 'UFRN · AKCIT · Melted Peanut'],
      ['sheet.weapons', 'Godot · Unity'],
      ['sheet.spawn', esc(L(me.location))],
      ['sheet.langs', esc(L(me.languages))],
      ['sheet.quest', '<a href="#malleus" data-act="open-app" data-app="malleus">Malleus Maleficarum</a>'],
    ].map((r) => '<div><dt>' + esc(t(r[0])) + '</dt><dd>' + r[1] + '</dd></div>').join('');
    const stats = [
      [JOS.gamesCount(), t('stat.games')],
      [1, t('stat.steam')],
      [4, t('stat.ieee')],
      [years, t('stat.years')],
    ].map((s) => '<div class="stat"><b class="n" data-to="' + s[0] + '">' + s[0] + '</b><span>' + esc(s[1]) + '</span></div>').join('');
    const quick = [
      ['projects', 'folder', t('qa.projects'), t('qa.projects.s', { n: JOS.gamesCount() })],
      ['resume', 'page_white_acrobat', t('qa.resume'), t('qa.resume.s')],
      ['skills', 'bricks', t('qa.skills'), t('qa.skills.s', { n: d.skills.length })],
      ['contact', 'email', t('qa.contact'), t('qa.contact.s')],
    ].map((q) => '<button type="button" class="qa" data-act="open-app" data-app="' + q[0] + '">' + ico(q[1], 2) + '<span><b>' + esc(q[2]) + '</b><small>' + esc(q[3]) + '</small></span></button>').join('');
    const nowList = me.now.map((n) => '<li>' + ico(n.ico) + '<span><b>' + esc(n.org) + '</b> — ' + esc(L(n.role)) + '</span></li>').join('');
    const soc = [
      [links.linkedin, 'LinkedIn', { glyph: 'linkedin', color: '#0a66c2' }],
      [links.github, 'GitHub', { glyph: 'github', color: '#2b3137' }],
      [links.itch, 'itch.io', { brand: 'itch', color: '#e8504f' }],
      [links.steam, 'Steam', { brand: 'steam', color: '#1b2838' }],
    ].map((s) => ext(s[0], 'soc', JOS.tile(Object.assign({ size: 'lg' }, s[2])), ' aria-label="' + s[1] + '" title="' + s[1] + '"')).join('');
    return '<div class="wel sel">'
      + '<aside class="wel-card">'
      + '<div class="wel-photo"><img src="assets/img/me-320.webp" width="160" height="160" alt="' + esc(me.name) + '" fetchpriority="high"><canvas width="160" height="160" aria-hidden="true"></canvas></div>'
      + '<h2 class="wel-name">' + esc(me.short) + '</h2>'
      + '<p class="wel-typed"><span class="ty" aria-hidden="true"></span><i class="caret"></i><span class="sr-only">' + esc(L(me.headline)) + '</span></p>'
      + '<dl class="sheet">' + sheet + '</dl>'
      + '<div class="wel-social">' + soc + '</div>'
      + '</aside>'
      + '<section class="wel-main">'
      + '<p class="wel-bio">' + esc(L(me.bio)) + '</p>'
      + '<div class="stats">' + stats + '</div>'
      + '<article class="feat"><div class="feat-img">' + JOS.cover(m, 'thumb', { eager: true }) + '<span class="ribbon">' + gl('star', 'gl-12') + ' ' + esc(t('feat.steam')) + '</span></div>'
      + '<div class="feat-info"><h3>' + esc(m.title) + '</h3><p>' + esc(L(m.desc)) + ' ' + esc(L(m.award)) + '.</p>'
      + '<div class="feat-btns">' + ext(links.steam, 'btn steam sm', JOS.gl('steam', '') + ' ' + esc(t('feat.view'))) + '<button type="button" class="btn sm" data-act="open-app" data-app="malleus">' + esc(t('feat.details')) + '</button></div></div></article>'
      + '<h3 class="sec">' + esc(t('wel.more')) + '</h3><div class="hl">' + d.projects.filter((p) => p.featured && p.id !== 'malleusgame').slice(0, 4).map((p) => '<button type="button" class="hl-i" data-act="proj-open" data-id="' + p.id + '" title="' + esc(L(p.desc)) + '"><span class="hl-img">' + JOS.cover(p, 'thumb', { alt: '' }) + '</span><b>' + esc(p.title) + '</b><small>' + esc(JOS.engineLabel(p)) + '</small></button>').join('') + '</div>'
      + '<h3 class="sec">' + esc(t('wel.explore')) + '</h3><div class="quick">' + quick + '</div>'
      + '<h3 class="sec">' + esc(t('wel.now')) + '</h3><ul class="nowlist">' + nowList + '</ul>'
      + '</section></div>';
  }

  // typewriter over the rotating roles (stepped = pixel feel)
  function typer(w) {
    const el = w.$('.wel-typed .ty'); if (!el) return;
    const roles = D().me.roles.map(L);
    if (JOS.reduceMotion()) { el.textContent = roles[0]; return; }
    let i = 0, n = 0, dir = 1;
    const tick = () => {
      if (!el.isConnected) return;
      const word = roles[i];
      n += dir; el.textContent = word.slice(0, n);
      let delay = dir > 0 ? 70 : 32;
      if (dir > 0 && n >= word.length) { dir = -1; delay = 1500; }
      else if (dir < 0 && n <= 0) { dir = 1; i = (i + 1) % roles.length; delay = 350; }
      w.data.typer = setTimeout(tick, delay);
    };
    clearTimeout(w.data.typer); tick();
  }
  // pixelated -> sharp reveal of the photo
  function revealPhoto(w) {
    const cv = w.$('.wel-photo canvas'), img = w.$('.wel-photo img');
    if (!cv || !img) return;
    if (JOS.reduceMotion()) { cv.remove(); return; }
    const go = () => {
      const ctx = cv.getContext('2d'), tmp = document.createElement('canvas'), tc = tmp.getContext('2d');
      const steps = [6, 8, 12, 16, 24, 32, 48, 80]; let k = 0;
      ctx.imageSmoothingEnabled = false;
      const frame = () => {
        if (!cv.isConnected) return;
        if (k >= steps.length) { cv.remove(); return; }
        const s = steps[k++]; tmp.width = tmp.height = s; tc.imageSmoothingEnabled = true; tc.drawImage(img, 0, 0, s, s);
        ctx.clearRect(0, 0, 160, 160); ctx.drawImage(tmp, 0, 0, s, s, 0, 0, 160, 160);
        setTimeout(frame, 95);
      };
      frame();
    };
    if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
  }

  reg({
    id: 'welcome', desk: 1, pin: 1, ico: 'user_suit', label: { pt: 'João.exe', en: 'João.exe' },
    big: { img: 'assets/img/me-24.png', w: 48, h: 48 }, pinIcon: '<img class="px" src="assets/img/me-24.png" width="32" height="32" alt="" style="width:32px;height:32px">',
    sub: () => t('wel.sub'), title: { pt: 'João Anisio — Perfil', en: 'João Anisio — Profile' },
    w: 900, h: 620, minW: 340, minH: 300,
    render: welcomeHTML,
    mount(w) {
      JOS.$$('.stat .n', w.el).forEach((n) => JOS.counter(n, +n.dataset.to, 800));
      typer(w); revealPhoto(w);
    },
    onClose(w) { clearTimeout(w.data.typer); },
  });

  // ====================================================================== about_me.txt (Notepad)
  function aboutLines() {
    const d = D(), me = d.me, pt = JOS.lang === 'pt', hr = '='.repeat(46), dash = '-'.repeat(46);
    const kv = (k, v) => (k + ':').padEnd(11) + v;
    const out = [
      hr, pt ? '  SOBRE MIM — João Anisio' : '  ABOUT ME — João Anisio', '  ' + L(me.headline), hr, '',
      kv(pt ? 'Nome' : 'Name', me.name), kv(pt ? 'Função' : 'Role', L(me.roleLine)), kv(pt ? 'Local' : 'Location', L(me.location).replace(/\s*—\s*/, ', ')),
      kv('Engines', 'Godot Engine | Unity'), kv(pt ? 'Idiomas' : 'Languages', L(me.languages).replace(/·/g, '|')), '', dash, '',
      pt ? 'Olá! Eu sou o João Anisio, Game Designer e\nProgramador de Jogos apaixonado por transformar\nideias criativas em experiências divertidas e\nenvolventes.\n' : 'Hello! I\'m João Anisio, a Game Designer and\nGame Programmer passionate about turning\ncreative ideas into fun and engaging experiences.\n',
      pt ? 'Trabalho principalmente com Godot e Unity,\ndesenvolvendo projetos solo e em equipe.\nAdoro aprender coisas novas e estou sempre\naberto a desafios que me façam crescer.\n' : 'I work primarily with Godot and Unity,\ndeveloping both solo and collaborative projects.\nI love learning new things and I\'m always open\nto challenges that help me grow.\n',
      pt ? 'Atualmente eu sou:\n' : 'Currently I\'m:\n',
      pt ? '  > Professor Substituto de Jogos Digitais (UFRN)\n  > Team Lead no AKCIT (EMBRAPII Tecnologias Imersivas)\n  > Programador de Jogos na Melted Peanut Studio\n  > Programador solo de Malleus Maleficarum (Steam)\n' : '  > Substitute Professor of Digital Games (UFRN)\n  > Team Lead at AKCIT (EMBRAPII Immersive Tech)\n  > Game Programmer at Melted Peanut Studio\n  > Solo Programmer on Malleus Maleficarum (Steam)\n',
      pt ? 'Tenho experiência com VR, Projeção Mapeada\nusando sistemas CAVE no Unity e pesquisa\npublicada na IEEE VR 2026.\n' : 'I have experience with VR, Projection Mapping\nusing CAVE systems in Unity, and published\nresearch at IEEE VR 2026.\n',
      pt ? 'Ultimamente venho aprofundando meus estudos em:\n' : 'Lately I\'ve been deepening my studies in:\n',
    ];
    me.studying.forEach((s) => out.push('  > ' + L(s)));
    out.push('', pt ? 'Kit técnico:\n' : 'Technical toolkit:\n',
      '  > GDScript, C#, C++, Python', '  > HTML5, CSS3, JavaScript', pt ? '  > Desenvolvimento VR/AR/MR' : '  > VR/AR/MR Development', pt ? '  > Suíte Adobe | Git & GitHub' : '  > Adobe Suite | Git & GitHub', '',
      L(me.goal).replace(/(.{1,44})(\s|$)/g, '$1\n').trim(), '',
      pt ? 'Vamos nos conectar e criar algo incrível!' : 'Let\'s connect and create something great!');
    return out.join('\n');
  }
  function aboutHTML() {
    const me = D().me, ln = D().links, text = esc(aboutLines());
    const row = (k, v) => (k + ':').padEnd(11) + v;
    const foot = [
      row('Email', '<a href="mailto:' + me.emails[0] + '">' + me.emails[0] + '</a>'),
      ' '.repeat(11) + '<a href="mailto:' + me.emails[1] + '">' + me.emails[1] + '</a>',
      row(JOS.lang === 'pt' ? 'Telefone' : 'Phone', me.phone),
      row('LinkedIn', ext(ln.linkedin, '', 'linkedin.com/in/joão-anisio-…')),
      row('GitHub', ext(ln.github, '', 'github.com/caduceusj')),
      row('Itch.io', ext(ln.itch, '', 'caduceusj.itch.io')),
      row('Steam', ext(ln.steam, '', 'Malleus Maleficarum')),
    ].join('\n');
    return '<div class="notepad sel" style="font-size:' + (JOS.store.get('npZoom', 20)) + 'px"><pre>' + text + '\n\n' + '-'.repeat(46) + '\n' + foot + '\n' + '-'.repeat(46) + '</pre></div>';
  }
  reg({
    id: 'about', desk: 9, right: 5, ico: 'page_white_text', label: { pt: 'about_me.txt', en: 'about_me.txt' },
    title: { pt: 'about_me.txt - Bloco de Notas', en: 'about_me.txt - Notepad' }, w: 640, h: 580, minW: 320, minH: 240,
    render: aboutHTML,
    status: () => [t('np.status'), 'UTF-8'],
    menu: (w) => [
      { label: t('np.file'), items: [
        { label: t('np.saveas'), ico: 'disk', act: () => JOS.download('about_me.txt', aboutLines() + '\n') },
        { label: t('np.print'), ico: 'printer', act: () => JOS.print('<pre style="font:14px/1.4 monospace;white-space:pre-wrap">' + esc(aboutLines()) + '</pre>') },
        { sep: true }, { label: t('np.exit'), glyph: 'close', act: () => w.close() },
      ] },
      { label: t('np.edit'), items: [
        { label: t('np.selectall'), act: () => { const r = document.createRange(); r.selectNodeContents(w.$('pre')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } },
        { label: t('np.copy'), ico: 'page_white_copy', act: () => JOS.copy(aboutLines()) },
      ] },
      { label: t('np.view'), items: [
        { label: t('np.zoomin'), glyph: 'zoom-in', act: () => { JOS.store.set('npZoom', Math.min(32, JOS.store.get('npZoom', 20) + 2)); w.refresh(); } },
        { label: t('np.zoomout'), glyph: 'zoom-out', act: () => { JOS.store.set('npZoom', Math.max(12, JOS.store.get('npZoom', 20) - 2)); w.refresh(); } },
        { label: t('np.zoomreset'), act: () => { JOS.store.set('npZoom', 20); w.refresh(); } },
      ] },
      { label: t('np.help'), items: [{ label: t('np.about'), ico: 'information', act: () => JOS.wm.open('aboutos') }] },
    ],
  });

  // print helper: renders HTML into #print-root, prints, cleans up
  JOS.print = (html) => {
    let root = document.getElementById('print-root');
    if (!root) { root = document.createElement('div'); root.id = 'print-root'; document.body.appendChild(root); }
    root.innerHTML = html;
    const done = () => { root.innerHTML = ''; window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    setTimeout(() => window.print(), 50);
  };

  // ====================================================================== Contact (compose window)
  const SUBJECTS = [['job', 'sub.job'], ['collab', 'sub.collab'], ['jam', 'sub.jam'], ['teach', 'sub.teach'], ['hi', 'sub.hi']];
  function contactHTML() {
    const me = D().me, ln = D().links;
    return '<div class="mail">'
      + '<div class="mail-bar"><button type="button" class="btn sm primary" data-act="mail-send">' + ico('email') + ' <span>' + esc(t('mail.send')) + '</span></button>'
      + '<button type="button" class="btn sm" data-act="mail-copy">' + ico('page_white_copy') + ' <span>' + esc(t('mail.copy')) + '</span></button>'
      + '<button type="button" class="btn sm" data-act="mail-vcard">' + ico('vcard') + ' <span>' + esc(t('mail.vcard')) + '</span></button>'
      + ext(ln.linkedin, 'btn sm linkedin', gl('linkedin') + ' <span>LinkedIn</span>') + '</div>'
      + '<form class="mail-form sel" autocomplete="off" novalidate>'
      + '<div class="field"><label for="m-to">' + esc(t('mail.to')) + '</label><select class="select" id="m-to">' + me.emails.map((e) => '<option>' + e + '</option>').join('') + '</select></div>'
      + '<div class="mail-2"><div class="field"><label for="m-name">' + esc(t('mail.name')) + '</label><input class="input" id="m-name" type="text" autocomplete="name"></div>'
      + '<div class="field"><label for="m-from">' + esc(t('mail.from')) + '</label><input class="input" id="m-from" type="email" autocomplete="email"></div></div>'
      + '<div class="field"><label for="m-sub">' + esc(t('mail.subject')) + '</label><input class="input" id="m-sub" type="text"></div>'
      + '<div class="chips mail-chips">' + SUBJECTS.map((s) => '<button type="button" class="chip blue" data-act="mail-subject" data-s="' + s[1] + '">' + esc(t(s[1])) + '</button>').join('') + '</div>'
      + '<div class="field grow"><label for="m-msg">' + esc(t('mail.msg')) + '</label><textarea class="textarea" id="m-msg" rows="7" placeholder="' + esc(t('mail.ph')) + '"></textarea></div>'
      + '<p class="mail-note" role="status" aria-live="polite"></p>'
      + '</form>'
      + '<div class="mail-info">' + ico('house') + '<span>' + esc(L(me.location)) + '</span>' + ico('telephone') + '<span>' + me.phone + '</span>'
      + ext(ln.github, 'lnk', gl('github', 'gl-12') + ' GitHub') + ext(ln.itch, 'lnk', gl('itch', 'gl-12') + ' itch.io') + '</div></div>';
  }
  function mailValues(w) {
    const g = (id) => w.$('#' + id).value.trim();
    return { to: g('m-to'), name: g('m-name'), from: g('m-from'), sub: g('m-sub'), msg: g('m-msg') };
  }
  const note = (w, txt, bad) => { const n = w.$('.mail-note'); if (n) { n.textContent = txt; n.className = 'mail-note' + (bad ? ' bad' : ' ok'); } };
  JOS.actions['mail-subject'] = (el) => { const w = JOS.wm.get('contact'); if (w) { w.$('#m-sub').value = t(el.dataset.s); w.$('#m-msg').focus(); } };
  JOS.actions['mail-copy'] = () => { const w = JOS.wm.get('contact'); const to = w.$('#m-to').value; JOS.copy(to).then((ok) => note(w, ok ? t('mail.copied', { e: to }) : to, !ok)); };
  // vCard 3.0 (RFC 2426) so recruiters can add João to their address book in one click.
  // Values are escaped and long lines are folded at 75 octets; text follows the UI language.
  const vEsc = (x) => String(x).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');
  const vFold = (line) => {
    const enc = new TextEncoder(); let out = '', cur = '', bytes = 0, limit = 75;
    for (const ch of line) {
      const n = enc.encode(ch).length;
      if (bytes + n > limit) { out += cur + '\r\n '; cur = ''; bytes = 0; limit = 74; }
      cur += ch; bytes += n;
    }
    return out + cur;
  };
  JOS.actions['mail-vcard'] = () => {
    const me = D().me, ln = D().links, parts = me.name.split(' '), family = parts.pop(), given = parts.join(' '), a = me.address;
    const lines = ['BEGIN:VCARD', 'VERSION:3.0', 'N:' + vEsc(family) + ';' + vEsc(given) + ';;;', 'FN:' + vEsc(me.name), 'NICKNAME:' + vEsc(me.short),
      'ORG:' + vEsc('UFRN / AKCIT'), 'TITLE:' + vEsc(L(me.headline)), 'TEL;TYPE=CELL:' + vEsc(me.phone),
      ...me.emails.map((e) => 'EMAIL;TYPE=INTERNET:' + vEsc(e)),
      'ADR;TYPE=WORK:;;;' + vEsc(a.city) + ';' + vEsc(a.region) + ';;' + vEsc(a.country),
      'URL:' + me.site, 'URL;TYPE=LinkedIn:' + ln.linkedin, 'URL;TYPE=GitHub:' + ln.github, 'URL;TYPE=itch.io:' + ln.itch,
      'NOTE:' + vEsc(L(me.bio)), 'END:VCARD'];
    JOS.download('joao-anisio.vcf', lines.map(vFold).join('\r\n') + '\r\n', 'text/vcard;charset=utf-8');
    const w = JOS.wm.get('contact'); if (w) note(w, t('mail.vcard.ok'), false);
  };
  JOS.actions['mail-send'] = () => {
    const w = JOS.wm.get('contact'); if (!w) return;
    const v = mailValues(w);
    if (!v.msg) { note(w, t('mail.err'), true); JOS.sfx.play('error'); w.$('#m-msg').focus(); return; }
    const sig = '\n\n— ' + (v.name || '') + (v.from ? ' <' + v.from + '>' : '');
    const href = 'mailto:' + v.to + '?subject=' + encodeURIComponent(v.sub || t('sub.hi')) + '&body=' + encodeURIComponent(v.msg + sig);
    note(w, t('mail.opening'), false);
    window.location.href = href;
  };
  reg({
    id: 'contact', desk: 11, pin: 5, ico: 'email', label: { pt: 'Contato', en: 'Contact' }, sub: () => t('qa.contact.s'),
    title: { pt: 'Contato — Nova Mensagem', en: 'Contact — New Message' }, w: 660, h: 640, minW: 340, minH: 420,
    render: contactHTML,
    mount(w) { const f = w.$('.mail-form'); f.addEventListener('submit', (e) => { e.preventDefault(); JOS.actions['mail-send'](); }); },
    status: () => t('mail.status'),
  });

  // ====================================================================== LinkedIn
  function linkedinHTML() {
    const me = D().me, ln = D().links;
    return '<div class="li sel">'
      + '<div class="li-banner"></div>'
      + '<div class="li-head"><img class="px li-av" src="assets/img/me-32.png" width="64" height="64" alt="">'
      + '<div><h2>' + esc(me.name) + '</h2><p>' + esc(L(me.linkedinHeadline)) + '</p><small>' + ico('house') + ' ' + esc(L(me.location).replace(/\s*—\s*/, ', ')) + '</small></div></div>'
      + '<div class="li-body"><h3>' + esc(t('li.about')) + '</h3><p class="li-sum">' + esc(L(me.linkedinSummary)) + '</p>'
      + '<p class="li-meta"><b>' + esc(t('li.langs')) + ':</b> ' + esc(L(me.languages)) + '</p>'
      + '<p class="li-meta"><b>' + esc(t('li.skills')) + ':</b> ' + esc(me.keySkills) + '</p>'
      + '<div class="li-cta">' + ext(ln.linkedin, 'btn linkedin', gl('linkedin') + ' <span>' + esc(t('li.open')) + '</span>') + '</div></div></div>';
  }
  reg({
    id: 'linkedin', desk: 10, ico: 'vcard', label: { pt: 'LinkedIn', en: 'LinkedIn' },
    big: { tile: { glyph: 'linkedin', color: '#0a66c2' } },
    title: { pt: 'LinkedIn — Perfil', en: 'LinkedIn — Profile' }, w: 620, h: 560, minW: 320, minH: 300, render: linkedinHTML, status: 'linkedin.com',
  });

  // ====================================================================== Resume
  function resumeHTML(forPrint) {
    const d = D(), me = d.me, ln = d.links, pt = JOS.lang === 'pt';
    const sec = (title, body) => '<section><h3>' + esc(title) + '</h3>' + body + '</section>';
    const jobs = d.jobs.map((j) => '<div class="r-item"><div class="r-row"><b>' + esc(L(j.title)) + '</b><span>' + esc(L(j.period)) + '</span></div><div class="r-org">' + esc(j.org) + '</div><p>' + esc(L(j.text)) + '</p></div>').join('');
    const edu = d.education.map((e) => '<div class="r-item"><div class="r-row"><b>' + esc(L(e.title)) + '</b><span>' + esc(L(e.period)) + '</span></div><div class="r-org">' + esc(e.org) + '</div></div>').join('');
    const res = d.research.map((r) => '<div class="r-item"><b>[' + esc(L(r.type)) + '] ' + esc(r.venue) + '</b> — “' + esc(r.title) + '”' + (r.by ? ' — ' + esc(r.by) : '') + (r.note ? ' (' + esc(L(r.note)) + ')' : '') + '</div>').join('');
    const awards = d.achievements.filter((a) => a.kind === 'gold' || a.kind === 'silver' || a.kind === 'bronze').filter((a) => !/^ieee/.test(a.id)).map((a) => {
      const title = L(a.title);
      return '<li><b>' + esc(title) + '</b>' + (a.year && title.indexOf(a.year) < 0 ? ' (' + a.year + ')' : '') + (a.kind !== 'bronze' ? ' — ' + esc(L(a.text)) : '') + '</li>';
    }).join('');
    const projects = d.projects.filter((p) => p.featured).map((p) => '<li><b>' + esc(p.title) + '</b> (' + esc(JOS.engineLabel(p)) + ') — ' + esc(L(p.desc)) + (p.role ? ' [' + esc(L(p.role)) + ']' : '') + '</li>').join('');
    const groups = { dev: t('cv.dev'), design: t('cv.design'), xr: t('cv.xr'), prod: t('cv.prod') };
    const skills = Object.keys(groups).map((g) => '<div><b>' + esc(groups[g]) + ':</b> ' + esc(d.skills.filter((s) => s.cat === g).map((s) => L(s.name)).join(', ')) + '</div>').join('');
    return '<article class="paper sel">'
      + '<header><h2>' + esc(me.name) + '</h2><p class="r-head">' + esc(L(me.headline)) + ' · ' + esc(L(me.roleLine)) + '</p>'
      + '<p class="r-contact">' + esc(L(me.location).replace(/\s*—\s*/, ', ')) + ' · ' + me.emails.join(' · ') + ' · ' + me.phone + '</p>'
      + '<p class="r-contact">' + (forPrint ? 'linkedin.com/in/joão-anisio-marinho-da-nobrega · github.com/caduceusj · caduceusj.itch.io · caduceusj.github.io' : ext(ln.linkedin, '', 'LinkedIn') + ' · ' + ext(ln.github, '', 'GitHub') + ' · ' + ext(ln.itch, '', 'itch.io') + ' · ' + ext(ln.steam, '', 'Steam')) + '</p></header>'
      + sec(t('cv.summary'), '<p>' + esc(L(me.bio)) + ' ' + esc(L(me.goal)) + '</p>')
      + sec(t('cv.exp'), jobs) + sec(t('cv.edu'), edu) + sec(t('cv.research'), res)
      + sec(t('cv.projects'), '<ul>' + projects + '</ul>') + sec(t('cv.awards'), '<ul>' + awards + '</ul>')
      + sec(t('cv.skills'), '<div class="r-skills">' + skills + '</div>') + sec(t('cv.langs'), '<p>' + esc(L(me.languages)) + '</p>')
      + '</article>';
  }
  JOS.actions['cv-print'] = () => JOS.print(resumeHTML(true));
  reg({
    id: 'resume', desk: 4, pin: 4, ico: 'page_white_acrobat', label: { pt: 'Currículo', en: 'Resume' }, sub: () => t('qa.resume.s'),
    title: { pt: 'Curriculo.pdf — Visualizador', en: 'Resume.pdf — Reader' }, w: 820, h: 660, minW: 360, minH: 320,
    render: () => '<div class="rv-bar"><button type="button" class="btn sm primary" data-act="cv-print">' + ico('printer') + ' <span>' + esc(t('cv.print')) + '</span></button>'
      + '<button type="button" class="btn sm" data-act="toggle-lang">' + ico('world') + ' <span>' + esc(JOS.lang === 'pt' ? 'English' : 'Português') + '</span></button>'
      + '<span class="rv-hint">' + esc(t('cv.hint')) + '</span></div><div class="rv-scroll dots">' + resumeHTML(false) + '</div>',
    status: () => t('cv.status'),
  });
})();
