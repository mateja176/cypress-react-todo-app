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
    beforeEach(() => {
      cy.server();
    });

    it('Adds a new todo on submit', () => {
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

    it.only('Shows an error message on a failed submission', () => {
      cy.route({
        url: '/api',
        method: 'POST',
        status: 500,
        response: {},
      });

      cy.get('.new-todo').type('test{enter}');

      cy.get('.todo-list li').should('not.exist');

      cy.get('.error').should('be.visible');
    });
  });
});
