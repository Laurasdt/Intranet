document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("input", filterUsers);
  document.getElementById("location").addEventListener("change", filterUsers);
  document.getElementById("category").addEventListener("change", filterUsers);
});

function filterUsers() {
  const search = document.getElementById("search").value.toLowerCase();
  const location = document.getElementById("location").value.toLowerCase();
  const category = document.getElementById("category").value.toLowerCase();

  const users = document.querySelectorAll(".user-card");

  users.forEach((user) => {
    const name = user.getAttribute("data-name").toLowerCase();
    const userLocation = user.getAttribute("data-location").toLowerCase();
    const userCategory = user.getAttribute("data-category").toLowerCase();

    const matchesSearch = name.includes(search);
    const matchesLocation = location === "" || userLocation.includes(location);
    const matchesCategory = category === "" || userCategory.includes(category);

    user.style.display =
      matchesSearch && matchesLocation && matchesCategory ? "block" : "none";
  });
}
