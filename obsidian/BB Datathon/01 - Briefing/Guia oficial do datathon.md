---
tags: [briefing, oficial]
fonte: Guia_Times_Datathon_Protecao_Inteligente_Final.docx
recebido: 2026-10-27
---
# Guia oficial do datathon (texto completo)

> Cópia fiel do guia enviado pela organização. Resumo em [[Desafio - resumo]]. No repositório: `docs/guia_datathon.md`.

DATATHON

## Proteção Inteligente
Guia dos times

| ESCOLHA UM DESAFIO: SEGURO RESIDENCIAL OU SEGURO EMPRESARIAL |
|---|

Sinais → sugestão inicial → confiança → confirmação → recomendação
One Click Buy · atendimento assistido · futuros agentes autônomos

## 1. O desafio em 60 segundos
Construir uma lógica de recomendação de proteção clara, contextualizada e reutilizável em diferentes jornadas. O objetivo é usar sinais disponíveis, respeitar as regras do produto, indicar o nível de confiança, confirmar as informações necessárias e recomendar uma proteção que o cliente consiga compreender e comparar.

| ENTRADA: CLIENTE + IMÓVEL OU NEGÓCIO + SINAIS DISPONÍVEIS  →  SAÍDA: PLANO + COBERTURAS + FAIXAS + MOTIVOS |
|---|


## O MVP deve responder
O caso é elegível para contratação?
Quais informações mínimas faltam para realizar a cotação?
Qual plano, coberturas e faixas de valores fazem sentido?
Quais dados foram observados, estimados ou confirmados?
Por que a recomendação é adequada e quais alternativas existem?
Como a mesma lógica pode apoiar jornada digital, atendimento assistido e agentes autônomos?

## Guardrails
Use apenas os dados disponibilizados e fontes externas públicas ou devidamente autorizadas.
Aplique as regras de elegibilidade antes de recomendar.
Não utilize dados sensíveis ou atributos pessoais como atalho para risco ou patrimônio.
Não apresente estimativas como fatos confirmados.
Toda recomendação deve ser explicável, revisável e permitir confirmação humana.

## 2. Cronograma e entregas

| Data / horário | Atividade |
|---|---|
| 27/10 · 11h00–11h55 | Abertura conjunta, produtos, regras, escolha do desafio e divisão dos times. |
| 27/10 · 11h55–12h45 | Trilhas paralelas: jornada, bases, inteligência e dúvidas. |
| 27/10 · tarde/noite | Exploração dos dados, proposta e desenho do MVP. |
| 28/10 · tarde/noite | Construção, mentorias, base comum de teste, ajustes e gravação. |
| 29/10 · até 10h | Entrega obrigatória de todos os materiais. |
| 29/10 | Apresentação dos trabalhos para a banca. |


## Tempo de apresentação
Vídeo gravado: duração máxima de 5 minutos.
Pitch para a banca: 5 minutos de apresentação.
Perguntas da banca: 5 minutos.

| A ENTREGA COMPLETA ATÉ 10H DE 29/10 É REQUISITO PARA APRESENTAÇÃO À BANCA |
|---|


## 3. Como ler as bases

| Natureza | Significado |
|---|---|
| Cadastral / observado | Informação simulada como disponível diretamente. |
| Derivado | Resultado de fórmula documentada. |
| Estimado | Sugestão baseada em sinais e premissas. |
| Confiança | Quanto os dados apoiam a sugestão. |
| Origem | Dados utilizados na análise. |
| Limitação | O que não pode ser concluído sem confirmação. |


## Base comum de teste
Todos os times receberão os mesmos casos. A unidade de resultado será cliente + imóvel no Residencial e empresa + estabelecimento no Empresarial. A equipe deverá processar todos os casos e preencher os dois templates de saída.

## Território e dados externos
Município, UF e código IBGE representam territórios reais. Logradouro, número, complemento, CEP agregado e coordenadas são fictícios ou perturbados. A base não fornece índices de alagamento, vendaval ou furto. O enriquecimento externo é opcional e deverá registrar fonte, data de acesso, nível geográfico, método, transformação e limitações.

## 4. Diretrizes para desenvolvimento da solução
Planeje e desenvolva uma solução orientada por dados capaz de apoiar a recomendação de planos, coberturas e faixas de valores de forma consistente, transparente e fundamentada. A solução poderá apoiar jornadas digitais, como One Click Buy, atendimento assistido por gerente ou central e, futuramente, agentes autônomos.

## A proposta deverá
Compreender o contexto do cliente, imóvel ou negócio.
Identificar bens, interesses, necessidades e situações relevantes para a proteção.
Verificar as condições de elegibilidade antes de recomendar.
Combinar diferentes sinais, sem depender de uma única variável.
Recomendar um plano para cada cliente-imóvel ou empresa-estabelecimento.
Registrar todas as coberturas fixas do plano recomendado e as adicionais aplicáveis.
Propor faixas mínima e máxima para as coberturas dimensionáveis.
Diferenciar informação disponível, sugestão inicial e informação confirmada.
Indicar nível de confiança, limitações e dados utilizados.
Formular perguntas objetivas para confirmar informações relevantes.
Justificar a recomendação e apresentar alternativas para comparação e decisão.
Não é obrigatório utilizar machine learning. Serão aceitas soluções baseadas em regras, modelos estatísticos, algoritmos de recomendação, sistemas híbridos, agentes, otimização ou outras abordagens justificadas.

## 5. Templates de resultado

## 5.1 Template de resultado consolidado
O arquivo `template_resultado_times.csv` possui uma linha por cliente-imóvel ou empresa-estabelecimento. Preencha, no mínimo:
Elegibilidade e motivo de inelegibilidade, quando aplicável.
Tipo, uso ou localização sugeridos, conforme o desafio.
Relação com o imóvel.
Plano recomendado.
Coberturas recomendadas.
Confiança geral.
Justificativa da recomendação.
Perguntas de confirmação.
Fontes públicas adicionais utilizadas.

## 5.2 Template de coberturas
O arquivo `template_coberturas_times.csv` contém apenas o cabeçalho. A equipe deverá criar uma linha para cada cobertura fixa do plano recomendado e para cada cobertura adicional aplicável.
Cobertura.
Faixa de valor mínima.
Faixa de valor máxima.
Confiança da estimativa.
Dados utilizados.
Regra de cálculo.
Justificativa.
Informação a confirmar.
Observação, quando necessária.

| CONFIANÇA BAIXA NÃO DISPENSA A FAIXA QUANDO HOUVER BASE MINIMAMENTE DEFENSÁVEL |
|---|

Os valores mínimo e máximo deverão ser informados em reais, apenas com números, sem símbolo de moeda, separador de milhar ou texto adicional. A ausência de estimativa deverá ser excepcional e justificada.

## Coberturas x assistências
As coberturas entram no template de coberturas. As assistências acompanham o plano e seguem os serviços, limites e quantidades definidos nos manuais oficiais; por isso, não recebem linhas no template de coberturas.

## 6. Entregáveis técnicos

| Item | Conteúdo mínimo |
|---|---|
| Templates preenchidos | Resultado de todos os casos da base comum e detalhamento das coberturas. |
| README.md | Identificação da equipe, desafio, objetivo, arquitetura, arquivos, execução, premissas, limitações, métricas, resultados e uso de IA. |
| Códigos e notebooks | Scripts, notebooks, regras, agentes, APIs, preparação dos dados e componentes necessários à demonstração. |
| Dependências | Quando houver Python: requirements.txt e versão registrada no README, .python-version ou runtime.txt. |
| Dados externos | Fonte, data de acesso, licença, método de obtenção, transformação e limitações. |
| Apresentação gravada | Vídeo com até 5 minutos, contendo problema, solução, demonstração, resultados, limitações e próximos passos. |
| Material consolidado | Todos os arquivos, links e instruções no local indicado pela organização. |


## Identificação da equipe
Informe nome da equipe, nome completo dos integrantes, desafio escolhido e instituição ou turma, quando necessário. Não inclua CPF, matrícula ou outro dado pessoal desnecessário.

## Relato opcional
A equipe poderá descrever brevemente caminhos testados, alternativas descartadas, dificuldades encontradas e decisões que levaram à versão final.

## 7. Regras técnicas
O projeto deverá estar em condições de execução ou demonstração sem falhas críticas.
Os dois templates deverão ser preenchidos para todos os casos da base comum.
Todas as coberturas fixas do plano recomendado deverão aparecer no detalhamento.
Coberturas adicionais poderão ser incluídas quando aplicáveis.
As faixas deverão ser expressas em reais.
A solução deverá diferenciar informação disponível, estimativa e confirmação.
Decisões relevantes deverão ser explicáveis e rastreáveis.
Credenciais, senhas, chaves e dados restritos não deverão ser incluídos.
O projeto completo deverá ser entregue até 10h de 29/10.

## Tecnologias
Python não é obrigatório. Quando houver desenvolvimento analítico em Python, deverá ser utilizada uma versão 3.x e as dependências deverão ser documentadas. Outras tecnologias poderão ser utilizadas, desde que estejam permitidas pela organização, sejam documentadas e possam ser demonstradas e analisadas.

## Uso de inteligência artificial
O uso de ferramentas de inteligência artificial é permitido como apoio. A equipe deverá declarar como utilizou essas ferramentas, compreender integralmente a solução entregue e ser capaz de explicar, executar e defender o código, as decisões, as recomendações e os resultados. A responsabilidade pela entrega permanece com a equipe.

## Dados externos e APIs
Os dados externos deverão ser públicos ou devidamente autorizados. Quando a redistribuição for permitida, disponibilize uma cópia ou recorte dos dados utilizados. Quando não for permitida, forneça a fonte, instruções de obtenção, código de coleta, data de acesso e amostra suficiente para execução ou demonstração.

## 8. Evidências e métricas
A qualidade da solução deverá ser demonstrada com evidências objetivas e métricas adequadas à abordagem adotada. Não é necessário apresentar acurácia, precisão, recall ou AUC quando não houver um problema supervisionado e um rótulo apropriado.

## Exemplos de métricas aplicáveis
Percentual de casos processados.
Percentual de recomendações com justificativa.
Cumprimento das regras de elegibilidade.
Completude dos templates e das coberturas fixas.
Quantidade média de perguntas de confirmação.
Percentual de casos com confiança baixa.
Estabilidade das recomendações.
Consistência entre casos semelhantes.
Sensibilidade das faixas a mudanças relevantes.
Tempo de execução e taxa de falhas.
Reprodutibilidade do processo.
Consistência entre plano recomendado e coberturas detalhadas.
Métricas estatísticas ou de machine learning, quando aplicáveis.
Se a equipe utilizar modelo supervisionado, rótulo próprio ou fonte externa, deverá documentar a origem do rótulo, metodologia de construção, divisão entre treino/validação/teste, métricas escolhidas, limitações e possíveis riscos de leakage.

## 9. Seguro Residencial

## 9.1 Elegibilidade e informações para cotação

### Pode ser considerado
Casa, casa em condomínio ou apartamento, com uso residencial, residencial e comercial (MEI) ou de lazer/veraneio.
Imóvel próprio, financiado, alugado ou sob gestão do proponente.
Uso misto com atividade MEI no interior da residência, limitado às atividades da lista de MEI aceitas; demais atividades devem ser direcionadas ao Seguro Empresarial.
Proponente pessoa física ou jurídica, correntista ou não, conforme regras do produto.
- Casas de madeira pré-fabricadas, desde que em conformidade com as normas da ABNT e do sistema autossustentável controlado pelo IBAMA.

### Não elegível (restrições de aceitação)
Imóvel localizado em comunidade carente ou favela.
Imóvel vinculado à atividade rural, exceto casa sede e demais dependências de uso pessoal e doméstico sem relação com a atividade rural.
Imóvel tombado, desapropriado ou condenado por órgão público.
Imóvel em construção, reforma ou reconstrução.
Construção em material combustível, exceto casas de madeira pré-fabricadas na condição especial acima.
Endereço de risco que já possua seguro residencial da BB Seguros (é vedada mais de uma proposta para o mesmo endereço).

### Informações mínimas para cotação
Identificação do proponente e do imóvel.
CEP ou localização, tipo e uso do imóvel.
Relação com o imóvel.
- Objeto do seguro: imóvel e conteúdo, com limite único. Em imóvel alugado, indicar beneficiários distintos para o imóvel (locador) e para o conteúdo (locatário).
Condições de elegibilidade.
Plano recomendado.
Faixas para as coberturas aplicáveis.
Coberturas adicionais ou exclusões permitidas.
Confirmações necessárias quando os sinais forem insuficientes.

## 9.2 Planos, coberturas e assistências residenciais

### Matriz de coberturas por plano

| Coberturas | Essencial | Prático | Total |
|---|---|---|---|
| Incêndio, Queda de Raio, Explosão e Fumaça | ✓ | ✓ | ✓ |
| Vendaval, Furacão, Tornado, Ciclone e Granizo | ✓ | ✓ | ✓ |
| Danos elétricos | ✓ | ✓ | ✓ |
| Queda de aeronave e impacto de veículos terrestres | ✓ | ✓ | ✓ |
| Danos por água | ✓ | ✓ | ✓ |
| Instalações e Pequenos Reparos | ✓ | ✓ | ✓ |
| Quebra de vidros | ✗ | ✓ | ✓ |
| Roubo ou furto de bens mediante arrombamento | ✗ | ✓ | ✓ |
| Despesas emergenciais | ✗ | ✗ | ✓ |
| Responsabilidade civil familiar | ✗ | ✗ | ✓ |
| Perda ou Pagamento de aluguel | ✗ | ✗ | ✓ |

As seis primeiras coberturas são obrigatórias em todos os planos.

### Coberturas e assistências por plano

| Plano | Coberturas fixas | Pacotes de assistência |
|---|---|---|
| ESSENCIAL | Incêndio, queda de raio, explosão e fumaça; vendaval, furacão, tornado, ciclone e granizo; danos elétricos; queda de aeronave e impacto de veículos terrestres; danos por água; instalações e pequenos reparos. | Casa em Apuros. |
| PRÁTICO | Tudo do Essencial + quebra de vidros + roubo ou furto de bens mediante arrombamento. | Casa em Apuros + Casa Funcionando + Casa Arrumada + Casa Limpa. |
| TOTAL | Tudo do Prático + despesas emergenciais + responsabilidade civil familiar + perda ou pagamento de aluguel. | Tudo do Prático + Casa sem Pragas + Casa Segura + Benefício Premium (assistente virtual, fechadura eletrônica ou decoração online). |


### O que pode ser customizado no Residencial
- Coberturas do Plano Essencial: são fixas em todos os planos e não podem ser excluídas; apenas a importância segurada pode ser ajustada dentro dos limites do produto.
- Coberturas adicionais dos planos Prático e Total (roubo ou furto mediante arrombamento, quebra de vidros, responsabilidade civil familiar, perda ou pagamento de aluguel e despesas emergenciais): podem ser incluídas ou excluídas, com ajuste da importância segurada.
- Assistências: não podem ser customizadas; acompanham o pacote do plano escolhido.
- Benefício Premium: exclusivo do Plano Total, um por ano de vigência, sem alteração do valor do prêmio.
- Vigência de 1 a 5 anos; para não correntistas, somente vigência de 1 ano.

### Serviços de assistência
Casa em Apuros: chaveiro, eletricista, encanador, desentupimento, cobertura provisória de telhado e limpeza após sinistro.
Casa Funcionando: conserto de eletrodomésticos, instalação e conversão de fogão e cooktop, ar-condicionado e televisão.
Casa Arrumada: pequenos serviços de instalação, fixação, montagem, descarte e organização.
Casa Limpa: limpeza de calhas, ralos, sifões, caixa de gordura, ar-condicionado, caixa d’água, placa solar e caçamba.
Casa sem Pragas: desinsetização.
Casa Segura: check-up residencial (idosos, crianças e pessoas com necessidades especiais), olho mágico, manutenção de aquecedor a gás, película de box, fechadura eletrônica e tela de proteção.
Consulte os manuais oficiais para limites, quantidade de acionamentos, abrangência e condições de utilização.

## 10. Seguro Empresarial

## 10.1 Elegibilidade e informações para cotação

### Pode ser considerado
Pessoa física ou jurídica, inclusive MEI, correntista ou não do BB.
Proprietário ou inquilino de imóvel utilizado por comércio, indústria ou prestação de serviços.
Imóvel (prédio) e/ou conteúdo, com limite único.
Atividades aceitas pelo produto e estabelecimento enquadrado nas condições de contratação.
- Cobertura básica (incêndio, queda de raio, explosão e fumaça) de até R$ 7,5 milhões; acima desse valor, o caso deve ser direcionado ao Seguro Personalizado Empresarial.
- Estabelecimentos em shopping center com segurança própria, brigada de incêndio, hidrantes e sprinklers têm desconto no prêmio.

### Não elegível (restrições de aceitação)
Atividade rural.
Imóvel localizado em comunidade carente, favela ou área rural.
Imóvel tombado, desapropriado ou condenado por órgão público.
Imóvel em construção, reforma ou reconstrução.
Construção com parede externa em material combustível.
Objeto já segurado por outra proposta de seguro empresarial da BB Seguros (é vedada mais de uma proposta para o mesmo objeto).

### Informações mínimas para cotação
Identificação da empresa ou proponente, CNPJ/CPF e CNAE ou atividade efetiva.
Endereço, tipo do estabelecimento e relação com o imóvel.
O que será protegido: prédio, conteúdo ou ambos.
Condições de elegibilidade do local e da atividade.
Faturamento, empregados e informações operacionais relevantes.
Faixas de prédio, conteúdo, estoque, equipamentos, despesas fixas e aluguel.
Plano recomendado e coberturas compatíveis com a atividade.
Confirmações sobre refrigeração, delivery, home office, valores em caixa, equipamentos eletrônicos, segurança e controles digitais.

## 10.2 Planos, coberturas e assistências empresariais

### Matriz de coberturas por plano

| Coberturas | Essencial | Prático | Total |
|---|---|---|---|
| Incêndio, Queda de Raio, Explosão e Fumaça | ✓ | ✓ | ✓ |
| Danos elétricos | ✓ | ✓ | ✓ |
| Perda ou Pagamento de aluguel | ✓ | ✓ | ✓ |
| Responsabilidade Civil – Estabelecimento | ✓ | ✓ | ✓ |
| Despesas Fixas | ✓ | ✓ | ✓ |
| Proteção Cibernética | ✓ | ✓ | ✓ |
| Vendaval, Furacão, Tornado, Ciclone e Granizo | ✗ | ✓ | ✓ |
| Roubo ou Furto de bens mediante arrombamento | ✗ | ✓ | ✓ |
| Quebra de vidros | ✗ | ✗ | ✓ |
| Responsabilidade Civil – Empregador | ✗ | ✗ | ✓ |

As seis primeiras coberturas, incluindo a Proteção Cibernética, são obrigatórias em todos os planos.

### Coberturas e assistências por plano

| Plano | Coberturas fixas | Pacotes de assistência |
|---|---|---|
| ESSENCIAL | Incêndio, queda de raio, explosão e fumaça; danos elétricos; perda ou pagamento de aluguel; responsabilidade civil estabelecimento; despesas fixas; proteção cibernética. | Empresa em Apuros + Proteção Digital. |
| PRÁTICO | Tudo do Essencial + roubo ou furto de bens mediante arrombamento + vendaval, furacão, tornado, ciclone e granizo. | Tudo do Essencial + Empresa Funcionando + Empresa Arrumada + Empresa Limpa. |
| TOTAL | Tudo do Prático + quebra de vidros + responsabilidade civil empregador. | Tudo do Prático + Empresa Segura + Empresa sem Pragas + Benefício Premium (detector de fumaça, câmera de vídeo wi-fi ou Plataforma Minu Biz). |


### Serviços de assistência
Empresa em Apuros: chaveiro, caça-vazamentos, cobertura provisória de telhado ou substituição de telhas, cobertura provisória de portas, janelas, divisórias e vitrines, desentupimento, eletricista, encanador e limpeza após sinistro.
Proteção Digital: serviços de apoio tecnológico previstos no manual.
Empresa Funcionando: conserto de eletrodomésticos, ar-condicionado, bebedouros, central telefônica, interfone, porta ondulada, computadores e notebooks; instalação de wi-fi; locação emergencial de eletrodomésticos.
Empresa Limpa: locação de caçamba, descarte sustentável e limpeza de ar-condicionado, caixa d’água, calhas e placa solar.
Empresa Arrumada: instalação de espelho, lustres ou spots, pias e cubas, tomadas e interruptores, torneiras, ventiladores de teto e montagem de prateleiras.
Empresa Segura: troca de segredo de fechadura, check-up nas instalações elétricas e hidráulicas, instalação de câmera de monitoramento, fechadura eletrônica e interfone, verificação de extintores e vigia.
Empresa sem Pragas: dedetização, descupinização e desratização.

### O que pode ser flexibilizado ou adaptado no Empresarial

| Grupo | Coberturas | Regra de flexibilização |
|---|---|---|
| Fixas (obrigatórias em todos os planos) | Incêndio, queda de raio, explosão e fumaça; danos elétricos; perda ou pagamento de aluguel; responsabilidade civil estabelecimento; despesas fixas; proteção cibernética. | Não podem ser excluídas. Apenas a importância segurada pode ser ajustada, respeitando os limites do produto (cobertura básica até R$ 7,5 milhões). |
| Padrão dos planos Prático e Total | Roubo ou furto de bens mediante arrombamento; vendaval, furacão, tornado, ciclone e granizo; quebra de vidros e responsabilidade civil empregador (Total). | Compõem o pacote sugerido do plano. Podem ser incluídas ou excluídas na customização, com ajuste da importância segurada. |
| Específicas da atividade (planos Prático e Total) | Home Office; Delivery; deterioração de mercadorias em ambientes frigorificados; roubo ou furto de valores mediante arrombamento. | Inclusão opcional quando compatível com a atividade exercida pela empresa. |
| Opcionais em qualquer plano | Tumultos, greves e locautes; recomposição de registros e documentos; impacto de veículos terrestres e queda de aeronave; letreiros e anúncios luminosos; derrame acidental de água (sprinklers); equipamentos eletrônicos sem cobertura de roubo; riscos diversos – bens e mercadorias ao ar livre; RC garagista (compreensiva); RC danos morais; lucro bruto simples; lucro líquido simples; lucro bruto ampla; lucro líquido ampla. | Inclusão opcional em qualquer plano, conforme atividade e condições de aceitação. |
| Assistências | Pacotes definidos para cada plano. | Não podem ser customizadas; acompanham o plano escolhido. |

- No template de coberturas, registre todas as coberturas fixas do plano recomendado, inclusive a Proteção Cibernética, e as coberturas adicionais aplicáveis.
- Vigência de 1 a 5 anos; os planos são uma sugestão de pacote de coberturas e valores.
Consulte os materiais oficiais para limites, abrangência e condições de contratação.

## 11. Critérios de avaliação

| Critério | Peso | O que será observado |
|---|---|---|
| Adequação da proteção | 20% | Elegibilidade, coerência do plano, coberturas fixas, adicionais pertinentes, faixas e alternativas. |
| Inovação e diferencial | 20% | Proposta de valor, originalidade, redução de esforço e aplicação multicanal. |
| Qualidade da jornada | 15% | Simplicidade, clareza, perguntas objetivas, comparação e autonomia do cliente. |
| Uso inteligente dos dados | 15% | Tratamento crítico, coerência, enriquecimento, combinação de sinais e documentação. |
| Explicabilidade e incerteza | 10% | Motivos, confiança, limitações, informações a confirmar e rastreabilidade. |
| Viabilidade técnica e de negócio | 10% | Execução, arquitetura, integração, escalabilidade, manutenção e potencial de piloto. |
| Privacidade e responsabilidade | 10% | Dados autorizados, minimização, vieses, controle humano, segurança e uso transparente de IA. |


## 12. Estrutura sugerida para a banca
A equipe pode adotar outro formato, mas a apresentação de 5 minutos precisa permitir que a banca compreenda problema, solução, funcionamento e valor.

| Bloco | Conteúdo sugerido |
|---|---|
| 1. Contexto | Problema da jornada escolhido e impacto esperado. |
| 2. Usuário e canal | One Click Buy, atendimento assistido, agente autônomo ou combinação. |
| 3. Dados | Arquivos e sinais utilizados; descartes e justificativas. |
| 4. Elegibilidade | Como casos não aceitos são tratados. |
| 5. Funcionamento | Como sinais viram sugestão, confiança, confirmação e recomendação. |
| 6. Caso concreto | Plano, coberturas, faixas e justificativas. |
| 7. Demonstração | Jornada funcionando do início ao resultado. |
| 8. Evidências | Resultados da base comum, métricas e casos contrastantes. |
| 9. Responsabilidade | Privacidade, vieses, limitações, IA e controle humano. |
| 10. Evolução | Arquitetura, integração, escala e próximos passos. |


## 13. Links e fontes oficiais
Seguro Residencial - visão geral
Seguro Residencial - planos e assistências
Seguro Empresarial - visão geral
Seguro Empresarial - planos e assistências
Portal BB Seguros
IBGE - dados territoriais
Receita Federal - dados de CNPJ

## Documentos técnicos
Condições Gerais - Seguro Residencial
Condições Gerais - Seguro Empresarial
Manual de Assistências - Residencial Essencial
Manual de Assistências - Residencial Prático
Manual de Assistências - Residencial Total
Manual de Assistências - Empresarial Essencial
Manual de Assistências - Empresarial Prático
Manual de Assistências - Empresarial Total

| EM CASO DE CONFLITO, PREVALECEM AS CONDIÇÕES CONTRATUAIS E AS ORIENTAÇÕES OFICIAIS DA BRASILSEG / BB SEGUROS |
|---|


Ligações: [[Desafio - resumo]] · [[Regras e contexto]] · [[Critérios de avaliação]] · [[Elegibilidade residencial]] · [[Templates de entrega]]
