const mongoose = require("../config/db");
const User = require("../models/User");
const users = require("../data/users");
const bcrypt = require("bcryptjs");

const importData = async () => {
  try {
    await User.deleteMany(); // sup les anciens users

    // vérif et hashe les mdp
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        // Si un champs n'existe pas => on renvoit null
        if (!user.email || !user.password) {
          console.warn(`Il manque un champs !!`, user);
          return null;
        }

        // Hache le mdp avant de l'insérer
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // permet de filtrer les users valides
    const validUsers = usersWithHashedPasswords.filter((user) => user !== null);

    // permet d'insérer uniquement les users valides
    if (validUsers.length > 0) {
      await User.insertMany(validUsers);
      console.log(
        `${validUsers.length} utilisateur(s) importé(s) avec succès !`
      );
    } else {
      console.log("Aucun utilisateur valide n'a été importé.");
    }

    process.exit();
  } catch (error) {
    console.error("Erreur lors de l'importation :", error);
    process.exit(1);
  }
};

importData();
