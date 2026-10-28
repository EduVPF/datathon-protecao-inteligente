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


# --- T3: elegibilidade, plano e coberturas ---------------------------------------
APTO_CURITIBA = "IMO_CASO_00005_01"   # apartamento financiado, 110 m², Curitiba


def _cob(f, nome):
    return next(c for c in f["coberturas"] if c["cobertura"] == nome)


def test_obra_vira_sim_com_pergunta(ficha):
    f = ficha(APTO_CURITIBA, gastos_material_construcao_24m=40000)
    assert f["elegibilidade"] == "SIM"
    assert f["perguntas"][0]["prioridade"] == 100 and "reforma" in f["perguntas"][0]["texto"]
    assert f["canal"] == "GERENTE"


def test_situacao_irregular_vira_nao(ficha):
    f = ficha(APTO_CURITIBA, situacao_imovel_cadastral="TOMBADO")
    assert f["elegibilidade"] == "NAO"


def test_incendio_apto_financiado_segundo_risco(ficha):
    inc = _cob(ficha(APTO_CURITIBA), "INCENDIO_RAIO_EXPLOSAO_FUMACA")
    assert 100000 <= inc["min"] and inc["max"] <= 200000
    assert "15.2" in inc["observacao"]


def test_casa_quitada_soma_reconstrucao(ficha):
    f = ficha(APTO_CURITIBA, possui_termo_apartamento="NAO", possui_termo_casa="SIM", possui_termo_condominio="NAO",
              complemento="CASA", parcela_financiamento_imobiliario=0)
    inc = _cob(f, "INCENDIO_RAIO_EXPLOSAO_FUMACA")
    assert inc["min"] >= 110 * 2287.42 and "5.5" in inc["observacao"]


def test_plano_e_coberturas_ignoram_atributos_pessoais(ficha):
    a = ficha(APTO_CURITIBA, renda_mensal=1800, idade=19, quantidade_dependentes=0, possui_pet_informado="NAO")
    b = ficha(APTO_CURITIBA, renda_mensal=34000, idade=85, quantidade_dependentes=3, possui_pet_informado="SIM")
    assert a["plano"] == b["plano"]
    assert [(c["min"], c["max"]) for c in a["coberturas"]] == [(c["min"], c["max"]) for c in b["coberturas"]]


def test_inquilino_vai_para_total_com_aluguel(ficha):
    f = ficha(APTO_CURITIBA, pagamento_aluguel_recorrente="SIM", valor_aluguel_recorrente=2000, parcela_financiamento_imobiliario=0)
    assert f["plano"] == "TOTAL"
    alug = _cob(f, "PERDA_PAGAMENTO_ALUGUEL")
    assert (alug["min"], alug["max"]) == (12000, 24000)


def test_justificativa_tem_alternativas(ficha):
    import motor
    texto = motor.justificativa(ficha(APTO_CURITIBA))
    assert "Por que não um plano mais barato" in texto and "Por que não um plano mais caro" in texto


# --- T4: validação e planilhas ----------------------------------------------------
import pytest  # noqa: E402
from templates import validar_templates  # noqa: E402


@pytest.fixture(scope="session")
def planilhas(teste, cal):
    fichas = motor.processar(teste, cal)
    return motor.para_templates(fichas, teste["template"])


def test_planilhas_validas(planilhas, teste):
    res, cob = planilhas
    assert validar_templates(res, cob, teste["template"], teste["template_coberturas"], teste["catalogo"]) == []


def test_138_casos_na_ordem_do_template(planilhas, teste):
    res, _ = planilhas
    assert len(res) == 138 and list(res.imovel_id) == list(teste["template"].imovel_id)


def test_validador_pega_erros(planilhas, teste):
    res, cob = planilhas
    cob = cob.copy()
    cob.loc[0, ["faixa_valor_min", "faixa_valor_max"]] = [50000, 1000]   # faixa invertida
    cob = cob[cob.cobertura != "QUEDA_AERONAVE"]                          # cobertura fixa faltando
    erros = validar_templates(res, cob, teste["template"], teste["template_coberturas"], teste["catalogo"])
    assert any("mínimo maior" in e for e in erros) and any("sem as fixas" in e for e in erros)


# --- T5: confiança, perguntas, justiça e coerência ------------------------------
import json  # noqa: E402


def test_dado_antigo_pesa_menos():
    novo = motor.peso_dado({"fonte_tipo": "TRANSACAO", "idade_meses": 3}, "bens")
    velho = motor.peso_dado({"fonte_tipo": "TRANSACAO", "idade_meses": 30}, "bens")
    assert velho < novo


def test_dado_confirmado_vale_o_maximo():
    assert motor.peso_dado({"natureza": "CONFIRMADO", "fonte_tipo": "PRESUMIDO", "idade_meses": 99}, "bens") == 1.0


def test_no_maximo_tres_perguntas_por_impacto(ficha):
    f = ficha("IMO_CASO_00001_01", gastos_material_construcao_24m=40000)
    assert len(f["perguntas"]) == 3 and f["perguntas_candidatas"] > 3
    assert [p["prioridade"] for p in f["perguntas"]] == sorted((p["prioridade"] for p in f["perguntas"]), reverse=True)


def test_pendencia_impede_confianca_alta(ficha):
    assert ficha(APTO_CURITIBA, gastos_material_construcao_24m=40000)["confianca"] != "ALTA"


def test_justica_ficha_inteira_igual(ficha):
    a = ficha(APTO_CURITIBA, renda_mensal=1800, idade=19, quantidade_dependentes=0, possui_pet_informado="NAO", origem_renda="INFORMADA")
    b = ficha(APTO_CURITIBA, renda_mensal=34000, idade=85, quantidade_dependentes=3, possui_pet_informado="SIM", origem_renda="PRESUMIDA")
    assert json.dumps(a, sort_keys=True) == json.dumps(b, sort_keys=True)
    texto = json.dumps(a)
    for chave in ['"renda', '"origem_renda"', '"idade"', '"quantidade_dependentes"', '"possui_pet', '"dependentes"']:
        assert chave not in texto


def test_area_maior_nunca_reduz_incendio(ficha):
    p = ficha(APTO_CURITIBA, area_cadastrada_m2=100)
    g = ficha(APTO_CURITIBA, area_cadastrada_m2=110)
    assert _cob(g, "INCENDIO_RAIO_EXPLOSAO_FUMACA")["max"] >= _cob(p, "INCENDIO_RAIO_EXPLOSAO_FUMACA")["max"]


def test_extremos_respeitam_limites(ficha):
    import parametros
    f = ficha(APTO_CURITIBA, compras_eletronicos_36m=900000, compras_moveis_36m=900000, compras_eletrodomesticos_36m=900000,
              gastos_vidracaria_24m=500000, area_cadastrada_m2=5000)
    for c in f["coberturas"]:
        lo, hi = parametros.LIMITES_PRODUTO[c["cobertura"]]
        assert isinstance(c["min"], int) and lo <= c["min"] <= c["max"] <= hi


def test_bens_de_outro_imovel_nao_entram(caso):
    _, b1 = caso("IMO_CASO_00005_01")
    _, b2 = caso("IMO_CASO_00005_02")
    assert set(b1.imovel_id_referencia) <= {"IMO_CASO_00005_01"} and set(b2.imovel_id_referencia) <= {"IMO_CASO_00005_02"}


def test_reprodutivel(tmp_path):
    import gerar
    gerar.gerar(tmp_path / "a")
    gerar.gerar(tmp_path / "b")
    for nome in ["template_resultado_times.csv", "template_coberturas_times.csv", "fichas.json"]:
        assert (tmp_path / "a" / nome).read_bytes() == (tmp_path / "b" / nome).read_bytes()


# --- T6: métricas e casos contrastantes ----------------------------------------
def test_metricas_e_casos(tmp_path):
    import gerar
    info = gerar.gerar(tmp_path)
    met = json.loads((tmp_path / "metricas.json").read_text(encoding="utf-8"))
    assert met["teste_justica_casos_alterados"] == 0
    assert met["completude_coberturas_fixas_pct"] == 100.0 and met["sensibilidade_area_casos_com_queda"] == 0
    assert all(info["casos_contrastantes"].values())
