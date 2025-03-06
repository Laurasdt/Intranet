const User = require("../models/User");
const bcrypt = require("bcryptjs");

// page connexion
const loginPage = (req, res) => {
  res.render("login");
};

// connexion
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Aucun utilisateur trouvé pour cet email.");
      return res.render("login", { error: "Email ou mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("mdp incorrect.");
      return res.render("login", { error: "Email ou mot de passe incorrect." });
    }

    req.session.user = user;
    console.log("Connexion réussie !");
    res.redirect("/");
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).send("Erreur serveur");
  }
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
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
