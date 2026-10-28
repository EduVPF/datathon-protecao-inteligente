# 19 · Auditoria do código, métricas de mercado e backtest

**Em uma frase:** revisamos todo o código Python contra as regras do vault do Obsidian. Corrigimos 6 erros e 3 incoerências, medimos o motor com métricas que bancos e seguradoras usam e validamos as estimativas fora da amostra. Planos e elegibilidade não mudaram.

**Onde estamos:** véspera da entrega · detalhes completos no vault: `obsidian/BB Datathon/15 - Código/`

## O que fizemos
**Erros corrigidos:**
| # | Erro | Correção |
|---|---|---|
| 1 | Área encolhia 60% com IPTU zerado | Usa só os sinais que existem; a calibração ignora zeros |
| 2 | 30 de 190 perguntas prometiam apertar a faixa mais do que a largura entregue | Valor da pergunta limitado à faixa real; corta as que mudam menos de R$ 5 mil |
| 3 | Despesas emergenciais sobre a faixa de incêndio sem limite | Usa a faixa já limitada, como diz a regra |
| 4 | `processados_pct` fixo em 100 | Calculado de verdade |
| 5 | API aceitava área 0 ou negativa como "confirmada" | Área precisa estar entre 0 e 10.000 m² (erro 422) |
| 6 | Validador não conferia a RN-33 | Confere a lista × as linhas, a confiança válida, as linhas repetidas e os valores negativos |

**Incoerências corrigidas:**
- **RN-27:** imóvel alugado a terceiros agora avisa que o conteúdo é do inquilino.
- **Subseguro (Código Civil, art. 778):** quando a estimativa passa do limite do produto, a observação diz que o excedente fica descoberto.
- **Padrão vazio (98 de 138):** com área cadastrada, o IPTU/m² comparado ao município estreita o padrão. Fora da amostra, acerta 97,8%.

**Métricas novas** (`entrega/metricas.json`, blocos `mercado` e `backtest_fora_da_amostra`):
| Métrica | Valor |
|---|---|
| STP (vai direto ao 1 toque) | 48,6% |
| Esforço: nossas perguntas × campos de cotação tradicional | 2,7 × 19,9 (86,5% menos) |
| Aderência aos sinistros reais da BB | 100% das recomendações com as coberturas de 79,4% dos acionamentos |
| ITV do incêndio no máximo / no mínimo | 1,46 / 0,61 |
| Backtest da área: erro mediano · faixa contém a real | 15% · 78,3% |
| Backtest do padrão pelo IPTU | 97,8% certo em 180 estreitados |

**Fonte nova:** `motor/externos/sinistros_residencial_bb.csv`: acionamentos do Seguro Residencial BB de jan/2023 a mai/2026 (danos elétricos 53,3% · água 14,6% · vendaval 11,5% · roubo 2,1%). Entra **só no texto** do motivo. Sem o arquivo, nada muda.

**Testes:** 61 passando (10 novos).

## Para o time decidir
- **Família muda o plano em 18 casos.** A RN-07 do vault diz que não pode. Ou reescrevemos a regra, ou deixamos dependentes e pet só como RC adicional.
- **Limites de danos por água e danos elétricos são premissa** e prendem 134 e 122 faixas. Confirmar o limite real.
- **"Valor sugerido" no meio da faixa no app:** quem escolhe o mínimo fica com 61% do valor em risco.

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 61 testes passando; `erros_validacao: 0`; planos Prático 59 · Total 49 · Essencial 30.

## Frase para o pitch
> "Medimos o motor como um banco mede: validação fora da amostra, ITV e esforço do cliente. Ele faz 2,7 perguntas onde uma cotação comum pede 20 campos, e sempre inclui as coberturas que respondem por quase 80% dos sinistros reais da BB Seguros."

## Próximo passo
- Decidir os três pontos acima e construir o app v2 (`obsidian/BB Datathon/14 - App v2/`).
