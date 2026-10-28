---
tags: [briefing, entrega]
---
# Templates de entrega

## `template_resultado_times.csv` (uma linha por cliente + imóvel)
Já vem com `cliente_id` e `imovel_id`. Colunas a preencher:
`elegivel`, `motivo_inelegibilidade`, `tipo_imovel_sugerido`, `uso_imovel_sugerido`, `tipo_vinculo_sugerido`, `plano_recomendado`, `coberturas_recomendadas`, `confianca_geral`, `justificativa_recomendacao`, `perguntas_confirmacao`, `fontes_publicas_adicionais`.

## `template_coberturas_times.csv` (só cabeçalho)
Uma linha para **cada cobertura fixa do plano** + cada adicional aplicável:
`cliente_id`, `imovel_id`, `cobertura`, `faixa_valor_min`, `faixa_valor_max`, `confianca_estimativa`, `dados_utilizados`, `regra_calculo_utilizada`, `justificativa`, `informacao_a_confirmar`, `observacao`.

## Regras
- Valores em reais **só com números**: sem "R$", sem ponto de milhar, sem texto.
- Confiança baixa **não** dispensa a faixa se houver base minimamente defensável. Ficar sem estimativa é exceção e precisa de justificativa.
- Assistências **não** entram no template de coberturas.
- Nome das coberturas: usar a nomenclatura do `catalogo_coberturas_fixas_planos.csv` ([[Catálogo do Seguro Residencial BB]]).
- Preencher os dois para **todos** os casos da base comum (138 imóveis).
- Plano e coberturas detalhadas têm que ser consistentes entre os dois arquivos.

Ligações: [[Desafio - resumo]] · [[Critérios de avaliação]]
