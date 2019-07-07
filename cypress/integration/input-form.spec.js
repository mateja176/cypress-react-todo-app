const url = 'http://localhost:3030';

const todoText = 'Buy Milk';

describe('Input form', () => {
  it('focuses input on load', () => {
    cy.visit(url);

    cy.focused().should('have.class', 'new-todo');
  });
  it.only('accepts input', () => {
    cy.visit(url);

    cy.get('.new-todo')
      .type(todoText)
      .should('have.value', todoText);
  });
});
