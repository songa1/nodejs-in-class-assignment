let id = location.search.split("=")[1];

console.log(id);

let updateBtn = document.querySelector(".update");
let username = document.getElementById("username");
let useremail = document.getElementById("useremail");
let userphone = document.getElementById("userphone");

fetch(`http://localhost:3000/api/users/${id}`, {
  headers: {
    authorization: token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.status === 401 || data.status === 403) {
      window.location.href = "./index.html";
      alert("Not authorized! Please login.");
    } else {
      renderData(data.payload);
    }
  })
  .catch((err) => {
    console.log(err.message);
  });

function dateFormatter(date) {
  return `${new Date(date).getFullYear()} - ${new Date(
    date
  ).getMonth()} - ${new Date(date).getDate()}`;
}

function renderData(data) {
  username.value = data.user_name;

  useremail.value = data.user_email;

  userphone.value = data.user_phone;

  let created = document.getElementById("created");
  created.innerHTML = dateFormatter(data.created_at);
}

updateBtn.addEventListener("click", (e) => {
  const data = {
    user_name: username.value,
    user_email: useremail.value,
    user_phone: userphone.value,
  };
  e.preventDefault();
  fetch(`http://localhost:3000/api/users/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 401 || data.status === 403) {
        window.location.href = "./index.html";
        alert("Not authorized! Please login.");
      } else {
        window.location.href = `./user.html?id=${id}`;
      }
    })
    .catch((err) => console.log(err));
});
