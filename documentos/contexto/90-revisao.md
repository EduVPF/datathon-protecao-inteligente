# 90 · Revisão do time (29/10, antes da entrega das 10h)

**Em uma frase:** o motor e as planilhas estão prontos e testados. Esta revisão é para o time **entender, conferir e decidir** os pontos abertos, e depois fechar o README final, o vídeo e o pitch.

## 1. O que está pronto
| Entrega | Onde | Status |
|---|---|---|
| **Planilha de resultado** (138 casos) | `entrega/template_resultado_times.csv` | ✅ validada |
| **Planilha de coberturas** (1.156 linhas) | `entrega/template_coberturas_times.csv` | ✅ validada |
| **Métricas** e **casos contrastantes** | `entrega/metricas.json`, `entrega/casos_contrastantes.json` | ✅ |
| **Motor** + 35 testes + automação no GitHub | `motor/`, `tests/`, `.github/workflows/` | ✅ |
| **Demo** das duas jornadas com dados reais | `prototipos/indexprototipo_gerente.html` | ✅ |
| **API** para agentes | `motor/api.py` | ✅ (opcional) |
| **Fontes externas** documentadas | `motor/externos/FONTES.md` + `referencias/fontes/` | ✅ (6 CUB a validar) |
| **README final da entrega** | `README.md` | ⏳ falta escrever (equipe, uso de IA) |
| **Vídeo de 5 min** | — | ⏳ falta gravar |

**Os números principais** (de `entrega/metricas.json`):
- **Cobertura da entrega:** 138 casos · 100% com justificativa · 100% das coberturas fixas.
- **Faixas:** 0 vazias, 0 invertidas.
- **Planos:** Prático 69 · Total 38 · Essencial 31.
- **Canal:** 1 toque 78 · gerente 60.
- **Perguntas:** 2,4 por caso.
- **Teste de justiça:** **0 casos mudam** ao trocar renda, idade, dependentes e pet.
- **Sensibilidade:** área +10% → incêndio +4,8%, sem nenhuma queda.

## 2. Como cada um revisa (≈ 30 min)
| Pessoa | Revisa | Como |
|---|---|---|
| 1 | O motor roda do zero | `pip install -r requirements.txt` → `python -m pytest -q` (35 passando) → `python motor/gerar.py --entrega` (`erros_validacao: 0`) |
| 2 | **10 casos à mão** na planilha | Abrir `entrega/template_resultado_times.csv` e ler justificativa e perguntas de 10 linhas: fazem sentido? |
| 3 | As **premissas** (seção 3) | Ler `motor/parametros.py` e `dimensionar()` em `motor/motor.py`; marcar o que o time não aceita |
| 4 | A **demo** | Abrir o protótipo com gerente e passar pelos 3 casos (roteiro em [15-t7-demo.md](15-t7-demo.md)) |
| 5 | **Fontes e README** | Validar os 6 CUB (issue #11) e começar o README final com as seções do guia |

## 3. Premissas que o time precisa aceitar (ou mudar)
Todas estão num lugar só. Mudar um número e rodar `python motor/gerar.py --entrega` atualiza tudo.

| Premissa | Valor | Onde |
|---|---|---|
| Estoque de bens = 2,7 × compras de 36 meses | 2,7 | `parametros.FATOR_ESTOQUE` |
| Bens e eletrônicos "relevantes" (mediana da base de desenvolvimento) | R$ 36 mil · R$ 10 mil | `parametros.BENS_RELEVANTES`, `PORTATEIS_RELEVANTES` |
| Segundo risco: acabamentos em apto, condomínio ou financiado | 25%–40% da reconstrução | `parametros.FRACAO_ACABAMENTOS` (para desligar: `(1.0, 1.0)`) |
| Danos por água · vendaval · responsabilidade civil · despesas | proporções da reconstrução e dos bens | `motor.dimensionar()` |
| Limiares de confiança | ALTA ≥ 0,75 · MÉDIA ≥ 0,55 | `parametros.CONF_ALTA`, `CONF_MEDIA` |
| Limites máximos das coberturas sem print do app | ex.: perda de aluguel até R$ 30 mil | `parametros.LIMITES_PRODUTO` |

## 4. Pendências
1. **Validar 6 valores de CUB** (RJ, MG, PR, RS, PE, CE) no site de cada Sinduscon → `motor/externos/cub_uf.csv` (issue #11).
2. **README final:** nome da equipe, integrantes, instituição e **uso de IA**. Sugestão: "usamos o Claude Code para pesquisa, rascunho de código, testes e documentação; o time revisou e entende cada regra".
3. **Levar à mentoria:**
   - o segundo risco (incêndio menor em apartamento ou imóvel financiado) é aceito?
   - um inventário vindo de transações vale como "relação de bens" (cl. 24.2.3)?
4. **Vídeo e pitch** (roteiro abaixo).
5. **Opcional:** os protótipos v2 e v3 e as especificações antigas podem ser arquivados.

## 5. Roteiro sugerido do vídeo (5 min)
| Tempo | Bloco | O que mostrar | Documento |
|---|---|---|---|
| 0:00–0:40 | Problema | "O app sugere R$ 3 mil de roubo para todo mundo; 78% têm mais" | [01](01-problema-e-ideia.md) |
| 0:40–1:20 | Solução | A ficha única → planilha, app e gerente | [01](01-problema-e-ideia.md), slides |
| 1:20–2:00 | Dados e fontes | SINAPI, CUB, IPCA, FipeZAP, Condições Gerais | [02](02-pesquisa-e-fontes.md) |
| 2:00–3:30 | Demo | Caso 1 toque → caso "a confirmar" indo para o gerente | [15](15-t7-demo.md) |
| 3:30–4:20 | Evidências | Teste de justiça = 0, 100% de completude, reprodutível | [14](14-t5-t6-provas.md) |
| 4:20–5:00 | Limites e próximos passos | Premissas, Atlas de Desastres, Open Insurance, agente pela API | [16](16-t9-api.md) |

## 6. Histórico no GitHub
- **Repositório:** https://github.com/pedroiaan/datathon-protecao-inteligente
- **Tag `v1-planilhas`:** a primeira versão completa (fim da Fase 1).
- **Issues:** de #1 a #9, fechadas ou comentadas; **#11 (CUB) aberta**.
