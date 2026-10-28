---
tags: [solucao, didatico]
data: 2026-10-27
status: proposta
---
# Como o motor funciona: exemplo real

Explicação simples, com dois clientes de verdade da base de teste. Os números saíram de um protótipo rápido, só para ilustrar. O código final é o time que decide.

## A ideia em uma imagem
Pense num **corretor experiente** que lê a ficha do cliente antes de ligar para ele. Ele faz 5 coisas, sempre na mesma ordem:

```
1. Pode segurar?        → olha se tem algo que impede (reforma, já tem seguro…)
2. Que casa é essa?     → apartamento ou casa? mora lá? é dono, inquilino ou financia?
3. Quanto vale?         → quanto custa reconstruir e quanto valem as coisas dentro
4. Qual plano?          → Essencial, Prático ou Total, e por quê
5. O que falta saber?   → no máximo 3 perguntas de sim/não, e o quanto confia no resto
```
O motor faz o mesmo, para os 138 casos, em segundos.

## Caso 1: CASO_00008 (Fortaleza)
**O que os dados dizem:** complemento "AP 204", paga aluguel de R$ 1.500, área cadastrada de 125 m² (cadastro municipal), 3 dependentes, bens somando R$ 7.750, maturidade digital 93.

| Etapa | Resultado | De onde veio |
|---|---|---|
| 1. Pode segurar? | Sim | Nenhum alerta |
| 2. Que casa é essa? | Apartamento, inquilino, mora lá | "AP" no endereço, aluguel recorrente, endereço bate com o principal |
| 3. Quanto vale? | Reconstrução: R$ 188 mil a R$ 287 mil. Conteúdo: R$ 7 mil a R$ 13 mil | Área **observada** × custo do m²; bens ponderados + compras |
| 4. Plano | **Total** | Apartamento (vazamento pode atingir o vizinho) + 3 dependentes → precisa de RC familiar, que só o Total tem |
| 5. Perguntas | Nenhuma. Confiança alta | Tudo veio de dado observado |
| Canal | One Click Buy | Maturidade digital alta |

**Detalhe de regra (RN-27):** como ele é inquilino, o imóvel tem como beneficiário o dono, e o conteúdo, o inquilino.

**Como aparece para ele no app:** "Seu apartamento, *protegido*. Recomendamos o plano Total porque um vazamento no seu apartamento pode atingir o vizinho de baixo, e com 3 dependentes em casa a responsabilidade civil faz diferença."

## Caso 2: CASO_00001 (Recife)
**O que os dados dizem:** complemento "CASA FUNDOS", termo de condomínio, **sem área cadastrada**, nenhum aluguel ou financiamento, IPTU de R$ 3.350, luz de R$ 700, maturidade 100.

| Etapa | Resultado | De onde veio |
|---|---|---|
| 1. Pode segurar? | Sim, **com confirmação** | Material da parede sem dado |
| 2. Que casa é essa? | Casa em condomínio, provavelmente própria | Sem sinal de aluguel ou financiamento (precisa confirmar) |
| 3. Quanto vale? | Área **estimada**: ~224 m² (entre 175 e 274). Reconstrução: R$ 277 mil a R$ 599 mil | IPTU + luz + água (o erro típico em casas é ±50 m²) |
| 4. Plano | **Prático** | Sem dependentes nem vizinho embaixo; os bens justificam roubo/furto |
| 5. Perguntas | 3 | "É seu e já está quitado?", "Tem mais ou menos 224 m²?", declaração de elegibilidade |
| Confiança | Baixa | Área estimada + vínculo sem sinal |

**Por que esse contraste é bom para a banca:** o mesmo motor deu respostas diferentes, e cada diferença tem um motivo que dá para mostrar (RN-39, casos contrastantes). A faixa larga do caso 2 é honesta: confiança baixa, mas com base defensável (RN-32).

## Repare
- A **idade** dos dois (44 e 52) não foi usada em nada (RN-07).
- O protótipo ainda é simples: o custo do m² é a média nacional (R$ 1.985, SINAPI jul/2026). No código final, usamos o valor por estado.

## Como vamos construir em Python
Ver [[Aplicação em Python]].

Ligações: [[Ideias v2 - proposta para o time]] · [[Regras de negócio]] · [[Achados iniciais dos dados]]
