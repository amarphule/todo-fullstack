import { useState } from "react";

const CreateTodo = ({ setRefreshKey }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddTodo = async () => {
    if (!(title && description)) {
      setError(true);
      return;
    }
    try {
      setError(false);

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
      setError(false);
      setRefreshKey((prev) => prev + 1);
      console.log("Successfully created todo");
    } catch (error) {
      console.log("Error creating todo ", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError(false);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError(false);
  };
  return (
    <div className="container">
      <input
        className="box"
        type="text"
        placeholder="Todo Title"
        onChange={handleTitleChange}
        value={title}
      />
      <input
        className="box"
        type="text"
        placeholder="Todo Description"
        onChange={handleDescriptionChange}
        value={description}
      />
      {error && <span style={{ color: "red" }}>All fields are required</span>}
      <button className="btn" onClick={handleAddTodo}>
        Add TODO
      </button>
    </div>
  );
};

export default CreateTodo;
