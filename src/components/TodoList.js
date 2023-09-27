import React from 'react';

function TodoList({ todos, completeTodo, deleteTodo }) {
  return (
    <div className="TodoList">
      {todos.map((todo, index) => (
        <div key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <div className="task-number">Task {index + 1}</div>
          <div className="task-text">{todo.text}</div>
          <div className="button-container">
            {!todo.completed && (
              <button onClick={() => completeTodo(index)} className="complete-button">
                Complete
              </button>
            )}
            <button onClick={() => deleteTodo(index)} className="delete-button">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
