const todoText = 'Buy Milk';

describe('Input form', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses input on load', () => {
    cy.focused().should('have.class', 'new-todo');
  });
  it.only('accepts input', () => {
    cy.get('.new-todo')
      .type(todoText)
      .should('have.value', todoText);
  });
});
