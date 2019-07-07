describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(({ id }) => cy.request('DELETE', `/api/todos/${id}`));
  });

  it('Saves new todos', () => {
    cy.visit('/');

    cy.focused().type('Buy bread{enter}');

    cy.get('.todo-list li').should('have.length', 1);
  });
});
