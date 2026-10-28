---
tags: [solucao, decisao, debate]
data: 2026-10-27
status: substituida
---
# Planos de jornada para o debate

> **Substituída.** O grupo achou que só o One Click Buy fazia sentido e pediu tudo dentro do app. Versão atual: [[Jornada dentro do app - ideias v3]].

O **motor** é o mesmo em todos os planos: lê os dados, decide elegibilidade, perfil, plano, faixas, confiança, perguntas e motivo ([[Como o motor funciona - exemplo real]]). O que muda é **como a proposta chega ao cliente** (a "ponte"). Decidir isso primeiro; a execução vem depois.

## Os 6 planos
### Plano 1: One Click Buy explicado
- **Como funciona:** a proposta pronta aparece no app. O cliente vê o plano, o motivo em 2 linhas, os 3 planos lado a lado e, no máximo, 2 confirmações antes de **Contratar**.
- **Exemplo:** "Seu apartamento, *protegido*. Plano Total. Um vazamento pode atingir o vizinho de baixo." → Contratar.
- **Para quem:** maturidade digital alta (805 clientes na base de desenvolvimento).
- **Lá fora:** Santander + Aviva (Reino Unido) cortaram mais da metade das perguntas usando dados do imóvel; a cotação média ficou abaixo de 3 minutos.
- **Prós:** é o exemplo da banca; mais rápido. **Contras:** sozinho não atende quem tem dificuldade com app.

### Plano 2: Gerente primeiro (cartão do gerente)
- **Como funciona:** o gerente recebe a lista de clientes com proposta pronta e um cartão: como puxar o assunto, plano, faixas, 1 a 3 perguntas para fazer em voz alta, e "se ele ligar com dúvida".
- **Exemplo:** "Vi que o senhor mora em apartamento. Já pensou se um cano estoura e molha o vizinho?"
- **Para quem:** maturidade digital baixa (394 clientes) e quem não usa app (284).
- **Lá fora:** Commonwealth Bank (Austrália) sugere a "próxima melhor conversa" para cerca de 10 mil funcionários.
- **Prós:** cobre o público menos digital; atende a RN-50. **Contras:** depende do tempo do gerente.

### Plano 3: Conversa guiada no WhatsApp
- **Como funciona:** o cliente recebe uma mensagem com a proposta resumida e responde às perguntas com botões ("Sim", "Não", "Falar com alguém"). Pode pedir para um atendente assumir a conversa.
- **Exemplo:** "Olá! Preparamos uma proteção para o seu apartamento. Você mora no endereço terminado em AP 204? [Sim] [Não]"
- **Para quem:** quem não gosta de app, mas usa WhatsApp. Segundo a TIC Domicílios citada pela FGV, 90% dos idosos que usam internet mandam mensagens instantâneas, mas só 35% fazem transações financeiras online.
- **Lá fora:** o Banco Sabadell (Espanha) atende clientes de seguro residencial pelo WhatsApp desde 2020; a SBI General (Índia) vende seguro por WhatsApp. O próprio BB já faz Pix pelo WhatsApp.
- **Prós:** canal que a pessoa mais velha já usa; tudo fica registrado. **Contras:** precisa de cuidado com golpes (sempre pelo número oficial, nunca pedir senha).

### Plano 4: Oferta no momento certo
- **Como funciona:** o motor dispara a oferta quando aparece um sinal de "momento": financiamento imobiliário ativo, imóvel novo na base, compra grande de móveis ou eletrônicos.
- **Exemplo:** cliente com parcela de financiamento e sem seguro residencial → oferta junto do extrato do financiamento.
- **Na base:** 781 imóveis financiados, **645** de clientes sem seguro residencial.
- **Lá fora:** no Westpac (Austrália), a fatia de clientes de financiamento que também contrata seguro residencial subiu de 38% para 45% em um ano.
- **Prós:** conversão maior; usa sinal que já temos. **Contras:** é mais "quando" do que "como"; combina com os outros planos.

### Plano 5: Telefone com código da proposta
- **Como funciona:** o cliente (ou o app) pede "me liga". A central abre a proposta pelo código e conduz a conversa, vendo a mesma tela do cliente.
- **Lá fora:** UBS e Glarner Kantonalbank (Suíça) com co-navegação.
- **Prós:** resolve suporte e dúvida pós-venda. **Contras:** custo de atendimento.

### Plano 6: Híbrido escolhido pelo motor (recomendado)
- **Como funciona:** o motor escolhe o canal pelo **comportamento digital** (nunca pela idade):
  - maturidade alta → Plano 1;
  - média → Plano 3 (WhatsApp) com o botão "falar com alguém";
  - baixa ou sem app → Plano 2 (gerente) ou 5 (central);
  - quem tem sinal de momento (Plano 4) entra antes na fila.
- **Por que recomendo:** é o "multicanal" que a banca pediu (RN-04, inovação 20%), atende pessoas mais velhas sem quebrar a RN-07 e usa o mesmo resultado em todos os canais.

## O que entra em qualquer plano
[[Calculadora de reconstrução]] · [[Proposta em 3 camadas]] (com resumo de uma página e modo leitura fácil) · [[Perguntas que valem a pena]] (máx. 3) · [[Três opções com recomendação explicada]] · [[Checagem de entendimento]] · [[Painel de evidências]].

## Sugestão para o MVP (o que dá para mostrar até quinta)
- **Fazer de verdade:** motor + Plano 1 (tela do app) + Plano 2 (cartão do gerente) + escolha de canal do Plano 6 (só a regra).
- **Mostrar como tela de exemplo:** Plano 3 (mensagem de WhatsApp) e Plano 4 (lista de clientes "no momento certo").
- **Citar no pitch:** Plano 5.

## A ideia do satélite
Ver [[Imagem de satélite]]. Resumo: não funciona no nível do imóvel nesta base, porque as coordenadas são fictícias (RN-10). Dá para usar no nível do **município** como referência auxiliar, com valor neutro quando faltar.

## Perguntas para o time decidir
1. Qual plano (ou combinação) vamos demonstrar no vídeo?
2. WhatsApp entra como tela de exemplo ou fica de fora?
3. O satélite entra como módulo do município, como "próximos passos" ou sai?

Ligações: [[Ideias v2 - proposta para o time]] · [[O sistema na prática - 4 cenas]] · [[Regras de negócio]] · [[Canal pelo comportamento digital]] · [[Cartão do gerente]] · [[Click-to-buy]]
