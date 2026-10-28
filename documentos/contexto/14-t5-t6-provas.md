# 14 · T5 e T6 · Confiança, provas, métricas e casos contrastantes

**Em uma frase:** o motor passou a **provar** o que promete. A confiança considera a fonte e a idade de cada dado, há testes de justiça, coerência e reprodutibilidade, e as métricas da seção 8 do guia saem prontas para o slide.

**Onde estamos:** Fase 2 · Tarefas T5 e T6 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issues #5 e #6

## O que fizemos
**Confiança = fonte × frescor** (T5):
- **Peso de cada dado** = peso da fonte × `0,5 ** (idade do sinal / meia-vida)`.
  - Fontes: confirmado 1,0 · documento 0,9 · transação 0,8 · inferido 0,6 · presumido 0,5.
  - Meia-vida: vínculo 12 meses · área 120 · bens 36 · uso 12 · tipo 120.
- **Confiança geral** = média dos pesos (área e bens valem o dobro). ALTA ≥ 0,75 · MÉDIA ≥ 0,55 · BAIXA abaixo disso.
- **Com pergunta de elegibilidade pendente, nunca ALTA.**
- **Resposta do cliente vira "confirmado" e vale 1,0.** Isso será usado quando a demo e a API receberem confirmações.

**Testes novos (31 no total):**

| Teste | O que prova |
|---|---|
| `test_dado_antigo_pesa_menos` | Dado antigo vale menos (pedido da organização) |
| `test_justica_ficha_inteira_igual` | Trocar renda, idade, dependentes e pet gera **exatamente a mesma ficha**, e nenhum desses campos aparece nela |
| `test_area_maior_nunca_reduz_incendio` | Coerência: área maior nunca diminui o incêndio |
| `test_extremos_respeitam_limites` | Compras de R$ 900 mil e 5.000 m²: todas as faixas ficam dentro dos limites do produto |
| `test_no_maximo_tres_perguntas_por_impacto` | No máximo 3 perguntas, na ordem do impacto |
| `test_bens_de_outro_imovel_nao_entram` | Um imóvel não herda os bens do outro |
| `test_reprodutivel` | Duas rodadas geram arquivos **idênticos, byte a byte** |

**Métricas** (T6, `motor/metricas.py` → `entrega/metricas.json`):

| Métrica | Valor |
|---|---|
| Casos processados / com justificativa / coberturas fixas completas | 138 · 100% · 100% |
| Faixas vazias / invertidas | 0 · 0 |
| Planos | Prático 69 · Total 38 · Essencial 31 |
| Casos com confirmação de elegibilidade | 37 (todos SIM; a pendência vira pergunta) |
| Confiança | ALTA 15 · MÉDIA 123 · BAIXA 0 |
| Canal | 1 toque 78 · gerente 60 |
| Perguntas por caso | 2,43 (de 2,67 candidatas) |
| **Teste de justiça** | **0 casos alterados** |
| **Sensibilidade** (área +10%) | Incêndio +4,79% em média; **0 casos com queda** |
| Tempo | ~0,3 s para os 138 casos |

**Casos contrastantes**, escolhidos pelo motor (`entrega/casos_contrastantes.json`):
- **1 toque limpo:** `IMO_CASO_00005_01`, o apê financiado em Curitiba, o mesmo do protótipo;
- **inquilino no Total:** `IMO_CASO_00008_01`;
- **elegibilidade a confirmar:** `IMO_CASO_00003_01`, com sinal de reforma, que vai para o gerente.

## Por que importa
- **Critério da banca:** explicabilidade e incerteza (10%), privacidade e responsabilidade (10%), viabilidade (10%). A seção 8 do guia lista exatamente essas métricas.
- **No pitch:** é o diferencial 3, "provar, não prometer". Vira um slide de evidências.

## O que você precisa entender
- **Por que 0 casos com confiança BAIXA?** Todo caso tem pelo menos transações recentes (compras, IPTU, energia). BAIXA só aparece quando faltam sinais. É honesto: os dados desta base são razoáveis.
- **"Frescor":** um sinal de 3 meses vale mais que um de 30. Quando o cliente confirma um dado, ele passa a valer o máximo.
- **Reprodutibilidade:** qualquer pessoa da banca pode rodar o código e obter **os mesmos arquivos**. O GitHub roda isso a cada mudança.

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| Limiar ALTA = 0,75 | 0,80 | Com 0,80, só dados de documento chegariam a ALTA; transação recente é boa evidência |
| Verificar as **chaves** da ficha no teste de justiça | Procurar a palavra "idade" no texto | "idade_meses" (idade do sinal) e "maturidade" davam falso alarme |
| Caso "a confirmar" prioriza o de reforma | Qualquer pendência | Reforma é o exemplo mais claro de "sinal fraco vira pergunta" |

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 31 testes passando e, em `entrega/metricas.json`, `"teste_justica_casos_alterados": 0`.

## Frase para o pitch
> "Trocamos a renda, a idade e a família de todos os 138 clientes e rodamos de novo: nenhuma recomendação mudou. E qualquer um pode rodar o código e obter o mesmo resultado."

## Próximo passo
- [15 · T7 Demo lendo o motor](15-t7-demo.md)
