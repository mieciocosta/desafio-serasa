# Questão 2 - Consultas SQL

## Análise do Diagrama Entidade-Relacionamento

O diagrama apresenta as seguintes entidades e relacionamentos:

- **PROFESSOR**: Possui atributos code, nome e fone
- **DISCIPLINA**: Possui atributos code e nome
- **ALUNO**: Possui atributos code e nome
- **LECIONA**: Relacionamento entre PROFESSOR e DISCIPLINA (1:N)
- **CURSA**: Relacionamento entre DISCIPLINA e ALUNO (N:N) com atributo ano

## Consultas SQL

### a) Escreva a consulta SQL para listar o nome de todos os alunos matriculados na disciplina de Cálculo do professor João.

```sql
SELECT a.nome
FROM ALUNO a
JOIN CURSA c ON a.code = c.code_aluno
JOIN DISCIPLINA d ON c.code_disciplina = d.code
JOIN LECIONA l ON d.code = l.code_disciplina
JOIN PROFESSOR p ON l.code_professor = p.code
WHERE d.nome = 'Cálculo' AND p.nome = 'João';
```

### b) Escreva a consulta SQL para exibir a quantidade de alunos por disciplinas.

```sql
SELECT d.nome AS disciplina, COUNT(c.code_aluno) AS quantidade_alunos
FROM DISCIPLINA d
LEFT JOIN CURSA c ON d.code = c.code_disciplina
GROUP BY d.nome
ORDER BY d.nome;
```

### c) Escreva a consulta SQL para listar as disciplinas que todos os professores lecionam.

```sql
SELECT d.nome AS disciplina
FROM DISCIPLINA d
WHERE NOT EXISTS (
    SELECT p.code
    FROM PROFESSOR p
    WHERE NOT EXISTS (
        SELECT l.code_disciplina
        FROM LECIONA l
        WHERE l.code_professor = p.code AND l.code_disciplina = d.code
    )
);
```

Observação: Esta consulta retorna disciplinas que são lecionadas por todos os professores cadastrados no sistema.

### d) Escreva a consulta SQL que exibe o total de professores.

```sql
SELECT COUNT(*) AS total_professores
FROM PROFESSOR;
```

### e) Escreva a consulta SQL para listar todos os alunos que cursaram alguma disciplina do ano 2000 até 2020.

```sql
SELECT DISTINCT a.nome
FROM ALUNO a
JOIN CURSA c ON a.code = c.code_aluno
WHERE c.ano BETWEEN 2000 AND 2020
ORDER BY a.nome;
```
