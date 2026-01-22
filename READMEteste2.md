Cenário de teste postando pelo SIGCN.  
Dado o payload:
{
    "Protocolo": "260116096768384",
    "Nome": "VALENTINA GABRIELA MORAES",
    "Agencia": "0333",
    "Conta": "0000005929228970",
    "Produto": "3701",
    "Documento": "61562716352",
    "Telefone": "99999999999",
    "DataHoraRegistro": "2026-01-16T15:24:32.785389-03:00",
    "CanalRegistro": "Teste SIGCN",
    "IdDispositivo": "a3f9c2d8-7b4e-4e1a-9f6d-2c8b1e5f4a7",
    "Geolocalizacao": {
        "latitude": "-23.550520",
        "longitude": "-46.633308",
        "location_accuracy": "15",
        "location_timestamp": "2025-12-02T12:55:25.123-03:00"
    },
    "TipoJornada": "PIX_NORMAL",
    "Situacao": "SCAM",
    "ResultadoQuestionario": 3,
    "Razao": "REFUND_REQUEST",
    "DetalhesRelatoInfracao": "AAAAAAAAAAAAAAAAAAAAA",
    "Transacoes": [
        {
            "IdFimaFim": "E003603052026011423253b1af48bbd4",
            "CanalOrigem": "SIIBC",
            "Valor": 2,
            "UsuarioPagador": {
                "Nome": "VALENTINA GABRIELA MORAES",
                "Cpf": "61562716352",
                "Cnpj": "",
                "Conta": {
                    "Agencia": "0333",
                    "NumeroConta": "0000005929228970",
                    "Chave": null,
                    "Ispb": "00360305",
                    "Produto": "3701"
                }
            },
            "UsuarioRecebedor": {
                "Nome": "BERNARDO CLAUDIO RENAN PEREIRA",
                "Cpf": "45651547061",
                "Cnpj": "",
                "Conta": {
                    "Agencia": "0333",
                    "NumeroConta": "0000005929228953",
                    "Chave": "2b428a80-9a40-4bba-a367-cb3f362f30b9",
                    "Ispb": "00360305",
                    "Produto": "3701"
                }
            },
            "DataHoraTransacao": "2026-01-14T17:51:03.000Z",
            "Tipo": "D",
            "IdNotificacaoInfracao": null,
            "DataHoraCriacaoNi": null,
            "SituacaoCriacaoNI": null
        }
    ],
    "Questionario": [
        {
            "Pergunta": "Qual dessas alternativas descreve melhor o que aconteceu?",
            "Resposta": "Realizei o pagamento e percebi se tratar de um golpe"
        }
    ]
}



 
Submetendo na fila - sigcn-med-solicitacaorecuperacao-recebimento 
<img width="886" height="529" alt="image" src="https://github.com/user-attachments/assets/4fb06b91-88be-4917-ac32-8228dee78720" />

 
Após abertura - sigcn-med-solicitacaorecuperacao-retorno
 <img width="886" height="501" alt="image" src="https://github.com/user-attachments/assets/eca16358-9418-4c61-bb9b-47871571f9a6" />

