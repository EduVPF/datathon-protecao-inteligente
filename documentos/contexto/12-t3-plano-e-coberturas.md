# 12 · T3 · Elegibilidade, plano e coberturas

**Em uma frase:** o coração do motor. Ele decide se o caso pode contratar, escolhe o plano por sinais observados (sem atributos pessoais) e calcula cada cobertura pela maior perda provável, respeitando o contrato da BB Seguros.

**Onde estamos:** Fase 1 · Tarefa T3 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issue #3

## O que fizemos
**Elegibilidade: só SIM ou NÃO.**
- **NÃO** só com prova: situação cadastral diferente de "regular".
- **Sinal fraco vira SIM + pergunta:**
  - obra ≥ R$ 15 mil (prioridade 100);
  - seguro residencial já existente (95);
  - material da parede diferente de alvenaria (98).
- **Veraneio gera um aviso:** roubo não cobre residência desocupada.

**Plano: pontos por sinal** (renda, idade, dependentes e pet não entram):

| Sinal | Pontos |
|---|---|
| Inquilino · recebe aluguel | Total +2 |
| Apartamento ou casa em condomínio (vizinhos) | Total +1 |
| Bens comprovados ≥ R$ 36 mil (mediana da base de desenvolvimento) | Prático +2 |
| Eletrônicos comprovados ≥ R$ 10 mil (mediana) · casa fora de condomínio · vidraçaria · veraneio | Prático +1 cada |

- **Total:** se os pontos de Total somam 2 ou mais.
- **Prático:** se os pontos de Prático somam 2 ou mais, ou se há pelo menos 1 ponto de cada.
- **Essencial:** nos demais casos.

A justificativa sempre diz **por que não um plano mais barato** e **por que não um mais caro**.

**Coberturas pela maior perda provável:**

| Cobertura | Regra |
|---|---|
| Incêndio | **Segundo risco** (apto, condomínio ou financiado): 25–40% da reconstrução + bens. Senão: reconstrução + bens. Reconstrução = área × SINAPI–CUB da UF × padrão |
| Danos por água | 50–100% dos bens molháveis + 3–8% da reconstrução |
| Vendaval | Casa 10–20% da reconstrução; apartamento 2–5% |
| Danos elétricos / roubo | Eletrônicos + eletrodomésticos / eletrônicos (da T2) |
| Responsabilidade civil | Apto ou condomínio: reparo de uma unidade vizinha (70 m² × custo × 30–60%). Casa: R$ 30–60 mil |
| Perda de aluguel | Aluguel pago, aluguel recebido ou FipeZAP × área, × 6 a 12 meses |
| Despesas emergenciais | 2–5% do incêndio |

**Fontes por caso:** a coluna `fontes_publicas_adicionais` lista as fontes usadas (o FipeZAP só aparece quando entrou no cálculo).

## Resultado nos 138 casos
- **Planos:** Prático 69 · Total 38 · Essencial 31.
- **Elegibilidade:** SIM em todos (nenhum caso com prova de restrição). As pendências viram perguntas.
- **Canal:** 78 em 1 toque, 60 com o gerente.
- **Perguntas:** 2,4 por caso, em média.
- **Faixas:** nenhuma invertida, nenhuma vazia, e todas as coberturas fixas presentes.
- **Caso de Curitiba (apê financiado):** incêndio de **R$ 100 mil a R$ 180 mil**, em vez dos R$ 260 mil do protótipo.

## Por que importa
- **Critério da banca:** adequação da proteção (20%), a maior nota, e explicabilidade (10%).
- **No pitch:** é o diferencial 1, "recomendação baseada no contrato real".

## O que você precisa entender
- **Segundo risco:** o condomínio (e o financiamento) já têm seguro da estrutura. Segurar a estrutura de novo é pagar duas vezes. Por isso o incêndio do apartamento cobre acabamentos e bens.
- **Maior perda provável:** como não há rateio (primeiro risco absoluto), basta que cada cobertura aguente o pior caso realista. Por exemplo, o roubo não precisa cobrir o sofá.
- **Por que limites pela mediana?** No primeiro teste, quase todo mundo passava dos limites fixos (Prático 99 de 138). Calibrar pela mediana da **base de desenvolvimento** (e não da de teste, para não viciar) faz "bens relevantes" significar "acima da metade dos clientes".

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| Um sinal de Total sozinho não leva ao Prático | Somar todos os sinais | O Prático não cobre vizinho nem aluguel; seria recomendar a cobertura errada |
| Limites pela mediana da base de desenvolvimento | R$ 25 mil e R$ 8 mil fixos | Os fixos não separavam ninguém nesta base |
| `motor/demo.py` removido | Manter a demo antiga | A demonstração é o protótipo com gerente (T7) |
| `processar_caso()` separado | Tudo dentro do loop | Permite testar um caso alterado e serve à futura API |

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py
```
Resultado esperado: 18 testes passando, com destaque para `test_plano_e_coberturas_ignoram_atributos_pessoais` e `test_incendio_apto_financiado_segundo_risco`.

## Pendências e riscos
- A **confiança** ainda é a versão simples (ALTA 25, MÉDIA 113). A T5 troca por "fonte × frescor".
- As **proporções de água, vendaval e responsabilidade civil** são premissas; se a banca questionar, estão todas em `motor.py → dimensionar()`.

## Frase para o pitch
> "Para um apartamento financiado, o app de hoje sugere R$ 300 mil de incêndio. Pelo contrato da própria BB Seguros, a estrutura já tem seguro. Nossa faixa é de R$ 100 a 180 mil, e o motivo vem escrito."

## Próximo passo
- [13 · T4 Validação e planilhas v1](13-t4-planilhas-v1.md)
