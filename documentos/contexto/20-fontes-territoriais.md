# 20 · Fontes territoriais: S2iD, ANEEL e CUB oficial

**Em uma frase:** preenchemos a lacuna que a organização deixou ("a base não traz alagamento, vendaval nem furto") com dados oficiais por município: os desastres registrados pela Defesa Civil (S2iD), as quedas de energia (ANEEL) e o CUB oficial de mais 3 estados. Tudo fica salvo no projeto e entra só no motivo.

**Onde estamos:** véspera da entrega · detalhes no vault: `11 - Fontes externas/Atlas Digital de Desastres.md` e `ANEEL continuidade.md`

## O que fizemos
| Fonte | O que entrou | Onde aparece |
|---|---|---|
| **Atlas Digital de Desastres / S2iD** (Sedec/MIDR, base 1991–2025 v1.1, CC-BY) | Registros oficiais de chuva intensa, alagamento e enxurrada (água) e de vendaval e granizo (vento) nas 10 capitais | Justificativa de danos por água e vendaval: "Em Curitiba, a Defesa Civil registrou 10 ocorrências de vendaval, ciclone ou granizo desde 1991 (7 nos últimos 10 anos; a última em 2025)" |
| **ANEEL, Ranking de Continuidade 2025** | Posição da distribuidora de cada capital entre 33 grandes (DGC = quedas e horas sem energia ÷ limite) | Justificativa de danos elétricos: "A distribuidora de Curitiba (COPEL) ficou em 27º de 33..." |
| **CUB oficial** de MG, RS e PR | Valores de set/2026 conferidos nos PDFs e sites dos Sinduscons | Máximo do custo do m²; agora são 7 de 10 UFs oficiais |

**Como obtivemos:**
- O portal de dados abertos do MIDR recusa downloads automáticos e até pelo navegador. Baixamos o **mesmo arquivo** na página oficial de downloads do Atlas (86 MB). A base bruta fica fora do repositório. `python motor/externos/coletar.py --atlas ARQUIVO.csv` refaz o recorte, e o resultado conferiu com a análise feita em pandas.
- ANEEL e CUB: leitura das páginas e PDFs oficiais, com o link em `FONTES.md`.

**Efeito no resultado:** planos, elegibilidade, canal e confiança **iguais**. O CUB oficial subiu o máximo do custo do m² em MG, RS e PR, e a razão para RJ, PE e CE passou de 1,09 para 1,14. Por isso as faixas de incêndio ficaram um pouco mais largas: na confiança média, a largura mediana foi de 2,25 para 2,33.

**Testes:** 64 passando (+3). Um deles prova que, sem os arquivos externos, valores, plano e confiança não mudam.

## Por que importa
- **Uso inteligente dos dados (15%):** cruzamento com fonte oficial pelo código IBGE, como a organização sugeriu.
- **Explicabilidade (10%):** o motivo deixa de ser genérico e passa a falar da cidade do cliente.
- **Regra:** RN-11 (fonte documentada e coleta reproduzível) e RN-12 (funciona sem a fonte).

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| Só no texto | Ajustar o valor de vendaval ou água pelo número de registros | Registro depende de o município informar; não há base para converter em reais |
| Zero registros = sem frase | "Sua cidade não tem registros" | Ausência de registro não é ausência de risco |
| Fora: inundação de rio e deslizamento | Contar tudo como "água" | Costumam ser exclusões do residencial; citar daria falsa sensação de cobertura |
| Ranking por distribuidora | DEC/FEC por conjunto elétrico | O ranking é oficial e cabe em 10 linhas; o conjunto (30 MB) fica como próximo passo |

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 64 testes passando e `erros_validacao: 0`. Em `entrega/template_coberturas_times.csv`, a justificativa de vendaval de `IMO_CASO_00005_01` cita a Defesa Civil.

## Frase para o pitch
> "A organização não deu dados de risco. Fomos buscar na Defesa Civil e na ANEEL: o cliente de Curitiba lê que a cidade teve 7 vendavais registrados nos últimos 10 anos, e o de Porto Alegre, que a distribuidora dele é a última do ranking de quedas de energia."

## Próximo passo
- CUB oficial de RJ, PE e CE (issue #11); DEC/FEC por conjunto elétrico.
