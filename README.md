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
python -m pytest -q                 # 35 testes
python motor/gerar.py --entrega     # gera, valida e copia as planilhas para entrega/
```

O motor lê `dados/desenvolvimento` (calibração) e `dados/teste_comum` (os 138 casos da entrega), valida as 2 planilhas contra as regras do guia e grava em `motor/saida/`. Com `--entrega`, copia as planilhas, as métricas e os casos contrastantes para `entrega/` e atualiza a demo (`prototipos/fichas_demo.js`).

- **Demo das jornadas:** abra `prototipos/indexprototipo_gerente.html` com dois cliques.
- **API (opcional):** `pip install -r requirements-api.txt` e depois `uvicorn api:app --app-dir motor --port 8000`. A documentação fica em `/docs`.
- **Premissas:** `motor/parametros.py`. **Fontes externas:** `motor/externos/` (ver `FONTES.md`).

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
