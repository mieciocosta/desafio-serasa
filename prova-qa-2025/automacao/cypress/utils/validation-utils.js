export const validateBoardResponse = (response, expectedName, expectedDescription = '') => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('name', expectedName);
  
  if (expectedDescription) {
    expect(response.body).to.have.property('desc', expectedDescription);
  }
  
  return response.body.id;
};

export const validateErrorResponse = (response) => {
  expect(response.status).to.be.oneOf([400, 404]);
};

export const validateSuccessResponse = (response) => {
  expect(response.status).to.eq(200);
};

export const validateListsResponse = (response, expectedLength) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.length(expectedLength);
};