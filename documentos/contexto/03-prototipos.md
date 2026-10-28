# 03 · Protótipos das jornadas

**Em uma frase:** testamos quatro versões do app; a **versão com gerente** é a base, porque é a única que mostra as duas jornadas completas.

**Onde estamos:** antes do código do motor. Os arquivos estão em `prototipos/`.

## As versões
| Arquivo | O que tem | Lição |
|---|---|---|
| `indexprototipo.html` (v1 do time) | 8 telas: aviso, "E se acontecer?", sua casa, plano, o que cobre, ajustar, conferir, meu seguro | Boa conscientização, mas longa |
| `indexprototipo_gerente.html` (**base**) | v1 + 5 telas de gerente: pedir ajuda, aviso, painel do gerente, retorno e proposta ajustada | **As duas jornadas completas.** É a que vamos ligar ao motor |
| `indexprototipo_v2.html` | Enxuta: 2 telas até contratar, o resto em painéis | Ficou rápida, mas perdeu a conscientização |
| `indexprototipo_v3.html` | v2 + tela "Seu apê guarda ≈ R$ 21 mil" | Boa ideia (bens como conscientização), mas perdeu partes essenciais da v1 |

## O que aprendemos com o app atual do BB (37 prints)
- **3 passos e valores padrão iguais para todos:** incêndio R$ 300 mil, roubo R$ 3 mil, danos elétricos R$ 10 mil.
- **O cliente escolhe o plano comparando quantidades** ("6 coberturas, 1 assistência").
- **Não há botão para falar com uma pessoa.**
- **As franquias ficam escondidas** dentro de janelas.

## Como o protótipo usa o motor (tarefa T7)
O protótipo com gerente vai ler `motor/saida/fichas.json` e mostrar **3 casos contrastantes** escolhidos pelo motor:
- um caso de **1 toque limpo**;
- um **inquilino com o Total**;
- um caso com **elegibilidade a confirmar**, que vai para o gerente.

Se o arquivo não carregar, ele usa o caso escrito no código.

## O que você precisa entender
- **O protótipo não é a entrega principal.** É a demonstração que vai no vídeo ("jornada funcionando do início ao resultado").
- **O valor dele está em mostrar que a mesma ficha serve ao cliente e ao gerente.**

## Frase para o pitch
> "O cliente confirma com 1 toque. Se tiver dúvida, o gerente recebe a mesma proposta com o motivo de cada número, ajusta e devolve para o app."

## Próximo passo
- Fase 1 do código: [10 · T1 Parâmetros](10-t1-parametros.md)
