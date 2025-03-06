const express = require("express");
const {
  getAllUsers,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

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

module.exports = router;
