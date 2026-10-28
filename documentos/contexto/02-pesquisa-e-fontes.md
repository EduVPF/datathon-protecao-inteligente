# 02 · Pesquisa e fontes

**Em uma frase:** antes de calcular qualquer faixa, entendemos como o mercado mede bens, como a BB Seguros indeniza e quais dados públicos deixam nossos números defensáveis.

**Onde estamos:** antes do código. Detalhes em [`PESQUISA_BENS_E_INDENIZACAO.md`](../PESQUISA_BENS_E_INDENIZACAO.md) e [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md).

## O que descobrimos
- **Ninguém no mercado pede para o cliente somar os bens.**
  - Alemanha: área × valor por m².
  - EUA: percentual do valor do imóvel.
  - Reino Unido: modelo pelo endereço, que devolve uma **faixa**.
  - O padrão comum é usar o **valor de reposição** (comprar novo hoje).
- **As Condições Gerais da BB Seguros (v1.4) mudam o jogo:**
  - **Primeiro risco absoluto (cl. 15.1):** sem rateio. Cada cobertura precisa cobrir a **maior perda provável**, não "tudo".
  - **Segundo risco (cl. 15.2):** em apartamento ou imóvel financiado, a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento.
  - **Limite único (cl. 5.5–5.6):** quando prédio e conteúdo dividem o mesmo limite, o prédio tem prioridade.
  - **Não cobre (cl. 6):** joias, relógios, dinheiro e obras de arte. Roubo não cobre residência desocupada.
  - **Indenização pelo valor atual (cl. 24.2):** com uma tabela oficial de depreciação por categoria e idade. O "valor de novo" é opcional.
  - **Comprovação (cl. 24.2.3):** a "relação de bens anexada na proposta" vale como prova de que o bem existia.

## As fontes que o motor usa
| Fonte | Órgão | Para quê | Status |
|---|---|---|---|
| SINAPI ago/2026, sem desoneração | IBGE | Mínimo do custo de reconstrução por m² | ✅ conferido no PDF |
| CUB R8-N | Sinduscons | Máximo do custo de reconstrução por m² | ✅ 4 oficiais · ⚠️ 6 a validar |
| IPCA (série 433) | Banco Central | Trazer as compras de 3 anos a preço de hoje (fator 1,0694) | ✅ pela API |
| FipeZAP Locação set/2026 | Fipe | Aluguel de quem mora no próprio imóvel | ✅ informe oficial |
| Condições Gerais v1.4 | BB Seguros | Regras de cobertura e exclusões | ✅ |

Tudo está em `motor/externos/` (CSVs + [`FONTES.md`](../../motor/externos/FONTES.md)), com os PDFs originais em `referencias/fontes/`.

## O que você precisa entender
- **Por que faixa e não um número?** Porque é estimativa. A faixa mostra a incerteza com honestidade. O guia exige faixa mesmo quando a confiança é baixa.
- **Por que duas fontes para o m²?** O SINAPI (governo) costuma ser menor e o CUB (Sinduscon) maior. Usar um como mínimo e o outro como máximo dá uma faixa que ninguém consegue chamar de chute.
- **Por que IPCA?** As compras são dos últimos 3 anos. Para repor hoje, custa um pouco mais.

## Decisões e o que descartamos
| Decidimos | Em vez de | Porque |
|---|---|---|
| SINAPI **sem** desoneração | Com desoneração | Inclui os encargos completos, que é o custo real de reconstruir |
| Dados de risco (raios, furtos) fora do motor | Usar rankings antigos | Estão desatualizados, e usar furto por região pode discriminar |
| Fontes salvas no projeto | Chamar API em tempo real | O motor precisa rodar sem internet e dar sempre o mesmo resultado |

## Frase para o pitch
> "Cada número da nossa planilha tem fonte oficial: custo de obra do IBGE, aluguel da Fipe, inflação do Banco Central e as regras do próprio contrato da BB Seguros."

## Próximo passo
- [03 · Protótipos](03-prototipos.md)
