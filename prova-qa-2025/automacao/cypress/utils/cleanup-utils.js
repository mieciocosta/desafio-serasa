export const testCleanup = {
  cleanupCard: (cardId) => {
    if (cardId) {
      return cy.request({
        method: 'DELETE',
        url: `/cards/${cardId}`,
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        return cy.wrap(response);
      });
    } else {
      // Retorna uma promise resolvida quando não há cardId
      return cy.wrap(null);
    }
  }
};
