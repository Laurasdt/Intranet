const User = require("../models/User");

console.log("✅ authController.js chargé !");

// page connexion
const loginPage = (req, res) => {
  res.render("login");
};

// connexion
const loginUser = (req, res) => {
  res.send("Connexion réussie");
};

// logout
const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
};

// page inscription
const signupPage = (req, res) => {
  res.render("inscription");
};

// inscription user
const signupUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    birthdate,
    city,
    country,
    category,
  } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render("inscription", {
        error: "Cet email est déjà utilisé.",
      });
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      birthdate,
      city,
      country,
      category,
    });
    await newUser.save();

    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    res.render("inscription", { error: "Erreur lors de l'inscription." });
  }
};

module.exports = { loginPage, loginUser, logoutUser, signupPage, signupUser };
