const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Bienvenue sur l'intranet" });
});

router.get("/collaborateurs", getAllUsers);

module.exports = router;
