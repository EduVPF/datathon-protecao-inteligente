// Gerado por motor/gerar.py. Não edite à mão.
window.FICHAS_DEMO = {
 "casos": {
  "perfil_A_apto_urbano": "IMO_CASO_00005_01",
  "perfil_B_casa_familiar": "IMO_CASO_00031_01",
  "perfil_C_casa_lazer": "IMO_CASO_00010_01",
  "nao_elegivel_seguro_existente": "IMO_CASO_00001_01",
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
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "FINANCIADO",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "parcela de financiamento de R$ 950/mês",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673,
     "classe": "OBSERVADO"
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9,
     "classe": "OBSERVADO"
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
     "peso": 0.9,
     "classe": "OBSERVADO"
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
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     2287.42,
     2502.45
    ],
    "reconstrucao_min": 252000,
    "reconstrucao_max": 275000,
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
     "max": 170000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 110–110 m² × R$ 2.287–R$ 2.502/m² (SINAPI PR até SINAPI PR × 1.094 (razão CUB/SINAPI das UFs com CUB oficial)) × 25%–40% (acabamentos) + bens",
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
     "max": 14000,
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
    },
    {
     "prioridade": 45,
     "texto": "Você informou crianças ou pets em casa. Quer proteção para danos que eles causem a terceiros? Ela vem no plano Total.",
     "codigo": "RC_FAMILIA"
    }
   ],
   "perguntas_candidatas": 2,
   "confianca": "ALTA",
   "confianca_score": 76,
   "confianca_motivo": "todos os dados críticos observados",
   "completude": {
    "faltantes": [
     "padrao_construtivo_cadastrado",
     "material_parede_externa_cadastrado"
    ],
    "pct": 33
   },
   "canal": "ONE_CLICK",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
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
  "IMO_CASO_00031_01": {
   "cliente_id": "CASO_00031",
   "imovel_id": "IMO_CASO_00031_01",
   "local": "Brasilia/DF",
   "complemento": "CASA 01",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 35
   },
   "campos": {
    "tipo": {
     "valor": "CASA_EM_CONDOMINIO",
     "natureza": "INFERIDO",
     "confianca": "ALTA",
     "fonte": "termos 'casa' + 'condomínio' no endereço e pagamento de condomínio; confirmado pelo complemento",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "diverge": false,
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "PROPRIETARIO",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "sem aluguel pago nem financiamento: provável imóvel quitado",
     "fonte_tipo": "INFERIDO",
     "idade_meses": 3,
     "peso": 0.505,
     "classe": "ESTIMADO"
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "area": {
     "valor": 165,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "estimada pelo IPTU (R$ 2.150/ano) e energia (R$ 650/mês) comparados a imóveis de Brasilia",
     "fonte_tipo": "DERIVADO",
     "idade_meses": 3,
     "min": 121.75333343629381,
     "max": 212.12315485923543,
     "peso": 0.688,
     "classe": "ESTIMADO"
    },
    "bens": {
     "valor": 143040,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 72.300 nos últimos 36 meses (corrigidas pelo IPCA) e 2 bens vinculados (R$ 13.000 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 77319.1519676489,
     "max": 208761.71031265202,
     "categorias": {
      "eletronicos": {
       "min": 12886.525327941483,
       "max": 34793.61838544201
      },
      "eletrodomesticos": {
       "min": 42669.9054427274,
       "max": 115208.74469536399
      },
      "moveis": {
       "min": 21762.721196980016,
       "max": 58759.34723184604
      }
     },
     "portateis": {
      "min": 12886.525327941483,
      "max": 34793.61838544201
     },
     "eletricos": {
      "min": 55556.430770668885,
      "max": 150002.36308080598
     },
     "molhaveis": {
      "min": 77319.1519676489,
      "max": 208761.71031265202
     },
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     2151.68,
     2423.72
    ],
    "reconstrucao_min": 262000,
    "reconstrucao_max": 514000,
    "segundo_risco": true
   },
   "elegibilidade": "SIM",
   "pendencias": [],
   "avisos": [],
   "plano": "TOTAL",
   "motivos": [
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "VIZINHOS",
     "texto": "em prédio ou condomínio, um vazamento ou incêndio pode atingir o vizinho"
    },
    {
     "plano": "PRATICO",
     "peso": 2,
     "codigo": "BENS_ALTOS",
     "texto": "seus bens comprovados somam pelo menos R$ 77.319, acima da maioria dos clientes"
    },
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "ELETRONICOS",
     "texto": "você tem pelo menos R$ 12.887 em eletrônicos, os mais visados num arrombamento"
    },
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "FAMILIA_DECLARADA",
     "texto": "você informou que mora com crianças e pets, e um acidente com eles pode causar dano a terceiros, que só o Total cobre"
    }
   ],
   "motivos_plano": [
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "VIZINHOS",
     "texto": "em prédio ou condomínio, um vazamento ou incêndio pode atingir o vizinho"
    },
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "FAMILIA_DECLARADA",
     "texto": "você informou que mora com crianças e pets, e um acidente com eles pode causar dano a terceiros, que só o Total cobre"
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
     "min": 143000,
     "max": 414000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 122–212 m² × R$ 2.152–R$ 2.424/m² (SINAPI DF até CUB DF oficial) × 25%–40% (acabamentos) + bens",
     "justificativa": "Repor acabamentos e bens; a estrutura do prédio ou do financiamento tem seguro próprio.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Segundo risco (CG cl. 15.2): a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 47000,
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
     "min": 26000,
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
     "min": 30000,
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
     "min": 13000,
     "max": 35000,
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
     "min": 45000,
     "max": 102000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel; SINAPI, CUB",
     "regra": "reparo de uma unidade vizinha: 70 m² × R$ 2.152–R$ 2.424/m² (SINAPI DF até CUB DF oficial) × 30%–60%",
     "justificativa": "Paga danos que você ou sua família cause a terceiros, como água descendo para o vizinho. Crianças e pets informados só pesam na escolha do plano, não no valor.",
     "confirmar": "",
     "observacao": ""
    },
    {
     "cobertura": "PERDA_PAGAMENTO_ALUGUEL",
     "tipo": "FIXA",
     "min": 30000,
     "max": 30000,
     "confianca": "MEDIA",
     "dados_utilizados": "FipeZAP set/2026: R$ 54/m² × área",
     "regra": "aluguel mensal × 6 a 12 meses",
     "justificativa": "Paga a moradia provisória, ou repõe o aluguel perdido, enquanto o imóvel é reparado.",
     "confirmar": "Valor de aluguel de um imóvel equivalente",
     "observacao": ""
    },
    {
     "cobertura": "DESPESAS_EMERGENCIAIS",
     "tipo": "FIXA",
     "min": 3000,
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
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 77.000 e R$ 209.000?",
     "codigo": "BENS"
    },
    {
     "prioridade": 50,
     "texto": "Estimamos que o imóvel tem cerca de 165 m². Confere?",
     "codigo": "AREA"
    },
    {
     "prioridade": 30,
     "texto": "O imóvel é seu e já está quitado?",
     "codigo": "VINCULO"
    }
   ],
   "perguntas_candidatas": 3,
   "confianca": "MEDIA",
   "confianca_score": 57,
   "confianca_motivo": "estimado: área, vínculo",
   "completude": {
    "faltantes": [
     "area_cadastrada_m2",
     "padrao_construtivo_cadastrado",
     "material_parede_externa_cadastrado"
    ],
    "pct": 0
   },
   "canal": "GERENTE",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4",
    "FipeZAP Locação set/2026 (Fipe)"
   ],
   "sinais": {
    "parcela": 0.0,
    "aluguel": 0.0,
    "vidracaria": 0.0,
    "obra": 0.0
   }
  },
  "IMO_CASO_00010_01": {
   "cliente_id": "CASO_00010",
   "imovel_id": "IMO_CASO_00010_01",
   "local": "Salvador/BA",
   "complemento": "APTO 101",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 55
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
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "PROPRIETARIO",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "sem aluguel pago nem financiamento: provável imóvel quitado",
     "fonte_tipo": "INFERIDO",
     "idade_meses": 3,
     "peso": 0.505,
     "classe": "ESTIMADO"
    },
    "uso": {
     "valor": "LAZER_VERANEIO",
     "natureza": "INFERIDO",
     "confianca": "BAIXA",
     "fonte": "cliente mora em outro imóvel cadastrado",
     "fonte_tipo": "PRESUMIDO",
     "idade_meses": 0,
     "peso": 0.5,
     "classe": "PRESUMIDO"
    },
    "area": {
     "valor": 104,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "estimada pelo IPTU (R$ 1.000/ano) e energia (R$ 400/mês) comparados a imóveis de Salvador",
     "fonte_tipo": "DERIVADO",
     "idade_meses": 3,
     "min": 76.74483231869779,
     "max": 133.70768168005185,
     "peso": 0.688,
     "classe": "ESTIMADO"
    },
    "bens": {
     "valor": 35908,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 18.150 nos últimos 36 meses (corrigidas pelo IPCA) e 3 bens vinculados (R$ 2.450 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 19409.994581090283,
     "max": 52406.985368943766,
     "categorias": {
      "eletronicos": {
       "min": 4705.453231779463,
       "max": 12704.72372580455
      },
      "eletrodomesticos": {
       "min": 10212.972355339516,
       "max": 27575.025359416693
      },
      "moveis": {
       "min": 4491.568993971306,
       "max": 12127.236283722525
      }
     },
     "portateis": {
      "min": 4705.453231779463,
      "max": 12704.72372580455
     },
     "eletricos": {
      "min": 14918.425587118978,
      "max": 40279.74908522124
     },
     "molhaveis": {
      "min": 19409.994581090283,
      "max": 52406.985368943766
     },
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     1969.6,
     2243.22
    ],
    "reconstrucao_min": 151000,
    "reconstrucao_max": 300000,
    "segundo_risco": true
   },
   "elegibilidade": "SIM",
   "pendencias": [],
   "avisos": [
    "imóvel de veraneio: roubo não cobre residência desocupada (CG, Roubo 2.1 c)"
   ],
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
     "codigo": "VERANEIO",
     "texto": "o imóvel é de veraneio e fica vazio parte do tempo"
    }
   ],
   "motivos_plano": [
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "VERANEIO",
     "texto": "o imóvel é de veraneio e fica vazio parte do tempo"
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
     "max": 172000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 77–134 m² × R$ 1.970–R$ 2.243/m² (SINAPI BA até CUB BA oficial) × 25%–40% (acabamentos) + bens",
     "justificativa": "Repor acabamentos e bens; a estrutura do prédio ou do financiamento tem seguro próprio.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Segundo risco (CG cl. 15.2): a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 14000,
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
     "min": 3000,
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
     "min": 15000,
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
     "min": 4500,
     "max": 12500,
     "confianca": "MEDIA",
     "dados_utilizados": "compras de eletrônicos (36m), bens vinculados; IPCA",
     "regra": "eletrônicos e portáteis: comprovado → estoque, a preço de hoje",
     "justificativa": "Repor o que costuma ser levado num arrombamento, a valor de reposição.",
     "confirmar": "Bens portáteis de maior valor",
     "observacao": "Não cobre joias, relógios, dinheiro, drones nem bicicleta fora de casa (CG cl. 6; Roubo 2.1). Residência desocupada não é coberta."
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
    }
   ],
   "perguntas": [
    {
     "prioridade": 70,
     "texto": "Este imóvel é onde você mora, uma casa de veraneio ou está alugado para outra pessoa?",
     "codigo": "USO"
    },
    {
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 19.500 e R$ 52.000?",
     "codigo": "BENS"
    },
    {
     "prioridade": 50,
     "texto": "Estimamos que o imóvel tem cerca de 104 m². Confere?",
     "codigo": "AREA"
    }
   ],
   "perguntas_candidatas": 5,
   "confianca": "BAIXA",
   "confianca_score": 52,
   "confianca_motivo": "presumido: uso do imóvel; estimado: área, vínculo",
   "completude": {
    "faltantes": [
     "area_cadastrada_m2",
     "padrao_construtivo_cadastrado",
     "material_parede_externa_cadastrado"
    ],
    "pct": 0
   },
   "canal": "GERENTE",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4"
   ],
   "sinais": {
    "parcela": 0.0,
    "aluguel": 0.0,
    "vidracaria": 0.0,
    "obra": 0.0
   }
  },
  "IMO_CASO_00001_01": {
   "cliente_id": "CASO_00001",
   "imovel_id": "IMO_CASO_00001_01",
   "local": "Recife/PE",
   "complemento": "CASA FUNDOS",
   "canal_digital": {
    "usuario_app": "SIM",
    "maturidade_digital": 100
   },
   "campos": {
    "tipo": {
     "valor": "CASA_EM_CONDOMINIO",
     "natureza": "INFERIDO",
     "confianca": "ALTA",
     "fonte": "termos 'casa' + 'condomínio' no endereço e pagamento de condomínio; confirmado pelo complemento",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "diverge": false,
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "PROPRIETARIO",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "sem aluguel pago nem financiamento: provável imóvel quitado",
     "fonte_tipo": "INFERIDO",
     "idade_meses": 3,
     "peso": 0.505,
     "classe": "ESTIMADO"
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "area": {
     "valor": 265,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "estimada pelo IPTU (R$ 3.350/ano) e energia (R$ 700/mês) comparados a imóveis de Recife",
     "fonte_tipo": "DERIVADO",
     "idade_meses": 3,
     "min": 195.36921179966464,
     "max": 340.3794573804528,
     "peso": 0.688,
     "classe": "ESTIMADO"
    },
    "bens": {
     "valor": 89821,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "compras de R$ 45.400 nos últimos 36 meses (corrigidas pelo IPCA) e 1 bens vinculados (R$ 550 ponderado pela chance de estarem no imóvel)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 18,
     "min": 48551.72198245173,
     "max": 131089.6493526197,
     "categorias": {
      "eletronicos": {
       "min": 16201.731013967923,
       "max": 43744.67373771339
      },
      "eletrodomesticos": {
       "min": 12833.054268489444,
       "max": 34649.2465249215
      },
      "moveis": {
       "min": 19516.936699994363,
       "max": 52695.72908998478
      }
     },
     "portateis": {
      "min": 16201.731013967923,
      "max": 43744.67373771339
     },
     "eletricos": {
      "min": 29034.785282457367,
      "max": 78393.92026263489
     },
     "molhaveis": {
      "min": 48551.72198245173,
      "max": 131089.6493526197
     },
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     1881.36,
     2058.22
    ],
    "reconstrucao_min": 368000,
    "reconstrucao_max": 701000,
    "segundo_risco": true
   },
   "elegibilidade": "NAO",
   "pendencias": [
    {
     "codigo": "SEGURO_EXISTENTE",
     "prioridade": 100,
     "pergunta": "",
     "texto": "endereço já segurado na BB Seguros (cliente com seguro residencial e um imóvel só); é vedada mais de uma proposta para o mesmo endereço"
    }
   ],
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
     "peso": 2,
     "codigo": "BENS_ALTOS",
     "texto": "seus bens comprovados somam pelo menos R$ 48.552, acima da maioria dos clientes"
    },
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "ELETRONICOS",
     "texto": "você tem pelo menos R$ 16.202 em eletrônicos, os mais visados num arrombamento"
    }
   ],
   "motivos_plano": [
    {
     "plano": "PRATICO",
     "peso": 2,
     "codigo": "BENS_ALTOS",
     "texto": "seus bens comprovados somam pelo menos R$ 48.552, acima da maioria dos clientes"
    },
    {
     "plano": "PRATICO",
     "peso": 1,
     "codigo": "ELETRONICOS",
     "texto": "você tem pelo menos R$ 16.202 em eletrônicos, os mais visados num arrombamento"
    }
   ],
   "pontos": {
    "pratico": 3,
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
     "min": 140000,
     "max": 411000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 195–340 m² × R$ 1.881–R$ 2.058/m² (SINAPI PE até SINAPI PE × 1.094 (razão CUB/SINAPI das UFs com CUB oficial)) × 25%–40% (acabamentos) + bens",
     "justificativa": "Repor acabamentos e bens; a estrutura do prédio ou do financiamento tem seguro próprio.",
     "confirmar": "Área do imóvel e valor dos bens",
     "observacao": "Segundo risco (CG cl. 15.2): a estrutura é paga primeiro pelo seguro do condomínio ou do financiamento."
    },
    {
     "cobertura": "DANOS_POR_AGUA",
     "tipo": "FIXA",
     "min": 35000,
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
     "min": 37000,
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
     "min": 29000,
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
     "min": 16000,
     "max": 44000,
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
    }
   ],
   "perguntas": [
    {
     "prioridade": 55,
     "texto": "Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 49.000 e R$ 131.000?",
     "codigo": "BENS"
    },
    {
     "prioridade": 50,
     "texto": "Estimamos que o imóvel tem cerca de 265 m². Confere?",
     "codigo": "AREA"
    },
    {
     "prioridade": 45,
     "texto": "Você informou crianças ou pets em casa. Quer proteção para danos que eles causem a terceiros? Ela vem no plano Total.",
     "codigo": "RC_FAMILIA"
    }
   ],
   "perguntas_candidatas": 4,
   "confianca": "MEDIA",
   "confianca_score": 57,
   "confianca_motivo": "estimado: área, vínculo",
   "completude": {
    "faltantes": [
     "area_cadastrada_m2",
     "padrao_construtivo_cadastrado",
     "material_parede_externa_cadastrado"
    ],
    "pct": 0
   },
   "canal": "GERENTE",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
    "IPCA 12m, série 433 (Banco Central)",
    "Condições Gerais BB Seguro Residencial v1.4"
   ],
   "sinais": {
    "parcela": 0.0,
    "aluguel": 0.0,
    "vidracaria": 0.0,
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
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "INQUILINO",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "aluguel recorrente de R$ 1.500/mês",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673,
     "classe": "OBSERVADO"
    },
    "uso": {
     "valor": "RESIDENCIAL_HABITUAL",
     "natureza": "OBSERVADO",
     "confianca": "ALTA",
     "fonte": "endereço compatível com o endereço principal do cliente",
     "fonte_tipo": "DOCUMENTO",
     "idade_meses": 0,
     "peso": 0.9,
     "classe": "OBSERVADO"
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
     "peso": 0.9,
     "classe": "OBSERVADO"
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
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     1974.41,
     2160.02
    ],
    "reconstrucao_min": 247000,
    "reconstrucao_max": 270000,
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
    },
    {
     "plano": "TOTAL",
     "peso": 1,
     "codigo": "FAMILIA_DECLARADA",
     "texto": "você informou que mora com crianças e pets, e um acidente com eles pode causar dano a terceiros, que só o Total cobre"
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
    "total": 4
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
     "max": 162000,
     "confianca": "MEDIA",
     "dados_utilizados": "área, tipo, vínculo, UF, padrão, compras 36m, bens; SINAPI, CUB, IPCA",
     "regra": "área 125–125 m² × R$ 1.974–R$ 2.160/m² (SINAPI CE até SINAPI CE × 1.094 (razão CUB/SINAPI das UFs com CUB oficial)) × 25%–40% (acabamentos) + bens",
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
     "max": 13500,
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
     "max": 91000,
     "confianca": "MEDIA",
     "dados_utilizados": "tipo do imóvel; SINAPI, CUB",
     "regra": "reparo de uma unidade vizinha: 70 m² × R$ 1.974–R$ 2.160/m² (SINAPI CE até SINAPI CE × 1.094 (razão CUB/SINAPI das UFs com CUB oficial)) × 30%–60%",
     "justificativa": "Paga danos que você ou sua família cause a terceiros, como água descendo para o vizinho. Crianças e pets informados só pesam na escolha do plano, não no valor.",
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
     "max": 8000,
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
   "confianca_score": 76,
   "confianca_motivo": "todos os dados críticos observados",
   "completude": {
    "faltantes": [
     "padrao_construtivo_cadastrado"
    ],
    "pct": 67
   },
   "canal": "ONE_CLICK",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
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
     "peso": 0.9,
     "classe": "OBSERVADO"
    },
    "vinculo": {
     "valor": "PROPRIETARIO_LOCADOR",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "recebe crédito recorrente compatível com aluguel (R$ 8.350/mês)",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673,
     "classe": "OBSERVADO"
    },
    "uso": {
     "valor": "RESIDENCIAL_LOCADO_A_TERCEIROS",
     "natureza": "INFERIDO",
     "confianca": "MEDIA",
     "fonte": "não é o endereço principal e há crédito de aluguel",
     "fonte_tipo": "TRANSACAO",
     "idade_meses": 3,
     "peso": 0.673,
     "classe": "OBSERVADO"
    },
    "area": {
     "valor": 166,
     "natureza": "ESTIMADO",
     "confianca": "MEDIA",
     "fonte": "estimada pelo IPTU (R$ 2.650/ano) e energia (R$ 450/mês) comparados a imóveis de Curitiba",
     "fonte_tipo": "DERIVADO",
     "idade_meses": 3,
     "min": 121.99616517377838,
     "max": 212.54622528204342,
     "peso": 0.688,
     "classe": "ESTIMADO"
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
     "peso": 0.566,
     "classe": "OBSERVADO"
    }
   },
   "valor_imovel": {
    "custo_m2": [
     2287.42,
     2502.45
    ],
    "reconstrucao_min": 279000,
    "reconstrucao_max": 532000,
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
     "regra": "área 122–213 m² × R$ 2.287–R$ 2.502/m² (SINAPI PR até SINAPI PR × 1.094 (razão CUB/SINAPI das UFs com CUB oficial)) + bens",
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
     "justificativa": "Paga danos que você ou sua família cause a terceiros, como água descendo para o vizinho. Crianças e pets informados só pesam na escolha do plano, não no valor.",
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
   "confianca_score": 56,
   "confianca_motivo": "estimado: área; elegibilidade a confirmar",
   "completude": {
    "faltantes": [
     "area_cadastrada_m2",
     "padrao_construtivo_cadastrado",
     "material_parede_externa_cadastrado"
    ],
    "pct": 0
   },
   "canal": "GERENTE",
   "fontes": [
    "SINAPI ago/2026 (IBGE)",
    "CUB R8-N oficial dos Sinduscons",
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
