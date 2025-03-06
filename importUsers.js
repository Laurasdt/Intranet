const mongoose = require("./config/db");
const User = require("./models/User");
const users = require("./data/users");
const bcrypt = require("bcryptjs");

const importData = async () => {
  try {
    await User.deleteMany();

    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        if (!user.email || !user.password) {
          console.warn("Il manque un champ !", user);
          return null;
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    const validUsers = usersWithHashedPasswords.filter((user) => user !== null);

    if (validUsers.length > 0) {
      await User.insertMany(validUsers);
    } else {
      console.log("Aucun utilisateur valide n'a été importé.");
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
