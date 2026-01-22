Filas:
sigcn-med-falhas-solicitacaorecuperacao-envio
sigcn-med-solicitacaorecuperacao-recebimento
sigcn-med-atualizacaorecuperacao-recebimento
 
Containers do banco de dados
med-devolucao
indice-med-devolucao
 
Chave de particao: atributo "particao" para ambos
 
Exemplo de objetos (exemplo de uso do indice)
med-devolucao:
{ 
"id": "D901C0C1-D095-418A-B40C-1555CB8921B8",
"particao": "12345678909",
"cpf": "12345678909",
<etc.>
"transacao" : {
     "idfimafim": "E00360305202509051715FoCzto3kJj7",
     <etc.>
     }
}
 
indice-med-devolucao:
{
"id":  "D901C0C1-D095-418A-B40C-1555CB8921B8",
"particao": "D901C0C1-D095-418A-B40C-1555CB8921B8",
"cpf" : "12345678909"
}
 
Passo para buscar um documento no med-devolucao tendo somente o "id":
primeiro buscar no container indice-med-devolucao
pegar o valor do campo cpf
por fim, buscar no container med-devolucao, com id e particao definidos
isso é mais performático do que realizar uma busca em med-devolucao sem especificar a partição.
 
 
segunda-feira, 1 de dezembro de 2025 14:00 - 16:00

Parte 1

Parte 2

Compartilhar
Esta parte da reunião foi apenas transcrita.

Conteúdo


Sigcn Med.png

Alinhamento Técnico Squad MED Segurança.docx

Anotações

Transcrição
Transcrição. Use as setas para navegar entre as entradas da transcrição.


Pesquisar

O conteúdo gerado por IA pode estar incorreto

Julliana Honorato Albuquerque começou a transcrição

Aline Borges
0 minutos 4 segundos0:04
Aline Borges 0 minutos 4 segundos
Nada se encontro contigo, né? Porque a gente tem algumas definições.
Aline Borges 0 minutos 9 segundos
E aí o queria assim fazer um pedido, aproveitar que eu conseguia achar o Gabriel é Gabriel. Veio também.
Aline Borges 0 minutos 16 segundos
A os meninos precisam de de de itens muito, muito assim estruturais para a gente começar a trabalhar.
Aline Borges 0 minutos 27 segundos
E do outro ponto a gente precisa estar cá os trabalhos de alguma maneira, porque eu tempo está correndo. A gente não tem Ho Ródano.

Caio Yuri da Silva Costa
0 minutos 28 segundos0:28
Caio Yuri da Silva Costa 0 minutos 28 segundos
Um.

Aline Borges
0 minutos 36 segundos0:36
Aline Borges 0 minutos 36 segundos
Né, então assim, existe 11 sociedade grande.
Aline Borges 0 minutos 41 segundos
De tirar dúvidas com vocês do que para eles Hoje são assim, não, não posso começar que seria impedimento, seria impedimento.
Aline Borges 0 minutos 48 segundos
E Ai eu queria sim, eu vou falar aqui de ouvinte. Obviamente começo fazer um pedido se todo mundo pode escrever no chat, não é impedimento um escreve aí, pedimos 2 escreve aí e a gente endereça, né? O que é que seria para nós? Agilidade, o que é que seria ali de soluções? O que seria de com Gabriel, que não seria que Nenhum de Nós que nós temos que atrás?

Caio Yuri da Silva Costa
1 minuto 9 segundos1:09
Caio Yuri da Silva Costa 1 minuto 9 segundos
Aham.

Aline Borges
1 minuto 9 segundos1:09
Aline Borges 1 minuto 9 segundos
Porque depois a gente vai voltar para ele.
Caio Yuri da Silva Costa 1 hora 20 minutos 13 segundos
É o recebimento de uma solicitação de recuperação.
Caio Yuri da Silva Costa 1 hora 20 minutos 21 segundos
Seria isso então para fila que vai receber do ciclone no caso.
Caio Yuri da Silva Costa 1 hora 20 minutos 29 segundos
Aqui está de acordo com que o negócio aí da aplicação.
Caio Yuri da Silva Costa 1 hora 20 minutos 34 segundos
Vai receber.
Caio Yuri da Silva Costa 1 hora 20 minutos 42 segundos
Aqui não.
Caio Yuri da Silva Costa 1 hora 20 minutos 44 segundos
Não têm, não, não houve oposição, então vou vou criar dessa forma.
Caio Yuri da Silva Costa 1 hora 20 minutos 52 segundos
Então a gente vai ter essa aqui os valores eu deixei tudo padrão está aí depois, dependendo da necessidade do negócio, a gente pode.
Caio Yuri da Silva Costa 1 hora 21 minutos 2 segundos
É modificar.
Caio Yuri da Silva Costa 1 hora 21 minutos 5 segundos
EEA outra fila, ela conseguiu padrão x SN mede também é um recebimento, mas qual vai ser? O que é que ela vai recebendo? É no caso vai receber do CPI, não é?
Caio Yuri da Silva Costa 1 hora 21 minutos 20 segundos
O que é que ela vai receber do XP?

Guilherme Klein
1 hora 21 minutos 24 segundos1:21:24
Guilherme Klein 1 hora 21 minutos 24 segundos
É isso, alteração de status de análise.
Caio Yuri da Silva Costa 1 hora 38 minutos 19 segundos
Mas, eu acho que não era só realmente esse, só que tem relação do do Redirect lá.
IA
Ivan Lopes Alonso
1 hora 38 minutos 25 segundos1:38:25
Ivan Lopes Alonso 1 hora 38 minutos 25 segundos
Aham.

Caio Yuri da Silva Costa
1 hora 38 minutos 26 segundos1:38:26
Caio Yuri da Silva Costa 1 hora 38 minutos 26 segundos
E.
Caio Yuri da Silva Costa 1 hora 38 minutos 28 segundos
Criação do DNS, o certificado SSL, e.
Caio Yuri da Silva Costa 1 hora 38 minutos 33 segundos
Eu acho que não tinha mais nenhuma dor de cabeça, não.
IA
Ivan Lopes Alonso
1 hora 38 minutos 33 segundos1:38:33
Ivan Lopes Alonso 1 hora 38 minutos 33 segundos
Isso agora é tudo ou nada na parte do ambiente, não é também.
F
Fabio Domingues Pereira Sabino
1 hora 38 minutos 36 segundos1:38:36
Fabio Domingues Pereira Sabino 1 hora 38 minutos 36 segundos
Eu acho que a session gente não teve muito problema não mesmo, até porque em Bikini 20 não. A validação do Talking, pelo menos a gente faz offline, né? No backend.

Caio Yuri da Silva Costa
1 hora 38 minutos 38 segundos1:38:38
Caio Yuri da Silva Costa 1 hora 38 minutos 38 segundos
Não é?
F
Fabio Domingues Pereira Sabino
1 hora 38 minutos 46 segundos1:38:46
Fabio Domingues Pereira Sabino 1 hora 38 minutos 46 segundos
Mas, se vocês precisarem gerar um pouquinho, si não deve ter muito problema, não?
IA
Ivan Lopes Alonso
1 hora 38 minutos 51 segundos1:38:51
Ivan Lopes Alonso 1 hora 38 minutos 51 segundos
Adeus ó k comentou sobre a.
Ivan Lopes Alonso 1 hora 38 minutos 56 segundos
É problema, apesar de VPN da da fábrica para acessar.
Ivan Lopes Alonso 1 hora 39 minutos 1 segundo
A lógica que era que era a subida da UE? Sim, é esse problema seria também com.
Ivan Lopes Alonso 1 hora 39 minutos 8 segundos
Nosso offline aqui pronto cube que o.
Ivan Lopes Alonso 1 hora 39 minutos 11 segundos
Se envolveria normal ter num local de escolha, exemplo.
Ivan Lopes Alonso 1 hora 39 minutos 16 segundos
Tem sentido a pergunta?

Caio Yuri da Silva Costa
1 hora 39 minutos 20 segundos1:39:20
Caio Yuri da Silva Costa 1 hora 39 minutos 20 segundos
E normalmente.
Caio Yuri da Silva Costa 1 hora 39 minutos 22 segundos
Se você se você vai trabalhar com os elementos diferentes.
Caio Yuri da Silva Costa 1 hora 39 minutos 27 segundos
Você quer acessar o back end que está lá de apoiado, né? Aí você vai precisar.
IA
Ivan Lopes Alonso
1 hora 39 minutos 33 segundos1:39:33
Ivan Lopes Alonso 1 hora 39 minutos 33 segundos
A.

Caio Yuri da Silva Costa
1 hora 39 minutos 36 segundos1:39:36
Caio Yuri da Silva Costa 1 hora 39 minutos 36 segundos
E vai precisar ter também a regra de Faro para acessar AO back end.
IA
Ivan Lopes Alonso
1 hora 39 minutos 43 segundos1:39:43
Ivan Lopes Alonso 1 hora 39 minutos 43 segundos
A vida a vida Era Para Ser seu Deus. 2 locais segue O Jogo.

Caio Yuri da Silva Costa
1 hora 39 minutos 47 segundos1:39:47
Caio Yuri da Silva Costa 1 hora 39 minutos 47 segundos
Isso, isso é o que a gente.
IA
Ivan Lopes Alonso
1 hora 39 minutos 48 segundos1:39:48
Ivan Lopes Alonso 1 hora 39 minutos 48 segundos
A configuração tá na frente, eu preciso fazer alguma configuração quando tiver os 2 ambientes online, por exemplo.

Caio Yuri da Silva Costa
1 hora 39 minutos 56 segundos1:39:56
Caio Yuri da Silva Costa 1 hora 39 minutos 56 segundos
Não quando tiver.
V

Victor Rodrigo Nunes Lopes e Silva
1 hora 39 minutos 56 segundos1:39:56
Victor Rodrigo Nunes Lopes e Silva 1 hora 39 minutos 56 segundos
Desde os amigos, vejam lá. Isso tem que ter AA regra entre eles só.
Victor Rodrigo Nunes Lopes e Silva 1 hora 40 minutos 1 segundo
E ai isso é.

Caio Yuri da Silva Costa
1 hora 40 minutos 1 segundo1:40:01
Caio Yuri da Silva Costa 1 hora 40 minutos 1 segundo
É.
IA
Ivan Lopes Alonso
1 hora 40 minutos 1 segundo1:40:01
Ivan Lopes Alonso 1 hora 40 minutos 1 segundo
Ai ficar no você vai criar, né? Ou locais o ambiente isso.

Caio Yuri da Silva Costa
1 hora 40 minutos 8 segundos1:40:08
Caio Yuri da Silva Costa 1 hora 40 minutos 8 segundos
Em termos de ambiente eu, eu eu dito que quando a gente criar, não é?
Caio Yuri da Silva Costa 1 hora 40 minutos 14 segundos
Já.
Caio Yuri da Silva Costa 1 hora 40 minutos 16 segundos
Isso já vai, já vai auto mais coisa. A gente tem que demandar também isso fado. Foi assim para o fronte.
F
Fabio Domingues Pereira Sabino
1 hora 40 minutos 24 segundos1:40:24
Fabio Domingues Pereira Sabino 1 hora 40 minutos 24 segundos
Pode repetir por favor?

Caio Yuri da Silva Costa
1 hora 40 minutos 26 segundos1:40:26
Caio Yuri da Silva Costa 1 hora 40 minutos 26 segundos
A tá não, já já misturei as bolas aqui.
Esta transcrição é útil?


