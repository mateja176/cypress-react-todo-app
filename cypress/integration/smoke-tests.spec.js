describe('Smoke tests', () => {
  beforeEach(() => {
    cy.request('GET', '/api/todos')
      .its('body')
      .each(({ id }) => cy.request('DELETE', `/api/todos/${id}`));
  });

  it('Saves new todos', () => {
    const items = [
      { name: 'Buy Milk', expectedLength: 1 },
      { name: 'Buy Bread', expectedLength: 2 },
      { name: 'Buy Orange Juice', expectedLength: 3 },
    ];

    cy.visit('/');

    cy.server();

    cy.route('POST', '/api/todos').as('create');

    cy.wrap(items).each(({ name, expectedLength }) => {
      cy.focused()
        .type(name)
        .type('{enter}');

      cy.wait('@create');

      cy.get('.todo-list li').should('have.length', expectedLength);
    });
  });
});
