import { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function getTodos() {
      const resp = await fetch("http://localhost:3000/todos");
      const allTodos = await resp.json();
      setTodos(allTodos.result);
    }
    getTodos();
  }, [refreshKey]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> Add Todos </h1>
      <CreateTodo setRefreshKey={setRefreshKey} />
      <hr />
      <Todos todos={todos} setRefreshKey={setRefreshKey} />
    </div>
  );
}

export default App;
