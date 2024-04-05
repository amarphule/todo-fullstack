import { useState } from "react";

const CreateTodo = ({ setRefreshKey }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTodo = async () => {
    try {
      const resp = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!resp.ok) {
        throw new Error("Failed to create todo");
      }
      setTitle("");
      setDescription("");
      setRefreshKey((prev) => prev + 1);
      console.log("Successfully created todo");
    } catch (error) {
      console.log("Error creating todo ", error);
    }
  };
  return (
    <div className="container">
      <input
        className="box"
        type="text"
        placeholder="Todo Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className="box"
        type="text"
        placeholder="Todo Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button className="btn" onClick={handleAddTodo}>
        Add TODO
      </button>
    </div>
  );
};

export default CreateTodo;
