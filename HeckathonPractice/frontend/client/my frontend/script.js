
// Simulated backend with localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const inputBox = document.getElementById("inputBox");
const taskInput = document.getElementById("taskInput");
const fabRight = document.querySelector(".fab-right");
const fabLeft = document.querySelector(".fab-left");

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (!task.done) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${task.text}
        <input type="checkbox" onclick="finishTask(${index})">
      `;
      taskList.appendChild(li);
    }
  });
}

// Open input panel & hide buttons
function openInput() {
  inputBox.style.bottom = "0";
  fabRight.style.display = "none";
  fabLeft.style.display = "none";
  setTimeout(() => taskInput.focus(), 100);
}

// Close input panel & show buttons
function closeInput() {
  inputBox.style.bottom = "-150px";
  fabRight.style.display = "block";
  fabLeft.style.display = "block";
}

// Add task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  saveTasks();
  taskInput.value = "";
  closeInput();
  renderTasks();
}

// Add task on Enter
taskInput.addEventListener("keydown", function(e){
  if(e.key === "Enter") addTask();
});

// Finish task
function finishTask(index) {
  tasks[index].done = true;
  saveTasks();
  renderTasks();
}

// Save to "backend"
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Go to finished tasks page
function goFinished() {
  window.location.href = "finished.html";
}

renderTasks();
