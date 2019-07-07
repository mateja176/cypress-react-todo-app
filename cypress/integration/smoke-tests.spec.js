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

      cy.get('.new-todo').clear();
    });
  });

  context('With active todos', () => {
    beforeEach(() => {
      cy.fixture('todos').each((todo) => {
        const newTodo = { ...todo, isComplete: false };

        cy.request('POST', '/api/todos', newTodo);
      });
      cy.visit('/');
    });

    it('Loads existing data from the DB', () => {
      cy.get('.todo-list li').should('have.length', 4);
    });

    it('Deletes todos', () => {
      cy.server();

      cy.route('DELETE', '/api/todos/*').as('delete');

      cy.get('.todo-list li')
        .each(item => cy
          .wrap(item)
          .find('.destroy')
          .invoke('show')
          .click())
        .should('not.exist');
    });

    it.only('Toggles todos', () => {
      const clickAndWait = (item) => {
        cy.wrap(item)
          .as('item')
          .find('.todo-item')
          .click();

        cy.wait('@update');
      };

      cy.server();

      cy.route('PUT', '/api/todos/*').as('update');

      cy.get('.todo-list li')
        .each((item) => {
          clickAndWait(item);

          cy.get('@item').should('have.class', 'completed');
        })
        .each((item) => {
          clickAndWait(item);

          cy.get('@item').should('not.have.class', 'completed');
        });
    });
  });
});
