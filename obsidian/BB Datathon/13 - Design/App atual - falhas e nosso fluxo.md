---
tags: [design, jornada, prototipo]
data: 2026-10-27
fonte: "Prints BB.zip (43 prints do app BB, Seguro Residencial)"
---
# App atual: falhas e nosso fluxo

## Como é hoje (43 prints do grupo)
![[app-atual-prints-1.jpg]]
![[app-atual-prints-2.jpg]]
*(print 3 fora do repositório: mostra dados bancários)*

Fluxo atual: Central de Seguros → Seguro Residencial (foto + "Simular seguro") → **1/3** endereço, tipo e uso em 3 listas → **2/3** escolha do plano, cupom, vigência, lista de coberturas, Personalizar → **3/3** pagamento.

## Falhas
| # | Falha | Quem viu |
|---|---|---|
| 1 | Jornada só de One Click Buy: o cliente decide sozinho, sem ajuda nem motivo | grupo |
| 2 | Dois planos espremidos lado a lado; o **Total some para a direita** e não fica claro que dá para arrastar | grupo |
| 3 | Para entender cada cobertura ou assistência: popup dentro de popup (6 pacotes com cerca de 20 telas de texto) | grupo |
| 4 | Personalização com campos de digitar valor; difícil entender o que muda | grupo |
| 5 | **Preço errado na personalização:** Prático sem roubo e sem vidros fica com o mesmo preço, embora vire o Essencial com 2 assistências a mais | grupo |
| 6 | Não existe botão para falar com uma pessoa | grupo |
| 7 | O app não mostra por que vale a pena ter seguro (abre com foto genérica) | grupo |
| 8 | Preço muda entre sessões sem explicação (Prático aparece como 12x R$ 51,55 e 12x R$ 69,11) | análise |
| 9 | Franquia ("10%, mínimo R$ 450") só aparece no popup do popup | análise |
| 10 | Cupom aparece antes de o cliente entender o produto | análise |
| 11 | Valor padrão de danos por água (R$ 5 mil) é baixo para um alagamento real; o cliente fica subsegurado sem saber | análise |
| 12 | O app pede tipo e uso do imóvel mesmo quando o banco já sabe (financiamento, IPTU, endereço) | análise |

Dados úteis tirados das prints (valor padrão, mínimo e franquia): incêndio R$ 300 mil (mín. R$ 100 mil, sem franquia); danos elétricos R$ 10 mil (R$ 5 mil a R$ 30 mil, franquia 10% mín. R$ 450); danos por água R$ 5 mil (mín. R$ 3 mil, franquia 10% mín. R$ 1.000); vendaval R$ 20 mil (mín. R$ 1 mil, franquia 10% mín. R$ 500); impacto de veículos/aeronave R$ 10 mil (franquia 10% mín. R$ 400); roubo R$ 3 mil (R$ 1 mil a R$ 45 mil, franquia 10% mín. R$ 400); vidros R$ 1,5 mil (R$ 1 mil a R$ 25 mil, franquia R$ 150); pequenos reparos R$ 1 mil. Vigência: 2 anos -5%, 3 anos -9,6%, 4 anos -14%, 5 anos -18%.

## Nosso fluxo (protótipo)
Arquivo: `prototipo/index.html` no repositório (abre no navegador). Caso real: CASO_00005, apartamento financiado em Curitiba.

| Tela | O que faz | Resolve |
|---|---|---|
| 1. Aviso | Notificação do app (e WhatsApp oficial só como lembrete) com motivo real: chuva em Curitiba, o seguro do condomínio não cobre o que tem dentro do apê | 7 |
| 2. E se acontecer? | Escolhe uma situação (alagou, raio, molhei o vizinho, arrombamento) com desenho; mostra o prejuízo sem e com seguro | 7, 11 |
| 3. Sua casa | Mostra o que o banco já sabe, com a origem de cada dado; 1 pergunta com figura; a confiança sobe na hora | 12, 1 |
| 4. Seu plano | 3 planos em lista vertical, o recomendado destacado com o motivo, "o que muda" em uma linha | 2, 10 |
| 5. O que cobre | "Casa que explica": toca no cômodo e vê coberto ou não, com a franquia; assistências em grade com ícone | 3, 9 |
| 6. Ajustar | Liga/desliga e barras; preço recalcula na hora; avisa quando o Prático vira o Essencial e sugere o mais barato | 4, 5 |
| 7. Conferir | Vigência com desconto em reais, 2 confirmações do que não cobre, desistência em 7 dias, pagamento | 1, 8 |
| 8. Meu seguro | Pós-venda no app: assistência com acompanhamento estilo entrega, sinistro, desistência | 6 |
| Sempre | Botão **Ajuda** em todas as telas: chat, vídeo com gerente na mesma tela, ajudante de confiança, "me liguem"; botão **Aa** (modo simples) e **Ouvir** (leitura em voz alta) | 6, 1 |

## O que é ilustrativo
Preços (calibrados nos valores vistos no app), prejuízos dos cenários e conversa do chat. A chuva em Curitiba como gancho precisa de fonte oficial antes de ir para o vídeo ([[Enriquecimento externo]]).

Ligações: [[Regras de design BB]] · [[Jornada dentro do app - ideias v3]] · [[Onde está a inovação]] · [[Catálogo do Seguro Residencial BB]] · [[Regras de negócio]]
