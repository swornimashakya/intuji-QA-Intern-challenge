describe('SC_03:	Verify the functionality of name field validation', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('TC_01: Accepts alphabetic characters only', () => {
    cy.get('#firstName').type('John')
    cy.get('#lastName').type('Doe')
    cy.get("input[name='gender'][value='Male']").check({force: true});
    cy.get('#userNumber').type('9876543210')
    cy.get('#submit').click()

    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', 'John')
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', 'Doe')
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form')
  })

  it('TC_02: Rejects numeric or special characters', () => {
    cy.get('#firstName').type('John123!@#')
    cy.get('#lastName').type('Doe')
    cy.get("input[name='gender'][value='Male']").check({force: true});
    cy.get('#userNumber').type('9876543210')
    cy.get('#submit').click()

    cy.get('#firstName:invalid').should('exist')
  })

  it('TC_03: Rejects whitespace-only input', () => {
    cy.get('#firstName').type('    ')
    cy.get('#lastName').type('   ')
    cy.get("input[name='gender'][value='Male']").check({force: true});
    cy.get('#userNumber').type('9876543210')
    cy.get('#submit').click()

    cy.get('#firstName:invalid').should('exist')
    cy.get('#lastName:invalid').should('exist')
  })
});