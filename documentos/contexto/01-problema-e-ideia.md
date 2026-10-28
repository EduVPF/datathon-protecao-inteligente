# 01 · O problema e a nossa ideia

**Em uma frase:** o banco já sabe quase tudo para montar o seguro residencial do cliente; a gente usa isso para entregar uma proposta pronta, explicada e honesta sobre o que é estimativa.

**Onde estamos:** antes do código. Base para todas as etapas.

## O desafio, em poucas palavras
- Hoje, contratar um seguro residencial exige responder perguntas que o cliente não sabe responder, como "quanto valem seus eletrônicos?". Muita gente desiste.
- O desafio pede uma **inteligência reutilizável** que, para cada cliente + imóvel, entregue: **elegibilidade**, **plano**, **coberturas com faixa mínima e máxima**, **confiança** de cada dado, **poucas perguntas** e **o motivo** (o ponto que a banca mais repetiu).
- **Duas jornadas** precisam funcionar: a do cliente (app, contratação em 1 toque) e a do gerente (atendimento assistido).
- **A entrega é avaliada principalmente por 2 planilhas** preenchidas para os 138 casos da base de teste, mais o código que as gera, um README e um vídeo de até 5 minutos.

## O problema real que encontramos
1. **Subseguro escondido.** O app atual sugere os mesmos valores para todo mundo, como R$ 3 mil para roubo. Na base, **78%** dos imóveis têm mais do que isso só em bens vinculados, e **86%** compraram mais de R$ 10 mil em eletrônicos e eletrodomésticos (o padrão de danos elétricos).
2. **Falsa sensação de proteção.** Quem mora em apartamento acha que o seguro do condomínio cobre tudo; quem financiou acha que o seguro do financiamento cobre os bens. Nenhum dos dois cobre o que está dentro de casa.
3. **Escolha sem motivo.** O cliente compara "6 coberturas contra 8 coberturas" sem saber o que isso significa para ele.

## A nossa solução
Um **motor de regras** (sem caixa-preta) que gera uma **ficha** por cliente-imóvel. A mesma ficha alimenta:
- **as planilhas** da entrega;
- **o app do cliente:** proposta pronta, até 3 confirmações e contratação em 1 toque;
- **o painel do gerente:** a mesma proposta, com a origem de cada dado, sugestões e roteiro. Ele ajusta e devolve para o cliente concluir no app.

## Os 3 diferenciais
| Diferencial | O que é | Critério da banca |
|---|---|---|
| **Baseado no contrato real** | Lemos as Condições Gerais da BB Seguros: segundo risco, primeiro risco absoluto, bens não cobertos e tabela de depreciação | Adequação da proteção (20%) |
| **Duas jornadas com a mesma ficha** | O gerente recebe o contexto, ajusta e devolve para o 1 toque do cliente | Jornada (15%) + inovação (20%) |
| **Provar, não prometer** | Teste de justiça (renda e idade não mudam nada), reprodutibilidade e fontes oficiais com o PDF guardado | Explicabilidade (10%) + privacidade (10%) + dados (15%) |

## Regras que nunca quebramos
- **Renda, idade, dependentes e pet não decidem nada.**
- **Estimativa nunca aparece como fato:** cada dado é observado, estimado, inferido ou confirmado.
- **Elegibilidade antes de recomendar;** sinal fraco vira pergunta, não recusa.
- **O motor funciona sem internet;** as fontes externas ficam salvas no projeto.

## Frase para o pitch
> "Hoje o app sugere R$ 3 mil de roubo para todo mundo. A gente já sabe o que cada cliente tem, monta a proposta sozinho e explica cada número. O cliente só confirma."

## Próximo passo
- [02 · Pesquisa e fontes](02-pesquisa-e-fontes.md)
