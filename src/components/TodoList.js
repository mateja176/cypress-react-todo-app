import React from 'react';

const TodoItem = ({ name, isComplete, removeTodo }) => (
  <li>
    <div className="view">
      <label htmlFor="todo">
        {name}
        <input id="todo" className="toggle" type="checkbox" checked={isComplete} />
      </label>
      <button type="button" className="destroy" onClick={removeTodo} onKeyUp={removeTodo} />
    </div>
  </li>
);

export default ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem key={todo.id} {...todo} />
    ))}
  </ul>
);
