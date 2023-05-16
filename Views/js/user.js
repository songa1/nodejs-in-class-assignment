fetch(
  `http://localhost:3000/api/users/${"d369edaf-d2ce-4be4-9202-ff66d8fdc1bb"}`
)
  .then((res) => res.json())
  .then((data) => {
    renderData(data.payload);
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
  let username = document.getElementById("username");
  username.innerHTML = data.user_name;

  let useremail = document.getElementById("useremail");
  useremail.innerHTML = data.user_email;

  let userphone = document.getElementById("userphone");
  userphone.innerHTML = data.user_phone;

  let created = document.getElementById("created");
  created.innerHTML = dateFormatter(data.created_at);
}
