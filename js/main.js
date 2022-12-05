const API = "http://localhost:8000/info";

let name = document.querySelector("#name"),
  lastName = document.querySelector("#last-name"),
  phoneNumber = document.querySelector("#phone-number"),
  photoLink = document.querySelector("#photo-link"),
  btnSave = document.querySelector("#btn-save"),
  contentList = document.querySelector("#content-list");

let editName = document.querySelector("#edit-name"),
  editLastName = document.querySelector("#edit-last-name"),
  editPhone = document.querySelector("#edit-phone"),
  editPhoto = document.querySelector("#edit-photo"),
  editSaveBtn = document.querySelector("#btn-save-edit"),
  exampleModal = document.querySelector("#exampleModal");

//   Put info into the database
btnSave.addEventListener("click", async function () {
  let obj = {
    name: name.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    photoLink: photoLink.value,
  };

  if (
    !obj.name.trim() ||
    !obj.lastName.trim() ||
    !obj.phoneNumber.trim() ||
    !obj.photoLink.trim()
  ) {
    alert`Поле не должно быть пустым`;
    return;
  }
  if (!+obj.phoneNumber || +obj.name || +obj.lastName) {
    alert`Заполните поля правильно`;
    return;
  }

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  name.value = "";
  lastName.value = "";
  phoneNumber.value = "";
  photoLink.value = "";
  infoFunc();
});

// Displaying data on a browser page
infoFunc();
async function infoFunc() {
  let info = await fetch(API)
    .then((result) => result.json())
    .catch((error) => console.log(error));
  contentList.innerHTML = "";
  info.forEach((elem) => {
    let newInfo = document.createElement("div");
    newInfo.id = elem.id;
    newInfo.innerHTML = `
    <div class="panel-card">
    <div class="card">
    <img src= ${elem.photoLink} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-person" viewBox="0 0 16 16">
      <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/>
      <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>${elem.lastName}</h5>
       <h5 class="card-title"><svg class="icons" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
       <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
     </svg>${elem.name}</h5>
     <h6 class="card-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="tel" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
   </svg>${elem.phoneNumber}</h4>
      <a href="#" class="btn btn-primary btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${elem.id}>Изменить</a>
      <a href="#" class="btn btn-primary btn-delete" id=${elem.id}>Удалить</a>
    </div>
  </div>
  </div>`;
    contentList.append(newInfo);
  });
}

//Delete data
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    let id = e.target.id;
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      contentList.innerHTML = "";
      infoFunc();
    });
  }
});

// Edit modalForm
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-edit")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editName.value = data.name;
        editLastName.value = data.lastName;
        editPhone.value = data.phoneNumber;
        editPhoto.value = data.photoLink;

        editSaveBtn.setAttribute("id", data.id);
      });
  }
});

editSaveBtn.addEventListener("click", function () {
  let id = this.id;
  let name = editName.value,
    lastName = editLastName.value,
    phoneNumber = editPhone.value,
    photoLink = editPhoto.value;

  if (!name || !lastName || !phoneNumber || !photoLink) return;
  if (!+phoneNumber || +name || +lastName) {
    alert`Fields must be filled in correctly`;
    return;
  }

  let editedInfo = {
    name: name,
    lastName: lastName,
    phoneNumber: phoneNumber,
    photoLink: photoLink,
  };
  saveEdit(editedInfo, id);
});

async function saveEdit(editedInfo, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(editedInfo),
  });
  infoFunc();
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
}

// latititude 7490
