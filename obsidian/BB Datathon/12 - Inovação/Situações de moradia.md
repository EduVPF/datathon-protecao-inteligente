---
tags: [inovacao, v2]
---
# Situações de moradia

**O que é:** Em vez de separar clientes por idade ou renda, separamos pela **situação do imóvel**. Seis perfis: inquilino, proprietário com financiamento, proprietário quitado, proprietário que aluga para terceiros, imóvel de veraneio e casa com MEI. Cada perfil tem um plano de partida e coberturas que pesam mais.

**Dados que usa:** `pagamento_aluguel_recorrente`, `parcela_financiamento_imobiliario`, `credito_recorrente_compativel_aluguel`, `endereco_principal_compativel`, termos do endereço. Nos dados: 531 pagam aluguel, 781 financiam, 241 recebem aluguel, 1.025 sem sinal.

**E o gerente?** Cada perfil tem uma frase pronta. Ex.: inquilino → "o prédio é do dono; o seu seguro protege os seus móveis e o que você causar aos outros".

**E quem tem dificuldade com app?** O perfil deixa a explicação curta e com exemplos da vida dele.

**Regras:** RN-07 (não usa atributo pessoal), RN-16, RN-27 (em alugado, beneficiários diferentes para locador e locatário).

**Esforço:** Baixo. São regras.

Exemplos de lógica: inquilino → conteúdo e RC pesam mais; quem aluga para terceiros → perda de aluguel faz sentido (Total); apartamento → RC familiar (vizinho de baixo); veraneio → casa fica vazia, roubo pesa mais.

Ligações: [[Ideias v2 - proposta para o time]] · [[Regras de negócio]]
