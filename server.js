const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("./config/db");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Config `express-session` avec stockage persistant
app.use(
  session({
    secret: process.env.SECRET_KEY || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/intranet",
      collectionName: "sessions",
      ttl: 24 * 60 * 60, // expire après 24h
      autoRemove: "interval",
      autoRemoveInterval: 10, // supp les anciennes sessions toutes les 10 minutes
    }),
    cookie: {
      secure: false, // ne pas activer HTTPS en local
      httpOnly: true, // sécurise cookie
      maxAge: 24 * 60 * 60 * 1000, // expiration 24h
    },
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
