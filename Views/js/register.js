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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    document.querySelector(".feedback").innerHTML = "Passwords don't match!";
  }
});
