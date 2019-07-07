import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { deleteTodo, loadTodos, saveTodo } from '../lib/service';
import Footer from './Footer';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = { todos: [], currentTodo: '', error: '' };
  }

  componentDidMount() {
    loadTodos()
      .then(({ data: todos }) => this.setState({ todos }))
      .catch(() => this.setError('Failed to load'));
  }

  setError(error) {
    this.setState({ error });
  }

  render() {
    const {
      state: { todos, currentTodo, error },
    } = this;

    const remaining = todos.filter(({ isComplete }) => !isComplete).length;

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
                  .catch(() => this.setError('Failed to add'));
              }}
            />
          </header>
          <section className="main">
            <TodoList
              todos={todos}
              deleteTodo={id => deleteTodo(id).then(() => {
                const newTodos = todos.filter(todo => todo.id !== id);
                this.setState({ todos: newTodos });
              })
              }
            />
          </section>
          <Footer remaining={remaining} />
        </div>
      </Router>
    );
  }
}
