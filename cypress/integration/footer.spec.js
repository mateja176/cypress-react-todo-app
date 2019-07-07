describe('Footer', () => {
  context('With a single todo', () => {
    it('Displays a singular todo in count', () => {
      cy.seedAndVisit([{ id: 1, name: 'Buy Milk', isCompete: false }]);

      cy.get('.todo-count').should('contain', '1 todo left');
    });
  });

  context('With multiple todo', () => {
    beforeEach(() => {
      cy.seedAndVisit();
    });

    it('Displays plural todo in count', () => {
      cy.get('.todo-count').should('contain', '3 todos left');
    });

    it('Filters to active todos', () => {
      cy.contains('Active').click();

      cy.get('.todo-list li').should('have.length', 3);
    });
  });
});
