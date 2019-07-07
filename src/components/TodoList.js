import React from 'react';

const TodoItem = ({ name, isComplete, deleteTodo }) => (
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
      <button type="button" className="destroy" onClick={deleteTodo} onKeyUp={deleteTodo} />
    </div>
  </li>
);

export default ({ todos, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map(({ id, ...todo }) => (
      <TodoItem key={id} {...todo} deleteTodo={() => deleteTodo(id)} />
    ))}
  </ul>
);
