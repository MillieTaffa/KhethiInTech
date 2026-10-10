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
      const matches = items.filter(item => (item.title + ' ' + item.description + ' ' + (item.tags || []).join(' ')).toLocaleLowerCase().includes(term)).slice(0, 12);
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
  if (searchLayer) {
    searchLayer.addEventListener('click', event => { if (event.target === searchLayer || event.target.closest('[data-search-close]')) closeSearch(); });
    searchLayer.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const controls = [...searchLayer.querySelectorAll('input:not([disabled]), button:not([disabled]), a[href]')];
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && searchLayer.classList.contains('is-open')) closeSearch(); });
  }

  document.querySelectorAll('[data-current-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });

  document.querySelectorAll('[data-filter-scope]').forEach(scope => {
    const cards = [...scope.querySelectorAll('[data-category]')];
    const buttons = [...scope.querySelectorAll('[data-filter]')];
    const input = scope.querySelector('[data-local-search]');
    const count = scope.querySelector('[data-result-count]');
    const empty = scope.querySelector('[data-filter-empty]');
    let activeCategory = 'all';
    function applyFilter() {
      const term = input ? input.value.trim().toLocaleLowerCase() : '';
      let visible = 0;
      cards.forEach(card => {
        const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
        const textMatch = !term || card.textContent.toLocaleLowerCase().includes(term);
        const show = categoryMatch && textMatch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (count) count.textContent = visible + (visible === 1 ? ' item' : ' items');
      if (empty) empty.hidden = visible > 0;
    }
    buttons.forEach(button => button.addEventListener('click', () => {
      activeCategory = button.dataset.filter;
      buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      applyFilter();
    }));
    if (input) input.addEventListener('input', applyFilter);
    applyFilter();
  });
})();
