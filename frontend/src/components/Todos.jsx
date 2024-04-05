const Todos = ({ todos, setRefreshKey }) => {
  const handleMarkComplete = async (id) => {
    console.log("id ", id);
    try {
      const resp = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!resp.ok) {
        throw new Error("Id is not present");
      }
      setRefreshKey((prev) => prev + 1);
      console.log("Marked as completed");
    } catch (error) {
      console.log("Incorrect id");
    }
  };
  return (
    <div className="todo_container">
      {todos.map((todo) => {
        return (
          <div key={todo._id} className="todo">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <button
              disabled={todo.completed}
              onClick={() => handleMarkComplete(todo._id)}
            >
              {todo.completed ? "Completed" : "Mark as complete"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
