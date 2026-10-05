/* JoãoOS XP — system apps: Terminal, Display Properties, About JoãoOS */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { esc, gl, ico } = JOS;
  const t = (k, v) => JOS.t(k, v);
  const L = (o) => JOS.L(o);
  const D = () => JOS.data;
  const reg = (def) => JOS.apps.register(def);
  const ext = (href, cls, inner) => '<a class="' + cls + '" href="' + href + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>';

  // ====================================================================== Terminal
  const TT = {
    en: {
      banner: 'JoãoOS XP [Version 2026.1 · pixel build]\n(c) João Anisio. Plain HTML, CSS and JavaScript — no frameworks.',
      hint: 'Type "help", or try:',
      'help.title': 'Available commands:',
      'help.help': 'show this list', 'help.about': 'who is João?', 'help.neofetch': 'system & profile summary', 'help.ls': 'list files and folders',
      'help.projects': 'list projects (optional filter: godot, unity, vr, music…)', 'help.skills': 'list skills', 'help.contact': 'how to reach me',
      'help.open': 'open an app or project, e.g. open malleus', 'help.lang': 'switch language (pt | en)', 'help.theme': 'change theme (blue | olive | silver)',
      'help.sound': 'toggle UI sounds (on | off)', 'help.clear': 'clear the screen', 'help.date': 'current date and time',
      about: 'João Anisio Marinho da Nobrega — Game Programmer & Designer.\nSubstitute Professor of Digital Games (UFRN), Team Lead at AKCIT, solo programmer of Malleus Maleficarum (Steam).',
      nf: { os: 'OS', host: 'Host', uptime: 'Uptime', shell: 'Shell', engines: 'Engines', langs: 'Languages', projects: 'Projects', research: 'Research', role: 'Role', pkgs: 'Skills' },
      uptime: '{n} years (since {y})', projects: '{n} games & prototypes', research: 'IEEE VR 2026 × 4',
      'ls.hint': 'tip: "open <name>" opens any item', notfound: 'command not found: {c}  (try "help")', nopen: 'nothing called "{x}" — try "ls" or "projects"',
      opening: 'opening {x}…', 'lang.ok': 'language set to {l}', 'lang.usage': 'usage: lang pt | en', 'theme.ok': 'theme set to {x}', 'theme.usage': 'usage: theme blue | olive | silver',
      'sound.ok': 'UI sounds: {x}', 'sound.usage': 'usage: sound on | off', on: 'on', off: 'off',
      'contact.title': 'Contact', skills: 'Skills', sudo: 'Permission granted. Opening the contact form… (you found the hiring easter egg)',
      sudofail: 'sudo: nice try. Maybe "sudo hire joao"?', rm: 'rm: permission denied — this portfolio is read-only (and backed up).', exit: 'Closing…',
    },
    pt: {
      banner: 'JoãoOS XP [Versão 2026.1 · build pixel]\n(c) João Anisio. HTML, CSS e JavaScript puros — sem frameworks.',
      hint: 'Digite "help" ou experimente:',
      'help.title': 'Comandos disponíveis:',
      'help.help': 'mostra esta lista', 'help.about': 'quem é o João?', 'help.neofetch': 'resumo do sistema e do perfil', 'help.ls': 'lista arquivos e pastas',
      'help.projects': 'lista projetos (filtro opcional: godot, unity, vr, music…)', 'help.skills': 'lista habilidades', 'help.contact': 'como falar comigo',
      'help.open': 'abre um app ou projeto, ex.: open malleus', 'help.lang': 'troca o idioma (pt | en)', 'help.theme': 'muda o tema (blue | olive | silver)',
      'help.sound': 'liga/desliga os sons (on | off)', 'help.clear': 'limpa a tela', 'help.date': 'data e hora atuais',
      about: 'João Anisio Marinho da Nobrega — Programador e Designer de Jogos.\nProfessor Substituto de Jogos Digitais (UFRN), Team Lead no AKCIT, programador solo de Malleus Maleficarum (Steam).',
      nf: { os: 'SO', host: 'Local', uptime: 'Ativo há', shell: 'Shell', engines: 'Engines', langs: 'Linguagens', projects: 'Projetos', research: 'Pesquisa', role: 'Função', pkgs: 'Skills' },
      uptime: '{n} anos (desde {y})', projects: '{n} jogos e protótipos', research: 'IEEE VR 2026 × 4',
      'ls.hint': 'dica: "open <nome>" abre qualquer item', notfound: 'comando não encontrado: {c}  (tente "help")', nopen: 'nada chamado "{x}" — tente "ls" ou "projects"',
      opening: 'abrindo {x}…', 'lang.ok': 'idioma definido para {l}', 'lang.usage': 'uso: lang pt | en', 'theme.ok': 'tema definido para {x}', 'theme.usage': 'uso: theme blue | olive | silver',
      'sound.ok': 'sons da interface: {x}', 'sound.usage': 'uso: sound on | off', on: 'ligados', off: 'desligados',
      'contact.title': 'Contato', skills: 'Habilidades', sudo: 'Permissão concedida. Abrindo o formulário de contato… (você achou o easter egg de contratação)',
      sudofail: 'sudo: boa tentativa. Quem sabe "sudo hire joao"?', rm: 'rm: permissão negada — este portfólio é somente leitura (e tem backup).', exit: 'Fechando…',
    },
  };
  const tt = (k, v) => { let s = (TT[JOS.lang] && TT[JOS.lang][k]); if (s == null) s = TT.en[k]; if (typeof s === 'string' && v) s = s.replace(/\{(\w+)\}/g, (m, x) => (v[x] != null ? v[x] : m)); return s; };

  const CMDS = ['help', 'about', 'neofetch', 'ls', 'projects', 'skills', 'contact', 'open', 'lang', 'theme', 'sound', 'date', 'clear', 'echo', 'exit', 'ver', 'sudo'];
  const FILES = [['about_me.txt', 'about'], ['resume.pdf', 'resume'], ['malleus.exe', 'malleus'], ['skills/', 'skills'], ['experience/', 'experience'], ['education/', 'education'], ['achievements/', 'achievements'], ['contact.eml', 'contact'], ['projects/', 'projects']];
  const ln = (html, cls) => '<div class="tl' + (cls ? ' ' + cls : '') + '">' + html + '</div>';
  const lines = (txt, cls) => txt.split('\n').map((s) => ln(esc(s) || '&nbsp;', cls)).join('');
  const run = (cmd, label) => '<button type="button" class="tl-a" data-act="term-run" data-cmd="' + esc(cmd) + '">' + esc(label || cmd) + '</button>';

  function appByName(x) {
    x = x.toLowerCase().replace(/\/$/, '');
    const alias = { 'about_me.txt': 'about', about: 'about', 'resume.pdf': 'resume', cv: 'resume', 'malleus.exe': 'malleus', malleus: 'malleus', mail: 'contact', email: 'contact', 'contact.eml': 'contact', settings: 'display', 'exp': 'experience', edu: 'education', ach: 'achievements', me: 'welcome', joao: 'welcome', 'os': 'aboutos' };
    const id = alias[x] || x;
    return JOS.apps.get(id) ? id : null;
  }
  function projectByName(x) {
    x = x.toLowerCase();
    return D().projects.find((p) => p.id === x) || D().projects.find((p) => p.title.toLowerCase() === x) || D().projects.find((p) => p.title.toLowerCase().indexOf(x) === 0);
  }

  const COMMANDS = {
    help() { const names = ['help', 'about', 'neofetch', 'ls', 'projects', 'skills', 'contact', 'open', 'lang', 'theme', 'sound', 'clear', 'date']; return ln(esc(tt('help.title')), 'hd') + names.map((n) => ln('  ' + run(n, n.padEnd(11)) + ' ' + esc(tt('help.' + n)))).join(''); },
    about() { return lines(tt('about')); },
    ver() { return lines(tt('banner').split('\n')[0]); },
    date() { return ln(esc(new Date().toLocaleString(JOS.lang === 'pt' ? 'pt-BR' : 'en-US', { dateStyle: 'full', timeStyle: 'medium' }))); },
    echo(a) { return ln(esc(a.join(' ')) || '&nbsp;'); },
    ls() { return FILES.map((f) => ln('  ' + run('open ' + f[1], f[0]))).join('') + ln(esc(tt('ls.hint')), 'dim'); },
    projects(a) {
      const q = (a[0] || '').toLowerCase();
      const map = { godot: (p) => p.eng.indexOf('Godot') >= 0, unity: (p) => p.eng.indexOf('Unity') >= 0, vr: (p) => p.kind === 'xr' || p.kind === 'serious', xr: (p) => p.kind === 'xr' || p.kind === 'serious', music: (p) => p.kind === 'music', featured: (p) => p.featured };
      const f = map[q] || ((p) => !q || p.title.toLowerCase().indexOf(q) >= 0);
      const list = D().projects.filter(f);
      return list.map((p) => ln('  ' + (p.featured ? '* ' : '  ') + run('open ' + p.id, p.id.padEnd(13)) + ' ' + esc(p.title) + ' <span class="dim">[' + esc(JOS.engineLabel(p)) + ']</span>')).join('') + ln(esc(list.length + ' ' + t('ex.objects', { n: list.length }).replace(/^\d+\s*/, '')), 'dim');
    },
    skills() {
      const d = D(), groups = { dev: t('cv.dev'), design: t('cv.design'), xr: t('cv.xr'), prod: t('cv.prod') };
      return Object.keys(groups).map((g) => ln('<span class="hd">' + esc(groups[g]) + '</span>  ' + esc(d.skills.filter((s) => s.cat === g).map((s) => L(s.name)).join(', ')))).join('');
    },
    contact() {
      const me = D().me, ln2 = D().links;
      return ln(esc(tt('contact.title')), 'hd') + me.emails.map((e) => ln('  <a href="mailto:' + e + '">' + e + '</a>')).join('') + ln('  ' + esc(me.phone))
        + ln('  ' + ext(ln2.linkedin, 'tl-a', 'LinkedIn') + ' · ' + ext(ln2.github, 'tl-a', 'GitHub') + ' · ' + ext(ln2.itch, 'tl-a', 'itch.io') + ' · ' + ext(ln2.steam, 'tl-a', 'Steam')) + ln('  ' + run('open contact', 'open contact'));
    },
    neofetch() {
      const d = D(), me = d.me, n = tt('nf');
      const art = ['     ######   ', '        ##    ', '        ##    ', '        ##    ', ' ##     ##    ', '  #######     ', '              '];
      const info = [
        '<span class="hd">joao</span>@<span class="hd">joaoos-xp</span>', '-'.repeat(15),
        '<b>' + n.os + '</b>  JoãoOS XP 2026.1 (pixel)', '<b>' + n.host + '</b>  ' + esc(L(me.location)),
        '<b>' + n.uptime + '</b>  ' + esc(tt('uptime', { n: JOS.years(), y: me.since })), '<b>' + n.role + '</b>  ' + esc(L(me.headline)),
        '<b>' + n.engines + '</b>  Godot 4.4, Unity', '<b>' + n.langs + '</b>  GDScript, C#, C++, Python, JS', '<b>' + n.projects + '</b>  ' + esc(tt('projects', { n: JOS.gamesCount() })),
        '<b>' + n.research + '</b>  ' + esc(tt('research')), '<b>' + n.pkgs + '</b>  ' + d.skills.length,
        '<span class="cbs">' + ['#000', '#c0392b', '#2e8b2e', '#d4a017', '#245edb', '#8e44ad', '#16a085', '#ddd'].map((c) => '<i style="background:' + c + '"></i>').join('') + '</span>',
      ];
      const rows = Math.max(art.length, info.length);
      let out = '';
      for (let i = 0; i < rows; i++) out += '<div class="tl nf"><span class="nf-a">' + esc(art[i] || '').replace(/ /g, '&nbsp;') + '</span><span class="nf-i">' + (info[i] || '') + '</span></div>';
      return out;
    },
    open(a, w) {
      const x = (a.join(' ') || '').trim();
      if (!x) return ln(esc(tt('help.open')), 'dim');
      const ex = { github: D().links.github, linkedin: D().links.linkedin, itch: D().links.itch, steam: D().links.steam, youtube: D().links.ytmusic, music: D().links.ytmusic };
      const app = appByName(x), prj = !app && projectByName(x);
      if (ex[x.toLowerCase()]) { JOS.openExternal(ex[x.toLowerCase()]); return ln(esc(tt('opening', { x }))); }
      if (app) { JOS.wm.open(app); return ln(esc(tt('opening', { x: app }))); }
      if (prj) { JOS.wm.open('project', { key: prj.id }); return ln(esc(tt('opening', { x: prj.title }))); }
      return ln(esc(tt('nopen', { x })), 'bad');
    },
    lang(a) { const l = (a[0] || '').toLowerCase(); if (l !== 'pt' && l !== 'en') return ln(esc(tt('lang.usage')), 'dim'); JOS.setLang(l); return ln(esc(tt('lang.ok', { l }))); },
    theme(a) { const x = (a[0] || '').toLowerCase(); if (!JOS.shell.THEME_COLORS[x]) return ln(esc(tt('theme.usage')), 'dim'); JOS.setTheme(x); return ln(esc(tt('theme.ok', { x }))); },
    sound(a) { const x = (a[0] || '').toLowerCase(); if (x !== 'on' && x !== 'off') return ln(esc(tt('sound.usage')), 'dim'); JOS.setSound(x === 'on'); return ln(esc(tt('sound.ok', { x: tt(x) }))); },
    sudo(a) {
      if (a.join(' ').toLowerCase().replace(/\s+/g, ' ') === 'hire joao') { JOS.wm.open('contact'); JOS.confetti(); return ln(esc(tt('sudo')), 'ok'); }
      return ln(esc(tt('sudofail')), 'bad');
    },
    exit(a, w) { setTimeout(() => w.close(), 250); return ln(esc(tt('exit')), 'dim'); },
  };

  function tPrint(w, html) {
    const out = w.$('.tout'); out.insertAdjacentHTML('beforeend', html);
    w.data.out = out.innerHTML;
    const sc = w.$('.term'); sc.scrollTop = sc.scrollHeight;
  }
  function tRun(w, line, echoed) {
    line = line.trim();
    const prompt = '<span class="tp">C:\\Users\\Joao&gt;</span>';
    if (echoed || line) tPrint(w, ln(prompt + ' ' + esc(line)));
    if (!line) return;
    const d = w.data.th || (w.data.th = { h: [], i: 0 });
    if (d.h[d.h.length - 1] !== line) d.h.push(line);
    d.i = d.h.length;
    const parts = line.split(/\s+/), c = parts[0].toLowerCase(), args = parts.slice(1);
    if (c === 'clear' || c === 'cls') { w.data.out = ''; w.$('.tout').innerHTML = ''; return; }
    if (c === 'rm') { tPrint(w, ln(esc(tt('rm')), 'bad')); return; }
    const fn = COMMANDS[c];
    if (fn) tPrint(w, fn(args, w)); else tPrint(w, ln(esc(tt('notfound', { c })), 'bad'));
  }
  JOS.actions['term-run'] = (el) => { const w = JOS.winOf(el); if (w) { tRun(w, el.dataset.cmd, true); const i = w.$('.tin'); i && i.focus(); } };

  reg({
    id: 'terminal', desk: 12, pin: 6, ico: 'application_xp_terminal', label: { pt: 'Terminal', en: 'Terminal' }, sub: () => t('term.sub'),
    title: { pt: 'Terminal — C:\\Users\\Joao>', en: 'Terminal — C:\\Users\\Joao>' }, w: 780, h: 500, minW: 320, minH: 200,
    render(w) {
      return '<div class="term sel" role="log" aria-live="polite"><div class="tout">' + (w.data.out || '') + '</div><div class="tline"><span class="tp">C:\\Users\\Joao&gt;</span><input class="tin" type="text" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="' + esc(t('term.input')) + '"></div></div>';
    },
    mount(w) {
      const inp = w.$('.tin'), term = w.$('.term');
      if (!w.data.booted) {
        w.data.booted = true;
        tPrint(w, lines(tt('banner')) + ln('&nbsp;') + ln(esc(tt('hint')) + ' ' + run('about') + ' · ' + run('neofetch') + ' · ' + run('projects') + ' · ' + run('open malleus'))) ;
      } else term.scrollTop = term.scrollHeight;
      term.addEventListener('click', (e) => { if (!e.target.closest('button,a') && !getSelection().toString()) inp.focus(); });
      inp.addEventListener('keydown', (e) => {
        const d = w.data.th || (w.data.th = { h: [], i: 0 });
        if (e.key === 'Enter') { const v = inp.value; inp.value = ''; tRun(w, v); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); if (d.i > 0) inp.value = d.h[--d.i] || ''; }
        else if (e.key === 'ArrowDown') { e.preventDefault(); inp.value = d.i < d.h.length - 1 ? d.h[++d.i] : ((d.i = d.h.length), ''); }
        else if (e.key === 'Tab') {
          e.preventDefault();
          const v = inp.value, parts = v.split(/\s+/);
          if (parts.length <= 1) { const m = CMDS.filter((c) => c.indexOf(v.toLowerCase()) === 0); if (m.length === 1) inp.value = m[0] + ' '; else if (m.length > 1) tPrint(w, ln(esc(m.join('  ')), 'dim')); }
          else if (parts[0] === 'open') {
            const pool = [].concat(JOS.apps.list.map((a) => a.id), D().projects.map((p) => p.id)), q = parts[1].toLowerCase(), m = pool.filter((x) => x.indexOf(q) === 0);
            if (m.length === 1) inp.value = 'open ' + m[0]; else if (m.length > 1) tPrint(w, ln(esc(m.join('  ')), 'dim'));
          }
        } else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); tRun(w, 'clear'); }
      });
      setTimeout(() => inp.isConnected && inp.focus({ preventScroll: true }), 80);
    },
    onClose(w) { w.data.out = ''; },
  });

  // ====================================================================== Display Properties
  const THEMES = [['blue', 'dp.t.blue'], ['olive', 'dp.t.olive'], ['silver', 'dp.t.silver']];
  const WALLS = [['auto', 'dp.w.auto'], ['day', 'dp.w.day'], ['sunset', 'dp.w.sunset'], ['night', 'dp.w.night'], ['plain', 'dp.w.plain']];
  function dispHTML(w) {
    const s = w.data.dp || (w.data.dp = { tab: 'themes' });
    const cur = document.documentElement.getAttribute('data-theme') || 'blue', wall = JOS.wallpaper.current();
    const tabs = [['themes', 'dp.themes'], ['wall', 'dp.wall'], ['set', 'dp.set']].map((x) => '<button type="button" role="tab" class="tab" data-tab="' + x[0] + '" aria-selected="' + (s.tab === x[0] ? 'true' : 'false') + '">' + esc(t(x[1])) + '</button>').join('');
    let body;
    if (s.tab === 'themes') {
      body = '<p class="dp-hint">' + esc(t('dp.themes.h')) + '</p><div class="dp-grid">' + THEMES.map((x) => '<button type="button" class="thm" data-pick-theme="' + x[0] + '" aria-pressed="' + (cur === x[0] ? 'true' : 'false') + '"><span class="thm-prev" data-theme="' + x[0] + '"><i class="tp-t"><b></b></i><i class="tp-b"></i><i class="tp-k"><u></u></i></span><span class="thm-n">' + esc(t(x[1])) + '</span></button>').join('') + '</div>';
    } else if (s.tab === 'wall') {
      body = '<p class="dp-hint">' + esc(t('dp.wall.h')) + '</p><div class="dp-grid">' + WALLS.map((x) => '<button type="button" class="wpc" data-pick-wall="' + x[0] + '" aria-pressed="' + (wall === x[0] ? 'true' : 'false') + '"><canvas data-kind="' + x[0] + '" width="80" height="48" aria-hidden="true"></canvas><span class="thm-n">' + esc(t(x[1])) + '</span></button>').join('') + '</div>';
    } else {
      body = '<fieldset class="group"><legend>' + esc(t('dp.lang')) + '</legend><label class="check"><input type="radio" name="dl" value="pt"' + (JOS.lang === 'pt' ? ' checked' : '') + '> Português (Brasil)</label><br><label class="check"><input type="radio" name="dl" value="en"' + (JOS.lang === 'en' ? ' checked' : '') + '> English</label></fieldset>'
        + '<fieldset class="group"><legend>' + esc(t('dp.misc')) + '</legend><label class="check"><input type="checkbox" id="dp-snd"' + (JOS.sfx.enabled() ? ' checked' : '') + '> ' + esc(t('dp.sound')) + '</label><br><label class="check"><input type="checkbox" id="dp-mot"' + (JOS.store.get('motion', 'on') === 'off' ? ' checked' : '') + '> ' + esc(t('dp.motion')) + '</label></fieldset>'
        + '<button type="button" class="btn" data-act="dp-reset">' + ico('arrow_refresh') + ' ' + esc(t('dp.reset')) + '</button>';
    }
    return '<div class="dp"><div class="tabs" role="tablist">' + tabs + '</div><div class="dp-body sel">' + body + '</div></div>';
  }
  JOS.actions['dp-reset'] = () => { try { Object.keys(localStorage).filter((k) => k.indexOf('jos.') === 0).forEach((k) => localStorage.removeItem(k)); sessionStorage.clear(); } catch (e) { /* ignore */ } location.hash = ''; location.reload(); };
  reg({
    id: 'display', right: 6, ico: 'monitor', label: { pt: 'Propriedades de Exibição', en: 'Display Properties' },
    title: { pt: 'Propriedades de Exibição', en: 'Display Properties' }, w: 600, h: 560, minW: 340, minH: 380,
    render: dispHTML,
    mount(w) {
      const s = w.data.dp;
      w.$('.tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-tab]'); if (b) { s.tab = b.dataset.tab; w.refresh(); } });
      JOS.$$('canvas[data-kind]', w.el).forEach((cv) => JOS.wallpaper.draw(cv, JOS.wallpaper.resolve(cv.dataset.kind), 80, 48));
      w.$('.dp-body').addEventListener('click', (e) => {
        const th = e.target.closest('[data-pick-theme]'), wl = e.target.closest('[data-pick-wall]');
        if (th) { JOS.setTheme(th.dataset.pickTheme); w.$$('.thm').forEach((b) => b.setAttribute('aria-pressed', b === th ? 'true' : 'false')); }
        if (wl) { JOS.setWallpaper(wl.dataset.pickWall); w.$$('.wpc').forEach((b) => b.setAttribute('aria-pressed', b === wl ? 'true' : 'false')); }
      });
      w.$$('input[name=dl]').forEach((r) => r.addEventListener('change', () => JOS.setLang(r.value)));
      const snd = w.$('#dp-snd'); if (snd) snd.addEventListener('change', () => JOS.setSound(snd.checked));
      const mot = w.$('#dp-mot'); if (mot) mot.addEventListener('change', () => JOS.setMotion(mot.checked ? 'off' : 'on'));
    },
  });

  // ====================================================================== About JoãoOS
  reg({
    id: 'aboutos', right: 7, ico: 'computer', label: { pt: 'Sobre o JoãoOS XP', en: 'About JoãoOS XP' },
    title: { pt: 'Sobre o JoãoOS XP', en: 'About JoãoOS XP' }, w: 560, h: 640, minW: 340, minH: 360,
    render() {
      const me = D().me;
      const cr = [
        ['ab.icons', [['Silk', 'Mark James', 'CC BY 2.5', 'https://famfamfam.com/lab/icons/silk/'], ['pixelarticons', 'Gerrit Halfmann', 'MIT', 'https://github.com/halfmage/pixelarticons'], ['Simple Icons', 'Simple Icons Collaborators', 'CC0', 'https://simpleicons.org']]],
        ['ab.fonts', [['Jersey 10', 'The Soft Type Project Authors', 'SIL OFL 1.1', 'https://github.com/scfried/soft-type-jersey'], ['VT323', 'Peter Hull', 'SIL OFL 1.1', 'https://github.com/phoikoi/VT323'], ['Press Start 2P', 'CodeMan38', 'SIL OFL 1.1', 'https://fonts.google.com/specimen/Press+Start+2P']]],
      ].map((g) => '<h4>' + esc(t(g[0])) + '</h4><ul>' + g[1].map((c) => '<li>' + ext(c[3], 'lnk', esc(c[0])) + ' — ' + esc(c[1]) + ' <span class="chip">' + c[2] + '</span></li>').join('') + '</ul>').join('');
      return '<div class="ab"><div class="ab-head"><div class="ab-logo"><span>João</span>OS<sup>XP</sup></div><p>Game Developer Edition</p></div>'
        + '<div class="ab-body sel"><p><b>' + esc(t('ab.version')) + '</b> 2026.1 (pixel build)</p><p>' + esc(t('ab.licensed')) + ' <b>' + esc(me.name) + '</b></p><p>' + esc(t('ab.built')) + '</p>'
        + '<div class="ab-cr">' + cr + '</div><p class="ab-disc">' + esc(t('ab.disc')) + '</p>'
        + '<div class="ab-btns">' + ext('https://github.com/caduceusj/caduceusj.github.io', 'btn', gl('github') + ' <span>' + esc(t('ab.source')) + '</span>') + '<button type="button" class="btn primary" data-act="ab-close">OK</button></div></div></div>';
    },
  });
  JOS.actions['ab-close'] = (el) => { const w = JOS.winOf(el); if (w) w.close(); };
})();
