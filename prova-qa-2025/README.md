# Automação de Testes da API Trello com Cypress

Este projeto contém testes automatizados para a API do Trello utilizando Cypress, seguindo uma arquitetura modular e as melhores práticas de desenvolvimento.

## Estrutura do Projeto

```
cypress/
├── e2e/                      # Arquivos de teste
│   └── api-trello/           # Testes específicos para API do Trello
│       ├── board.cy.js       # Testes para operações de board
│       ├── card.cy.js        # Testes para operações de card
│       └── trello-workflow.cy.js # Fluxo completo de testes
├── fixtures/                 # Dados para os testes
│   └── test-data/            # Dados organizados por entidade
│       ├── board-data.js     # Dados para testes de board
│       └── card-data.js      # Dados para testes de card
├── support/                  # Configurações e comandos
│   ├── commands.js           # Comandos personalizados para API
│   └── e2e.js                # Configuração global dos testes
└── utils/                    # Utilitários para os testes
    ├── assertions.js         # Validações centralizadas
    ├── cleanup-utils.js      # Funções de limpeza de dados
    ├── card-cleanup-utils.js # Funções de limpeza para cards
    ├── validation-utils.js   # Validações para boards
    └── card-validation-utils.js # Validações para cards
```

## Pré-requisitos

- Node.js (versão 14 ou superior)
- NPM (versão 6 ou superior)
- Conta no Trello com acesso à API

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/prova-qa-2025.git
cd prova-qa-2025/automacao
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as credenciais da API do Trello:

Crie um arquivo `cypress.env.json` na raiz do projeto:
```json
{
  "apiKey": "sua_api_key_aqui",
  "apiToken": "seu_token_aqui"
}
```

Para obter suas credenciais:
- API Key: https://trello.com/app-key
- Token: Gerado a partir da sua API Key

## Execução dos Testes

### Executar todos os testes:
```bash
npm run test
```

### Executar testes específicos:
```bash
npm run test:api
```

### Abrir o Cypress para execução interativa:
```bash
npm run cypress:open
```

### Executar testes com geração de relatório:
```bash
npm run test:report
```

## Cenários de Teste Implementados

### Boards
- Cadastrar um board
- Obter informações de um board
- Atualizar um board
- Excluir um board
- Cenários negativos (board sem nome, inexistente, etc.)

### Cards
- Cadastrar um card
- Obter informações de um card
- Atualizar um card
- Excluir um card
- Adicionar comentário a um card
- Adicionar etiqueta a um card
- Cenários negativos (card sem nome, lista inexistente, etc.)

### Fluxo Completo
- Execução de um fluxo completo de operações (criar board, criar card, atualizar, excluir)

## Arquitetura Modular

Este projeto implementa uma arquitetura modular que separa:

1. **Dados de Teste**: Isolados em arquivos dedicados
2. **Validações**: Centralizadas em utilitários reutilizáveis
3. **Comandos Personalizados**: Para interagir com a API
4. **Funções de Limpeza**: Para garantir idempotência dos testes

Para mais detalhes sobre a arquitetura, consulte o arquivo [estrutura-modular.md](./docs/estrutura-modular.md).

## Relatórios

Os testes geram relatórios detalhados usando Mochawesome. Após a execução, os relatórios podem ser encontrados em:
```
cypress/reports/report.html
```

Para gerar relatórios:
```bash
npm run test:report
```

## Boas Práticas Implementadas

- **Separação de Responsabilidades**: Cada arquivo tem um propósito claro
- **Código Limpo**: Remoção de comentários desnecessários
- **Fluxo Assíncrono Correto**: Uso adequado de cy.wrap() para manter a cadeia assíncrona
- **Hooks Idempotentes**: Limpeza de dados que funciona mesmo em caso de falhas
- **Validações Robustas**: Tratamento para variações nos status codes da API

## Troubleshooting

### Erro de autenticação (401)
- Verifique se as credenciais no arquivo `cypress.env.json` estão corretas
- Confirme se o token não expirou (gere um novo se necessário)

### Falha ao encontrar recursos
- Os testes incluem limpeza automática de recursos criados
- Execute `npm run test:api` para limpar recursos de testes anteriores

### Erro de fluxo assíncrono
- Verifique se está usando a versão mais recente do código
- Todos os comandos personalizados já estão configurados para manter o fluxo assíncrono correto
