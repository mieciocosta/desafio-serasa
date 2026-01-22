SELECT * FROM c
WHERE c.idRecuperacaoValores = "6376a3fe-0a40-4304-b324-81d8173dfa9f"



"pedidoRecuperacao": {
  ...
  "Situacao": "SCAM",
  ...
}


"pedidoRecuperacao": {
  ...
  "Situacao": "CANCELADA",
  ...
}



SELECT
  c.idRecuperacaoValores,
  c.pedidoRecuperacao.Situacao
FROM c
WHERE c.idRecuperacaoValores = "6376a3fe-0a40-4304-b324-81d8173dfa9f"



{
  "idRecuperacaoValores": "6376a3fe-0a40-4304-b324-81d8173dfa9f",
  "Situacao": "CANCELADA"
}
