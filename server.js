const express = require("express");
// Ajoute la gestion des sessions pour permettre aux utilisateurs de rester connectés
const session = require("express-session");
// Charge les variables d'environnement définies dans .env
const dotenv = require("dotenv");
// Permet de gérer les chemins de fichiers, comme views pour les templates Pug
const path = require("path");
// Importe la connexion à MongoDB, qui est définie dans config/db.js
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
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur tourne sur http://localhost:${PORT}`);
});
