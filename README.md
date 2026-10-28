# Proteção Inteligente · Seguro Residencial

Projeto para o **Datathon Proteção Inteligente** (IBMEC + BB Seguros / Brasilseg).

## Equipe
- **Nome da equipe:** _(preencher)_
- **Integrantes:** _(preencher com nome completo de cada um)_
- **Desafio:** Seguro Residencial
- **Instituição / turma:** _(preencher)_

## Objetivo
Responder, para cada cliente e imóvel, "quanto proteger esta casa e com qual plano?" usando só o que o banco já sabe: é elegível? qual plano? quais coberturas e com que faixa de valor? o que foi observado, o que foi estimado e o que precisa ser confirmado? por que esse plano e não outro?

A solução é um **motor de regras explicável**, sem machine learning. Cada decisão tem uma regra escrita, uma fonte e um teste. A mesma saída (a "ficha" do caso) alimenta as duas planilhas, o app do cliente (1 toque), o painel do gerente e uma API para agentes.

## Como rodar
Python 3.11 (registrado em `.python-version`).

```bash
pip install -r requirements.txt
python -m pytest -q                 # 49 testes
python motor/gerar.py --entrega     # gera, valida e copia as planilhas para entrega/
```

- **Demo:** abra `prototipos/indexprototipo_gerente.html` com dois cliques. Os botões A, B e C mostram os perfis do slide 14 com a ficha real do motor.
- **API (opcional):** `pip install -r requirements-api.txt` e `uvicorn api:app --app-dir motor --port 8000`. Documentação em `/docs`.
- Os testes também rodam sozinhos no GitHub a cada envio (`.github/workflows/testes.yml`).

## Arquitetura

```
dados/desenvolvimento ──► calibrar()  (R$ de IPTU e de energia por m², por município)
                                │
dados/teste_comum ──► processar_caso() para cada cliente-imóvel
   1. inferir tipo, vínculo, uso, área e bens  → cada dado com natureza, fonte e confiança
   2. elegibilidade (guia 9.1)                 → SIM / NAO / SIM + pergunta
   3. plano por pontos de sinais               → Essencial, Prático ou Total (+ adicionais)
   4. faixa mín/máx de cada cobertura          → SINAPI, CUB, IPCA, FipeZAP, condições gerais
   5. até 3 perguntas, pelo valor da informação
   6. confiança por regra + canal (1 toque ou gerente)
                                │
                     ficha (JSON) ──► 2 planilhas · métricas · demo · API
```

| Arquivo | O que faz |
|---|---|
| `motor/motor.py` | Toda a lógica: inferências, elegibilidade, plano, coberturas, perguntas, confiança, planilhas |
| `motor/parametros.py` | Todas as premissas numéricas, com a origem escrita ao lado |
| `motor/metricas.py` | Métricas do guia §8 e casos contrastantes |
| `motor/templates.py` | Valida as planilhas contra as regras do guia antes de gravar |
| `motor/gerar.py` | Roda tudo de ponta a ponta |
| `motor/api.py` | API de demonstração (ficha e recálculo com as respostas do cliente) |
| `motor/externos/` | Fontes externas salvas + `FONTES.md` (fonte, data, licença, método, limitações) |
| `entrega/` | As 2 planilhas, `metricas.json` e `casos_contrastantes.json` |
| `tests/` | Testes automáticos |
| `documentos/contexto/` | Um documento curto por etapa (comece pelo `00-mapa.md`) |

## Premissas principais
- **Faixa = importância segurada** (quanto segurar), não valor de sinistro.
- **Casa:** reconstrução = área × custo do m² (mínimo SINAPI/IBGE, máximo CUB oficial) × padrão construtivo. Terreno não entra.
- **Apartamento, casa em condomínio ou financiado:** segundo risco (CG cl. 15.2). A estrutura tem seguro próprio; segura-se 25% a 40% (acabamentos) + bens.
- **Bens:** compras de 36 meses e bens vinculados, corrigidos pelo IPCA (Banco Central), até 2,7 × as compras (estoque).
- **Área sem cadastro (67% dos casos):** estimada pelo IPTU e pela energia, comparados aos imóveis do mesmo município com área conhecida. Nunca pela renda.
- **Padrão construtivo vazio:** faixa do econômico ao superior (0,85 a 1,30) e pergunta do acabamento.
- **Plano:** pontos por sinal (aluguel, vizinhos, bens, eletrônicos, vidros, crianças e pets informados). Tabela completa em `documentos/contexto/17-revisao-qa.md`.
- **Renda e idade não entram em nenhuma decisão.** Crianças e pets só como necessidade informada pelo cliente (RC familiar), nunca em valor, risco, canal ou confiança.

## Elegibilidade (guia 9.1)
| Regra | Como o motor trata |
|---|---|
| Situação cadastral tombado, desapropriado ou condenado | `NAO` |
| Endereço que já tem seguro BB | Um imóvel só → `NAO`. Dois imóveis → `SIM` + "qual já tem seguro?" |
| Construção ou reforma | Gasto alto com material de construção → `SIM` + pergunta (o gasto sugere, mas não prova) |
| Parede de material combustível | `SIM` + pergunta sobre madeira pré-fabricada ABNT |
| Comunidade, favela, atividade rural, MEI fora da lista | A base não tem esses dados: confirmação na contratação (ver limitações) |

## Limitações
- Não há sinistros nem rótulos na base, então não há acurácia a medir. A qualidade é mostrada por testes de coerência, estabilidade, justiça e sensibilidade.
- Favela/comunidade, atividade rural e MEI não aparecem nos dados. Precisam de declaração do cliente na contratação.
- O CUB de RJ, MG, PR, RS, PE e CE não foi conferido em fonte oficial. Nessas UFs o máximo é SINAPI × razão CUB/SINAPI das UFs oficiais.
- Custos e aluguel são médias do estado ou da capital, não do bairro.
- O catálogo do datathon não tem "instalações e pequenos reparos", que o guia lista no Essencial. Seguimos o catálogo, que é a nomenclatura de conferência.
- Os valores de vendaval, danos por água, RC e despesas emergenciais são proporções premissa do time (em `parametros.py` e `motor.dimensionar()`), sem dado de sinistro para calibrar.
- A base não traz risco de território (alagamento, vendaval, furto); o motor não usa enriquecimento territorial.

## Métricas (base comum, 138 casos)
| Métrica | Resultado |
|---|---|
| Casos processados / com justificativa / coberturas fixas completas | 100% · 100% · 100% |
| Falhas na execução | 0 |
| Planos | Prático 59 · Total 49 · Essencial 30 |
| Coberturas adicionais | 41 (RC familiar em prédio ou condomínio com crianças ou pets) |
| Elegibilidade | SIM 114 · NAO 24 (já segurados) · 13 com confirmação pendente |
| Confiança | ALTA 17 · MÉDIA 101 · BAIXA 20 (14%) |
| Perguntas por caso | 2,72 (de 3,43 possíveis) |
| Teste de justiça (troca renda e idade) | 0 casos mudam |
| Crianças e pets mudando valor ou confiança | 0 casos |
| Estabilidade do plano (valores ±5%) | 1 caso muda (perto do limiar de eletrônicos) |
| Estabilidade da confiança (pesos ±20%) | 0 casos mudam |
| Faixa de incêndio por confiança (máx ÷ mín) | ALTA 1,92 · MÉDIA 2,35 · BAIXA 2,64 |
| Sensibilidade (área +10%) | incêndio +4,8% em média, 0 quedas |
| Regra dos 80% na elegibilidade por faixa de renda | 0,91 |
| Reprodutibilidade | duas rodadas geram arquivos idênticos |
| Tempo | ~0,5 s para os 138 casos |

Tudo em `entrega/metricas.json`.

## Resultados: casos contrastantes (slide 14)
| Perfil | Caso | Plano | Por quê |
|---|---|---|---|
| A · Apartamento urbano | `IMO_CASO_00005_01` | Prático + RC | Gasto recente com vidraçaria e vizinhos de parede; crianças ou pets informados → RC adicional |
| B · Casa familiar | `IMO_CASO_00031_01` | Total | Casa em condomínio, crianças e pets informados, bens e eletrônicos altos |
| C · Imóvel de lazer | `IMO_CASO_00010_01` | Essencial + RC | Apartamento de veraneio que fica vazio: o roubo do Prático não cobre residência desocupada |
| Não elegível | `IMO_CASO_00001_01` | — | Endereço já segurado na BB Seguros |

## Fontes externas
SINAPI (IBGE), CUB oficial (Sinduscons de SP, DF, GO e BA), IPCA (Banco Central, API SGS 433), FipeZAP Locação (Fipe) e Condições Gerais BB Seguro Residencial v1.4. Detalhes, licença e limitações em `motor/externos/FONTES.md`.

## Privacidade e responsabilidade
- Só dados do pacote e fontes públicas. Os dados do pacote são fictícios.
- Minimização: renda, idade e origem da renda não são lidas por nenhuma regra (teste automático).
- Controle humano: toda estimativa vira pergunta ou vai para o gerente; nada é contratado sem confirmação.
- Nenhuma credencial ou dado restrito no repositório.

## Uso de IA
Usamos assistentes de IA como apoio para revisar código, pesquisar fontes públicas e revisar textos. As regras, os parâmetros e os resultados foram decididos, executados e conferidos pela equipe, que entende e defende a solução.

## Relato
Caminhos testados e descartados estão em `documentos/contexto/` (seção "Decisões e o que descartamos" de cada etapa). Exemplos: confiança por corte numa nota (descartada por instabilidade), qualquer criança ou pet levando ao Total (inflava o Total para 65%), CUB de agregador (fonte não oficial).
