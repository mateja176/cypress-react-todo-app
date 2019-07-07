import React from 'react';

export default ({ currentTodo, setCurrentTodo }) => (
  <form>
    <input
      type="text"
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={currentTodo}
      onChange={({ target: { value } }) => setCurrentTodo(value)}
    />
  </form>
);
