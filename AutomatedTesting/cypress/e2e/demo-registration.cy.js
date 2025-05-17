describe('SC_01: Verify the functionality of end-to-end form submission', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('TC_01 - Verify form submission with all empty fields', () => {
    cy.get('#submit').click();
    cy.get('#firstName:invalid').should('exist');
    cy.get('#lastName:invalid').should('exist');
    cy.get('#userNumber:invalid').should('exist');
  });

  it('TC_02 - Verify form submission with all fields filled', () => {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('john.doe@example.com');
    cy.get("input[name='gender'][value='Male']").check({force: true});
    cy.get('#userNumber').type('1234567890');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__month-select').select('May');
    cy.contains('.react-datepicker__day', '15').click();
    cy.get('#subjectsInput').type('Maths{enter}');
    cy.get("input[type='checkbox'][value='1']").check({ force: true });
    cy.get('#uploadPicture').attachFile('test_image.jpeg');
    cy.get('#currentAddress').type('Address 123');
    cy.get('#state').click({force: true}).contains('NCR').click({force: true});
    cy.get('#city').click({force: true}).contains('Delhi').click({force: true});
    cy.get('#submit').click();
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
  });

  it('TC_03 - Verify form submission with only mandatory fields', () => {
    cy.get('#firstName').type('Jane');
    cy.get('#lastName').type('Smith');
    cy.get("input[name='gender'][value='Female']").check({ force: true });
    cy.get('#userNumber').type('1111111111');
    cy.get('#submit').click();
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
  });

  it('TC_05 - Verify the error alert when mandatory fields are empty', () => {
    cy.get('#submit').click();
    cy.get('#firstName:invalid').should('exist');
    cy.get('#lastName:invalid').should('exist');
    cy.get('#userNumber:invalid').should('exist');
  });
});