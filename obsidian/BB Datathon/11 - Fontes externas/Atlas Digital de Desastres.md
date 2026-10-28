---
tags: [fonte-externa, s2id, em-uso]
atualizado: 2026-10-28
status: em uso no motor
---
# 🌧️ Atlas Digital de Desastres (S2iD)

> [!success] Em uso desde 28/10
> Base oficial **1991–2025 v1.1 (06/08/2026)**, com dados do **S2iD** (Sedec/MIDR) e licença **Creative Commons Atribuição**. O motor usa o recorte das 10 capitais em `motor/externos/desastres_municipio.csv`, **só no texto** do motivo de danos por água e de vendaval. Sem o arquivo, a frase some e nada mais muda.

- **Órgão:** Secretaria Nacional de Proteção e Defesa Civil (Sedec/MIDR), com o Ceped/UFSC
- **Onde baixar:** [Downloads do Atlas](https://atlasdigital.mdr.gov.br/paginas/downloads.xhtml) → "Ponto e Vírgula (CSV)" (86 MB). O [portal de dados abertos do MIDR](https://dadosabertos.mdr.gov.br/dataset/s2id_sedec) tem o mesmo arquivo, mas recusa downloads automáticos. Sistema de origem: [S2iD](https://s2id.mi.gov.br/)
- **Como atualizar:** `python motor/externos/coletar.py --atlas CAMINHO_DO_CSV`

## Como transformamos
| Grupo | Códigos COBRADE | Cobertura |
|---|---|---|
| Água | 13214 chuvas intensas · 12300 alagamentos · 12200 enxurradas | [[Conteúdo]] / danos por água |
| Vento | 13215 vendavais e ciclones · 13213 granizo · 13112 | vendaval e granizo |
| Fora | inundação de rio, deslizamento, seca, erosão | Costumam ser exclusões do residencial |

## O que saiu (registros oficiais)
| Capital | Água 1991–2025 | Água nos últimos 10 anos | Vento 1991–2025 | Vento nos últimos 10 anos |
|---|---|---|---|---|
| São Paulo | 40 | 4 | 3 | 0 |
| Belo Horizonte | 18 | 11 | 1 | 1 |
| Rio de Janeiro | 18 | 16 | 1 | 1 |
| Curitiba | 17 | 10 | 10 | 7 |
| Porto Alegre | 9 | 8 | 3 | 2 |
| Recife | 8 | 1 | 0 | 0 |
| Salvador | 8 | 2 | 1 | 0 |
| Goiânia | 8 | 8 | 0 | 0 |
| Fortaleza | 3 | 0 | 0 | 0 |
| Brasília | 2 | 2 | 3 | 1 |

**Exemplo no motivo:** "Em Curitiba, a Defesa Civil registrou 10 ocorrências de vendaval, ciclone ou granizo desde 1991 (7 nos últimos 10 anos; a última em 2025)."

> [!warning] Limitações
> - O registro depende de o município informar à Defesa Civil. **Ausência de registro não é ausência de risco**, então zero registros não gera frase.
> - Nível de município. As coordenadas da base são perturbadas (RN-10), então não dá para descer ao bairro.
> - Não mexe em valor, plano, confiança nem elegibilidade (RN-12; dado externo nunca decide sozinho, RN-08).

Ligações: [[Enriquecimento externo]] · [[ANEEL continuidade]] · [[Métricas do mercado x as nossas]] · [[Mapa do código]]
