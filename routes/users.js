const express = require("express");
const {
  getAllUsers,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // vérif si user est co
const User = require("../models/User");

const router = express.Router();

// route pour afficher la liste des users
router.get("/", authMiddleware, getAllUsers);

// route pour afficher la page ajout users
router.get("/create", authMiddleware, (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.status(403).send("Accès refusé.");
  }
  res.render("inscription");
});

// route création user
router.post("/create", authMiddleware, createUser);

// route pour supprimer user
router.post("/:id/delete", authMiddleware, deleteUser);

router.get("/:id/edit", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    res.render("editUser", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
