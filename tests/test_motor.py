"""Testes do motor. Cada bloco corresponde a uma tarefa do PLANO_UNIFICADO.md."""
import parametros as P


# --- T1: parâmetros e fontes ----------------------------------------------------
def test_custo_m2_pr_sem_cub_oficial_usa_razao():
    # CUB-PR veio de agregador: o máximo é SINAPI-PR × mediana CUB/SINAPI das UFs com CUB oficial
    lo, hi = P.custo_m2("PR")
    assert lo == 2287.42 and hi == round(2287.42 * P._tabela_custo()[2], 2)
    assert 1.0 < P._tabela_custo()[2] < 1.2 and "razão" in P.fonte_custo("PR")


def test_custo_m2_sp_usa_cub_oficial():
    assert P.custo_m2("SP") == (2209.93, 2238.58) and P.fonte_custo("SP") == "CUB SP oficial"


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


def test_plano_e_coberturas_ignoram_renda_e_idade(ficha):
    a = ficha(APTO_CURITIBA, renda_mensal=1800, idade=19)
    b = ficha(APTO_CURITIBA, renda_mensal=34000, idade=85)
    assert a["plano"] == b["plano"]
    assert [(c["min"], c["max"]) for c in a["coberturas"]] == [(c["min"], c["max"]) for c in b["coberturas"]]


def test_criancas_e_pet_pesam_so_no_plano(ficha):
    sem = ficha(APTO_CURITIBA, quantidade_dependentes=0, possui_pet_informado="NAO")
    com = ficha(APTO_CURITIBA, quantidade_dependentes=2, possui_pet_informado="SIM")
    assert any(m["codigo"] == "FAMILIA_DECLARADA" for m in com["motivos"])
    assert not any(m["codigo"] == "FAMILIA_DECLARADA" for m in sem["motivos"])
    assert com["pontos"]["total"] == sem["pontos"]["total"] + 1
    faixa = lambda f: {c["cobertura"]: (c["min"], c["max"]) for c in f["coberturas"]}
    fs, fc = faixa(sem), faixa(com)
    assert all(fs[k] == fc[k] for k in fs.keys() & fc.keys())
    for k in ("elegibilidade", "confianca", "confianca_score", "canal", "campos"):
        assert sem[k] == com[k]


def test_so_crianca_ou_so_pet_vira_pergunta(ficha):
    f = ficha(APTO_CURITIBA, quantidade_dependentes=1, possui_pet_informado="NAO", gastos_vidracaria_24m=0,
              compras_eletronicos_36m=0)
    assert not any(m["codigo"] == "FAMILIA_DECLARADA" for m in f["motivos"])
    if f["plano"] != "TOTAL":
        assert f["perguntas_candidatas"] >= 1


def test_familia_nao_empurra_para_o_pratico(linha, cal, vazio):
    # casa sem sinais de roubo além de ser casa: a família pede RC (Total), não o Prático
    r = linha(possui_termo_apartamento="NAO", possui_termo_condominio="NAO", pagamento_aluguel_recorrente="NAO",
              parcela_financiamento_imobiliario=0, credito_recorrente_compativel_aluguel="NAO", gastos_vidracaria_24m=0,
              compras_eletronicos_36m=0, compras_eletrodomesticos_36m=0, compras_moveis_36m=0,
              quantidade_dependentes=2, possui_pet_informado="SIM", endereco_principal_compativel="SIM", complemento="CASA")
    tipo, vinc = motor.inferir_tipo(r), motor.inferir_vinculo(r)
    rec = motor.escolher_plano(r, tipo, vinc, motor.inferir_uso(r, False), motor.estimar_bens(r, vazio))
    assert rec["pontos"] == {"pratico": 1, "total": 1} and rec["plano"] == "ESSENCIAL"


def test_seguro_existente_um_imovel_nao_elegivel(caso, cal, teste):
    import motor
    r, b = caso(APTO_CURITIBA)
    r.possui_seguro_residencial = "SIM"
    catalogo = teste["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()
    f = motor.processar_caso(r, b, cal, catalogo, n_imoveis=1)
    assert f["elegibilidade"] == "NAO" and f["pendencias"][0]["codigo"] == "SEGURO_EXISTENTE"
    assert motor.justificativa(f).startswith("Não elegível para nova proposta")


def test_seguro_existente_dois_imoveis_pergunta_qual(caso, cal, teste):
    import motor
    r, b = caso(APTO_CURITIBA)
    r.possui_seguro_residencial = "SIM"
    catalogo = teste["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()
    f = motor.processar_caso(r, b, cal, catalogo, n_imoveis=2)
    assert f["elegibilidade"] == "SIM" and f["confianca"] != "ALTA"
    assert any("Qual dos seus imóveis" in p["texto"] for p in f["perguntas"])


def test_confianca_area_presumida_e_baixa(ficha):
    f = ficha(APTO_CURITIBA, area_cadastrada_m2=0, pagamento_iptu_anual=0, energia_media_mensal_6m=0)
    assert f["confianca"] == "BAIXA" and "presumido: área" in f["confianca_motivo"]


def test_confianca_dado_estimado_nao_e_alta(ficha):
    f = ficha(APTO_CURITIBA, area_cadastrada_m2=0)
    assert f["confianca"] == "MEDIA" and "estimado: área" in f["confianca_motivo"]


def test_confianca_motivo_na_justificativa(ficha):
    import motor
    f = ficha(APTO_CURITIBA)
    assert f"Confiança {motor.NIVEL_TEXTO[f['confianca']]} (" in motor.justificativa(f)


def test_campo_vazio_baixa_a_confianca(ficha):
    cheio = ficha(APTO_CURITIBA, area_cadastrada_m2=110, padrao_construtivo_cadastrado="NORMAL",
                  material_parede_externa_cadastrado="ALVENARIA")
    vazio_ = ficha(APTO_CURITIBA, area_cadastrada_m2=110, padrao_construtivo_cadastrado="NAO_DISPONIVEL",
                   material_parede_externa_cadastrado="NAO_DISPONIVEL")
    assert cheio["completude"]["pct"] == 100 and vazio_["completude"]["pct"] < 100
    assert vazio_["confianca_score"] < cheio["confianca_score"]


def test_inquilino_vai_para_total_com_aluguel(ficha):
    f = ficha(APTO_CURITIBA, pagamento_aluguel_recorrente="SIM", valor_aluguel_recorrente=2000, parcela_financiamento_imobiliario=0)
    assert f["plano"] == "TOTAL"
    alug = _cob(f, "PERDA_PAGAMENTO_ALUGUEL")
    assert (alug["min"], alug["max"]) == (12000, 24000)


def test_justificativa_tem_alternativas(ficha):
    import motor
    f = ficha(APTO_CURITIBA)
    texto = motor.justificativa(f)
    assert texto.startswith("Recomendamos o plano")
    if f["plano"] != "ESSENCIAL":
        assert "Se você escolher menos" in texto and "ficarão descobertas" in texto
    if f["plano"] != "TOTAL":
        assert "Por que não um plano mais caro" in texto


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
    a = ficha(APTO_CURITIBA, renda_mensal=1800, idade=19, origem_renda="INFORMADA")
    b = ficha(APTO_CURITIBA, renda_mensal=34000, idade=85, origem_renda="PRESUMIDA")
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
    assert met["familia_declarada_muda_valor_ou_confianca"] == 0
    assert met["elegibilidade"].get("NAO", 0) > 0 and met["confianca"].get("BAIXA", 0) > 0
    assert met["confianca_estabilidade_casos_que_mudam_com_pesos_20pct"] == 0
    larg = met["confianca_largura_incendio_mediana"]
    assert larg["ALTA"] <= larg["MEDIA"] <= larg["BAIXA"]
    assert met["completude_coberturas_fixas_pct"] == 100.0 and met["sensibilidade_area_casos_com_queda"] == 0
    assert all(info["casos_contrastantes"].values())
