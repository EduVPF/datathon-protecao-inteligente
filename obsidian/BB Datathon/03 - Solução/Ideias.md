---
tags: [solucao, decisao]
status: proposta
---
# Abordagem recomendada: motor de recomendação explicável

> Proposta inicial, a validar quando os dados e o dicionário chegarem. Baseada no [[Desafio - resumo]].

## Por que não começar com "machine learning pesado"
Pelo que foi dito, provavelmente **não há rótulo** (não sabemos qual plano cada cliente "deveria" ter). O que pedem é: **sugestão coerente + confiança + perguntas + motivo**. Um motor de **regras transparentes + scores** atende melhor que um modelo caixa-preta, é explicável para o gerente (o motivo sai direto das regras) e dá para fazer em 2 dias. ML entra como bônus, se sobrar tempo.

## As 5 camadas do motor
```
1. Ingestão e junção     cliente ⟷ imóvel ⟷ bens/contas ⟷ território
2. Perfil do imóvel      tipo (casa/apto), uso (moradia/comércio), ocupação (próprio/alugado/financiado)
   + grau de confiança   para cada atributo
3. Faixas de cobertura   6 coberturas → valor sugerido + mín./máx. do catálogo
4. Perguntas             só onde a confiança é baixa E a resposta muda a oferta (máx. 2–3)
5. Plano + motivo        plano recomendado + 2 alternativas comparáveis + motivo em linguagem simples
```

### 2. Grau de confiança (ideia de fórmula)
`confiança = peso_da_origem × atualidade × concordância`
- **peso_da_origem:** confirmado pelo cliente = 1,0 · estimado = 0,7 · inferido = 0,5 *(ajustar)*
- **atualidade:** decai com a idade do dado, ex.: `exp(-meses_desde_atualização / 24)`
- **concordância:** sinais que apontam para o mesmo lado aumentam a confiança (ex.: condomínio + endereço = principal + tipo "apto" → apartamento próprio, alta confiança)
- Faixas: **alta** (≥ 0,75) usa direto · **média** pede confirmação simples · **baixa** pergunta ou usa valor padrão conservador

### 3. Faixas por cobertura (rascunho)
| Cobertura | Valor sugerido | Fonte |
|---|---|---|
| Reconstrução | área (m²) × **CUB/m² da UF** × fator padrão | CUB (Sinduscon) ou SINAPI (IBGE) |
| Conteúdo | soma dos bens estimados (com margem) | bens/contas |
| Danos elétricos | proporcional a eletrônicos + eletrodomésticos | bens + consumo de energia |
| Perda de aluguel* | aluguel mensal × N meses | sinais de aluguel |
| Resp. civil familiar | maior para apartamento (vizinho embaixo) e dependentes | tipo + família |
| 6ª cobertura | *a confirmar* | — |
Todo valor é **limitado ao mín./máx. do catálogo**.

### 4. Perguntas de confirmação (poucas e boas)
Ordenar os atributos incertos pelo **impacto na oferta** (quanto o prêmio/cobertura muda se a resposta for diferente) × **(1 − confiança)**. Perguntar só o top 2–3, em formato **sim/não ou múltipla escolha**. Ex.: "Este é o seu endereço principal?" · "O imóvel é um apartamento?"

### 5. Motivo (o ponto principal segundo a banca)
Texto curto gerado a partir dos sinais, com versão para **cliente** (valor) e para **gerente** (argumento):
> *"Seu apartamento tem cerca de 70 m² em Belo Horizonte; reconstruir custaria por volta de R$ X. Como há um apartamento abaixo, incluímos responsabilidade civil para vazamentos. A assistência cobre eletricista e encanador no dia a dia."*

Pode ser feito com **templates de texto** (determinístico e auditável). Opcional: um LLM só para deixar o texto mais natural, sem inventar números.

## O MVP (demonstração)
- **Saída oficial:** template preenchido (CSV) para os ~140 clientes de avaliação.
- **Streamlit** com duas telas:
  1. **Gerente:** busca o cliente → vê plano, faixas, confiança de cada dado, perguntas sugeridas e argumento de venda.
  2. **Cliente (app click-to-buy):** proposta pronta → responde 1–3 perguntas → compara 3 opções → ajusta → contrata.

## Diferenciais possíveis (se sobrar tempo)
- **Dados externos oficiais de risco** (desastres, raios, furto, custo de construção) para ajustar coberturas e reforçar o motivo. A organização sugeriu isso como opcional; a solução precisa funcionar sem eles. Plano completo em [[Enriquecimento externo]].
- Mapa dos imóveis (lat/long) no painel do gerente.
- Métrica de **"esforço economizado"**: nº de perguntas da entrevista tradicional × nº de perguntas da nossa jornada.

## Decisões
| Data | Decisão | Por quê |
|---|---|---|
| | | |

## Ligações
[[Regras e contexto]] · [[Grau de confiança]] · [[Perguntas de confirmação]] · [[Motivo da recomendação]] · [[Alternativas comparáveis]] · [[Ideias de inovação]]
