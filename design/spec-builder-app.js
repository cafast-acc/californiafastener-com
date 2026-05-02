/* ─────────────────────────────────────────────────────────
   California Fastener — Spec Builder · App logic
   Port of the original 4-stage selector (Application →
   Environment → Strength → Constraints → Results) restyled
   for the Apple-warm-neutral site system.
   ───────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const MATERIALS = window.SB_MATERIALS || [];

  // ── State ────────────────────────────────────────────
  const state = {
    app: null,
    env: [],
    strength: 'standard',
    constraints: []
  };

  // ── Analytics shim ───────────────────────────────────
  function trackEvent(eventName, params) {
    try {
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
      }
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch (e) { /* never let analytics break the tool */ }
  }

  // ── Stage definitions ────────────────────────────────
  const APPS = [
    { v: 'structural',   t: 'Structural steel',        d: 'Steel-to-steel connections, beams, columns, frames' },
    { v: 'pressure',     t: 'Pressure vessel / flange', d: 'Flanged joints, pressure vessels, valves, piping' },
    { v: 'anchor',       t: 'Anchor to concrete',       d: 'Columns, equipment bases, foundations' },
    { v: 'piping',       t: 'Piping system',            d: 'Pipe flanges, clamps, supports, connections' },
    { v: 'industrial',   t: 'General industrial',       d: 'Manufacturing, equipment, general applications' },
    { v: 'machinery',    t: 'Machinery / equipment',    d: 'Automotive, rotating equipment, precision assemblies' },
    { v: 'custom',       t: 'Custom / machined',        d: 'Per-print parts, custom configurations, CNC' },
    { v: 'electrical',   t: 'Electrical / power',       d: 'Busbar, switchgear, grounding, power assemblies' },
    { v: 'unsure',       t: 'Not sure yet',             d: 'Show options based on the other answers' }
  ];

  const ENVS = [
    { v: 'standard',     t: 'Standard / indoor',    d: 'Dry, controlled environment, no special exposure' },
    { v: 'outdoor',      t: 'Outdoor / weathering', d: 'Rain, humidity, temperature swings' },
    { v: 'corrosive',    t: 'Corrosive chemicals',  d: 'Acids, solvents, aggressive media' },
    { v: 'marine',       t: 'Saltwater / marine',   d: 'Seawater, offshore, coastal, submerged' },
    { v: 'hightemp',     t: 'High temperature',     d: 'Operating above 300°F in service' },
    { v: 'highpressure', t: 'High pressure',        d: 'Pressure vessels, steam, hydraulics' }
  ];

  const STRENGTHS = [
    { v: 'standard', t: 'Standard',     r: 'Up to 90 ksi',   d: 'A307, SAE Gr 2, F1554 Gr 36' },
    { v: 'high',     t: 'High',         r: '120–150 ksi',    d: 'A193 B7, A325, SAE Gr 8' },
    { v: 'ultra',    t: 'Ultra-high',   r: '150+ ksi',       d: 'A490, A354 BD, Monel K500' }
  ];

  const CONSTRAINTS = [
    { v: 'none',      t: 'No preference',           d: 'Show the best option regardless of type or origin' },
    { v: 'stainless', t: 'Must be stainless',       d: 'Hygiene, appearance, or mild corrosion resistance' },
    { v: 'dfars',     t: 'DFARS / domestic',        d: 'Government, defense, federal — US-made material' },
    { v: 'no-carbon', t: 'No carbon steel',         d: 'Contamination or corrosion rules out carbon / alloy steel' },
    { v: 'specialty', t: 'Specialty alloy OK',      d: 'Monel, Inconel, Hastelloy, titanium acceptable' },
    { v: 'budget',    t: 'Cost-sensitive',          d: 'Prioritize economical options that still meet reqs' }
  ];

  const STAGE_META = [
    { n: 1, label: 'Application' },
    { n: 2, label: 'Environment' },
    { n: 3, label: 'Strength' },
    { n: 4, label: 'Requirements' },
    { n: 'r', label: 'Results' }
  ];

  // ── DOM helpers ──────────────────────────────────────
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'class') e.className = attrs[k];
        else if (k === 'html') e.innerHTML = attrs[k];
        else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
        else if (attrs[k] !== false && attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
      }
    }
    if (children) (Array.isArray(children) ? children : [children]).forEach(c => {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  // ── Build progress stepper ───────────────────────────
  function renderProgress(current) {
    const wrap = document.getElementById('sb-progress');
    wrap.innerHTML = '';
    STAGE_META.forEach((s, i) => {
      const isActive = s.n === current;
      const isComplete = current === 'r' ? s.n !== 'r' :
        (typeof current === 'number' && typeof s.n === 'number' && s.n < current);
      const step = el('div', {
        class: 'sb-step' + (isActive ? ' is-active' : '') + (isComplete ? ' is-complete' : ''),
        onclick: () => {
          if (isComplete || isActive) goToStage(s.n);
        }
      }, [
        el('span', { class: 'sb-step-num' }, isComplete ? '✓' : String(i + 1)),
        el('span', { class: 'sb-step-label' }, s.label)
      ]);
      wrap.appendChild(step);
      if (i < STAGE_META.length - 1) {
        wrap.appendChild(el('span', { class: 'sb-step-rule' + (isComplete ? ' is-complete' : '') }));
      }
    });
  }

  // ── Option card ──────────────────────────────────────
  function optionCard(opt, type, multi, isSelected) {
    const card = el('button', {
      type: 'button',
      class: 'sb-opt' + (isSelected ? ' is-selected' : ''),
      'data-value': opt.v,
      onclick: () => toggleOption(card, type, opt.v, multi)
    }, [
      el('div', { class: 'sb-opt-head' }, [
        el('div', { class: 'sb-opt-title' }, opt.t),
        el('div', { class: 'sb-opt-check', html: checkSVG() })
      ]),
      el('div', { class: 'sb-opt-desc' }, opt.d)
    ]);
    return card;
  }

  function checkSVG() {
    return '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  // ── Toggle selection ─────────────────────────────────
  function toggleOption(card, type, value, multi) {
    const grid = card.parentElement;
    if (!multi) {
      grid.querySelectorAll('.sb-opt').forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      state[type] = value;
    } else {
      if (value === 'none') {
        grid.querySelectorAll('.sb-opt').forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
        state[type] = ['none'];
      } else {
        const noneCard = grid.querySelector('.sb-opt[data-value="none"]');
        if (noneCard) noneCard.classList.remove('is-selected');
        state[type] = Array.isArray(state[type]) ? state[type].filter(v => v !== 'none') : [];
        if (card.classList.contains('is-selected')) {
          card.classList.remove('is-selected');
          state[type] = state[type].filter(v => v !== value);
        } else {
          card.classList.add('is-selected');
          state[type] = [...state[type], value];
        }
      }
    }
    updateNextButtons();
  }

  // ── Build stage pages ────────────────────────────────
  function renderStages() {
    const root = document.getElementById('sb-stages');
    root.innerHTML = '';

    // STAGE 1 — Application
    root.appendChild(
      el('section', { class: 'sb-stage is-active', id: 'sb-stage-1' }, [
        stageHeader('Step 1 of 4', 'What are you fastening?', 'Select the primary application — this determines which fastener standards apply.'),
        gridOf(APPS, 'app', false),
        stageNav({ next: { label: 'Next · Environment', to: 2, requires: () => !!state.app } })
      ])
    );

    // STAGE 2 — Environment
    root.appendChild(
      el('section', { class: 'sb-stage', id: 'sb-stage-2' }, [
        stageHeader('Step 2 of 4', 'Operating environment',
          'What will these fasteners be exposed to? Select all that apply — most real applications combine several (e.g. outdoor + high temp + high pressure).',
          { counterId: 'sb-env-counter' }),
        gridOf(ENVS, 'env', true),
        stageNav({
          back: { to: 1 },
          next: { label: 'Next · Strength', to: 3, requires: () => state.env.length > 0 }
        })
      ])
    );

    // STAGE 3 — Strength
    root.appendChild(
      el('section', { class: 'sb-stage', id: 'sb-stage-3' }, [
        stageHeader('Step 3 of 4', 'Strength requirement',
          'What tensile strength range does your application need? Drag the slider or tap a card.'),
        strengthPicker(),
        stageNav({ back: { to: 2 }, next: { label: 'Next · Requirements', to: 4, requires: () => true } })
      ])
    );

    // STAGE 4 — Constraints
    root.appendChild(
      el('section', { class: 'sb-stage', id: 'sb-stage-4' }, [
        stageHeader('Step 4 of 4', 'Material requirements',
          'Any rules on material type, origin, or compliance? Select all that apply.',
          { counterId: 'sb-const-counter' }),
        gridOf(CONSTRAINTS, 'constraints', true),
        stageNav({
          back: { to: 3 },
          next: { label: 'See recommendations', to: 'r', requires: () => state.constraints.length > 0 }
        })
      ])
    );

    // RESULTS
    root.appendChild(
      el('section', { class: 'sb-stage sb-stage-results', id: 'sb-stage-r' }, [
        el('div', { class: 'sb-results-head' }, [
          el('div', { class: 'sb-results-eyebrow' }, 'Recommendations'),
          el('h2', { class: 'sb-results-title' }, 'Here’s what fits your spec.'),
          el('div', { class: 'sb-results-summary', id: 'sb-results-summary' }),
          el('div', { class: 'sb-results-actions' }, [
            el('button', { type: 'button', class: 'sb-btn sb-btn-ghost', onclick: resetAll }, 'Start over'),
            el('a', { href: 'quote-flow.html', class: 'sb-btn sb-btn-primary' }, 'Request a full quote')
          ])
        ]),
        el('div', { id: 'sb-results-output' })
      ])
    );
  }

  function stageHeader(eyebrow, title, subtitle, opts) {
    opts = opts || {};
    const sub = el('p', { class: 'sb-stage-subtitle' }, subtitle);
    if (opts.counterId) {
      sub.appendChild(document.createTextNode(' '));
      sub.appendChild(el('span', { class: 'sb-counter', id: opts.counterId }, '0 selected'));
    }
    return el('header', { class: 'sb-stage-head' }, [
      el('div', { class: 'sb-stage-eyebrow' }, eyebrow),
      el('h2', { class: 'sb-stage-title' }, title),
      sub
    ]);
  }

  function gridOf(opts, type, multi) {
    const grid = el('div', { class: 'sb-opts' });
    opts.forEach(opt => {
      const selected = multi
        ? (Array.isArray(state[type]) && state[type].indexOf(opt.v) >= 0)
        : (state[type] === opt.v);
      grid.appendChild(optionCard(opt, type, multi, selected));
    });
    return grid;
  }

  function stageNav(cfg) {
    const nav = el('div', { class: 'sb-nav' });
    if (cfg.back) {
      nav.appendChild(
        el('button', { type: 'button', class: 'sb-btn sb-btn-ghost', onclick: () => goToStage(cfg.back.to) }, '← Back')
      );
    } else {
      nav.appendChild(el('span', { class: 'sb-nav-spacer' }));
    }
    if (cfg.next) {
      const nextBtn = el('button', {
        type: 'button',
        class: 'sb-btn sb-btn-primary',
        'data-stage-next': String(cfg.next.to),
        'data-requires': '1',
        onclick: () => {
          if (!cfg.next.requires()) return;
          goToStage(cfg.next.to);
        }
      }, cfg.next.label + ' →');
      nav.appendChild(nextBtn);
    }
    return nav;
  }

  // ── Strength picker (slider + 3 cards) ───────────────
  function strengthPicker() {
    const wrap = el('div', { class: 'sb-strength' });
    const labels = el('div', { class: 'sb-strength-labels' });
    STRENGTHS.forEach(s => labels.appendChild(
      el('div', { class: 'sb-strength-tick' }, [
        el('strong', null, s.r),
        el('span', null, s.t)
      ])
    ));
    wrap.appendChild(labels);

    const track = el('div', { class: 'sb-strength-track' });
    const fill = el('div', { class: 'sb-strength-fill', id: 'sb-str-fill' });
    const thumb = el('div', { class: 'sb-strength-thumb', id: 'sb-str-thumb' });
    const range = el('input', {
      type: 'range', min: 0, max: 2, step: 1, value: 0, id: 'sb-str-range',
      oninput: (ev) => applyStrength(+ev.target.value)
    });
    track.appendChild(fill);
    track.appendChild(thumb);
    track.appendChild(range);
    wrap.appendChild(track);

    const cards = el('div', { class: 'sb-opts sb-opts-3' });
    STRENGTHS.forEach((s, i) => {
      const card = el('button', {
        type: 'button',
        class: 'sb-opt' + (i === 0 ? ' is-selected' : ''),
        'data-strength-idx': String(i),
        onclick: () => applyStrength(i)
      }, [
        el('div', { class: 'sb-opt-head' }, [
          el('div', { class: 'sb-opt-title' }, s.t),
          el('div', { class: 'sb-opt-check', html: checkSVG() })
        ]),
        el('div', { class: 'sb-opt-desc' }, s.d)
      ]);
      cards.appendChild(card);
    });
    wrap.appendChild(cards);
    return wrap;
  }

  function applyStrength(idx) {
    const values = ['standard', 'high', 'ultra'];
    state.strength = values[idx];
    const pct = [16, 50, 84][idx];
    const fill = document.getElementById('sb-str-fill');
    const thumb = document.getElementById('sb-str-thumb');
    const range = document.getElementById('sb-str-range');
    if (fill) fill.style.width = pct + '%';
    if (thumb) thumb.style.left = pct + '%';
    if (range) range.value = idx;
    document.querySelectorAll('[data-strength-idx]').forEach(c => {
      c.classList.toggle('is-selected', +c.dataset.strengthIdx === idx);
    });
  }

  // ── Next-button enable + counters ────────────────────
  function updateNextButtons() {
    document.querySelectorAll('.sb-btn[data-stage-next]').forEach(btn => {
      const stageEl = btn.closest('.sb-stage');
      const stageIdx = stageEl ? +(stageEl.id.split('-').pop()) : null;
      let enabled = true;
      if (stageIdx === 1) enabled = !!state.app;
      if (stageIdx === 2) enabled = state.env.length > 0;
      if (stageIdx === 4) enabled = state.constraints.length > 0;
      btn.disabled = !enabled;
      btn.classList.toggle('is-disabled', !enabled);
    });

    const envC = document.getElementById('sb-env-counter');
    if (envC) {
      envC.textContent = state.env.length + ' selected';
      envC.classList.toggle('is-empty', state.env.length === 0);
    }
    const cC = document.getElementById('sb-const-counter');
    if (cC) {
      cC.textContent = state.constraints.length + ' selected';
      cC.classList.toggle('is-empty', state.constraints.length === 0);
    }
  }

  // ── Navigation ───────────────────────────────────────
  function goToStage(n) {
    // Guards on forward nav
    if (n === 2 && !state.app) return;
    if (n === 3 && state.env.length === 0) return;
    if (n === 'r' && state.constraints.length === 0) return;

    document.querySelectorAll('.sb-stage').forEach(s => s.classList.remove('is-active'));
    const target = document.getElementById('sb-stage-' + n);
    if (target) target.classList.add('is-active');
    renderProgress(n);
    if (n === 'r') renderResults();
    // Scroll into view
    const progTop = document.querySelector('.sb-progress-wrap');
    if (progTop) progTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    trackEvent('spec_builder_stage', {
      stage: n, app: state.app, env: state.env.join(','),
      strength: state.strength, constraints: state.constraints.join(',')
    });
  }

  // ── Scoring engine (direct port of original logic) ───
  function scoreMatch(mat) {
    let score = 0;
    const app = state.app;
    const envs = state.env;
    const str = state.strength;
    const cons = state.constraints;

    if (mat.apps.indexOf(app) >= 0) score += 30;
    else if (app === 'unsure') score += 10;

    if (envs.length > 0) {
      const matched = envs.filter(e => mat.envs.indexOf(e) >= 0);
      if (matched.length === 0) return -1;
      score += matched.length * 20;
    }

    if (mat.strengths.indexOf(str) >= 0) score += 25;
    else if (str === 'unsure') score += 10;

    if (cons.indexOf('stainless') >= 0 && !mat.isStainless && mat.id !== 'titanium') return -1;
    if (cons.indexOf('no-carbon') >= 0 && (mat.isCarbonSteel || mat.isAlloySteel)) return -1;
    if (cons.indexOf('dfars') >= 0 && !mat.dfars) return -1;

    const isSpecialty = mat.isNickelAlloy || mat.id === 'titanium' || mat.id === '17-4' || mat.id === 'a286';
    if (cons.indexOf('specialty') >= 0 && isSpecialty) score += 15;
    if (cons.indexOf('dfars') >= 0 && mat.dfars) score += 10;
    if (cons.indexOf('budget') >= 0) {
      if (mat.isCarbonSteel) score += 15;
      else if (mat.isAlloySteel) score += 10;
    }
    if (cons.indexOf('none') >= 0) score += 5;

    const catMap = {
      'Structural Bolt':            ['structural','infrastructure'],
      'High-Strength Structural':   ['structural','infrastructure'],
      'Anchor Bolts':               ['anchor'],
      'High-Temp Alloy':            ['pressure','piping'],
      'Carbon Steel':               ['machinery','industrial']
    };
    const catApps = catMap[mat.category];
    if (catApps && catApps.indexOf(app) >= 0) score += 15;

    if (mat.inStock) score += 1;
    if (!mat.custom) score += 1;
    if (mat.legacySpec) score -= 15;

    return score;
  }

  function getWhy(mat) {
    return mat.why[state.app] || mat.why.default;
  }

  function titleCase(s) {
    return (s || '').split(/[\s,+]+/).filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' + ');
  }

  // ── Results render ───────────────────────────────────
  function renderResults() {
    const summary = document.getElementById('sb-results-summary');
    const pills = [
      { l: 'Application', v: state.app },
      { l: 'Environment', v: state.env.join(' + ') },
      { l: 'Strength',    v: state.strength },
      { l: 'Requirements', v: state.constraints.join(' + ') }
    ];
    summary.innerHTML = pills.filter(p => p.v).map(p =>
      `<span class="sb-summary-pill"><strong>${p.l}</strong> ${titleCase(p.v)}</span>`
    ).join('');

    const scored = MATERIALS.map(m => ({ ...m, score: scoreMatch(m) }))
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    const out = document.getElementById('sb-results-output');
    if (scored.length === 0) {
      out.innerHTML = `
        <div class="sb-noresults">
          <h3>No exact match found</h3>
          <p>Your requirements may call for a specialty solution. Our team handles unusual specs every day —
            <a href="quote-flow.html">talk to an estimator</a> and we'll work it through with you.</p>
        </div>`;
      return;
    }

    const top = scored[0];
    const alts = scored.slice(1, 4);
    const isDfars = state.constraints.indexOf('dfars') >= 0;

    let html = '';
    html += `<div class="sb-results-section"><div class="sb-results-label">Top recommendation</div>`;
    html += resultCard(top, true, isDfars);
    html += `</div>`;
    if (alts.length) {
      html += `<div class="sb-results-section"><div class="sb-results-label">Also consider</div>`;
      html += alts.map(m => resultCard(m, false, isDfars)).join('');
      html += `</div>`;
    }

    html += `
      <div class="sb-results-footer">
        <p>Not finding the right match? Our estimators have specified fasteners for thousands of projects.</p>
        <button type="button" class="sb-btn sb-btn-primary" onclick="sbOpenQuote(null)">Talk to an engineer →</button>
      </div>
      <div class="sb-disclaimer">
        <strong>Note —</strong> This tool is a starting point for material selection based on common industry practice.
        Final selection should be verified by a qualified engineer for your specific application, taking into
        account all relevant codes, standards, environmental factors, and design loads. California Fastener
        supplies materials per customer specification and does not assume responsibility for design decisions.
      </div>`;

    out.innerHTML = html;

    trackEvent('spec_builder_results', {
      app: state.app, env: state.env.join(','),
      strength: state.strength, constraints: state.constraints.join(','),
      top_pick: top ? top.id : 'none',
      top_pick_spec: top ? top.spec : 'none',
      alternatives: alts.map(a => a.id).join(','),
      result_count: scored.length
    });
  }

  function resultCard(mat, isTop, isDfars) {
    const companions = [...mat.nuts, ...mat.washers].map(c =>
      `<span class="sb-companion"><strong>${escapeHtml(c.spec)}</strong>${escapeHtml(c.grade)}</span>`
    ).join('');

    const availLabel = mat.inStock ? 'In stock' :
      (mat.custom ? 'Made to order' : 'Available');
    const availClass = mat.inStock ? 'is-stock' : 'is-custom';

    const dfarsRow = isDfars && mat.dfars
      ? `<div class="sb-result-dfars">🇺🇸 DFARS-compliant material available on this spec</div>` : '';

    const encodedData = encodeQuoteData(mat);

    return `
      <article class="sb-result ${isTop ? 'is-top' : ''}">
        <div class="sb-result-head">
          <div class="sb-result-titles">
            <div class="sb-result-spec">${escapeHtml(mat.spec)}</div>
            <div class="sb-result-grade">${escapeHtml(mat.grade)}</div>
          </div>
          <div class="sb-result-tags">
            ${isTop ? '<span class="sb-tag sb-tag-top">Top pick</span>' : '<span class="sb-tag">Alternative</span>'}
            <span class="sb-avail ${availClass}">${availLabel}</span>
          </div>
        </div>
        <div class="sb-result-body">
          ${dfarsRow}
          <p class="sb-result-why">${escapeHtml(getWhy(mat))}</p>
          <div class="sb-spec-grid">
            <div class="sb-spec-cell"><label>Tensile</label><span>${escapeHtml(mat.tensile)}</span></div>
            <div class="sb-spec-cell"><label>Temp</label><span>${escapeHtml(mat.tempRating)}</span></div>
            <div class="sb-spec-cell"><label>Diameter</label><span>${escapeHtml(mat.diamRange)}</span></div>
            <div class="sb-spec-cell"><label>Finish</label><span>${escapeHtml(mat.finish)}</span></div>
          </div>
          <div class="sb-companions">
            <div class="sb-companions-label">Recommended nuts &amp; washers</div>
            ${companions}
          </div>
        </div>
        <div class="sb-result-foot">
          <div class="sb-result-cat">${escapeHtml(mat.category)}</div>
          <button type="button" class="sb-btn sb-btn-primary" onclick="sbOpenQuote(${encodedData})">Request quote →</button>
        </div>
      </article>`;
  }

  function encodeQuoteData(mat) {
    return JSON.stringify({
      spec: mat.spec, grade: mat.grade,
      app: state.app, env: state.env.join(', '),
      strength: state.strength,
      constraints: state.constraints.join(', ')
    }).replace(/"/g, '&quot;');
  }

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
  }

  // ── Reset ────────────────────────────────────────────
  function resetAll() {
    state.app = null;
    state.env = [];
    state.strength = 'standard';
    state.constraints = [];
    renderStages();
    applyStrength(0);
    updateNextButtons();
    goToStage(1);
  }

  // ── Quote modal ──────────────────────────────────────
  // Field map (new Jotform 260995842557069):
  //   input_16 = Full Name (required)
  //   input_3  = Email (required)
  //   input_4  = Company (required)
  //   input_5_full = Phone (optional)
  //   input_6  = Message / textarea (optional)
  //   input_7  = hidden: spec
  //   input_8  = hidden: grade
  //   input_9  = hidden: application
  //   input_10 = hidden: environment
  //   input_11 = hidden: strength
  //   input_12 = hidden: constraints

  function openQuote(data) {
    const overlay = document.getElementById('sb-modal-overlay');
    const form = overlay.querySelector('form.jotform-form');
    const thank = document.getElementById('sb-thank-you');
    const formWrap = document.getElementById('sb-modal-form-wrap');
    const ctx = document.getElementById('sb-modal-context');
    const submitBtn = form.querySelector('.form-submit-button');

    // Reset state
    formWrap.style.display = '';
    thank.style.display = 'none';
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send request'; }

    // Clear visible fields
    ['input_16','input_3','input_4','input_5_full','input_6'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Pre-fill hidden structured fields from Spec Builder state
    const setHidden = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
    setHidden('input_7',  data ? data.spec : '');
    setHidden('input_8',  data ? data.grade : '');
    setHidden('input_9',  data ? data.app : '');
    setHidden('input_10', data ? data.env : '');
    setHidden('input_11', data ? data.strength : '');
    setHidden('input_12', data ? data.constraints : '');

    // Submit metadata
    const submitDate = document.getElementById('submitDate');
    if (submitDate) submitDate.value = new Date().toISOString();

    // Context banner
    if (data && data.spec) {
      ctx.innerHTML = `
        <div class="sb-modal-context-label">Based on your selection</div>
        <div class="sb-modal-context-pills">
          <span class="sb-modal-pill"><strong>${escapeHtml(data.spec)}</strong>${escapeHtml(data.grade || '')}</span>
          ${data.app ? `<span class="sb-modal-pill">${escapeHtml(titleCase(data.app))}</span>` : ''}
          ${data.env ? `<span class="sb-modal-pill">${escapeHtml(titleCase(data.env))}</span>` : ''}
          ${data.strength ? `<span class="sb-modal-pill">${escapeHtml(titleCase(data.strength))} strength</span>` : ''}
        </div>`;
      ctx.style.display = '';
    } else {
      ctx.innerHTML = '';
      ctx.style.display = 'none';
    }

    overlay.classList.add('is-open');
    document.body.classList.add('sb-modal-open');
    setTimeout(() => {
      const nameField = document.getElementById('input_16');
      if (nameField) nameField.focus();
    }, 150);
  }

  function closeQuote() {
    document.getElementById('sb-modal-overlay').classList.remove('is-open');
    document.body.classList.remove('sb-modal-open');
  }

  // Wire modal events
  function wireModal() {
    const overlay = document.getElementById('sb-modal-overlay');
    const closeBtn = document.getElementById('sb-modal-close');
    const tyCloseBtn = document.getElementById('sb-ty-close');
    const form = overlay.querySelector('form.jotform-form');

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuote(); });
    if (closeBtn) closeBtn.addEventListener('click', closeQuote);
    if (tyCloseBtn) tyCloseBtn.addEventListener('click', closeQuote);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeQuote();
    });

    // Honeypot value (matches the JF "simple_spc" pattern)
    const spc = form && form.querySelector('.simple_spc');
    if (spc) spc.value = '260995842557069-260995842557069';

    // Phone mask (###) ###-####
    const phone = document.getElementById('input_5_full');
    if (phone) {
      phone.addEventListener('input', function () {
        const v = this.value.replace(/\D/g, '').substring(0, 10);
        let out = '';
        if (v.length > 0) out = '(' + v.substring(0, 3);
        if (v.length >= 3) out += ') ';
        if (v.length > 3) out += v.substring(3, 6);
        if (v.length >= 6) out += '-' + v.substring(6, 10);
        this.value = v.length === 0 ? '' : out;
      });
    }

    // Submit into hidden iframe → show thank-you
    if (form) {
      let iframe = document.getElementById('sb-jf-frame');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.name = 'sb-jf-frame';
        iframe.id = 'sb-jf-frame';
        iframe.style.cssText = 'display:none;width:0;height:0;border:none;';
        document.body.appendChild(iframe);
      }
      form.setAttribute('target', 'sb-jf-frame');

      form.addEventListener('submit', (e) => {
        const name = document.getElementById('input_16');
        const email = document.getElementById('input_3');
        const company = document.getElementById('input_4');
        let valid = true;
        [name, email, company].forEach(f => {
          if (f && !f.value.trim()) {
            valid = false;
            f.classList.add('is-error');
            f.addEventListener('input', function h() { f.classList.remove('is-error'); f.removeEventListener('input', h); }, { once: true });
          }
        });
        if (!valid) { e.preventDefault(); return; }

        const submit = form.querySelector('.form-submit-button');
        const origLabel = submit.textContent;
        submit.disabled = true;
        submit.textContent = 'Sending…';

        iframe.onload = () => {
          document.getElementById('sb-modal-form-wrap').style.display = 'none';
          document.getElementById('sb-thank-you').style.display = 'block';
          submit.disabled = false;
          submit.textContent = origLabel;
          trackEvent('spec_builder_quote_submit', {
            app: state.app, env: state.env.join(','),
            strength: state.strength, constraints: state.constraints.join(',')
          });
        };
      });
    }
  }

  // Expose public API for onclick= handlers
  window.sbOpenQuote = openQuote;

  // ── Boot ─────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    renderStages();
    renderProgress(1);
    applyStrength(0);
    updateNextButtons();
    wireModal();
  });

})();
