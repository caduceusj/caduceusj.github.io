/* JoãoOS XP — career apps: Experience, Education & Research, Achievements */
(function () {
  'use strict';
  const JOS = window.JOS;
  const { esc, gl, ico } = JOS;
  const t = (k, v) => JOS.t(k, v);
  const L = (o) => JOS.L(o);
  const D = () => JOS.data;
  const reg = (def) => JOS.apps.register(def);
  const ext = (href, cls, inner) => '<a class="' + cls + '" href="' + href + '" target="_blank" rel="noopener noreferrer">' + inner + '</a>';

  // ====================================================================== Experience
  const KINDS = ['all', 'teach', 'research', 'games', 'it'];
  function expHTML(w) {
    const d = D(), s = w.data.ex || (w.data.ex = { k: 'all' });
    const list = d.jobs.filter((j) => s.k === 'all' || j.kind === s.k);
    const tabs = KINDS.map((k) => '<button type="button" role="tab" class="tab" data-k="' + k + '" aria-selected="' + (s.k === k ? 'true' : 'false') + '">' + esc(t('exp.' + k)) + ' <span class="tab-n">' + d.jobs.filter((j) => k === 'all' || j.kind === k).length + '</span></button>').join('');
    const items = list.map((j) => '<article class="job"><span class="job-dot" aria-hidden="true"></span><div class="job-card"><div class="job-h">' + ico(j.ico, 2)
      + '<div class="job-t"><h3>' + esc(L(j.title)) + '</h3><div class="job-org">' + esc(j.org) + '</div></div>'
      + '<div class="job-p"><span class="chip blue">' + esc(L(j.period)) + '</span>' + (j.current ? '<span class="chip green">' + esc(t('exp.now')) + '</span>' : '') + '</div></div><p>' + esc(L(j.text)) + '</p></div></article>').join('');
    return '<div class="exp"><div class="tabs" role="tablist" aria-label="' + esc(t('exp.filter')) + '">' + tabs + '</div>'
      + '<div class="exp-scroll sel"><div class="exp-top"><span><b>' + d.jobs.length + '</b> ' + esc(t('exp.positions')) + ' · ' + esc(t('exp.since', { y: d.me.since })) + '</span><span class="exp-btns"><button type="button" class="btn sm" data-act="open-app" data-app="resume">' + ico('page_white_acrobat') + ' ' + esc(t('qa.resume')) + '</button>'
      + ext(d.links.linkedin, 'btn sm linkedin', gl('linkedin') + ' LinkedIn') + '</span></div><div class="timeline">' + items + '</div></div></div>';
  }
  reg({
    id: 'experience', desk: 6, right: 1, ico: 'briefcase', label: { pt: 'Experiência', en: 'Experience' },
    title: { pt: 'Experiência Profissional', en: 'Work Experience' }, w: 780, h: 640, minW: 340, minH: 320,
    render: expHTML,
    mount(w) {
      w.$('.tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) { w.data.ex.k = b.dataset.k; w.refresh(); } });
    },
    status: () => t('exp.positions.n', { n: D().jobs.length }),
  });

  // ====================================================================== Education & Research
  function eduHTML() {
    const d = D();
    const edu = d.education.map((e) => '<div class="edu-card">' + ico(e.ico, 2) + '<div><h4>' + esc(L(e.title)) + '</h4><div class="edu-org">' + esc(e.org) + '</div><div class="edu-per"><span class="chip">' + esc(L(e.period)) + '</span>' + (e.current ? '<span class="chip green">' + esc(t('exp.now')) + '</span>' : '') + '</div></div></div>').join('');
    const res = d.research.map((r) => '<article class="paper-card"><div class="paper-t"><span class="chip gold">' + esc(L(r.type)) + '</span><span class="chip blue">' + esc(r.venue) + '</span></div><h4>“' + esc(r.title) + '”</h4>'
      + (r.by ? '<p class="paper-by">' + esc(r.by) + '</p>' : '') + (r.note ? '<p class="paper-n">' + gl('check', 'gl-12') + ' ' + esc(L(r.note)) + '</p>' : '') + '</article>').join('');
    return '<div class="edu sel"><section><h3>' + gl('university') + ' ' + esc(t('edu.academic')) + '</h3><div class="edu-grid">' + edu + '</div></section>'
      + '<section><h3>' + gl('article') + ' ' + esc(t('edu.research')) + ' <span class="chip dark">IEEE VR 2026</span></h3><div class="paper-grid">' + res + '</div></section>'
      + '<section class="edu-cta"><button type="button" class="btn primary" data-act="open-app" data-app="achievements">' + ico('medal_gold_1') + ' ' + esc(t('edu.awards')) + '</button></section></div>';
  }
  reg({
    id: 'education', desk: 7, right: 2, ico: 'book_open', label: { pt: 'Educação e Pesquisa', en: 'Education & Research' },
    title: { pt: 'Educação e Pesquisa', en: 'Education & Research' }, w: 840, h: 660, minW: 340, minH: 320,
    render: eduHTML, status: () => t('edu.status', { d: D().education.length, p: D().research.length }),
  });

  // ====================================================================== Achievements
  JOS.actions['ach-open'] = (el) => JOS.wm.open(el.dataset.app, el.dataset.key ? { key: el.dataset.key } : {});
  function achHTML() {
    const list = D().achievements, got = list.filter((a) => a.kind !== 'lock').length, pct = Math.round((got / list.length) * 100);
    const items = list.map((a) => {
      const o = a.open;
      return '<li class="ach-i ' + a.kind + '"><span class="ach-ico">' + ico(a.ico, 2) + '</span><div class="ach-t"><b>' + esc(L(a.title)) + '</b><p>' + esc(L(a.text)) + '</p></div>'
        + (a.year ? '<span class="chip">' + a.year + '</span>' : '')
        + (o ? '<button type="button" class="btn sm' + (a.kind === 'lock' ? ' primary' : '') + '" data-act="ach-open" data-app="' + o.app + '"' + (o.key ? ' data-key="' + o.key + '"' : '') + '>' + (a.kind === 'lock' ? esc(t('ach.unlock')) : esc(t('ach.view'))) + '</button>' : '') + '</li>';
    }).join('');
    return '<div class="ach"><header class="ach-head">' + ico('medal_gold_1', 3) + '<div class="grow"><h2>' + esc(t('ach.title')) + '</h2><p>' + esc(t('ach.progress', { a: got, b: list.length })) + ' · ' + pct + '%</p><div class="progress" role="progressbar" aria-label="' + esc(t('ach.title')) + '" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div></div></header>'
      + '<ul class="ach-list sel">' + items + '</ul></div>';
  }
  reg({
    id: 'achievements', desk: 8, right: 4, ico: 'medal_gold_1', label: { pt: 'Conquistas', en: 'Achievements' },
    title: { pt: 'Conquistas', en: 'Achievements' }, w: 760, h: 640, minW: 340, minH: 320,
    render: achHTML, status: () => t('ach.progress', { a: D().achievements.filter((a) => a.kind !== 'lock').length, b: D().achievements.length }),
  });
})();
