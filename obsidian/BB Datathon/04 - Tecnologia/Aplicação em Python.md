---
tags: [tecnologia, decisao]
data: 2026-10-27
status: recomendacao
---
# Aplicação em Python

## Recomendação: motor híbrido (regras + uma regressão simples)
| Parte | Técnica | Por quê |
|---|---|---|
| Elegibilidade, perfil, plano, perguntas | **Regras em Python puro** (if/else organizados em funções) | O guia não dá rótulo de "plano certo"; regra é explicável e rastreável (RN-34, RN-38, RN-48) |
| Área que falta (61% dos imóveis) | **Regressão linear** com scikit-learn: IPTU, luz, água, por tipo de imóvel | Correlação de 0,8 com a área; dá faixa (intervalo) e é fácil de explicar. No protótipo: erro típico de ±28 m² em apartamentos e ±50 m² em casas |
| Reconstrução e conteúdo | **Fórmulas** (área × custo do m² × padrão; soma dos bens) | Transparente; vai direto para a coluna `regra_calculo_utilizada` |
| Motivo e perguntas | **Textos montados por regra** | Nada inventado (RN-09) |
| Telas | **Streamlit** | App web em Python puro; roda em minutos; bom para o vídeo |

**O que eu não recomendo:**
- Modelo de classificação (LightGBM, rede neural) para escolher o plano: não existe rótulo. O guia exige documentar rótulo e risco de leakage (RN-47), e a banca vai perguntar de onde veio.
- Chamar um modelo de linguagem para escrever o motivo: precisa de chave de API (RN-44) e pode inventar coisa (RN-09). Fica como "próximos passos" (agente autônomo).

## Organização do código (proposta)
```
src/motor/
  dados.py          junta clientes + imóveis + sinais + bens + território
  elegibilidade.py  etapa 1: regras RN-15 a RN-19
  perfil.py         etapa 2: tipo, uso, vínculo, situação de moradia
  valores.py        etapa 3: área (regressão), reconstrução, conteúdo, faixas
  plano.py          etapa 4: Essencial / Prático / Total + adicionais
  explicacao.py     etapa 5: confiança, perguntas, motivo (cliente e gerente)
  saida.py          gera os 2 templates CSV + um JSON por caso
  rodar.py          roda tudo:  python -m src.motor.rodar --base teste_comum
app/streamlit_app.py
  aba Cliente       One Click Buy com modo leitura fácil
  aba Gerente       Cartão do gerente (busca pelo código da proposta)
  aba Evidências    métricas, casos contrastantes, teste de justiça
tests/              testes simples das regras + teste de justiça
entrega/            templates preenchidos
```
Cada etapa é um arquivo, então cada pessoa pode trabalhar numa parte sem dar conflito no Git.

## Fluxo
```
CSV (data/raw)  →  dados.py  →  5 etapas  →  resultado por caso (JSON)
                                                 ├─ saida.py → template_resultado.csv + template_coberturas.csv
                                                 └─ Streamlit → telas do cliente, do gerente e evidências
```

## Bibliotecas (enxugar o requirements)
Só o necessário: `pandas`, `numpy`, `scikit-learn`, `streamlit`, `plotly`, `pytest`. O que hoje está no `requirements.txt` e dá para tirar: `lightgbm`, `shap`, `geopandas`, `ydata-profiling`, `duckdb`, `pandera`, `rapidfuzz` (são pesadas ou não vamos usar). Versão do Python: **3.12** (mais compatível; registrar em `.python-version`, como pede a RN-43).

## Divisão sugerida para 5 pessoas
| Pessoa | Parte |
|---|---|
| 1 | `dados.py` + `elegibilidade.py` + `perfil.py` |
| 2 | `valores.py` (regressão da área, faixas) |
| 3 | `plano.py` + `explicacao.py` |
| 4 | Streamlit (3 abas, design BB) |
| 5 | `saida.py`, métricas, README e roteiro do vídeo |

Ligações: [[Como o motor funciona - exemplo real]] · [[Stack e glossário]] · [[Regras de negócio]] · [[Ideias v2 - proposta para o time]]
