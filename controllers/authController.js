const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.loginPage = (req, res) => {
  res.render("login", { title: "Connexion" });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render("login", {
      title: "Connexion",
      error: "Email ou mot de passe incorrect",
    });
  }

  req.session.user = user;
  res.redirect("/");
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};
