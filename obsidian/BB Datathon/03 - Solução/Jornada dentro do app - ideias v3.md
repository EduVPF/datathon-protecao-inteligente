---
tags: [solucao, inovacao, decisao]
versao: 3
data: 2026-10-27
status: em-debate
---
# Jornada dentro do app: ideias v3

**Pedido do Matheus:** tudo dentro do app do BB, sem mandar o cliente para o WhatsApp ou para outro canal (só se for suporte de verdade); simples para quem tem dificuldade com tecnologia; resolver contratação **e** suporte no app.

O One Click Buy é só um **exemplo** do guia, não obrigação (ver [[Onde está a inovação]]). As 7 ideias abaixo são a camada de jornada, cada uma inspirada em algo real, dentro ou fora de bancos.

## 1. Seguro pronto na tela inicial, no momento certo
- **Como funciona:** um card na tela inicial ("Proteção para o seu apartamento. A gente já montou; você só confere"), igual ao crédito pré-aprovado. Aparece quando há um **momento**: financiamento ativo, imóvel novo, compra grande de móveis ou eletrônicos.
- **Dados:** `parcela_financiamento_imobiliario` (781 imóveis financiados, 645 de clientes sem seguro residencial), `compras_*_36m`, `gastos_material_construcao_24m`.
- **Inspiração:** crédito pré-aprovado nos apps; Westpac (Austrália), onde a fatia de clientes de financiamento que também têm seguro residencial subiu de 38% para 45% em um ano.
- **Regras:** RN-03, RN-04. Card só para casos elegíveis.

## 2. Modo simples (com voz)
- **Como funciona:** uma versão da jornada com letra e botões cerca de 40% maiores, **uma pergunta por tela**, sem banners, botão de voltar sempre visível, botão "ouvir" que lê tudo em voz alta e opção de responder falando ("sim", "não"). O app oferece o modo quando o cliente demora, erra toque ou tem maturidade digital baixa; nunca pela idade.
- **Dados:** `indice_maturidade_digital`, `frequencia_acesso_app_90d`, `usuario_app`.
- **Inspiração:** a China exigiu um modo para idosos nos apps mais usados (2021), e o guia do WeChat manda aumentar letras e botões em 1,4×; o Assistive Access da Apple (iOS 17) faz o celular inteiro virar botões grandes; o próprio BB já tem Pix por voz e o Meu Assistente BB.
- **Regras:** RN-07 (comportamento, não idade), RN-51.

## 3. Perguntas com figura e a "casa que explica"
- **Como funciona:** as poucas perguntas usam figuras ("Sua casa parece com qual? [desenho de casa] [desenho de prédio]"). Na proposta, uma casa desenhada: o cliente toca na cozinha, no banheiro ou no telhado e vê o que está coberto ali ("cano estourou: coberto", "telhado com vendaval: coberto").
- **Dados:** tipo do imóvel, plano, catálogo de coberturas.
- **Inspiração:** guias de design para idosos pedem menos texto e mais elementos visuais; seguradoras digitais como a Getsafe explicam com exemplos do dia a dia.
- **Regras:** RN-36, RN-37, RN-51.

## 4. Gerente por vídeo dentro do app, vendo a mesma tela
- **Como funciona:** botão "Falar com o gerente por vídeo". O gerente entra na chamada **dentro do app** e, com permissão do cliente, vê a mesma proposta (dados sensíveis escondidos), com o [[Cartão do gerente]] ao lado. O cliente não sai do app nem precisa repetir nada.
- **Inspiração:** U.S. Bank tem tela compartilhada com o banqueiro **com vídeo**; o Qatar Islamic Bank faz chamada de vídeo durante o pedido de empréstimo, com a tela compartilhada; fornecedores como a Unblu limitam a sessão ao app do banco e escondem campos sensíveis.
- **Regras:** RN-04, RN-34 (confirmação humana), RN-50.

## 5. Ajudante de confiança
- **Como funciona:** o cliente convida um filho, neto ou amigo (que também usa o app do BB) para **ver** a proposta e ajudar a entender. O ajudante pode deixar um "parece bom" ou uma dúvida, mas **só o titular contrata**. O cliente tira o acesso quando quiser.
- **Inspiração:** Lloyds (Trusted Person Access, só visualização), HSBC e Westpac (acesso de alguém de confiança), Nordea e OP (Finlândia). Pesquisas mostram que muitos idosos pedem ajuda aos filhos e chegam a passar a senha, o que é arriscado; esse recurso evita isso.
- **Regras:** RN-34; LGPD (consentimento do titular).

## 6. "Meu seguro": suporte e pós-venda no app
- **Como funciona:** depois de contratar, o seguro vira um card fixo no app com: o que cobre e o que não cobre ([[Resumo de uma página]]); **pedir assistência** (encanador, chaveiro, eletricista) com acompanhamento estilo app de entrega ("profissional a caminho, chega em 40 min"); avisar sinistro com fotos e status; **desistir em 7 dias com 1 toque**.
- **Por que importa:** a banca disse que o seguro não é só para o sinistro grande: as assistências do dia a dia mostram valor e reduzem as ligações para o gerente. Garantir a desistência fácil diminui o medo de contratar.
- **Inspiração:** apps de entrega e transporte (acompanhamento em tempo real); a Lemonade (EUA) resolve parte dos sinistros direto no app.
- **Regras:** RN-24 (assistências do plano), RN-50.

## 7. A mesma proposta em qualquer ponto de contato
- **Como funciona:** cada proposta tem um código. Se o cliente for à agência ou ligar, o atendente abre a mesma proposta, no mesmo estado. Não é um canal novo: é o app servindo de "fonte única".
- **Inspiração:** U.S. Bank (co-browsing com milhões de usos); UBS.
- **Regras:** RN-04, RN-38.

## Como ficaria a jornada
```
Tela inicial → card "Proteção pronta" (ideia 1)
  → proposta: plano + motivo + casa que explica (3)
     ├─ cliente confortável → 1 ou 2 confirmações → Contratar (One Click Buy)
     ├─ cliente com dificuldade → Modo simples + voz (2)
     └─ dúvida → vídeo com gerente na mesma tela (4) ou ajudante de confiança (5)
  → depois: "Meu seguro" com assistência, sinistro e desistência (6)
Tudo com o mesmo código de proposta (7). Sair do app só se o cliente pedir "me liguem".
```

## O que dá para mostrar no MVP até quinta
| Ideia | No MVP |
|---|---|
| 1. Card na tela inicial | Tela real (Streamlit) com a lista dos casos "no momento" |
| 2. Modo simples + voz | Botão que troca o layout; "ouvir" com a leitura de voz do navegador |
| 3. Casa que explica | Imagem com áreas clicáveis ou lista de cômodos |
| 4. Vídeo com gerente | Tela de exemplo + a tela do gerente real |
| 5. Ajudante de confiança | Tela de exemplo |
| 6. Meu seguro | Tela de exemplo com o acompanhamento |
| 7. Código da proposta | Real: a tela do gerente busca pelo código |

## Fontes
- Modo para idosos na China: [Sixth Tone](https://www.sixthtone.com/news/1011863/China’s Consumer Watchdog Demands More Age Friendly Apps) · [People's Daily](https://en.people.cn/n3/2021/0923/c90000-9899668-2.html) · [TechNode (WeChat)](https://technode.com/2021/09/29/wechat-rolls-out-care-mode-for-chinas-aging-population/) · [Guia do WeChat](https://developers.weixin.qq.com/miniprogram/en/design/elderly.html)
- Apple Assistive Access: [Apple](https://support.apple.com/guide/assistive-access-ipad/welcome/26/ipados) · [Perkins](https://www.perkins.org/resource/apple-unveils-new-features-for-global-accessibility-awareness-day/) · [AbilityNet](https://mcmw.abilitynet.org.uk/how-to-simplify-your-iphone-or-ipad-s-interface-using-assistive-access-in-ios-26)
- Ajudante de confiança: [Lloyds](https://www.lloydsbank.com/help-guidance/support-and-wellbeing/help-from-someone-you-trust.html) · [HSBC](https://www.hsbc.co.uk/current-accounts/products/private/how-to-appoint-an-authorised-user/) · [Westpac](https://www.westpac.com.au/help/support-with-tough-times/getting-help-from-someone-you-trust/) · [Nordea](https://www.nordea.fi/en/personal/your-life/family/vinkit-laheisten-tukemiseen-pankkiasioissa.html) · [Univ. de Manitoba (pesquisa)](https://hci.cs.umanitoba.ca/Publications/details/proxy-accounts-and-behavioural-nudges-investigating-support-for-older-adult)
- Vídeo e tela compartilhada no app: [U.S. Bank](https://usbank.com/about-us-bank/company-blog/article-library/us-bank-launches-industry-leading-video-banking-options-for-customers.html) · [U.S. Bank (co-browse)](https://it03.usbank.com/about-us-bank/company-blog/article-library/cobrowse-marks-three-year-milestone-with-millions-of-fans.html) · [Qatar Islamic Bank](https://thepeninsulaqatar.com/article/09/11/2021/qib-launches-video-banking-via-its-mobile-app) · [Unblu co-apping](https://www.unblu.com/en/platform/mobile-co-apping)
- Momento certo: [Banking Day (Westpac)](https://www.bankingday.com/article/bank-insurers-start-hitting-their-cross-sell-targets)

Ligações: [[Regras de negócio]] · [[Planos de jornada para o debate]] · [[Ideias v2 - proposta para o time]] · [[Canal pelo comportamento digital]] · [[Click-to-buy]] · [[Regras de design BB]]
