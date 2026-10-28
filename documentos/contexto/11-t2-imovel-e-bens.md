# 11 · T2 · Imóvel e bens

**Em uma frase:** o motor passou a estimar os bens de cada imóvel por três âncoras corrigidas pela inflação e a conferir o tipo do imóvel pelo complemento do endereço.

**Onde estamos:** Fase 1 · Tarefa T2 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issue #2

## O que fizemos
- **`estimar_bens(r, bens)`**: a faixa de valor dos bens, sem arredondar.
  - **Mínimo (comprovado):** o maior valor entre as compras de 36 meses e os bens vinculados, multiplicado pelo **IPCA (1,0694)** para chegar ao preço de hoje.
  - **Máximo (estoque):** 2,7 × as compras de 36 meses × IPCA. Uma casa não tem só o que comprou nos últimos 3 anos.
  - **Piso:** R$ 15 mil quando não há compras nem bens, com confiança BAIXA.
  - **Faixas por categoria:** eletrônicos, eletrodomésticos e móveis, mais três bases de cobertura: **portáteis** (roubo), **elétricos** (danos elétricos) e **molháveis** (danos por água).
- **Tipo conferido pelo complemento:** AP/APTO/BLOCO/TORRE indicam apartamento; CASA/LOTE/QUADRA/FUNDOS indicam casa. Se o complemento discordar dos termos do endereço, a confiança cai para MÉDIA. Na base de teste, **nenhum caso diverge**.
- **Reserva da área:** se a área, o IPTU e a energia estiverem zerados, usamos a mediana de imóveis do mesmo tipo no mesmo município, com confiança BAIXA.
- **Cada dado agora guarda o tipo de fonte e a idade do sinal.** A T5 usa isso para fazer "dado antigo valer menos".

## Por que importa
- **Critério da banca:** adequação da proteção (20%) e uso dos dados (15%). Os bens definem roubo, danos elétricos, água e parte do incêndio.
- **No pitch:** "a gente não pergunta quanto valem seus eletrônicos; a gente já sabe, e mostra a faixa".

## O que você precisa entender
- **Por que três âncoras?** As compras de 3 anos são o que conseguimos **provar**. Uma casa tem mais coisa do que isso, então o máximo estima o **estoque** (o que se compra por ano × vida útil, ~8 anos ≈ 2,7 × as compras de 3 anos). A faixa entre os dois é honesta sobre a incerteza.
- **Por que o maior, e não a soma, entre compras e bens?** As duas fontes falam das mesmas coisas. Somar contaria o mesmo sofá duas vezes.
- **Exemplo (CASO_00005, apê em Curitiba):** compras de R$ 20.750 → bens entre **R$ 22,2 mil e R$ 59,9 mil**.

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| Roubo usa só eletrônicos (portáteis) | Todos os bens | Arrombador leva TV e notebook, não o sofá |
| Fator de estoque 2,7 | Só as compras | As compras subestimam: nem tudo foi comprado nos últimos 3 anos |
| Itens de lazer fora das bases de cobertura | Somar no roubo | Bicicleta tem cobertura própria; drones são excluídos (CG) |

## Como conferir
```bash
python -m pytest -q
```
Resultado esperado: 11 testes passando, incluindo `test_bens_nao_le_atributos_pessoais`.

## Pendências e riscos
- O fator 2,7 é uma **premissa nossa**. É a primeira coisa a revisar se a banca questionar o máximo dos bens.
- As coberturas ainda usam a lógica antiga; a T3 troca pelas bases novas.

## Frase para o pitch
> "Pelas compras do cliente, sabemos que os bens dele valem entre R$ 22 e 60 mil. O app de hoje sugere R$ 3 mil de roubo."

## Próximo passo
- [12 · T3 Elegibilidade, plano e coberturas](12-t3-plano-e-coberturas.md)
