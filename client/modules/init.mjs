import _ from "./components/song.mjs";
import Collection from "./components/collection.mjs";
import Search from "./components/search.mjs";
import Heading from "./components/heading.mjs";
import Profile from "./components/profile.mjs";
import Player from "./components/player.mjs";
import Song from "./components/song.mjs";

// go through compilation process for each component
const components = {
  Collection,
  Search,
  Heading,
  Profile,
  Player,
  Song,
};

for (const [key, value] of Object.entries(components)) {
  components[key] = Handlebars.compile(value);
}

export default components;
