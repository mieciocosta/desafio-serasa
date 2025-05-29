export const validateCardResponse = (response, expectedName, expectedDescription = '') => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('name', expectedName);
  
  if (expectedDescription) {
    expect(response.body).to.have.property('desc', expectedDescription);
  }
  
  return response.body.id;
};

export const validateCommentResponse = (response, expectedText) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('data');
  expect(response.body.data).to.have.property('text', expectedText);
};

export const validateLabelResponse = (response, expectedColor, expectedName) => {
  expect(response.status).to.eq(200);
  expect(response.body).to.have.property('color', expectedColor);
  expect(response.body).to.have.property('name', expectedName);
};
