const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Temporary storage
let todos = [];

// Test route
app.get("/", (req, res) => {
  res.send("To-Do Backend Running");
});

// Create todo
app.post("/todos", (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const todo = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Update todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: req.body.completed } : todo
  );
  res.json({ message: "Todo updated" });
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
