document.addEventListener("DOMContentLoaded", loadTasks);
const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = input.value.trim();
  if (!taskText) return;

  const task = { text: taskText, done: false };
  saveTask(task);
  renderTask(task);
  input.value = "";
}

function renderTask(task, index = tasks.length - 1) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("done");
  li.textContent = task.text;

  li.onclick = () => {
    task.done = !task.done;
    saveTasksToStorage();
    li.classList.toggle("done");
  };

  const btn = document.createElement("button");
  btn.textContent = "✖";
  btn.className = "delete-btn";
  btn.onclick = (e) => {
    e.stopPropagation();
    deleteTask(index);
  };

  li.appendChild(btn);
  taskList.appendChild(li);
}

let tasks = [];

function saveTask(task) {
  tasks.push(task);
  saveTasksToStorage();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToStorage();
  refreshList();
}

function saveTasksToStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  tasks = saved ? JSON.parse(saved) : [];
  refreshList();
}

function refreshList() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => renderTask(task, index));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}
