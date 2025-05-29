export const validateAssertions = {
  // Validações para status codes
  statusCode: {
    success: (response) => {
      expect(response.status).to.eq(200);
    },
    
    error: (response) => {
      // A API do Trello pode retornar 400 ou 404 para recursos inválidos/excluídos
      expect(response.status).to.be.oneOf([400, 404]);
    },
    
    unauthorized: (response) => {
      expect(response.status).to.eq(401);
    }
  },
  
  // Validações para boards
  board: {
    created: (response, expectedName, expectedDescription = '') => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', expectedName);
      
      if (expectedDescription) {
        expect(response.body).to.have.property('desc', expectedDescription);
      }
      
      return response.body.id;
    },
    
    updated: (response, expectedName) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', expectedName);
    },
    
    deleted: (response) => {
      expect(response.status).to.eq(200);
    }
  },
  
  // Validações para cards
  card: {
    created: (response, expectedName, expectedDescription = '') => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name', expectedName);
      
      if (expectedDescription) {
        expect(response.body).to.have.property('desc', expectedDescription);
      }
      
      return response.body.id;
    },
    
    updated: (response, expectedName) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', expectedName);
    },
    
    deleted: (response) => {
      expect(response.status).to.eq(200);
    },
    
    commentAdded: (response, expectedText) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('text', expectedText);
    },
    
    labelAdded: (response, expectedColor, expectedName) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('color', expectedColor);
      expect(response.body).to.have.property('name', expectedName);
    }
  },
  
  // Validações para listas
  list: {
    count: (response, expectedCount) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(expectedCount);
    },
    
    minCount: (response, minCount) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.at.least(minCount);
    }
  }
};
