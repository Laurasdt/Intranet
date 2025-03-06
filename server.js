const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("./config/db");
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
