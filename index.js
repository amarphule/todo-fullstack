const express = require("express");
const { createTodo, updateTodo } = require("./types");

const app = express();

app.use(express.json());

app.post("/todo", function (req, res) {
  const createdpayload = req.body;
  const parsedpayload = createTodo.safeParse(createdpayload);
  if (!parsedpayload.success) {
    res.status(411).json({
      message: "You sent wrong inputs",
    });
    return;
  }
  //  implement mongodb logic
});

app.get("/todos", function (req, res) {});

app.put("/completed", function (req, res) {
  const updateTodoPayload = req.body;
  const parsedpayload = updateTodo.safeParse(updateTodoPayload);
  if (!parsedpayload.success) {
    res.status(411).json({
      message: "You sent wrong ID",
    });
    return;
  }
  //  implement mongodb logic
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
