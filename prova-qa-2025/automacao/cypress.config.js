const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.trello.com/1',
    setupNodeEvents(on, config) {
      // Configuração para variáveis de ambiente
      config.env.apiKey = process.env.CYPRESS_TRELLO_API_KEY || config.env.apiKey;
      config.env.apiToken = process.env.CYPRESS_TRELLO_API_TOKEN || config.env.apiToken;
      
      return config;
    },
    // Configuração do reporter
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome, mocha-junit-reporter',
      mochawesomeReporterOptions: {
        reportDir: 'cypress/reports/mocha',
        quite: true,
        overwrite: false,
        html: false,
        json: true
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: 'cypress/reports/junit/results-[hash].xml'
      }
    }
  }
});