module.exports = (req, res, next) => {
  if (!req.session || !req.session.user) {
    // vérif si une session est bien active et vérif si un user est stocké dans la session
    return res.redirect("/auth/login"); // si user pas connecté, retour à la page
  }
  next(); // si l'user est authentifié, passage à la prochaine étape
};
