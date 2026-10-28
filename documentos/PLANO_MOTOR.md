# Motor de Recomendação do Seguro Residencial: Plano de Implementação

> ⚠️ **Substituído por `documentos/PLANO_UNIFICADO.md`** (28/10/2026), que junta este plano com o do time. Mantido só como referência da estrutura em módulos (Fase 3 do unificado).

> **Para quem for executar (pessoa ou agente):** siga tarefa por tarefa. Os passos usam caixas `- [ ]` para marcar o progresso. Sub-skill recomendada: `superpowers:executing-plans` (ou `superpowers:subagent-driven-development`).

**Objetivo:** transformar o rascunho `motor/` num motor de regras testado que preenche os dois templates da entrega para os 138 casos da base Teste Comum, com faixas defensáveis, confiança, perguntas e motivo. O mesmo resultado (a "ficha") alimenta o app, o gerente e um futuro agente.

**Arquitetura:** pipeline em Python puro, de 6 estações (imóvel → elegibilidade → bens → plano → coberturas → confiança e perguntas). Cada estação fica num módulo pequeno. A saída é uma **ficha JSON por cliente-imóvel**; os CSVs, a demo e a API opcional só leem a ficha. Dados externos entram como **tabelas salvas no projeto** (sem chamada de rede em tempo de execução).

**Tecnologia:** Python 3.11, pandas 2.2, pytest 8. Opcional: FastAPI + uvicorn, só para a API de demonstração.

**Spec:** `documentos/Guia_Times_Datathon_Protecao_Inteligente_Final.docx` (seções 1, 5, 6, 7, 8 e 9), `dados/desenvolvimento/LEIA-ME.md`, `documentos/PESQUISA_BENS_E_INDENIZACAO.md` e `documentos/ESPECIFICACAO_PROTOTIPO.md` (regras RN).

---

## Parte A · Pesquisa: o que usar e de onde vem

### A.1 Fontes externas (todas públicas)

| Dado | Fonte | Para quê | Status | Como entra |
|---|---|---|---|---|
| **CUB/m² R8-N por UF** | Sinduscons estaduais (agregado em [Paggo](https://www.paggo.com.br/blog/cub-o-que-e-tabela-por-estado); oficial [SP](https://sindusconsp.com.br/servicos/cub/) e [DF](https://sinduscondf.org.br/indicadores-cub/)) | Custo de reconstrução → incêndio | **Usar agora** | `motor/externos/cub_uf.csv` |
| **Condições Gerais BB Seguro Residencial v1.4** | [BB Seguros, SUSEP 15414.606453/2020-10](https://assets-bbseguros.cld.brasilseg.com.br/2025-07/CG_SEGURO_RESIDENCIAL_V-14.pdf) | Primeiro risco absoluto, segundo risco, bens não cobertos, tabela de depreciação | **Usar agora** | Regras em `parametros.py` com o número da cláusula |
| **Desastres por município (1991–2023)** | [Atlas Digital de Desastres no Brasil (MIDR)](https://atlasdigital.mdr.gov.br), base do S2iD | Reforçar o motivo e as faixas de vendaval e água | **Opcional (P2)** | `motor/externos/desastres_municipio.csv` (10 linhas), baixado à mão |
| **Raios por km²/ano** | [ELAT/INPE](https://agencia.fapesp.br/ranking-de-cidades-com-mais-raios/13806) | Motivo de danos elétricos | **Próximo passo** | Ranking antigo (2011); não usar sem dado atual |
| **Interrupções de energia (DEC/FEC)** | Painéis de indicadores da ANEEL | Danos elétricos | **Próximo passo** | Sem CSV por município confirmado |
| **Estatísticas de seguro residencial** | [SES/SUSEP](https://www2.susep.gov.br/menuestatistica/ses/) | Sinistralidade por UF para calibrar | **Próximo passo** | Base semanal para download; recorte por UF a confirmar |
| **Produtos de seguro residencial** | [Open Insurance Brasil, APIs da Fase 1](https://br-openinsurance.github.io/areadesenvolvedor) (Home-insurance v1.3, Housing v1.2) | Comparar coberturas do mercado | **Próximo passo (pitch)** | Não entra no motor |
| **Furto/roubo a residência por UF** | [Anuário FBSP 2026](https://forumseguranca.org.br/wp-content/uploads/2026/07/anuario-2026-infografico.pdf) | Faixa de roubo | **Não usar** | Sem recorte residencial por UF; risco de discriminação por região |

**Tabela CUB a gravar** (R8-N, padrão-base; validar no site de cada Sinduscon antes da entrega e registrar a data de acesso):

| UF | R$/m² | Mês |
|---|---|---|
| SP | 2238.58 | set/2026 (oficial Sinduscon-SP) |
| RJ | 2476.31 | set/2026 |
| MG | 2548.75 | jul/2026 |
| PR | 2738.93 | set/2026 |
| RS | 2943.73 | set/2026 |
| DF | 2416.71 | set/2026 (oficial ago/2026: 2423.72) |
| GO | 2242.42 | ago/2026 |
| BA | 2243.22 | set/2026 |
| PE | 2240.23 | set/2026 |
| CE | 2510.74 | set/2026 |

### A.2 APIs: quais são necessárias

- **Em tempo de execução: nenhuma.** O motor roda offline e de forma reproduzível, como o guia exige ("funciona sem dado externo", "execução sem falhas críticas").
- **API IBGE de localidades** (`servicodados.ibge.gov.br/api/v1/localidades/municipios/{codigo}`): usar **uma vez** num script de checagem, para confirmar que os 10 códigos IBGE batem com município e UF. O resultado não entra no motor.
- **API própria (opcional, P2):** `motor/api.py` com FastAPI expõe a ficha (`GET /fichas/{imovel_id}`, `POST /recomendar`). Serve para demonstrar "agentes autônomos" e para o protótipo ler dados reais. O protótipo também funciona lendo `fichas.json`, sem servidor.
- **LLM:** não é necessário. Motivos e perguntas saem de modelos de texto com códigos rastreáveis. Na banca, isso é uma vantagem (explicável e reproduzível).

### A.3 Regras de negócio que o motor precisa respeitar

| Regra | Origem |
|---|---|
| Elegibilidade antes de recomendar; falta de dado vira pergunta, não recusa | Guia §1, §9.1; RN-15 a RN-19 |
| **Renda e idade não decidem plano, valor nem canal** | Guia §1 (guardrail); RN-07 |
| Todas as coberturas fixas do plano no template de coberturas, com a nomenclatura de `catalogo_coberturas_fixas_planos.csv` | Guia §5.2, §7; LEIA-ME |
| Faixas em reais, só números inteiros, sem símbolo ou separador | Guia §5.2 |
| Confiança baixa não dispensa a faixa | Guia §5.2 |
| Primeiro risco absoluto: o limite de cada cobertura = maior perda provável | CG cl. 15.1 |
| Apartamento ou imóvel financiado: estrutura em segundo risco; o incêndio foca em conteúdo e benfeitorias | CG cl. 15.2 |
| Limite único prédio + conteúdo, com prioridade do prédio: em casa, incêndio = reconstrução + conteúdo | CG cl. 5.5–5.6; Guia §9.1 |
| Joias, relógios, dinheiro e obras de arte não são cobertos; roubo não cobre bicicleta fora de casa, drones nem residência desocupada | CG cl. 6.1; Roubo 2.1 |
| Imóvel alugado: beneficiários distintos (locador para o imóvel, locatário para o conteúdo) | Guia §9.1 |
| Assistências não entram no template de coberturas | Guia §5.2 |

---

## Global Constraints

- Python `3.11`; dependências fixas em `requirements.txt`: `pandas==2.2.3`, `pytest==8.3.3` (mais `fastapi==0.115.*` e `uvicorn==0.32.*` só se a Tarefa 10 for feita).
- Entrada: `dados/desenvolvimento/` (calibração) e `dados/teste_comum/` (entrega). Saída: `motor/saida/`.
- **Nenhum campo de `clientes.renda_mensal`, `origem_renda` ou `idade` pode ser lido por plano, coberturas, canal ou bens.** Pode aparecer na ficha só como informação de perfil, nunca em `motivos`.
- Valores de cobertura: `int`, arredondados para 500 abaixo de 20.000 e para 1.000 acima.
- `confianca` ∈ {`ALTA`, `MEDIA`, `BAIXA`}; `natureza` ∈ {`OBSERVADO`, `ESTIMADO`, `INFERIDO`, `CONFIRMADO`}.
- `elegivel` ∈ {`SIM`, `NAO`, `CONDICIONAL`}. `CONDICIONAL` = há um sinal de restrição que precisa de confirmação. *Decisão do time: confirmar na mentoria se a organização aceita esse terceiro valor.*
- Nomes das coberturas: exatamente os de `catalogo_coberturas_fixas_planos.csv`.
- Toda premissa numérica fica em `motor/parametros.py`, com comentário de origem (cláusula, fonte ou "premissa do time").

## Review Focus

1. **Imóvel sem área e sem IPTU (ambos 0):** a área estimada não pode ser 0 nem infinita. Usar a mediana da área do tipo de imóvel no município, com confiança `BAIXA`. *Teste na Tarefa 2.*
2. **Cliente sem nenhuma compra e sem bens:** a faixa de bens não pode ser 0. Usar o piso da cesta básica (`BENS_PISO`), com confiança `BAIXA`. *Teste na Tarefa 3.*
3. **Valores extremos** (compras ou obra no percentil 99,9, aluguel acima de R$ 10 mil): as faixas respeitam os tetos de `LIMITES_COBERTURA` e nunca ficam invertidas. *Teste na Tarefa 5.*
4. **Cliente com 2 imóveis:** compras e bens são do imóvel de referência; um imóvel não pode herdar os bens do outro. *Teste na Tarefa 3.*
5. **Reprodutibilidade:** rodar duas vezes gera CSVs idênticos, byte a byte. *Teste na Tarefa 8.*

---

## Estrutura de arquivos

```
motor/
├── parametros.py        premissas numéricas (modificar: tirar renda, somar bens/segundo risco)
├── externos/
│   ├── cub_uf.csv       CUB por UF (criar)
│   └── FONTES.md        fonte, data de acesso, licença, método, limitações (criar)
├── dados.py             carregar(origem) e calibrar(dados) (extrair de motor.py)
├── imovel.py            inferir_tipo, inferir_vinculo, inferir_uso, inferir_area (extrair)
├── elegibilidade.py     avaliar_elegibilidade (extrair + ajustar)
├── bens.py              estimar_bens: 3 âncoras (criar)
├── plano.py             escolher_plano sem renda + motivos com código (extrair + ajustar)
├── coberturas.py        dimensionar por maior perda provável + segundo risco (extrair + reescrever)
├── confianca.py         confiança por fonte × frescor + perguntas por impacto (extrair + ajustar)
├── ficha.py             processar_caso / processar (orquestra; criar a partir de motor.processar)
├── templates.py         para_templates + validar_templates (extrair + criar validação)
├── gerar.py             CLI: calibra, processa, grava, mede (modificar)
├── metricas.py          métricas do guia + casos contrastantes (criar)
├── demo.py              mantém
└── api.py               FastAPI opcional (criar, P2)
tests/
├── conftest.py          fixtures: base de desenvolvimento, base de teste, linha sintética
├── test_imovel.py · test_elegibilidade.py · test_bens.py · test_plano.py
├── test_coberturas.py · test_confianca.py · test_templates.py · test_coerencia.py
requirements.txt · .python-version
```

`motor/motor.py` deixa de existir no fim da Tarefa 8; até lá ele continua funcionando, para não quebrar o protótipo.

---

## Tarefas

### Tarefa 0: preparar o ambiente

**Arquivos:**
- Criar: `requirements.txt`, `.python-version`, `tests/conftest.py`, `motor/__init__.py`.

**Interfaces:**
- Produz as fixtures de `tests/conftest.py`:
  - `dev` e `teste`: dicts de DataFrames das duas bases;
  - `cal`: a calibração da base de desenvolvimento;
  - `linha(**campos)`: um `SimpleNamespace` com uma linha mesclada da base de desenvolvimento, sobrescrevendo os campos passados;
  - `caso(teste, imovel_id) -> (r, bens_df)`: a linha mesclada de um imóvel e os bens dele;
  - `VAZIO`: um DataFrame de bens vazio, com as colunas certas;
  - `ctx_de(imovel_id) -> dict`: o contexto completo usado por `dimensionar` (fica pronto na Tarefa 5).
- As fixtures `ctx_caso_00005`, `ctx_casa_100m2_sp`, `ctx_extremo` e `ctx_muitas_duvidas` são montadas com `ctx_de` ou com `linha(...)` nos próprios arquivos de teste. Constantes de teste, como `BENS_20K`, `APTO` e `INQUILINO`, também ficam no arquivo de teste que as usa.

- [ ] **Passo 1:** `git init` na raiz e um `.gitignore` com `motor/saida/`, `__pycache__/` e `*.pyc`. Assim o time ganha histórico; se preferirem não usar git, pulem os passos de commit.
- [ ] **Passo 2:** `requirements.txt` com as versões das Global Constraints; `.python-version` com `3.11`.
- [ ] **Passo 3:** `pip install -r requirements.txt`, depois `pytest --collect-only`. Esperado: "no tests ran", sem erro de import.
- [ ] **Passo 4:** commit `chore: ambiente e fixtures de teste`.

### Tarefa 1: dados externos e parâmetros sem renda

**Arquivos:**
- Criar: `motor/externos/cub_uf.csv` (colunas `uf,cub_m2,mes_referencia,fonte,data_acesso`), `motor/externos/FONTES.md`.
- Modificar: `motor/parametros.py`.
- Teste: `tests/test_parametros.py`.

**Interfaces:**
- Produz: `parametros.cub_m2(uf: str) -> float` (lê o CSV uma vez; UF desconhecida → `CUB_M2_PADRAO = 2400.0`).
- Produz constantes novas:
  - `FATOR_ESTOQUE = 2.7`;
  - `BENS_PISO = 15000`;
  - `FRACAO_BENFEITORIAS = (0.10, 0.20)`;
  - `PORTATEIS_SHARE_ELETRO = 1.0` (roubo usa 100% de eletrônicos);
  - `PESO_FONTE = {"CONFIRMADO":1.0, "DOCUMENTO":0.9, "TRANSACAO":0.8, "INFERIDO":0.6, "PRESUMIDO":0.5}`.
- Remove: `RENDA_MIN_TOTAL`, `RENDA_MAX_SO_ESSENCIAL`.

- [ ] **Passo 1: teste que falha**
```python
def test_cub_sp_e_padrao():
    assert parametros.cub_m2("SP") == 2238.58
    assert parametros.cub_m2("XX") == parametros.CUB_M2_PADRAO

def test_nao_ha_parametro_de_renda():
    assert not [n for n in dir(parametros) if "RENDA" in n]
```
- [ ] **Passo 2:** `pytest tests/test_parametros.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** gravar o CSV com a tabela da Parte A.1. Implementar `cub_m2` e as constantes. `FONTES.md` com uma seção por fonte: URL, data de acesso, licença (dado público), método (cópia manual), transformação (nenhuma) e limitação (agregador; validar no Sinduscon).
- [ ] **Passo 4:** `pytest tests/test_parametros.py -v`. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: CUB por UF e parametros sem renda`.

### Tarefa 2: módulo `imovel` (tipo, vínculo, uso, área)

**Arquivos:**
- Criar: `motor/dados.py` (move `carregar` e `calibrar` sem mudar a lógica), `motor/imovel.py` (move `inferir_tipo`, `inferir_vinculo`, `inferir_uso`, `inferir_area`, `dado`).
- Teste: `tests/test_imovel.py`.

**Interfaces:**
- Produz: `dado(valor, natureza, confianca, fonte) -> dict`.
- Produz: as funções `inferir_tipo(r)`, `inferir_vinculo(r)`, `inferir_uso(r, outro_principal: bool)` e `inferir_area(r, cal) -> dict`, com `min` e `max`, e as mesmas assinaturas de `motor/motor.py`.
- `calibrar` passa a guardar também `cal["area_mediana"][f"{codigo_ibge}|{tipo}"]`.

- [ ] **Passo 1: testes que falham**
```python
def test_apartamento_pelo_termo(linha):
    assert inferir_tipo(linha(possui_termo_apartamento="SIM"))["valor"] == "APARTAMENTO"

def test_aluguel_vira_inquilino_observado(linha):
    d = inferir_vinculo(linha(pagamento_aluguel_recorrente="SIM", valor_aluguel_recorrente=1900))
    assert (d["valor"], d["natureza"], d["confianca"]) == ("INQUILINO", "OBSERVADO", "ALTA")

def test_area_sem_iptu_nem_energia_usa_mediana(linha, cal):
    d = inferir_area(linha(area_cadastrada_m2=0, pagamento_iptu_anual=0, energia_media_mensal_6m=0), cal)
    assert 30 <= d["valor"] <= 400 and d["confianca"] == "BAIXA"
```
- [ ] **Passo 2:** `pytest tests/test_imovel.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** mover o código. Em `inferir_area`: se a estimativa por IPTU e energia der ≤ 0, usar `cal["area_mediana"]` do município e tipo, com a faixa ±30% e confiança `BAIXA`.
- [ ] **Passo 4:** `pytest tests/test_imovel.py -v`. Esperado: PASS.
- [ ] **Passo 5:** commit `refactor: modulo imovel com fallback de area`.

### Tarefa 3: módulo `bens` (as três âncoras)

**Arquivos:**
- Criar: `motor/bens.py`.
- Teste: `tests/test_bens.py`.

**Interfaces:**
- Consome: `dado` (Tarefa 2) e os parâmetros da Tarefa 1.
- Produz: `estimar_bens(r, bens_imovel: pd.DataFrame, area: dict) -> dict` com estas chaves:
  - `min`, `max`, `valor` (ponto médio);
  - `categorias` = {`eletronicos`, `eletrodomesticos`, `moveis`, `itens_lazer`}, cada uma com `{min, max}`;
  - `portateis` = {min, max} (base de roubo);
  - `eletricos` = {min, max} (base de danos elétricos);
  - `natureza`, `confianca`, `fonte`.

**Regras** (premissas da pesquisa, seção 4.2):
- **Âncora comprovada (mínimo):** maior valor entre as compras de 36 meses e a soma de `valor_bem_ponderado_referencia`. Usar o maior, e não a soma, porque as duas fontes se sobrepõem.
- **Âncora de estoque (máximo):** `FATOR_ESTOQUE × compras_36m`.
- **Sem arredondamento:** `estimar_bens` devolve os valores sem arredondar; quem arredonda é `faixa()`, na Tarefa 5.
- **Piso:** `BENS_PISO`. Se as compras e os bens forem 0, use `min = BENS_PISO` e `max = 2 × BENS_PISO`, com confiança `BAIXA`.
- **Confiança:** `MEDIA` se ≥ 60% do valor dos bens cadastrados tiver vínculo `ALTA`; senão `BAIXA`.
- **Portáteis:** eletrônicos (compras + bens `ELETRONICO`), mesmo processo de mín/máx.
- **Elétricos:** eletrônicos + eletrodomésticos.

- [ ] **Passo 1: testes que falham**
```python
def test_caso_00005(teste):
    r, b = caso(teste, "IMO_CASO_00005_01")      # helper do conftest
    est = estimar_bens(r, b, area={"valor":110})
    assert est["min"] == 20750 and est["max"] == 56025   # 20.750 × 2,7; o arredondamento só acontece em faixa()

def test_sem_compras_usa_piso(linha):
    est = estimar_bens(linha(compras_moveis_36m=0, compras_eletrodomesticos_36m=0, compras_eletronicos_36m=0), VAZIO, {"valor":80})
    assert est["min"] == 15000 and est["confianca"] == "BAIXA"

def test_bens_de_outro_imovel_nao_entram(teste):
    r, b = caso(teste, "IMO_CASO_00005_02")
    assert set(b.imovel_id_referencia) <= {"IMO_CASO_00005_02"}

def test_nao_le_renda(linha):
    a = estimar_bens(linha(renda_mensal=2000), VAZIO, {"valor":80})
    b = estimar_bens(linha(renda_mensal=30000), VAZIO, {"valor":80})
    assert a == b
```
- [ ] **Passo 2:** `pytest tests/test_bens.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar `estimar_bens` com as regras acima, usando `arred` de `parametros`.
- [ ] **Passo 4:** `pytest tests/test_bens.py -v`. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: estimativa de bens por tres ancoras`.

### Tarefa 4: elegibilidade e plano sem renda

**Arquivos:**
- Criar: `motor/elegibilidade.py`, `motor/plano.py`.
- Teste: `tests/test_elegibilidade.py`, `tests/test_plano.py`.

**Interfaces:**
- Produz: `avaliar_elegibilidade(r) -> tuple[str, list[dict]]`. Mesma lógica de hoje (obra ≥ `OBRA_LIMIAR_CONFIRMAR`, seguro existente), mais:
  - `uso == "LAZER_VERANEIO"` gera um aviso (não uma pendência): "roubo não cobre residência desocupada".
  - Cada pendência carrega `{codigo, texto, pergunta, clausula}`.
- Produz: `escolher_plano(r, tipo, vinculo, uso, bens) -> dict` com `{plano, ideal, motivos, pontos, adicionais, alternativa}`. Cada motivo tem `{codigo, plano, peso, texto}`.

**Mudanças de regra:**
- Sai todo uso de renda.
- **Conteúdo relevante** passa a ser `bens["valor"] ≥ 25000`.
- **Eletrônicos relevantes:** `bens["portateis"]["max"] ≥ 8000` soma +1 ao Prático.
- Os outros sinais continuam como hoje: casa fora de condomínio, vidraçaria, veraneio, inquilino, locador, financiado, dependentes, pet.
- **Decisão:** `total ≥ 2` → TOTAL; senão, `pratico ≥ 2 ou total ≥ 1` → PRATICO; senão ESSENCIAL.
- **Alternativa:** o plano vizinho, com o que muda.

- [ ] **Passo 1: testes que falham**
```python
def test_inquilino_com_dependente_total(linha):
    p = escolher_plano(linha(quantidade_dependentes=1), tipo=APTO, vinculo=INQUILINO, uso=HABITUAL, bens=BENS_20K)
    assert p["plano"] == "TOTAL" and {"INQUILINO","DEPENDENTES"} <= {m["codigo"] for m in p["motivos"]}

def test_renda_nao_muda_plano(linha):
    args = dict(tipo=CASA, vinculo=PROPRIETARIO, uso=HABITUAL, bens=BENS_20K)
    assert escolher_plano(linha(renda_mensal=1800), **args)["plano"] == escolher_plano(linha(renda_mensal=34000), **args)["plano"]

def test_obra_grande_condicional(linha):
    el, pend = avaliar_elegibilidade(linha(gastos_material_construcao_24m=40000))
    assert el == "CONDICIONAL" and pend[0]["codigo"] == "POSSIVEL_REFORMA"
```
- [ ] **Passo 2:** `pytest tests/test_elegibilidade.py tests/test_plano.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** mover e ajustar o código conforme acima.
- [ ] **Passo 4:** rodar os mesmos testes. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: plano por sinais sem renda`.

### Tarefa 5: coberturas por maior perda provável

**Arquivos:**
- Criar: `motor/coberturas.py`.
- Teste: `tests/test_coberturas.py`.

**Interfaces:**
- Consome: `inferir_*` (Tarefa 2), `estimar_bens` (Tarefa 3), `cub_m2` (Tarefa 1).
- Produz: `dimensionar(cobertura: str, ctx: dict) -> dict` com `{min, max, confianca, dados_utilizados, regra, justificativa, confirmar, observacao}`. `ctx` traz `r, tipo, vinculo, uso, area, bens, imovel`.
- Produz: `valor_imovel(r, tipo, area) -> dict` com `{cub_m2, cheio:(min,max), segundo_risco: bool}`. `segundo_risco = tipo in (APARTAMENTO, CASA_EM_CONDOMINIO) or vinculo == FINANCIADO`.

**Regras** (com a cláusula das condições gerais na `observacao`):

| Cobertura | Mín – Máx |
|---|---|
| `INCENDIO_RAIO_EXPLOSAO_FUMACA` | Sem segundo risco: reconstrução (área × CUB × fator do padrão) + bens. Com segundo risco: `FRACAO_BENFEITORIAS` × reconstrução + bens; observação "cl. 15.2: estrutura coberta primeiro pelo seguro do condomínio ou do financiamento" |
| `DANOS_ELETRICOS` | `bens["eletricos"]` |
| `ROUBO_FURTO_ARROMBAMENTO` | `bens["portateis"]`; com uso de veraneio, observação "residência desocupada não é coberta (Roubo 2.1 c)" |
| `QUEBRA_DE_VIDROS` | Como hoje (tipo + vidraçaria) |
| `RESPONSABILIDADE_CIVIL_FAMILIAR` | R$ 30 mil + R$ 15 mil por dependente + R$ 10 mil se pet; máximo = 2 × mínimo. Sem renda |
| `PERDA_PAGAMENTO_ALUGUEL`, `DESPESAS_EMERGENCIAIS`, `DANOS_POR_AGUA`, `VENDAVAL_GRANIZO`, `IMPACTO_VEICULOS_TERRESTRES`, `QUEDA_AERONAVE` | Como hoje (proporções em `PROP`) |

Todas passam por `faixa()`, que limita aos tetos de `LIMITES_COBERTURA` e garante `min ≤ max`.

- [ ] **Passo 1: testes que falham**
```python
def test_apto_financiado_segundo_risco(ctx_caso_00005):
    inc = dimensionar("INCENDIO_RAIO_EXPLOSAO_FUMACA", ctx_caso_00005)
    assert inc["max"] < 110 * 2738.93 and "15.2" in inc["observacao"]

def test_casa_soma_reconstrucao_e_bens(ctx_casa_100m2_sp):
    inc = dimensionar("INCENDIO_RAIO_EXPLOSAO_FUMACA", ctx_casa_100m2_sp)
    assert inc["min"] >= 100 * 2238.58 * 0.9

def test_roubo_usa_portateis(ctx_caso_00005):
    rb = dimensionar("ROUBO_FURTO_ARROMBAMENTO", ctx_caso_00005)
    assert 8000 <= rb["min"] <= rb["max"] <= 45000

def test_extremos_nao_invertem(ctx_extremo):
    for c in TODAS_COBERTURAS:
        f = dimensionar(c, ctx_extremo)
        assert isinstance(f["min"], int) and 0 < f["min"] <= f["max"]
```
- [ ] **Passo 2:** `pytest tests/test_coberturas.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar.
- [ ] **Passo 4:** rodar os mesmos testes. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: coberturas por maior perda provavel e segundo risco`.

### Tarefa 6: confiança (fonte × frescor) e perguntas por impacto

**Arquivos:**
- Criar: `motor/confianca.py`.
- Teste: `tests/test_confianca.py`.

**Interfaces:**
- Produz: `peso_dado(d: dict) -> float`. Mapeia a fonte do dado para `PESO_FONTE` e multiplica pelo frescor: `0.5 ** (idade_meses / MEIA_VIDA[tipo])`, com `MEIA_VIDA = {"vinculo":12, "area":120, "bens":36, "uso":12}`. A idade em meses é a do meio da janela do sinal: 3 para média de 6 meses, 18 para 36 meses. Sem janela, conta como 0.
- Produz: `confianca_geral(campos: dict, elegibilidade: str) -> tuple[str, int]` (nível e pontuação de 0 a 100).
- Produz: `montar_perguntas(ctx, pendencias) -> tuple[list[dict], int]`, no máximo `MAX_PERGUNTAS = 3`. Prioridade: elegibilidade 100, uso 70, recebe aluguel 60, **bens 55** ("Seus bens somam entre R$ X e R$ Y. Está mais ou menos isso?"), área 50, vínculo 30.

- [ ] **Passo 1: testes que falham**
```python
def test_dado_antigo_pesa_menos():
    novo = peso_dado({"tipo":"bens","fonte_tipo":"TRANSACAO","idade_meses":3})
    velho = peso_dado({"tipo":"bens","fonte_tipo":"TRANSACAO","idade_meses":30})
    assert velho < novo

def test_no_maximo_tres_perguntas(ctx_muitas_duvidas):
    ps, n = montar_perguntas(ctx_muitas_duvidas, PENDENCIAS_2)
    assert len(ps) == 3 and ps[0]["prioridade"] == 100 and n > 3

def test_condicional_nunca_alta():
    assert confianca_geral(CAMPOS_TODOS_ALTA, "CONDICIONAL")[0] != "ALTA"
```
- [ ] **Passo 2:** `pytest tests/test_confianca.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar. As inferências das Tarefas 2 e 3 passam a gravar `fonte_tipo` e `idade_meses` em cada `dado`.
- [ ] **Passo 4:** rodar os mesmos testes. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: confianca por fonte e frescor`.

### Tarefa 7: a ficha (contrato único para CSV, app, gerente e agente)

**Arquivos:**
- Criar: `motor/ficha.py`, `motor/ficha_schema.json`.
- Teste: `tests/test_ficha.py`.

**Interfaces:**
- Consome: tudo das Tarefas 2 a 6.
- Produz: `processar_caso(r, bens_imovel, cal, catalogo, outro_principal) -> dict` e `processar(dados, cal) -> list[dict]`.

**Chaves da ficha** (documentadas em `ficha_schema.json`):
- identificação: `cliente_id`, `imovel_id`, `local`;
- `campos`: tipo, vínculo, uso, área e bens, cada um com valor, natureza, confiança, fonte e min/max;
- `valor_imovel`, `elegibilidade`, `pendencias`, `avisos`;
- `plano`, `motivos`, `motivos_plano`, `alternativa`, `adicionais`;
- `coberturas` (lista), `perguntas`;
- `confianca`, `confianca_score`, `canal`.

**Canal:** `ONE_CLICK` se o cliente usa o app, a maturidade digital ≥ 40, a elegibilidade é SIM e a confiança não é BAIXA; senão `GERENTE`. A maturidade é comportamento digital, não um atributo pessoal.

**Não entram na ficha:** `renda`, `idade`. Isso é minimização de dados (critério de privacidade). O painel do gerente mostra só o resumo.

- [ ] **Passo 1: testes que falham**
```python
def test_ficha_tem_todas_fixas(fichas_teste, catalogo):
    for f in fichas_teste:
        assert set(catalogo[f["plano"]]) <= {c["cobertura"] for c in f["coberturas"]}

def test_ficha_sem_renda_nem_idade(fichas_teste):
    assert all("renda" not in json.dumps(f) and "idade" not in json.dumps(f) for f in fichas_teste)

def test_138_fichas(fichas_teste):
    assert len(fichas_teste) == 138
```
- [ ] **Passo 2:** `pytest tests/test_ficha.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar a orquestração (a mesma ordem de `motor.processar`) e escrever o schema.
- [ ] **Passo 4:** rodar os mesmos testes. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: ficha como contrato unico`.

### Tarefa 8: templates, validação e a troca do motor antigo

**Arquivos:**
- Criar: `motor/templates.py`.
- Modificar: `motor/gerar.py` (usar `ficha.processar`); `motor/demo.py` (passa a ler as chaves novas).
- Apagar: `motor/motor.py`.
- Teste: `tests/test_templates.py`.

**Interfaces:**
- Produz: `para_templates(fichas, template) -> (resultado_df, coberturas_df)` (mesma saída de hoje) e `validar_templates(resultado_df, coberturas_df, template, catalogo) -> list[str]` (lista de erros; vazia = ok).

**Validações:**
- uma linha por par do template, na mesma ordem;
- as colunas são exatamente as do template;
- `faixa_valor_min` e `faixa_valor_max` são inteiros, sem texto, com `min ≤ max`;
- nenhuma faixa vazia sem justificativa na `observacao`;
- as coberturas fixas do plano estão presentes;
- nenhuma assistência aparece como cobertura;
- `justificativa_recomendacao` não está vazia.

- [ ] **Passo 1: testes que falham**
```python
def test_templates_validos(saida_teste):
    assert validar_templates(*saida_teste) == []

def test_reprodutivel(tmp_path):
    gerar(tmp_path / "a"); gerar(tmp_path / "b")
    for n in ["template_resultado_times.csv", "template_coberturas_times.csv"]:
        assert (tmp_path/"a"/n).read_bytes() == (tmp_path/"b"/n).read_bytes()
```
- [ ] **Passo 2:** `pytest tests/test_templates.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar. `gerar.py` passa a aceitar `--saida <pasta>` e chama `validar_templates`, terminando com código 1 se houver erro.
- [ ] **Passo 4:** `pytest -v` (tudo) e depois `python motor/gerar.py`. Esperado: todos os testes passam e a saída imprime `erros_validacao: 0`.
- [ ] **Passo 5:** commit `feat: templates validados; remove motor.py`.

### Tarefa 9: métricas, coerência e casos contrastantes

**Arquivos:**
- Criar: `motor/metricas.py`.
- Teste: `tests/test_coerencia.py`.

**Interfaces:**
- Produz: `calcular_metricas(fichas, resultado_df, coberturas_df, segundos) -> dict` com:
  - as métricas do guia §8: processados %, com justificativa %, elegibilidade, planos, perguntas médias, % de confiança baixa, consistência entre plano e coberturas, tempo;
  - `sensibilidade_area`: variação média da faixa de incêndio com área +10%.
- Produz: `casos_contrastantes(fichas) -> dict[str, str]` com 3 `imovel_id`:
  - `one_click_limpo`: canal ONE_CLICK e confiança ALTA;
  - `inquilino_total`: vínculo INQUILINO e plano TOTAL;
  - `condicional_gerente`: elegibilidade CONDICIONAL.

**Testes de coerência:**
- área maior nunca reduz o incêndio (monotonicidade);
- dois casos iguais, exceto pela renda, têm a mesma ficha;
- trocar só o município muda o incêndio na proporção do CUB.

- [ ] **Passo 1:** escrever os 3 testes de coerência acima, mais `test_casos_contrastantes_existem`.
- [ ] **Passo 2:** `pytest tests/test_coerencia.py -v`. Esperado: FAIL.
- [ ] **Passo 3:** implementar. `gerar.py` grava `metricas.json` e `casos_contrastantes.json`.
- [ ] **Passo 4:** `pytest -v`. Esperado: PASS.
- [ ] **Passo 5:** commit `feat: metricas, coerencia e casos contrastantes`.

### Tarefa 10 (P2, opcional): API de demonstração e protótipo lendo o motor

**Arquivos:**
- Criar: `motor/api.py`.
- Modificar: `prototipos/indexprototipo_gerente.html` (carregar a ficha de `motor/saida/fichas.json` pelo `imovel_id`, mantendo o CASO_00005 escrito no código como reserva).

**Interfaces:**
- `GET /fichas/{imovel_id}` → a ficha (404 se não existir).
- `POST /recomendar` com o corpo `{imovel_id, confirmacoes: {bens: "menos"|"isso"|"mais", ...}}` → a ficha recalculada. A confirmação muda a natureza para `CONFIRMADO` e refaz bens e coberturas.

- [ ] **Passo 1:** teste com o `TestClient`: `GET /fichas/IMO_CASO_00005_01` → 200, `plano` presente; `GET /fichas/XXX` → 404.
- [ ] **Passo 2:** rodar o teste. Esperado: FAIL. Implementar. Rodar de novo. Esperado: PASS.
- [ ] **Passo 3:** no protótipo, `fetch('../motor/saida/fichas.json')`; se falhar, usar os dados escritos no código. Conferir os 3 casos contrastantes no navegador.
- [ ] **Passo 4:** commit `feat: api de demonstracao e prototipo lendo a ficha`.

---

## Parte B · Fora do motor (mas na entrega)

| Item | Responsável sugerido | Conteúdo |
|---|---|---|
| **README.md final** | Pessoa 4 | Equipe, desafio, objetivo, arquitetura (as 6 estações e a ficha), como rodar (`pip install -r requirements.txt`, `python motor/gerar.py`, `pytest`), premissas (`parametros.py`), limitações, métricas (`metricas.json`), resultados, **uso de IA** (Claude Code: pesquisa, rascunho e revisão; o time revisou e entende tudo) |
| **`motor/externos/FONTES.md`** | Pessoa 4 | Feito na Tarefa 1 |
| **Vídeo de 5 min** | Pessoa 5 | Problema (o app sugere R$ 3 mil de roubo para todos) → solução (a ficha) → demo (os 3 casos contrastantes, app e gerente) → métricas → limitações → próximos passos (desastres, Open Insurance, SES) |
| **Pitch** | Pessoa 5 | O mesmo roteiro, com 1 slide de "o que a pesquisa mostrou" |

## Divisão e prazo (entrega 29/10, 10h)

| Quando | Pessoa 1 | Pessoa 2 | Pessoa 3 | Pessoa 4 | Pessoa 5 |
|---|---|---|---|---|---|
| 28/10 manhã | Tarefas 0, 1 | Tarefa 2 | Tarefa 3 | Validar o CUB nos Sinduscons + FONTES.md | Roteiro do vídeo |
| 28/10 tarde | Tarefa 4 | Tarefa 5 | Tarefa 6 | Esqueleto do README | Telas para o vídeo |
| 28/10 noite | Tarefa 7 | Tarefa 8 | Tarefa 9 | README com as métricas | Gravação |
| 29/10 até 9h | Revisão geral, `pytest`, `gerar.py` final | Tarefa 10 (se houver tempo) | Conferir os templates à mão (10 casos) | README final | Ajuste do vídeo |

**Ordem obrigatória:** Tarefa 0 → 1 → (2, 3 em paralelo) → (4, 5, 6) → 7 → 8 → 9. Se o tempo apertar, as Tarefas 9 e 10 viram "próximos passos". **As Tarefas 7 e 8 nunca são cortadas**, porque são elas que geram a entrega.

## Decisões em aberto (levar à mentoria)

1. A organização aceita `elegivel = CONDICIONAL`, ou quer só SIM/NÃO?
2. Apartamento ou imóvel financiado: o template espera o incêndio pela reconstrução inteira ou aceita a lógica de segundo risco?
3. "Instalações e Pequenos Reparos" aparece no app, mas não no catálogo: fica fora?
4. Um inventário de bens vindo de transações valeria como "relação de bens anexada na proposta" (cl. 24.2.3)?
5. Uso misto com MEI ("residencial e comercial"): a base não tem sinal de atividade MEI. O motor não infere esse uso, e ele só aparece se o cliente informar.
