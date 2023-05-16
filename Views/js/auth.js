const token = localStorage.getItem("token");

const logoutButton = document.querySelector(".logout");

if (!token) {
  logoutButton.style.display = "none";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
}
