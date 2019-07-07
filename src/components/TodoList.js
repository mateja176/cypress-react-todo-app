import React from 'react';

const TodoItem = ({
  name, isComplete, deleteTodo, toggleComplete,
}) => (
  <li className={isComplete ? 'completed' : null}>
    <div className="view">
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <input
          className="todo-item"
          type="checkbox"
          style={{ marginRight: 20 }}
          checked={isComplete}
          onChange={toggleComplete}
        />
        {name}
      </label>
      <button type="button" className="destroy" onClick={deleteTodo} onKeyUp={deleteTodo} />
    </div>
  </li>
);

export default ({ todos, deleteTodo, toggleComplete }) => (
  <ul className="todo-list">
    {todos.map(({ id, ...todo }) => (
      <TodoItem
        key={id}
        {...todo}
        deleteTodo={() => deleteTodo(id)}
        toggleComplete={() => toggleComplete(id)}
      />
    ))}
  </ul>
);
