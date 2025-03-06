const express = require("express");
const {
  loginPage,
  loginUser,
  logoutUser,
  signupPage,
  signupUser,
} = require("../controllers/authController");

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/inscription", signupPage);
router.post("/inscription", signupUser);

module.exports = router;
