Recebeu informação do SISPI no formato do JSON.
<img width="797" height="412" alt="image" src="https://github.com/user-attachments/assets/7215fc3a-ecc2-47ed-98dc-7d70248d3dd0" />

No JSON consta o Status Analyzed e o Timestamp da DataHoraAlteracao.
Criar Json da solicitação e Enviar ao SISPI ocorre no backend, nao da para debugar a ação ocorrendo. 
O Sucesso é salvo no banco de dados, o caso de analyzed
<img width="849" height="561" alt="image" src="https://github.com/user-attachments/assets/db99aa8c-a6cc-4715-9d33-47235462bd34" />

O caso de erro, foi conversado sobre não salvar em banco e utilizar monitoramento, certo? ficamos de implementar no futuro junto com as demais métricas a serem colhidas. 


Guilherme Klein, com relação ao item "em caso de erro, salvar o retorno em banco", foi uma ideia que dei, porém conversamos e ficou combinado que iriamos ver isso no futuro, para que seja utilizada o padrão que as aplicações da caixa utilizam
