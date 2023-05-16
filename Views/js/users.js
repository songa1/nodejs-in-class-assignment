function renderUsers(data) {
  let holder = document.querySelector("tbody");

  let tr = document.createElement("tr");

  let id = document.createElement("td");
  let name = document.createElement("td");
  let email = document.createElement("td");
  let phone = document.createElement("td");
  let idLink = document.createElement("a");

  idLink.href = "./user.html?id=" + data.user_id;

  let actions = document.createElement("div");
  actions.setAttribute("class", "button-row");
  actions.style.padding = "10px";

  let edit = document.createElement("button");
  let deleteBtn = document.createElement("button");
  edit.textContent = "Edit";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("class", "danger-badge");
  edit.setAttribute("class", "warning-badge");

  actions.appendChild(edit);
  actions.appendChild(deleteBtn);

  idLink.textContent = data.user_id;
  id.appendChild(idLink);
  name.textContent = data.user_name;
  email.textContent = data.user_email;
  phone.textContent = data.user_phone;

  tr.appendChild(id);
  tr.appendChild(name);
  tr.appendChild(email);
  tr.appendChild(phone);
  tr.appendChild(actions);

  holder.appendChild(tr);

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/users/${data.user_id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  });
}

fetch("http://localhost:3000/api/users", {
  headers: {
    "x-access-token": token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    for (let user of data.payload) renderUsers(user);
  })
  .catch((err) => console.error(err.message));
