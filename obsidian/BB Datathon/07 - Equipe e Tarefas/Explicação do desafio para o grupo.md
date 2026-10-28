---
tags: [equipe, didatico]
data: 2026-10-27
---
# Explicação do desafio para o grupo

Texto para colar no Discord ou no WhatsApp.

```
*Do que se trata o datathon, explicado do zero* 🏠

*O seguro já existe e a gente não mexe nele*
O BB Seguros já vende o seguro residencial com 3 planos prontos: Essencial, Prático e Total. As coberturas de cada plano já estão definidas (incêndio, vendaval, danos elétricos, roubo, responsabilidade civil etc.). Ninguém pediu pra gente criar cobertura nova nem mudar o contrato.

*Qual é o problema então?*
Hoje, pra contratar, o cliente responde uma entrevista: casa ou apartamento? é seu ou alugado? quantos m²? quanto valem os eletrônicos? Pouca gente sabe responder, o gerente não tem tempo, e muita gente desiste no meio.

Só que o banco já sabe boa parte dessas respostas. Ele vê se o cliente paga aluguel, se paga financiamento, quanto paga de IPTU e de luz, o que comprou no cartão, onde fica o imóvel.

*O que eles querem da gente*
Um "cérebro" que lê esses dados do banco e já monta a proposta de seguro pronta, antes de falar com o cliente. Parecido com o crédito pré-aprovado que aparece no app: o banco já calculou, você só confirma.

Pra cada cliente + imóvel, o nosso sistema tem que dizer:
1. Dá pra segurar esse imóvel? (tem regras: imóvel em reforma, por exemplo, não pode)
2. Que imóvel é esse? Casa ou apê, ele mora lá, é dono, inquilino ou financia
3. Qual dos 3 planos faz sentido pra ele
4. Quanto de cobertura (de quanto a quanto, em reais). Ex.: reconstruir a casa dele custaria entre R$ 190 mil e R$ 290 mil
5. O quanto a gente confia nisso, e o que ainda precisa perguntar (no máximo 2 ou 3 perguntas de sim ou não)
6. O motivo da recomendação, explicado de um jeito que o cliente entenda e o gerente consiga repetir

*Exemplo real da base que eles mandaram*
Cliente de Fortaleza: o endereço tem "AP 204", ele paga R$ 1.500 de aluguel, tem 3 dependentes.
O sistema conclui: apartamento, inquilino, mora lá. Recomenda o plano Total, porque um vazamento no apê dele pode atingir o vizinho de baixo e, com 3 dependentes, a responsabilidade civil faz diferença (só o Total tem). Não precisa perguntar nada, porque os dados já bastam.

Outro cliente, de Recife, não tem a área da casa no cadastro. O sistema estima pelo IPTU e pela conta de luz (uns 224 m²), recomenda o Prático e faz 3 perguntas pra confirmar.

*Onde isso vai ser usado*
O mesmo cérebro serve pra 3 situações:
• no app, o cliente vê a proposta pronta e contrata com um clique ("One Click Buy")
• na agência ou na central, o gerente abre a mesma proposta e explica
• no futuro, um assistente automático usa a mesma lógica

*O que a gente entrega na quinta até 10h*
• 2 planilhas preenchidas com a resposta de 138 casos que eles mandaram (todos os times recebem os mesmos)
• o código
• uma demonstração (app simples) e um vídeo de até 5 min
No dia ainda tem 5 min de apresentação e 5 de perguntas da banca.

*Resumindo numa frase*
O produto já existe; a gente faz o sistema que escolhe o plano certo pra cada cliente, calcula os valores, diz o que falta confirmar e explica o porquê.
```

Ligações: [[Desafio - resumo]] · [[Como o motor funciona - exemplo real]] · [[Regras de negócio]]
