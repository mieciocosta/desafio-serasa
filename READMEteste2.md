SELECT
  c.idRecuperacaoValores,
  c.pedidoRecuperacao.Protocolo,
  c.pedidoRecuperacao.Situacao,
  c._ts
FROM c
WHERE c.pedidoRecuperacao.Situacao = "CANCELADA"
ORDER BY c._ts DESC
