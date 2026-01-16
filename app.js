const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('results');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Mock data
const mockResults = [
  { title: 'Scratch Platformer Tutorial', url: 'https://scratch.mit.edu/projects/123', tag: 'scratch' },
  { title: 'Collision Detection in Scratch', url: 'https://scratch.mit.edu/projects/456', tag: 'scratch' },
  { title: 'Unity Game Development Guide', url: 'https://learn.unity.com/', tag: 'gamedev' },
  { title: 'Godot Engine Basics', url: 'https://docs.godotengine.org/', tag: 'gamedev' },
  { title: 'General Web Search', url: 'https://www.google.com', tag: 'general' }
];

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    performSearch();
  });
});

function performSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = '<p>Searching...</p>';

  // Simulate API call delay
  setTimeout(() => {
    let results = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tag.toLowerCase().includes(query.toLowerCase())
    );

    if (currentFilter !== 'all') {
      results = results.filter(item => item.tag === currentFilter);
    }

    displayResults(results);
  }, 500);
}

function displayResults(results) {
  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }

  resultsDiv.innerHTML = results.map(result => `
    <div class="result-item">
      <a href="${result.url}" target="_blank">${result.title}</a>
      <div class="tag">${result.tag}</div>
    </div>
  `).join('');
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(registration => console.log('SW registered'))
    .catch(error => console.log('SW registration failed'));
}