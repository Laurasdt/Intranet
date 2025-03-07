const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("./config/db");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const xss = require("xss-clean");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(xss());

app.use(express.static("public"));

// config `express-session` avec stockage persistant (garde en mémoire les info session user après connexion)
app.use(
  session({
    secret: process.env.SECRET_KEY || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/intranet",
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// middleware pour injecter infos user dans res.locals
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  console.log("Utilisateur connecté :", res.locals.user);
  next();
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
