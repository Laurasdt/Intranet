const User = require("../models/User");

// récup les collaborateurs et les envoie à views
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("collaborateurs", {
      title: "Collaborateurs",
      users,
      message: users.length === 0 ? "Aucun collaborateur trouvé." : "",
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des collaborateurs :", error);
    res.status(500).send("Erreur serveur");
  }
};

// supp un user (réservé à admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/collaborateurs");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).send("Erreur serveur");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .render("error", { message: "Utilisateur non trouvé" });
    }
    res.render("profil", { user, title: "Profil du collaborateur" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
};
