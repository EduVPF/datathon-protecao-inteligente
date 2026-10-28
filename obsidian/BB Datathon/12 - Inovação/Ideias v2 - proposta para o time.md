---
tags: [inovacao, mapa, decisao]
versao: 2
atualizado: 2026-10-27
---
# Ideias v2: proposta para o time

Reavaliei todas as ideias anteriores contra as [[Regras de negócio]], os dados reais ([[Achados iniciais dos dados]]), o áudio da banca e os [[Critérios de avaliação]]. Ficou o que é simples, cabe em 1,5 dia e não quebra nenhuma regra. O que saiu está em [[Ideias descartadas ou adiadas]].

**Filtro usado em cada ideia:** respeita as regras? usa dado que temos? o gerente consegue explicar? funciona para quem tem dificuldade com app? vale ponto em algum critério?

> Exemplo passo a passo com 2 clientes reais: [[Como o motor funciona - exemplo real]]. Código: [[Aplicação em Python]].

## Camada 1: o motor (obrigatório)
| # | Ideia | Regras atendidas | Critério |
|---|---|---|---|
| 1 | [[Motor em 5 etapas com etiqueta de origem]] | RN-03, RN-09, RN-15, RN-34 | Adequação 20% · Explicabilidade 10% |
| 2 | [[Área estimada pelos sinais da casa]] | RN-07, RN-08, RN-13, RN-32 | Uso dos dados 15% |
| 3 | [[Calculadora de reconstrução]] + conteúdo pelos bens | RN-30, RN-32 | Adequação 20% |

## Camada 2: a jornada (diferencial)
| # | Ideia | Regras atendidas | Critério |
|---|---|---|---|
| 4 | [[Situações de moradia]] (6 perfis pelo vínculo e uso) | RN-07, RN-16, RN-27 | Adequação · Jornada |
| 5 | [[Canal pelo comportamento digital]] | RN-04, RN-07 | Inovação 20% · Jornada 15% |
| 6 | [[Proposta em 3 camadas]] com modo leitura fácil | RN-37, RN-51 | Jornada 15% |
| 7 | [[Perguntas que valem a pena]] (máx. 3, sim/não) | RN-19, RN-36 | Jornada · Explicabilidade |
| 8 | [[Três opções com recomendação explicada]] | RN-37 | Jornada · Responsabilidade |
| 9 | [[Coberto ou não coberto]] + [[Checagem de entendimento]] | RN-51 | Jornada |
| 10 | [[Cartão do gerente]] | RN-50, RN-04 | Inovação · Jornada |
| 11 | [[Proposta compartilhada]] (código entre canais) | RN-04 | Inovação (multicanal) |

## Camada 3: a prova (para o vídeo e a banca)
| # | Ideia | Regras atendidas | Critério |
|---|---|---|---|
| 12 | [[Painel de evidências]] com casos contrastantes e teste de justiça | RN-14, RN-39, RN-47 | Uso dos dados · Responsabilidade |
| 13 | [[Saída pronta para agente]] (um formato único por cliente) | RN-04 | Viabilidade 10% |
| 14 | [[Risco do território no motivo]] (opcional) | RN-11, RN-12 | Uso dos dados |

## Pacote mínimo sugerido (se o tempo apertar)
1, 2, 3, 4, 5, 7, 8, 10 e 12. Com isso a gente cobre os 7 critérios. O resto entra se sobrar tempo.

## Como fica a jornada
```
Dados do cliente + imóvel
  └─ Motor: elegibilidade → perfil (tipo, uso, vínculo) → área e valores → plano + faixas → confiança → perguntas → motivo
       │
       ├─ Maturidade digital alta  → One Click Buy: proposta pronta, 1 a 3 perguntas, 3 opções, contratar
       ├─ Maturidade média         → app + botão "falar com o gerente" sempre visível
       └─ Maturidade baixa         → gerente/central liga com o Cartão do gerente na mão
                                      (mesmo resultado, mesmo código de proposta)
```

## Para o debate no Discord
Pauta em [[Pauta da reunião - escolha das ideias]].

Ligações: [[Regras de negócio]] · [[Métricas de bancos e seguradoras]] · [[Economia comportamental aplicada]] · [[Ideias de equilíbrio]] · [[Ideias de inovação]]
