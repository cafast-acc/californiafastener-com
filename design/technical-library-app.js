/* ─────────────────────────────────────────────────────────
   Spec Library — App logic
   Renders hero index, faceted filtering, layout switching,
   search, print, and tweaks.
   Expects window.LIB_SECTIONS, LIB_SPECS, LIB_INDUSTRIES, LIB_SERVICES.
   ───────────────────────────────────────────────────────── */
(function () {
  "use strict";

  const SECTIONS   = window.LIB_SECTIONS;
  const SPECS      = window.LIB_SPECS;
  const INDUSTRIES = window.LIB_INDUSTRIES;
  const SERVICES   = window.LIB_SERVICES;

  // Pull defaults from inline TWEAK_DEFAULTS block
  const DEFAULTS = window.TWEAK_DEFAULTS || { layout: "grid", density: "comfortable", tags: "on", hero: "on" };

  // ── State ───────────────────────────────────────────────
  const state = {
    layout:    DEFAULTS.layout    || "grid",
    density:   DEFAULTS.density   || "comfortable",
    tags:      DEFAULTS.tags      || "on",
    hero:      DEFAULTS.hero      || "on",
    query:     "",
    category:  null,        // section id or null = all
    industries: new Set(),
    services:   new Set(),
  };

  // ── DOM refs ─────────────────────────────────────────────
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const sectionsEl = $("#sections");
  const searchEl   = $("#lib-search");
  const countShown = $("#count-shown");
  const statsCtx   = $("#stats-context");
  const emptyEl    = $("#empty");
  const emptyQuery = $("#empty-query");

  // ── Rendering: hero index ────────────────────────────────
  function renderHeroIndex() {
    const el = $("#hero-index");
    if (!el) return;
    el.innerHTML = SECTIONS.map(sec => {
      const count = SPECS.filter(s => s.section === sec.id).length;
      return `<li>
        <a href="#specs" data-section-link="${sec.id}">
          <span class="idx-code">${sec.title.replace(/ Specifications?$| Reference$| Standards$| & Finishes$/, "")}</span>
          <span class="idx-tag">${count}</span>
        </a>
      </li>`;
    }).join("");
    el.addEventListener("click", (e) => {
      const a = e.target.closest("[data-section-link]");
      if (!a) return;
      state.category = a.dataset.sectionLink;
      applyFilter();
      renderFacets();
    });
  }

  // ── Rendering: sections ──────────────────────────────────
  function renderSections() {
    sectionsEl.innerHTML = SECTIONS.map(sec => {
      const specs = SPECS.filter(s => s.section === sec.id);
      return `
        <section class="lib-section" data-section="${sec.id}">
          <div class="lib-section-head">
            <div class="lib-section-num"><b>${sec.num}</b> · ${specs.length} specs</div>
            <div>
              <h2 class="lib-section-title">${sec.title}</h2>
              <p class="lib-section-sub">${sec.sub}</p>
            </div>
          </div>
          <div class="lib-grid is-${state.layout}">
            ${specs.map(sp => cardHtml(sp, sec.tag)).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  function cardHtml(sp, tag) {
    const searchBlob = (sp.code + " " + sp.title + " " + sp.grades.join(" ") +
      " " + (sp.industries || []).join(" ") + " " + (sp.services || []).join(" ")).toLowerCase();
    return `
      <a class="lib-card" href="spec.html?s=${sp.file}"
         data-spec="${sp.file}"
         data-section="${sp.section}"
         data-industries="${(sp.industries || []).join(",")}"
         data-services="${(sp.services || []).join(",")}"
         data-search="${searchBlob.replace(/"/g, "&quot;")}">
        <div class="lib-card-tag">${tag}</div>
        <div class="lib-card-code">${sp.code}</div>
        <div class="lib-card-title">${sp.title}</div>
        <div class="lib-card-grades">
          ${sp.grades.slice(0, 5).map(g => `<span class="lib-card-grade">${g}</span>`).join("")}
        </div>
        <svg class="lib-card-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 11l6-6M11 5v5H6"/></svg>
      </a>
    `;
  }

  // ── Rendering: facets ────────────────────────────────────
  function renderFacets() {
    const cat = $("#facet-category");
    if (cat) {
      const opts = [{ id: null, label: "All" }].concat(
        SECTIONS.map(s => ({ id: s.id, label: s.tag.charAt(0) + s.tag.slice(1).toLowerCase() + "s" }))
      );
      cat.innerHTML = opts.map(o => {
        const count = o.id === null ? SPECS.length : SPECS.filter(x => x.section === o.id).length;
        const active = (state.category === o.id);
        return `<button class="lib-chip ${active ? "is-active" : ""}" data-cat="${o.id === null ? "all" : o.id}">
          ${o.label} <span class="lib-chip-count">${count}</span>
        </button>`;
      }).join("");
    }

    const ind = $("#facet-industry");
    if (ind) {
      ind.innerHTML = INDUSTRIES.map(i => {
        const count = SPECS.filter(s => (s.industries || []).includes(i.id)).length;
        const active = state.industries.has(i.id);
        return `<button class="lib-chip ${active ? "is-active" : ""}" data-ind="${i.id}">
          ${i.label} <span class="lib-chip-count">${count}</span>
        </button>`;
      }).join("");
    }

    const svc = $("#facet-service");
    if (svc) {
      svc.innerHTML = SERVICES.map(s => {
        const count = SPECS.filter(sp => (sp.services || []).includes(s.id)).length;
        const active = state.services.has(s.id);
        return `<button class="lib-chip ${active ? "is-active" : ""}" data-svc="${s.id}">
          ${s.label} <span class="lib-chip-count">${count}</span>
        </button>`;
      }).join("");
    }

    // Refine count & clear button
    const refineCount = state.industries.size + state.services.size;
    const moreCount = $("#facet-more-count");
    if (moreCount) {
      moreCount.textContent = refineCount;
      moreCount.hidden = refineCount === 0;
    }
    const clearBtn = $("#facet-clear");
    if (clearBtn) {
      clearBtn.hidden = !(state.category || state.industries.size || state.services.size || state.query);
    }
  }

  // ── Filtering ───────────────────────────────────────────
  function applyFilter() {
    const q = state.query.trim().toLowerCase();
    let shown = 0;
    $$(".lib-section").forEach(sec => {
      const sid = sec.dataset.section;
      const matchSection = !state.category || state.category === sid;
      let sectionCount = 0;
      $$(".lib-card", sec).forEach(card => {
        const matchQ = !q || card.dataset.search.includes(q);
        const inds = (card.dataset.industries || "").split(",").filter(Boolean);
        const svcs = (card.dataset.services || "").split(",").filter(Boolean);
        const matchI = state.industries.size === 0 ||
          [...state.industries].every(i => inds.includes(i));
        const matchS = state.services.size === 0 ||
          [...state.services].every(s => svcs.includes(s));
        const visible = matchSection && matchQ && matchI && matchS;
        card.style.display = visible ? "" : "none";
        if (visible) { shown++; sectionCount++; }
      });
      sec.classList.toggle("is-hidden", sectionCount === 0);
    });
    if (countShown) countShown.textContent = shown;
    if (statsCtx) {
      const parts = [];
      if (state.category) {
        const sec = SECTIONS.find(s => s.id === state.category);
        if (sec) parts.push(sec.title);
      } else {
        parts.push("All categories");
      }
      if (state.query) parts.push(`search: “${state.query}”`);
      if (state.industries.size) parts.push(`${state.industries.size} industry`);
      if (state.services.size) parts.push(`${state.services.size} service`);
      statsCtx.textContent = parts.join(" · ");
    }
    if (emptyEl) {
      emptyEl.hidden = shown > 0;
      if (emptyQuery) emptyQuery.textContent = state.query ? `“${state.query}”` : "your filters";
    }
    renderFacets();
  }

  // ── Layout switching ────────────────────────────────────
  function applyLayout() {
    $$(".lib-grid").forEach(g => {
      g.classList.remove("is-editorial", "is-grid", "is-table");
      g.classList.add("is-" + state.layout);
    });
    $$(".lib-layout-switch button").forEach(b => {
      b.classList.toggle("is-active", b.dataset.layout === state.layout);
    });
    // Sync tweaks panel
    syncTweakButtons();
  }

  function applyDensityAndTags() {
    document.body.classList.toggle("lib-compact", state.density === "compact");
    document.body.classList.toggle("lib-no-tags", state.tags === "off");
    document.body.classList.toggle("lib-no-hero", state.hero === "off");
    syncTweakButtons();
  }

  function syncTweakButtons() {
    $$(".lib-tweaks [data-tweak]").forEach(group => {
      const key = group.dataset.tweak;
      $$("button", group).forEach(b => {
        b.classList.toggle("is-active", b.dataset.val === state[key]);
      });
    });
  }

  // ── Event bindings ──────────────────────────────────────
  function bind() {
    if (searchEl) {
      searchEl.addEventListener("input", (e) => {
        state.query = e.target.value;
        const hint = $("#search-hint");
        if (hint) hint.style.opacity = state.query ? "0" : "1";
        applyFilter();
      });
    }

    // Category chips
    const cat = $("#facet-category");
    if (cat) cat.addEventListener("click", e => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      state.category = b.dataset.cat === "all" ? null : b.dataset.cat;
      applyFilter();
    });

    const ind = $("#facet-industry");
    if (ind) ind.addEventListener("click", e => {
      const b = e.target.closest("[data-ind]");
      if (!b) return;
      const id = b.dataset.ind;
      if (state.industries.has(id)) state.industries.delete(id);
      else state.industries.add(id);
      applyFilter();
    });

    const svc = $("#facet-service");
    if (svc) svc.addEventListener("click", e => {
      const b = e.target.closest("[data-svc]");
      if (!b) return;
      const id = b.dataset.svc;
      if (state.services.has(id)) state.services.delete(id);
      else state.services.add(id);
      applyFilter();
    });

    // Refine toggle
    const more = $("#facet-more");
    const refine = $("#toolbar-refine");
    if (more && refine) {
      more.addEventListener("click", () => {
        const open = more.getAttribute("aria-expanded") === "true";
        more.setAttribute("aria-expanded", String(!open));
        refine.hidden = open;
      });
    }

    // Clear all
    const clearBtn = $("#facet-clear");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      state.category = null;
      state.industries.clear();
      state.services.clear();
      state.query = "";
      if (searchEl) searchEl.value = "";
      applyFilter();
    });

    // Empty-state clear
    const emptyClear = $("#empty-clear");
    if (emptyClear) emptyClear.addEventListener("click", () => {
      state.category = null;
      state.industries.clear();
      state.services.clear();
      state.query = "";
      if (searchEl) searchEl.value = "";
      applyFilter();
    });

    // Layout switch
    $$(".lib-layout-switch button").forEach(b => {
      b.addEventListener("click", () => {
        state.layout = b.dataset.layout;
        renderSections();       // re-render so class flows fresh
        applyLayout();
        applyFilter();
        persist({ layout: state.layout });
      });
    });

    // Starting-point cards scroll + preset filters
    $$(".lib-start").forEach(card => {
      card.addEventListener("click", () => {
        const start = card.dataset.start;
        state.category = null;
        state.industries.clear();
        state.services.clear();
        state.query = "";
        if (searchEl) searchEl.value = "";
        if (start === "service") {
          const refine = $("#toolbar-refine");
          const more = $("#facet-more");
          if (refine) refine.hidden = false;
          if (more) more.setAttribute("aria-expanded", "true");
        }
        applyFilter();
        $("#specs").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // Tweaks panel
    $$(".lib-tweaks [data-tweak]").forEach(group => {
      group.addEventListener("click", e => {
        const b = e.target.closest("button[data-val]");
        if (!b) return;
        const key = group.dataset.tweak;
        state[key] = b.dataset.val;
        if (key === "layout") {
          renderSections();
          applyLayout();
          applyFilter();
        } else if (key === "density" || key === "tags" || key === "hero") {
          applyDensityAndTags();
        }
        persist({ [key]: state[key] });
      });
    });

    // Keyboard
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement !== searchEl) {
        e.preventDefault();
        searchEl && searchEl.focus();
      } else if (e.key === "Escape" && document.activeElement === searchEl) {
        searchEl.blur();
        searchEl.value = "";
        state.query = "";
        applyFilter();
      } else if ((e.key === "p" || e.key === "P") && !e.metaKey && !e.ctrlKey &&
                 document.activeElement !== searchEl) {
        window.print();
      }
    });

    // Print trigger link
    const pt = $("#print-trigger");
    if (pt) pt.addEventListener("click", (e) => { e.preventDefault(); window.print(); });
  }

  function persist(patch) {
    try {
      window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
    } catch {}
  }

  // ── Edit-mode host protocol ──────────────────────────────
  function registerEditMode() {
    const panel = $("#tweaks");
    window.addEventListener("message", ev => {
      const d = ev.data || {};
      if (d.type === "__activate_edit_mode" && panel) panel.classList.add("is-visible");
      if (d.type === "__deactivate_edit_mode" && panel) panel.classList.remove("is-visible");
    });
    try {
      window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    } catch {}
  }

  // ── Init ────────────────────────────────────────────────
  function init() {
    renderHeroIndex();
    renderSections();
    renderFacets();
    applyLayout();
    applyDensityAndTags();
    applyFilter();
    bind();
    registerEditMode();
    if (window.innerWidth < 720) {
      const hint = $("#search-hint");
      if (hint) hint.style.display = "none";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
