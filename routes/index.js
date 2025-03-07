const express = require("express");
const router = express.Router(); // obj router fourni par Express pour gérer les routes de manière modulaire

// def de la route principale
router.get("/", (req, res) => {
  // req.session.user : vérif si un utilisateur est stocké dans la session. Si non => auth page
  if (!req.session.user) return res.redirect("/auth/login");
  res.render("index", {
    title: "Bienvenue sur l'Intranet",
    user: req.session.user,
  });
});

module.exports = router;
