const User = require("../models/User");
const bcrypt = require("bcryptjs");

// récup les collaborateurs et les envoie à views
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("collaborateurs", {
      title: "Collaborateurs",
      users: users.length > 0 ? users : [],
      message: users.length === 0 ? "Aucun collaborateur trouvé." : "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// modif user
exports.updateUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      birthdate,
      city,
      country,
      category,
      isAdmin,
    } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      firstname,
      lastname,
      email,
      phone,
      birthdate,
      city,
      country,
      category,
      isAdmin: isAdmin === "on",
    });

    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// création user
exports.createUser = async (req, res) => {
  try {
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
      isAdmin,
    } = req.body;
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
      isAdmin: isAdmin === "on",
    });

    await newUser.save();
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// supp un user (réservé à admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // admin ?
    if (user.isAdmin) {
      return res.status(400).send("Impossible de supprimer un administrateur.");
    }

    await User.findByIdAndDelete(req.params.id); // Supp l'utilisateur
    res.redirect("/users"); // Redirige vers la liste des users
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
