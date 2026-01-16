const input = document.getElementById("searchInput");
const results = document.getElementById("results");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search(input.value);
  }
});

function search(query) {
  results.innerHTML = `<p>Searching for "<strong>${query}</strong>"…</p>`;

  function search(query) {
  results.innerHTML = "Searching…";

  fetch(`http://127.0.0.1:8000/search?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      results.innerHTML = data.map(r => `
        <div>
          <a href="${r.url}" target="_blank">${r.title}</a>
          <small>(${r.tag})</small>
        </div>
      `).join("");
    });
}
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}