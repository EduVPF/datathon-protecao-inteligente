# 21 · Pós-mentoria: motivo 2.0, média regional, gerente como último recurso e APIs ao vivo

**Em uma frase:** a mentoria disse que o que diferencia um trabalho é o **porquê**. Reescrevemos o motivo para ele usar os fatos do próprio cliente e dizer quanto está em jogo, tratamos dado faltante com a média da região, deixamos o gerente como último recurso e passamos a atualizar SINAPI e IPCA pelas APIs oficiais.

**Onde estamos:** véspera da entrega · plano aprovado: `obsidian/BB Datathon/15 - Código/Plano - motivo, dados faltantes e gerente.md`

## O que fizemos
**F1 · Motivo 2.0** (`motor/motivo.py`, novo). Todo texto segue o roteiro: fato do cliente → valor em risco → "Se você escolher menos, ... ficará descoberto" (slide 23) → opção acima → o que confirmar → confiança em linguagem simples.

| Antes (`IMO_CASO_00015_01`, casa em Porto Alegre) | Depois |
|---|---|
| "Recomendamos o plano Essencial porque as coberturas básicas protegem estrutura e bens contra fogo, água, vento e danos elétricos, e não há sinais fortes de roubo ou de dano a terceiros... Confiança média (estimado: área)." | "Recomendamos o plano Essencial porque não vemos aluguel nem financiamento nas suas contas, então um incêndio ou um temporal sairia todo do seu bolso; seus eletrônicos e eletrodomésticos valem hoje de R$ 18 mil a R$ 47 mil, e danos elétricos são 53,3% dos acionamentos do residencial da BB. Reconstruir o imóvel custaria cerca de R$ 394 mil pelo custo oficial do IBGE, fora os seus bens. O Prático acrescenta roubo e vidros. Confiança média: a área foi estimada pelo IPTU e pela conta de luz." |

| Qualidade do motivo | Antes | Depois |
|---|---|---|
| Motivos genéricos | 29 (21%) | **0** |
| Motivo com fato do próprio cliente | 71% | **100%** |
| Justificativa com o valor em risco | não tinha | **100%** |
| Termos internos ("presumido", "o cliente"...) | vários | **0** |
| Texto da cobertura de incêndio igual para todos | 138 iguais | **138 diferentes** |
| Tamanho | ~87 palavras, sem valor em risco | mediana de 100; 92% entre 60 e 120 |

**F2 · Média da região em degraus.** Para o que falta: município + tipo → município → estado → geral (mínimo de 20 imóveis por degrau). Área sem IPTU nem energia usa a mediana de imóveis parecidos; imóvel sem compras usa a média de compras da região. **CEP desligado:** testamos e ele explica o IPTU/m² tanto quanto um CEP sorteado (0,215 contra 0,223). É fictício, como diz o guia (RN-10). Nesta base nenhum caso precisou do degrau regional (todos têm IPTU, energia e compras), mas o mecanismo está testado.

**F3 · Gerente como último recurso.** A ficha ganhou `jornada`: 1 toque **67** · app com perguntas de sim/não **20** · gerente **35** · sem nova proposta **16**. O gerente caiu de 71 para 35, só com confiança baixa (18), sinal de obra (9) ou sem app (13). O campo `canal` continua 1 toque × gerente para o protótipo, que não foi editado.

**F4 · APIs ao vivo.** `python motor/externos/coletar.py --ao-vivo` busca o SINAPI na API SIDRA do IBGE (tabelas 6586 e 2296) e o IPCA na API do Banco Central. Valida antes de gravar; se falhar, mantém o CSV salvo. O SINAPI foi de ago para **set/2026** sem PDF. A rota `/fontes` da API mostra a data de cada fonte. As planilhas continuam reprodutíveis byte a byte.

**QA:** revisão de código com 7 achados. 5 corrigidos: o atualizador apagava o CSV se a API respondesse pela metade, `reais()` escrevia "R$ 1000 mil" e o texto da fonte ficava quebrado sem CSV. **82 testes passando.** Planos, elegibilidade e confiança iguais; teste de justiça = 0.

**Pedido não aplicado:** usar o salário. O guia proíbe "atributos pessoais como atalho para risco ou patrimônio" (RN-07), e a renda tem correlação de 0,87 com os bens na base, justamente o atalho.

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
python motor/externos/coletar.py --ao-vivo
```
Resultado esperado: 82 testes passando; em `entrega/metricas.json`, `qualidade_do_motivo.motivos_genericos: 0` e `jornada.GERENTE: 35`.

## Frase para o pitch
> "Cada cliente lê o porquê com os números dele: quanto custaria reconstruir a casa, quanto valem os aparelhos e o que fica descoberto se escolher menos. E o gerente só entra quando o app não consegue resolver com uma pergunta."

## Próximo passo
- Decidir: quem não usa o app vai ao gerente ou recebe convite primeiro; família no plano (RN-07).
- Tela de ajuda contextual no app v2 (só desenhada).
