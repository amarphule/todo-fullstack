require("dotenv").config();

const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.post("/todo", async function (req, res) {
  const createdpayload = req.body;
  const parsedpayload = createTodo.safeParse(createdpayload);
  if (!parsedpayload.success) {
    res.status(411).json({
      message: "You sent wrong inputs",
    });
    return;
  }
  //  implement mongodb logic
  try {
    await Todo.create({
      title: createdpayload.title,
      description: createdpayload.description,
      completed: false,
    });
    res.json({
      msg: "Todo created",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.get("/todos", async function (req, res) {
  try {
    const result = await Todo.find();
    res.json({
      result,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

app.put("/completed", async function (req, res) {
  const updateTodoPayload = req.body;
  const parsedpayload = updateTodo.safeParse(updateTodoPayload);
  if (!parsedpayload.success) {
    res.status(411).json({
      message: "You sent wrong ID",
    });
    return;
  }
  //  implement mongodb logic
  try {
    await Todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
    res.json({
      msg: "Marked as completed",
    });
  } catch (error) {
    res.json({
      msg: "Does not mark as complete",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
