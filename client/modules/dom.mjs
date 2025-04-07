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
