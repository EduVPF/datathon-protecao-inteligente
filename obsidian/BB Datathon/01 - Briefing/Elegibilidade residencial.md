---
tags: [briefing, regras, elegibilidade]
---
# Elegibilidade residencial

Regras do [[Guia oficial do datathon]] e como cada uma aparece (ou não) nos dados. Ver [[Achados iniciais dos dados]].

## Pode
- Casa, casa em condomínio ou apartamento.
- Uso residencial, residencial + comercial (só MEI dentro de casa, das atividades aceitas) ou lazer/veraneio.
- Imóvel próprio, financiado, alugado ou sob gestão do proponente.
- Pessoa física ou jurídica, correntista ou não.
- Casa de madeira pré-fabricada dentro das normas ABNT/IBAMA.

## Não pode
| Restrição | Tem sinal nos dados? | Como tratar (proposta) |
|---|---|---|
| Comunidade carente ou favela | Não | Declaração do cliente na confirmação. Nunca inferir pelo bairro ou renda (seria viés). |
| Imóvel ligado a atividade rural (exceto casa sede) | Não direto (os municípios são capitais) | Declaração |
| Tombado, desapropriado ou condenado | `situacao_imovel_cadastral` (todos REGULAR) | Elegível pelo sinal |
| Em construção, reforma ou reconstrução | `gastos_material_construcao_24m` (18% gastaram algo, 112 acima de R$ 20 mil) e complemento "LOTE" | Sinal de alerta → pergunta de confirmação, não recusa automática |
| Material combustível (exceto madeira pré-fabricada) | `material_parede_externa_cadastrado` (78% sem dado; resto ALVENARIA) | Sem dado → confirmar |
| Endereço que já tem seguro residencial BB | `possui_seguro_residencial` (366 clientes) | Cliente com 1 imóvel: provável inelegível. Com 2 imóveis: perguntar qual endereço já tem seguro |

## Mínimo para cotar
Proponente e imóvel identificados; CEP/localização, tipo e uso; relação com o imóvel; objeto (imóvel + conteúdo, limite único; em alugado, beneficiários diferentes para locador e locatário); elegibilidade; plano; faixas; adicionais/exclusões; confirmações.

Ligações: [[Regras e contexto]] · [[Perguntas de confirmação]] · [[Templates de entrega]]
