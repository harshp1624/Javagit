const API_URL = "http://localhost:5000/todos";
const finishedList = document.getElementById("taskList"); // Ensure this ID matches your HTML

async function loadFinishedTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        // Filter tasks that are marked as completed
        const completedTasks = tasks.filter(task => task.completed === true);
        
        finishedList.innerHTML = "";
        completedTasks.forEach(task => {
            const li = document.createElement("li");
            li.className = "completed-item"; // You can style this in CSS
            li.innerHTML = `<s>${task.title}</s>`; // Srikethrough for finished tasks
            finishedList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading finished tasks:", error);
    }
}

loadFinishedTasks();