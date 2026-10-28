---
tags: [codigo, auditoria, qa]
data: 2026-10-28
status: aplicado
---
# 🔍 Auditoria do código (28/10)

Revisão de todos os arquivos Python contra as [[Regras de negócio]], com os dados reais da base. Cada achado foi conferido nos números antes de mexer, e cada correção ganhou um teste.

> [!success] Resultado
> **61 testes passando** (eram 51) · planilhas com **0 erros de validação** · planos, elegibilidade, canal e confiança **iguais** aos de antes (Prático 59 · Total 49 · Essencial 30; SIM 122 · NÃO 16) · faixas de incêndio mais estreitas · perguntas de 2,73 para **2,70** por caso.

## 🐞 Erros corrigidos
> [!bug] 1. Área encolhia 60% quando o IPTU vinha zerado
> `_area_estimada` fazia `0,6 × área pelo IPTU + 0,4 × área pela energia`. Com IPTU zero (isenção é comum), a área virava 40% da estimada pela energia. **Na base atual não acontece** (nenhum IPTU zerado), mas quebraria com dado real.
> **Correção:** usa só os sinais que existem, com o peso redistribuído. A calibração também ignora IPTU ou energia zerados. Teste: `test_area_com_iptu_zerado_usa_so_a_energia`. Regra: RN-14 (valores extremos).

> [!bug] 2. Perguntas prometiam mais do que podiam entregar
> O "reduz a faixa até R$ X" era calculado na estimativa **antes** dos limites do produto. Se o incêndio fica preso no piso de R$ 100 mil, perguntar a área não muda nada. **30 de 190** perguntas candidatas de área e acabamento prometiam mais do que a largura da faixa entregue.
> **Correção:** o valor da pergunta fica limitado à largura real da faixa de incêndio, e pergunta de valor que muda menos de **R$ 5 mil** não é feita (RN-36, RN-51). Resultado: **0** perguntas prometendo demais; candidatas de 3,51 para 3,43.

> [!bug] 3. Despesas emergenciais usavam a faixa de incêndio sem limite
> A regra diz "2%–5% da faixa de incêndio", mas a conta usava a estimativa antes do limite do produto. **Correção:** usa a faixa de incêndio já ajustada. Teste: `test_despesas_emergenciais_sobre_a_faixa_de_incendio`.

> [!bug] 4. Métrica "% processados" era um número fixo
> `processados_pct` estava escrito como `100.0` no código, sem conferir nada. **Correção:** agora compara os imóveis do template com os que ganharam ficha.

> [!bug] 5. A API aceitava área zero ou negativa como "confirmada"
> `POST /recomendar` com `area_m2 = -50` marcava a área como **confirmada pelo cliente** e caía na estimativa. **Correção:** área precisa ser maior que 0 e até 10.000 m²; senão, erro 422. Teste: `test_area_zero_ou_negativa_e_recusada`.

> [!bug] 6. O validador não conferia a RN-33
> Nada garantia que a coluna `coberturas_recomendadas` da planilha 1 batesse com as linhas da planilha 2. **Correção:** o validador confere isso, além de confiança fora de ALTA/MEDIA/BAIXA, linhas repetidas e valores negativos. Teste: `test_validador_pega_plano_e_coberturas_inconsistentes`.

## ⚖️ Incoerências corrigidas
| # | O quê | Regra | Correção |
|---|---|---|---|
| 7 | **Imóvel alugado a terceiros** (7 casos) somava os bens do dono, mas o conteúdo de um imóvel alugado é do inquilino | RN-27 | Observação no incêndio: "os bens do inquilino são dele; confirme se é alugado mobiliado com bens seus" |
| 8 | **Subseguro invisível:** quando a estimativa passava do limite do produto, a faixa ficava no teto sem avisar | D-07 (Código Civil, art. 778) | Observação "o valor acima do limite fica descoberto" e métrica `faixas_limitadas_pelo_produto` |
| 9 | **Padrão construtivo vazio em 98 de 138 casos** deixava a faixa de incêndio larga (0,85 a 1,30) | RN-08, RN-13 | Com área cadastrada, o **IPTU/m² comparado ao município** estreita o padrão (a planta de valores do IPTU considera o acabamento). Fora da amostra, acerta **97,8%** e estreita 25 casos do teste |

## 🟡 Pontos para o time decidir (não mexi)
> [!decisao] A. Família muda o plano em 18 casos, e o vault diz que não pode
> A [[Regras de negócio - arquivo para as IAs do grupo|RN-07 do arquivo das IAs]] diz que "número de dependentes... não define plano". Desde o PR #13, dependentes **e** pet somam 1 ponto ao Total (slide 14 da Brasilseg: "casa familiar: pets, crianças, RC familiar"), e a métrica `familia_declarada_muda_plano` = **18**. Valor, elegibilidade, canal e confiança não mudam (métrica = 0).
> O [[HANDOFF_CONTEXTO]] também pede usar pet e crianças "como **necessidade confirmada pelo cliente**, nunca como inferência", mas `quantidade_dependentes` vem do cadastro, não de uma resposta do cliente.
> **Opções:** (1) manter e reescrever a RN-07 como "dependentes e pet só como necessidade de RC declarada" (o slide da Brasilseg pesa mais que a decisão do time); (2) tirar o ponto do plano e deixar só a **RC como adicional**, que já existe para prédio e condomínio. Recomendo **confirmar na mentoria**; se não der tempo, a opção 2 é a mais segura com a banca.

> [!decisao] B. Limites do produto prendem a maioria das faixas
> Danos por água fica no teto (R$ 50 mil) em **134 de 138** casos, e danos elétricos (R$ 30 mil) em **122**. Esses máximos são **premissa** (não há print). Danos elétricos são 53% a 66% dos acionamentos da BB (ver [[Métricas do mercado x as nossas]]): vale confirmar o limite real na mentoria ou no app.

> [!decisao] C. Escolher o mínimo da faixa deixa subseguro
> No incêndio, o máximo da faixa cobre o valor em risco (ITV mediano 1,46), mas o **mínimo** fica em 61% dele. Em 115 casos, quem escolher o mínimo fica abaixo de 80% (a referência de mercado para subseguro). **Sugestão para o app:** mostrar um "valor sugerido" no meio da faixa, e não o mínimo.

> [!decisao] D. Inquilino com casa paga a reconstrução da estrutura
> Para o inquilino de casa, o incêndio inclui a reconstrução, que é do dono. A Lei do Inquilinato (art. 22, VIII) põe o seguro contra fogo como obrigação do locador, salvo contrato em contrário. Hoje só avisamos dos beneficiários distintos (RN-27). Pode valer uma pergunta "o contrato pede que você faça o seguro do imóvel?".

## ✅ O que conferi e está certo
- Renda e idade não entram em nada (teste de justiça: **0** casos mudam).
- Elegibilidade só diz "não" com prova; sinal fraco vira pergunta (RN-19).
- Coberturas fixas sempre completas e com os nomes do catálogo (RN-21, RN-22).
- Assistências fora do template (RN-24); valores só com números (RN-31); nenhuma faixa vazia (RN-32).
- Motor roda sem internet; sem os CSVs externos, usa valores neutros (RN-12).
- Reprodutível byte a byte (teste `test_reprodutivel`).

## 📈 Antes × depois
| Métrica | Antes | Depois |
|---|---|---|
| Testes | 51 | **61** |
| Largura do incêndio (máx ÷ mín), mediana por confiança | ALTA 1,92 · MÉDIA 2,35 · BAIXA 2,64 | ALTA 1,89 · MÉDIA 2,25 · BAIXA 2,48 |
| Perguntas por caso (candidatas) | 2,73 (3,51) | **2,70 (3,43)** |
| Perguntas prometendo mais que a faixa | 30 de 190 | **0** |
| Backtest fora da amostra | não existia | área: erro mediano 15%, faixa contém a real em 78% · padrão: 97,8% |

Ligações: [[Mapa do código]] · [[Métricas do mercado x as nossas]] · [[Log de alterações do código]] · [[Revisão QA - repositório do Pedro]]
