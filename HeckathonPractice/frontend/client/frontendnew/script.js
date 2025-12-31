const API_URL = "http://localhost:5000/todos"; 
let tasks = [];

// Get elements from HTML
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const inputBox = document.getElementById("inputBox");
const fabRight = document.querySelector(".fab-right");
const fabLeft = document.querySelector(".fab-left");

// 1. GET TASKS FROM THE SERVER
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        tasks = await response.json();
        renderTasks();
    } catch (error) {
        console.error("Server not running?", error);
    }
}

// 2. RENDER TASKS 
function renderTasks() {
    if (!taskList) return; 
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        if (!task.completed) { 
            const li = document.createElement("li");
            li.innerHTML = `
                ${task.title}
                <input type="checkbox" onclick="finishTask(${task.id})">
            `;
            taskList.appendChild(li);
        }
    });
}

// 3. ADD TASK TO THE SERVER
async function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: text }) 
        });

        taskInput.value = "";
        closeInput(); // Closes the entry panel
        fetchTasks(); // Refresh the list
    } catch (error) {
        console.error("Failed to add task:", error);
    }
}

// 4. MARK TASK AS DONE ON SERVER
async function finishTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true })
        });
        fetchTasks();
    } catch (error) {
        console.error("Failed to update task:", error);
    }
}

// --- UI FUNCTIONS (Re-added to fix the "Red" errors) ---

function openInput() {
    if (inputBox) {
        inputBox.style.bottom = "0";
        if (fabRight) fabRight.style.display = "none";
        if (fabLeft) fabLeft.style.display = "none";
        setTimeout(() => taskInput.focus(), 100);
    }
}

function closeInput() {
    if (inputBox) {
        inputBox.style.bottom = "-150px";
        if (fabRight) fabRight.style.display = "block";
        if (fabLeft) fabLeft.style.display = "block";
    }
}

// Listen for Enter key
if (taskInput) {
    taskInput.addEventListener("keydown", function(e){
        if(e.key === "Enter") addTask();
    });
}

// Start app
fetchTasks();