# 15 · T7 · Demo do gerente lendo o motor

**Em uma frase:** o protótipo com as duas jornadas agora mostra **os dados reais do motor** para os 3 casos contrastantes. É a prova visual de que a mesma ficha serve ao cliente e ao gerente.

**Onde estamos:** Fase 2 · Tarefa T7 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issue #7

## O que fizemos
- **`motor/gerar.py --entrega`** passou a escrever **`prototipos/fichas_demo.js`**, com as fichas completas dos 3 casos contrastantes e alguns sinais (parcela, aluguel, vidraçaria, obra).
  - É um `.js`, e não `.json`, para o protótipo funcionar **aberto com dois cliques**, sem servidor.
- **`prototipos/indexprototipo_gerente.html`** carrega esse arquivo. Se ele não existir, tudo continua como antes, com o caso escrito no código.
  - **Seletor "Caso real do motor"** no painel lateral: **1 toque** (CASO_00005, apê financiado em Curitiba) · **Inquilino · Total** (CASO_00008) · **A confirmar** (CASO_00003, sinal de reforma).
  - **Tela "Sua casa":** tipo, relação, uso, área e faixa de bens **com o selo de origem** (observado ou estimado) e a fonte de cada dado. A pergunta mostrada é **a primeira pergunta do motor**. A barra de confiança usa o score do motor e sobe quando o cliente confirma.
  - **Quando o caso vai para o gerente** (ou o cliente toca em "Não, ajustar"), o botão passa a ser **"Falar com meu gerente"**.
  - **Tela "Seu plano":** o plano recomendado e o "por quê" são os do motor, com as linhas "Mais barato?" e "Mais caro?".
  - **Coberturas:** os valores começam no **meio da faixa** do motor. O texto do incêndio explica o segundo risco quando ele se aplica.
  - **Painel do gerente:** "O que o motor sabe e de onde veio" (com o peso de cada dado), as pendências, as perguntas do motor e as fontes. As sugestões e o roteiro passaram a depender do caso; antes eram frases fixas do caso de Curitiba.

## Como usar na demonstração (roteiro do vídeo)
1. Abra `prototipos/indexprototipo_gerente.html` com dois cliques.
2. **Caso "1 toque":** Aviso → E se acontecer? → Sua casa (confirma os bens) → Seu plano (motivo) → contratar.
3. **Caso "A confirmar":** Sua casa mostra o aviso de reforma → "Falar com meu gerente" → pedido → **painel do gerente** com pendências, perguntas e fontes → ajustar → enviar → o cliente recebe a proposta ajustada.
4. **Caso "Inquilino":** mostre o Total recomendado e a perda de aluguel calculada pelo aluguel pago.

## Por que importa
- **O guia pede, no vídeo, a "demonstração da jornada funcionando do início ao resultado".** Agora ela funciona com dados reais.
- **Critério da banca:** jornada (15%), inovação (20%) com o diferencial 2 (duas jornadas com a mesma ficha), viabilidade (10%).

## O que você precisa entender
- **O protótipo não recalcula nada;** ele **lê** o que o motor decidiu. Por isso o plano e as faixas da demo são os mesmos da planilha entregue.
- **Os preços continuam ilustrativos.** A fórmula de preço é a do time e não faz parte do motor.
- **Para atualizar a demo depois de mudar o motor:** rode `python motor/gerar.py --entrega`.

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| `fichas_demo.js` com só os 3 casos | Carregar as 138 fichas | Mais leve e focado no roteiro do vídeo |
| Valor inicial no meio da faixa | O mínimo da faixa | Mostra a estimativa central; o gerente ajusta para cima ou para baixo |
| Manter o caso escrito como reserva | Depender do arquivo | Se o arquivo faltar, a demo não quebra |

## Como conferir
```bash
python motor/gerar.py --entrega
```
Depois, abra `prototipos/indexprototipo_gerente.html`, troque os 3 casos no painel lateral e passe pelas 13 telas. Resultado esperado: nenhum erro, e o plano e o motivo iguais aos da planilha para o mesmo `imovel_id`.

## Pendências e riscos
- As telas "E se acontecer?" e "O que cobre" ainda usam cenários de exemplo (valores ilustrativos), não as faixas do motor.
- O preço ilustrativo sobe com coberturas maiores. Se a banca perguntar, a resposta é: o desafio não pede preço, e ele está marcado como ilustrativo.

## Frase para o pitch
> "Este é um caso real da base de teste. O cliente vê a proposta pronta, com a origem de cada dado. Se precisar de ajuda, o gerente recebe a mesma ficha, com as perguntas e as fontes, ajusta e devolve para o app."

## Próximo passo
- [90 · Revisão do time](90-revisao.md)
