# Base do Seguro Residencial

## Uso do pacote
Os arquivos fornecem sinais para que a equipe verifique elegibilidade, recomende um plano por combinação cliente-imóvel e detalhe as faixas das coberturas aplicáveis.

## Natureza dos dados
Todos os clientes, imóveis, bens, compras, transações e endereços são fictícios. Município, UF e código IBGE são referências territoriais reais; os demais elementos do endereço não correspondem a domicílios reais.

## Relações econômicas
IPTU, condomínio, energia, água, aluguel e financiamento apresentam relações plausíveis com área, município, padrão, renda e ocupação, preservando dispersão e incerteza. O plano deve resultar da combinação dos sinais e das regras do produto.

## Template de resultado
Em `template_resultado_times.csv`, preencha uma linha por cliente-imóvel, incluindo elegibilidade, plano recomendado, justificativa, confiança e perguntas de confirmação.

## Template de coberturas
O arquivo `template_coberturas_times.csv` contém apenas o cabeçalho. Para cada combinação cliente-imóvel, a equipe deverá registrar todas as coberturas fixas que compõem o plano recomendado e eventuais coberturas adicionais aplicáveis. Para cada cobertura dimensionável, deverá apresentar faixa mínima e máxima em reais, nível de confiança, dados utilizados, regra de cálculo, justificativa e informações que precisam ser confirmadas. Uma confiança baixa não dispensa a apresentação de uma faixa quando houver base minimamente defensável. A ausência de estimativa deverá ser excepcional e justificada.

O arquivo `catalogo_coberturas_fixas_planos.csv` apresenta a nomenclatura de referência para conferência da entrega. As assistências acompanham o plano e não são registradas como coberturas.

## Liberdade analítica
A base não impõe categorias de risco. Features estimadas podem ser utilizadas, recalculadas, substituídas ou ignoradas, desde que a decisão seja explicada. Não é obrigatório usar machine learning.

## Métricas
Use métricas adequadas à abordagem, como casos processados, recomendações explicadas, perguntas de confirmação, baixa confiança, estabilidade, elegibilidade, completude, tempo, consistência, sensibilidade das faixas, falhas e reprodutibilidade.

## Tecnologias, IA e fontes externas
Python não é obrigatório. Quando usado, documente a versão e dependências. Outras tecnologias podem ser utilizadas se forem permitidas, demonstráveis e documentadas. O uso de IA deve ser declarado, e a equipe deve compreender e defender a solução. Dados externos devem ser públicos ou autorizados, com fonte, data, método e limitações.

## Recomendações desejáveis
- diferenciar dado disponível, sugestão e confirmação;
- reduzir e priorizar perguntas;
- demonstrar casos contrastantes;
- permitir uso em One Click Buy, atendimento assistido e agentes autônomos;
- documentar testes de coerência e tratamento de valores extremos.
