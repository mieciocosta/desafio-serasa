// ***********************************************
// Este arquivo contém comandos personalizados para
// interagir com a API do Trello
// ***********************************************

// Comando para criar um board no Trello
Cypress.Commands.add('createBoard', (boardName, options = {}) => {
  const queryParams = {
    name: boardName,
    key: Cypress.env('apiKey'),
    token: Cypress.env('apiToken'),
    ...options
  };

  return cy.request({
    method: 'POST',
    url: '/boards',
    qs: queryParams
  }).then(response => {
    cy.log(`Board criado: ${response.body.id}`);
    return cy.wrap(response);
  });
});

// Comando para obter informações de um board
Cypress.Commands.add('getBoard', (boardId) => {
  return cy.request({
    method: 'GET',
    url: `/boards/${boardId}`,
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para atualizar um board
Cypress.Commands.add('updateBoard', (boardId, updateData) => {
  return cy.request({
    method: 'PUT',
    url: `/boards/${boardId}`,
    qs: {
      ...updateData,
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para excluir um board
Cypress.Commands.add('deleteBoard', (boardId) => {
  return cy.request({
    method: 'DELETE',
    url: `/boards/${boardId}`,
    failOnStatusCode: true,
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    cy.log(`Board excluído: ${boardId}`);
    return cy.wrap(response);
  });
});

// Comando para obter as listas de um board
Cypress.Commands.add('getLists', (boardId) => {
  return cy.request({
    method: 'GET',
    url: `/boards/${boardId}/lists`,
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para criar um card em um board específico
Cypress.Commands.add('createCard', (listId, cardName, options = {}) => {
  const queryParams = {
    idList: listId,
    name: cardName,
    key: Cypress.env('apiKey'),
    token: Cypress.env('apiToken'),
    ...options
  };

  return cy.request({
    method: 'POST',
    url: '/cards',
    qs: queryParams
  }).then(response => {
    cy.log(`Card criado: ${response.body.id}`);
    return cy.wrap(response);
  });
});

// Comando para obter informações de um card
Cypress.Commands.add('getCard', (cardId) => {
  return cy.request({
    method: 'GET',
    url: `/cards/${cardId}`,
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para atualizar um card
Cypress.Commands.add('updateCard', (cardId, updateData) => {
  return cy.request({
    method: 'PUT',
    url: `/cards/${cardId}`,
    qs: {
      ...updateData,
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para excluir um card
Cypress.Commands.add('deleteCard', (cardId) => {
  return cy.request({
    method: 'DELETE',
    url: `/cards/${cardId}`,
    failOnStatusCode: true,
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    cy.log(`Card excluído: ${cardId}`);
    return cy.wrap(response);
  });
});

// Comando para adicionar um comentário a um card
Cypress.Commands.add('addCommentToCard', (cardId, commentText) => {
  return cy.request({
    method: 'POST',
    url: `/cards/${cardId}/actions/comments`,
    qs: {
      text: commentText,
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para adicionar uma etiqueta a um card
Cypress.Commands.add('addLabelToCard', (cardId, color, name) => {
  return cy.request({
    method: 'POST',
    url: `/cards/${cardId}/labels`,
    qs: {
      color,
      name,
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    return cy.wrap(response);
  });
});

// Comando para limpar boards de teste antigos
Cypress.Commands.add('cleanupTestBoards', () => {
  return cy.request({
    method: 'GET',
    url: '/members/me/boards',
    qs: {
      key: Cypress.env('apiKey'),
      token: Cypress.env('apiToken')
    }
  }).then(response => {
    const testBoards = response.body.filter(board => 
      board.name.includes('Teste') || 
      board.name.includes('Test') || 
      board.name.includes('Atualizado')
    );
    
    cy.log(`Encontrados ${testBoards.length} boards de teste para limpeza`);
    
    if (testBoards.length > 0) {
      const deletePromises = testBoards.map(board => {
        return cy.request({
          method: 'DELETE',
          url: `/boards/${board.id}`,
          failOnStatusCode: false,
          qs: {
            key: Cypress.env('apiKey'),
            token: Cypress.env('apiToken')
          }
        });
      });
      
      return cy.wrap(deletePromises);
    }
    
    return cy.wrap([]);
  });
});
