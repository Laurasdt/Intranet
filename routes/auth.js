const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { error: "Email ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("mdp incorrect !");
      return res.render("login", { error: "Email ou mot de passe incorrect." });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    console.log("Connexion réussie !");
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erreur serveur");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth/login");
  });
});

module.exports = router;
