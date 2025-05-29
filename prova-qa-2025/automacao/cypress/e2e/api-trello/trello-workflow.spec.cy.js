/// <reference types="cypress" />

import { boardData } from '../../fixtures/test-data/board-data.js';
import { cardData } from '../../fixtures/test-data/card-data.js';
import { validateBoardResponse, validateSuccessResponse, validateErrorResponse } from '../../utils/validation-utils.js';
import { validateCardResponse } from '../../utils/card-validation-utils.js';

describe('Trello API - Fluxo Completo', () => {
  let boardId;
  let listId;
  let cardId;

  after(() => {
    if (cardId) {
      cy.deleteCard(cardId).then(() => {
        cardId = null;
      });
    }
    
    if (boardId) {
      cy.deleteBoard(boardId).then(() => {
        boardId = null;
      });
    }
  });

  it('Deve executar um fluxo completo de operações no Trello', () => {
    // Passo 1: Criar um board
    cy.createBoard(boardData.name, { desc: boardData.description })
      .then((response) => {
        cy.log('Resposta da criação do board:', JSON.stringify(response.body));
        boardId = validateBoardResponse(response, boardData.name, boardData.description);
        
        // Passo 2: Obter as listas do board
        cy.getLists(boardId)
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.length.at.least(1);
            
            listId = response.body[0].id;
            
            // Passo 3: Criar um card
            cy.createCard(listId, cardData.name, { desc: cardData.description })
              .then((response) => {
                cardId = validateCardResponse(response, cardData.name, cardData.description);
                
                // Passo 4: Atualizar o card
                cy.updateCard(cardId, { name: cardData.updatedName })
                  .then((response) => {
                    validateCardResponse(response, cardData.updatedName, cardData.description);
                    
                    // Passo 5: Adicionar um comentário ao card
                    cy.addCommentToCard(cardId, cardData.commentText)
                      .then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.body.data.text).to.eq(cardData.commentText);
                        
                        // Passo 6: Excluir o card
                        cy.deleteCard(cardId)
                          .then((response) => {
                            validateSuccessResponse(response);
                            cardId = null;
                            
                            // Passo 7: Atualizar o board
                            cy.updateBoard(boardId, { name: boardData.updatedName })
                              .then((response) => {
                                validateBoardResponse(response, boardData.updatedName);
                                
                                // Passo 8: Excluir o board
                                cy.deleteBoard(boardId)
                                  .then((response) => {
                                    validateSuccessResponse(response);
                                    boardId = null;
                                    
                                    // Passo 9: Verificar que o board foi excluído
                                    cy.request({
                                      method: 'GET',
                                      url: `/boards/${boardId}`,
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
              });
          });
      });
  });
});
