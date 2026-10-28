---
tags: [dados, eda]
data: 2026-10-27
---
# Achados iniciais dos dados

Primeira olhada na base de desenvolvimento (2.200 clientes, 2.578 imóveis). Números para usar na apresentação e para guiar o motor.

## Estrutura
- 1.822 clientes têm 1 imóvel e 378 têm 2. A unidade de resposta é **cliente + imóvel**.
- Nenhum campo vem nulo: falta de informação aparece como `0` ou `NAO_DISPONIVEL`.
- Todo imóvel tem pelo menos um bem ligado (soma ponderada mediana de R$ 7.550, máximo R$ 98.100).

## Área: o maior buraco e a maior oportunidade
- **61% dos imóveis não têm área** (1.562 de 2.578).
- Nos que têm, a área tem correlação de **0,82 com o IPTU** e **0,81 com a energia**; água 0,51.
- Correlação da área com a **renda: 0,01**, e com condomínio: 0,02.
- Conclusão: a base foi montada para estimar a área pelos sinais do imóvel, **não pela renda**. Isso bate com o guardrail do guia.
- Casas: área mediana de 195 m² (45 a 330). Apartamentos: 95 m² (40 a 155).

## Tipo do imóvel
- O complemento separa bem: "AP/APTO/APARTAMENTO/TORRE/BLOCO" → apartamento; "CASA/LOTE/QUADRA" → casa.
- 1.118 com termo de apartamento, 1.460 com termo de casa. 983 com termo de condomínio (397 deles são casas → **casa em condomínio**).

## Vínculo com o imóvel
| Sinal | Imóveis | Leitura provável |
|---|---|---|
| Parcela de financiamento | 781 | financiado |
| Paga aluguel | 531 | inquilino |
| Recebe aluguel compatível | 241 | proprietário que aluga para terceiros |
| Nenhum sinal | 1.025 | provável próprio quitado (confirmar) |

552 imóveis não batem com o endereço principal: candidatos a veraneio, imóvel alugado para terceiros ou endereço desatualizado.

## Elegibilidade
- Todos `REGULAR` na situação cadastral.
- 18% gastaram com material de construção em 24 meses; 112 gastaram mais de R$ 20 mil (sinal de reforma).
- 595 imóveis com "LOTE" no complemento.
- 78% sem material da parede.
- 366 clientes já têm seguro residencial BB.

## Dados com confiança pronta
- Renda: metade informada (ALTA), metade presumida (MEDIA).
- Área: ALTA quando vem de laudo de financiamento, IPTU ou cadastro municipal; BAIXA quando não existe.
- Vínculo do bem com o imóvel: ALTA, MEDIA ou BAIXA pela probabilidade.

## Primeiras ideias para o motor
1. Tipo, uso e vínculo por regras (complemento, termos, aluguel, financiamento, endereço principal).
2. Área estimada por regressão com IPTU, energia, água, tipo e município quando não houver área cadastrada, com faixa (intervalo) e confiança menor.
3. Reconstrução = área × custo do m² (SINAPI por UF) × fator de padrão.
4. Conteúdo = soma dos bens ponderados + compras de 36 meses, com faixa.
5. Plano pela combinação: inquilino → conteúdo e aluguel pesam; apartamento → RC familiar; muitos eletrônicos/lazer → roubo; gasto com vidraçaria → vidros.

Ligações: [[Dicionário de dados]] · [[Ideias]] · [[Elegibilidade residencial]]
