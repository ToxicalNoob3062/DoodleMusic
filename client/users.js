import { renderUsers } from "./modules/dom.mjs";

const resp = await fetch("/api/users");
const users = await resp.json();

renderUsers(users);
