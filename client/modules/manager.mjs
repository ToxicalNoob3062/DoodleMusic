import { renderAudioPlayer, renderCollection, renderProfile } from "./dom.mjs";
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

    data.map((item) => {
      this.playlist[item.id] = item;
    });
    this.renderUI();
  }

  playSong(newId) {
    const prevId = localStorage.getItem("currentSong");
    localStorage.setItem("currentSong", newId);
    if (prevId) {
      this.playlist[prevId].playing = false;
    }
    this.playlist[newId].playing = true;
    console.log("Playing song:", this.playlist[newId].title);
    renderAudioPlayer(this.playlist[newId]);
    this.renderUI();
  }

  async renderUI() {
    //get session
    const resp = await fetch("/api/session");
    const session = await resp.json();

    //get playlist
    const cp = this.getPlaylist();
    renderProfile(session, cp.length);

    // add heading if not present
    const heading = document.querySelector("#playlist_container h2");
    if (!heading) {
      document.querySelector("#playlist_container").insertAdjacentHTML(
        "afterbegin",
        components.Heading({
          user: session.user,
        }),
      );
    }

    // render the playlist
    renderCollection({
      tName: "playlist",
      songs: cp.map((item) => ({ ...item, inPlist: true })),
    });

    //songs
    const songs = document.querySelectorAll(".song");
    songs.forEach((song) => {
      song.addEventListener("click", (e) => {
        const tr = e.target.closest(".song");
        if (!tr) return; // clicked outside a row

        const id = tr.id.split("-")[1]; // e.g., from "audio-123"
        this.playSong(id);
      });
    });

    // add event listeners to the - buttons
    const removeBtns = document.querySelectorAll(".remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();

        this.removeItem(e.target.parentNode.id);
      });
    });

    // add event listeners to the ^ buttons
    const upBtns = document.querySelectorAll(".up");
    upBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.swapScores(e.target.parentNode.id, -1);
      });
    });

    // add event listeners to the v buttons
    const downBtns = document.querySelectorAll(".down");
    downBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.swapScores(e.target.parentNode.id, 1);
      });
    });
  }
}

const playlistManager = new PlaylistManager();
export default playlistManager;
