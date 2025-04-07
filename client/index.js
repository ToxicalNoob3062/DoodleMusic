import { onSubmit } from "./modules/handlers.mjs";
import { renderCollection } from "./modules/dom.mjs";
import components from "./modules/init.mjs";
import _ from "./modules/manager.mjs";

// data injection
const searchInput = components.Search({});
search_container.innerHTML = searchInput;
renderCollection({ tName: "search", songs: [] });

// what will happen when user will search ?
submit_btn.addEventListener("click", onSubmit);
search_input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    onSubmit();
  }
});
