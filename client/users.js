import { renderUsers } from "./modules/dom.mjs";
const resp = await fetch("/api/users");
if (resp.ok) {
  const users = await resp.json();
  renderUsers(users);
}
