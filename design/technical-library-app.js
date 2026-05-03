/* California Fastener — Technical Library app */

const SECTIONS = window.LIB_SECTIONS;
const SPECS = window.LIB_SPECS;
const FACETS = window.LIB_FACETS;

/* ─ Render: hero index ──────────────────────────── */
const heroIndexEl = document.getElementById('hero-index');
heroIndexEl.innerHTML = SECTIONS.map(s => {
  const count = SPECS.filter(sp => sp.section === s.id).length;
  return `<li><a href="#sec-${s.id}" data-jump="${s.id}">
    <span class="lib-index-title">${s.title.replace(' Specifications','').replace(' Reference','').replace(' Standards','')}</span>
    <span class="lib-index-count-mini">${count}</span>
  </a></li>`;
}).join('');

/* ─ Render: facet chips ─────────────────────────── */
function renderFacets() {
  const counts = {category:{}, industry:{}, service:{}};
  SPECS.forEach(sp => {
    counts.category[sp.section] = (counts.category[sp.section]||0)+1;
    (sp.industries||[]).forEach(i => counts.industry[i] = (counts.industry[i]||0)+1);
    (sp.service||[]).forEach(s => counts.service[s] = (counts.service[s]||0)+1);
  });
  Object.keys(FACETS).forEach(group => {
    const el = document.getElementById(`facet-${group}`);
    el.innerHTML = FACETS[group].map(f => {
      const n = counts[group][f.id] || 0;
      if (!n) return '';
      return `<button class="lib-facet-chip" data-facet="${group}" data-val="${f.id}">${f.label}<em>${n}</em></button>`;
    }).join('');
  });
}
renderFacets();

/* ─ Render: spec sections (cards) ───────────────── */
const sectionsEl = document.getElementById('sections');

function cardHtml(sp) {
  const gradesHtml = sp.grades.slice(0,6).map(g => `<span class="lib-card-grade">${g}</span>`).join('');
  const industryTags = (sp.industries||[]).slice(0,2).map(id => {
    const f = FACETS.industry.find(x=>x.id===id);
    return f ? `<span class="lib-card-tag lib-card-tag--industry">${f.label}</span>` : '';
  }).join('');
  const serviceTags = (sp.service||[]).filter(s=>s!=='ambient').slice(0,2).map(id => {
    const f = FACETS.service.find(x=>x.id===id);
    return f ? `<span class="lib-card-tag lib-card-tag--service">${f.label}</span>` : '';
  }).join('');
  const popBadge = sp.popularity === 1 ? '<span class="lib-card-popular">● Commonly shipped</span>' : '';
  const searchBlob = [sp.code, sp.title, sp.note, ...(sp.grades||[]), ...(sp.industries||[]), ...(sp.service||[])].join(' ').toLowerCase();

  return `
    <a class="lib-card ${sp.popularity===1?'is-popular':''}"
       href="spec.html?s=${sp.file}"
       data-spec="${sp.file}"
       data-section="${sp.section}"
       data-industries="${(sp.industries||[]).join(',')}"
       data-services="${(sp.service||[]).join(',')}"
       data-search="${searchBlob.replace(/"/g,'&quot;')}">
      <div class="lib-card-id">
        <div class="lib-card-code">${sp.code}</div>
        ${popBadge}
      </div>
      <div class="lib-card-body">
        <h3 class="lib-card-title">${sp.title}</h3>
        <p class="lib-card-note">${sp.note||''}</p>
      </div>
      <div class="lib-card-meta">
        <div class="lib-card-grades">${gradesHtml}</div>
        <div class="lib-card-tags">${industryTags}${serviceTags}</div>
      </div>
      <svg class="lib-card-arrow" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 11l6-6M11 5v5H6"/></svg>
    </a>
  `;
}

function renderSections() {
  sectionsEl.innerHTML = SECTIONS.map(s => {
    const specs = SPECS
      .filter(sp => sp.section === s.id)
      .sort((a,b) => (b.popularity||0) - (a.popularity||0));
    return `
      <section class="lib-sec" id="sec-${s.id}" data-section="${s.id}" data-screen-label="Sec ${s.num} ${s.title}">
        <header class="lib-sec-head">
          <div class="lib-sec-marker"><b>${s.num}</b>${s.tag} · ${specs.length} specs</div>
          <div>
            <h2 class="lib-sec-title">${s.title}</h2>
            <p class="lib-sec-lede">${s.lede}</p>
          </div>
          <aside class="lib-sec-starthere">
            <b>Start here</b>
            <a href="#">${s.starthere.code}</a>
            ${s.starthere.why}
          </aside>
        </header>
        <div class="lib-sec-cards">
          ${specs.map(cardHtml).join('')}
        </div>
      </section>
    `;
  }).join('');
}
renderSections();

/* ─ State ───────────────────────────────────────── */
const state = {
  q: '',
  facets: { category: null, industry: new Set(), service: new Set() }
};

/* ─ Filtering ───────────────────────────────────── */
const countShown = document.getElementById('count-shown');
const statsContext = document.getElementById('stats-context');
const empty = document.getElementById('empty');
const emptyQuery = document.getElementById('empty-query');
const facetClear = document.getElementById('facet-clear');
const searchInput = document.getElementById('lib-search');

function applyFilter() {
  const q = state.q.trim().toLowerCase();
  let shown = 0;

  document.querySelectorAll('.lib-sec').forEach(sec => {
    const sid = sec.dataset.section;
    const matchCategory = !state.facets.category || state.facets.category === sid;
    let visibleInSec = 0;

    sec.querySelectorAll('.lib-card').forEach(card => {
      const matchQ = !q || card.dataset.search.includes(q);
      const cardIndustries = card.dataset.industries.split(',');
      const cardServices = card.dataset.services.split(',');
      const matchIndustry = state.facets.industry.size === 0 ||
        [...state.facets.industry].every(i => cardIndustries.includes(i));
      const matchService = state.facets.service.size === 0 ||
        [...state.facets.service].every(s => cardServices.includes(s));

      const visible = matchCategory && matchQ && matchIndustry && matchService;
      card.style.display = visible ? '' : 'none';
      if (visible) { shown++; visibleInSec++; }
    });
    sec.classList.toggle('is-hidden', visibleInSec === 0);
  });

  countShown.textContent = shown;

  /* Context label */
  const parts = [];
  if (state.facets.category) {
    const f = FACETS.category.find(c=>c.id===state.facets.category);
    if (f) parts.push(f.label);
  } else parts.push('All categories');
  if (state.facets.industry.size) parts.push([...state.facets.industry].map(id=>FACETS.industry.find(x=>x.id===id)?.label).join(' + '));
  if (state.facets.service.size) parts.push([...state.facets.service].map(id=>FACETS.service.find(x=>x.id===id)?.label).join(' + '));
  if (q) parts.push(`“${q}”`);
  statsContext.textContent = parts.join(' · ');

  const hasFilters = state.facets.category || state.facets.industry.size || state.facets.service.size || q;
  facetClear.hidden = !hasFilters;

  empty.hidden = shown !== 0;
  emptyQuery.textContent = q ? `“${q}”` : 'your filters';
  if (typeof syncRefineCount === 'function') syncRefineCount();
}

/* ─ Facet click ─────────────────────────────────── */
document.querySelectorAll('.lib-facet-chips').forEach(group => {
  group.addEventListener('click', e => {
    const btn = e.target.closest('.lib-facet-chip');
    if (!btn) return;
    const facet = btn.dataset.facet;
    const val = btn.dataset.val;
    if (facet === 'category') {
      state.facets.category = state.facets.category === val ? null : val;
    } else {
      state.facets[facet].has(val) ? state.facets[facet].delete(val) : state.facets[facet].add(val);
    }
    syncFacetUi();
    applyFilter();
  });
});

function syncFacetUi() {
  document.querySelectorAll('.lib-facet-chip').forEach(btn => {
    const facet = btn.dataset.facet;
    const val = btn.dataset.val;
    const active = facet === 'category'
      ? state.facets.category === val
      : state.facets[facet].has(val);
    btn.classList.toggle('is-active', active);
  });
}

facetClear.addEventListener('click', () => {
  state.facets.category = null;
  state.facets.industry.clear();
  state.facets.service.clear();
  state.q = '';
  searchInput.value = '';
  document.getElementById('search-hint').style.opacity = '1';
  syncFacetUi();
  applyFilter();
});

/* ─ Refine toggle ───────────────────────────────── */
const refineBtn = document.getElementById('facet-more');
const refinePanel = document.getElementById('toolbar-refine');
const refineCount = document.getElementById('facet-more-count');
refineBtn.addEventListener('click', () => {
  const open = refineBtn.getAttribute('aria-expanded') === 'true';
  refineBtn.setAttribute('aria-expanded', String(!open));
  refinePanel.hidden = open;
});
function syncRefineCount() {
  const n = state.facets.industry.size + state.facets.service.size;
  refineCount.textContent = n;
  refineCount.hidden = n === 0;
  if (n > 0) refinePanel.hidden = false, refineBtn.setAttribute('aria-expanded','true');
}
document.getElementById('empty-clear').addEventListener('click', () => facetClear.click());

/* ─ Search ──────────────────────────────────────── */
searchInput.addEventListener('input', e => {
  state.q = e.target.value;
  document.getElementById('search-hint').style.opacity = state.q ? '0' : '1';
  applyFilter();
});

document.addEventListener('keydown', e => {
  if ((e.key === '/' || e.key === 's') && document.activeElement !== searchInput && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchInput.blur();
    searchInput.value = '';
    state.q = '';
    document.getElementById('search-hint').style.opacity = '1';
    applyFilter();
  }
  if ((e.key === 'p' || e.key === 'P') && document.activeElement !== searchInput && !e.metaKey && !e.ctrlKey) {
    togglePrint();
  }
});

/* ─ Starting points jump ────────────────────────── */
document.querySelectorAll('.lib-start').forEach(btn => {
  btn.addEventListener('click', () => {
    const kind = btn.dataset.start;
    state.facets.category = null;
    state.facets.industry.clear();
    state.facets.service.clear();
    state.q = '';
    searchInput.value = '';
    /* Open the starting panel — toggle a facet as a shortcut */
    if (kind === 'industry') {
      state.facets.industry.add('structural');
    } else if (kind === 'service') {
      state.facets.service.add('high-temp');
    } else if (kind === 'strength') {
      /* No perfect mapping; just jump to bolts */
      state.facets.category = 'bolt';
    }
    syncFacetUi();
    applyFilter();
    document.getElementById('specs').scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* ─ Layout switch ───────────────────────────────── */
document.querySelector('.lib-layout-switch').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  setLayout(btn.dataset.layout);
});
function setLayout(layout) {
  document.querySelectorAll('.lib-layout-switch button').forEach(b => {
    b.classList.toggle('is-active', b.dataset.layout === layout);
  });
  document.body.classList.remove('lib-layout--editorial','lib-layout--grid','lib-layout--table');
  document.body.classList.add(`lib-layout--${layout}`);
  tweaks.layout = layout;
  syncTweakUi();
}

/* ─ Tweaks ──────────────────────────────────────── */
const tweaks = {...TWEAK_DEFAULTS};

function applyTweaks() {
  document.body.classList.remove('lib-layout--editorial','lib-layout--grid','lib-layout--table');
  document.body.classList.add(`lib-layout--${tweaks.layout}`);
  document.body.classList.toggle('lib-density--compact', tweaks.density === 'compact');
  document.body.classList.toggle('lib-tags--off', tweaks.tags === 'off');
  document.body.classList.toggle('lib-hero--off', tweaks.hero === 'off');
  document.querySelectorAll('.lib-layout-switch button').forEach(b => {
    b.classList.toggle('is-active', b.dataset.layout === tweaks.layout);
  });
  syncTweakUi();
}
function syncTweakUi() {
  document.querySelectorAll('.lib-tweaks-opts').forEach(group => {
    const key = group.dataset.tweak;
    group.querySelectorAll('button').forEach(b => {
      b.classList.toggle('is-active', b.dataset.val === tweaks[key]);
    });
  });
}

const tweaksEl = document.getElementById('tweaks');
tweaksEl.addEventListener('click', e => {
  const btn = e.target.closest('.lib-tweaks-opts button');
  if (!btn) return;
  const key = btn.closest('.lib-tweaks-opts').dataset.tweak;
  tweaks[key] = btn.dataset.val;
  applyTweaks();
  window.parent.postMessage({type:'__edit_mode_set_keys', edits:{[key]: tweaks[key]}}, '*');
});

/* Edit-mode host protocol — register listener FIRST */
window.addEventListener('message', e => {
  const d = e.data || {};
  if (d.type === '__activate_edit_mode') tweaksEl.hidden = false;
  if (d.type === '__deactivate_edit_mode') tweaksEl.hidden = true;
});
window.parent.postMessage({type:'__edit_mode_available'}, '*');

applyTweaks();

/* ─ Print mode ──────────────────────────────────── */
function togglePrint(force) {
  const on = typeof force === 'boolean' ? force : !document.body.classList.contains('lib-print');
  document.body.classList.toggle('lib-print', on);
  if (on) {
    document.getElementById('print-exit-wrap').hidden = false;
    window.scrollTo({top: 0, behavior: 'instant'});
  } else {
    document.getElementById('print-exit-wrap').hidden = true;
  }
}
document.getElementById('print-trigger').addEventListener('click', e => {
  e.preventDefault();
  togglePrint(true);
});

/* Insert the print exit bar once */
(() => {
  const bar = document.createElement('div');
  bar.id = 'print-exit-wrap';
  bar.innerHTML = `
    <button class="primary" id="print-do">Print / save PDF</button>
    <button id="print-exit">Exit print view</button>
  `;
  document.body.appendChild(bar);
  document.getElementById('print-do').onclick = () => window.print();
  document.getElementById('print-exit').onclick = () => togglePrint(false);
})();

/* Initial filter pass */
applyFilter();

/* Hide the search hint on small screens */
if (window.innerWidth < 720) document.getElementById('search-hint').style.display = 'none';
