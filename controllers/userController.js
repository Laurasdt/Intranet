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
      currentUser: req.session.user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};

// création user
exports.createUser = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).send("Accès refusé.");
    }

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
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).send("Accès refusé.");
    }

    const userToDelete = await User.findById(req.params.id);

    if (!userToDelete) {
      return res.status(404).send("Utilisateur non trouvé.");
    }

    if (userToDelete._id.toString() === req.session.user.id) {
      return res
        .status(400)
        .send("Vous ne pouvez pas vous supprimer vous-même.");
    }

    if (userToDelete.isAdmin) {
      return res
        .status(400)
        .send("Impossible de supprimer un autre administrateur.");
    }

    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
