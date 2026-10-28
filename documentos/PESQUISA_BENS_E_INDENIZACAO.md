# Pesquisa: como medir os bens e como funciona a indenização

Pesquisa de mercado para o Datathon Proteção Inteligente (Seguro Residencial). 28/10/2026.

**Pergunta:** como o mercado estima o valor dos bens de uma casa sem fazer o cliente listar tudo, e quanto o cliente realmente recebe se algo acontecer?

---

## 1. Resumo em 6 pontos

1. **Ninguém no mercado pede para o cliente somar tudo.** Os métodos usam um atalho, como a área, o valor do imóvel ou um modelo pelo endereço, e entregam uma **faixa**, não um número exato.
2. **O produto da BB Seguros é a "primeiro risco absoluto", sem rateio.** Se o limite contratado for menor que o patrimônio, o cliente recebe até o limite, e a indenização não é cortada proporcionalmente. Por isso a pergunta certa por cobertura é **"qual a maior perda provável?"**, e não "quanto vale tudo?".
3. **A indenização padrão é pelo valor atual**: o custo de comprar novo hoje menos a depreciação de uma **tabela oficial por categoria e idade**. O "Valor de Novo", sem depreciação, é uma cláusula opcional com prêmio adicional.
4. **Apartamento e imóvel financiado funcionam em "segundo risco" para a estrutura.** O seguro do condomínio ou do financiamento paga primeiro, e o residencial complementa ou cobre só o conteúdo. Isso confirma a suspeita de cobrança dupla no incêndio de R$ 260 mil do protótipo.
5. **Joias, relógios, dinheiro e obras de arte não são cobertos** pelo produto padrão. Bicicleta tem cobertura própria. Roubo não cobre casa desocupada, o que afeta imóveis de veraneio.
6. **A oportunidade que ninguém explora:** a seguradora aceita como prova de que o bem existia a **"relação de bens anexada na proposta"**. Um inventário montado a partir das compras do cliente no banco, anexado à proposta com consentimento, vira essa prova e reduz o atrito na hora do sinistro.

---

## 2. Como o mercado mede os bens

| Método | Onde | Como funciona | Ponto forte | Ponto fraco |
|---|---|---|---|---|
| **Valor por m²** | Alemanha (seguro de conteúdo) | Área × valor fixo por m², em geral **€ 650 a € 750/m²**. Se a área informada estiver certa, a seguradora **abre mão de alegar subseguro** | Uma pergunta só (a área) e nenhuma briga na indenização | Erra para quem tem bens muito caros ou muito simples |
| **% do valor do imóvel** | EUA (cobertura C) | Bens = **50% a 70%** do limite do imóvel, como padrão ajustável | Zero perguntas | Ignora quem mora: dois imóveis iguais recebem o mesmo valor |
| **Calculadora por cômodo** | Reino Unido (Aviva, Swinton, AXA) | O cliente estima cômodo por cômodo, a **valor de reposição** | Preciso | É exatamente o esforço que faz o cliente desistir |
| **Modelo pelo endereço** | Reino Unido (Verisk Contents Insight) | Machine learning com tamanho, tipo, cômodos e perfil da região, validado com sinistros. Devolve uma **faixa com mínimo e máximo** a partir só do endereço | Faixa pronta e calibrada | Depende de dados de sinistro que não temos |
| **Inventário por foto ou vídeo com IA** | Apps (HomeZada, Bevel, Hometric) | A IA reconhece os objetos nas fotos e estima o valor de reposição de cada um, em faixa | Inventário detalhado | Exige esforço do cliente; as estimativas variam bastante |

**Lições para o projeto:**
- Todos usam **valor de reposição** (comprar novo hoje), não o preço pago.
- Os melhores entregam **faixa**, e não número exato. É o mesmo formato do template do datathon.
- O modelo alemão mostra que a **área bem informada** já basta para um bom padrão.
- O próprio Verisk critica estimar só pelo número de quartos: é preciso **combinar sinais**, que é o que o guia pede.

---

## 3. Como a BB Seguros indeniza (Condições Gerais, versão 1.4)

Fonte: *Condições Gerais e Especiais, Seguro Residencial*, processo SUSEP 15414.606453/2020-10, versão 1.4. É o produto dos planos Essencial, Prático e Total.

### 3.1 Forma de contratação
- **Primeiro Risco Absoluto, sem rateio (cl. 15.1):** a seguradora paga o prejuízo até o limite (LMI) de cada cobertura, descontada a franquia ou a participação obrigatória (POS).
- **Segundo Risco (cl. 15.2):** se o imóvel faz parte de condomínio ou tem seguro obrigatório do Sistema Financeiro Habitacional, para a **estrutura** paga primeiro o seguro principal (do condomínio ou do financiamento). O residencial cobre o complemento ou **apenas o conteúdo**.
- **Limite único para prédio e conteúdo (cl. 5.5 e 5.6):** pode ser contratado assim, mas **o prédio tem prioridade**. O conteúdo só recebe o que sobrar do limite. Também dá para contratar só o prédio ou só o conteúdo.

### 3.2 Valor pago: valor atual com tabela de depreciação (cl. 24.2.2)
Custo de reposição ao preço do dia, menos a depreciação:

| Tempo de uso | Computadores, celulares, tablets | Móveis, eletrodomésticos e eletrônicos (exceto TV) | TVs |
|---|---|---|---|
| até 1 ano | 0% | 0% | 0% |
| até 2 anos | 30% | 20% | 20% |
| até 3 anos | 40% | 25% | 30% |
| até 4 anos | 50% | 30% | 40% |
| até 5 anos | 60% | 35% | 50% |
| até 6 anos | 70% | 40% | 60% |
| até 7 anos | 80% | 45% | 65% |
| até 8 anos | 90% | 50% | 70% |
| acima de 8 anos | — | 70% | 80% |

- **Vestuário** (roupas, calçados, bolsas, óculos, cama, mesa e banho): depreciação de 30% com nota fiscal e 50% sem. A soma não passa de **30% do limite** da cobertura (cl. 24.2.4).
- **Valor de Novo (cl. 25):** cláusula opcional, com prêmio adicional, que **elimina a depreciação**.
- **Perda total:** quando o dano chega a 75% ou mais do valor atual do bem.
- **Formas de pagar (cl. 24.3):** em dinheiro, trocando o bem por outro equivalente ou pagando o conserto.

### 3.3 Prova de que o bem existia (cl. 24.2.3)
Quando a existência dos bens fica difícil de comprovar, valem a **nota fiscal**, o **cupom fiscal**, o **certificado de garantia** ou a **relação de bens anexada na proposta** ou na apólice. Outras formas ficam a critério da seguradora.

### 3.4 O que não é coberto (cl. 6 e coberturas)
- **Nunca no padrão:** joias, relógios, pedras e metais preciosos, obras de arte, raridades e coleções (estas só com cobertura específica e listadas na apólice); dinheiro, cheques e cartões; veículos; animais; remédios, comida, bebida e perfumes; bens fora do imóvel.
- **Roubo com arrombamento:** não cobre **bicicletas** fora da residência (ou fora do box fechado, em apartamento), **drones** nem **residência desocupada**. A bicicleta tem cobertura própria e precisa estar identificada na apólice.
- **Danos elétricos:** não cobre desgaste, defeito de instalação, falta de manutenção, **dano mecânico**, dano causado por água (exceto em vendaval) nem defeito anterior à contratação. Participação do segurado de até **10%** dos prejuízos, com valor mínimo. No app atual aparece "10%, mínimo R$ 450".

---

## 4. O que fazer com os nossos dados

### 4.1 O que temos e o que falta
- **Temos:**
  - compras de 36 meses por categoria (móveis, eletrodomésticos, eletrônicos);
  - bens cadastrados com a probabilidade de estarem no imóvel;
  - área (61% faltando, mas estimável pelo IPTU e pela energia);
  - dependentes; tipo do imóvel; condomínio; financiamento.
- **Não temos:** a data de cada compra (só a janela de 36 meses), bens com mais de 3 anos, joias e itens de coleção. Estes últimos não são cobertos de qualquer forma.

**Medido na base de desenvolvimento:**
- As compras de 36 meses têm **mediana de R$ 235/m²** (R$ 162 a R$ 388 entre o 1º e o 3º quartil).
- Elas acompanham **muito mais a renda** (correlação de 0,84) do que a área (0,36).
- Divisão típica: móveis 38%, eletrodomésticos 32%, eletrônicos 28%.

### 4.2 Método proposto: três âncoras e uma faixa
1. **Âncora comprovada (mínimo):** compras de 36 meses + bens cadastrados com vínculo ALTO. É o que o banco consegue provar.
2. **Âncora de estoque (máximo):** uma casa não tem só o que comprou em 3 anos. Em regime estável, o estoque a valor de reposição é aproximadamente *compras por ano × vida útil média*. Com vida útil de ~8 anos (coerente com a tabela de depreciação), fica **≈ 2,7 × compras de 36 meses**. *Premissa nossa, a calibrar.*
3. **Âncora por área (conferência):** área × R$/m² da faixa do cliente na base. Serve para conferir casos fora da curva e para quem não tem compras no BB.

O cliente vê a faixa e confirma com um toque ("Tenho menos / É isso / Tenho mais"). A resposta fecha a faixa e muda a confiança de "estimado" para "confirmado".

### 4.3 Da faixa de bens para cada cobertura
Como não há rateio, cada limite deve cobrir **a maior perda provável naquela cobertura**:

| Cobertura | Base do limite | Por quê |
|---|---|---|
| Roubo com arrombamento | Eletrônicos + portáteis (notebook, celular, videogame) | O ladrão leva o que é pequeno e caro, não o sofá |
| Danos elétricos | Eletrônicos + eletrodomésticos | Só o que liga na tomada; dano mecânico não entra |
| Incêndio (casa) | Reconstrução + conteúdo | Com limite único, o prédio tem prioridade; sem somar o conteúdo, os bens ficam sem proteção numa perda total |
| Incêndio (apartamento ou financiado) | Conteúdo + benfeitorias internas | A estrutura é segundo risco (cl. 15.2): quem paga primeiro é o seguro do condomínio ou do financiamento |

### 4.4 Exemplos de indenização para mostrar ao cliente
Valores ilustrativos, com a tabela da cl. 24.2.2 e a participação do app atual (10%, com mínimos de R$ 400 para roubo e R$ 450 para danos elétricos):

| Situação | Valor de novo hoje | Depreciação | Valor atual | Participação | **Recebe** | Com Valor de Novo |
|---|---|---|---|---|---|---|
| Roubaram notebook de 2 anos | R$ 4.000 | 30% | R$ 2.800 | R$ 400 | **R$ 2.400** | R$ 3.600 |
| Raio queimou TV de 3 anos | R$ 3.000 | 30% | R$ 2.100 | R$ 450 | **R$ 1.650** | R$ 2.550 |
| Raio queimou geladeira de 1 ano | R$ 4.000 | 0% | R$ 4.000 | R$ 450 | **R$ 3.550** | R$ 3.550 |

Mostrar isso **em reais** resolve a desconfiança ("na hora H não pagam") e explica a franquia sem jargão.

### 4.5 Exemplo com o caso da demonstração (CASO_00005)
- Compras de 36 meses: eletrônicos R$ 8.800, eletrodomésticos R$ 2.850, móveis R$ 9.100, total de **R$ 20.750**.
- Faixa de bens: **R$ 21 mil (comprovado) a ≈ R$ 56 mil (estoque estimado)**.
- Apartamento **e** financiado: a estrutura fica em segundo risco. O incêndio deve focar no conteúdo, não nos R$ 260 mil de reconstrução.
- Vidraçaria de R$ 11.000 em 24 meses: quebra de vidros acima do padrão de R$ 1.500.

---

## 5. Ajustes recomendados no protótipo (base: versão com gerente)

1. **Tirar "joias ou relógios"** da lista de itens de valor (não são cobertos) e trocar por **celular ou tablet** e **videogame**.
2. **Bicicleta:** em vez de somar no roubo, sugerir a **cobertura de bicicleta**, que é própria e exige a bike identificada na apólice.
3. **Incêndio em apartamento ou imóvel financiado:** limite focado em conteúdo, explicando o segundo risco em uma frase ("o seguro do condomínio paga a estrutura primeiro").
4. **Mostrar a indenização em reais** com depreciação: um exemplo por cobertura, como na tabela 4.4.
5. **Oferecer a cláusula de Valor de Novo** como adicional para quem tem muitos eletrônicos.
6. **Anexar a relação de bens à proposta** (com consentimento): "Sua lista de bens fica guardada na apólice e vale como comprovação se algo acontecer."
7. **Imóvel de veraneio:** avisar que roubo não cobre casa desocupada.

---

## 6. Fontes

**Produto BB Seguros**
- [Condições Gerais e Especiais, Seguro Residencial, versão 1.4 (SUSEP 15414.606453/2020-10)](https://assets-bbseguros.cld.brasilseg.com.br/2025-07/CG_SEGURO_RESIDENCIAL_V-14.pdf)
- [BB Seguro Residencial Estilo, condições gerais (versão anterior, com fórmula linear de depreciação)](https://assets-bbseguros.cld.brasilseg.com.br/2021-12/condicoes-gerais-residencial-estilo-v30-21072014.pdf)

**Alemanha (valor por m²)**
- [Finanztip: renúncia ao subseguro](https://www.finanztip.de/hausratversicherung/unterversicherungsverzicht/)
- [CHECK24: valores segurados](https://www.check24.de/hausratversicherung/versicherungssumme/)
- [Allianz Direct: renúncia ao subseguro](https://www.allianzdirect.de/hausratversicherung/unterversicherungsverzicht-ratgeber/)
- [ERGO: renúncia ao subseguro](https://www.ergo.de/de/Ratgeber/zuhause/unterversicherungsverzicht)
- [Die Versicherer (GDV): subseguro no conteúdo](https://www.dieversicherer.de/versicherer/wohnen/news/unterversicherung-hausrat-143936)

**EUA (% do imóvel, valor atual × reposição)**
- [Policygenius: cobertura C](https://www.policygenius.com/homeowners-insurance/personal-property-insurance)
- [Bankrate: seguro de bens pessoais](https://www.bankrate.com/insurance/homeowners-insurance/personal-property-insurance)
- [Lemonade: cobertura de bens](https://www.lemonade.com/homeowners/explained/personal-property)
- [Bankrate: custo de reposição](https://www.bankrate.com/insurance/homeowners-insurance/replacement-cost/)
- [Open Exam Prep: valor atual × reposição](https://open-exam-prep.com/study-guides/ct-property-casualty/national-pc-homeowners-1/pcnat-4-4-replacement-cost-acv-loss-settlement)

**Reino Unido (calculadoras e modelo pelo endereço)**
- [Verisk Contents Insight](https://www.verisk.com/en-gb/products/contents-insight/)
- [Verisk: simplificar demais a cobertura de conteúdo](https://www.verisk.com/en-gb/blog/oversimplifying-contents-cover-creates-challenges-for-home-insurers/)
- [Swinton: calculadora de conteúdo](https://www.swinton.co.uk/home-insurance/contents-calculator)
- [Aviva: calculadora de conteúdo](https://www.aviva.co.uk/insurance/home-products/home-insurance/contents-insurance-calculator/)

**Inventário por IA**
- [NerdWallet: apps de inventário doméstico](https://www.nerdwallet.com/article/insurance/home-inventory-insurance)
- [HomeZada: IA de visão para inventário](https://zen.homezada.com/2024/02/19/homezada-launches-ai-vision-for-easiest-and-most-powerful-home-inventory-application/)

**Brasil (prática e depreciação)**
- [Genebra Seguros: depreciação no seguro residencial](https://www.genebraseguros.com.br/faq-items/como-funciona-a-depreciacao-no-seguro)
- [Economic News Brasil: nota fiscal na indenização](https://economicnewsbrasil.com.br/2026/01/29/indenizacao-do-seguro-residencial-nota-fiscal/)
- [Serasa: danos elétricos no seguro residencial](https://www.serasa.com.br/seguros/blog/danos-eletricos-no-seguro-residencial/)

**Limitações:** as fontes estrangeiras são, na maior parte, de seguradoras e comparadores. A âncora de estoque (2,7 × compras de 36 meses) é uma premissa nossa que precisa ser validada. Os valores de participação mínima vêm dos prints do app atual, não das condições gerais.
