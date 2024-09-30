// LogOut function
let token = JSON.parse(localStorage.getItem("token"));

if (token === null) {
  window.location.href = "/Frontend/login/login.html";
}

function Logout() {
  localStorage.removeItem("token");
}
const baseUrl = "http://localhost:3000";

getAllTodo();

async function AddTask() {
  let userId = JSON.parse(localStorage.getItem("userId"));
  console.log("userId",userId)
  let data = document.getElementById("task-input").value;

  let formData = {
    userId: userId,
    title: data,
  };

  try {
    await fetch(`${baseUrl}/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    document.getElementById("task-input").value = "";
  } catch (error) {
    console.log("error", error);
  } finally {
    getAllTodo();
  }
}

async function getAllTodo() {
  try {
    let response = await fetch(`${baseUrl}/todo/read`);
    let data = await response.json();

    let todoArray = data.data;
    let mainDiv = document.getElementById("tasks");
    mainDiv.innerHTML = "";

    todoArray.forEach((elem) => {
      let child = document.createElement("div");
      child.className =
        "task d-flex justify-content-between align-items-center mt-3";
      child.innerHTML = `
        <span class="task-name">${elem.title}</span>
        <div>
          <button class="btn btn-success edit-btn text-white mx-2"
          onClick="editTodo('${elem._id}')">Edit</button>
          <button class="btn btn-danger delete-btn text-white" onClick="deleteTodo('${elem._id}')">Delete</button>
        </div>`;
      mainDiv.appendChild(child); // Append the new child element
    });
  } catch (error) {
    console.log("error", error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${baseUrl}/todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    getAllTodo();
    return;
  } catch (error) {
    console.log("error", error);
  }
}

async function editTodo(id) {
  try {
    let response = await fetch(`${baseUrl}/todo/single/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();

    document.getElementById("task-input").value = data.data.title;

    localStorage.setItem("editId", JSON.stringify(id));

    let addBtn = document.getElementById("add-btn");
    addBtn.classList.add("d-none");

    let updateBtn = document.getElementById("update-btn");
    updateBtn.classList.remove("d-none");
    updateBtn.classList.add(
      "d-block",
      "btn",
      "btn-dark",
      "text-white",
      "mx-3",
      "my-3",
      "my-sm-0"
    );
  } catch (error) {
    console.log("error", error);
  }
}

async function EditTask() {
  let value = document.getElementById("task-input").value;
  let id = JSON.parse(localStorage.getItem("editId"));

  let formData = {
    id: id,
    title: value,
  };

  try {
    await fetch(`${baseUrl}/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    document.getElementById("task-input").value = "";
    localStorage.removeItem("editId");

    let addBtn = document.getElementById("add-btn");
    addBtn.classList.remove("d-none");

    let updateBtn = document.getElementById("update-btn");
    updateBtn.classList.remove("d-block");
    updateBtn.classList.add(
      "d-none",
      "btn",
      "btn-dark",
      "text-white",
      "mx-3",
      "my-3",
      "my-sm-0"
    );
  } catch (error) {
    console.log("error", error);
  } finally {
    getAllTodo();
  }
}
