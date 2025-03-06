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
