export const testCleanup = {
  cleanupCard: (cardId) => {
    if (cardId) {
      cy.request({
        method: 'DELETE',
        url: `/cards/${cardId}`,
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then(() => {
        return null;
      });
    }
  }
};
