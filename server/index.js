const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

const ctrl = require("./controller.js")

app.get("/api/compliment", ctrl.getCompliments)

app.get("/api/fortune", ctrl.getFortune)

app.get("/api/todo", ctrl.getTodo)
app.delete("/api/todo/:id", ctrl.deleteTodo)
app.post("/api/todo", ctrl.addTodo)
app.put("/api/todo/:id", ctrl.editTodo)

app.listen(4000, () => console.log("Server running on 4000"));
