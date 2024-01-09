const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprocessor,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      addCucumberPreprocessorPlugin(on, config);

      on("file:preprocessor", preprocessor(config));
      return config;

    },

    specPattern: "cypress/e2e/bdd/*.feature"

  },

  env: {
    url: "https://harikrishnaveni-s.github.io/simple-to-do-list/",
  },

});
