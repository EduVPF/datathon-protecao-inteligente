---
tags: [fonte-externa, aneel, em-uso]
atualizado: 2026-10-28
status: em uso no motor
---
# ⚡ ANEEL: ranking de continuidade do fornecimento

> [!success] Em uso desde 28/10
> **Ranking de Continuidade 2025** da ANEEL, Tabela I (33 distribuidoras com mais de 400 mil unidades). Salvo em `motor/externos/aneel_continuidade.csv` e usado **só no texto** do motivo de **danos elétricos**, a cobertura mais acionada da BB (53% a 66% dos acionamentos).

- **O que é o DGC:** a média entre o DEC (horas sem energia) e o FEC (número de quedas) apurados, cada um dividido pelo seu limite regulatório. **Abaixo de 1** = dentro do limite; quanto maior, pior.
- **Fonte:** [Ranking 2025 (gov.br/ANEEL)](https://www.gov.br/aneel/pt-br/centrais-de-conteudos/relatorios-e-indicadores/distribuicao/ranking-de-continuidade/2025) · dados detalhados: [DEC/FEC nos dados abertos da ANEEL](https://dadosabertos.aneel.gov.br/dataset/indicadores-coletivos-de-continuidade-dec-e-fec) (ODbL)
- **Brasil em 2025:** 9,30 horas sem energia (DEC) e 4,66 quedas (FEC) por consumidor, em média ([Canal Solar, citando a ANEEL](https://canalsolar.com.br/consumidores-ficaram-nove-horas-sem-energia/))

| Capital | Distribuidora | DGC 2025 | Posição (de 33) |
|---|---|---|---|
| Salvador | Neoenergia Coelba | 0,69 | 8º |
| Recife | Neoenergia Pernambuco | 0,76 | 21º |
| Fortaleza | Enel CE | 0,82 | 23º |
| Brasília | Neoenergia Brasília | 0,83 | 25º |
| Curitiba | Copel | 0,84 | 27º |
| Rio de Janeiro | Light | 0,84 | 27º |
| São Paulo | Enel SP | 0,90 | 30º |
| Belo Horizonte | Cemig | 0,91 | 31º |
| Goiânia | Equatorial Goiás | 0,96 | 32º |
| Porto Alegre | Equatorial CEEE | 0,98 | 33º |

**Exemplo no motivo:** "A distribuidora de Curitiba (COPEL) ficou em 27º de 33 no ranking de continuidade da ANEEL de 2025 (1º = menos quedas de energia)."

> [!warning] Limitações
> - O DGC é da distribuidora inteira, não do bairro.
> - DEC e FEC **excluem eventos climáticos extremos**, que a ANEEL trata em outros indicadores.
> - Queda de energia não é a única causa de dano elétrico (raio e surto também contam). Por isso é motivo, não valor.
> - **Próximo passo:** DEC/FEC por conjunto elétrico (arquivo de 30 MB nos dados abertos), para comparar o bairro com a cidade.

Ligações: [[Danos elétricos]] · [[Atlas Digital de Desastres]] · [[INPE ELAT]] · [[Métricas do mercado x as nossas]]
