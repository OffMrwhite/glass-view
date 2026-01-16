const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const filterAll = document.getElementById("filter-all");
const filterScratch = document.getElementById("filter-scratch");
const filterGameDev = document.getElementById("filter-game-dev");

let currentFilter = "all";
let lastResults = [];

filterAll.addEventListener("click", () => setFilter("all"));
filterScratch.addEventListener("click", () => setFilter("scratch"));
filterGameDev.addEventListener("click", () => setFilter("game_dev"));

function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  document.getElementById(`filter-${filter}`).classList.add("active");
  displayResults(lastResults);
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search(input.value);
  }
});

function search(query) {
  results.innerHTML = `<p>Searching for "<strong>${query}</strong>"…</p>`;

  fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      lastResults = data;
      displayResults(data);
    })
    .catch(err => {
      results.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

function displayResults(data) {
  let filtered = data;
  if (currentFilter !== "all") {
    filtered = data.filter(r => r.tag === currentFilter);
  }
  results.innerHTML = filtered.map(r => `
    <div>
      <a href="${r.url}" target="_blank">${r.title}</a>
      <small>(${r.tag})</small>
    </div>
  `).join("");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}