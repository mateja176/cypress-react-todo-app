import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadTodos, saveTodo } from '../lib/service';
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [], currentTodo: '', error: '' };

    this.setError.bind(this);
  }

  componentDidMount() {
    loadTodos()
      .then(({ data: todos }) => this.setState({ todos }))
      .catch(this.setError());
  }

  setError() {
    this.setState({ error: 'Failed to add' });
  }

  render() {
    const {
      setError,
      state: { todos, currentTodo, error },
    } = this;

    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {error ? <span className="error">{error}</span> : null}
            <TodoForm
              currentTodo={currentTodo}
              setCurrentTodo={todo => this.setState({ currentTodo: todo })}
              onSubmit={() => {
                saveTodo(currentTodo)
                  .then(({ data: todo }) => {
                    this.setState({ todos: todos.concat(todo) });
                  })
                  .catch(setError);
              }}
            />
          </header>
          <section className="main">
            <TodoList todos={todos} />
          </section>
          <Footer />
        </div>
      </Router>
    );
  }
}
