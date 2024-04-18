import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1000,
    viewportHeight: 600,
    specPattern: 'cypress/e2e/test.cy.js'
  },
});
