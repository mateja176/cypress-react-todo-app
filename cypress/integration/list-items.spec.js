describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit();
  });

  it.only('Properly displays completed items', () => {
    cy.get('.todo-list li')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('#todo')
      .should('be.checked');
  });
});
