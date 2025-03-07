function filterUsers() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const selectedCategory = document
    .getElementById("categoryFilter")
    .value.toLowerCase();
  const userCards = document.querySelectorAll(".user-card");

  userCards.forEach((card) => {
    const userName = card.getAttribute("data-name").toLowerCase();
    const userCategory = card.getAttribute("data-category").toLowerCase();

    const matchesName = userName.includes(searchInput);
    const matchesCategory =
      selectedCategory === "" || userCategory === selectedCategory;

    card.style.display = matchesName && matchesCategory ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchInput").addEventListener("input", filterUsers);
  document
    .getElementById("categoryFilter")
    .addEventListener("change", filterUsers);
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("randomUserButton");
  const userCard = document.getElementById("randomUserCard");

  if (button && userCard) {
    button.addEventListener("click", async () => {
      try {
        const response = await fetch("/users/random");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération de l'utilisateur");

        const user = await response.json();

        document.getElementById("randomUserImg").src = user.photo;
        document.getElementById(
          "randomUserImg"
        ).alt = `Photo de ${user.firstname}`;
        document.getElementById("randomUserName").textContent = `${
          user.firstname
        } ${user.lastname} (${
          new Date().getFullYear() - new Date(user.birthdate).getFullYear()
        } ans)`;
        document.getElementById(
          "randomUserCity"
        ).textContent = `${user.city}, ${user.country}`;
        document.getElementById(
          "randomUserEmail"
        ).href = `mailto:${user.email}`;
        document.getElementById("randomUserEmail").textContent = user.email;
        document.getElementById("randomUserPhone").href = `tel:${user.phone}`;
        document.getElementById("randomUserPhone").textContent = user.phone;
        document.getElementById(
          "randomUserBirthdate"
        ).textContent = `Anniversaire : ${new Date(
          user.birthdate
        ).toLocaleDateString("fr-FR", { day: "2-digit", month: "long" })}`;
      } catch (error) {
        console.error(error);
      }
    });
  }
});
