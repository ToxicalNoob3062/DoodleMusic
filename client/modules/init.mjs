import _ from "./components/song.mjs";
import Collection from "./components/collection.mjs";
import Search from "./components/search.mjs";
import Heading from "./components/heading.mjs";

// go through compilation process for each component
const components = {
  Collection,
  Search,
  Heading,
};

for (const [key, value] of Object.entries(components)) {
  components[key] = Handlebars.compile(value);
}

export default components;
