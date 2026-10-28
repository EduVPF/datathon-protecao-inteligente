---
tags: [solucao, calculo, coberturas]
data: 2026-10-28
status: proposta
---
# Como calcular o valor dos bens e da casa

A banca insistiu em duas ideias (ver [[Transcrição da apresentação]], ~01:35 e ~12:47):
1. **Casa que pegou fogo:** o seguro paga para **reconstruir**, não o valor do imóvel, porque o terreno continua do cliente.
2. **Bens:** o valor para indenizar não é o que a pessoa pagou. Entram a **inflação** (o preço de hoje) e o **desgaste** (bem usado vale menos).


## Onde isso entra no projeto (resposta curta)
- **Nosso trabalho é dizer quanto segurar** (importância segurada = faixa mínima e máxima no template). O guia pede "faixas de valores" (linhas 83, 107 e 108), não o valor de indenização.
- **Quanto pagar num sinistro** é a regulação, feita pela seguradora depois, com perito. Não automatizamos isso.
- **Para o cliente**, a mesma lógica vira explicação: "se a sua TV de 2 anos queimar, você recebe cerca de R$ 1.950".
- Página visual com o fluxo e a calculadora ao vivo: `prototipo/como_aplicar_valores.html` (abre no navegador).

```
Dados (área, tipo, compras, bens) + SINAPI + IPCA
   → Conta 1 imóvel · Conta 2 bens · Conta 3 faixa de incêndio
      → BB: linha do template · Cliente: valor sugerido + frase · Gerente: argumento contra o superseguro
```

## Os 4 conceitos (com nome técnico)
| Conceito | O que é | Exemplo |
|---|---|---|
| **Valor de mercado** | Preço de venda do imóvel, **com terreno** e localização | Apto em Curitiba vendido por R$ 700 mil. **Não usar para seguro** |
| **Valor de reconstrução** | Custo para construir de novo: área × custo do m² de obra (SINAPI/CUB) × padrão + demolição e projeto | 110 m² × R$ 1.976 × 1,12 ≈ R$ 243 mil |
| **Valor de novo (reposição)** | Quanto custa comprar hoje um bem igual, novo. É o preço pago **corrigido pela inflação** | Sofá de R$ 3.000 comprado há 1,5 ano → ~R$ 3.210 hoje |
| **Valor atual** | Valor de novo **menos a depreciação** por idade e uso | O mesmo sofá: R$ 3.210 × (1 − 10% × 1,5) ≈ R$ 2.730 |

Regras de apoio:
- **Princípio indenitário** (Código Civil, art. 778): o seguro não paga mais que o prejuízo real. Segurar acima do valor em risco é pagar prêmio por nada (**superseguro**).
- **Subseguro:** segurar abaixo do valor em risco faz o cliente receber menos que o prejuízo (pode haver rateio).
- **Valor de novo ou valor atual:** a apólice define qual é pago. A nova lei de seguros (Lei 15.040/2024) permite contratar a valor de novo. **Perguntar na mentoria qual o produto BB usa.**
- **Apartamento:** a estrutura do prédio já tem seguro obrigatório do condomínio (Código Civil, art. 1.346). O seguro do morador cobre **o que é dele**: bens e melhorias da unidade (acabamentos, armários planejados). Confirma o gancho do protótipo ("o seguro do condomínio cobre o prédio, não o que tem dentro do seu apê").

## A receita para o motor
### 1. Imóvel
```
custo_reconstrucao = area_m2 × custo_m2_UF (SINAPI) × fator_padrao × 1,12
  fator_padrao: econômico 0,85 · normal 1,00 · superior 1,30 (sem dado → faixa de 0,85 a 1,30)
  1,12 = demolição, retirada de entulho e projeto (premissa; o BCIS do Reino Unido inclui esses itens)
CASA        → valor do imóvel = custo_reconstrucao
APARTAMENTO → valor do imóvel = custo_reconstrucao × 25% a 40% (acabamentos e melhorias; a estrutura é do condomínio)
Terreno     → nunca entra
```
### 2. Bens (conteúdo)
```
para cada categoria (móveis, eletrodomésticos, eletrônicos, lazer):
  valor_pago      = max(compras_36m da categoria, bens cadastrados da categoria)   (evita contar duas vezes)
  valor_de_novo   = valor_pago × correção
                    correção: IPCA acumulado no período para móveis e eletrodomésticos (~4,6% ao ano);
                              1,0 para eletrônicos (tecnologia não encarece igual)
  valor_atual     = valor_de_novo × (1 − taxa_depreciação × idade)
                    taxa (referência: tabela de depreciação da Receita Federal):
                    móveis 10%/ano · eletrodomésticos 10%/ano · eletrônicos 20%/ano · lazer 20%/ano
                    idade: a base não tem data de compra → premissa de 1,5 ano para compras de 36 meses
faixa de conteúdo: mínimo = soma dos valores atuais · máximo = soma dos valores de novo
```
### 3. Limite da cobertura de incêndio (imóvel + conteúdo, limite único, como diz o guia)
```
mínimo = valor_imovel_baixo + conteudo_valor_atual    (respeitando o piso do produto: R$ 100 mil)
máximo = valor_imovel_alto  + conteudo_valor_de_novo
```
Isso resolve a regra do template: **faixa mínima e máxima** com base defensável (RN-32), e a confiança cai quando o padrão ou a idade dos bens são premissas.

## Exemplo prático: CASO_00005 (apto financiado, 110 m², Curitiba)
**Bens** (compras dos últimos 36 meses; idade média de 1,5 ano):
| Categoria | Pago | Valor de novo hoje | Valor atual |
|---|---|---|---|
| Móveis | R$ 9.100 | R$ 9.737 | R$ 8.276 |
| Eletrodomésticos | R$ 2.850 | R$ 3.050 | R$ 2.592 |
| Eletrônicos | R$ 8.800 | R$ 8.800 | R$ 6.160 |
| **Total** | R$ 20.750 | **R$ 21.586** | **R$ 17.029** |

**Imóvel** (custo do m² de R$ 1.976, média nacional SINAPI jun/2026, até baixar o valor do PR):
- Reconstruir a unidade inteira: R$ 207 mil a R$ 316 mil (central R$ 243 mil).
- Como é apartamento, o condomínio segura a estrutura. Acabamentos: **R$ 52 mil a R$ 127 mil** (central R$ 73 mil).

**Limite de incêndio sugerido: R$ 100 mil a R$ 148 mil.** A conta central (R$ 95 mil) fica abaixo do piso do produto, então vai o piso: **R$ 100 mil**.
- O app atual sugere **R$ 300 mil** por padrão. Para este cliente, R$ 200 mil desse valor nunca seriam pagos (art. 778), e ele paga prêmio por eles.
- No nosso protótipo usamos R$ 260 mil (reconstrução da unidade inteira). **Precisa corrigir para R$ 100 mil**, porque é apartamento.

**Linha no template de coberturas:**
| Campo | Valor |
|---|---|
| cobertura | INCENDIO_RAIO_EXPLOSAO_FUMACA |
| faixa_valor_min | 100000 |
| faixa_valor_max | 148000 |
| confianca_estimativa | MEDIA |
| dados_utilizados | area_cadastrada_m2 (110, CADASTRO_IPTU); possui_termo_apartamento; compras_moveis/eletrodomesticos/eletronicos_36m; SINAPI |
| regra_calculo_utilizada | (área × custo m² SINAPI × padrão 0,85 a 1,30 × 1,12) × 25% a 40% (apto: estrutura no seguro do condomínio) + conteúdo entre valor atual e valor de novo; piso do produto R$ 100 mil |
| justificativa | Apartamento: o seguro do condomínio cobre a estrutura; o cliente protege acabamentos e bens. O terreno não entra |
| informacao_a_confirmar | Padrão de acabamento (simples, normal, alto); se tem móveis e eletros com mais de 3 anos |

**Na hora do sinistro (para o cliente entender no app):** a TV comprada há 2 anos por R$ 4.000 queimou com um raio.
- Se a apólice paga **valor atual**: R$ 4.000 × (1 − 20% × 2) = R$ 2.400, menos a franquia (mínimo R$ 450) = **R$ 1.950**.
- Se paga **valor de novo**: R$ 4.000 − R$ 450 = **R$ 3.550**.

**Casa para comparar:** CASO_00001 (casa em Recife, ~224 m² estimados): reconstrução de **~R$ 496 mil** no padrão normal, mais o conteúdo. O terreno não entra, mesmo que a casa valha R$ 900 mil no mercado.

## Como aparece no app (linguagem simples)
- Tela "Sua casa": *"O prédio já tem o seguro do condomínio. O seu protege o que é seu: acabamentos (~R$ 73 mil) e seus bens (entre R$ 17 mil, com o desgaste, e R$ 22 mil, para comprar tudo novo)."*
- Tela "Ajustar", embaixo de incêndio: *"Acima de R$ 148 mil você paga por um valor que nunca receberia."*
- Pergunta extra (só se a confiança estiver baixa): *"Além das compras dos últimos 3 anos, você tem móveis ou eletros mais antigos? (sim/não)"*

## Premissas a validar
- [ ] Custo do m² por UF (SINAPI do IBGE ou CUB do Sinduscon-PR)
- [ ] Percentual de acabamentos em apartamento (25% a 40% é estimativa de engenharia)
- [ ] Idade média dos bens (a base não tem data de compra)
- [ ] O produto BB paga valor atual ou valor de novo? (mentoria)
- [ ] IPCA acumulado oficial (IBGE / Banco Central, série 13522)

## Fontes
- [Lei 15.040/2024, seguros de dano](https://www.vademecumprevidenciario.com.br/legislacao/nivel/lei_00150402024/capitulo-ii-dos-seguros-de-dano-secao-i-disposicoes-gerais) · [IBDFAM: dos seguros de dano](https://ibdfam.org.br/artigos/2269/Dos+seguros+de+dano) · [Legismap: valor de novo (Mapfre)](https://legismap.com.br/conteudos/artigos-e-noticias/mapfre-inclui-clausula-de-valor-de-novo-no-seguro-empresarial-e-amplia-limites-de-cobertura) · [Lockton: valor em risco](https://global.lockton.com/br/pt/noticia/valor-em-risco-vr-sua-importancia-e-particularidades)
- [Revista Apólice: cálculo pelo custo de reconstrução](https://revistaapolice.com.br/2016/04/como-funciona-cobertura-do-seguro-residencial/) · [CQCS: contratação correta](https://cqcs.com.br/noticia/incendios-em-residencias-acendem-alerta-para-contratacao-correta-do-seguro-residencial/)
- [FenSeg: residencial × condominial](https://legismap.com.br/conteudos/artigos-e-noticias/duvidas-sobre-a-diferenca-entre-seguro-residencial-e-condominial-a-fenseg-responde) · [Cartilha FenSeg](https://tokiomarine.com.br/wp-content/uploads/2025/01/Cartilha-Seguro-Condominio-FenSeg.pdf) · [Revista Apólice: seguro condomínio](https://revistaapolice.com.br/?p=82954)
- [IBGE: SINAPI jun/2026](https://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/47537-indice-nacional-da-construcao-civil-acelera-para-1-19-em-junho.html) · [BCIS](https://abi.bcis.co.uk) · [IPCA 12 meses (setembro/2026)](https://bpmoney.com.br/?p=425837)

Ligações: [[Calculadora de reconstrução]] · [[Reconstrução]] · [[Conteúdo]] · [[SINAPI]] · [[Templates de entrega]] · [[Regras de negócio]] · [[App atual - falhas e nosso fluxo]]
