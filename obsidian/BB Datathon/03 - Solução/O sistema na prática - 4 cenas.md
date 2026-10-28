---
tags: [solucao, didatico, inovacao]
data: 2026-10-27
---
# O sistema na prática: 4 cenas

Como o motor apareceria no dia a dia, cada cena inspirada em algo que já funciona lá fora. Exemplo de cliente: CASO_00008 (apartamento em Fortaleza, inquilino, 3 dependentes). Ver [[Como o motor funciona - exemplo real]].

## Cena 1: o cliente abre o app (One Click Buy)
O cliente vê um card "Seu apartamento, *protegido*" com o plano Total já recomendado, o motivo em duas linhas e os dois outros planos ao lado. Embaixo, "o que a gente usou": apartamento (a gente sabe), 125 m² (cadastro da prefeitura). Dois botões: **Contratar** e **Falar com uma pessoa**.

- **Inspiração:** Santander + Aviva (Reino Unido) cortaram mais da metade das perguntas da cotação de seguro residencial usando dados que já existiam sobre o imóvel; a cotação média ficou em menos de 3 minutos. A Paymentshield tirou da jornada as perguntas que o cliente não sabe responder (como o tipo de fechadura).
- **Nosso jeito:** pré-preenchimento pelos sinais do banco (aluguel, IPTU, luz, compras, endereço).

## Cena 2: o cliente tem dúvida e liga
O atendente digita o código da proposta e vê a mesma tela, com as faixas, a confiança e um bloco "se ele ligar com dúvida" (como acionar sinistro, assistência 24h, o que não cobre).

- **Inspiração:** UBS e Glarner Kantonalbank (Suíça) usam co-navegação: o consultor vê a tela do cliente durante a ligação.
- **Nosso jeito:** [[Proposta compartilhada]] + [[Cartão do gerente]].

## Cena 3: o gerente na agência, com um cliente que não usa app
A lista de clientes com maturidade digital baixa aparece para o gerente com o cartão pronto: como puxar o assunto ("já pensou se um cano estoura e molha o vizinho?"), plano, faixas e 1 a 3 perguntas para fazer em voz alta.

- **Inspiração:** Commonwealth Bank (Austrália), que sugere a "próxima melhor conversa" aos funcionários; eles escolhem e registram a reação do cliente.
- **Nosso jeito:** [[Canal pelo comportamento digital]], sem usar idade.

## Cena 4: dados externos ligados (opcional)
O mesmo cliente, com uma camada a mais: o município tem registros oficiais de chuva forte e de muitos raios. O motivo ganha uma frase, e a faixa de danos elétricos sobe um pouco. Tudo marcado como "dado público", com fonte e data. Se a fonte cair, o motor volta ao normal sem quebrar.

- **Inspiração:** nos EUA, as seguradoras consultam o mapa de enchente da FEMA pelo endereço. No Reino Unido, usam os mapas da Environment Agency e o Flood Re (fundo que assume o risco de enchente), e dados de crime abertos da polícia (data.police.uk) aparecem em ferramentas de risco por CEP.
- **Nosso jeito:** [[Enriquecimento externo]] como camada auxiliar (RN-11, RN-12).

> Os valores com dados externos nas telas de exemplo são ilustrativos. Os números reais saem quando baixarmos as fontes.

## Dados externos que podem ajudar (equivalentes brasileiros)
| Lá fora | Aqui | Ajuda em | Liga pelo |
|---|---|---|---|
| Mapa de enchente FEMA / Environment Agency | [[Atlas Digital de Desastres]] (Defesa Civil), CEMADEN | Danos por água, vendaval | Código IBGE |
| Dados de crime da polícia (data.police.uk) | [[SINESP]] e secretarias estaduais | Roubo/furto | Código IBGE ou UF |
| Calculadora de reconstrução (Cordell, BCIS) | [[SINAPI]] (IBGE) | Reconstrução | UF |
| Rede de detecção de raios | [[INPE ELAT]] | Danos elétricos | Município |
| Base de imóveis (Land Registry, LexisNexis) | Não temos equivalente aberto; usamos os sinais da base | Área, tipo | — |

**Regra de ouro:** o motor roda primeiro sem nada externo. A camada externa só pode (1) acrescentar uma frase ao motivo, (2) ajustar uma faixa dentro dos limites ou (3) sugerir uma cobertura adicional. Nunca pode tornar alguém inelegível sozinha.

## Fontes
- [Santander + Aviva](https://www.santander.co.uk/about-santander/media-centre/press-releases/santander-partners-with-aviva-to-deliver-home-insurance) · [Paymentshield](https://mortgagesoup.co.uk/paymentshield-improves-its-home-insurance-quote-process/) · [LexisNexis (pré-preenchimento)](https://risk.lexisnexis.co.uk/about-us/press-room/press-release/20180219-home-wp) · [Compare the Market + Addresscloud](https://www.addresscloud.com/blog/compare-the-market)
- [FEMA e mapas de enchente](https://www.nationalflooddata.com/blog/understanding-flood-zones-a-guide-for-insurance-agents-on-fema-flood-maps) · [Governo do Reino Unido: dados de enchente por imóvel](https://assets.publishing.service.gov.uk/media/602f9ca78fa8f54326ac0c00/_Availability_and_Uses_of_Property_Level_Flood_Risk_Data_and_Information.pdf) · [Cornwall: Flood Re](https://www.cornwall.gov.uk/environment/countryside/flood-risk/insurance-for-properties-at-risk-of-flooding/)
- [Addresscloud: dados de crime](https://help.addresscloud.com/article/46-data-ukcrim)

Ligações: [[Ideias v2 - proposta para o time]] · [[Regras de negócio]] · [[Enriquecimento externo]]
