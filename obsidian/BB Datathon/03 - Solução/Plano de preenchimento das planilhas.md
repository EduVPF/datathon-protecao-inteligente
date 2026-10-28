# Plano: como preencher as 2 planilhas (e onde usar fontes externas)

28/10/2026 · Para o time decidir e começar.

---

## 1. Correção de rumo
- **O centro da entrega são as 2 planilhas** dos 138 casos da base de teste, mais o código que gera essas planilhas. Sem elas completas, o time não apresenta (RN-40).
- **O app não é o produto.** É a demonstração. O guia pede, no vídeo, a "demonstração da jornada funcionando do início ao resultado". Slide sozinho não basta, mas a demo pode ser simples: uma tela que lê o resultado do motor e mostra 2 ou 3 casos (dá para reaproveitar o protótipo).
- **Slide** serve para o pitch ao vivo (5 min). O vídeo precisa mostrar algo rodando.

## 2. "Acurácia" sem gabarito
Não existe resposta certa publicada. A banca vai julgar a planilha por:
1. **Regras cumpridas:** elegibilidade antes, todas as coberturas fixas do plano, só números nas faixas.
2. **Coerência:** o plano combina com o imóvel; faixas fazem sentido com área, bens e cidade.
3. **Explicação:** motivo claro, dados usados e regra de cálculo em cada linha.
4. **Consistência:** casos parecidos recebem respostas parecidas.
5. **Honestidade:** confiança baixa quando o dado é fraco, e a pergunta certa para confirmar.

As fontes oficiais servem para deixar as **faixas defensáveis** e o **motivo concreto** ("custo de obra no PR em agosto/2026: R$ 2.161,78 por m², segundo o IBGE"). É isso que separa uma planilha boa de uma chutada.

## 3. Fontes oficiais e atualizadas (pesquisadas e conferidas)
| # | Fonte | Órgão | O que traz | Atualização | Para que serve | Prioridade | Status |
|---|---|---|---|---|---|---|---|
| F1 | **SINAPI**: custo médio do m² de obra por estado | IBGE | R$/m² por UF | Mensal (usar **ago/2026**) | Reconstrução da casa e acabamentos do apê → `INCENDIO` | **Obrigatória** | ✅ Valores extraídos do PDF oficial |
| F2 | **IPCA**, série 433 do SGS | Banco Central (dado do IBGE) | Inflação mensal | Mensal (até **set/2026**: 4,58% em 12 meses) | Corrigir o preço pago dos bens → valor de novo | **Obrigatória** | ✅ API testada ao vivo |
| F3 | **Catálogo e limites do produto** | Organização + site e app da BB Seguros | Nomes oficiais, mínimos, máximos e franquias | — | Limitar as faixas ao que o produto aceita | **Obrigatória** | ✅ Catálogo na base; limites vistos nas prints do app |
| F4 | **Atlas Digital de Desastres** (dados do S2iD) | Ministério da Integração / Defesa Civil | Desastres por município e tipo (inundação, alagamento, enxurrada, vendaval, granizo) | 1991–2023 no Atlas; planilhas de 2025 no portal do MMA | Reforçar `DANOS_POR_AGUA` e `VENDAVAL_GRANIZO` e o motivo | Diferencial | ⚠️ Baixar e conferir as colunas |
| F5 | **FipeZAP Locação** | Fipe + DataZAP (índice público) | Aluguel médio em R$/m² por cidade | Mensal (set/2026: média de R$ 54,77/m² nas 36 cidades) | `PERDA_PAGAMENTO_ALUGUEL` de quem é dono e mora no imóvel | Diferencial | ⚠️ Pegar o valor das 10 capitais no relatório oficial |
| F6 | **SES**: estatísticas do mercado de seguros | SUSEP | Prêmios e sinistros por ramo e UF | Mensal | Contexto de risco por estado (justificativa e pitch) | Opcional | ⚠️ Filtrar o ramo residencial |
| F7 | Ranking de raios por município | INPE/ELAT | Raios por km² por ano | Ranking público antigo (2009–2010) | `DANOS_ELETRICOS` | **Não usar agora** | ❌ Desatualizado; não cumpre "atualizado" |
| F8 | Roubo/furto a residência por UF | Fórum Brasileiro de Segurança Pública / SINESP | Taxas por UF | Anual (Anuário 2026) | `ROUBO_FURTO_ARROMBAMENTO` | Opcional | ⚠️ Não achamos tabela de residência por UF; conferir no PDF |

**Custo do m² (SINAPI, agosto/2026, IBGE)** para as 10 capitais da base:

| UF | Capital | R$/m² |
|---|---|---|
| SP | São Paulo | 2.089,88 |
| RJ | Rio de Janeiro | 2.174,65 |
| PR | Curitiba | 2.161,78 |
| DF | Brasília | 2.051,00 |
| GO | Goiânia | 2.009,13 |
| RS | Porto Alegre | 1.962,32 |
| BA | Salvador | 1.873,15 |
| MG | Belo Horizonte | 1.864,57 |
| PE | Recife | 1.789,90 |
| CE | Fortaleza | conferir na mesma tabela |

**Regra de toda fonte externa (RN-11):** registrar no README e na coluna `fontes_publicas_adicionais` o nome, o órgão, o link, a data de acesso, o nível geográfico (UF ou município), como foi usada e a limitação. O motor tem que rodar mesmo sem ela (RN-12): se faltar, usa um valor neutro e baixa a confiança.

## 4. Planilha 1 (resultado): como preencher cada coluna
| Coluna | Como decidir | Dados da base | Fonte externa |
|---|---|---|---|
| `elegivel` | Regras da RN-17. Sinal ruim sem prova vira "SIM" com confirmação, não "NÃO" | `situacao_imovel_cadastral`, `gastos_material_construcao_24m`, `material_parede_externa_cadastrado`, `possui_seguro_residencial` | — |
| `motivo_inelegibilidade` | Só quando "NÃO", em uma frase | — | — |
| `tipo_imovel_sugerido` | Complemento e termos: AP/APTO/BLOCO/TORRE → apartamento; CASA/LOTE/QUADRA → casa; casa + condomínio → casa em condomínio | `complemento`, `possui_termo_*` | — |
| `uso_imovel_sugerido` | Endereço igual ao principal → moradia; diferente → veraneio ou de terceiros (confirmar) | `endereco_principal_compativel` | — |
| `tipo_vinculo_sugerido` | Paga aluguel → inquilino; recebe aluguel → dono que aluga; parcela → financiado; nada → próprio (confirmar) | sinais de aluguel e financiamento | — |
| `plano_recomendado` | Ver seção 6 | perfil + bens | F4 (só reforço) |
| `coberturas_recomendadas` | Todas as fixas do plano + adicionais aplicáveis, separadas por ";" | catálogo | F3 |
| `confianca_geral` | Alta, média ou baixa, pela qualidade dos dados (área observada ou estimada, vínculo com ou sem sinal) | `origem_area`, `confianca_area`, `nivel_confianca_vinculo` | — |
| `justificativa_recomendacao` | 1 ou 2 frases, sempre com dado concreto | tudo | F1, F4 |
| `perguntas_confirmacao` | No máximo 3, sim/não, só do que tem confiança baixa e muda a resposta | — | — |
| `fontes_publicas_adicionais` | Lista das fontes usadas naquele caso | — | F1 a F6 |

## 5. Planilha 2 (coberturas): uma linha por cobertura
Primeiro a **área**: quando não há área cadastrada (61% dos casos), estimar pelo IPTU, pela luz e pela água, separado por casa e apartamento (regressão simples). Nunca usar renda ou idade (RN-07).

| Cobertura | Faixa: como calcular | Dados | Fonte |
|---|---|---|---|
| `INCENDIO_RAIO_EXPLOSAO_FUMACA` | Casa: área × custo do m² da UF × padrão (0,85 a 1,30) × 1,12, **sem terreno** + bens. Apto: só acabamentos (25% a 40% disso) + bens. Piso do produto R$ 100 mil | área, tipo, padrão, bens | **F1**, F2 |
| `DANOS_POR_AGUA` | Bens que a água estraga (móveis, eletrodomésticos, eletrônicos) no valor de novo, de 50% a 100%. Mínimo do produto R$ 3 mil | compras 36m, bens | F2; F4 aumenta o mínimo se a cidade tem histórico de alagamento |
| `VENDAVAL_GRANIZO` | Casa: 10% a 20% da reconstrução (telhado). Apto: baixo, perto do mínimo do produto | tipo, área | F1; F4 reforça |
| `IMPACTO_VEICULOS_TERRESTRES` | Valor padrão do produto (R$ 10 mil), baixa exposição | — | F3 |
| `QUEDA_AERONAVE` | Valor padrão do produto | — | F3 |
| `DANOS_ELETRICOS` | Eletrônicos + eletrodomésticos no valor de novo, de 50% a 100%, dentro de R$ 5 mil a R$ 30 mil | compras de eletrônicos e eletrodomésticos | F2 |
| `ROUBO_FURTO_ARROMBAMENTO` | Bens fáceis de levar (eletrônicos, lazer) até todos os bens, no valor de novo, dentro de R$ 1 mil a R$ 45 mil | bens por tipo | F2 |
| `QUEBRA_DE_VIDROS` | Valor baixo do produto; mais alto se houve gasto com vidraçaria em 24 meses | `gastos_vidracaria_24m` | F3 |
| `RESPONSABILIDADE_CIVIL_FAMILIAR` | Apartamento ou condomínio: custo de reparar uma unidade vizinha (acabamentos de um apto médio da cidade). Casa: valor menor | tipo, condomínio | F1 |
| `PERDA_PAGAMENTO_ALUGUEL` | Inquilino: aluguel pago × 6 a 12 meses. Dono que aluga: aluguel recebido × 6 a 12. Dono que mora: aluguel de mercado (R$/m² da cidade × área) × 6 a 12 | sinais de aluguel, área | **F5** |
| `DESPESAS_EMERGENCIAIS` | Faixa pequena do produto | — | F3 |

Em todas as linhas: valores **só com números**, confiança da estimativa, dados usados, regra de cálculo, justificativa e o que confirmar. Confiança baixa **ainda tem faixa**.

**Correção importante:** não usar **número de dependentes** para decidir responsabilidade civil. É atributo da pessoa (RN-07). Usar o tipo do imóvel (apartamento, condomínio).

## 6. Escolha do plano (regras simples, sempre combinando sinais)
- **Total** quando há exposição a terceiros ou dependência de aluguel: apartamento ou casa em condomínio (vizinho), ou o cliente recebe aluguel do imóvel.
- **Prático** quando roubo ou vidros pesam: muitos eletrônicos e bens portáteis, gasto com vidraçaria, imóvel de veraneio (fica vazio).
- **Essencial** nos demais casos.
- A justificativa sempre diz **por que não o mais barato** e **por que não o mais caro** (alternativas, RN-37).

## 7. O que vamos mostrar como evidência (seção 8 do guia)
% de casos processados · % com justificativa · completude das coberturas fixas · média de perguntas por caso · % de confiança baixa · consistência entre casos parecidos · sensibilidade das faixas (área +10%) · **teste de justiça** (mudar renda e idade não muda nada) · tempo de execução · 2 ou 3 casos contrastantes.

## 8. Ordem de trabalho e divisão (5 pessoas)
| Quem | Tarefa | Entrega |
|---|---|---|
| Pessoa 1 | Juntar as tabelas, elegibilidade, tipo, uso e vínculo | Colunas da planilha 1 até `tipo_vinculo_sugerido` |
| Pessoa 2 | Área estimada + fontes F1 e F2 (SINAPI e IPCA em CSV) + faixas de incêndio e bens | Linhas de incêndio, água, elétricos, roubo |
| Pessoa 3 | Plano, demais coberturas (F3, F5), confiança, perguntas e justificativa | Resto das duas planilhas |
| Pessoa 4 | Demo simples lendo o resultado do motor + roteiro do vídeo | Tela da demo, vídeo |
| Pessoa 5 | Métricas, testes (justiça, consistência), README com as fontes | Seção de métricas, README |

**Horários sugeridos:**
1. **Agora:** todos leem este plano e as regras; decidem os pontos da seção 9.
2. **Em até 3 horas:** motor v1 gerando as 2 planilhas completas com faixas simples. Primeiro completo, depois bonito.
3. **Hoje à noite:** faixas com as fontes, métricas, casos contrastantes, demo lendo o motor.
4. **Madrugada:** README e vídeo.
5. **29/10 até 9h:** conferência final e entrega.

## 9. Decisões para o time agora
1. Concordam que o foco é motor + planilhas, e o app vira só a demo?
2. Quais fontes entram: só F1 a F3 (seguro), ou também F4 e F5 (diferencial)?
3. A demo usa o protótipo atual (ajustado) ou uma tela nova mais simples?
4. Quem fica com cada parte da seção 8?

## Links das fontes
- F1 SINAPI ago/2026: https://ftp.ibge.gov.br/Precos_Custos_e_Indices_da_Construcao_Civil/Fasciculo_Indicadores_IBGE/sinapi_202608caderno.pdf · página do SINAPI: https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9270-indice-nacional-da-construcao-civil.html
- F2 IPCA (API do Banco Central): https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json
- F4 Atlas Digital de Desastres: https://atlasdigital.mdr.gov.br · planilhas 2025 (MMA): https://dados.mma.gov.br/en/dataset/sinir/resource/7d13e715-cbd1-4170-a70e-1674a15642e6
- F5 FipeZAP Locação: https://www.datazap.com.br/wp-content/uploads/2026/03/fipezap-202602-residencial-locacao.pdf · set/2026: https://www.infomoney.com.br/minhas-financas/sao-paulo-tem-o-aluguel-mais-caro-do-pais-veja-ranking-e-custo-do-metro-quadrado/amp/
- F6 SUSEP SES: https://www2.susep.gov.br/menuestatistica/SES/principal.aspx
- F7 INPE/ELAT: https://agencia.fapesp.br/ranking-de-cidades-com-mais-raios/13806
- F8 Anuário FBSP 2026: https://forumseguranca.org.br/wp-content/uploads/2026/07/anuario-2026-infografico.pdf
