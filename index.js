const table = document.getElementById("table")

function renderUsers() {
  table.innerHTML =
    `
  <tr>
        <th>ID</th>
        <th>Date de création</th>
        <th class="status__title--column">Etat</th>
        <th>Nom</th>
        <th>Prénom</th>
        <th>Nom d'utilisateur</th>
        <th>Matricule</th>
        <th class="action__title--column">Action</th>
      </tr>
    `
  for (let i = 0; i < users.length; i++) {
    let createdDate = users[i].createdDate.slice(0, 10).replaceAll('-', '/')
    let status = users[i].status.toLowerCase() === "en validation" ? "on-validation" : users[i].status.toLowerCase() === "validé" ? "valide" : users[i].status.toLowerCase() === "rejeté" ? "rejected" : ""

    table.innerHTML +=
      `
    <tr id="${i}">
      <td>${users[i].id}</td>
      <td>${createdDate}</td>
      <td>
          <div class="${status} status">
          <h1 class="light status--text">
              ${users[i].status}
          </h1>
          </div>
      </td>
      <td>${users[i].lastName}</td>
      <td>${users[i].firstName}</td>
      <td>${users[i].userName}</td>
      <td>${users[i].registrationNumber}</td>
      <td>
          <i class="fa-regular fa-trash-can delete action__data--column" onclick="deleteUser(${i})"></i>
      </td>
    </tr>
    `
  }
}

function deleteUser(row) {
  users.splice(row, 1)
  renderUsers()
}


function toggleAddUserModal() {
  let modalShown = document.querySelector('.modal__container').classList.contains('modal__shown')

  if (modalShown) {
    document.querySelector('.modal__container').classList.add('modal__hidden')
    document.querySelector('.modal__container').classList.remove('modal__shown')
  } else {
    document.querySelector('.modal__container').classList.add('modal__shown')
    document.querySelector('.modal__container').classList.remove('modal__hidden')
  }
}

function randomId() {
  return Math.floor(Math.random() * 1000000000)
}

function addUser() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const obj = {id: randomId().toString()};
  const formObject = {...obj, ...Object.fromEntries(formData)};

  users.push(formObject)
  renderUsers()
  toggleAddUserModal()
  clearForm()
}

function clearForm() {
  const form = document.getElementById('form');
  const inputs = form.getElementsByTagName('input');
  Array.from(inputs).forEach(input => input.type !== 'submit' ? input.value = '' : null);
}

let users =
  [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
    {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
    {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    },
  ]

renderUsers()
