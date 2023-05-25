describe('Complete add song', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');

    cy.get('input[data-cy="add-song-form_title"]').focus().type('Paul Revere');
    cy.get('input[data-cy="add-song-form_album"]').focus().type('License to Ill');
    cy.get('input[data-cy="add-song-form_artist"]').focus().type('Beastie Boys');
    cy.get('input[data-cy="add-song-form_genre"]').focus().type('Hip-Hop');
    cy.get('input[data-cy="add-song-form_release-date"]').focus().type('1986-02-28');
    cy.get('input[data-cy="add-song-form_running-time"]').focus().type('221');
    cy.get('button[data-cy="add-song-form_submit-button"]').click();
    cy.contains('Paul Revere').should('exist');
  });
});


describe('Test the SearchBar', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input[data-cy="searchbar-input"]').focus().type('Paul Revere');
    cy.get('button[data-cy="searchbar-submit-button"]').click();
    cy.wait(2000); 
    cy.get('tbody[data-cy="music-table-data"]').contains('td','Paul Revere').should('exist')
 
  });
});


describe('Filter for Genre', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('select[data-cy="filter-selector"]').focus().select('genre');
    cy.get('input[data-cy="filter-input"]').focus().type('Hip-Hop');
    cy.get('tbody[data-cy="music-table-data"]').contains('td','Paul Revere').should('exist')
 
  });
});


describe('delete the last added song', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('tbody[data-cy="music-table-data"]')
      .find('tr')
      .last()
      .within(() => {
        cy.get('button')
          .contains('Delete')
          .click();
      });
    cy.reload()


    cy.contains('Paul Revere').should('not.exist',{ timeout: 5000 })
 
  });
})

describe('edit the title of the song that is on the 9th row', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');

    cy.get('tbody[data-cy="music-table-data"]')
      .find('tr')
      .eq(8) // Select the 9th row (index 8)
      .within(() => {
        cy.get('button')
          .contains('Edit')
          .click();
      });

    cy.get('.modal').should('be.visible'); // Wait for the modal to be visible

    cy.get('input[data-cy="update-song-modal-title"]').should('exist').clear().type('Not The right song');
    cy.get('.modal').contains('Update').click();

    cy.reload() 

    cy.get('tbody[data-cy="music-table-data"]')
      .find('tr')
      .eq(8) // Select the 9th row (index 8)
      .find('td[data-cy="music-table-data-title"]')
      .should('contain.text', 'Not The right song');
  });
});
