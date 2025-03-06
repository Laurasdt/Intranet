const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// route pour afficher la liste des users
router.get("/", authMiddleware, getAllUsers);

// route pour afficher la page ajout users
router.get("/create", authMiddleware, (req, res) => {
  res.render("inscription");
});

// route création user
router.post("/create", authMiddleware, createUser);

// route modifier user
router.post("/:id/edit", authMiddleware, updateUser);

// route pour supprimer user
router.post("/:id/delete", authMiddleware, deleteUser);

module.exports = router;
