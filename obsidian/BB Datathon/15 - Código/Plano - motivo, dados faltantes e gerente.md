---
tags: [plano, motivo, codigo, mentoria]
data: 2026-10-28
status: aprovado e executado em 28/10
---
# 🎯 Plano: motivo e porquê, dados faltantes, APIs e gerente

> [!success] Aprovado e executado (28/10, noite)
> F1 a F4 foram feitas, com 82 testes passando e planos iguais. O resultado está em [[Log de alterações do código]] e em `documentos/contexto/21-motivo-e-jornada.md`. Os arquivos do app não foram tocados.

## O que a mentoria pediu (Fernando)
- O que diferencia um trabalho é o **motivo e o porquê**: argumento com fatos do cliente ("gastou com vidro", "recebe aluguel desse imóvel"), defensável e que **conscientize** o cliente de por que precisa do seguro. É o que a banca lê na `justificativa_recomendacao`.
- **Dado faltando → média da região** (eles usam CEP).
- **APIs externas só como adicional**, oficiais e atualizadas. O motor tem de funcionar só com a base.
- **Gerente é o último recurso**, porque custa caro.

## O que a análise de QA encontrou (28/10)
> [!bug] Pontos fracos do motivo hoje
> 1. **29 de 138 (21%)** recebem só o motivo genérico "não há sinais fortes de roubo ou de dano a terceiros". É um não-argumento, e logo para quem mais precisa de conscientização.
> 2. As justificativas das coberturas têm **o mesmo texto para os 138 clientes**; só a frase da cidade muda.
> 3. **Jargão interno** no texto do cliente: "presumido", "estimado: área, vínculo", "os sinais ainda são fracos", e "o cliente tem..." no meio de um texto escrito com "você".
> 4. O motivo **não diz quanto o cliente perderia**. O motor já calcula a reconstrução e os bens, mas o número não aparece no porquê.
> 5. Precisão falsa: "pelo menos R$ 48.552" em vez de "cerca de R$ 49 mil".
> 6. **71 de 138 (51%) vão para o gerente**, o oposto do que a mentoria pediu.

> [!regra] CEP: o que a mentoria pede × o que a regra permite
> O guia e a **RN-10** dizem que o CEP agregado da base é fictício. Testamos: o CEP "explica" 21,5% da variação do IPTU/m², mas um CEP **embaralhado ao acaso** explica 21,2%. Ou seja, é ruído. O "setor" (bairro) explica 3,4%.
> **Proposta:** média regional em degraus, **município + tipo → município → UF → geral**, com um degrau de **CEP real** já previsto e **desligado nesta base**. Quando o banco ligar o CEP verdadeiro, o motor passa a usá-lo sem mudar o resto. Atende a mentoria sem quebrar a RN-10.

## As 5 frentes, em ordem de prioridade
### F1 · Motivo 2.0 (a mais importante)
Todo motivo segue o mesmo roteiro, em linguagem de cliente, com "você":

| Passo | O que diz | Exemplo |
|---|---|---|
| 1. Fato seu | Um dado real do cliente | "Você gastou R$ 11 mil com vidraçaria nos últimos 2 anos" |
| 2. O que pode acontecer | O risco ligado ao fato, com prova | "Danos elétricos são 53% dos acionamentos do residencial da BB" |
| 3. Quanto custaria | O valor em risco | "Repor o que você comprou para a casa custa hoje de R$ 23 mil a R$ 61 mil" |
| 4. Como o plano resolve | A cobertura que paga isso | "O Prático paga a quebra de vidros e o roubo com arrombamento" |
| 5. Se escolher menos | O que fica descoberto | "No Essencial, um vidro quebrado sai do seu bolso" |

- **Fim do motivo genérico:** no Essencial, o porquê vira o valor da casa e dos bens + danos elétricos (a cobertura mais acionada) + o dado da cidade.
- **Cobertura por cobertura com número do cliente:** "Seus eletrônicos e eletrodomésticos comprovados valem cerca de R$ 18 mil..."
- **Duas camadas:** o texto do cliente vai para a planilha e para o app; os detalhes técnicos (regra, fonte, confiança) ficam nas colunas próprias e no relatório do gerente.
- **Honestidade (RN-09, RN-53):** estimativa sempre dita como estimativa ("estimamos pelo IPTU"). Nada de medo vazio: todo risco citado tem fonte.

**Métrica nova: qualidade do motivo** (vai para `metricas.json`)
| Indicador | Hoje | Meta |
|---|---|---|
| Casos com motivo genérico | 29 (21%) | 0 |
| Motivos com fato do próprio cliente (R$ ou dado) | 71% | 100% (pelo menos 2) |
| Coberturas com texto personalizado | 0 de 11 | 11 de 11 |
| Termos internos no texto do cliente | vários | 0 |
| Tamanho | ~87 palavras, até 1.000 caracteres | 60 a 120 palavras (RN-51) |
| Todo número citado tem fonte rastreável | parcial | 100% (teste automático) |
| Teste de justiça (renda e idade) | 0 mudanças | continua 0 |

**Exemplo real, hoje × proposta** (`IMO_CASO_00015_01`, casa em Porto Alegre, Essencial)
- **Hoje:** "Recomendamos o plano Essencial porque as coberturas básicas protegem estrutura e bens contra fogo, água, vento e danos elétricos, e não há sinais fortes de roubo..."
- **Proposta (rascunho):** "Pelo que vemos, a casa é sua e não tem financiamento: se algo acontecer, o prejuízo é todo seu. Reconstruir uma casa como a sua (cerca de 127 m², estimados pelo IPTU) custa em torno de R$ 390 mil pelo custo oficial de construção do IBGE, e o que você comprou para ela nos últimos 3 anos vale hoje de R$ 23 mil a R$ 61 mil. O Essencial protege isso contra fogo, água, vento e danos elétricos, que são 53% dos acionamentos do seguro residencial da BB. Em Porto Alegre, a distribuidora de energia ficou em último no ranking de quedas da ANEEL de 2025. Se quiser proteção contra roubo também, o Prático acrescenta essa cobertura."

### F2 · Dados faltantes: média da região em degraus
- Para cada campo que falta (área, padrão, material, compras), usar a mediana do grupo mais próximo que tenha pelo menos 20 imóveis na base de desenvolvimento: **município + tipo → município → UF → geral**.
- O dado ganha a etiqueta **"estimado pela região"** e o motivo diz isso em linguagem simples.
- Backtest fora da amostra para cada degrau, como já fazemos com a área.

### F3 · Canal: gerente como último recurso
| Caminho | Quem | Hoje → proposta |
|---|---|---|
| 1 toque | Elegível, confiança alta ou média, sem pendência | 67 → cerca de 80 |
| App com 1 a 3 perguntas de sim/não | Pendências que o app resolve ("seu seguro atual é da BB?") | não existe → novo |
| Gerente | **Confiança baixa** (não se sabe se mora lá) ou **sinal de obra** | 71 → **26** (21% dos elegíveis) |

- O **relatório do gerente continua** igual (a mesma ficha).
- **Decisão do time:** os 13 elegíveis que não usam o app vão ao gerente ou recebem primeiro um convite para o app (D-01)?
- A **tela de ajuda com conscientização** (dúvidas comuns de cada tela antes do botão do gerente) fica desenhada aqui no vault. O app não será editado agora.

### F4 · APIs oficiais ao vivo (opcionais, com reserva)
Testadas em 28/10, todas sem chave (RN-44):

| API | O que traz | Para quê | Status |
|---|---|---|---|
| **Banco Central SGS** · IPCA (433) | Inflação | Bens a preço de hoje | ✅ respondeu |
| **Banco Central SGS** · INCC (192, a confirmar) | Inflação da construção | Atualizar o custo de reconstrução (melhor que o IPCA) | ✅ respondeu |
| **IBGE SIDRA** · SINAPI (tabela 2296) | Custo do m² por UF, mensal | Reconstrução sempre atualizada | ✅ respondeu (PR, set/2026) |
| **ANEEL** dados abertos (API CKAN) | DEC/FEC por distribuidora e conjunto | Motivo de danos elétricos | ✅ respondeu |
| **IBGE Localidades** | Nome e região de cada município | Conferir o código IBGE | ✅ respondeu |
| S2iD / Atlas | Desastres | Motivo de água e vento | ❌ sem API: arquivo com data, atualizado 1 vez por ano |
| CUB, FipeZAP | Custo do m² de mercado, aluguel | Faixas | ❌ só PDF |
| ~~ViaCEP / BrasilAPI~~ | CEP | — | Não usar: o CEP da base é fictício (RN-10) e não é fonte do governo |

**Como funciona sem quebrar a RN-12:** cada fonte vira um conector que tenta a API em até 3 segundos. Se falhar, usa o último valor salvo, com a data. Se nem isso existir, usa o valor neutro e baixa a confiança.
**As planilhas da entrega são geradas no modo sem internet**, com os valores salvos e a data anotada, para continuarem reprodutíveis byte a byte. A API e a demo usam o modo ao vivo.

### F5 · Documentação
A cada frente: o vault (esta pasta), um `documentos/contexto/21-...md`, o README e os testes.

## 🛠️ Skills por área (e por quê)
| Área | Skill | Por quê |
|---|---|---|
| Regras | Leitura do vault antes de tudo (regra do time) | Conferir RN-01 a RN-58 e D-01 a D-07 a cada mudança |
| Plano | `brainstorming-superpowers` (feito) → `writing-plans` | Fechar o quê e o porquê antes do código; transformar em passos |
| Motivo (texto) | `copywriting` + `marketing-psychology` | Estrutura de argumento de venda e gatilhos honestos: aversão à perda, especificidade, prova social com dado real |
| Motivo (revisão) | `copy-editing` + `better-writing` | Português claro, sem jargão, no tamanho certo |
| Código | `test-driven-development` | Cada regra nova nasce de um teste (ex.: "nenhum motivo genérico") |
| Erros | `systematic-debugging` | Se algo quebrar, achar a causa antes de corrigir |
| QA final | `code-review` + `verification-before-completion` | Revisão do diff e prova (testes, planilhas, métricas) antes de dizer que está pronto |
| Gerente e ajuda (só desenho) | `onboarding` + `cro` | Tela de ajuda que resolve a dúvida antes de chamar o gerente |
| Piloto (próximos passos) | `ab-testing` | Medir no piloto se o motivo novo converte mais |

## Checagem de regras
| Pedido | Regra | Situação |
|---|---|---|
| Média pelo CEP | RN-10 | 🟡 CEP da base é fictício: degrau de CEP desligado; regional por município |
| Motivo com olhar de marketing | RN-09, RN-52, RN-53 | ✅ se toda frase tiver fato ou fonte e a estimativa for dita como estimativa |
| Usar dados do cliente no motivo | RN-07 | ✅ só imóvel e transações; nunca renda ou idade |
| Gerente como último recurso | RN-50, D-02 | ✅ o relatório continua e o botão de ajuda humana segue em todas as telas, atrás da ajuda contextual |
| APIs | RN-11, RN-12, RN-44 | ✅ só APIs sem chave, com reserva e com fonte registrada |
| Família no plano | RN-07 | 🟡 ainda aberto (ver [[Auditoria do código - 28-10]]) |

## Decisões que o time precisa tomar
1. Aprovar o plano e a ordem **F1 → F2 → F3 → F4**. A F4 é a mais arriscada para o prazo e pode ficar como demo.
2. Quem não usa o app: gerente ou convite ao app primeiro?
3. Família no plano (RN-07).

Ligações: [[Auditoria do código - 28-10]] · [[Métricas do mercado x as nossas]] · [[Motivo da recomendação]] · [[Jornada do gerente]] · [[Regras de negócio]]
