import React from 'react';
import { Link } from 'react-router-dom';

export default ({ remaining }) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{remaining}</strong>
      {' '}
todos left
    </span>
    <ul className="filters">
      <li>
        <Link to="/">All</Link>
      </li>
      {' '}
      <li>
        <Link to="/active">Active</Link>
      </li>
      {' '}
      <li>
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
  </footer>
);
