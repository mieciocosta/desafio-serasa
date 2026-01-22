SELECT
  c.idRecuperacaoValores,
  c.Status.Anterior,
  c.Status.Atual,
  c.Status.DataAlteracaoStatus
FROM c
WHERE c.idRecuperacaoValores = "b83292c2-73ee-439a-86eb-af602ce3032"
