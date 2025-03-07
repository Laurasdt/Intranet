const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Email invalide."),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Mot de passe trop court (min. 8 caractères)."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("login", { error: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      if (typeof email !== "string" || typeof password !== "string") {
        return res.render("login", { error: "Données invalides." });
      }

      const sanitizedEmail = email.toLowerCase().trim();
      const user = await User.findOne({ email: sanitizedEmail });

      if (!user) {
        return res.render("login", {
          error: "Email ou mot de passe incorrect.",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render("login", {
          error: "Email ou mot de passe incorrect.",
        });
      }

      req.session.user = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      };

      console.log("Utilisateur connecté :", req.session.user);
      res.redirect("/users");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      res.status(500).send("Erreur serveur");
    }
  }
);

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
