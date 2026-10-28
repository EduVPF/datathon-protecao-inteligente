# Protótipo: Seguro Residencial BB (fluxo novo)

Especificação para recriar e evoluir o protótipo clicável do nosso time no Datathon Proteção Inteligente (Banco do Brasil). Versão 1, 28/10/2026.

> **Para quem vai continuar o trabalho:** este documento tem tudo o que é preciso para refazer o protótipo de forma muito próxima: contexto, regras do datathon, dados do caso usado, design, telas, textos, lógica de preço e checklist de aceite. Não precisa ficar visualmente idêntico, mas o fluxo, as regras e a lógica devem ser respeitados. O arquivo de referência `index.html` (um arquivo só, HTML + CSS + JavaScript, sem build) acompanha este documento.

---

## Sumário
1. [Contexto em 1 minuto](#1-contexto-em-1-minuto)
2. [Regras que o protótipo não pode quebrar](#2-regras-que-o-protótipo-não-pode-quebrar)
3. [Problemas do app atual que o fluxo resolve](#3-problemas-do-app-atual-que-o-fluxo-resolve)
4. [Caso usado na demonstração](#4-caso-usado-na-demonstração)
5. [Stack e estrutura](#5-stack-e-estrutura)
6. [Design](#6-design)
7. [Produto e lógica de preço](#7-produto-e-lógica-de-preço)
8. [Telas, uma por uma](#8-telas-uma-por-uma)
9. [Elementos fixos em todas as telas](#9-elementos-fixos-em-todas-as-telas)
10. [Painel lateral de apresentação](#10-painel-lateral-de-apresentação)
11. [Acessibilidade e público com dificuldade em tecnologia](#11-acessibilidade-e-público-com-dificuldade-em-tecnologia)
12. [O que é ilustrativo](#12-o-que-é-ilustrativo)
13. [Checklist de aceite](#13-checklist-de-aceite)
14. [Como pedir para o assistente recriar](#14-como-pedir-para-o-assistente-recriar)
15. [Ideias em aberto para o time decidir](#15-ideias-em-aberto-para-o-time-decidir)

---

## 1. Contexto em 1 minuto
- **Datathon:** Proteção Inteligente, do Banco do Brasil. Nosso desafio é o **Seguro Residencial** (o guia oferecia residencial ou empresarial).
- **O produto já existe.** BB Seguros vende 3 planos: Essencial, Prático e Total. Ninguém pediu cobertura nova.
- **O que pedem:** uma "inteligência" que use os dados do banco para montar a proposta certa para cada cliente + imóvel: elegibilidade, plano, coberturas com faixa mínima e máxima, grau de confiança, poucas perguntas de confirmação e **o motivo** da recomendação.
- **Fluxo oficial do guia:** sinais → sugestão inicial → confiança → confirmação → recomendação.
- **One Click Buy é só um exemplo de canal**, não obrigação. O guia diz que a solução "poderá apoiar" One Click Buy, atendimento assistido ou agentes autônomos, "ou combinação". No áudio da apresentação: "você não precisa dizer qual canal vai usar".
- **Nossa posição:** o One Click Buy do app atual deixa o cliente sozinho e cheio de dúvida. Nosso fluxo segura o cliente **dentro do app**, explica com exemplos da vida dele e tem ajuda humana a um toque.
- **Entrega:** 29/10 até 10h (templates, código, README, vídeo de até 5 min). Pitch de 5 min + 5 min de perguntas.
- **Peso na nota:** inovação 20%, adequação 20%, jornada 15%, uso dos dados 15%, explicabilidade 10%, viabilidade 10%, privacidade 10%.

## 2. Regras que o protótipo não pode quebrar
Tiradas do guia oficial. Cada tela precisa respeitar todas.

| Código | Regra |
|---|---|
| RN-07 | **Idade, renda e atributos pessoais nunca decidem risco, plano, valor ou canal.** Canal e "modo simples" vêm do comportamento digital (índice de maturidade, uso do app), nunca da idade. |
| RN-09 | Estimativa nunca aparece como fato. Todo dado mostrado tem origem: **observado** (veio do cadastro), **estimado** (calculado) ou **confirmado** (o cliente respondeu). |
| RN-10 | Coordenadas e endereços da base são fictícios. Só município, UF e código IBGE são reais. |
| RN-12 | O fluxo funciona sem dado externo. Dado externo (ex.: chuva na cidade) só enriquece o texto, com fonte e data. |
| RN-15 a RN-19 | Elegibilidade antes de recomendar. Falta de dado vira pergunta, não recusa. Não aceita: imóvel em obra ou reforma, material combustível, comunidade/favela, ligado a atividade rural, tombado, endereço que já tem seguro BB. |
| RN-21 a RN-24 | As 6 coberturas fixas do Essencial não saem (só muda o valor). Adicionais do Prático e do Total podem entrar ou sair. Assistências não são customizáveis. |
| RN-26 | Vigência de 1 a 5 anos (não correntista: só 1 ano). |
| RN-34, RN-37 | Recomendação explicável, revisável, com confirmação humana e alternativas para comparar. |
| RN-36 | Poucas perguntas, objetivas, de preferência sim/não. |
| RN-50, RN-51 | O gerente precisa conseguir explicar o produto e o pós-venda. Rápido, mas o cliente entende o que assina. |

**Regra do time:** tudo acontece **dentro do app do BB**. WhatsApp só como lembrete que leva para o app. Sair do app só se o cliente pedir ("me liguem").

## 3. Problemas do app atual que o fluxo resolve
Analisamos 43 prints do app real (seção Seguro Residencial).

| # | Problema no app atual | Onde resolvemos |
|---|---|---|
| 1 | Jornada só de One Click Buy: o cliente decide sozinho, sem motivo nem ajuda | Telas 3, 4, 7 + botão Ajuda |
| 2 | Dois planos espremidos lado a lado; o Total some para a direita (carrossel escondido) | Tela 4 |
| 3 | Popup dentro de popup para entender cada cobertura e assistência (~20 telas de texto) | Tela 5 |
| 4 | Personalização com campos de digitar valor | Tela 6 |
| 5 | **Preço errado:** tirar roubo e vidros do Prático não muda o preço | Tela 6 |
| 6 | Não existe botão para falar com uma pessoa | Botão Ajuda fixo |
| 7 | Abre com foto genérica; não mostra por que ter seguro | Telas 1 e 2 |
| 8 | Preço muda entre sessões sem explicação (Prático 12x R$ 51,55 numa, 12x R$ 69,11 em outra) | Preço com motivo na tela 4 |
| 9 | Franquia escondida no popup do popup | Tela 5 |
| 10 | Cupom antes de o cliente entender o produto | Removido do fluxo principal |
| 11 | Danos por água vem com R$ 5 mil, pouco para um alagamento real | Telas 2 e 6 |
| 12 | Pergunta tipo e uso do imóvel mesmo quando o banco já sabe | Tela 3 |

Fluxo do app atual: Central de Seguros → Seguro Residencial ("Simular seguro") → 1/3 endereço, tipo e uso em 3 listas → 2/3 plano, cupom, vigência, coberturas, Personalizar → 3/3 pagamento.

## 4. Caso usado na demonstração
Caso real da base de teste do datathon (`data/raw/teste_comum`), **CASO_00005 / IMO_CASO_00005_01**:

| Campo | Valor | Como aparece no app |
|---|---|---|
| Município | Curitiba (PR) | |
| Complemento | BLOCO B APTO 305 | "Bloco B, apto 305" |
| Tipo | Apartamento (`possui_termo_apartamento = SIM`) | observado, "pelo endereço" |
| Área | 110 m², origem CADASTRO_IPTU | observado, "cadastro do IPTU" |
| Financiamento | parcela R$ 950/mês | observado, "parcela no BB" → "Seu, financiado" |
| Condomínio | R$ 650/mês | |
| Dependentes | 1 | estimado ("Você + 1 dependente") |
| Compras de eletrônicos (36 meses) | R$ 8.800 | base do valor dos bens |
| Bens (estimativa exibida) | ~R$ 13.000 (8.800 + 4.200) | estimado, "pelas compras" |
| Mora no endereço | `endereco_principal_compativel = SIM` | confirmado por pergunta na tela 3 |
| Maturidade digital | 62 (média) | justifica oferecer modo simples e ajuda |
| Já tem seguro residencial | Não | elegível |

**Plano recomendado: Total.** Motivo: apartamento (vazamento pode chegar ao vizinho de baixo) + dependente em casa → responsabilidade civil familiar, que só o Total tem.

## 5. Stack e estrutura
- **Um arquivo só:** `index.html` com CSS e JavaScript puros. Sem framework, sem build, sem servidor. Abre com duplo clique.
- **Fontes:** Google Fonts, `Nunito` (700, 800, 900 e itálico 800/900) para títulos e `Inter` (400 a 700) para texto.
- **Layout da página:** fundo cinza-azulado `#dfe3ec`; à esquerda, moldura de celular (390 × 820 px, borda preta de 12 px, raio 48 px); à direita, painel de apresentação (380 px). Em telas estreitas, o painel desce para baixo do celular.
- **Estado:** um objeto `st` em memória (tela atual, plano, plano recomendado, cenário escolhido, vigência, pagamento, respostas, valores das coberturas, coberturas ligadas, confirmações, cômodo selecionado). Uma função `render()` redesenha a tela inteira a cada mudança.
- **Navegação:** `ir(n)` vai para a tela n; seta de voltar volta uma tela.
- **Voz:** `speechSynthesis` do navegador, `lang = "pt-BR"`, `rate = 0.95`.
- **Ilustrações:** SVG inline desenhados à mão, estilo cartoon simples (formas planas, cores do BB). Sem imagens externas.

### Skills usadas para construir (assistente de IA)
| Skill | Para quê |
|---|---|
| `frontend-design` | Direção visual, hierarquia, composição e acabamento da interface |
| `stop-slop` | Textos do app curtos, diretos e sem cara de texto gerado |
| `marketing-psychology` | Economia comportamental: efeito compromisso (3 opções), aversão à perda (prejuízo em reais), redução de esforço, limites éticos (sem "sludge") |
| `anthropic-skills:built-in-browser` | Abrir o site e o app do BB, extrair cores e fontes do CSS real e testar o protótipo |
| `anthropic-skills:docx` | Ler o guia oficial do datathon |
| Visualização inline (mockups) | Rascunhos de tela antes do código |

Skills úteis para a próxima rodada: `better-accessibility`, `better-typography`, `better-colors`, `onboarding`, `ux` de formulários.

## 6. Design
Baseado na análise do site bb.com.br, do site da BB Seguros e das telas do App BB publicadas em 2026. Cores medidas no CSS do site oficial.

### Tokens
| Token | Hex | Uso |
|---|---|---|
| `--amarelo` | `#FCFC30` | Botão principal, selo "Recomendado", barra de progresso |
| `--azul` | `#465EFF` | Cabeçalho, títulos de destaque, seleção |
| `--azul-escuro` | `#2D37F5` | Texto azul sobre amarelo e links |
| `--azul-claro` | `#E4ECFF` | Botão secundário, cards de destaque, opção selecionada |
| `--texto` | `#111214` | Texto principal |
| `--suave` | `#6C7077` | Texto de apoio |
| `--fundo` | `#F4F4F6` | Fundo da tela |
| `--borda` | `#DBDDE1` | Bordas e divisórias |
| `--verde` / `--verde-claro` | `#0E8A4F` / `#E3F6EC` | "Coberto", "com seguro", dado observado, confiança |
| `--vermelho` / `--vermelho-claro` | `#C8312B` / `#FDECEA` | "Sem seguro, sai do seu bolso" |
| Amarelo de estimativa | `#FFF6D6` com texto `#8A6500` | Chip "≈ estimado" e avisos |

- **Raio:** 8 px (botões), 12 a 16 px (cards e folhas), 999 px (chips e pílulas).
- **Sombra de card:** `0 6px 8px rgba(24,24,27,.06), 0 1px 4px rgba(24,24,27,.08), 0 0 1px rgba(24,24,27,.08)`.
- **Tipografia:** títulos `Nunito 900`, 24 px, com uma parte em itálico azul (marca do BB: "E se acontecer na *sua casa?*", "Recomendamos o *Total*"). Texto `Inter`, 15 px. Apoio 13 px.
- **Botão principal:** amarelo, texto azul-escuro, negrito, MAIÚSCULAS, altura 50 px, raio 8 px.
- **Cabeçalho:** barra de status azul + topo azul com seta de voltar, título "Seguro Residencial", barra de progresso de 6 segmentos (amarelo = feito) e "Passo X de 6 · Nome".
- **Contraste:** azul `#465EFF` sobre amarelo só em texto bold de 16 px ou mais. Links sobre amarelo usam `#2D37F5`.
- **Não usar:** logo do BB, gradientes chamativos, texto preto puro, amarelo como fundo de tudo.
- **Animação:** só uma entrada suave do conteúdo (`opacity` + `translateY` de 8 px, 0,35 s).

## 7. Produto e lógica de preço

### Coberturas (nomes, valores padrão, limites e franquias tirados das prints do app atual)
| Chave | Cobertura | Padrão | Mín. | Máx. | Passo | Franquia | Tipo |
|---|---|---|---|---|---|---|---|
| `incendio` | Incêndio, raio, explosão e fumaça | 300.000 | 100.000 | 600.000* | 10.000 | sem franquia | fixa |
| `eletricos` | Danos elétricos | 10.000 | 5.000 | 30.000 | 1.000 | 10%, mín. R$ 450 | fixa |
| `agua` | Danos por água (alagamento, chuva, cano) | 5.000 | 3.000 | 50.000* | 1.000 | 10%, mín. R$ 1.000 | fixa |
| `vendaval` | Vendaval e granizo | 20.000 | 1.000 | 60.000* | 1.000 | 10%, mín. R$ 500 | fixa |
| `impacto` | Impacto de veículos e queda de aeronave | 10.000 | 10.000 | 10.000 | — | 10%, mín. R$ 400 | fixa |
| `roubo` | Roubo ou furto com arrombamento | 3.000 | 1.000 | 45.000 | 1.000 | 10%, mín. R$ 400 | adicional (Prático, Total) |
| `vidros` | Quebra de vidros | 1.500 | 1.000 | 25.000 | 500 | R$ 150 | adicional (Prático, Total) |
| `rc` | Responsabilidade civil familiar | 40.000* | 10.000* | 200.000* | 5.000 | sem franquia | adicional (Total) |
| `aluguel` | Perda ou pagamento de aluguel | 10.000* | 5.000* | 30.000* | 1.000 | sem franquia | adicional (Total) |
| `despesas` | Despesas emergenciais | 5.000* | 2.000* | 15.000* | 1.000 | sem franquia | adicional (Total) |

`*` = valor assumido por nós (não aparece nas prints). Pequenos reparos (R$ 1.000, fixo) aparece no app como cobertura, mas não está no catálogo oficial do datathon; ficou fora do protótipo e está anotado como dúvida para a mentoria.

**Ajustes feitos pelo "motor" para este cliente** (aparecem já aplicados):
- `incendio` = **260.000**: reconstruir 110 m² no PR custa entre R$ 231 mil e R$ 290 mil (área × custo de obra). Mais que isso é pagar sem precisar.
- `agua` = **18.000**: um alagamento típico num apto de 110 m² custa ~R$ 17.800.

### Planos
| Plano | Adicionais disponíveis | Pacotes de assistência |
|---|---|---|
| Essencial | nenhum | 1 (Casa em apuros) |
| Prático | roubo, vidros | 3 (+ Casa funcionando, Casa limpa) |
| Total | roubo, vidros, rc, aluguel, despesas | 6 (+ Casa arrumada, Casa sem pragas, Casa segura) |

Contagem exibida: coberturas = 5 fixas + adicionais ligados (o protótipo junta impacto e aeronave numa linha).

### Fórmula de preço (ilustrativa, calibrada nos preços vistos no app: Essencial 41,24 · Prático 69,11 · Total 121,13 por mês com os valores padrão)
```
preço_mensal(plano) = BASE + pacotes(plano) × PACOTE
                    + Σ fixas      taxa[k] × valor[k] / 1000
                    + Σ adicionais do plano que estão ligados  taxa[k] × valor[k] / 1000

BASE = 18,34    PACOTE = 6,00
taxa por R$ 1.000 de cobertura:
  incendio 0,03 · eletricos 0,4 · agua 0,5 · vendaval 0,05 · impacto 0,04
  roubo 3,5 · vidros 3,58 · rc 0,35 · aluguel 1,0 · despesas 2,004

preço_final = preço_mensal × (1 − desconto[vigência])
desconto = {1 ano: 0 · 2: 5% · 3: 9,6% · 4: 14% · 5: 18%}   (do app atual)
economia exibida = (preço_mensal − preço_final) × 12 × anos
```
Com os ajustes do cliente (incêndio 260 mil, água 18 mil), os preços padrão ficam: **Essencial R$ 46,54 · Prático R$ 74,41 · Total R$ 126,43**.

**Correção do erro do app atual (obrigatória):**
- Se plano = Prático e roubo **e** vidros estão desligados → mostrar aviso: *"Sem roubo e sem vidros, as coberturas ficaram iguais às do Essencial. A diferença agora são só 2 pacotes de assistência."* + link *"Trocar para o Essencial e pagar R$ X/mês"*.
- Se plano = Total e rc, aluguel **e** despesas estão desligados → aviso equivalente sugerindo o Prático.
- O preço muda **na hora** ao mover qualquer barra ou chave.

### Cenários "E se acontecer?" (valores de exemplo)
| Chave | Rótulo | Prejuízo sem seguro | Com seguro | Cobertura usada |
|---|---|---|---|---|
| `agua` | Alagou o apê | 17.800 | `17.800 − min(agua, 17.800) + max(1.000, 10% × min(agua, 17.800))` → R$ 1.780 com água em 18 mil | danos por água |
| `raio` | Raio queimou a TV | 8.800 | `max(450, 10% × min(eletricos, 8.800)) + max(0, 8.800 − eletricos)` → R$ 880 | danos elétricos |
| `vizinho` | Molhei o vizinho | 14.000 | 0 se Total com rc ligado; senão 14.000 | RC familiar |
| `roubo` | Arrombaram a porta | 6.000 | se Prático/Total com roubo: `max(400, 10% × min(roubo, 6.000)) + max(0, 6.000 − roubo)`; senão 6.000 | roubo |

Cada cenário tem uma ilustração SVG e uma frase de nota (ex.: *"Já sugerimos danos por água de R$ 18.000 (o app hoje vem com R$ 5.000, que pagaria bem menos). Você paga só a franquia."*; *"O Essencial não cobre roubo."*).

## 8. Telas, uma por uma
Textos entre aspas são os textos exatos usados. Todos curtos, em segunda pessoa, sem jargão.

### Tela 1: Aviso (gancho)
- **Visual:** tela de bloqueio do celular (fundo azul), hora grande "9:41", data "terça-feira, 28 de outubro".
- **Notificação do app:** "App BB · agora" / **"A temporada de chuva começa em Curitiba"** / "O seguro do seu condomínio cobre o prédio, não o que tem dentro do seu apê. Veja em 1 minuto quanto custaria um alagamento."
- **Mensagem do WhatsApp oficial (só lembrete):** "WhatsApp · BB (conta oficial)" / "Olá! Separamos uma proteção para o apartamento que você está financiando. Para ver, abra o app do BB > Seguros. *O BB nunca pede senha por aqui.*"
- **Ação:** tocar em qualquer aviso abre a tela 2.
- **Regra:** o gancho usa só dado da vida do cliente que o banco tem (cidade, financiamento). Sem expor valores pessoais na notificação.

### Tela 2: E se acontecer? (passo 1 de 6)
- Título: "E se acontecer na *sua casa?*"
- Apoio: "Escolha uma situação. Os valores são exemplos para um apartamento de 110 m² em Curitiba."
- Chips roláveis com os 4 cenários. O selecionado fica azul.
- Card: ilustração + frase do cenário + duas caixas lado a lado: vermelha **"Sem seguro, sai do seu bolso" R$ X** e verde **"Com o plano [atual] R$ Y"** + nota.
- Segundo card: "Além do imprevisto grande" / "Encanador, chaveiro e eletricista 24h já vêm no plano. Seguro também serve para o dia a dia."
- Botão: **MONTAR MINHA PROTEÇÃO** → tela 3.
- Os valores reagem ao plano e às coberturas escolhidos depois (voltar para esta tela mostra o novo cálculo).

### Tela 3: Sua casa (passo 2 de 6)
- Título: "Já sabemos bastante da *sua casa*" / "Confira. Se algo estiver errado, toque para corrigir."
- Lista com chip de origem à direita:
  - Tipo: Apartamento · `✓ pelo endereço` (verde)
  - Endereço: Bloco B, apto 305, Curitiba · `✓ cadastro`
  - Tamanho: 110 m² · `✓ cadastro do IPTU`
  - Relação com o imóvel: Seu, financiado · `✓ parcela no BB`
  - Quem mora: Você + 1 dependente · `≈ estimado` (amarelo)
  - Bens dentro de casa: cerca de R$ 13.000 · `≈ pelas compras`
- **Uma pergunta só:** "Só uma pergunta: você mora neste apartamento?" com duas opções grandes com desenho (prédio: "Sim, moro aqui" / casa: "Não, é de outro uso").
- **Barra de confiança:** 72% antes da resposta ("falta confirmar o uso"); 94% depois ("pronta para recomendar"), com animação.
- Botão **VER MEU PLANO** (bloqueado até responder, com aviso).

### Tela 4: Seu plano (passo 3 de 6)
- Título: "Recomendamos o *Total*"
- Caixa azul-clara: **"Por quê?** Você mora em apartamento: um vazamento pode chegar no vizinho de baixo. Com dependente em casa, a responsabilidade civil faz diferença, e só o Total tem."
- **3 planos em lista vertical** (Total, Prático, Essencial), nunca em carrossel. Cada card: nome, preço/mês, "N coberturas · N pacotes de assistência", uma linha do que muda:
  - Total: "Soma responsabilidade civil, aluguel e despesas emergenciais."
  - Prático: "Soma roubo com arrombamento e quebra de vidros."
  - Essencial: "Protege a estrutura e o essencial. Não cobre roubo nem o vizinho."
- O recomendado tem borda azul de 2 px e selo amarelo "RECOMENDADO PARA VOCÊ". O selecionado mostra "✓ Selecionado". Tocar em outro plano troca a seleção.
- Rodapé de texto: "Preço já ajustado para o seu apê: reconstrução de R$ 260.000 e danos por água de R$ 18.000. Valores ilustrativos."
- Botão **VER O QUE COBRE** → tela 5.

### Tela 5: O que cobre (passo 4 de 6)
- Título: "O que o plano *[plano]* cobre" / "Toque num cômodo."
- Grade 2 × 3 de cômodos com ícone: Banheiro, Cozinha, Sala, Quarto, Telhado e janelas, Porta e moradia.
- Card do cômodo selecionado com 2 ou 3 situações, cada uma com etiqueta **Coberto** (verde) ou **Não coberto** (cinza) e uma linha de franquia:
  - Banheiro: cano estourou e molhou o piso (água) · a água desceu para o vizinho (rc) · desgaste do encanamento antigo (não coberto)
  - Cozinha: raio queimou a geladeira (elétricos) · fogo no fogão (incêndio) · geladeira quebrou por uso (não coberto)
  - Sala: arrombaram e levaram a TV (roubo) · vidro da janela quebrou (vidros) · TV caiu e quebrou sozinha (não coberto)
  - Quarto: infiltração depois de chuva forte (água) · precisou de chaveiro de madrugada (assistência)
  - Telhado e janelas: granizo quebrou telhas · vendaval arrancou parte do telhado (vendaval)
  - Porta e moradia: ficou sem poder morar após um incêndio (aluguel) · fechadura arrombada (roubo)
- "Coberto" depende do plano e das chaves ligadas na tela 6.
- Card de assistências: grade 3 × 2 com ícone e nome dos 6 pacotes; os que não estão no plano ficam cinza. "Em cinza: só em planos maiores."
- Botões: **AJUSTAR** (secundário, → tela 6) e **CONTINUAR** (→ tela 7).

### Tela 6: Ajustar (passo 5 de 6)
- Título: "Ajuste do *seu jeito*" / "O preço muda na hora. Coberturas fixas não saem; só o valor muda."
- Barra fixa de preço: "Plano [nome]" + **R$ X/mês** (atualiza enquanto arrasta).
- Aviso de equivalência (ver seção 7) quando aplicável.
- Card das fixas: nome + chip "fixa" + barra deslizante com mín., valor atual e máx. Abaixo do incêndio: "Reconstruir 110 m² no PR custa entre R$ 231.000 e R$ 290.000. Mais que isso você paga sem precisar." Abaixo da água: "Um alagamento como o da primeira tela custa cerca de R$ 17.800."
- Card dos adicionais do plano: nome + chave liga/desliga; se ligado, mostra a barra.
- No Essencial: "O Essencial não tem adicionais. Quer roubo ou vidros? *Ver o Prático*".
- Botão **CONTINUAR** → tela 7.

### Tela 7: Conferir e contratar (passo 6 de 6)
- Título: "Confira e *pronto*"
- Card resumo: "Plano [nome]" + preço final/mês + "N coberturas · N pacote(s) de assistência · Bloco B, apto 305".
- **Por quanto tempo?** 5 botões (1 a 5 anos) com o desconto embaixo; texto "Você economiza R$ X no total." (ou "Escolha mais anos para ter desconto.").
- **Antes de contratar, confirme** (2 caixas obrigatórias):
  1. "Entendi que este plano **não cobre [X]**." (Essencial: roubo e o conserto do vizinho; Prático: o conserto do vizinho; Total: desgaste natural e obra)
  2. "Confirmo que o imóvel não está em obra ou reforma e é de alvenaria." (declaração de elegibilidade)
- "Mudou de ideia? Você pode desistir em até 7 dias pelo app, com o dinheiro de volta."
- Pagamento: Débito em conta | Cartão de crédito.
- Botão **CONTRATAR POR R$ X/MÊS** (bloqueado até as 2 confirmações).

### Tela 8: Meu seguro (pós-venda)
- Título: "Sua casa está *protegida*"
- Card azul: plano, endereço, preço, vigência.
- **Pedido em andamento** (estilo app de entrega): ✓ Encanador solicitado (14:02) · ✓ Profissional a caminho (Carlos, avaliação 4,9) · ⏱ Chega em cerca de 40 min ("Peças até R$ 100 incluídas").
- Atalhos: O que cobre · Avisar sinistro · Pedir assistência · Desistir (7 dias).
- Botão "Recomeçar a demonstração".

## 9. Elementos fixos em todas as telas
- **Botão Ajuda** no rodapé, ao lado do botão principal (ícone de balão com "?"). Abre uma folha que sobe de baixo:
  - Título "Como prefere tirar a dúvida?" / "Você não sai do app. A pessoa vê a mesma proposta que você."
  - **Conversar agora:** "Especialista BB Seguros responde em ~1 min". Abre um chat de exemplo: a especialista já sabe em que plano e tela o cliente está; responde sobre vazamento do vizinho de cima (danos por água) e do próprio cliente para o vizinho (RC do Total).
  - **Videochamada com o gerente:** "Ele vê sua tela, com os dados sensíveis escondidos". Tela de chamada conectando, com "você pode encerrar o compartilhamento quando quiser".
  - **Pedir ajuda a alguém de confiança:** "Filho, neto ou amigo vê a proposta. Só você contrata." (acesso só de leitura, revogável)
  - **Me liguem:** "Código da proposta: BB-8K2". Confirma que a central liga em até 10 minutos com a proposta aberta.
- **Aa** (canto superior direito): liga o modo simples (tudo ~25% maior via `--esc: 1.25`).
- **Ouvir:** lê em voz alta o título, os textos marcados e os avisos da tela.
- **Seta de voltar** no cabeçalho.

## 10. Painel lateral de apresentação
Fora do celular, para apresentar ao time e à banca. Para cada tela:
- Título "N. Nome da tela"
- Caixa vermelha **"App atual:"** + o problema (seção 3)
- Caixa verde **"Nossa proposta:"** + a solução
- Nota fixa: "Caso real da base de teste: CASO_00005 (apartamento financiado em Curitiba). Preços e prejuízos são ilustrativos. Use Aa para o modo simples e Ouvir para a leitura em voz alta. O botão Ajuda está em todas as telas."
- Botões para pular para qualquer tela (1 a 8).

## 11. Acessibilidade e público com dificuldade em tecnologia
- **Modo simples** oferecido pelo comportamento (maturidade digital, demora, toques errados), nunca pela idade (RN-07). Inspiração: modo para idosos exigido na China em 2021 (WeChat aumenta letras e botões ~1,4×) e Assistive Access da Apple.
- Uma decisão por tela; perguntas de sim/não com figura grande.
- Botões com no mínimo 50 px de altura.
- Leitura em voz alta em todas as telas (o BB já tem Pix por voz).
- Ajuda humana a um toque, sem sair do app.
- Ajudante de confiança, inspirado no Trusted Person Access do Lloyds (Reino Unido): evita que o idoso passe a senha para o filho.
- Contraste conforme a seção 6; nunca texto amarelo sobre branco.

## 12. O que é ilustrativo
- **Preços:** fórmula própria, calibrada nos valores vistos nas prints. Não é a tabela oficial.
- **Prejuízos dos cenários**, conversa do chat, nome do gerente e da especialista, código da proposta.
- **"Temporada de chuva em Curitiba":** precisa de fonte oficial (ex.: INMET, Defesa Civil) antes de ir para o vídeo.
- **Visual do BB:** cores e estilo, sem logo. Confirmar com a organização se podemos usar a identidade visual.
- O protótipo não chama o motor de verdade: os dados do CASO_00005 estão escritos no código. Quando o motor existir, as telas 3 a 7 devem ler o resultado dele (um JSON por cliente + imóvel).

## 13. Checklist de aceite
- [ ] Abre com duplo clique, sem instalar nada.
- [ ] As 8 telas navegam para a frente e para trás.
- [ ] Os 3 planos aparecem em lista vertical; nenhum escondido.
- [ ] O plano recomendado tem selo e motivo.
- [ ] Todo dado da tela 3 mostra a origem (observado, estimado ou confirmado).
- [ ] A tela 3 tem uma pergunta só; a confiança sobe depois da resposta.
- [ ] Tela 5: tocar num cômodo mostra coberto ou não coberto + franquia, sem popup.
- [ ] Tela 6: o preço muda na hora; desligar roubo e vidros no Prático mostra o aviso e o link para o Essencial.
- [ ] Os valores da tela 2 mudam quando muda plano ou cobertura.
- [ ] Tela 7: contratar só depois das 2 confirmações; mostra a desistência em 7 dias.
- [ ] O botão Ajuda funciona em todas as telas com as 4 opções.
- [ ] Aa aumenta tudo; Ouvir lê a tela em português.
- [ ] Nenhuma decisão usa idade ou renda.
- [ ] O console do navegador não mostra erros.

## 14. Como pedir para o assistente recriar
Cole este documento inteiro e depois o pedido abaixo (ajuste o que quiser mudar):

```
Use este documento como especificação. Recrie o protótipo como um único
index.html (HTML, CSS e JavaScript puros, sem framework), seguindo:
- as regras da seção 2 (principalmente RN-07 e RN-09);
- o design da seção 6 (tokens, fontes Nunito e Inter, botões, cabeçalho);
- a lógica de preço da seção 7 exatamente como está, incluindo o aviso
  quando o Prático fica igual ao Essencial;
- as 8 telas da seção 8, com os textos indicados;
- os elementos fixos da seção 9 e o painel da seção 10.
Use as skills frontend-design e stop-slop. Ilustrações em SVG inline,
estilo cartoon plano, nas cores do BB. Depois de pronto, abra no navegador,
passe pelas 8 telas e confira o checklist da seção 13.
Mudanças que eu quero nesta versão: [descrever aqui].
```

## 15. Ideias em aberto para o time decidir
1. **Tese de inovação principal:** (A) proposta que se ajusta sozinha a cada resposta, com o mínimo de perguntas; (B) a mesma inteligência no app, na tela do gerente e num assistente; (C) inclusão (modo simples, ajudante, gerente na mesma tela). Recomendação atual: A como núcleo + demo curta da B.
2. **Tela do gerente** (atendimento assistido) com o mesmo resultado e um roteiro de conversa: ainda não está no protótipo.
3. **Dados externos** (chuva, raios, desastres por município) só como reforço do motivo, com fonte e data.
4. **Ideia do satélite:** não serve no nível do imóvel nesta base (coordenadas fictícias); só como referência por município ou como próximo passo.
5. **Pequenos reparos:** aparece no app e no guia, mas não no catálogo oficial do datathon. Perguntar na mentoria.
6. **Cupom:** voltar ou não? Se voltar, só na tela 7.
