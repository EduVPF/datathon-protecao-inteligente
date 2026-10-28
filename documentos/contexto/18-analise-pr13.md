# 18 · PR #13 aceito, ajustes aplicados e o vault do Obsidian

**Em uma frase:** o PR do Matheus (revisão QA + vault do Obsidian) foi aceito. Ele alinha o motor aos slides da Brasilseg, e por cima aplicamos 4 ajustes: seguro BB só com evidência, dados antigos valendo menos, "dependentes" no lugar de "crianças" e a narrativa do pitch.

**Onde estamos:** depois da Fase 2 · PR [#13](https://github.com/pedroiaan/datathon-protecao-inteligente/pull/13), mesclado · referência: `Conteudo_Brasilseg_Datathon_BBDW.pdf` (24 slides da Brasilseg)

## 1. O que o material da Brasilseg pede (e o PR atende)
| Slide | O que diz | No projeto agora |
|---|---|---|
| 8 | "O plano ideal não é automaticamente o mais completo" | Essencial ou Prático + RC adicional, em vez de empurrar o Total |
| 13 | O motor personaliza **plano, valores, opcionais e motivo** | **41 coberturas adicionais** (RC familiar); antes eram 0 |
| 14 | Três perfis: apartamento urbano, casa familiar (pets, crianças, RC), casa de lazer | Casos contrastantes A, B e C seguem esses perfis, mais 1 não elegível |
| 15 | Perfil, necessidade, plano, quanto, por quê | ✅ |
| 23 | MVP: "plano + valores + **adicionais** + motivos"; **3 perfis contrastantes**; "**Se você escolher menos, estas necessidades ficarão descobertas**" | ✅ a frase entra na justificativa |
| 3–6 | Gap de proteção no Brasil > 90%; só 17% dos lares com seguro | Para o pitch |

## 2. O que o PR trouxe (aceito)
- **Perfis do slide 14** como casos contrastantes e botões na demo.
- **Coberturas adicionais:** RC familiar em prédio ou condomínio com dependentes ou pet, sem levar ao Total inteiro.
- **Frase do slide 23** na justificativa, mais o **motivo da confiança**.
- **Perguntas pelo valor da informação:** primeiro a que mais aperta a faixa (`reduz_faixa_ate`).
- **CUB só oficial:** nas UFs sem CUB oficial, o máximo vira SINAPI × razão oficial (≈ 1,09).
- **Veraneio não puxa o Prático**, porque roubo não cobre residência desocupada.
- **Confiança por regra** (observado, estimado ou presumido): estável (0 casos mudam com ±20% nos pesos) e agora com casos BAIXA.
- **Faixa aberta quando falta o padrão construtivo** (0,85–1,30), com a pergunta do acabamento.
- **Métricas novas:** estabilidade, falhas, elegibilidade por regra, justiça por quinto de renda.
- **README final** com as seções do guia §6 (faltam os nomes da equipe).
- **Vault do Obsidian** (seção 4).

## 3. Ajustes aplicados por cima
| # | Problema | Ajuste | Efeito |
|---|---|---|---|
| 1 | **Seguro existente virava NÃO como fato.** O campo `possui_seguro_residencial` não diz que o seguro é **da BB**, e a vedação do guia (§9.1) vale só para seguro BB no mesmo endereço. 8 dos 24 NÃO eram clientes **sem nenhum produto de seguridade BB** | NÃO só com seguro residencial + `qtd_produtos_seguridade ≥ 1` + um imóvel ("provável seguro BB neste endereço"). Sem produto BB: **SIM + pergunta "O seu seguro residencial atual é da BB Seguros?"** (prioridade 100), e o caso vai para o gerente | NÃO: 24 → **16** · SIM: 114 → **122** · regra dos 80%: 0,91 → **0,85** (ainda acima de 0,8) |
| 2 | **"Dados antigos valem menos" deixou de valer:** o nível de confiança vinha só da classe do dado | `classe_dado(d, campo)`: dado observado com idade maior que a meia-vida do campo conta como **ESTIMADO** ("dado antigo" no motivo) | Requisito da organização atendido e testado. Nesta base nenhum sinal está velho, então os números não mudam |
| 3 | **"Você informou crianças"**, mas `quantidade_dependentes` vem do cadastro e não diz idade | Textos com "dependentes"; "você informou um pet" mantido (esse campo é declarado) | Nada de afirmação falsa ao cliente |
| 4 | **A narrativa mudou:** família agora pesa no plano | Docs 01, 14 e 17 e o README: "renda e idade não mudam nada; dependentes e pet só como necessidade de RC, nunca em valor, elegibilidade, canal ou confiança" | Pitch coerente com o código |

Também: `*.exe` no `.gitignore` (há um instalador do Obsidian de 342 MB na pasta `prototipos/`, que não pode subir).

**Testes:** 51 passando (49 do PR + 2 novos: `test_seguro_existente_sem_produto_bb_vira_pergunta` e `test_dado_observado_antigo_conta_como_estimado`). Validação das planilhas: 0 erros.

## 4. O vault do Obsidian (`obsidian/`)
O "cérebro" do projeto: 116 arquivos e cerca de 48 mil palavras, organizados em 14 pastas (briefing, dados, solução, tecnologia, pesquisa, git, equipe, pitch, conceitos, coberturas, fontes, inovação, design, app v2). Abra a pasta `obsidian/` no Obsidian e comece por `BB Datathon/00 - Painel.md` e `HANDOFF_CONTEXTO.md`.

**O que mais agrega:**
| Nota | Por que vale |
|---|---|
| `14 - App v2/Especificação do app v2 - ligado ao motor.md` | **O próximo passo pronto**, com prioridades P1–P6: números 100% do motor, botões A/B/C, **modo raio-X** ("isso é o que o banco vê; o cliente vê só a versão simples"), tela do gerente e **tela de não elegível**. Traz o contrato da ficha campo a campo e o roteiro do vídeo |
| `12 - Inovação/Ideias v2 - proposta para o time.md` | 14 ideias em 3 camadas (motor, jornada, prova), cada uma ligada a regra e critério; "pacote mínimo" se o tempo apertar |
| `08 - Pitch/Guia da equipe - dados e pitch.md` | Material de estudo para o time responder a banca |
| `Regras de negócio.md` e `07 - .../Regras de negócio - arquivo para as IAs do grupo.md` | 58 regras (RN-01 a RN-58) e a lista de ideias proibidas |
| `01 - Briefing/Transcrição da apresentação.md` | O áudio da banca transcrito |
| `13 - Design/` | Regras de design do BB e as falhas do app atual, com as imagens |

**Cuidados (repositório público):**
- As imagens não têm dados pessoais: endereços riscados e o print do pagamento fora. ✅
- As notas citam **caminhos locais do Matheus** (`C:\Users\maxom\...`) e o repositório privado dele. Inofensivo, mas público.
- A revisão QA do vault sugere tornar o repositório **privado**. O time escolheu público; vale reconfirmar antes da entrega, porque os dados são da organização.
- A nota de revisão diz que "16,6% já têm seguro BB". O campo não diz BB (ajuste 1).

## 5. Para o time decidir (não bloqueia)
- **Largura das faixas de incêndio:** mediana de máximo ÷ mínimo = 2,24, e 10% dos casos acima de 3,3, por causa do padrão construtivo vazio. É honesto, mas pode parecer pouco personalizado. Opções: estreitar para 0,90–1,15 ou destacar a pergunta do acabamento no app.
- **Construir o app v2** pela especificação do vault. O raio-X e a tela de não elegível são os itens de maior impacto no vídeo.

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 51 testes passando; elegível 122 · não elegível 16; `erros_validacao: 0`.

## Frase para o pitch
> "Seguimos os três perfis da própria Brasilseg. O apartamento urbano, a casa familiar e a casa de lazer recebem planos diferentes, e cada um sabe o que fica descoberto se escolher menos. E só dizemos 'não' quando há evidência: sem ela, perguntamos."

## Próximo passo
- App v2 pela especificação do vault (`obsidian/BB Datathon/14 - App v2/`).
