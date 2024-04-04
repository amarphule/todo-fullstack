const mongoose = require("mongoose");

async function DbConnection() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected to mongoDB database");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
  }
}
DbConnection();

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
