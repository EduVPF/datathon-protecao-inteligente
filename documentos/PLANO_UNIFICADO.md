# Plano Unificado: Motor + Planilhas (Seguro Residencial)

> **Este é o plano a seguir.** Ele junta o `prototipos/PLANO_PREENCHIMENTO_PLANILHAS.md` (do time) com o `documentos/PLANO_MOTOR.md`. Os dois continuam na pasta como referência. Para executar tarefa por tarefa, use a sub-skill `superpowers:executing-plans`; os passos usam caixas `- [ ]`.
>
> **Versão 2 (28/10/2026, madrugada):**
> - as 4 decisões estão fechadas (seção 10);
> - o FipeZAP oficial de set/2026 foi encontrado;
> - o CUB foi conferido em 4 sites oficiais (SP, GO, BA, DF);
> - **a parte de dados da T1 já está feita**: os CSVs estão em `motor/externos/` e os PDFs originais em `referencias/fontes/`.

**Objetivo:** gerar, com código, as 2 planilhas completas dos 138 casos da base Teste Comum, com faixas defensáveis por fontes oficiais, confiança honesta, no máximo 3 perguntas e motivo concreto. Depois, usar o mesmo resultado numa demonstração das jornadas do cliente e do gerente.

**Arquitetura:** o motor de regras em Python que já existe (`motor/`) é **ajustado no lugar** para ter a v1 completa rápido ("primeiro completo, depois bonito"). Cada cliente-imóvel vira uma **ficha JSON**, que alimenta os CSVs, a demo e uma API opcional. As fontes externas ficam **salvas no projeto** como CSVs pequenos; nada é buscado na internet quando o motor roda.

**Tecnologia:** Python 3.11, pandas 2.2.3, pytest 8.3.3. Opcional: FastAPI.

**Spec:** guia oficial (`documentos/Guia_Times_...docx`, §1, §5–9), `dados/desenvolvimento/LEIA-ME.md`, `documentos/PESQUISA_BENS_E_INDENIZACAO.md` e as Condições Gerais BB Seguro Residencial v1.4.

---

## 1. Validação do plano do time

Conferi cada afirmação nas fontes originais em 28/10/2026.

| Afirmação do plano do time | Resultado | Evidência |
|---|---|---|
| SINAPI ago/2026: SP 2.089,88 · RJ 2.174,65 · PR 2.161,78 · DF 2.051,00 · GO 2.009,13 · RS 1.962,32 · BA 1.873,15 · MG 1.864,57 · PE 1.789,90 | ✅ **Exato** | PDF oficial do IBGE (publicado em 11/09/2026), tabela "**considerando** a desoneração da folha" |
| Ceará "conferir" | ✅ Encontrado: **1.883,20** (com desoneração) / **1.974,41** (sem) | Mesmo PDF |
| ⚠️ Qual tabela usar | O PDF tem **duas** tabelas. O time usou a com desoneração (menor) | Para reconstruir uma casa, a tabela **sem desoneração** (encargos completos) representa melhor o custo real e evita subseguro. **Decisão: usar a sem desoneração** (seção 4) |
| IPCA de 12 meses até set/2026 = 4,58% | ✅ **Exato** (out/25–set/26, produto das variações mensais) | API do Banco Central, série 433, consultada ao vivo |
| FipeZAP set/2026: média de R$ 54,77/m² em 36 cidades | ✅ **Número correto; só o link estava errado** | O informe oficial da Fipe de set/2026 diz literalmente "o preço médio foi de R$ 54,77/m²" nas 36 cidades. O link citado (InfoMoney) é de dez/2024. **Link corrigido:** `downloads.fipe.org.br/indices/fipezap/fipezap-202609-residencial-locacao.pdf` |
| Incêndio da casa × 1,12 | ⚠️ **Sem justificativa** no plano | **Substituído:** a faixa de reconstrução vai do SINAPI (mínimo) ao CUB (máximo), duas referências públicas independentes (seção 4) |
| Danos por água = só os bens | ⚠️ **Incompleto** | A cobertura também paga danos **ao imóvel** (texto da cobertura no app atual). Somar uma parcela de acabamentos (seção 6) |
| Não usar dependentes na responsabilidade civil (RN-07) | ✅ **Adotado** | Leitura conservadora do guardrail "atributos pessoais"; o mesmo vale para o pet |
| Elegibilidade: sinal sem prova vira SIM com confirmação, não NÃO | ✅ **Adotado** | Evita um terceiro valor na coluna `elegivel` (antes era "CONDICIONAL") |
| Limites do produto pelas prints (incêndio mín. R$ 100 mil, etc.) | ✅ **Adotado** | Prints do app (`referencias/prints-app-bb`) |
| Raios (INPE) desatualizado; roubo a residência por UF não encontrado | ✅ Concordo | Mesma conclusão da minha pesquisa |
| Tipo do imóvel pelo complemento (AP/APTO/BLOCO/TORRE…) | ✅ **Adotado** como conferência dos termos | Aumenta a confiança quando os dois concordam |
| "Motor v1 completo em 3 horas, depois bonito" | ✅ **Adotado como estratégia** | Substitui a refatoração em módulos que eu tinha proposto primeiro (vira Fase 3) |

## 2. O melhor de cada plano

| Vem do plano do time | Vem do PLANO_MOTOR |
|---|---|
| SINAPI do IBGE (fonte oficial do governo) | CUB como teto da faixa de reconstrução |
| IPCA (API do Banco Central) para trazer as compras a preço de hoje | Regras das Condições Gerais: primeiro risco absoluto, **segundo risco** em apartamento ou imóvel financiado, bens não cobertos (joias, relógios), beneficiários distintos no imóvel alugado |
| FipeZAP para o aluguel de quem mora no próprio imóvel | Bens por **três âncoras** (comprovado → estoque → piso) |
| Limites do produto vistos nas prints | Confiança = **fonte × frescor** ("dados antigos valem menos") |
| SIM/NÃO na elegibilidade; dependentes e pet fora da decisão | **Ficha JSON** como contrato único (planilha, app, gerente, agente) |
| Tipo do imóvel conferido pelo complemento | Validação automática das planilhas e teste de reprodutibilidade |
| Justificativa com "por que não o mais barato e por que não o mais caro" | Casos extremos (Review Focus) |
| Prioridade: v1 completa primeiro; demo lendo o motor | Tarefas com testes e comandos para conferir |
| Divisão por blocos de colunas | — |

---

## Global Constraints

- Python 3.11; `requirements.txt` com `pandas==2.2.3` e `pytest==8.3.3`.
- **Renda, idade, dependentes e pet não decidem plano, faixa nem canal.** Eles não entram em `motivos` nem na ficha (minimização de dados).
- Nomes das coberturas exatamente como em `catalogo_coberturas_fixas_planos.csv`. Todas as fixas do plano aparecem na planilha de coberturas; assistências nunca aparecem.
- `elegivel` ∈ {`SIM`, `NAO`}. `NAO` só com prova (situação cadastral não regular ou material combustível cadastrado). Sinal fraco (obra, seguro existente) vira **SIM** + pergunta + menção na justificativa.
- Faixas como números inteiros (arredondados para 500 abaixo de 20 mil e para 1.000 acima), `min ≤ max`, sempre preenchidas, inclusive com confiança baixa.
- Toda fonte externa registrada em `motor/externos/FONTES.md` e na coluna `fontes_publicas_adicionais`: nome, órgão, link, data de acesso, nível geográfico, uso e limitação. Sem a fonte, o motor usa um valor neutro e baixa a confiança.
- No máximo 3 perguntas por caso, de preferência sim/não.

## Review Focus

1. **Área e IPTU zerados:** a área vem da mediana do tipo de imóvel no município, com confiança BAIXA. Nunca 0. *Teste T2.*
2. **Sem compras e sem bens:** a faixa de bens usa o piso (`BENS_PISO = 15000`), com confiança BAIXA. *Teste T2.*
3. **Valores extremos** (percentil 99,9 de compras, obra ou aluguel): as faixas respeitam os limites do produto e não se invertem. *Teste T5.*
4. **Cliente com 2 imóveis:** os bens de um imóvel não entram no outro. *Teste T5.*
5. **Mudar renda, idade, dependentes ou pet não muda nada** (teste de justiça). *Teste T5.*

---

## 3. Planilha 1 (resultado): regra por coluna

| Coluna | Regra |
|---|---|
| `elegivel` / `motivo_inelegibilidade` | SIM/NÃO conforme as Global Constraints; o motivo só quando for NÃO |
| `tipo_imovel_sugerido` | `possui_termo_*` conferido com o complemento (AP/APTO/BLOCO/TORRE → apartamento; CASA/LOTE/QUADRA → casa; casa + condomínio → casa em condomínio). Se concordam, confiança ALTA; se divergem, MÉDIA + pergunta |
| `uso_imovel_sugerido` | Endereço principal = moradia (ALTA). Diferente + crédito de aluguel = locado a terceiros (MÉDIA). Diferente + o cliente mora em outro imóvel = veraneio (BAIXA). Diferente e único imóvel = moradia, com pergunta |
| `tipo_vinculo_sugerido` | Paga aluguel = inquilino · parcela = financiado · recebe aluguel e não mora = proprietário que aluga · nenhum sinal = proprietário (confirmar) |
| `plano_recomendado` | Seção 5 |
| `coberturas_recomendadas` | Fixas do plano + adicionais aplicáveis, separadas por "; " |
| `confianca_geral` | Média ponderada de fonte × frescor (seção 7); nunca ALTA se houver pergunta de elegibilidade |
| `justificativa_recomendacao` | 1 a 3 frases com dado concreto + "por que não o mais barato" + "por que não o mais caro" + a fonte externa, quando usada |
| `perguntas_confirmacao` | Até 3, ordenadas pelo impacto (seção 7) |
| `fontes_publicas_adicionais` | As fontes realmente usadas naquele caso |

## 4. Fontes externas (valores para gravar)

| ID | Fonte | Uso | Arquivo | Status |
|---|---|---|---|---|
| F1 | **SINAPI ago/2026, IBGE**, tabela **sem desoneração**, R$/m² por UF | **Mínimo** da reconstrução | `externos/sinapi_uf.csv` | ✅ Conferido no PDF |
| F1b | **CUB R8-N, Sinduscons** | **Máximo** da reconstrução | `externos/cub_uf.csv` | ✅ 4 oficiais (SP, GO, BA, DF) · ⚠️ 6 por agregador (RJ, MG, PR, RS, PE, CE), marcados `validar` |
| F2 | **IPCA, série 433 do SGS / Banco Central** | Trazer as compras de 36 meses a preço de hoje | `externos/ipca_mensal.csv` + `externos/coletar.py` | ✅ CSV gravado (out/25–set/26): fator **1,0694** |
| F3 | **Limites do produto** (prints do app) e **Condições Gerais v1.4** | Pisos e tetos das faixas; regras de segundo risco e exclusões | `parametros.py` (com cláusula ou print de origem) | ✅ |
| F5 | **FipeZAP Locação, informe oficial de set/2026 (Fipe)**, R$/m² e rentabilidade por capital | Perda de aluguel de quem mora no próprio imóvel | `externos/fipezap_aluguel.csv` | ✅ CSV gravado, as 10 capitais |
| F4 | Atlas Digital de Desastres (MIDR) | Reforço de água e vendaval + motivo | `externos/desastres_municipio.csv` | Fase 3 (opcional) |
| — | API IBGE de localidades | Conferir uma vez os 10 códigos de município | só no `coletar.py` | Opcional |

**Valores de reconstrução (R$/m², agosto/2026):**

| UF | SINAPI sem desoneração (mín.) | SINAPI com desoneração (ref. do time) | CUB R8-N (máx.) |
|---|---|---|---|
| SP | 2209.93 | 2089.88 | 2238.58 (set, **oficial**) |
| RJ | 2300.67 | 2174.65 | 2476.31 (set, validar) |
| MG | 1963.18 | 1864.57 | 2548.75 (jul, validar) |
| PR | 2287.42 | 2161.78 | 2738.93 (set, validar) |
| RS | 2062.87 | 1962.32 | 2943.73 (set, validar) |
| DF | 2151.68 | 2051.00 | 2423.72 (ago, **oficial**) |
| GO | 2112.97 | 2009.13 | 2243.09 (set, **oficial**) |
| BA | 1969.60 | 1873.15 | 2243.22 (set, **oficial**) |
| PE | 1881.36 | 1789.90 | 2240.23 (set, validar) |
| CE | 1974.41 | 1883.20 | 2510.74 (set, validar) |

**FipeZAP set/2026, oficial (aluguel em R$/m² · rentabilidade ao ano):**

| Capital | Aluguel (R$/m²) | Rentabilidade a.a. |
|---|---|---|
| São Paulo | 65,78 | 6,43% |
| Rio de Janeiro | 61,86 | 6,30% |
| Belo Horizonte | 50,78 | 5,40% |
| Curitiba | 49,44 | 4,92% |
| Porto Alegre | 46,78 | 7,36% |
| Brasília | 53,84 | 6,20% |
| Goiânia | 43,86 | 6,03% |
| Salvador | 55,40 | 7,03% |
| Recife | 64,39 | 8,30% |
| Fortaleza | 42,22 | 4,92% |

**IPCA:** fator para trazer as compras a preço de hoje = `(1 + ipca_12m) ** 1.5`, usando o meio da janela de 36 meses (18 meses). Com 4,58%, o fator dá **1,0694**. *Limitação: eletrônicos costumam baratear, então o fator é conservador.*

## 5. Escolha do plano (pontos por sinal, sem atributos pessoais)

| Sinal (observado no imóvel ou nas transações) | Pontos |
|---|---|
| Apartamento ou casa em condomínio (dano ao vizinho) | Total +1 |
| Inquilino (precisa pagar moradia se o imóvel ficar inabitável) | Total +2 |
| Recebe aluguel do imóvel (perde a renda num sinistro) | Total +2 |
| Bens portáteis (eletrônicos) com máximo ≥ R$ 8.000 | Prático +1 |
| Bens totais ≥ R$ 25.000 | Prático +2 |
| Casa fora de condomínio (exposição a arrombamento) | Prático +1 |
| Gasto com vidraçaria em 24 meses | Prático +1 |
| Veraneio (imóvel vazio parte do tempo) | Prático +1 *(e aviso: roubo não cobre residência desocupada)* |

**Decisão:** Total se `total ≥ 2`; senão, Prático se `pratico ≥ 2` ou `total ≥ 1`; senão Essencial. A justificativa cita os 2 sinais de maior peso, por que não o plano abaixo e por que não o plano acima.

## 6. Planilha 2 (coberturas): faixa por cobertura

As bases de cálculo vêm de três lugares:
- **Reconstrução** = área (mín/máx) × [SINAPI sem desoneração, CUB] da UF × fator do padrão (ECONÔMICO 0,85 · NORMAL 1,0 · SUPERIOR 1,30 · não disponível 1,0).
- **Bens** (três âncoras × IPCA):
  - mínimo = maior valor entre as compras de 36 meses e os bens ponderados, × fator IPCA;
  - máximo = 2,7 × compras de 36 meses × fator IPCA;
  - piso de R$ 15 mil;
  - **portáteis** = eletrônicos; **elétricos** = eletrônicos + eletrodomésticos; **molháveis** = móveis + eletrodomésticos + eletrônicos.
- **Segundo risco** = apartamento, casa em condomínio ou imóvel financiado (Condições Gerais, cl. 15.2).

| Cobertura | Faixa (mín – máx) | Limites do produto |
|---|---|---|
| `INCENDIO_RAIO_EXPLOSAO_FUMACA` | Sem segundo risco: reconstrução + bens. **Com segundo risco: 25%–40% da reconstrução (acabamentos) + bens**; observação "cl. 15.2" | mín. 100.000 · máx. 600.000 |
| `DANOS_POR_AGUA` | 50%–100% dos molháveis + 3%–8% da reconstrução (acabamentos e pisos) | mín. 3.000 · máx. 50.000 |
| `VENDAVAL_GRANIZO` | Casa: 10%–20% da reconstrução (telhado). Apartamento: 2%–5% | mín. 1.000 · máx. 60.000 |
| `IMPACTO_VEICULOS_TERRESTRES` | Padrão do produto: 10.000 – 10.000 (casa: 10.000 – 20.000) | mín. 1.000 |
| `QUEDA_AERONAVE` | Padrão do produto: 10.000 – 10.000 | mín. 1.000 |
| `DANOS_ELETRICOS` | Elétricos (mín – máx) | mín. 5.000 · máx. 30.000 |
| `ROUBO_FURTO_ARROMBAMENTO` | Portáteis (mín – máx); observação sobre joias, relógios, drones e residência desocupada | mín. 1.000 · máx. 45.000 |
| `QUEBRA_DE_VIDROS` | Apartamento 2.000–5.000; casa 3.000–8.000; máximo ampliado para 1,2 × o gasto com vidraçaria em 24 meses | mín. 1.000 · máx. 25.000 |
| `RESPONSABILIDADE_CIVIL_FAMILIAR` | Apartamento ou condomínio: reparo de uma unidade vizinha = 70 m² × SINAPI × [0,30–0,60]. Casa: 30.000 – 60.000 | mín. 10.000 · máx. 200.000 |
| `PERDA_PAGAMENTO_ALUGUEL` | Inquilino: aluguel pago × 6–12. Proprietário que aluga: aluguel recebido × 6–12. Proprietário que mora: FipeZAP R$/m² × área × 6–12 | mín. 5.000 · máx. 30.000 |
| `DESPESAS_EMERGENCIAIS` | 2%–5% do incêndio | mín. 2.000 · máx. 15.000 |

Em toda linha: `dados_utilizados`, `regra_calculo_utilizada` (a fórmula acima), `justificativa`, `informacao_a_confirmar` e `observacao` (cláusula, ou "imóvel alugado: beneficiários distintos").

**Exemplo, CASO_00005** (apartamento financiado em Curitiba, 110 m²):
- reconstrução = 110 × [2.287 – 2.739] ≈ R$ 252 mil – R$ 301 mil;
- segundo risco: 25%–40% → R$ 63 mil – R$ 120 mil;
- bens ≈ R$ 22 mil – R$ 60 mil;
- **incêndio ≈ R$ 100 mil (piso do produto) – R$ 180 mil**, em vez dos R$ 260 mil do protótipo.

## 7. Confiança e perguntas

- **Peso de um dado** = peso da fonte × frescor.
  - Fonte: confirmado 1,0 · documento (laudo, IPTU) 0,9 · transação 0,8 · inferido 0,6 · presumido 0,5.
  - Frescor: `0,5 ** (idade_meses / meia_vida)`, com meia-vida de vínculo 12, área 120, bens 36 e uso 12 meses. A idade é o meio da janela do sinal: 3 para média de 6 meses, 18 para 36 meses.
- **Confiança geral:** ALTA ≥ 0,80 · MÉDIA ≥ 0,55 · BAIXA abaixo disso. Se houver pergunta de elegibilidade, no máximo MÉDIA.
- **Perguntas** (as 3 de maior prioridade):

| Prioridade | Pergunta |
|---|---|
| 100 | Obra ou reforma, se o gasto com material de construção ≥ R$ 15 mil |
| 95 | Já tem seguro BB neste endereço? |
| 70 | Uso do imóvel, quando a confiança for BAIXA |
| 60 | Recebe aluguel deste imóvel? |
| 55 | Os bens ficam entre R$ X e R$ Y? |
| 50 | A área é de cerca de X m²? |
| 40 | Apartamento ou casa? Só quando o complemento e os termos divergem |
| 30 | O imóvel é quitado? |

---

## 8. Tarefas

### Fase 1: v1 completa (meta de 3 horas)

#### T1 · Fontes externas e parâmetros
**Arquivos:**
- ✅ **Já feito:** `motor/externos/{sinapi_uf.csv, cub_uf.csv, ipca_mensal.csv, fipezap_aluguel.csv, FONTES.md}`, mais os PDFs em `referencias/fontes/`.
- Criar: `motor/externos/coletar.py`, `requirements.txt`, `.python-version`, `tests/test_motor.py`.
- Modificar: `motor/parametros.py`.

**Interfaces:**
- Produz: `parametros.custo_m2(uf) -> tuple[float, float]` (SINAPI, CUB) e `parametros.aluguel_m2(municipio) -> float | None`.
- Produz: `parametros.FATOR_IPCA: float` (lido de `ipca_mensal.csv`).
- Produz: `parametros.LIMITES_PRODUTO: dict[str, tuple[int, int]]` (seção 6).
- Remove: `RENDA_MIN_TOTAL` e `RENDA_MAX_SO_ESSENCIAL`.
- `coletar.py` baixa o IPCA da API `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json` e grava o CSV. **Só é usado para atualizar o arquivo; o motor lê o CSV.**

- [ ] **Teste:** `test_custo_m2_pr`: `custo_m2("PR") == (2287.42, 2738.93)`. `test_fator_ipca`: `1.06 < FATOR_IPCA < 1.08`. `test_sem_parametro_de_renda`: nenhum nome em `parametros` contém "RENDA".
- [ ] `pytest tests/test_motor.py -k "custo or ipca or renda" -v`. Esperado: FAIL. Implementar. Rodar de novo. Esperado: PASS.

#### T2 · Imóvel e bens
**Modificar:** `motor/motor.py`:
- `inferir_tipo`: conferir com o complemento.
- `inferir_area`: reserva pela mediana do município e tipo; `calibrar` grava `area_mediana`.
- `inferir_conteudo` → `estimar_bens`: três âncoras × IPCA; devolve `portateis`, `eletricos`, `molhaveis`.

- [ ] **Testes:**
  - `test_bens_caso_00005`: `round(min) == round(20750 * FATOR_IPCA)`.
  - `test_bens_piso`: sem compras nem bens → `min == 15000` e confiança `BAIXA`.
  - `test_area_sem_iptu`: área estimada entre 30 e 400, confiança `BAIXA`.
  - `test_tipo_complemento_diverge`: termo apto + complemento "CASA FUNDOS" → confiança `MEDIA`.
- [ ] Rodar: FAIL. Implementar. Rodar: PASS.

#### T3 · Elegibilidade, plano e coberturas
**Modificar:** `motor/motor.py`:
- `avaliar_elegibilidade` → `(elegivel: "SIM"|"NAO", pendencias, avisos)`.
- `escolher_plano` com a tabela da seção 5, sem renda, dependentes ou pet.
- `dimensionar` com a seção 6.
- `valor_imovel` → `{reconstrucao: (min, max), segundo_risco: bool}`.
- `justificativa` com "por que não o mais barato / mais caro".

- [ ] **Testes:**
  - `test_obra_vira_sim_com_pergunta`: obra de R$ 40 mil → `elegivel == "SIM"` e a primeira pergunta tem prioridade 100.
  - `test_incendio_caso_00005_segundo_risco`: `100000 <= min` e `max <= 200000`, com "15.2" na observação.
  - `test_casa_soma_reconstrucao`: casa de 100 m² em SP → `min >= 100 * 2209.93`.
  - `test_rc_sem_dependentes`: a faixa de RC é a mesma com 0 ou 3 dependentes.
- [ ] Rodar: FAIL. Implementar. Rodar: PASS.

#### T4 · Validação e geração das planilhas v1
**Criar:** `motor/templates.py` com `validar_templates(resultado, coberturas, template, catalogo) -> list[str]`.
**Modificar:** `gerar.py`, que valida, aceita `--saida` e termina com código 1 se houver erro.

- [ ] **Testes:**
  - `test_templates_validos`: a lista de erros sai vazia.
  - `test_138_linhas`: o resultado tem 138 linhas, na ordem do template.
  - `test_fixas_presentes`: as coberturas fixas do plano estão na planilha de coberturas.
- [ ] `python motor/gerar.py`. Esperado: `erros_validacao: 0` e 138 casos.
- [ ] **Marco da Fase 1:** copiar as 2 planilhas para `entrega/` (v1 de segurança).

### Fase 2: confiança, provas e demo (hoje à noite)

#### T5 · Confiança, perguntas e testes de justiça e coerência
**Modificar:** `confianca_geral` e `montar_perguntas` (seção 7). Cada `dado` passa a gravar `fonte_tipo` e `idade_meses`.

- [ ] **Testes:**
  - `test_dado_antigo_pesa_menos`.
  - `test_max_3_perguntas`.
  - `test_justica`: mudar renda, idade, dependentes e pet não muda a ficha (comparação do JSON, sem os campos de perfil).
  - `test_monotonia_area`: área +10% → incêndio maior ou igual.
  - `test_extremos_sem_inversao`.
  - `test_dois_imoveis_isolados`.
  - `test_reprodutivel`: duas rodadas geram CSVs idênticos, byte a byte.
- [ ] Rodar: FAIL. Implementar. Rodar `pytest -v`: PASS.

#### T6 · Métricas e casos contrastantes
**Criar:** `motor/metricas.py` com:
- `calcular_metricas(...)`: processados, % com justificativa, completude das fixas, média de perguntas, % de confiança baixa, sensibilidade (área +10%), resultado do teste de justiça e tempo;
- `casos_contrastantes(fichas)`: `one_click_limpo`, `inquilino_total`, `elegibilidade_a_confirmar`.

- [ ] **Teste:** `test_casos_contrastantes_existem`. Gravar `metricas.json` e `casos_contrastantes.json`.

#### T7 · Demo lendo o motor
**Modificar:** `prototipos/indexprototipo_gerente.html`. Carregar a ficha do caso escolhido em `motor/saida/fichas.json`, com seletor dos 3 casos contrastantes. Se o arquivo não carregar, usar o CASO_00005 escrito no código.

- [ ] Abrir no navegador, passar pelos 3 casos e conferir que o plano, as faixas e o motivo batem com a planilha. Console sem erros.

### Fase 3: se sobrar tempo

- **T8:** separar `motor.py` em módulos (`imovel`, `bens`, `plano`, `coberturas`, `confianca`, `ficha`), seguindo a estrutura do PLANO_MOTOR.
- **T9:** API FastAPI (`GET /fichas/{id}`, `POST /recomendar` com as confirmações).
- **T10:** F4, desastres por município no Atlas Digital, como reforço de água, vendaval e motivo.

---

## 9. Divisão e horário (entrega 29/10, 10h)

| Bloco | Pessoa 1 | Pessoa 2 | Pessoa 3 | Pessoa 4 | Pessoa 5 |
|---|---|---|---|---|---|
| **Fase 1** (agora + 3h) | T1 (parâmetros lendo os CSVs, limites, tirar renda) | T2 (tipo, área, bens) | T3 (elegibilidade, plano, coberturas) | Validar os 6 CUB marcados `validar` (RJ, MG, PR, RS, PE, CE) no site de cada Sinduscon | T4 (validação) + roteiro do vídeo |
| **Fase 2** (noite) | T5 (confiança e testes) | T6 (métricas e casos) | Revisar 10 casos à mão contra as regras | T7 (demo lendo o motor) | README (fontes, métricas, uso de IA) |
| **Madrugada** | Correções da revisão | — | — | Gravação do vídeo | README final |
| **29/10 até 9h** | `pytest` + `gerar.py` final | Conferir as planilhas | — | Ajuste do vídeo | Entrega |

**Regra de corte:** se o tempo apertar, a ordem de corte é Fase 3 → T7 (a demo usa o protótipo atual) → T6. **T1 a T5 não se cortam.**

## 10. Decisões tomadas

| # | Decisão | Resultado | Por quê |
|---|---|---|---|
| 1 | Tabela do SINAPI | ✅ **Sem desoneração** como mínimo; CUB como máximo | Reflete o custo real de reconstruir (encargos completos) e evita subseguro |
| 2 | FipeZAP | ✅ **Informe oficial de set/2026**, 10 capitais | Achado no site da Fipe; o número do plano original estava certo, só o link estava errado |
| 3 | Dependentes e pet | ✅ **Fora de todas as decisões** | Leitura conservadora do guardrail sobre atributos pessoais (RN-07); há um teste de justiça para garantir |
| 4 | Segundo risco em apartamento ou imóvel financiado | ✅ **Mantido no motor** · ⏳ levar à mentoria | Está nas Condições Gerais (cl. 15.2). Se a mentoria recusar, basta trocar `FRACAO_ACABAMENTOS` para (1,0, 1,0) em `parametros.py` |

**Ainda em aberto (não bloqueia a Fase 1):**
- validar 6 valores de CUB;
- confirmar na mentoria se um inventário vindo de transações vale como "relação de bens" (cl. 24.2.3).

## Fontes citadas

- [SINAPI ago/2026, IBGE (PDF)](https://ftp.ibge.gov.br/Precos_Custos_e_Indices_da_Construcao_Civil/Fasciculo_Indicadores_IBGE/sinapi_202608caderno.pdf) · [página do SINAPI](https://www.ibge.gov.br/estatisticas/economicas/precos-e-custos/9270-indice-nacional-da-construcao-civil.html)
- [IPCA, série 433 do SGS, API do Banco Central](https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json)
- [CUB Sinduscon-SP](https://sindusconsp.com.br/servicos/cub/) · [CUB Sinduscon-DF](https://sinduscondf.org.br/indicadores-cub/) · [tabela agregada (Paggo)](https://www.paggo.com.br/blog/cub-o-que-e-tabela-por-estado)
- [Condições Gerais BB Seguro Residencial v1.4](https://assets-bbseguros.cld.brasilseg.com.br/2025-07/CG_SEGURO_RESIDENCIAL_V-14.pdf)
- [Índice FipeZAP de Locação Residencial, informe de set/2026 (Fipe)](https://downloads.fipe.org.br/indices/fipezap/fipezap-202609-residencial-locacao.pdf)
- [CUB Sinduscon-GO set/2026 (PDF)](https://www.sinduscongoias.com.br/arquivos/download/cub/cub-setembro-2026.pdf) · [CUB Sinduscon-BA](https://sinduscon-ba.com.br/cub/)
- [Atlas Digital de Desastres](https://atlasdigital.mdr.gov.br) · [SES/SUSEP](https://www2.susep.gov.br/menuestatistica/SES/principal.aspx)
