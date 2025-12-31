let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const list = document.getElementById("finishedList");

function renderFinished() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    if (task.done) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${task.text}
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      `;
      list.appendChild(li);
    }
  });
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if(newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderFinished();
  }
}

// Delete task
function deleteTask(index) {
  if(confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index,1);
    saveTasks();
    renderFinished();
  }
}

// Save to "backend"
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Back to main page
function goBack() {
  window.location.href = "index.html";
}

renderFinished();
