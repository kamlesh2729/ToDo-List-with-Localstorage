const TodoListBox = document.querySelector(".todolist-container");
const Title = document.getElementById("InptTitle");
const Task = document.getElementById("InptText");
const Notification = document.querySelector(".notification");
let LSkey = "To-Do";

window.addEventListener("DOMContentLoaded", setupItems);
ToDobtn.addEventListener("click", AddTodo);

function AddTodo(e) {
  // e.preventDefault();

  let textvalA = Title.value;
  let textvalB = Task.value;
  let id = new Date().getTime().toString();

  if (textvalA && textvalB) {
    displayAlert("A new item has been added!", "notification-succes");
    createToDo(textvalA, textvalB, id);
    Addtolocalstorage(textvalA, textvalB, id);
  } else {
    displayAlert("No empty values!", "notification-danger");
  }

  Title.value = null;
  Task.value = null;
}

function displayAlert(msg, styles) {
  Notification.innerText = msg;
  Notification.classList.add(styles);
  setTimeout(() => {
    Notification.innerText = "";
    Notification.classList.remove(styles);
  }, 1500);
}

function createToDo(textvalA, textvalB, id) {
  const div = document.createElement("div");
  div.className = "todo-box";
  div.setAttribute("data-id", id);
  div.innerHTML = `<div class=todo-text> <h3 id="Title">${textvalA}</h3>
            <p id="ToDo">${textvalB}</p></div>
            <button type="submit" id="DoneBtn" class="fa-solid fa-circle-check fa-2xl"></button>
            <button type="delete" id="DeleteBtn" class="fa-solid fa-trash-can fa-xl"></button>`;

  div.querySelector("#DoneBtn").addEventListener("click", completToDo);
  div.querySelector("#DeleteBtn").addEventListener("click", deleteToDo);

  TodoListBox.append(div);
}

function completToDo() {
  this.previousElementSibling.classList.toggle("todo-done");
  // displayAlert("To-Do work is Done.", "notification-succes");
}

function deleteToDo() {
  let id = this.parentElement.dataset.id;
  TodoListBox.removeChild(this.parentElement);
  displayAlert("One To-Do removed from list!", "notification-danger-delete");

  removeFromLS(id);
}

function Addtolocalstorage(textvalA, textvalB, id) {
  let obj = { textvalA, textvalB, id };
  let items = getLS();
  items.push(obj);
  localStorage.setItem(LSkey, JSON.stringify(items));
}

function getLS() {
  return localStorage.getItem(LSkey)
    ? JSON.parse(localStorage.getItem(LSkey))
    : [];
}

function removeFromLS(id) {
  let items = getLS();
  items = items.filter((item) => item.id !== id);

  localStorage.setItem(LSkey, JSON.stringify(items));

  if (items.length === 0) {
    localStorage.removeItem(LSkey);
  }
}

function setupItems() {
  let items = getLS();
  if (items.length > 0) {
    items.forEach((item) => {
      createToDo(item.textvalA, item.textvalB, item.id);
    });
  }
}
