"""Testes do motor. Cada bloco corresponde a uma tarefa do PLANO_UNIFICADO.md."""
import parametros as P


# --- T1: parâmetros e fontes ----------------------------------------------------
def test_custo_m2_pr():
    assert P.custo_m2("PR") == (2287.42, 2738.93)


def test_custo_m2_uf_desconhecida_usa_neutro():
    assert P.custo_m2("XX") == P.CUSTO_M2_NEUTRO


def test_fator_ipca():
    assert 1.06 < P.FATOR_IPCA < 1.08


def test_aluguel_m2_curitiba():
    assert P.aluguel_m2("PR") == 49.44


def test_sem_parametro_de_renda():
    assert not [n for n in dir(P) if "RENDA" in n.upper()]


# --- T2: tipo, área e bens -------------------------------------------------------
import motor  # noqa: E402


def test_bens_caso_00005(caso):
    r, b = caso("IMO_CASO_00005_01")
    est = motor.estimar_bens(r, b)
    assert round(est["min"]) == round(20750 * P.FATOR_IPCA)
    assert round(est["max"]) == round(2.7 * 20750 * P.FATOR_IPCA)


def test_bens_sem_compras_nem_bens_usa_piso(linha, vazio):
    r = linha(compras_moveis_36m=0, compras_eletrodomesticos_36m=0, compras_eletronicos_36m=0)
    est = motor.estimar_bens(r, vazio)
    assert est["min"] == P.BENS_PISO and est["confianca"] == "BAIXA"


def test_bens_nao_le_atributos_pessoais(linha, vazio):
    a = motor.estimar_bens(linha(renda_mensal=1800, idade=20, quantidade_dependentes=0), vazio)
    b = motor.estimar_bens(linha(renda_mensal=34000, idade=80, quantidade_dependentes=3), vazio)
    assert a == b


def test_area_sem_iptu_nem_energia(linha, cal):
    d = motor.inferir_area(linha(area_cadastrada_m2=0, pagamento_iptu_anual=0, energia_media_mensal_6m=0), cal)
    assert 30 <= d["valor"] <= 400 and d["confianca"] == "BAIXA"


def test_tipo_complemento_diverge(linha):
    d = motor.inferir_tipo(linha(possui_termo_apartamento="SIM", complemento="CASA FUNDOS"))
    assert d["valor"] == "APARTAMENTO" and d["confianca"] == "MEDIA" and d["diverge"]


def test_tipo_complemento_confirma(linha):
    d = motor.inferir_tipo(linha(possui_termo_apartamento="SIM", complemento="BLOCO B APTO 305"))
    assert d["confianca"] == "ALTA" and not d["diverge"]
