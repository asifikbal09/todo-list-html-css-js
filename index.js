const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = todo.done ? "done" : "";
    li.innerHTML = `
  <input type="checkbox" ${
    todo.done ? "checked" : ""
  } onchange="toggleDone(${index})">
  <span class="${todo.done ? "done-text" : ""}">${todo.text}</span>
  <button class="delete-btn" onclick="deleteTodo(${index}); event.stopPropagation()">X</button>
`;
    li.onclick = () => toggleDone(index);
    list.appendChild(li);
  });
}

function addTodo() {
  const text = input.value.trim();
  if (text !== "") {
    todos.push({ text, done: false });
    input.value = "";
    saveToLocalStorage();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveToLocalStorage();
  renderTodos();
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveToLocalStorage();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

renderTodos();
