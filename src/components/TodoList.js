import React from 'react';

const TodoItem = ({ name, isComplete, removeTodo }) => (
  <li className={isComplete ? 'completed' : ''}>
    <div className="view">
      <label
        htmlFor="todo"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input id="todo" type="checkbox" checked={isComplete} style={{ marginRight: 20 }} />
        {name}
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
