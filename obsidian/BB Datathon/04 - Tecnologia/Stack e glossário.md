---
tags: [tecnologia, glossario]
---
# Stack e glossário técnico

## Pipeline proposto (do CSV à demo)
```
CSV (data/raw) ──► Ingestão + validação ──► Parquet (data/processed)
                     pandas · pandera            │
                                                 ▼
                                   EDA (notebooks, ydata-profiling, plotly)
                                                 │
                                                 ▼
                Perfil do imóvel (regras) + grau de confiança por campo
                                                 │
                                                 ▼
                 Faixas das 6 coberturas (CUB/m², bens, aluguel) + catálogo
                                                 │
                                                 ▼
                 Perguntas de confirmação + plano + alternativas + MOTIVO
                                                 │
                                    ┌────────────┴────────────┐
                                    ▼                         ▼
                        Template preenchido (CSV)   MVP Streamlit (gerente / app)
```

## Tecnologias e para que servem
| Etapa | Tecnologia | Por quê |
|---|---|---|
| Ler/tratar dados | **pandas** | Padrão de mercado para tabelas em Python |
| Consultas SQL rápidas no CSV | **DuckDB** | Roda SQL direto em CSV/Parquet sem instalar banco |
| Validar o CSV | **pandera** | Garante tipos/faixas das colunas (*schema validation*) |
| Formato intermediário | **Parquet** (pyarrow) | Colunar, rápido, guarda os tipos |
| Relatório automático | **ydata-profiling** | Gera HTML com distribuições, nulos e correlações em 1 linha |
| Gráficos | **Plotly** / seaborn | Interativo (Plotly) para a demo |
| Comparar endereços | **rapidfuzz**, Unidecode | *Fuzzy matching*: "R. das Flores 10" ≈ "Rua das Flores, 10" |
| Regras + scores | pandas / numpy | Motor de recomendação explicável |
| ML opcional | **scikit-learn**, LightGBM, SHAP | Só se houver rótulo; SHAP explica a previsão |
| MVP/Demo | **Streamlit** | App web em Python puro, sobe em minutos |
| Publicar demo | **Streamlit Community Cloud** | Link público grátis a partir do GitHub (sem dados sensíveis!) |
| Versionamento | **Git + GitHub** | Código, notas e histórico num lugar só |

## Glossário (para usar no pitch e entender a equipe)
- **ETL / ELT** — *Extract, Transform, Load*: extrair os dados, tratar e carregar onde serão usados.
- **Ingestão de dados** — trazer o arquivo bruto para dentro do projeto de forma padronizada.
- **Schema / dicionário de dados** — lista de colunas com tipo, significado e valores esperados.
- **EDA** (*Exploratory Data Analysis*) — análise exploratória: entender distribuições, nulos, outliers, relações.
- **Data quality** — completude, consistência, duplicidade, valores impossíveis.
- **Outlier** — valor muito fora do padrão.
- **Feature / feature engineering** — variável usada pelo modelo / criação de variáveis novas (ex.: faturamento por funcionário).
- **Target / variável-alvo** — o que queremos prever (ex.: "contratou seguro? sim/não").
- **Data leakage** — usar informação que só existe *depois* do evento; infla o resultado e engana os jurados.
- **Motor de regras (rule-based engine)** — decisões por regras explícitas ("se tem condomínio e endereço = principal → apto próprio"); fácil de explicar.
- **Grau de confiança (confidence score)** — de 0 a 1, quanto confiamos num dado; depende da origem, da idade (*data decay*) e da concordância entre sinais.
- **Proveniência do dado (data lineage)** — de onde veio o campo: confirmado, estimado ou inferido.
- **Entity resolution / fuzzy matching** — reconhecer que dois textos de endereço são o mesmo lugar.
- **Geocodificação** — endereço ↔ latitude/longitude.
- **CUB/m² (Sinduscon) / SINAPI (IBGE)** — custo de construção por m² por estado; base da cobertura de reconstrução.
- **Subseguro / superseguro** — cobertura abaixo/acima do necessário; queremos evitar os dois.
- **Click-to-buy** — contratação em 1 clique com dados pré-preenchidos.
- **Modelo de propensão** — dá a cada cliente a probabilidade (0–1) de comprar o produto.
- **Cross-sell / Next Best Offer (NBO)** — oferecer ao cliente o próximo produto mais adequado.
- **Segmentação / clusterização** (K-Means) — agrupar clientes parecidos para personalizar a abordagem.
- **Classe desbalanceada** — quando poucos clientes compraram; tratar com `class_weight`, métricas certas.
- **AUC-ROC / Precision / Recall** — métricas de classificação. Para negócio, mostre **lift** e **precisão no top 10%**.
- **Lift** — "a lista do modelo converte X vezes mais que a escolha aleatória". Ótimo argumento de pitch.
- **Validação cruzada** — testar o modelo em várias partições para não se enganar.
- **SHAP values** — contribuição de cada variável na previsão de um cliente.
- **LGPD** — Lei Geral de Proteção de Dados: dados de clientes não vão para repositório público.
- **Open Finance** — compartilhamento de dados entre instituições com consentimento (ideia de enriquecimento).
- **Jornada omnichannel** — cliente transita entre app, gerente, WhatsApp, agência sem perder contexto.
- **CAC, LTV, taxa de conversão, ticket médio, prêmio** — métricas de negócio; prêmio = valor pago pelo seguro.
- **Sinistro / sinistralidade** — evento coberto / razão sinistros pagos ÷ prêmios.

## Ligações
[[Ideias]] · [[Grau de confiança]] · [[Click-to-buy]]
