const form = document.querySelector("form");

const submitBtn = document.querySelector("#login");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (form.email.value === "" || form.password.value === "") {
    alert("Please don't leave the field empty");
  } else {
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email: form.email.value,
        user_password: form.password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login failed") {
          console.log(data);
          alert(data.error);
        } else {
          localStorage.setItem("token", data.token);
          window.location.href = "./users.html";
        }
      })
      .catch((err) => alert(err.message));
  }
});
