const todoText = 'Buy Milk';

describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });

  it('accepts input', () => {
    cy.get('.new-todo')
      .type(todoText)
      .should('have.value', todoText);
  });

  context('Form Submission', () => {
    it.only('Adds a new todo on submit', () => {
      cy.server();
      cy.route('POST', '/api/todos', () => ({
        name: todoText,
        id: 1,
        isComplete: false,
      }));

      cy.get('.new-todo')
        .type(todoText)
        .type('{enter}');

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', todoText);
    });
  });
});
