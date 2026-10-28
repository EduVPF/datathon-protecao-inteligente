"""Parâmetros do motor — RASCUNHO.

Tudo que é premissa de negócio fica aqui, separado da lógica, para o time
ajustar sem mexer no motor. Cada bloco diz de onde veio o número.
"""

# --- Custo de reconstrução (R$/m²) por UF -------------------------------------
# APROXIMAÇÃO do CUB residencial padrão normal (Sinduscon). Os valores são uma
# ordem de grandeza para o rascunho: SUBSTITUIR pelo CUB oficial do mês de cada
# Sinduscon antes da entrega. O motor funciona offline com esta tabela local.
CUB_M2_POR_UF = {
    "SP": 2050, "RJ": 2150, "MG": 2200, "PR": 2250, "RS": 2350,
    "DF": 1950, "GO": 1950, "BA": 1850, "PE": 1750, "CE": 1750,
}
CUB_M2_PADRAO = 2000  # UF fora da tabela

# Ajuste pelo padrão construtivo cadastrado (quando existe).
FATOR_PADRAO = {"ECONOMICO": 0.85, "NORMAL": 1.0, "SUPERIOR": 1.30, "NAO_DISPONIVEL": 1.0}

# Apartamento: a estrutura do prédio já tem seguro obrigatório do condomínio,
# então o imóvel do cliente entra só com uma fração (benfeitorias internas).
FRACAO_ESTRUTURA_APARTAMENTO = (0.20, 0.35)

# --- Conteúdo ------------------------------------------------------------------
# Compras dos últimos 36 meses viram estimativa de conteúdo com um desconto,
# porque nem tudo que foi comprado está nesse imóvel (presente, outro endereço).
FATOR_COMPRAS_NO_IMOVEL = (0.55, 0.85)
CONTEUDO_MINIMO = 10000

# --- Proporções das coberturas (premissas de produto, ajustar ao manual) ------
# Expressas como fração da base indicada.
PROP = {
    "DANOS_POR_AGUA": ("incendio", 0.05, 0.15),
    "VENDAVAL_GRANIZO_CASA": ("incendio", 0.15, 0.30),
    "VENDAVAL_GRANIZO_APTO": ("incendio", 0.05, 0.15),
    "IMPACTO_VEICULOS_CASA": ("incendio", 0.05, 0.15),
    "IMPACTO_VEICULOS_APTO": ("incendio", 0.02, 0.06),
    "QUEDA_AERONAVE": ("incendio", 0.10, 0.25),
    "DESPESAS_EMERGENCIAIS": ("incendio", 0.03, 0.08),
}
LIMITES_COBERTURA = {  # (piso, teto) em R$
    "DANOS_POR_AGUA": (3000, 60000),
    "VENDAVAL_GRANIZO": (5000, 300000),
    "IMPACTO_VEICULOS_TERRESTRES": (3000, 100000),
    "QUEDA_AERONAVE": (10000, 500000),
    "DANOS_ELETRICOS": (3000, 50000),
    "ROUBO_FURTO_ARROMBAMENTO": (5000, 150000),
    "QUEBRA_DE_VIDROS": (1500, 15000),
    "RESPONSABILIDADE_CIVIL_FAMILIAR": (20000, 200000),
    "PERDA_PAGAMENTO_ALUGUEL": (3000, 120000),
    "DESPESAS_EMERGENCIAIS": (2000, 30000),
}
MESES_PERDA_ALUGUEL = (6, 12)
ALUGUEL_ESTIMADO_MES = (0.004, 0.005)  # fração do valor do imóvel por mês, quando não há aluguel pago

# --- Elegibilidade e decisão ---------------------------------------------------
OBRA_LIMIAR_CONFIRMAR = 15000   # gasto em material de construção (24m) que pede confirmação
RENDA_MIN_TOTAL = 6000          # abaixo disso o Total vira alternativa, não recomendação
RENDA_MAX_SO_ESSENCIAL = 3000   # abaixo disso começamos pelo Essencial
CONTEUDO_RELEVANTE = 25000      # conteúdo a partir do qual roubo/furto pesa
MATURIDADE_MIN_ONE_CLICK = 40

# --- Confiança -----------------------------------------------------------------
PESO_CONFIANCA = {"ALTA": 1.0, "MEDIA": 0.6, "BAIXA": 0.3}
MAX_PERGUNTAS = 3
