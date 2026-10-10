(() => {
  document.documentElement.classList.add('js');
  const root = document.body.dataset.siteRoot || '';
  const themeButton = document.querySelector('[data-theme-toggle]');
  const themeKey = 'kit-theme';

  function setTheme(theme, save) {
    document.documentElement.dataset.theme = theme;
    if (themeButton) {
      themeButton.textContent = theme === 'dark' ? '☼' : '☾';
      themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      themeButton.title = themeButton.getAttribute('aria-label');
    }
    if (save) {
      try { localStorage.setItem(themeKey, theme); } catch (_) { /* Storage can be disabled. */ }
    }
  }

  let savedTheme = null;
  try { savedTheme = localStorage.getItem(themeKey); } catch (_) { /* Use system preference. */ }
  const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(initialTheme, false);
  if (themeButton) themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));

  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  function setMenu(open) {
    if (!menuButton || !mobileNav) return;
    mobileNav.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }
  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    mobileNav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  }

  const profileButton = document.querySelector('[data-profile-toggle]');
  if (profileButton) {
    profileButton.addEventListener('click', () => {
      const flipped = profileButton.classList.toggle('is-flipped');
      profileButton.setAttribute('aria-pressed', String(flipped));
      profileButton.setAttribute('aria-label', flipped ? 'Show profile photo' : 'Show a short introduction');
      const front = profileButton.querySelector('.profile-front');
      const back = profileButton.querySelector('.profile-back');
      if (front) front.setAttribute('aria-hidden', String(flipped));
      if (back) back.setAttribute('aria-hidden', String(!flipped));
    });
  }

  const searchLayer = document.querySelector('[data-search-layer]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchCategory = document.querySelector('[data-search-category]');
  const searchResults = document.querySelector('[data-search-results]');
  const searchHint = document.querySelector('[data-search-hint]');
  let searchIndexPromise;
  let lastSearchTrigger;

  async function getSearchIndex() {
    if (!searchIndexPromise) {
      searchIndexPromise = fetch(root + 'data/search-index.json')
        .then(response => { if (!response.ok) throw new Error('Search index is unavailable'); return response.json(); });
    }
    return searchIndexPromise;
  }

  function closeSearch() {
    if (!searchLayer) return;
    searchLayer.classList.remove('is-open');
    searchLayer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastSearchTrigger) lastSearchTrigger.focus();
  }

  async function updateSearch(query) {
    if (!searchResults || !searchHint) return;
    const term = query.trim().toLocaleLowerCase();
    searchResults.replaceChildren();
    if (!term) {
      searchHint.textContent = 'Search projects, learning paths, resources, articles and opportunities.';
      return;
    }
    try {
      const items = await getSearchIndex();
      const selectedCategory = searchCategory ? searchCategory.value : 'all';
      const matches = items.filter(item => {
        const type = item.catalogType || 'static';
        const categoryMatch = selectedCategory === 'all' || type === selectedCategory || (selectedCategory === 'page' && type === 'static');
        return categoryMatch && (item.title + ' ' + item.description + ' ' + (item.tags || []).join(' ')).toLocaleLowerCase().includes(term);
      }).slice(0, 12);
      searchHint.textContent = matches.length ? matches.length + (matches.length === 12 ? '+' : '') + ' matching results' : 'No results yet. Try a broader search.';
      matches.forEach(item => {
        const link = document.createElement('a');
        link.className = 'search-result';
        link.href = root + item.url;
        const title = document.createElement('strong');
        title.textContent = item.title;
        const summary = document.createElement('span');
        summary.textContent = item.category + ' · ' + item.description;
        link.append(title, summary);
        searchResults.append(link);
      });
    } catch (_) {
      searchHint.textContent = 'Search needs the site to be served over HTTP. Open this project with a local web server.';
    }
  }

  document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', () => {
    if (!searchLayer) return;
    lastSearchTrigger = button;
    searchLayer.classList.add('is-open');
    searchLayer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    searchInput.value = '';
    updateSearch('');
    searchInput.focus();
  }));
  if (searchInput) searchInput.addEventListener('input', () => updateSearch(searchInput.value));
  if (searchCategory) searchCategory.addEventListener('change', () => updateSearch(searchInput ? searchInput.value : ''));
  if (searchLayer) {
    searchLayer.addEventListener('click', event => { if (event.target === searchLayer || event.target.closest('[data-search-close]')) closeSearch(); });
    searchLayer.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...searchLayer.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), a[href]')];
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && searchLayer.classList.contains('is-open')) closeSearch(); });
  }

  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });

  const normalize = value => String(value || '').trim().toLocaleLowerCase().replaceAll('_', '-');
  const trackerKey = 'kit-opportunity-tracker-v1';
  const opportunityDataPromise = fetch(root + 'data/opportunities.json')
    .then(response => { if (!response.ok) throw new Error('Opportunity data is unavailable'); return response.json(); });

  function readTracker() {
    try {
      const value = JSON.parse(localStorage.getItem(trackerKey) || '{}');
      return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    } catch (_) { return {}; }
  }

  function writeTracker(items) {
    try {
      localStorage.setItem(trackerKey, JSON.stringify(items));
      return true;
    } catch (_) { return false; }
  }

  function deadlineDate(raw) {
    if (!raw) return null;
    // Date-only South African listings stay open through the local calendar day.
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return new Date(raw + 'T23:59:59+02:00');
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function refreshDeadlines(scope) {
    const now = Date.now();
    scope.querySelectorAll('[data-directory-card][data-deadline]').forEach(card => {
      const due = deadlineDate(card.dataset.deadline);
      if (!due) return;
      const remaining = due.getTime() - now;
      card.dataset.closingSoon = String(remaining >= 0 && remaining <= 7 * 24 * 60 * 60 * 1000);
      card.dataset.effectiveStatus = remaining < 0 ? 'expired' : (remaining <= 7 * 24 * 60 * 60 * 1000 ? 'closing-soon' : (card.dataset.status || 'open'));
      const label = card.querySelector('[data-status-label]');
      if (label && !card.dataset.baseStatusLabel) card.dataset.baseStatusLabel = label.textContent;
      if (remaining < 0) {
        if (label) label.textContent = card.dataset.hideExpired === 'true' ? 'Expired · archived' : 'Closed · deadline passed';
        if (card.dataset.hideExpired === 'true') {
          const archive = scope.querySelector('[data-archive-grid]');
          if (archive && card.parentElement !== archive) archive.append(card);
        }
      } else if (label) {
        label.textContent = card.dataset.closingSoon === 'true' ? 'Closing soon · ' + card.dataset.baseStatusLabel : card.dataset.baseStatusLabel;
      }
    });
    const archive = scope.querySelector('[data-archive-grid]');
    const archiveEmpty = scope.querySelector('[data-archive-empty]');
    if (archive && archiveEmpty) archiveEmpty.hidden = archive.children.length > 0;
  }

  function valueMatches(card, field, wanted) {
    if (!wanted || wanted === 'all') return true;
    const dataKey = field.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = normalize(card.dataset[dataKey] || '');
    const target = normalize(wanted);
    if (field === 'topics' || field === 'categories') return value.split(',').map(normalize).includes(target);
    if (field === 'status') {
      const current = normalize(card.dataset.effectiveStatus || value);
      return current === target || (target === 'open' && current === 'closing-soon');
    }
    if (field === 'country') {
      if (target === 'south-africa') return value.includes('south africa') || card.dataset.saEligible === 'true';
      if (target === 'global') return value.includes('worldwide') || value.includes('global') || value.includes('varies');
    }
    if (field === 'format') return value.includes(target.replaceAll('-', ' '));
    if (field === 'funding') {
      if (target === 'free') return value.includes('free') || value.includes('tuition-free');
      if (target === 'fully funded') return value.includes('fully funded');
      if (target === 'paid') return value.includes('paid');
      if (target === 'stipend') return value.includes('stipend');
    }
    if (field === 'eligibility') return target === 'global' ? card.dataset.globalEligible === 'true' : card.dataset.saEligible === 'true';
    if (field === 'prize-type') {
      if (target === 'cash') return value === 'cash' || value === 'cash-and-non-cash';
      if (target === 'non-cash') return value.includes('non-cash');
    }
    if (field === 'student') return target === 'eligible' ? card.dataset.studentEligible === 'true' : card.dataset.studentEligible === target;
    if (field === 'event-state' && target === 'closing-soon') return card.dataset.closingSoon === 'true';
    if (field === 'duration') {
      const hours = Number(card.dataset.durationHours);
      if (target === 'unknown') return !Number.isFinite(hours);
      if (!Number.isFinite(hours)) return false;
      if (target === 'under-2') return hours < 2;
      if (target === '2-6') return hours >= 2 && hours <= 6;
      if (target === 'over-6') return hours > 6;
    }
    if (field === 'certificate') {
      const certificate = normalize(card.dataset.certificate);
      if (target === 'free') return certificate === 'free';
      if (target === 'paid') return certificate === 'paid';
      if (target === 'not-offered') return certificate === 'not-offered';
      if (target === 'varies') return certificate === 'varies';
    }
    return value === target || value.includes(target);
  }

  function sortCards(grid, cards, sortBy) {
    const levelRank = { beginner: 0, 'beginner-friendly': 0, 'all-levels': 1, intermediate: 2, advanced: 3 };
    const ordered = [...cards].sort((left, right) => {
      if (sortBy === 'alphabetical') return left.querySelector('h2').textContent.localeCompare(right.querySelector('h2').textContent);
      if (sortBy === 'duration') {
        const a = Number(left.dataset.durationHours), b = Number(right.dataset.durationHours);
        return (Number.isFinite(a) ? a : Number.MAX_SAFE_INTEGER) - (Number.isFinite(b) ? b : Number.MAX_SAFE_INTEGER);
      }
      if (sortBy === 'beginner') return (levelRank[normalize(left.dataset.level)] ?? 9) - (levelRank[normalize(right.dataset.level)] ?? 9);
      return 0;
    });
    ordered.forEach(card => grid.append(card));
  }

  document.querySelectorAll('[data-filter-scope]').forEach(scope => {
    const input = scope.querySelector('[data-local-search]');
    const count = scope.querySelector('[data-result-count]');
    const empty = scope.querySelector('[data-filter-empty]');
    const grid = scope.querySelector('[data-directory-grid]');
    const sort = scope.querySelector('[data-sort-by]');
    const selectFilters = [...scope.querySelectorAll('[data-filter-field]')];
    const chips = [...scope.querySelectorAll('[data-chip-field]')];
    const chipState = {};
    chips.forEach(button => { chipState[button.dataset.chipField] = chipState[button.dataset.chipField] || 'all'; });

    function applyFilter() {
      refreshDeadlines(scope);
      const term = normalize(input ? input.value : '');
      const selects = Object.fromEntries(selectFilters.map(select => [select.dataset.filterField, select.value]));
      const allCards = [...scope.querySelectorAll('[data-directory-card]')];
      if (sort && grid) sortCards(grid, allCards.filter(card => !card.closest('[data-archive-grid]')), sort.value);
      let matches = 0;
      let activeMatches = 0;
      allCards.forEach(card => {
        const termsMatch = !term || normalize(card.textContent).includes(term) || normalize(card.dataset.topics).includes(term) || normalize(card.dataset.categories).includes(term);
        const selectMatch = Object.entries(selects).every(([field, value]) => valueMatches(card, field, value));
        const chipMatch = Object.entries(chipState).every(([field, value]) => valueMatches(card, field, value));
        const show = termsMatch && selectMatch && chipMatch;
        card.hidden = !show;
        if (show) {
          matches += 1;
          if (!card.closest('[data-archive-grid]')) activeMatches += 1;
        }
      });
      if (count) count.textContent = matches + (matches === 1 ? ' matching listing' : ' matching listings') + (scope.dataset.directoryKind === 'events' ? ' · ' + activeMatches + ' active' : '');
      if (empty) empty.hidden = activeMatches > 0;
    }

    chips.forEach(button => button.addEventListener('click', () => {
      const field = button.dataset.chipField;
      const next = button.dataset.chipValue === 'all' ? 'all' : (chipState[field] === button.dataset.chipValue ? 'all' : button.dataset.chipValue);
      chipState[field] = next;
      chips.filter(item => item.dataset.chipField === field).forEach(item => item.setAttribute('aria-pressed', String(item.dataset.chipValue === next)));
      applyFilter();
    }));
    selectFilters.forEach(select => select.addEventListener('change', applyFilter));
    if (input) input.addEventListener('input', applyFilter);
    if (sort) sort.addEventListener('change', applyFilter);
    const reset = scope.querySelector('[data-filter-reset]');
    if (reset) reset.addEventListener('click', () => {
      if (input) input.value = '';
      selectFilters.forEach(select => { select.value = 'all'; });
      Object.keys(chipState).forEach(field => { chipState[field] = 'all'; });
      chips.forEach(item => item.setAttribute('aria-pressed', String(item.dataset.chipValue === 'all')));
      if (sort) sort.value = 'beginner';
      applyFilter();
    });

    const requestedCategory = new URLSearchParams(location.search).get('category');
    if (requestedCategory && scope.dataset.directoryKind === 'opportunities') {
      chipState.categories = requestedCategory;
      chips.filter(item => item.dataset.chipField === 'categories').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.chipValue === requestedCategory)));
    }
    applyFilter();
    if (scope.dataset.directoryKind === 'events') window.setInterval(applyFilter, 60 * 1000);
  });

  // Saving is opt-in; all progress remains in this browser and never leaves the device.
  function syncSaveButtons() {
    const saved = readTracker();
    document.querySelectorAll('[data-save-opportunity]').forEach(button => {
      const isSaved = Boolean(saved[button.dataset.saveOpportunity]);
      button.textContent = isSaved ? 'Remove from tracker' : 'Save to tracker';
      button.setAttribute('aria-pressed', String(isSaved));
    });
  }

  function makeElement(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined && text !== null) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  async function renderTracker() {
    const host = document.querySelector('[data-opportunity-tracker]');
    if (!host) return;
    const list = host.querySelector('[data-tracker-list]');
    const empty = host.querySelector('[data-tracker-empty]');
    const status = host.querySelector('[data-tracker-status]');
    if (!list) return;
    try {
      const [items, saved] = await Promise.all([opportunityDataPromise, Promise.resolve(readTracker())]);
      const records = items.filter(item => saved[item.id]);
      list.replaceChildren();
      records.forEach(item => {
        const state = saved[item.id];
        const card = makeElement('article', undefined, 'card tracker-card');
        card.id = 'tracker-' + item.id;
        card.append(makeElement('span', item.provider + ' · ' + item.checkedAt, 'card-label'));
        card.append(makeElement('h3', item.title));
        card.append(makeElement('p', item.description));
        const link = makeElement('a', 'Open official source ↗', 'text-link');
        link.href = item.applicationUrl || item.sourceUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        card.append(link);
        const label = makeElement('label', 'Application status');
        const select = document.createElement('select');
        select.className = 'search-input';
        select.setAttribute('aria-label', 'Application status for ' + item.title);
        ['Saved', 'Planning', 'Applied', 'Interview', 'Closed'].forEach(optionValue => {
          const option = makeElement('option', optionValue);
          option.value = optionValue.toLocaleLowerCase();
          option.selected = option.value === state.status;
          select.append(option);
        });
        label.append(select);
        card.append(label);
        const noteLabel = makeElement('label', 'Private next step or note');
        const note = document.createElement('textarea');
        note.className = 'search-input tracker-note';
        note.rows = 2;
        note.maxLength = 500;
        note.value = state.note || '';
        note.setAttribute('aria-label', 'Private next step for ' + item.title);
        note.placeholder = 'Example: tailor CV, request transcript, check deadline';
        noteLabel.append(note);
        card.append(noteLabel);
        const remove = makeElement('button', 'Remove from tracker', 'filter-button');
        remove.type = 'button';
        remove.addEventListener('click', () => {
          const current = readTracker();
          delete current[item.id];
          writeTracker(current);
          syncSaveButtons();
          renderTracker();
        });
        card.append(remove);
        const saveState = () => {
          const current = readTracker();
          if (!current[item.id]) return;
          current[item.id].status = select.value;
          current[item.id].note = note.value;
          current[item.id].updatedAt = new Date().toISOString();
          const savedOkay = writeTracker(current);
          if (status) status.textContent = savedOkay ? 'Your tracker is saved in this browser.' : 'Browser storage is unavailable; changes may not persist.';
        };
        select.addEventListener('change', saveState);
        note.addEventListener('change', saveState);
        note.addEventListener('blur', saveState);
        list.append(card);
      });
      if (empty) empty.hidden = records.length > 0;
      if (status) status.textContent = records.length ? records.length + ' saved ' + (records.length === 1 ? 'listing' : 'listings') + ' · stored only in this browser.' : 'Saved listings stay in this browser only.';
    } catch (_) {
      if (status) status.textContent = 'The opportunity list could not load. Try serving KIT over HTTP.';
    }
  }

  document.addEventListener('click', async event => {
    const saveButton = event.target.closest('[data-save-opportunity]');
    if (saveButton) {
      const id = saveButton.dataset.saveOpportunity;
      const saved = readTracker();
      if (saved[id]) delete saved[id];
      else saved[id] = { status: 'saved', note: '', savedAt: new Date().toISOString() };
      const okay = writeTracker(saved);
      syncSaveButtons();
      await renderTracker();
      if (!okay) saveButton.textContent = 'Browser storage unavailable';
      return;
    }

    if (event.target.closest('[data-clear-tracker]')) {
      writeTracker({});
      syncSaveButtons();
      await renderTracker();
      const status = document.querySelector('[data-tracker-status]');
      if (status) status.textContent = 'Tracker cleared from this browser.';
      return;
    }

    const reportButton = event.target.closest('[data-report-link]');
    if (reportButton) {
      const status = reportButton.parentElement.querySelector('[data-report-status]');
      try {
        const items = await opportunityDataPromise;
        const item = items.find(row => row.id === reportButton.dataset.reportLink);
        if (!item) throw new Error('Listing not found');
        const message = 'Please review this KIT listing: ' + item.title + ' — ' + (item.applicationUrl || item.sourceUrl) + ' (last checked ' + item.checkedAt + ').';
        await navigator.clipboard.writeText(message);
        if (status) status.textContent = 'Report details copied. Send them to KIT through LinkedIn or GitHub.';
      } catch (_) {
        if (status) status.textContent = 'Copy this listing title and URL, then send them to KIT through LinkedIn or GitHub.';
      }
    }
  });

  window.addEventListener('storage', event => {
    if (event.key === trackerKey) { syncSaveButtons(); renderTracker(); }
  });
  syncSaveButtons();
  renderTracker();
})();
