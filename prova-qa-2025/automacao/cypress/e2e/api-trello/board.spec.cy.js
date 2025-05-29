/// <reference types="cypress" />

import { boardData } from '../../fixtures/test-data/board-data.js';
import { validateBoardResponse, validateSuccessResponse, validateErrorResponse } from '../../utils/validation-utils.js';
import { testCleanup } from '../../utils/cleanup-utils.js';

describe('Trello API - Board Operations', () => {
  let boardId;

  before(() => {
    cy.cleanupTestBoards();
  });

  afterEach(() => {
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
    it('Deve cadastrar um novo board com sucesso', () => {
      cy.createBoard(boardData.name, { desc: boardData.description })
        .then((response) => {
          boardId = validateBoardResponse(response, boardData.name, boardData.description);
        });
    });

    it('Deve obter informações de um board existente', () => {
      cy.createBoard(boardData.name)
        .then((response) => {
          boardId = response.body.id;
          
          cy.getBoard(boardId)
            .then((response) => {
              validateBoardResponse(response, boardData.name);
            });
        });
    });

    it('Deve atualizar um board existente', () => {
      cy.createBoard(boardData.name)
        .then((response) => {
          boardId = response.body.id;
          
          cy.updateBoard(boardId, { name: boardData.updatedName })
            .then((response) => {
              validateBoardResponse(response, boardData.updatedName);
              
              cy.getBoard(boardId)
                .then((response) => {
                  expect(response.body.name).to.eq(boardData.updatedName);
                });
            });
        });
    });

    it('Deve excluir um board com sucesso', () => {
      cy.createBoard(boardData.name)
        .then((response) => {
          boardId = response.body.id;
          
          cy.deleteBoard(boardId)
            .then((response) => {
              validateSuccessResponse(response);
              
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
                boardId = null;
              });
            });
        });
    });

    it('Deve criar um board sem listas padrão', () => {
      cy.createBoard(boardData.name, { defaultLists: false })
        .then((response) => {
          boardId = response.body.id;
          
          cy.getLists(boardId)
            .then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body).to.have.length(0);
            });
        });
    });
  });

  context('Cenários negativos', () => {
    it('Deve falhar ao tentar criar um board sem nome', () => {
      cy.request({
        method: 'POST',
        url: '/boards',
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 404]);
        expect(response.body).to.have.property('message');
      });
    });

    it('Deve falhar ao tentar obter um board inexistente', () => {
      const nonExistentBoardId = 'abc123invalidboardid';
      
      cy.request({
        method: 'GET',
        url: `/boards/${nonExistentBoardId}`,
        failOnStatusCode: false,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        }
      }).then((response) => {
        validateErrorResponse(response);
      });
    });

    it('Deve falhar ao tentar excluir um board já excluído', () => {
      cy.createBoard(boardData.name)
        .then((response) => {
          const tempBoardId = response.body.id;
          
          cy.deleteBoard(tempBoardId)
            .then(() => {
              cy.request({
                method: 'DELETE',
                url: `/boards/${tempBoardId}`,
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
