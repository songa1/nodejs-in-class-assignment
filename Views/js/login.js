const form = document.querySelector("form");

const submitBtn = document.querySelector("#login");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      user_email: form.email.value,
      user_password: form.password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "./users.html";
    })
    .catch((err) => console.error(err));
});
