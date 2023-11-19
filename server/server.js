//====== Create a MySQL Connection ======
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todos-app",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL successfully");
});

//====== Define Routes ======

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());


// Route to get all todos
app.get("/todos", (req, res) => {
  const query = "SELECT * FROM todos";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching todos:", err);
      res.status(500).send("Error fetching todos");
      return;
    }
    res.json(results);
  });
});

// Route to add a todo
app.post("/todos", (req, res) => {
  const { title, status } = req.body;
  const query = "INSERT INTO todos (title, status) VALUES (?, ?)";
  connection.query(query, [title, status], (err, result) => {
    if (err) {
      console.error("Error adding todo:", err);
      res.status(500).send("Error adding todo");
      return;
    }
    res.json({ id: result.insertId });
  });
});

// Route to update a todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { title, status } = req.body;
  const query = "UPDATE todos SET title = ?, status = ? WHERE id = ?";
  connection.query(query, [title, status, id], (err, result) => {
    if (err) {
      console.error("Error updating todo:", err);
      res.status(500).send("Error updating todo");
      return;
    }
    res.json({ message: "Todo updated successfully" });
  });
});

// Route to delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM todos WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting todo:", err);
      res.status(500).send("Error deleting todo");
      return;
    }
    res.json({ message: "Todo deleted successfully" });
  });
});

// ==== Start the Server ====

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
