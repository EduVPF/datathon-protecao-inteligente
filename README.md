# Proteção Inteligente · Seguro Residencial

Projeto do time para o **Datathon Proteção Inteligente** (IBMEC + BB Seguros), desafio **Seguro Residencial**.

Um **motor de regras explicável** lê o que o banco já sabe sobre o cliente e o imóvel e entrega, para cada caso: **elegibilidade, plano, coberturas com faixa mínima e máxima, confiança, até 3 perguntas e o motivo**. A mesma ficha alimenta as planilhas da entrega, o app do cliente e o painel do gerente.

> **Comece por [`documentos/contexto/00-mapa.md`](documentos/contexto/00-mapa.md):** o índice e a linha do tempo do projeto, com um documento curto por etapa.
>
> Este README é o mapa do repositório. O README final da entrega (equipe, arquitetura, premissas, métricas, uso de IA) é escrito no fim, na etapa de revisão.

## Como rodar

Requer Python 3.11.

```bash
pip install -r requirements.txt
python -m pytest -q                 # 47 testes
python motor/gerar.py --entrega     # gera, valida e copia as planilhas para entrega/
```

O motor lê `dados/desenvolvimento` (calibração) e `dados/teste_comum` (os 138 casos da entrega), valida as 2 planilhas contra as regras do guia e grava em `motor/saida/`. Com `--entrega`, copia as planilhas, as métricas e os casos contrastantes para `entrega/` e atualiza a demo (`prototipos/fichas_demo.js`).

- **Demo das jornadas:** abra `prototipos/indexprototipo_gerente.html` com dois cliques.
- **API (opcional):** `pip install -r requirements-api.txt` e depois `uvicorn api:app --app-dir motor --port 8000`. A documentação fica em `/docs`.
- **Premissas:** `motor/parametros.py`. **Fontes externas:** `motor/externos/` (ver `FONTES.md`).

## Regras revisadas em 28/10

- **Seguro BB já existente:** cliente com seguro residencial e um imóvel só sai como `NAO` (o endereço já está segurado e o guia proíbe duas propostas). Com dois imóveis, fica `SIM` e o motor pergunta qual deles já tem seguro.
- **Crianças e pets:** entram só como necessidade informada pelo cliente (slide 14, "casa familiar → RC familiar"). Crianças e pet juntos somam 1 ponto ao Total; só um dos dois vira pergunta. Nunca mudam faixa, elegibilidade, canal ou confiança, e a métrica `familia_declarada_muda_valor_ou_confianca` prova isso (0 casos). Renda e idade continuam fora de tudo.
- **Confiança por regra:** cada dado crítico (área, bens, uso, vínculo, tipo) é observado, estimado ou presumido. BAIXA se área ou bens forem presumidos, ou se houver um presumido junto com um estimado; ALTA se os 5 forem observados e não houver pendência; MÉDIA no resto. Antes era um corte numa nota, e 101 dos 138 casos ficavam a 3 pontos de mudar de nível. Mexendo 20% nos pesos, 0 casos mudam. Detalhes em `documentos/contexto/17-revisao-qa.md`.
- **Padrão construtivo vazio:** em vez de supor "normal", a faixa vai do econômico ao superior (fator 0,85 a 1,30), e o motor pergunta o acabamento.
- **Perguntas pelo valor da informação:** as perguntas de valor (área, padrão, bens) saem na ordem de quanto cada resposta pode apertar a faixa de incêndio, e a ficha mostra esse valor (`reduz_faixa_ate`).
- **Justiça por faixa de renda:** `metricas.json` traz, por quinto de renda, o plano, a elegibilidade e os bens comprovados. A regra dos 80% do crédito, aplicada à elegibilidade, dá 0,91.
- **CUB:** só entra o CUB oficial (SP, DF, GO, BA). Nas outras UFs o máximo é SINAPI × a razão CUB/SINAPI das UFs oficiais. Ver `motor/externos/FONTES.md`.
- **Casos contrastantes:** os 3 perfis do slide 14 (apartamento urbano, casa familiar, casa de lazer) mais um caso não elegível, em `entrega/casos_contrastantes.json`.
- **Justificativa** na linguagem do slide 23: "Recomendamos o plano X porque... Se você escolher menos: ..., e essas necessidades ficarão descobertas."

## Pastas

```
├── motor/                  Motor de recomendação (Python)
│   ├── externos/           Fontes externas salvas + FONTES.md
│   └── saida/              Gerado: planilhas, fichas.json, métricas (fora do git)
├── tests/                  Testes automáticos
├── entrega/                Planilhas finais, métricas e casos contrastantes (versionados)
├── prototipos/             Protótipos das jornadas (base: indexprototipo_gerente.html)
├── documentos/
│   ├── contexto/           Um documento por etapa (comece pelo 00-mapa.md)
│   ├── PLANO_UNIFICADO.md  O plano a seguir
│   └── apresentacao_plano.html  Slides do plano
├── dados/                  Bases fornecidas pela organização (dados fictícios)
└── referencias/fontes/     PDFs originais das fontes públicas
```

## Sobre os dados

As bases em `dados/` foram fornecidas pela organização do datathon. Segundo o próprio pacote, **todos os clientes, imóveis, bens, compras, transações e endereços são fictícios**; só município, UF e código IBGE são referências reais. Os prints do app atual não estão no repositório, porque um deles mostra dados bancários.
