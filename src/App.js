import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { text: input, completed: false, timestamp: Date.now() }]);
      setInput('');
    }
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = true;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const sortedTodos = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return a.timestamp - b.timestamp;
    }
    return a.completed ? 1 : -1;
  });

  return (
   <>
    <div className="TodoApp">
      <header className="App-header">
        <h1>TODO APP</h1>
      </header>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="add-button">
          Add
        </button>
      </div>
      
      <button onClick={resetTodos} className="reset-button">
    Reset
  </button>
      <TodoList todos={sortedTodos} completeTodo={completeTodo} deleteTodo={deleteTodo} />
    </div>
   
   </>
  );
}

export default TodoApp;
