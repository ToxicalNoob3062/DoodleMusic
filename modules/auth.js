import { getUser, createUser } from "./orm.js";
import { comparePassword } from "./orm.js";

export async function authenticateUser(username, password) {
  if (!username || !password) {
    return null;
  }
  let user = await getUser(username);
  if (!user) {
    return await createUser(username, password);
  }
  if (!(await comparePassword(password, user.password))) {
    return null;
  }
  return user;
}
