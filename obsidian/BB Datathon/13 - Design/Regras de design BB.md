---
tags: [design, regras]
atualizado: 2026-10-27
---
# Regras de design BB

Regras para o MVP parecer um produto do Banco do Brasil. Tirei tudo do site bb.com.br, do site da BB Seguros e das telas atuais do App BB (out/2026). Os detalhes da análise estão em [[Análise do visual do BB]].

## 1. Cores
Valores medidos no CSS do site oficial.

| Token | Hex | Uso |
|---|---|---|
| `amarelo` | `#FCFC30` | Topo do site, botão principal de marketing, destaques. É a cor que diz "BB". |
| `azul` | `#465EFF` | Cabeçalho do app, títulos de seção, botões, ícones |
| `azul-escuro` | `#2D37F5` | Links e texto azul pequeno (contraste melhor) |
| `azul-hover` | `#3135D9` | Hover/pressionado |
| `azul-claro` | `#E4ECFF` | Fundo de card de destaque, botão secundário, círculo de ícone |
| `texto` | `#111214` | Texto principal (quase preto, nunca preto puro) |
| `texto-suave` | `#6C7077` | Legendas, rótulos, texto de apoio |
| `fundo` | `#F4F4F6` | Fundo da tela atrás dos cards |
| `borda` | `#DBDDE1` | Divisórias e bordas de input |
| `branco` | `#FFFFFF` | Cards e folhas |

Cores de apoio (usar pouco): turquesa das peças de marketing do app (estimado `#3BE0C9`) e o coral da BB Seguros (`#FF6F68`, botão "Faça sua cotação"). Para estados, use verde/amarelo/vermelho só no [[Semáforo de confiança]].

**Contraste (WCAG):**
- Azul `#465EFF` no branco: 4,9:1. Passa para texto normal.
- Azul `#465EFF` no amarelo: 4,4:1. Só em texto **bold ≥ 16px** (botões e títulos), como o próprio BB faz.
- Azul-escuro `#2D37F5` no amarelo: 6,4:1. Usar em links sobre amarelo.
- Nunca texto amarelo em fundo branco.

## 2. Tipografia
O BB usa fontes próprias: **BancoDoBrasil Títulos** (arredondada, com itálico expressivo) e **BancoDoBrasil Textos**. Elas não são públicas, então no MVP usamos:

| Papel | No BB | No MVP (Google Fonts) |
|---|---|---|
| Títulos | BancoDoBrasil Títulos Bold | **Nunito** 800 (terminais arredondados, parecida) |
| Texto | BancoDoBrasil Textos Regular | **Inter** 400/500/600 (a BB Seguros já usa Inter) |

Escala usada no site: 15px de texto corrido, 14 e 12 para apoio, 16/20/24/32 para títulos. No app (mobile): títulos de tela 20px, seção 18px bold, texto 15px, legenda 12px.

**Marca registrada do BB:** título com uma parte em itálico para dar ênfase. Ex.: "O Pix *que te acompanha*", "BB me *resolve*". Usar isso nos títulos da proposta: "Sua casa *protegida*".

## 3. Forma e espaço
- **Raio:** 4px (botões pequenos, chips), 8px (cards, botões grandes), 16px (folha branca do app que sobe sobre o cabeçalho azul), 999px (pílulas).
- **Sombra de card:** `0 6px 8px rgba(24,24,27,.06), 0 1px 4px rgba(24,24,27,.08), 0 0 1px rgba(24,24,27,.08)`. Discreta.
- **Espaçamento:** múltiplos de 4 (8, 12, 16, 24, 32). Margem lateral no celular: 16px.
- Muito branco, pouca linha. Os cards se separam pela sombra e pelo fundo `#F4F4F6`.

## 4. Componentes (como o app atual faz)
- **Cabeçalho do app:** fundo azul, seta de voltar + título branco à esquerda, ícones à direita. Abaixo, uma folha branca com raio 16px no topo.
- **Cabeçalho secundário:** fundo branco, seta + título em azul.
- **Botão primário:** amarelo com texto azul bold MAIÚSCULO, raio 8px, altura ~46px (ex.: "SAIBA MAIS"). Na área logada do app, o principal costuma ser azul com texto branco.
- **Botão secundário:** fundo `azul-claro`, texto azul (ex.: "Colar" no Pix).
- **Atalhos:** grade de 4 colunas; círculo `azul-claro` com ícone azul de traço e rótulo de 2 linhas embaixo.
- **Card de destaque:** fundo `azul-claro`, título bold, valor grande, link azul à direita ("Gerenciar limites").
- **Input:** fundo cinza claro, sem borda forte, raio 8px, botão de ação dentro.
- **Tabela de planos (BB Seguros):** 3 colunas, check ✔ azul e x cinza, preço "a partir de R$ X/mês" e botões "SAIBA MAIS / SIMULE ONLINE".
- **Ícones:** traço (outline), azul, cantos arredondados. Sugestão: Lucide ou Phosphor.

## 5. Jeito de escrever (voz BB)
- Informal e curto, segunda pessoa: "pra você", "Resolve num áudio", "BB me resolve".
- Verbo de ação nos botões: CONTRATAR, SIMULAR, CONHECER, SAIBA MAIS.
- Seguro com tom de cuidado: "Dormir com segurança e acordar protegido", "os perrengues do lar a gente resolve".
- Nada de juridiquês na tela principal. Detalhe técnico fica em "ver detalhes".

## 6. Aplicando no nosso MVP
- **Tela do cliente (app):** cabeçalho azul "Seguro Residencial" → folha branca → título "Sua casa *protegida*" → card da proposta → [[Semáforo de confiança]] dos dados → 2 ou 3 [[Perguntas de confirmação]] em chips → [[Três opções lado a lado]] (Essencial, Prático, Total) → [[Motivo da recomendação]] → botão CONTRATAR.
- **Tela do gerente:** layout de desktop, fundo `#F4F4F6`, cards brancos; topo amarelo fino com o logo; [[Copiloto do gerente]] em card `azul-claro`.
- Planos e coberturas com os nomes reais: ver [[Catálogo do Seguro Residencial BB]].
- O código do tema está no repositório em `app/tema.css` e `.streamlit/config.toml`.

## 7. Não fazer
- Usar o logo do BB fora do contexto do datathon ou publicar o MVP como se fosse oficial.
- Usar gradiente, neon ou sombra pesada.
- Encher a tela de amarelo: ele é destaque, não fundo de tudo (no app logado o azul domina).
- Texto em preto puro `#000`.

Ligações: [[Regras e contexto]] · [[Análise do visual do BB]] · [[Jornada do cliente]] · [[Jornada do gerente]]
