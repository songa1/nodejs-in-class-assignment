const form = document.querySelector("form");

const submitBtn = document.querySelector("#register");

function checkPass() {
  if (form.password.value === form.c_password.value) {
    return true;
  } else {
    return false;
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const user = {
    user_name: form.name.value,
    user_email: form.email.value,
    user_phone: form.phone.value,
    user_password: form.password.value,
  };

  console.log(user);
  if (
    form.name.value === "" ||
    form.email.value === "" ||
    form.phone.value === "" ||
    form.password.value === "" ||
    form.c_password.value === ""
  ) {
    alert("Don't leave any field empty!");
  } else {
    let pass = checkPass();

    if (pass) {
      fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.statusText === "Created") {
            alert("Successfully created user!");
            window.location.href = "./index.html";
          } else {
            alert("Failed to create user! Try again.");
          }
        })
        .catch((err) => alert(err.message));
    } else {
      alert("Passwords don't match!");
    }
  }
});
