const express = require("express");
const {
  loginPage,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const router = express.Router();

router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
