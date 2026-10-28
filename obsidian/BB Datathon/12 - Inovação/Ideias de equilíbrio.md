---
tags: [inovacao, mapa, equilibrio]
atualizado: 2026-10-27
---
# Ideias de equilíbrio: rápido, mas entendível

> **Versão antiga.** A proposta atual, já filtrada pelas regras do guia, está em [[Ideias v2 - proposta para o time]].

O problema que a banca colocou: se a jornada for rápida demais, o cliente contrata sem entender. Se for longa demais, cansa o cliente e o gerente. E mesmo quando o cliente contrata sozinho no app ([[Click-to-buy]]), ele liga para o gerente quando tem dúvida, então o gerente precisa saber explicar o produto e o que acontece depois (sinistro, assistência).

Separei 6 ideias que já funcionam fora do Brasil, que eu **não encontrei no site da BB Seguros nem no do BB** (conferido em 27/10/2026) e que usam só dados que vamos receber, ou o [[SINAPI]].

| # | Ideia | Quem usa | Dados que usa | Esforço |
|---|---|---|---|---|
| 1 | [[Calculadora de reconstrução]] | Austrália (Cordell, +90% das seguradoras), Reino Unido (BCIS) | área do imóvel + UF + custo do m² | Baixo |
| 2 | [[Resumo de uma página]] | União Europeia (documento IPID, obrigatório) | plano + coberturas + faixas | Baixo |
| 3 | [[Coberto ou não coberto]] | Getsafe (Alemanha), Lemonade (EUA) | tipo do imóvel, bens, dependentes | Baixo |
| 4 | [[Checagem de entendimento]] | Reino Unido (regra Consumer Duty da FCA, desde 2023) | exclusões do plano escolhido | Baixo |
| 5 | [[Próxima conversa do gerente]] | Commonwealth Bank (Austrália) | sinais do cliente + motivo | Médio |
| 6 | [[Proposta compartilhada]] | UBS e Glarner Kantonalbank (Suíça) | o resultado do motor (um arquivo por cliente) | Médio |

Bônus para "próximos passos": [[Vídeo de boas-vindas personalizado]] (Liberty Mutual e Nationwide nos EUA).

## Como elas se encaixam na jornada
```
Cliente abre o app
  └─ proposta pronta (click-to-buy)
       ├─ 1. quanto custaria reconstruir a casa dele
       ├─ 2. resumo de uma página do plano
       ├─ 3. exemplos "coberto / não coberto" do jeito da casa dele
       ├─ 4. duas confirmações de entendimento antes do botão CONTRATAR
       └─ contrata

Cliente liga com dúvida
  └─ gerente digita o código da proposta (6)
       └─ vê a mesma tela + o roteiro de conversa (5), incluindo "como acionar se der problema"
```

## Por que isso equilibra
- O cliente continua com poucas perguntas: as ideias 1, 2 e 3 **mostram** informação, não pedem.
- A ideia 4 coloca um "freio" só onde importa: o que o plano **não** cobre.
- As ideias 5 e 6 dão ao gerente o mesmo material que o cliente viu, então ele explica sem ter participado da venda.

## E o click-to-buy?
A banca deu como exemplo, e eu concordo que sozinho ele não impressiona. Com as ideias 2, 3 e 4 ele vira um **click-to-buy explicado**: continua rápido, mas o cliente sabe o que assinou. Isso responde direto à preocupação da banca.

Ligações: [[Ideias de inovação]] · [[Regras e contexto]] · [[Jornada do cliente]] · [[Jornada do gerente]] · [[Referências de mercado]]
