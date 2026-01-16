const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search(input.value);
  }
});

function search(query) {
  results.innerHTML = `<p>Searching for "<strong>${query}</strong>"…</p>`;

  // Placeholder for backend API
  // fetch(`https://your-backend/search?q=${encodeURIComponent(query)}`)
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}