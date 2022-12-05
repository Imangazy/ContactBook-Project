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
    alert`The field must not be empty`;
    return;
  }
  if (!+obj.phoneNumber || +obj.name || +obj.lastName) {
    alert`Fields must be filled in correctly`;
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
  displayInfo();
});

// Displaying data on a browser page
displayInfo();
async function displayInfo() {
  let info = await fetch(API)
    .then((result) => result.json())
    .catch((error) => console.log(error));
  contentList.innerHTML = "";
  info.forEach((item) => {
    let newInfo = document.createElement("div");
    newInfo.id = item.id;
    newInfo.innerHTML = `
    <div class="panel-card">
    <div class="card">
    <img src= ${item.photoLink} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"><svg class="icons" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="indigo" class="bi bi-people-fill" viewBox="0 0 16 16">
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    </svg>${item.lastName}</h5>
       <h5 class="card-title"><svg class="icons" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="indigo" class="bi bi-person-fill" viewBox="0 0 16 16">
       <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
     </svg>${item.name}</h5>
     <h6 class="card-title"><svg  class = "icons"xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="indigo" class="bi bi-phone-flip" viewBox="0 0 16 16">
     <path fill-rule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v6a.5.5 0 0 1-1 0V2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v6a.5.5 0 0 1-1 0V2a1 1 0 0 0-1-1Zm1 13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a.5.5 0 0 0-1 0v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2a.5.5 0 0 0-1 0v2ZM1.713 7.954a.5.5 0 1 0-.419-.908c-.347.16-.654.348-.882.57C.184 7.842 0 8.139 0 8.5c0 .546.408.94.823 1.201.44.278 1.043.51 1.745.696C3.978 10.773 5.898 11 8 11c.099 0 .197 0 .294-.002l-1.148 1.148a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2a.5.5 0 1 0-.708.708l1.145 1.144L8 10c-2.04 0-3.87-.221-5.174-.569-.656-.175-1.151-.374-1.47-.575C1.012 8.639 1 8.506 1 8.5c0-.003 0-.059.112-.17.115-.112.31-.242.6-.376Zm12.993-.908a.5.5 0 0 0-.419.908c.292.134.486.264.6.377.113.11.113.166.113.169 0 .003 0 .065-.13.187-.132.122-.352.26-.677.4-.645.28-1.596.523-2.763.687a.5.5 0 0 0 .14.99c1.212-.17 2.26-.43 3.02-.758.38-.164.713-.357.96-.587.246-.229.45-.537.45-.919 0-.362-.184-.66-.412-.883-.228-.223-.535-.411-.882-.571ZM7.5 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1Z"/>
   </svg>${item.phoneNumber}</h4>
      <a href="#" class="btn btn-primary btn-primary btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal" id=${item.id}>Edit</a>
      <a href="#" class="btn btn-primary btn-delete" id=${item.id}>Delete</a>
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
      displayInfo();
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
  displayInfo();
  let modal = bootstrap.Modal.getInstance(exampleModal);
  modal.hide();
}




