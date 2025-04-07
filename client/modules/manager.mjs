import { renderCollection } from "./dom.mjs";
import components from "./init.mjs";

class PlaylistManager {
  playlist = {};
  constructor() {
    this.reloadState();
  }

  getUnixTimestamp() {
    return Math.floor(Date.now() / 1000);
  }

  async addItem(item) {
    item = {
      ...item,
      score: this.getUnixTimestamp(), // unix
    };
    this.playlist[item.id] = item;
    const resp = await fetch("/api/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    });

    if (!resp.ok) {
      alert("500: Server Error");
    }

    this.renderUI();
  }

  async removeItem(id) {
    delete this.playlist[id];
    const resp = await fetch("/api/pop", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    if (!resp.ok) {
      alert("500: Server Error");
    }
    this.renderUI();
  }

  async swapScores(id, inc) {
    const resp = await fetch("/api/modify", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        direc: inc,
      }),
    });

    const { swapId } = await resp.json();
    console.log(swapId, id, this.playlist);
    if (swapId) {
      const temp = this.playlist[id].score;
      this.playlist[id].score = this.playlist[swapId].score;
      this.playlist[swapId].score = temp;
    }
    this.renderUI();
  }

  getPlaylist() {
    return Object.values(this.playlist).sort((a, b) => a.score - b.score);
  }

  async reloadState() {
    const response = await fetch("/api/retrieve");
    const data = await response.json();
    console.log(data);
    data.map((item) => {
      this.playlist[item.id] = item;
    });
    this.renderUI();
  }

  renderUI() {
    // add heading if not present
    const heading = document.querySelector("#playlist_container h2");
    if (!heading) {
      document
        .querySelector("#playlist_container")
        .insertAdjacentHTML("afterbegin", components.Heading({}));
    }

    // render the playlist
    renderCollection({
      tName: "playlist",
      songs: this.getPlaylist().map((item) => ({ ...item, inPlist: true })),
    });

    // add event listeners to the - buttons
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.removeItem(e.target.parentNode.id);
      });
    });

    // add event listeners to the ^ buttons
    const upBtns = document.querySelectorAll(".up");
    upBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.swapScores(e.target.parentNode.id, -1);
      });
    });

    // add event listeners to the v buttons
    const downBtns = document.querySelectorAll(".down");
    downBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.swapScores(e.target.parentNode.id, 1);
      });
    });
  }
}

const playlistManager = new PlaylistManager();
export default playlistManager;
