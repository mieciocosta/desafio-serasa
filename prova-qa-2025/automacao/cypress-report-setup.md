# Configuração de Relatórios para Cypress

Este guia explica como implementar a geração de relatórios detalhados para os testes Cypress no projeto de automação da API do Trello.

## Opção 1: Mochawesome (Recomendada)

### Passo 1: Instalar as dependências necessárias

```bash
cd /caminho/para/seu/projeto
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator cypress-multi-reporters mocha-junit-reporter
```

### Passo 2: Configurar o Cypress para usar o Mochawesome

Atualize seu arquivo `cypress.config.js`:

```javascript
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
```

### Passo 3: Adicionar scripts no package.json

Adicione os seguintes scripts ao seu arquivo `package.json`:

```json
"scripts": {
  "test": "cypress run",
  "cypress:open": "cypress open",
  "test:api": "cypress run --spec 'cypress/e2e/api-trello/**/*.cy.js'",
  "report:merge": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mochawesome.json",
  "report:generate": "marge cypress/reports/mochawesome.json -f report -o cypress/reports",
  "test:report": "npm run test:api && npm run report:merge && npm run report:generate"
}
```

### Passo 4: Criar a estrutura de pastas para os relatórios

```bash
mkdir -p cypress/reports/mocha cypress/reports/junit
```

### Passo 5: Executar os testes com geração de relatório

```bash
npm run test:report
```

Após a execução, você encontrará o relatório HTML em `cypress/reports/report.html`.

## Opção 2: Cypress Dashboard (Serviço em Nuvem)

### Passo 1: Criar uma conta no Cypress Dashboard

Acesse [dashboard.cypress.io](https://dashboard.cypress.io) e crie uma conta gratuita.

### Passo 2: Configurar seu projeto

```bash
npx cypress open
```

Na interface do Cypress, clique em "Runs" e siga as instruções para conectar seu projeto ao Cypress Dashboard.

### Passo 3: Obter a chave do projeto

Após configurar o projeto no Dashboard, você receberá uma chave de projeto.

### Passo 4: Executar testes com o Dashboard

```bash
npx cypress run --record --key SUA_CHAVE_AQUI
```

Adicione este comando ao seu `package.json`:

```json
"scripts": {
  "test:dashboard": "cypress run --record --key SUA_CHAVE_AQUI"
}
```

## Opção 3: Cypress Allure Reporter

### Passo 1: Instalar as dependências

```bash
npm install --save-dev @shelex/cypress-allure-plugin allure-commandline
```

### Passo 2: Configurar o plugin

No arquivo `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://api.trello.com/1',
    setupNodeEvents(on, config) {
      // Configuração para variáveis de ambiente
      config.env.apiKey = process.env.CYPRESS_TRELLO_API_KEY || config.env.apiKey;
      config.env.apiToken = process.env.CYPRESS_TRELLO_API_TOKEN || config.env.apiToken;
      
      // Configuração do Allure
      allureWriter(on, config);
      return config;
    }
  }
});
```

No arquivo `cypress/support/e2e.js`:

```javascript
import '@shelex/cypress-allure-plugin';
```

### Passo 3: Adicionar scripts no package.json

```json
"scripts": {
  "test:allure": "cypress run --env allure=true",
  "allure:report": "allure generate allure-results --clean -o allure-report",
  "allure:open": "allure open allure-report",
  "test:allure:report": "npm run test:allure && npm run allure:report && npm run allure:open"
}
```

### Passo 4: Executar os testes com geração de relatório Allure

```bash
npm run test:allure:report
```

## Recomendação Final

Para o seu projeto de automação da API do Trello, recomendo a implementação do Mochawesome (Opção 1) pelos seguintes motivos:

1. É uma solução gratuita e de código aberto
2. Gera relatórios HTML visualmente atraentes
3. Não requer serviços externos
4. Permite a fusão de múltiplos relatórios
5. É amplamente utilizado na comunidade Cypress

Após implementar o Mochawesome, você terá relatórios detalhados que mostram:
- Taxa de sucesso/falha dos testes
- Tempo de execução
- Detalhes de cada teste
- Capturas de tela em caso de falhas (para testes de UI)
- Logs e mensagens de erro

Estes relatórios serão úteis para apresentar os resultados dos testes aos avaliadores e demonstrar a eficácia da sua solução de automação.
