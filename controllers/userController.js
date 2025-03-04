const User = require("../models/User");

// récup les collaborateurs et les envoie à views
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("collaborateurs", { title: "Collaborateurs", users });
  } catch (error) {
    console.error("Erreur lors de la récupération des collaborateurs :", error);
    res.status(500).send("Erreur serveur");
  }
};
