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

