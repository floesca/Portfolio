describe('home page', () => {
  it('navigates the home page', () => {
    cy.visit('/')

    cy.get("[data-testid='btn-profile']").should("be.visible")

    cy.get("[data-testid='btn-profile']").should("contain", "Découvrir mon profil").click()
    cy.contains("h3", "De l'art du détail à la qualité logicielle")
    cy.contains(".btn", "Télécharger mon CV").click()
  })
})