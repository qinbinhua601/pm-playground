/// <reference types="cypress" />
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('qin test pm-playground', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:4000')
  })

  // it('editor has one paragraph', () => {
  //   // We use the `cy.get()` command to get all elements that match the selector.
  //   // Then, we use `should` to assert that there are two matched items,
  //   // which are the two default items.
  //   cy.get('.ProseMirror p').should('have.length', 1)
  //   cy.window().should('have.property', 'view')
  //   cy.window().then((win) => {
  //     const { view, TextSelection } = win
  //     const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, 7))
  //     view.dispatch(tr)
  //     view.focus()
  //     // cy.get('.ProseMirror > p > strong > .q-mention > b').as('mention').click()
  //     // cy.get('.ProseMirror').type('{backspace}').type('{moveToStart}')
  //     // cy.wait(1000)
  //     // cy.get('.ProseMirror').type('{moveToEnd}')
  //     // for(let [x,y] of [[703, 77], [688, 12]]) {
  //     //   cy.get('.ProseMirror').realClick({
  //     //     x: x + 13,
  //     //     y: y + 14
  //     //   })
  //     //   cy.wait(1000)
  //     // }
  //     // cy.get('.ProseMirror').realClick({
  //     //   x: 703 + 13,
  //     //   y: 77 + 14
  //     // })
  //     // cy.wait(1000)
  //     // cy.get('.ProseMirror').realClick({
  //     //   x: 688 + 13,
  //     //   y: 12 + 14
  //     // })
  //   })
  // })
  it('input text abc', {
    keystrokeDelay: 0
  }, () => {
    cy.window().should('have.property', 'view')
    cy.window().then((win) => {
      const { view, TextSelection } = win
      const tr = view.state.tr.setSelection(TextSelection.create(view.state.doc, 1, 4))
      view.dispatch(tr)
      view.focus()
      cy.get('body').click(131 - 8,207 - 8)
      cy.get('.ProseMirror').type('{rightArrow}{rightArrow}{leftArrow}');
      view.focus()
    })
  });
  
})
