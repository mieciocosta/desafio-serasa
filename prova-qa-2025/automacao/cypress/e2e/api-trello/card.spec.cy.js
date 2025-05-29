/// <reference types="cypress" />

import { cardData } from '../../fixtures/test-data/card-data.js';
import { boardData } from '../../fixtures/test-data/board-data.js';
import { validateCardResponse, validateCommentResponse, validateLabelResponse } from '../../utils/card-validation-utils.js';
import { validateErrorResponse, validateSuccessResponse } from '../../utils/validation-utils.js';
import { testCleanup } from '../../utils/card-cleanup-utils.js';

describe('Trello API - Card Operations', () => {
  let boardId;
  let listId;
  let cardId;

  before(() => {
    cy.cleanupTestBoards();
    
    cy.createBoard(boardData.name)
      .then((response) => {
        boardId = response.body.id;
        
        cy.getLists(boardId)
          .then((listsResponse) => {
            expect(listsResponse.status).to.eq(200);
            expect(listsResponse.body).to.have.length.at.least(1);
            
            listId = listsResponse.body[0].id;
          });
      });
  });

  afterEach(() => {
    if (cardId) {
      // Usando cy.wrap para garantir que sempre temos uma promise válida
      cy.wrap(cardId).then((id) => {
        return testCleanup.cleanupCard(id);
      }).then(() => {
        cardId = null;
      });
    }
  });

  after(() => {
    if (boardId) {
      cy.request({
        method: 'DELETE',
        url: `/boards/${boardId}`,
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then(() => {
        boardId = null;
      });
    }
  });

  context('Cenários positivos', () => {
    it('Deve cadastrar um novo card com sucesso', () => {
      cy.wrap(listId).should('not.be.undefined');
      
      cy.createCard(listId, cardData.name, { desc: cardData.description })
        .then((response) => {
          cardId = validateCardResponse(response, cardData.name, cardData.description);
        });
    });

    it('Deve obter informações de um card existente', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          cardId = response.body.id;
          
          cy.getCard(cardId)
            .then((response) => {
              validateCardResponse(response, cardData.name);
            });
        });
    });

    it('Deve atualizar um card existente', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          cardId = response.body.id;
          
          cy.updateCard(cardId, { name: cardData.updatedName })
            .then((response) => {
              validateCardResponse(response, cardData.updatedName);
              
              cy.getCard(cardId)
                .then((response) => {
                  expect(response.body.name).to.eq(cardData.updatedName);
                });
            });
        });
    });

    it('Deve excluir um card com sucesso', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          cardId = response.body.id;
          
          cy.deleteCard(cardId)
            .then((response) => {
              validateSuccessResponse(response);
              
              cy.request({
                method: 'GET',
                url: `/cards/${cardId}`,
                failOnStatusCode: false,
                qs: {
                  key: Cypress.env('apiKey'),
                  token: Cypress.env('apiToken')
                }
              }).then((response) => {
                validateErrorResponse(response);
                cardId = null;
              });
            });
        });
    });

    it('Deve adicionar um comentário a um card', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          cardId = response.body.id;
          
          cy.addCommentToCard(cardId, cardData.commentText)
            .then((response) => {
              validateCommentResponse(response, cardData.commentText);
            });
        });
    });

    it('Deve adicionar uma etiqueta a um card', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          cardId = response.body.id;
          
          cy.addLabelToCard(cardId, cardData.labelColor, cardData.labelName)
            .then((response) => {
              validateLabelResponse(response, cardData.labelColor, cardData.labelName);
            });
        });
    });
  });

  context('Cenários negativos', () => {
    it('Deve falhar ao tentar criar um card sem nome ou validar o comportamento real', () => {
      cy.request({
        method: 'POST',
        url: '/cards',
        failOnStatusCode: false,
        qs: {
          idList: listId,
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', '');
        
        if (response.body.id) {
          cy.deleteCard(response.body.id);
        }
      });
    });

    it('Deve falhar ao tentar criar um card em uma lista inexistente', () => {
      const nonExistentListId = 'abc123invalidlistid';
      
      cy.request({
        method: 'POST',
        url: '/cards',
        failOnStatusCode: false,
        qs: {
          idList: nonExistentListId,
          name: cardData.name,
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it('Deve falhar ao tentar obter um card inexistente', () => {
      const nonExistentCardId = 'abc123invalidcardid';
      
      cy.request({
        method: 'GET',
        url: `/cards/${nonExistentCardId}`,
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        validateErrorResponse(response);
      });
    });

    it('Deve falhar ao tentar excluir um card já excluído', () => {
      cy.createCard(listId, cardData.name)
        .then((response) => {
          const tempCardId = response.body.id;
          
          cy.deleteCard(tempCardId)
            .then(() => {
              cy.request({
                method: 'DELETE',
                url: `/cards/${tempCardId}`,
                failOnStatusCode: false,
                qs: {
                  key: Cypress.env('apiKey'),
                  token: Cypress.env('apiToken')
                }
              }).then((response) => {
                validateErrorResponse(response);
              });
            });
        });
    });
  });
});
