import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, deleteTodo, updateTodo }) {
  const [editMode, setMode] = useState(false);
  const [value, setValue] = useState("");

  const editTodo = () => {
    setMode(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    updateTodo(value, index);
    setMode(false);
  };

  if (editMode) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            className="input"
            value={value}
            placeholder="Edit To-Do"
            onChange={e => setValue(e.target.value)}
          />
        </form>
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        className="todo"
      >
        {todo.text}
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => deleteTodo(index)}>Delete</button>
          <button onClick={() => editTodo(index)}>Edit</button>
        </div>
      </div>
    );
  }
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Add To-Do"
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Build Todo-App",
      isCompleted: false
    },
    {
      text: "Buy groceries",
      isCompleted: false
    },
    {
      text: "Clean apartment",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const updateTodo = (text, index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1, { text });
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            // key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
