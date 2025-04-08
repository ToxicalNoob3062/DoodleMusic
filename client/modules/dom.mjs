import components from "./init.mjs";

export function renderCollection(props) {
  const { tName, songs } = props;

  const parentContainer = document.querySelector(`#${tName}_container`);
  const tempContainer = document.createElement("div");

  const currContainer = parentContainer.querySelector(`#${tName}`);
  if (currContainer) {
    currContainer.remove();
  }

  if (!songs.length) {
    tempContainer.innerHTML = `<p id="${tName}">No results found</p>`;
    parentContainer.appendChild(tempContainer);
    return;
  }

  tempContainer.innerHTML = components.Collection({ tName, songs });
  parentContainer.appendChild(tempContainer);
}

export function renderSearchHeading(props) {
  const searchHeading = components.Heading(props);
  search_bar.insertAdjacentHTML("afterend", searchHeading);
}

export async function renderProfile(session, total) {
  const p = document.getElementById("profile");
  if (p) {
    p.remove();
  }
  const parentContainer = document.querySelector("#profile_container");
  parentContainer.innerHTML = components.Profile({
    ...session,
    total,
  });
  const actualProfile = tempContainer.querySelector("#profile");
  const logoutButton = actualProfile.querySelector("#logout");
  const deleteButton = actualProfile.querySelector("#delete");
  // add listeners
  logoutButton.addEventListener("click", async () => {
    await fetch("/api/logout");
    window.location.reload();
  });
  deleteButton.addEventListener("click", () => {});
  parentContainer.prepend(actualProfile);
}

export async function renderAudioPlayer(song) {
  const parentContainer = document.querySelector("#audio_container");
  parentContainer.innerHTML = components.Player(song);
}
