const express = require("express");
const {
  getAllUsers,
  deleteUser,
  createUser,
  getRandomUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/random", authMiddleware, getRandomUser);

router.get("/", authMiddleware, getAllUsers);

router.get("/create", authMiddleware, (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(403).send("Accès refusé.");
  }
  res.render("inscription");
});

router.post("/create", authMiddleware, createUser);

router.post("/:id/delete", authMiddleware, deleteUser);

router.get("/:id/edit", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.render("editUser", { user });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).send("Erreur serveur");
  }
});

router.post("/:id/edit", authMiddleware, async (req, res) => {
  try {
    const {
      gender,
      category,
      lastname,
      firstname,
      phone,
      birthdate,
      city,
      country,
      photo,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        gender,
        category,
        lastname,
        firstname,
        phone,
        birthdate,
        city,
        country,
        photo,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    res.redirect("/users");
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
