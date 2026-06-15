(function () {
  const CONFIG = {
    tmdbKey: '699d7b46f7b6d812de457844f9972856',
  };

  const TMDB_BASE = 'https://api.themoviedb.org/3';
  const IMG_BASE = 'https://image.tmdb.org/t/p/w342';
  const BG_BASE = 'https://image.tmdb.org/t/p/w500';

  const genreMap = new Map([
    [28, 'Action'], [12, 'Adventure'], [16, 'Animation'], [35, 'Comedy'],
    [80, 'Crime'], [99, 'Documentary'], [18, 'Drama'], [14, 'Fantasy'],
    [27, 'Horror'], [10749, 'Romance'], [878, 'Sci-Fi'], [53, 'Thriller'],
    [10751, 'Family'], [10402, 'Music'], [9648, 'Mystery'], [10752, 'War'],
    [37, 'Western'], [36, 'History']
  ]);

  const genreCards = [
    { name: 'Action', id: 28, poster: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { name: 'Comedy', id: 35, poster: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
    { name: 'Thriller', id: 53, poster: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
    { name: 'Horror', id: 27, poster: '/rS97hUJ1otKTTripGwQ0ujbuIri.jpg' },
    { name: 'Adventure', id: 12, poster: '/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg' },
    { name: 'Sci-Fi', id: 878, poster: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' },
    { name: 'Romance', id: 10749, poster: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg' },
    { name: 'Drama', id: 18, poster: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
    { name: 'Mystery', id: 9648, poster: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
    { name: 'Animation', id: 16, poster: '/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg' },
    { name: 'Crime', id: 80, poster: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
    { name: 'Fantasy', id: 14, poster: '/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg' },
    { name: 'Family', id: 10751, poster: '/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg' },
    { name: 'Documentary', id: 99, poster: '/uUiIGztTrfDhPdAFJpr6m4UBMAd.jpg' },
    { name: 'War', id: 10752, poster: '/b4Oe15CGLL61Ped0RAS9JpqdmCt.jpg' },
    { name: 'Western', id: 37, poster: '/2o94tPI9vq8U4UUQ4nJ0ixq744C.jpg' },
    { name: 'Music', id: 10402, poster: '/5lhCMZ1ccIIzylCgCYU216bbCcS.jpg' },
    { name: 'History', id: 36, poster: '/8Gxv2wS6mext5u46aBFn67xd708.jpg' },
  ];

  const moodCards = [
    { name: 'Happy', icon: '😄', color: '#ffc400', genres: '35,16,10751', sort: 'popularity.desc' },
    { name: 'Sad', icon: '😢', color: '#3b82f6', genres: '18,10749', sort: 'vote_average.desc' },
    { name: 'Relaxed', icon: '😌', color: '#10b981', genres: '16,35,10751', sort: 'popularity.desc' },
    { name: 'Excited', icon: '🤩', color: '#a855f7', genres: '28,12,878', sort: 'popularity.desc' },
    { name: 'Anxious', icon: '😰', color: '#c084fc', genres: '53,9648,27', sort: 'popularity.desc' },
    { name: 'Romantic', icon: '🥰', color: '#ec4899', genres: '10749,18', sort: 'popularity.desc' },
    { name: 'Thoughtful', icon: '🤔', color: '#818cf8', genres: '18,878,99', sort: 'vote_average.desc' },
    { name: 'Energetic', icon: '⚡', color: '#f97316', genres: '28,12,35', sort: 'popularity.desc' },
    { name: 'Melancholic', icon: '🍂', color: '#94a3b8', genres: '18,9648', sort: 'vote_average.desc' },
    { name: 'Peaceful', icon: '🕊️', color: '#14b8a6', genres: '16,10751,99', sort: 'vote_average.desc' },
  ];

  const ratingGenres = [
    { name: 'Action', id: 28 },
    { name: 'Comedy', id: 35 },
    { name: 'Thriller', id: 53 },
    { name: 'Horror', id: 27 },
    { name: 'Adventure', id: 12 },
    { name: 'Sci-Fi', id: 878 },
    { name: 'Drama', id: 18 },
    { name: 'Romance', id: 10749 },
  ];

  const fallbackBackdropMovies = [
    { title: 'Iron Man', poster_path: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg' },
    { title: 'The Avengers', poster_path: '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg' },
    { title: 'Avengers: Infinity War', poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
    { title: 'Avengers: Endgame', poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg' },
    { title: 'Guardians of the Galaxy', poster_path: '/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg' },
    { title: 'Black Panther', poster_path: '/uxzzxijgPIY7slzFvMotPv8wjKA.jpg' },
    { title: 'Spider-Man: No Way Home', poster_path: '/5weKu49pzJCt06OPpjvT80efnQj.jpg' },
    { title: 'Doctor Strange', poster_path: '/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg' },
    { title: 'The Dark Knight', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { title: 'Interstellar', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
    { title: 'Inception', poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
    { title: 'The Matrix', poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
    { title: 'Dune', poster_path: '/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' },
    { title: 'Pulp Fiction', poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg' },
    { title: 'Fight Club', poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg' },
    { title: 'The Godfather', poster_path: '/3bhkrj58Vtu7enYsRolD1fZdja1.jpg' },
    { title: 'The Shawshank Redemption', poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
    { title: 'Forrest Gump', poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg' },
  ];

  const views = document.querySelectorAll('.app-view');
  const navButtons = document.querySelectorAll('[data-view]');
  const searchForm = document.getElementById('searchForm');
  const queryEl = document.getElementById('query');
  const searchSuggestions = document.getElementById('searchSuggestions');
  const resultsEl = document.getElementById('results');
  const historyList = document.getElementById('historyList');
  const toWatchList = document.getElementById('toWatchList');
  const genreGrid = document.getElementById('genreGrid');
  const genreResults = document.getElementById('genreResults');
  const genreResultTitle = document.getElementById('genreResultTitle');
  const moodGrid = document.getElementById('moodGrid');
  const moodResults = document.getElementById('moodResults');
  const moodResultTitle = document.getElementById('moodResultTitle');
  const ratingTabs = document.getElementById('ratingTabs');
  const ratingResults = document.getElementById('ratingResults');
  const personalizedResults = document.getElementById('personalizedResults');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');
  const clearToWatchBtn = document.getElementById('clearToWatchBtn');
  const clearResultsBtn = document.getElementById('clearResultsBtn');
  const refreshPersonalizedBtn = document.getElementById('refreshPersonalizedBtn');
  const movieBackdrop = document.getElementById('movieBackdrop');
  
  // Binge, Gems, and Trophy Selectors
  const bingeSummary = document.getElementById('bingeSummary');
  const bingeList = document.getElementById('bingeList');
  const clearBingeBtn = document.getElementById('clearBingeBtn');
  const refreshHiddenBtn = document.getElementById('refreshHiddenBtn');
  const hiddenResults = document.getElementById('hiddenResults');
  const trophyBtn = document.getElementById('trophyBtn');
  const trophyDropdown = document.getElementById('trophyDropdown');

  let history = loadJSON('watchHistory') || migrateOldWatchlist();
  let toWatch = loadJSON('toWatch') || [];
  let bingeListArray = loadJSON('bingeList') || [];
  let suggestionTimer = null;
  let latestSuggestionQuery = '';

  navButtons.forEach((button) => {
    button.addEventListener('click', () => showView(button.dataset.view));
  });

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = queryEl.value.trim();
    if (!query) return;
    await searchTitles(query);
  });

  queryEl.addEventListener('input', () => {
    const query = queryEl.value.trim();
    clearTimeout(suggestionTimer);

    if (query.length < 2) {
      hideSuggestions();
      return;
    }

    suggestionTimer = setTimeout(() => loadSuggestions(query), 260);
  });

  document.addEventListener('click', (event) => {
    if (!searchForm.contains(event.target)) hideSuggestions();
    
    // Auto-close trophy dropdown when clicking outside
    if (trophyDropdown && !trophyDropdown.contains(event.target) && event.target !== trophyBtn) {
      trophyDropdown.classList.remove('show');
    }
  });

  clearResultsBtn.addEventListener('click', () => {
    resultsEl.innerHTML = '<div class="empty-state">Search for something you want to watch.</div>';
  });

  clearHistoryBtn.addEventListener('click', () => {
    if (!history.length || !confirm('Clear your watch history?')) return;
    history = [];
    saveAll();
    renderHistory();
    renderPersonalized();
  });

  clearToWatchBtn.addEventListener('click', () => {
    if (!toWatch.length || !confirm('Clear your To Watch list?')) return;
    toWatch = [];
    saveAll();
    renderToWatch();
  });

  clearBingeBtn.addEventListener('click', () => {
    if (!bingeListArray.length || !confirm('Clear your Binge Calculator?')) return;
    bingeListArray = [];
    saveAll();
    renderBinge();
  });

  refreshPersonalizedBtn.addEventListener('click', renderPersonalized);
  
  refreshHiddenBtn.addEventListener('click', loadHiddenGems);

  trophyBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    trophyDropdown.classList.toggle('show');
  });

  async function tmdb(endpoint, params = {}) {
    const url = new URL(TMDB_BASE + endpoint);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    });
    url.searchParams.set('api_key', CONFIG.tmdbKey);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`TMDB request failed: ${response.status}`);
    return response.json();
  }

  function showView(viewName) {
    views.forEach((view) => view.classList.toggle('active-view', view.id === `view-${viewName}`));
    navButtons.forEach((button) => button.classList.toggle('active', button.dataset.view === viewName));
    hideSuggestions();

    if (viewName === 'genre' && !genreGrid.childElementCount) renderGenreGrid();
    if (viewName === 'mood' && !moodGrid.childElementCount) renderMoodGrid();
    if (viewName === 'ratings' && !ratingTabs.childElementCount) renderRatingTabs();
    if (viewName === 'personalized') renderPersonalized();
    if (viewName === 'hidden' && hiddenResults.querySelector('.empty-state')) loadHiddenGems();
    if (viewName === 'binge') renderBinge();
  }

  function saveAll() {
    saveJSON('watchHistory', history);
    saveJSON('toWatch', toWatch);
    saveJSON('bingeList', bingeListArray);
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function loadJSON(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return null;
    }
  }

  function migrateOldWatchlist() {
    const old = loadJSON('watchlist') || [];
    return old.map((item) => ({ ...item, status: 'Watched', media_type: item.media_type || 'movie' }));
  }

  function normalizeTitle(item) {
    return {
      ...item,
      title: item.title || item.name,
      release_date: item.release_date || item.first_air_date,
      media_type: item.media_type || (item.first_air_date ? 'tv' : 'movie'),
      genre_names: (item.genre_names || item.genre_ids || [])
        .map((value) => typeof value === 'number' ? genreMap.get(value) : value)
        .filter(Boolean),
    };
  }

  function posterUrl(path) {
    return path ? IMG_BASE + path : '';
  }

  function releaseYear(item) {
    return item.release_date ? item.release_date.slice(0, 4) : 'TBA';
  }

  async function searchTitles(query) {
    resultsEl.innerHTML = '<div class="empty-state">Searching...</div>';
    try {
      const data = await tmdb('/search/multi', {
        query,
        language: 'en-US',
        include_adult: 'false',
      });
      const titles = (data.results || [])
        .filter((item) => ['movie', 'tv'].includes(item.media_type) && item.poster_path)
        .map(normalizeTitle);
      renderMovieList(resultsEl, titles, {
        empty: 'No matching movies or series found.',
        isDiscover: true,
      });
    } catch (error) {
      console.error(error);
      resultsEl.innerHTML = '<div class="warn">Search failed. Please check the API key or connection.</div>';
    }
  }

  async function loadSuggestions(query) {
    latestSuggestionQuery = query;
    searchSuggestions.innerHTML = '<div class="suggestion-status">Searching...</div>';
    searchSuggestions.classList.add('show');

    try {
      const data = await tmdb('/search/multi', {
        query,
        language: 'en-US',
        include_adult: 'false',
      });

      if (latestSuggestionQuery !== query) return;
      const titles = (data.results || [])
        .filter((item) => ['movie', 'tv'].includes(item.media_type) && item.poster_path)
        .map(normalizeTitle)
        .slice(0, 7);
      renderSuggestions(titles);
    } catch (error) {
      console.error(error);
      searchSuggestions.innerHTML = '<div class="suggestion-status">Could not load suggestions.</div>';
    }
  }

  function renderSuggestions(titles) {
    searchSuggestions.innerHTML = '';
    if (!titles.length) {
      searchSuggestions.innerHTML = '<div class="suggestion-status">No matches found.</div>';
      return;
    }

    titles.forEach((item) => {
      const option = document.createElement('button');
      option.className = 'suggestion-option';
      option.type = 'button';
      option.innerHTML = `
        <img src="${posterUrl(item.poster_path)}" alt="">
        <span>
          <strong>${item.title}</strong>
          <small>${item.media_type === 'tv' ? 'Series' : 'Movie'} | ${releaseYear(item)}${item.vote_average ? ` | ${Number(item.vote_average).toFixed(1)}` : ''}</small>
        </span>
      `;
      option.addEventListener('click', () => {
        addToWatch(item);
        queryEl.value = '';
        hideSuggestions();
        showView('explore');
      });
      searchSuggestions.appendChild(option);
    });
  }

  function hideSuggestions() {
    searchSuggestions.classList.remove('show');
    searchSuggestions.innerHTML = '';
  }

  function addToWatch(item) {
    const title = normalizeTitle(item);
    if (toWatch.some((saved) => saved.id === title.id && saved.media_type === title.media_type)) {
      alert('Already in To Watch.');
      return;
    }
    if (history.some((saved) => saved.id === title.id && saved.media_type === title.media_type)) {
      alert('Already in History.');
      return;
    }

    toWatch.unshift({ ...title, status: 'To Watch', addedAt: Date.now() });
    saveAll();
    renderToWatch();
  }

  function markWatched(item) {
    const title = normalizeTitle(item);
    toWatch = toWatch.filter((saved) => !(saved.id === title.id && saved.media_type === title.media_type));
    if (!history.some((saved) => saved.id === title.id && saved.media_type === title.media_type)) {
      history.unshift({ ...title, status: 'Watched', watchedAt: Date.now() });
    }
    saveAll();
    renderToWatch();
    renderHistory();
  }

  function removeFrom(listName, item) {
    const list = listName === 'history' ? history : toWatch;
    const next = list.filter((saved) => !(saved.id === item.id && saved.media_type === item.media_type));
    if (listName === 'history') history = next;
    if (listName === 'toWatch') toWatch = next;
    saveAll();
    renderHistory();
    renderToWatch();
  }

  function renderHistory() {
    renderMovieList(historyList, history, {
      empty: 'Your history is empty. Move titles from To Watch after you finish them.',
      primaryAction: 'Remove',
      onPrimary: (item) => removeFrom('history', item),
    });
    if (typeof updateTrophies === 'function') updateTrophies();
  }

  function renderToWatch() {
    renderMovieList(toWatchList, toWatch, {
      empty: 'Your To Watch list is empty.',
      primaryAction: 'Watched',
      onPrimary: markWatched,
      secondaryAction: 'Remove',
      onSecondary: (item) => removeFrom('toWatch', item),
    });
  }

  async function addToBinge(item) {
    const title = normalizeTitle(item);
    if (bingeListArray.some((x) => x.id === title.id && x.media_type === title.media_type)) {
      return;
    }

    const tempItem = {
      ...title,
      runtime: null,
      episode_run_time: null,
      number_of_episodes: null,
      loading: true,
    };
    bingeListArray.push(tempItem);
    saveAll();
    renderBinge();

    try {
      const details = await tmdb(`/${title.media_type}/${title.id}`);
      const index = bingeListArray.findIndex((x) => x.id === title.id && x.media_type === title.media_type);
      if (index !== -1) {
        bingeListArray[index].loading = false;
        if (title.media_type === 'movie') {
          bingeListArray[index].runtime = details.runtime || 120;
        } else {
          bingeListArray[index].number_of_episodes = details.number_of_episodes || 10;
          bingeListArray[index].episode_run_time = (details.episode_run_time && details.episode_run_time.length)
            ? details.episode_run_time[0]
            : 45;
        }
        saveAll();
        renderBinge();
      }
    } catch (e) {
      console.error('Binge fetch details error:', e);
      const index = bingeListArray.findIndex((x) => x.id === title.id && x.media_type === title.media_type);
      if (index !== -1) {
        bingeListArray[index].loading = false;
        if (title.media_type === 'movie') {
          bingeListArray[index].runtime = 120;
        } else {
          bingeListArray[index].number_of_episodes = 10;
          bingeListArray[index].episode_run_time = 45;
        }
        saveAll();
        renderBinge();
      }
    }
  }

  function toggleBinge(item) {
    const index = bingeListArray.findIndex((x) => x.id === item.id && x.media_type === item.media_type);
    if (index !== -1) {
      bingeListArray.splice(index, 1);
      saveAll();
      renderBinge();
    } else {
      addToBinge(item);
    }
  }

  function createMovieActions(item) {
    const actions = document.createElement('div');
    actions.className = 'movie-actions';

    const inWatchlist = toWatch.some((x) => x.id === item.id && x.media_type === item.media_type);
    const inHistory = history.some((x) => x.id === item.id && x.media_type === item.media_type);
    const inBinge = bingeListArray.some((x) => x.id === item.id && x.media_type === item.media_type);

    // 1. To Watch Button
    const watchBtn = document.createElement('button');
    watchBtn.type = 'button';
    if (inWatchlist) {
      watchBtn.textContent = 'In Watchlist';
      watchBtn.className = 'ghost-button success-btn';
      watchBtn.disabled = true;
    } else if (inHistory) {
      watchBtn.textContent = 'Watched';
      watchBtn.className = 'ghost-button';
      watchBtn.disabled = true;
    } else {
      watchBtn.textContent = '+ To Watch';
      watchBtn.addEventListener('click', () => {
        addToWatch(item);
        replaceActions(actions, item);
      });
    }
    actions.appendChild(watchBtn);

    // 2. Watched Button
    const watchedBtn = document.createElement('button');
    watchedBtn.type = 'button';
    if (inHistory) {
      watchedBtn.textContent = 'Watched ✔';
      watchedBtn.className = 'ghost-button success-btn';
      watchedBtn.disabled = true;
    } else {
      watchedBtn.textContent = 'Watched';
      watchedBtn.className = 'ghost-button';
      watchedBtn.addEventListener('click', () => {
        markWatched(item);
        replaceActions(actions, item);
      });
    }
    actions.appendChild(watchedBtn);

    // 3. Binge Button
    const bingeBtn = document.createElement('button');
    bingeBtn.type = 'button';
    bingeBtn.className = inBinge ? 'binge-active-btn' : 'ghost-button';
    bingeBtn.textContent = inBinge ? 'Binge ✔' : '+ Binge';
    bingeBtn.addEventListener('click', () => {
      toggleBinge(item);
      replaceActions(actions, item);
    });
    actions.appendChild(bingeBtn);

    return actions;
  }

  function replaceActions(container, item) {
    const newActions = createMovieActions(item);
    container.replaceWith(newActions);
  }

  function renderMovieList(container, titles, options = {}) {
    container.innerHTML = '';
    if (!titles.length) {
      container.innerHTML = `<div class="empty-state">${options.empty || 'Nothing to show yet.'}</div>`;
      return;
    }

    titles.slice(0, 100).map(normalizeTitle).forEach((item) => {
      const card = document.createElement('article');
      card.className = 'movie-card';

      const poster = document.createElement('img');
      poster.className = 'poster';
      poster.src = posterUrl(item.poster_path);
      poster.alt = item.title || 'Poster';

      const meta = document.createElement('div');
      meta.className = 'movie-meta';

      const title = document.createElement('h3');
      title.textContent = `${item.title} (${releaseYear(item)})`;

      const overview = document.createElement('p');
      overview.textContent = item.overview || 'No overview available yet.';

      const facts = document.createElement('div');
      facts.className = 'small-facts';

      const type = document.createElement('span');
      type.className = 'pill';
      type.textContent = item.media_type === 'tv' ? 'Series' : 'Movie';
      facts.appendChild(type);

      if (item.vote_average) {
        const rating = document.createElement('span');
        rating.className = 'pill rating-pill';
        rating.textContent = Number(item.vote_average).toFixed(1);
        facts.appendChild(rating);
      }

      item.genre_names.slice(0, 3).forEach((name) => {
        const pill = document.createElement('span');
        pill.className = 'pill';
        pill.textContent = name;
        facts.appendChild(pill);
      });

      let actions;
      if (options.isDiscover) {
        actions = createMovieActions(item);
      } else {
        actions = document.createElement('div');
        actions.className = 'movie-actions';

        if (options.primaryAction && options.onPrimary) {
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = options.primaryAction;
          button.addEventListener('click', () => options.onPrimary(item));
          actions.appendChild(button);
        }

        if (options.secondaryAction && options.onSecondary) {
          const button = document.createElement('button');
          button.className = 'ghost-button danger';
          button.type = 'button';
          button.textContent = options.secondaryAction;
          button.addEventListener('click', () => options.onSecondary(item));
          actions.appendChild(button);
        }
      }

      meta.append(title, overview, facts, actions);
      card.append(poster, meta);
      container.appendChild(card);
    });
  }

  function renderGenreGrid() {
    genreGrid.innerHTML = '';
    genreCards.forEach((genre) => {
      const button = document.createElement('button');
      button.className = 'genre-card';
      button.type = 'button';
      button.style.backgroundImage = `url("${BG_BASE}${genre.poster}")`;
      button.innerHTML = `<span>${genre.name}</span>`;
      button.addEventListener('click', () => loadGenre(genre));
      genreGrid.appendChild(button);
    });
  }

  async function loadGenre(genre) {
    genreResultTitle.textContent = `${genre.name} picks`;
    genreResults.innerHTML = '<div class="empty-state">Loading titles...</div>';

    try {
      let titles = [];
      if (genre.query) {
        const data = await tmdb('/search/movie', { query: genre.query, language: 'en-US', include_adult: 'false' });
        titles = (data.results || []).filter((item) => item.poster_path).map((item) => normalizeTitle({ ...item, media_type: 'movie' }));
      } else {
        const pages = ['1', '2', '3'];
        const requests = pages.map((page) => tmdb('/discover/movie', {
          language: 'en-US',
          include_adult: 'false',
          page,
          sort_by: 'popularity.desc',
          with_genres: genre.id,
          vote_count_gte: 150,
        }));
        const results = await Promise.all(requests);
        titles = results
          .flatMap((res) => res.results || [])
          .filter((item) => item.poster_path)
          .map((item) => normalizeTitle({ ...item, media_type: 'movie' }));
      }

      // remove duplicates
      const seen = new Set();
      titles = titles.filter((t) => {
        const key = `${t.media_type}:${t.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      renderMovieList(genreResults, titles, {
        empty: 'No titles found for this genre.',
        isDiscover: true,
      });
    } catch (error) {
      console.error(error);
      genreResults.innerHTML = '<div class="warn">Could not load this genre right now.</div>';
    }
  }

  function renderMoodGrid() {
    moodGrid.innerHTML = '';
    moodCards.forEach((mood) => {
      const button = document.createElement('button');
      button.className = 'mood-card';
      button.type = 'button';
      button.style.setProperty('--mood-color', mood.color);
      button.innerHTML = `
        <span class="mood-icon">${mood.icon}</span>
        <span><strong>${mood.name}</strong></span>
      `;
      button.addEventListener('click', () => loadMood(mood));
      moodGrid.appendChild(button);
    });
  }

  async function loadMood(mood) {
    moodResultTitle.textContent = `${mood.name} watchlist`;
    moodResults.innerHTML = '<div class="empty-state">Finding the right mood...</div>';

    try {
      const pages = ['1', '2', '3', '4'];
      const requests = pages.map((page) => tmdb('/discover/movie', {
        language: 'en-US',
        include_adult: 'false',
        page,
        with_genres: mood.genres,
        sort_by: mood.sort,
        vote_count_gte: '150',
      }));
      const results = await Promise.all(requests);
      let titles = results
        .flatMap((res) => res.results || [])
        .filter((item) => item.poster_path)
        .map((item) => normalizeTitle({ ...item, media_type: 'movie' }));

      // remove duplicates
      const seen = new Set();
      titles = titles.filter((t) => {
        const key = `${t.media_type}:${t.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      renderMovieList(moodResults, titles, {
        empty: 'No mood matches found.',
        isDiscover: true,
      });
    } catch (error) {
      console.error(error);
      moodResults.innerHTML = '<div class="warn">Could not load this mood right now.</div>';
    }
  }

  function renderRatingTabs() {
    ratingTabs.innerHTML = '';
    ratingGenres.forEach((genre, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = genre.name;
      button.addEventListener('click', () => loadRatings(genre));
      ratingTabs.appendChild(button);
      if (index === 0) loadRatings(genre);
    });
  }

  async function loadRatings(genre) {
    [...ratingTabs.children].forEach((button) => button.classList.toggle('active', button.textContent === genre.name));
    ratingResults.innerHTML = '<div class="empty-state">Loading top rated titles...</div>';

    try {
      const data = await tmdb('/discover/movie', {
        language: 'en-US',
        include_adult: 'false',
        page: '1',
        with_genres: genre.id,
        sort_by: 'vote_average.desc',
        vote_count_gte: '3500',
      });
      renderRankedList((data.results || []).slice(0, 10).map((item) => normalizeTitle({ ...item, media_type: 'movie' })));
    } catch (error) {
      console.error(error);
      ratingResults.innerHTML = '<div class="warn">Could not load ratings right now.</div>';
    }
  }

  function renderRankedList(titles) {
    ratingResults.innerHTML = '';
    if (!titles.length) {
      ratingResults.innerHTML = '<div class="empty-state">No rated titles found.</div>';
      return;
    }

    titles.forEach((item, index) => {
      const row = document.createElement('article');
      row.className = 'ranked-item';
      
      const rank = document.createElement('div');
      rank.className = 'rank-number';
      rank.textContent = index + 1;

      const img = document.createElement('img');
      img.src = posterUrl(item.poster_path);
      img.alt = item.title;

      const details = document.createElement('div');
      details.style.minWidth = '0';

      const title = document.createElement('h3');
      title.textContent = `${item.title} (${releaseYear(item)})`;

      const p = document.createElement('p');
      p.textContent = `Rating ${Number(item.vote_average || 0).toFixed(1)} | ${item.overview || 'No overview available.'}`;

      const actions = createMovieActions(item);

      details.append(title, p, actions);
      row.append(rank, img, details);
      ratingResults.appendChild(row);
    });
  }

  async function renderPersonalized() {
    personalizedResults.innerHTML = '<div class="empty-state">Building your recommendations...</div>';

    try {
      const seen = new Set([...history, ...toWatch].map((item) => `${item.media_type}:${item.id}`));
      const candidates = new Map();

      for (const item of history.slice(0, 8)) {
        const endpoint = item.media_type === 'tv' ? `/tv/${item.id}/recommendations` : `/movie/${item.id}/recommendations`;
        const data = await tmdb(endpoint, { language: 'en-US', page: '1' }).catch(() => ({ results: [] }));
        (data.results || []).slice(0, 8).forEach((rec) => {
          const normalized = normalizeTitle({ ...rec, media_type: item.media_type });
          const key = `${normalized.media_type}:${normalized.id}`;
          if (!seen.has(key)) candidates.set(key, normalized);
        });
      }

      if (!candidates.size) {
        const preferredGenre = mostCommonGenreId();
        const data = await tmdb('/discover/movie', {
          language: 'en-US',
          include_adult: 'false',
          page: '1',
          sort_by: 'popularity.desc',
          with_genres: preferredGenre || '28,12,878',
        });
        (data.results || []).forEach((item) => {
          const normalized = normalizeTitle({ ...item, media_type: 'movie' });
          const key = `${normalized.media_type}:${normalized.id}`;
          if (!seen.has(key)) candidates.set(key, normalized);
        });
      }

      const titles = [...candidates.values()]
        .sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0))
        .slice(0, 12);

      renderMovieList(personalizedResults, titles, {
        empty: 'Add a few watched titles to make this smarter.',
        isDiscover: true,
      });
    } catch (error) {
      console.error(error);
      personalizedResults.innerHTML = '<div class="warn">Could not build personalized recommendations right now.</div>';
    }
  }

  function mostCommonGenreId() {
    const counts = new Map();
    history.forEach((item) => {
      (item.genre_ids || []).forEach((id) => counts.set(id, (counts.get(id) || 0) + 1));
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  async function loadBackdrop() {
    try {
      const batches = await Promise.all([
        tmdb('/movie/popular', { language: 'en-US', page: '1' }),
        tmdb('/movie/top_rated', { language: 'en-US', page: '1' }),
        tmdb('/discover/movie', { language: 'en-US', with_companies: '420', sort_by: 'popularity.desc', page: '1' }),
      ]);
      const movies = batches
        .flatMap((batch) => batch.results || [])
        .filter((item) => item && item.poster_path);
      renderBackdrop(movies.length ? movies : fallbackBackdropMovies);
    } catch (error) {
      console.error(error);
      renderBackdrop(fallbackBackdropMovies);
    }
  }

  function renderBackdrop(movies) {
    movieBackdrop.innerHTML = '';
    const rows = 4;
    const perRow = 18;
    const total = rows * perRow;
    const filledMovies = Array.from({ length: total }, (_, index) => movies[index % movies.length]);

    for (let row = 0; row < rows; row += 1) {
      const stream = document.createElement('div');
      stream.className = 'poster-stream';

      for (let index = 0; index < perRow; index += 1) {
        const item = filledMovies[row * perRow + index];
        const tile = document.createElement('div');
        tile.className = 'backdrop-tile';
        tile.title = item.title || item.name;
        tile.style.backgroundImage = `url("${BG_BASE}${item.poster_path}")`;
        stream.appendChild(tile);
      }
      movieBackdrop.appendChild(stream);
    }
  }

  function updateTrophies() {
    if (!trophyDropdown) return;
    const watchedCount = history.length;
    const trophyItems = trophyDropdown.querySelectorAll('.trophy-item');

    trophyItems.forEach((item) => {
      const level = parseInt(item.dataset.level, 10);
      const isUnlocked = watchedCount >= level;

      item.classList.toggle('unlocked', isUnlocked);
      item.classList.toggle('locked', !isUnlocked);

      const existingStatus = item.querySelector('.status-icon');
      if (existingStatus) existingStatus.remove();

      const statusSpan = document.createElement('span');
      statusSpan.className = 'status-icon';
      statusSpan.textContent = isUnlocked ? ' ✨' : ' 🔒';
      item.querySelector('strong').appendChild(statusSpan);
    });
  }

  async function loadHiddenGems() {
    hiddenResults.innerHTML = '<div class="empty-state">Finding hidden gems...</div>';
    try {
      const randomPage = Math.floor(Math.random() * 5) + 1;
      const data = await tmdb('/discover/movie', {
        language: 'en-US',
        include_adult: 'false',
        page: randomPage.toString(),
        sort_by: 'vote_average.desc',
        'vote_count.gte': '150',
        'vote_count.lte': '1200',
        'vote_average.gte': '7.8',
      });

      const titles = (data.results || [])
        .filter((item) => item.poster_path)
        .map((item) => normalizeTitle({ ...item, media_type: 'movie' }))
        .slice(0, 20);

      renderMovieList(hiddenResults, titles, {
        empty: 'No hidden gems found. Try again.',
        isDiscover: true,
      });
    } catch (error) {
      console.error('Failed to load hidden gems:', error);
      hiddenResults.innerHTML = '<div class="warn">Could not load hidden gems right now.</div>';
    }
  }

  function renderBinge() {
    bingeList.innerHTML = '';
    if (!bingeListArray.length) {
      bingeSummary.innerHTML = `
        <div class="binge-summary-card empty-summary">
          <p>No titles added yet. Browse movies and series and click <strong>+ Binge</strong> to calculate your binge time!</p>
        </div>
      `;
      bingeList.innerHTML = '<div class="empty-state">Your binge list is empty.</div>';
      return;
    }

    let totalMinutes = 0;
    let moviesCount = 0;
    let tvCount = 0;

    bingeListArray.forEach((item) => {
      if (item.media_type === 'movie') {
        moviesCount++;
        totalMinutes += item.runtime || 0;
      } else {
        tvCount++;
        totalMinutes += (item.number_of_episodes || 0) * (item.episode_run_time || 0);
      }

      const card = document.createElement('article');
      card.className = 'movie-card';

      const poster = document.createElement('img');
      poster.className = 'poster';
      poster.src = posterUrl(item.poster_path);
      poster.alt = item.title || 'Poster';

      const meta = document.createElement('div');
      meta.className = 'movie-meta';

      const title = document.createElement('h3');
      title.textContent = `${item.title} (${releaseYear(item)})`;

      const overview = document.createElement('p');
      overview.textContent = item.overview || 'No overview available yet.';

      const facts = document.createElement('div');
      facts.className = 'small-facts';

      const type = document.createElement('span');
      type.className = 'pill';
      type.textContent = item.media_type === 'tv' ? 'Series' : 'Movie';
      facts.appendChild(type);

      const timePill = document.createElement('span');
      timePill.className = 'pill rating-pill';
      if (item.loading) {
        timePill.textContent = 'Loading...';
      } else if (item.media_type === 'movie') {
        timePill.textContent = `${item.runtime || 0} mins`;
      } else {
        timePill.textContent = `${item.number_of_episodes || 0} eps x ${item.episode_run_time || 0} mins`;
      }
      facts.appendChild(timePill);

      const actions = document.createElement('div');
      actions.className = 'movie-actions';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'ghost-button danger';
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        bingeListArray = bingeListArray.filter((x) => !(x.id === item.id && x.media_type === item.media_type));
        saveAll();
        renderBinge();
      });
      actions.appendChild(removeBtn);

      meta.append(title, overview, facts, actions);
      card.append(poster, meta);
      bingeList.appendChild(card);
    });

    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const mins = totalMinutes % 60;

    let timeString = '';
    if (days > 0) timeString += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0 || days > 0) timeString += `${hours} hour${hours > 1 ? 's' : ''} `;
    timeString += `${mins} minute${mins !== 1 ? 's' : ''}`;

    bingeSummary.innerHTML = `
      <div class="binge-summary-card">
        <div class="summary-stats">
          <div class="stat-item">
            <span class="stat-value">${moviesCount + tvCount}</span>
            <span class="stat-label">Total Titles</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${moviesCount}</span>
            <span class="stat-label">Movies</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${tvCount}</span>
            <span class="stat-label">Series</span>
          </div>
        </div>
        <div class="summary-time">
          <span class="time-label">Total Binge Duration</span>
          <span class="time-value">${timeString}</span>
          <span class="time-sub">(${totalMinutes.toLocaleString()} minutes total)</span>
        </div>
      </div>
    `;
  }

  renderHistory();
  renderToWatch();
  renderGenreGrid();
  renderMoodGrid();
  renderRatingTabs();
  loadBackdrop();
  updateTrophies();
  renderBinge();
})();
