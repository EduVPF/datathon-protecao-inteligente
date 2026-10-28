---
tags: [fonte-externa, debate]
sugerido_por: integrante do grupo
data: 2026-10-27
---
# Imagem de satélite

**A ideia:** usar uma API de satélite para medir o tamanho do imóvel e usar isso como apoio na área e na recomendação. Se a API falhar, entra um valor neutro e o motor segue com os dados da base.

## O problema nesta base
O guia diz que logradouro, número, CEP e **coordenadas são fictícios ou perturbados** (RN-10). A tabela `territorio.csv` traz a observação: "COORDENADA PERTURBADA; NAO REPRESENTA DOMICILIO REAL". Ou seja, se a gente apontar o satélite para a latitude/longitude do cliente, vai medir o telhado de outra casa (ou um terreno vazio). Usar esse número como área do cliente seria apresentar algo inventado como fato (quebra a RN-09).

## Como dá para usar sem quebrar regra
**No nível do município** (código IBGE, que é real):
- Bases abertas de contorno de prédios feitas a partir de satélite: **Microsoft Global ML Building Footprints** (global, atualizada em ago/2026; uma contagem de usuário fala em ~18,7 milhões de prédios no Brasil numa versão anterior) e **Google Open Buildings** (combinada com a da Microsoft pela VIDA).
- Calcular, por município, o tamanho típico das construções (mediana) e usar como **referência auxiliar** quando a área não existe: por exemplo, para checar se a área estimada pelo IPTU faz sentido.
- Se não houver dado para o município → valor neutro (a mediana da própria base) e flag "sem dado externo" (RN-12).

**No mundo real (próximos passos):** com endereços verdadeiros, o BB poderia medir o imóvel por imagem, como fazem Cape Analytics, Nearmap e Verisk nos EUA. Reguladores de lá pedem cuidado: imagem não pode, sozinha, recusar cliente.

## Recomendação
- MVP: módulo "referência por município" opcional, ou só citar como próximos passos.
- Nunca usar a coordenada perturbada para medir o imóvel do cliente.
- Documentar fonte, data de acesso, licença e limitações (RN-11).

## Fontes
- [Microsoft Global ML Building Footprints](https://github.com/microsoft/globalmlbuildingfootprints) · [Mark Litwintschik sobre a base](https://tech.marksblogg.com/microsofts-global-ml-building-footprints.html) · [OSM: contagem no Brasil](https://www.openstreetmap.org/user/raphaelmirc/diary/398834)
- [VIDA: Google + Microsoft combinados](https://source.coop/vida/google-microsoft-open-buildings) · [WorldPop Brasil](https://data.worldpop.org/repo/prj/Google_OBT_v2_5/v1/T_0_4/BRA/count) · [ORNL: comparação das bases](https://www.ornl.gov/publication/building-level-comparison-microsoft-and-google-open-building-footprints-datasets)
- [S&P Global: imagem aérea e regulação](https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/10/insurers-seek-to-strike-balance-between-benefits-risks-of-ai-and-aerial-imagery)

Ligações: [[Enriquecimento externo]] · [[Área estimada pelos sinais da casa]] · [[Regras de negócio]] · [[Planos de jornada para o debate]]
