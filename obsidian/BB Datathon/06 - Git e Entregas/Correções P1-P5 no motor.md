# Correções P1-P5 no motor

28/10/2026 · base: commit `4c87b7f` do repositório do Pedro. Ligado a [[Revisão QA - repositório do Pedro]] e [[Regras e contexto]].

Arquivos: `C:\Users\maxom\Documents\Claude BB Datathon\prototipo\correcoes_motor\` (patch, arquivos alterados, validador e `COMO_APLICAR.md`).

## Decisões
| Ponto | Decisão | Por quê |
|---|---|---|
| P1 seguro existente | 1 imóvel → NAO; 2 imóveis → SIM + "qual já tem seguro?" | Guia 9.1 proíbe duas propostas no mesmo endereço |
| P2 perfis | perfil A apto urbano, B casa familiar, C casa de lazer + não elegível | Slide 14 e slide 23 ("3 perfis contrastantes") |
| P3 crianças e pets | Crianças E pet = +1 Total; só um = pergunta; nunca muda valor | Slide 14 pede RC familiar; RN-07 proíbe usar como risco. Com +1 para qualquer um, o Total iria a 65% |
| P4 confiança | área estimada = DERIVADO (0,7); campo vazio desconta (área 15%, padrão 1%, material 1%) | BCBS 239: precisão, completude, atualidade. Simulação: ALTA 15, MÉDIA 107, BAIXA 16 |
| P5 CUB | só oficial (SP, DF, GO, BA); demais = SINAPI × mediana CUB/SINAPI (≈1,09) | Guia pede fonte pública ou autorizada |
| Slide 23 | "Recomendamos o plano X porque... Se você escolher menos: ..., essas necessidades ficarão descobertas" | Palavras da banca |

## Pendente
- O time rodar `python -m pytest -q` (42 testes) e `python motor/gerar.py --entrega`, depois o `qa_validar.py`. Os números acima são de simulação, não da execução.
- Ideias para depois: território/Atlas de Desastres no perfil C; buscar CUB oficial das 6 UFs.

## Atualização (28/10, noite)
- Clone do repositório do Pedro em `C:\Users\maxom\Documents\datathon-protecao-inteligente`, branch `revisao-qa-p1-p5`, 3 commits do Matheus, **sem push**. Ambiente: `.venv` com Python 3.11.
- Rodou de verdade: 45 testes passando; planos Prático 60 · Total 49 · Essencial 29; NAO 24; justiça 0.
- **Confiança mudou de novo:** o corte na nota deixava 101 de 138 casos a 3 pontos de mudar de nível. Agora o nível sai de regra sobre a classe de cada dado crítico (observado, estimado, presumido). Resultado ALTA 17 · MÉDIA 101 · BAIXA 20. Estabilidade (pesos ±20%): 0 casos mudam. Ordenação da faixa de incêndio: ALTA 1,62 · MÉDIA 1,99 · BAIXA 2,07.
- Texto do PR pronto em `prototipo/correcoes_motor/PR_DESCRICAO.md`. Fluxo: Matheus aprova → fork → push da branch → PR para o Pedro.

## Melhorias (28/10, depois)
- Padrão construtivo vazio → fator 0,85 a 1,30 + pergunta do acabamento. Incêndio (mediana) 116 mil a 334,5 mil.
- Perguntas de valor ordenadas pelo valor da informação (R$ da faixa que a resposta elimina). 2,78 perguntas por caso.
- Justiça por quinto de renda em `metricas.json`; regra dos 80% aplicada à elegibilidade = 0,91. Prático cresce com renda porque os bens crescem; Total não segue a renda.
- 47 testes passando. Branch com 5 commits do Matheus, sem push. Detalhes no `documentos/contexto/17-revisao-qa.md` do repo.

## Auditoria contra o guia (28/10, madrugada)
- Veraneio não soma mais ponto de Prático (roubo não cobre residência desocupada). Perfil C (IMO_CASO_00010_01, apto de veraneio) → Essencial + RC.
- RC familiar como **cobertura adicional** (guia 9.2) para crianças ou pets em prédio/condomínio: 41 casos.
- Métricas novas: estabilidade do plano ±5% (1 caso), falhas (0), elegibilidade por regra.
- README final reescrito com as 11 seções do guia §6 (falta: nome da equipe e integrantes). FONTES.md com licença.
- 49 testes. Branch com 7 commits do Matheus, sem push.
- Guia de estudo do time: `prototipo/GUIA_DA_EQUIPE_DADOS_E_PITCH.md` (dados, perguntas da banca, roteiro do vídeo).
