import { useEffect, useState } from "react";

const fetchQuery = async ({ uri, method = "GET", body = null }) => {
  const response = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== null ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [patchId, setPatchId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuery({ uri: "http://localhost:4000/todo" });
      setTodos(data.todos);
    };
    fetchData();
  }, [todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      text: todo,
      completed: false,
    };

    const data = await fetchQuery({
      uri: "http://localhost:4000/todo",
      method: "POST",
      body: newTodo,
    });
    setTodos([...todos, data.todo.text]);
    setTodo("");
  };

  const handleEdit = async (id) => {
    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    setTodo(data.todo.text);

    setPatchId(data.todo._id);
    console.log(patchId);
  };

  const handleUpdate = async (id) => {
    const newTodo = {
      text: todo,
      completed: false,
    };
    console.log(id);
    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    const data = await response.json();

    // setTodos([...todos, data.todo.text]);
    setTodo("");
  };

  const toggleCompleted = async (id) => {
    await fetchQuery({
      uri: `http://localhost:4000/todo/${id}/toggle`,
      method: "PATCH",
    });
  };

  const handleDelete = async (id) => {
    await fetchQuery({
      uri: `http://localhost:4000/todo/${id}`,
      method: "DELETE",
    });
  };

  return (
    <div className="todo">
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => toggleCompleted(todo._id)}>
              {todo.completed ? "Completed" : "Incomplete"}
            </button>

            <button onClick={() => handleEdit(todo._id)}>Edit</button>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Todo</button>

        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <button onClick={() => handleUpdate(patchId)}>Update</button>
    </div>
  );
};

export default Todo;
