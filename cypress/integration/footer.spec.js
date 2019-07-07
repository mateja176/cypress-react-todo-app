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

    it('Handles filter links', () => {
      const filters = [
        { linkText: 'Active', expectedLength: 3 },
        { linkText: 'Completed', expectedLength: 1 },
        { linkText: 'All', expectedLength: 4 },
      ];
      cy.wrap(filters).each(({ linkText, expectedLength }) => {
        cy.contains(linkText).click();

        cy.get('.todo-list li').should('have.length', expectedLength);
      });
    });
  });
});
