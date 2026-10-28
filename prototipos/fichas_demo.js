// Gerado por motor/gerar.py. Não edite à mão.
window.FICHAS_DEMO = {
 "casos": {
  "one_click_limpo": "IMO_CASO_00005_01",
  "inquilino_total": "IMO_CASO_00008_01",
  "elegibilidade_a_confirmar": "IMO_CASO_00003_01"
 },
 "fichas": {
  "IMO_CASO_00005_01": {
   "cliente_id": "CASO_00005",
   "imovel_id": "IMO_CASO_00005_01",
   "local": "Curitiba/PR",
   "complemento": "BLOCO B APTO 305",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 62
   },
   "campos": {
    "tipo": {
     "valor": "APARTAMENTO",
     "natureza": "INFERIDO",
     "confianca": "ALTA",
     "fonte": "termo 'apartamento' no endereço; confirmado pelo complemento",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "diverge": false,
     "peso": 0.9
    },
    "vinculo": {
     "valor": "FINANCIADO",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "parcela de financiamento de R$ 950/mês",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9
    },
    "area": {
     "valor": 110,
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "área cadastrada (CADASTRO_IPTU)",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "min": 110.0,
     "max": 110.0,
     "peso": 0.9
    },
    "bens": {
     "valor": 41052,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 20.750 nos últimos 36 meses (corrigidas pelo IPCA) e 3 bens vinculados (R$ 2.500 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 22190.48967259633,
     "max": 59914.322116010095,
     "categorias": {
      "eletronicos": {
       "min": 9410.906463558926,
       "max": 25409.4474516091
      },
      "eletrodomesticos": {
       "min": 3047.8503887662428,
       "max": 8229.196049668857
      },
      "moveis": {
       "min": 9731.732820271161,
       "max": 26275.678614732136
      }
     },
     "portateis": {
      "min": 9410.906463558926,
      "max": 25409.4474516091
     },
     "eletricos": {
      "min": 12458.756852325168,
      "max": 33638.643501277955
     },
     "molhaveis": {
      "min": 22190.48967259633,
      "max": 59914.322116010095
     },
     "peso": 0.566
    }
   },
   "valor_imovel": {
    "custo_m2": [
     2287.42,
     2738.93
    ],
    "reconstrucao_min": 252000,
    "reconstrucao_max": 301000,
    "segundo_risco": true
   },
   "elegibilidade": "SIM",
   "pendencias": [],
   "avisos": [],
   "plano": "PRATICO",
   "motivos": [
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "VIZINHOS",
     "texto": "em prédio ou condomínio, um vazamento ou incêndio pode atingir o vizinho"
    },
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "VIDROS",
     "texto": "há gastos recentes de R$ 11.000 com vidraçaria"
    }
   ],
   "motivos_plano": [
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "VIDROS",
     "texto": "há gastos recentes de R$ 11.000 com vidraçaria"
    }
   ],
   "pontos": {
    "pratico": 1,
    "total": 1
   },
   "alternativa": {
    "plano": "TOTAL",
    "texto": "Total: acrescenta o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais"
   },
   "por_que_nao_abaixo": "o Essencial não cobre roubo com arrombamento e quebra de vidros",
   "por_que_nao_acima": "o Total acrescenta o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais, mas os sinais ainda são fracos para isso",
   "coberturas": [
    {
     "cobertura": "INCENDIO_RAIO_EXPLOSAO_FUMACA",
     "tipo": "FIXA",
     "min": 100000,
     "max": 180000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 110–110 m² × R$ 2.287–R$ 2.739/m² (SINAPI–CUB PR) × 25%–40% (acabamentos) + bens",
     "justificativa": "Repor acabamentos e bens; a estrutura do prédio ou do financiamento tem seguro próprio.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Segundo risco (CG cl. 15.2): a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 18500,
     "max": 50000,
     "confianca": "MEDIA",
     "dados_utilizados": "bens molháveis, reconstrução",
     "regra": "50%–100% dos bens molháveis + 3%–8% da reconstrução (pisos e acabamentos)",
     "justificativa": "Paga danos aos bens e ao imóvel por chuva, alagamento ou cano rompido.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "VENDAVAL_GRANIZO",
     "tipo": "FIXA",
     "min": 5000,
     "max": 15000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo, reconstrução",
     "regra": "2%–5% da reconstrução",
     "justificativa": "Casa expõe telhado; apartamento expõe sobretudo janelas.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "IMPACTO_VEICULOS_TERRESTRES",
     "tipo": "FIXA",
     "min": 10000,
     "max": 10000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel",
     "regra": "padrão do produto (casa até R$ 20 mil)",
     "justificativa": "Impacto atinge muro, portão e fachada; baixa exposição em apartamento.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "QUEDA_AERONAVE",
     "tipo": "FIXA",
     "min": 10000,
     "max": 10000,
     "confianca": "MEDIA",
     "dados_utilizados": "padrão do produto",
     "regra": "padrão do produto",
     "justificativa": "Evento raro; valor padrão do produto.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "DANOS_ELETRICOS",
     "tipo": "FIXA",
     "min": 12500,
     "max": 30000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos e eletrodomésticos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos + eletrodomésticos: comprovado → estoque, a preço de hoje",
     "justificativa": "Picos de energia atingem o que liga na tomada; dano mecânico não é coberto.",
     "confirmar": "Principais aparelhos da casa",
     "observacao": ""
    },
    {
     "cobertura": "ROUBO_FURTO_ARROMBAMENTO",
     "tipo": "FIXA",
     "min": 9500,
     "max": 25000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos e portáteis: comprovado → estoque, a preço de hoje",
     "justificativa": "Repor o que costuma ser levado num arrombamento, a valor de reposição.",
     "confirmar": "Bens portáteis de maior valor",
     "observacao": "Não cobre joias, relógios, dinheiro, drones nem bicicleta fora de casa (CG cl. 6; Roubo 2.1)."
    },
    {
     "cobertura": "QUEBRA_DE_VIDROS",
     "tipo": "FIXA",
     "min": 2000,
     "max": 13000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel, gastos com vidraçaria 24m",
     "regra": "faixa por tipo, ampliada para 1,2 × o gasto com vidraçaria",
     "justificativa": "Janelas, box e tampos de vidro.",
     "confirmar": "Há vidros grandes (sacada, box, fachada)?",
     "observacao": ""
    }
   ],
   "perguntas": [
    {
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 22.000 e R$ 60.000?",
     "codigo": "BENS"
    }
   ],
   "perguntas_candidatas": 1,
   "confianca": "ALTA",
   "confianca_score": 77,
   "canal": "ONE_CLICK",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N (Sinduscon)",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4"
   ],
   "sinais": {
    "parcela": 950.0,
    "aluguel": 0.0,
    "vidracaria": 11000.0,
    "obra": 0.0
   }
  },
  "IMO_CASO_00008_01": {
   "cliente_id": "CASO_00008",
   "imovel_id": "IMO_CASO_00008_01",
   "local": "Fortaleza/CE",
   "complemento": "AP 204",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 93
   },
   "campos": {
    "tipo": {
     "valor": "APARTAMENTO",
     "natureza": "INFERIDO",
     "confianca": "ALTA",
     "fonte": "termo 'apartamento' no endereço; confirmado pelo complemento",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "diverge": false,
     "peso": 0.9
    },
    "vinculo": {
     "valor": "INQUILINO",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "aluguel recorrente de R$ 1.500/mês",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9
    },
    "area": {
     "valor": 125,
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "área cadastrada (CADASTRO_PUBLICO_MUNICIPAL)",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "min": 125.0,
     "max": 125.0,
     "peso": 0.9
    },
    "bens": {
     "valor": 36700,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 18.550 nos últimos 36 meses (corrigidas pelo IPCA) e 5 bens vinculados (R$ 7.750 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 19837.763056706597,
     "max": 53561.96025310781,
     "categorias": {
      "eletronicos": {
       "min": 8983.137987942611,
       "max": 24254.47256744505
      },
      "eletrodomesticos": {
       "min": 3796.445221094794,
       "max": 10250.402096955942
      },
      "moveis": {
       "min": 7058.179847669194,
       "max": 19057.085588706825
      }
     },
     "portateis": {
      "min": 8983.137987942611,
      "max": 24254.47256744505
     },
     "eletricos": {
      "min": 12779.583209037404,
      "max": 34504.874664400995
     },
     "molhaveis": {
      "min": 19837.763056706597,
      "max": 53561.96025310781
     },
     "peso": 0.566
    }
   },
   "valor_imovel": {
    "custo_m2": [
     1974.41,
     2510.74
    ],
    "reconstrucao_min": 247000,
    "reconstrucao_max": 314000,
    "segundo_risco": true
   },
   "elegibilidade": "SIM",
   "pendencias": [],
   "avisos": [],
   "plano": "TOTAL",
   "motivos": [
    {
     "plano": "TOTAL",
     "peso": 2,
     "codigo": "INQUILINO",
     "texto": "se o imóvel ficar inabitável, você continua pagando R$ 1.500 de aluguel"
    },
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "VIZINHOS",
     "texto": "em prédio ou condomínio, um vazamento ou incêndio pode atingir o vizinho"
    }
   ],
   "motivos_plano": [
    {
     "plano": "TOTAL",
     "peso": 2,
     "codigo": "INQUILINO",
     "texto": "se o imóvel ficar inabitável, você continua pagando R$ 1.500 de aluguel"
    },
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "VIZINHOS",
     "texto": "em prédio ou condomínio, um vazamento ou incêndio pode atingir o vizinho"
    }
   ],
   "pontos": {
    "pratico": 0,
    "total": 3
   },
   "alternativa": {
    "plano": "PRATICO",
    "texto": "Prático: mais barato, sem o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais"
   },
   "por_que_nao_abaixo": "o Prático não cobre o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais",
   "por_que_nao_acima": "",
   "coberturas": [
    {
     "cobertura": "INCENDIO_RAIO_EXPLOSAO_FUMACA",
     "tipo": "FIXA",
     "min": 100000,
     "max": 179000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 125–125 m² × R$ 1.974–R$ 2.511/m² (SINAPI–CUB CE) × 25%–40% (acabamentos) + bens",
     "justificativa": "Repor acabamentos e bens; a estrutura do prédio ou do financiamento tem seguro próprio.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Segundo risco (CG cl. 15.2): a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento. Imóvel alugado: beneficiários distintos (locador para o imóvel, locatário para o conteúdo)."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 17500,
     "max": 50000,
     "confianca": "MEDIA",
     "dados_utilizados": "bens molháveis, reconstrução",
     "regra": "50%–100% dos bens molháveis + 3%–8% da reconstrução (pisos e acabamentos)",
     "justificativa": "Paga danos aos bens e ao imóvel por chuva, alagamento ou cano rompido.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "VENDAVAL_GRANIZO",
     "tipo": "FIXA",
     "min": 5000,
     "max": 15500,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo, reconstrução",
     "regra": "2%–5% da reconstrução",
     "justificativa": "Casa expõe telhado; apartamento expõe sobretudo janelas.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "IMPACTO_VEICULOS_TERRESTRES",
     "tipo": "FIXA",
     "min": 10000,
     "max": 10000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel",
     "regra": "padrão do produto (casa até R$ 20 mil)",
     "justificativa": "Impacto atinge muro, portão e fachada; baixa exposição em apartamento.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "QUEDA_AERONAVE",
     "tipo": "FIXA",
     "min": 10000,
     "max": 10000,
     "confianca": "MEDIA",
     "dados_utilizados": "padrão do produto",
     "regra": "padrão do produto",
     "justificativa": "Evento raro; valor padrão do produto.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "DANOS_ELETRICOS",
     "tipo": "FIXA",
     "min": 13000,
     "max": 30000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos e eletrodomésticos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos + eletrodomésticos: comprovado → estoque, a preço de hoje",
     "justificativa": "Picos de energia atingem o que liga na tomada; dano mecânico não é coberto.",
     "confirmar": "Principais aparelhos da casa",
     "observacao": ""
    },
    {
     "cobertura": "ROUBO_FURTO_ARROMBAMENTO",
     "tipo": "FIXA",
     "min": 9000,
     "max": 24000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos e portáteis: comprovado → estoque, a preço de hoje",
     "justificativa": "Repor o que costuma ser levado num arrombamento, a valor de reposição.",
     "confirmar": "Bens portáteis de maior valor",
     "observacao": "Não cobre joias, relógios, dinheiro, drones nem bicicleta fora de casa (CG cl. 6; Roubo 2.1)."
    },
    {
     "cobertura": "QUEBRA_DE_VIDROS",
     "tipo": "FIXA",
     "min": 2000,
     "max": 5000,
     "confianca": "BAIXA",
     "dados_utilizados": "tipo do imóvel, gastos com vidraçaria 24m",
     "regra": "faixa por tipo, ampliada para 1,2 × o gasto com vidraçaria",
     "justificativa": "Janelas, box e tampos de vidro.",
     "confirmar": "Há vidros grandes (sacada, box, fachada)?",
     "observacao": ""
    },
    {
     "cobertura": "RESPONSABILIDADE_CIVIL_FAMILIAR",
     "tipo": "FIXA",
     "min": 41000,
     "max": 105000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel; SINAPI, CUB",
     "regra": "reparo de uma unidade vizinha: 70 m² × R$ 1.974–R$ 2.511/m² (SINAPI–CUB CE) × 30%–60%",
     "justificativa": "Paga danos que você cause a terceiros, como água descendo para o vizinho. Não usa dados da família.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "PERDA_PAGAMENTO_ALUGUEL",
     "tipo": "FIXA",
     "min": 9000,
     "max": 18000,
     "confianca": "ALTA",
     "dados_utilizados": "aluguel pago (transações)",
     "regra": "aluguel mensal × 6 a 12 meses",
     "justificativa": "Paga a moradia provisória, ou repõe o aluguel perdido, enquanto o imóvel é reparado.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "DESPESAS_EMERGENCIAIS",
     "tipo": "FIXA",
     "min": 2000,
     "max": 9000,
     "confianca": "MEDIA",
     "dados_utilizados": "faixa de incêndio",
     "regra": "2%–5% da faixa de incêndio",
     "justificativa": "Medidas urgentes para evitar que o dano aumente.",
     "confirmar": "",
     "observacao": ""
    }
   ],
   "perguntas": [
    {
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 20.000 e R$ 54.000?",
     "codigo": "BENS"
    }
   ],
   "perguntas_candidatas": 1,
   "confianca": "ALTA",
   "confianca_score": 77,
   "canal": "ONE_CLICK",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N (Sinduscon)",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4"
   ],
   "sinais": {
    "parcela": 0.0,
    "aluguel": 1500.0,
    "vidracaria": 0.0,
    "obra": 1500.0
   }
  },
  "IMO_CASO_00003_01": {
   "cliente_id": "CASO_00003",
   "imovel_id": "IMO_CASO_00003_01",
   "local": "Curitiba/PR",
   "complemento": "QUADRA 8 CASA 15",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 66
   },
   "campos": {
    "tipo": {
     "valor": "CASA",
     "natureza": "INFERIDO",
     "confianca": "ALTA",
     "fonte": "termo 'casa' no endereço, sem condomínio; confirmado pelo complemento",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "diverge": false,
     "peso": 0.9
    },
    "vinculo": {
     "valor": "PROPRIETARIO_LOCADOR",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "recebe crédito recorrente compatível com aluguel (R$ 8.350/mês)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673
    },
    "uso": {
     "valor": "RESIDENCIAL_LOCADO_A_TERCEIROS",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "não é o endereço principal e há crédito de aluguel",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673
    },
    "area": {
     "valor": 166,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "estimada pelo IPTU (R$ 2.650/ano) e energia (R$ 450/mês) comparados a imóveis de Curitiba",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "min": 121.99616517377838,
     "max": 212.54622528204342,
     "peso": 0.786
    },
    "bens": {
     "valor": 77159,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 39.000 nos últimos 36 meses (corrigidas pelo IPCA) e 4 bens vinculados (R$ 9.100 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 41707.42637259069,
     "max": 112610.05120599487,
     "categorias": {
      "eletronicos": {
       "min": 9678.261760819121,
       "max": 26131.30675421163
      },
      "eletrodomesticos": {
       "min": 12565.698971229247,
       "max": 33927.38722231897
      },
      "moveis": {
       "min": 19463.465640542323,
       "max": 52551.35722946427
      }
     },
     "portateis": {
      "min": 9678.261760819121,
      "max": 26131.30675421163
     },
     "eletricos": {
      "min": 22243.96073204837,
      "max": 60058.6939765306
     },
     "molhaveis": {
      "min": 41707.42637259069,
      "max": 112610.05120599487
     },
     "peso": 0.566
    }
   },
   "valor_imovel": {
    "custo_m2": [
     2287.42,
     2738.93
    ],
    "reconstrucao_min": 279000,
    "reconstrucao_max": 582000,
    "segundo_risco": false
   },
   "elegibilidade": "SIM",
   "pendencias": [
    {
     "codigo": "POSSIVEL_REFORMA",
     "prioridade": 100,
     "texto": "gastos de R$ 15.150 em material de construção em 24 meses podem indicar reforma, que impede a contratação",
     "pergunta": "Notamos R$ 15.150 em material de construção nos últimos 2 anos. O imóvel está em obra ou reforma agora?"
    }
   ],
   "avisos": [],
   "plano": "TOTAL",
   "motivos": [
    {
     "plano": "TOTAL",
     "peso": 2,
     "codigo": "RECEBE_ALUGUEL",
     "texto": "o imóvel rende cerca de R$ 8.350/mês de aluguel, que pode parar após um sinistro"
    },
    {
     "plano": "PRATICO",
     "peso": 2,
     "codigo": "BENS_ALTOS",
     "texto": "seus bens comprovados somam pelo menos R$ 41.707, acima da maioria dos clientes"
    },
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "CASA_SEM_CONDOMINIO",
     "texto": "a casa fica fora de condomínio, com mais exposição a arrombamento"
    }
   ],
   "motivos_plano": [
    {
     "plano": "TOTAL",
     "peso": 2,
     "codigo": "RECEBE_ALUGUEL",
     "texto": "o imóvel rende cerca de R$ 8.350/mês de aluguel, que pode parar após um sinistro"
    },
    {
     "plano": "PRATICO",
     "peso": 2,
     "codigo": "BENS_ALTOS",
     "texto": "seus bens comprovados somam pelo menos R$ 41.707, acima da maioria dos clientes"
    }
   ],
   "pontos": {
    "pratico": 3,
    "total": 2
   },
   "alternativa": {
    "plano": "PRATICO",
    "texto": "Prático: mais barato, sem o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais"
   },
   "por_que_nao_abaixo": "o Prático não cobre o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais",
   "por_que_nao_acima": "",
   "coberturas": [
    {
     "cobertura": "INCENDIO_RAIO_EXPLOSAO_FUMACA",
     "tipo": "FIXA",
     "min": 321000,
     "max": 600000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 122–213 m² × R$ 2.287–R$ 2.739/m² (SINAPI–CUB PR) + bens",
     "justificativa": "Reconstruir o imóvel e repor os bens; com limite único, o prédio é pago primeiro.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Limite único prédio + conteúdo, com prioridade do prédio (CG cl. 5.5–5.6)."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 29000,
     "max": 50000,
     "confianca": "MEDIA",
     "dados_utilizados": "bens molháveis, reconstrução",
     "regra": "50%–100% dos bens molháveis + 3%–8% da reconstrução (pisos e acabamentos)",
     "justificativa": "Paga danos aos bens e ao imóvel por chuva, alagamento ou cano rompido.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "VENDAVAL_GRANIZO",
     "tipo": "FIXA",
     "min": 28000,
     "max": 60000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo, reconstrução",
     "regra": "10%–20% da reconstrução",
     "justificativa": "Casa expõe telhado; apartamento expõe sobretudo janelas.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "IMPACTO_VEICULOS_TERRESTRES",
     "tipo": "FIXA",
     "min": 10000,
     "max": 20000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel",
     "regra": "padrão do produto (casa até R$ 20 mil)",
     "justificativa": "Impacto atinge muro, portão e fachada; baixa exposição em apartamento.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "QUEDA_AERONAVE",
     "tipo": "FIXA",
     "min": 10000,
     "max": 10000,
     "confianca": "MEDIA",
     "dados_utilizados": "padrão do produto",
     "regra": "padrão do produto",
     "justificativa": "Evento raro; valor padrão do produto.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "DANOS_ELETRICOS",
     "tipo": "FIXA",
     "min": 22000,
     "max": 30000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos e eletrodomésticos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos + eletrodomésticos: comprovado → estoque, a preço de hoje",
     "justificativa": "Picos de energia atingem o que liga na tomada; dano mecânico não é coberto.",
     "confirmar": "Principais aparelhos da casa",
     "observacao": ""
    },
    {
     "cobertura": "ROUBO_FURTO_ARROMBAMENTO",
     "tipo": "FIXA",
     "min": 9500,
     "max": 26000,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos e portáteis: comprovado → estoque, a preço de hoje",
     "justificativa": "Repor o que costuma ser levado num arrombamento, a valor de reposição.",
     "confirmar": "Bens portáteis de maior valor",
     "observacao": "Não cobre joias, relógios, dinheiro, drones nem bicicleta fora de casa (CG cl. 6; Roubo 2.1)."
    },
    {
     "cobertura": "QUEBRA_DE_VIDROS",
     "tipo": "FIXA",
     "min": 3000,
     "max": 8000,
     "confianca": "BAIXA",
     "dados_utilizados": "tipo do imóvel, gastos com vidraçaria 24m",
     "regra": "faixa por tipo, ampliada para 1,2 × o gasto com vidraçaria",
     "justificativa": "Janelas, box e tampos de vidro.",
     "confirmar": "Há vidros grandes (sacada, box, fachada)?",
     "observacao": ""
    },
    {
     "cobertura": "RESPONSABILIDADE_CIVIL_FAMILIAR",
     "tipo": "FIXA",
     "min": 30000,
     "max": 60000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel; SINAPI, CUB",
     "regra": "casa: faixa de referência de danos a terceiros",
     "justificativa": "Paga danos que você cause a terceiros, como água descendo para o vizinho. Não usa dados da família.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "PERDA_PAGAMENTO_ALUGUEL",
     "tipo": "FIXA",
     "min": 30000,
     "max": 30000,
     "confianca": "MEDIA",
     "dados_utilizados": "aluguel recebido (transações)",
     "regra": "aluguel mensal × 6 a 12 meses",
     "justificativa": "Paga a moradia provisória, ou repõe o aluguel perdido, enquanto o imóvel é reparado.",
     "confirmar": "Valor de aluguel de um imóvel equivalente",
     "observacao": ""
    },
    {
     "cobertura": "DESPESAS_EMERGENCIAIS",
     "tipo": "FIXA",
     "min": 6500,
     "max": 15000,
     "confianca": "MEDIA",
     "dados_utilizados": "faixa de incêndio",
     "regra": "2%–5% da faixa de incêndio",
     "justificativa": "Medidas urgentes para evitar que o dano aumente.",
     "confirmar": "",
     "observacao": ""
    }
   ],
   "perguntas": [
    {
     "prioridade": 100,
     "texto": "Notamos R$ 15.150 em material de construção nos últimos 2 anos. O imóvel está em obra ou reforma agora?",
     "codigo": "POSSIVEL_REFORMA"
    },
    {
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 42.000 e R$ 113.000?",
     "codigo": "BENS"
    },
    {
     "prioridade": 50,
     "texto": "Estimamos que o imóvel tem cerca de 166 m². Confere?",
     "codigo": "AREA"
    }
   ],
   "perguntas_candidatas": 3,
   "confianca": "MEDIA",
   "confianca_score": 71,
   "canal": "GERENTE",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N (Sinduscon)",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4"
   ],
   "sinais": {
    "parcela": 0.0,
    "aluguel": 0.0,
    "vidracaria": 0.0,
    "obra": 15150.0
   }
  }
 }
};
