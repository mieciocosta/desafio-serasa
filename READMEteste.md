
Perfeito 😄
Vou montar o **documento de evidência no formato “caminho feliz”**, cobrindo **ENVIO → RECEBIMENTO → CANCELAMENTO**, **bem limpo**, só com **pontos objetivos + lugar exato para colar prints**.

Pronto para README / Jira / Confluence.

---

# 📑 Evidência de Teste – MED | Caminho Feliz (Envio, Recebimento e Cancelamento)

## 🧪 Identificação Geral

* **Sistema:** SIGCN Nuvem MED
* **Ambiente:** DES
* **Fluxo:** Pedido de Recuperação de Valores
* **Identificador do Teste:** `RECUP_CONVERTIDO_001`
* **Id Fim a Fim:** `E0036030520260114233353d900045d1`
* **Protocolo Origem:** `260116096768384`

---

## 📦 Payload Utilizado

```json
{
  "teste_miecio": "RECUP_CONVERTIDO_001",
  "idFimAFim": "E0036030520260114233353d900045d1",
  "valor": 2,
  "dataHoraTransacao": "2026-01-14T17:51:03.000Z",
  "tipoRecuperacao": "SCAM",
  "canal": "Teste SIGCN",
  "protocoloOrigem": "260116096768384",
  "cpfPagador": "61562716352"
}
```

---

# 🚀 1. Caminho Feliz – ENVIO

### Ação Executada

* Mensagem enviada manualmente para a fila:

  * `sigcn-med-solicitacaorecuperacao-recebimento`

### Resultado Esperado

* Envio realizado com sucesso
* Nenhum erro de validação no momento do envio

📸 **Print – Tela de envio da mensagem no Service Bus**

---

# 📥 2. Caminho Feliz – RECEBIMENTO E PROCESSAMENTO

### Ação Executada

* Worker do SIGCN consumiu a mensagem da fila de recebimento

### Resultado Esperado

* Mensagem removida da fila de entrada
* Nenhuma mensagem enviada para Dead Letter Queue (DLQ)

📸 **Print – Fila de recebimento sem mensagens pendentes**

---

# 🗃️ 3. Caminho Feliz – PERSISTÊNCIA EM BANCO (COSMOS DB)

### Ação Executada

* Consulta ao container de pedidos de recuperação

### Resultado Esperado

* Documento criado com sucesso
* Pedido com status **CRIADO**
* Identificador `idFimAFim` persistido corretamente

📸 **Print – Registro criado no Cosmos DB**

### Query Executada

```sql
SELECT * FROM c
WHERE c.idFimAFim = "E0036030520260114233353d900045d1"
```

---

# 🔁 4. Caminho Feliz – CANCELAMENTO DO PEDIDO

### Ação Executada

* Worker de cancelamento processou a solicitação de cancelamento
* Cancelamento referente ao pedido previamente criado

### Resultado Esperado

* Pedido atualizado para status **CANCELADA**
* Nenhum novo pedido criado
* Nenhuma mensagem enviada para DLQ

📸 **Print – Documento no Cosmos DB com status CANCELADA**

---

# 🚫 5. Verificação de Mensagens Mortas (DLQ)

### Ação Executada

* Verificação da aba **Mensagens Mortas** na fila de recebimento

### Resultado Esperado

* Nenhuma mensagem presente na DLQ

📸 **Print – Aba “Mensagens Mortas” vazia**

---

# ✅ Resultado Final do Teste

* Fluxo de **Envio** executado com sucesso
* Fluxo de **Recebimento e Processamento** executado com sucesso
* Fluxo de **Cancelamento** executado com sucesso
* Nenhuma falha técnica ou funcional identificada

---

## 📝 Observações

* O payload convertido atendeu integralmente ao layout esperado pelo worker do SIGCN
* O fluxo validado confirma o comportamento esperado para o **caminho feliz completo**
* Evidência válida para QA, homologação e auditoria

---

Se quiser, no próximo passo eu posso:

* gerar o **mesmo documento para erro funcional e DLQ**
* ou padronizar com **cabeçalho oficial CAIXA (versão, responsável, data)**
