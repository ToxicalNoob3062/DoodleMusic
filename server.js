//  define a express server
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { searchSongs, populatePlaylist } from "./modules/songs.js";
import { authenticateUser } from "./modules/auth.js";
import {
  addNode,
  removeNode,
  gatherAllNodes,
  swapNode,
  getAllUser,
  promoteUser,
} from "./modules/orm.js";

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const publicPaths = [
  "/login",
  "/login.html",
  "/api/login",
  "/login.js",
  "/music.png",
];

const adminPaths = ["/api/users", "/api/promote", "/users.html", "/users"];

function isPublic(path) {
  return publicPaths.includes(path);
}

// auth middle ware
app.use(async (req, res, next) => {
  const isAuthenticated = !!req.cookies.auth;

  if (!isPublic(req.path) && !isAuthenticated) {
    if (req.path.includes("/api")) {
      return res.status(401).send({
        msg: "Unauthorized",
      });
    }
    return res.redirect("/login");
  }
  if (isAuthenticated && ["/login", "/login.html"].includes(req.path)) {
    return res.redirect("/mytunes");
  }
  if (adminPaths.includes(req.path) && req.cookies.role !== "admin") {
    return res.sendStatus(400).send({
      msg: "Bad Request!",
    });
  }
  next();
});

//server the client folder as static files
app.use(express.static("client"));

// zerox
app.get("/login", async (req, res) => {
  res.sendFile("login.html", { root: "client" });
});

app.get("/mytunes", async (req, res) => {
  res.sendFile("index.html", { root: "client" });
});

app.get("/users", async (req, res) => {
  res.sendFile("users.html", { root: "client" });
});

// login handler
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await authenticateUser(username, password);
  if (!user) {
    res.status(401).send({
      msg: "Invalid Credentials or Account Exists",
    });
    return;
  }
  // Set expiration time for the auth cookie
  res.cookie("auth", "true", { maxAge: 900000, secure: true });
  res.cookie("user", user.username, { maxAge: 900000, secure: true });
  res.cookie("role", user.role, { maxAge: 900000, secure: true });
  res.send({
    msg: "Login Succesfull!",
  });
});

app.get("/api/session", async (req, res) => {
  if (!!req.cookies.auth)
    return res.status(401).send({
      msg: "Unauthorized!",
    });
  const { user, role } = req.cookies;
  res.json({
    user,
    role,
  });
});

app.get("/api/logout", async (req, res) => {
  res.clearCookie("auth");
  res.clearCookie("user");
  res.clearCookie("role");
  res.redirect("/login");
});

// songs related routes
app.get("/api/search", async (req, res) => {
  const title = req.query.title;
  const songs = await searchSongs(title);
  res.json(songs);
});

app.post("/api/push", async (req, res) => {
  let itemId = req.body.id;
  let owner = req.cookies.user;
  const ok = await addNode(owner, itemId);
  if (ok) res.sendStatus(200);
  else res.sendStatus(500);
});

app.delete("/api/pop", async (req, res) => {
  let itemId = req.body.id;
  let owner = req.cookies.user;
  const ok = await removeNode(owner, itemId);
  if (ok) res.sendStatus(200);
  else res.sendStatus(500);
});

app.get("/api/retrieve", async (req, res) => {
  let owner = req.cookies.user;
  const trackIds = await gatherAllNodes(owner);
  const songs = await populatePlaylist(trackIds);
  res.json(songs);
});

app.put("/api/modify", async (req, res) => {
  let owner = req.cookies.user;
  let { id, direc } = req.body;
  res.json({
    swapId: await swapNode(owner, id, direc),
  });
});

//  User related routes
app.get("/api/users", async (_, res) => {
  const users = await getAllUser();
  return res.status(users.length > 0 ? 200 : 500).json(users);
});

app.post("/api/promote", async (req, res) => {
  const username = req.body.username;
  const status = await promoteUser(username);
  if (status)
    res.cookie("role", status ? "admin" : "guest", {
      maxAge: 900000,
      secure: true,
    });
  return res.sendStatus(status ? 200 : 500);
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
