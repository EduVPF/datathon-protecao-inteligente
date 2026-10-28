# Revisão QA simulando a banca: repositório pedroiaan/datathon-protecao-inteligente

28/10/2026 · Base: Guia dos Times, slides "Conteúdo Brasilseg Datathon BBDW" (24 páginas), repositório público (último commit 4c87b7f).

**Como foi feito:** leitura do código e dos documentos; validador independente das duas planilhas em `entrega/` contra as regras do guia. O código do repositório **não foi executado aqui** (bloqueio de segurança para código externo), então os testes (35) e o `gerar.py` precisam ser rodados pelo time.

## Nota geral (visão da banca)
**Forte.** É uma entrega acima da média: completa, testada, explicável e documentada. Os riscos estão em 4 pontos de adequação e alinhamento com os slides, todos corrigíveis em poucas horas.

## O que o validador conferiu
| Checagem | Resultado |
|---|---|
| 138 linhas, mesmos pares cliente+imóvel, colunas iguais ao template | ✅ |
| 1.156 linhas de cobertura, nomes do catálogo | ✅ |
| Todas as coberturas fixas do plano em todos os casos | ✅ 100% |
| `coberturas_recomendadas` igual às linhas da planilha 2 | ✅ |
| Faixas só com números, mín ≤ máx, nenhuma zerada | ✅ |
| Dados usados, regra de cálculo, justificativa e confiança em todas as linhas | ✅ |
| Assistência fora da planilha de coberturas | ✅ |
| Renda, dependentes, pet e salário fora dos textos | ✅ ("idade" aparece só como "idade do sinal", ok) |
| Justificativa com "por que não mais barato / mais caro" | ✅ |

Distribuição: Prático 69 · Total 38 · Essencial 31 · confiança ALTA 15 / MÉDIA 123 / BAIXA 0 · 2,43 perguntas por caso.

## O que está bom
1. **Planilhas completas e consistentes** (seção acima). Atende RN-28 a RN-33.
2. **Faixas com fonte oficial:** SINAPI (mínimo) e CUB (máximo), IPCA da API do Banco Central, FipeZAP para aluguel, condições gerais BB v1.4 citadas (cláusulas 5.5 e 5.6). Ótimo para "uso inteligente dos dados".
3. **Parâmetros num lugar só** (`motor/parametros.py`) e "nunca lê renda, idade, dependentes ou pet" explícito no código.
4. **Métricas do guia** em `metricas.json`: processados, justificativa, completude, perguntas, confiança, **teste de justiça (0 casos mudam)**, sensibilidade (+10% área → +4,8% incêndio, sem quedas), tempo.
5. **Engenharia:** 35 testes, GitHub Actions rodando testes e gerando as planilhas, API opcional para agentes, `.python-version`. Pesa em "viabilidade".
6. **Confiança com frescor do dado** (meia-vida por campo) e pendências de elegibilidade baixando a confiança. Bom para "explicabilidade e incerteza".
7. **Canal pelo comportamento digital** (maturidade ≥ 40 → 1 toque), não pela idade.
8. **Documentação de contexto** (`documentos/contexto/`) e guia de revisão do time.

## O que precisa melhorar (prioridade)
### P1. Elegibilidade: os 30 clientes que já têm seguro BB saíram como elegíveis
- **Achado:** os 138 casos estão como `SIM`. Os 30 clientes com `possui_seguro_residencial = SIM` viraram "SIM + pergunta".
- **Regra:** "não elegível: endereço de risco que já possua seguro residencial da BB Seguros" (guia 9.1). A banca avalia elegibilidade dentro dos 20% de adequação.
- **Correção sugerida:** cliente com **um imóvel só** + seguro existente → `elegivel = NAO`, motivo "endereço já segurado na BB Seguros; é vedada mais de uma proposta". Cliente com **dois imóveis** → manter `SIM` + pergunta "qual endereço já tem seguro?". Documentar a decisão no README.
- Um resultado com 100% elegível costuma chamar atenção numa banca.

### P2. Os 3 perfis contrastantes não seguem os slides
- **Slide 23:** "TESTE: 3 perfis contrastantes e resultados coerentes". **Slide 14** já dá os 3 perfis: **A** apartamento urbano (eletrônicos, chuva, vidros), **B** casa familiar (pets, crianças, RC familiar), **C** casa de lazer (aluguel temporário, vento, uso sazonal).
- **Hoje:** os casos contrastantes são "1 toque limpo, inquilino no Total, elegibilidade a confirmar".
- **Correção:** escolher na base de teste um caso de cada perfil A, B e C e mostrar que o motor dá Prático, Total e um plano adequado à casa de veraneio, com o motivo. Isso fala a língua da banca.

### P3. Pets e crianças: os slides tratam como sinal de necessidade
- **Slide 14:** "casa familiar: pets · crianças · RC familiar". A organização sugere usar a presença de crianças e pets como sinal para responsabilidade civil.
- **Hoje:** o motor ignora dependentes e pet de propósito (e eu também tinha recomendado isso).
- **Correção equilibrada:** não usar como atalho de risco ou valor (RN-07), mas usar como **necessidade** declarada: quando houver dependentes ou pet, incluir a pergunta "Tem crianças ou pets em casa? (eles aumentam a chance de danos a terceiros)" e, se "sim", recomendar RC familiar (Total). Explicar no README que é necessidade confirmada pelo cliente, não inferência de risco. Ajustar o teste de justiça para renda e idade.

### P4. Confiança BAIXA em 0 casos
- 61% dos imóveis não têm área e vários vínculos não têm sinal. Zero casos de confiança baixa pode parecer otimista.
- **Correção:** revisar o corte (ex.: área estimada + vínculo sem sinal + material sem dado → BAIXA). Ter alguns casos BAIXA mostra honestidade (critério de incerteza).

### P5. CUB de 6 estados vem de agregador
- `cub_uf.csv`: RJ, MG, PR, RS, PE e CE marcados "validar" (fonte Paggo). O guia pede fonte pública ou autorizada, documentada.
- **Correção:** buscar no Sinduscon de cada estado, ou usar só SINAPI (oficial, IBGE) com uma margem fixa para o máximo, e dizer isso no README.

### P6. Repositório público
- O repositório está **público** no GitHub. Os outros 4 times podem ver e copiar o motor e as planilhas antes da entrega.
- **Correção:** tornar privado agora (Settings > General > Danger Zone > Change visibility) e dar acesso só ao time.

### P7. Dois repositórios
- Existe o repositório do Matheus (`matfsouza/datathon-bb-seguro-residencial`, privado) e o do Pedro (público, mais avançado). Escolher **um** como oficial para a entrega e parar de mexer no outro.

## Detalhes menores
- **Linguagem do slide 23:** usar a frase "Recomendamos esta proteção porque... Se você escolher menos, estas necessidades ficarão descobertas." A justificativa atual já tem a ideia ("Por que não um plano mais barato"); vale usar as palavras da banca.
- **Pequenos reparos:** o slide 11 inclui no Essencial; o catálogo do datathon não. Manter o catálogo e citar a diferença no README.
- **Pitch:** o slide 6 diz que só 17% dos lares têm seguro residencial. Na base de desenvolvimento, 16,6% dos clientes já têm seguro BB: dá uma ligação direta com o problema da banca. O slide 3 traz o *protection gap* do Brasil (> 90%).
- **README final, uso de IA e vídeo:** ainda pendentes segundo o próprio guia de revisão do repositório.
- Validar no time: rodar `python -m pytest -q` e `python motor/gerar.py --entrega` do zero numa máquina limpa.

## O que os slides acrescentam ao guia
- **Missão:** entender → comparar → recomendar → explicar. "Regra de ouro: o plano ideal não é automaticamente o mais completo."
- **MVP esperado (slide 23):** entrada (perfil + imóvel + riscos) → motor (regras + score/modelo + explicação) → saída (plano + valores + adicionais + motivos) → **teste com 3 perfis contrastantes**.
- **Entrega residencial (slide 15):** perfil, necessidade (riscos priorizados), plano, quanto (limites coerentes), por quê.
- **Canais citados:** Plataforma BB, Internet PF, Mobile, CRBB, Portal BB Seguros, Central Brasilseg.

## Status (28/10, fim do dia)
- P1 a P5 e a frase do slide 23 foram corrigidos numa cópia local. Patch e arquivos em `prototipo/correcoes_motor/` do repositório do Matheus. Detalhes em [[Correções P1-P5 no motor]].
- P6 e P7 (repositório) ficaram com o time, como o Matheus pediu.
