const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Bienvenue sur l'intranet" });
});

// route pour voir les users
router.get("/collaborateurs", authMiddleware, getAllUsers);

// route pour supp un user (admin)
router.post("/collaborateurs/:id/delete", authMiddleware, deleteUser);

module.exports = router;
