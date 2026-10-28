# 17 · Revisão QA: elegibilidade, perfis do slide 14 e confiança por regra

**Em uma frase:** revisamos o motor com os olhos da banca (guia + slides) e corrigimos 5 pontos: seguro BB já existente, os 3 perfis do slide 14, crianças e pets, confiança e CUB.

**Onde estamos:** Fase 3 · revisão antes da entrega · branch `revisao-qa-p1-p5`

## O que fizemos
- **Seguro BB já existente:** cliente com seguro residencial e **um imóvel só** sai `NAO` (o endereço já está segurado; o guia proíbe duas propostas). Com dois imóveis fica `SIM` e o motor pergunta qual já tem seguro. Na base de teste: 24 casos `NAO`.
- **Perfis do slide 14** em `entrega/casos_contrastantes.json`: A apartamento urbano (`IMO_CASO_00005_01`, Prático), B casa familiar (`IMO_CASO_00031_01`, Total), C casa de lazer (`IMO_CASO_00010_01`) e um não elegível (`IMO_CASO_00001_01`).
- **Crianças e pets:** só como necessidade que o cliente informou. Crianças e pet juntos somam 1 ponto ao Total. Só um dos dois vira pergunta. Nunca mudam faixa, elegibilidade, canal ou confiança.
- **Confiança por regra, sem nota de corte** (detalhe abaixo).
- **CUB só oficial** (SP, DF, GO, BA). Nas outras UFs o máximo é SINAPI × mediana da razão CUB/SINAPI das UFs oficiais (≈ 1,09).
- **Justificativa** com a frase do slide 23 ("Recomendamos o plano X porque... Se você escolher menos: ..., e essas necessidades ficarão descobertas") e, no fim, o nível de confiança com o motivo.

## Por que importa
- **Critério da banca:** adequação (20%, elegibilidade e perfis), explicabilidade e incerteza (10%), privacidade e responsabilidade (10%).
- **No pitch:** slide de evidências: "a confiança não é chute: muda só quando muda a qualidade do dado".

## O que você precisa entender
**Por que trocamos a confiança.** Antes o nível saía de uma nota de 0 a 100 com cortes em 55 e 75. A nota é a média de poucos tipos de dado, então os casos se amontoam em poucos valores (57, 58, 59, 76). Medimos: **101 dos 138 casos ficavam a 3 pontos de mudar de nível**. Um ajuste pequeno num peso mudava dezenas de casos, e isso não tem explicação para o cliente.

**Como ficou.** Cada um dos 5 dados críticos (área, bens, uso, vínculo, tipo) recebe uma classe:
- **observado:** veio de documento, transação ou confirmação do cliente;
- **estimado:** calculado de outros sinais (área pelo IPTU e pela luz) ou inferido (imóvel quitado porque não há parcela);
- **presumido:** sem sinal nenhum (média de imóveis parecidos, "cadastro desatualizado?").

| Nível | Regra |
|---|---|
| BAIXA | área ou bens presumidos, ou um dado presumido junto com outro estimado |
| ALTA | os 5 observados, elegível e sem pendência |
| MÉDIA | o resto |

A nota de 0 a 100 continua na ficha, mas só como detalhe para ordenar casos.

**Como provamos que funciona** (as duas checagens que bancos fazem para validar uma classificação):
- **Estabilidade:** mexemos 20% para cima e para baixo nos pesos das fontes e no desconto de completude. **0 casos mudam de nível.**
- **Ordenação:** quanto menor a confiança, mais larga a faixa de incêndio (máximo ÷ mínimo): ALTA 1,62 · MÉDIA 1,99 · BAIXA 2,07.

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| Nível por regra sobre a classe do dado | Corte na nota (55/75) | 101 casos a 3 pontos do corte; a regra só muda quando muda o dado |
| Crianças e pet juntos = +1 Total | Qualquer criança ou pet = +1 | Com qualquer um, o Total iria de 38 para 90 casos (65%), contra a regra de ouro do slide 8 |
| Seguro existente + 1 imóvel = NAO | Todos SIM + pergunta | Guia 9.1; com um imóvel só, o seguro é desse endereço |
| CUB só oficial | CUB de agregador | Guia pede fonte pública ou autorizada |

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 45 testes passando; Prático 60 · Total 49 · Essencial 29; elegível 114 · não elegível 24; confiança ALTA 17 · MÉDIA 101 · BAIXA 20; teste de justiça 0; estabilidade da confiança 0.

## Pendências e riscos
- O CUB de RJ, MG, PR, RS, PE e CE pode ser buscado no site de cada Sinduscon e marcado `oficial`.
- Padrão construtivo vazio (98 casos) hoje usa fator neutro 1,0. Dá para abrir a faixa (0,85 a 1,30) nesses casos.

## Frase para o pitch
> "Nossa confiança não é uma nota mágica: ela diz qual dado foi visto, qual foi estimado e qual falta. Mexemos 20% nos pesos e nenhum caso mudou de nível."

## Próximo passo
- README final, uso de IA e vídeo.
