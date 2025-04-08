import { renderCollection, renderSearchHeading } from "./dom.mjs";
import playlistManager from "./manager.mjs";
let latestSongs = [];

export async function onSubmit() {
  const title = search_input.value.trim();
  document.querySelector("#search_container").querySelector("h2")?.remove();
  if (!title) {
    renderCollection({ tName: "search", songs: [] });
    latestSongs = []; // Reset the latest songs state
    return;
  }
  search_input.value = "";

  const resp = await fetch(`/api/search?title=${title}`);
  if (!resp.ok && resp.status == 401) {
    window.location.href = "/login";
  }

  latestSongs = await resp.json();
  renderSearchHeading({ search: true, title });
  renderCollection({ tName: "search", songs: latestSongs });

  // Add event listeners to the + buttons
  const addBtns = document.querySelectorAll(".add");
  addBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = e.target.parentNode.id;
      const song = latestSongs.find((song) => String(song.id) === id);
      playlistManager.addItem(song);
    });
  });
}
