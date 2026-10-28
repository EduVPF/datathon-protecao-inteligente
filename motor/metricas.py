"""Evidências para a banca (guia §8): métricas da base de teste e casos contrastantes."""
import statistics
from collections import Counter
from types import SimpleNamespace

import motor
import parametros as P


def _incendio_meio(f):
    c = next(c for c in f["coberturas"] if c["cobertura"] == "INCENDIO_RAIO_EXPLOSAO_FUMACA")
    return (c["min"] + c["max"]) / 2


def calcular_metricas(dados, cal, fichas, resultado, coberturas, segundos):
    n = len(fichas)
    m = (dados["enderecos_imoveis"].merge(dados["sinais_imobiliarios"], on=["imovel_id", "cliente_id"])
         .merge(dados["clientes"], on="cliente_id"))
    bens = dict(tuple(dados["bens_compras"].groupby("imovel_id_referencia")))
    vazio = dados["bens_compras"].iloc[0:0]
    catalogo = dados["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()
    por_id = {f["imovel_id"]: f for f in fichas}

    # Justiça: trocar renda e idade não pode mudar nada.
    # Necessidade declarada: trocar crianças e pet pode mudar só o plano, os motivos e as
    # perguntas; nunca a faixa de uma cobertura em comum, a elegibilidade, o canal ou a confiança.
    # Sensibilidade: área 10% maior deve aumentar (ou manter) o incêndio.
    mudou_justica, familia_fora_do_lugar, familia_muda_plano, variacoes, quedas = 0, 0, 0, [], 0
    base_nivel = {}
    for r in m.itertuples(index=False):
        b = bens.get(r.imovel_id, vazio)
        base = motor.processar_caso(r, b, cal, catalogo)
        base_nivel[r.imovel_id] = base["confianca"]
        trocado = SimpleNamespace(**{**r._asdict(), "renda_mensal": 99999, "idade": 99,
                                     "origem_renda": "PRESUMIDA", "confianca_renda": "BAIXA"})
        if motor.processar_caso(trocado, b, cal, catalogo) != base:
            mudou_justica += 1
        sem_familia = 0 if (r.quantidade_dependentes or 0) > 0 or r.possui_pet_informado == "SIM" else 2
        outra = motor.processar_caso(SimpleNamespace(**{**r._asdict(), "quantidade_dependentes": sem_familia,
                                                        "possui_pet_informado": "SIM" if sem_familia else "NAO"}),
                                     b, cal, catalogo)
        familia_muda_plano += outra["plano"] != base["plano"]
        faixa = lambda f: {c["cobertura"]: (c["min"], c["max"]) for c in f["coberturas"]}
        fa, fo = faixa(base), faixa(outra)
        if any(fa[k] != fo[k] for k in fa.keys() & fo.keys()) or any(
                base[k] != outra[k] for k in ("elegibilidade", "canal", "confianca", "confianca_score", "campos")):
            familia_fora_do_lugar += 1
        maior = SimpleNamespace(**{**r._asdict(),
                                   "area_cadastrada_m2": r.area_cadastrada_m2 * 1.1,
                                   "pagamento_iptu_anual": r.pagamento_iptu_anual * 1.1,
                                   "energia_media_mensal_6m": r.energia_media_mensal_6m * 1.1})
        a, z = _incendio_meio(motor.processar_caso(r, b, cal, catalogo)), _incendio_meio(motor.processar_caso(maior, b, cal, catalogo))
        variacoes.append((z - a) / a * 100)
        quedas += z < a

    conf = Counter(f["confianca"] for f in fichas)

    # Estabilidade: mexer 20% nos pesos das fontes e no desconto de completude não pode mudar
    # o nível de nenhum caso (o nível vem de regra, não de corte na nota).
    peso_orig, pen_orig = dict(P.PESO_FONTE), dict(P.PENALIDADE_COMPLETUDE)
    mudou_nivel = 0
    try:
        for fator in (0.8, 1.2):
            P.PESO_FONTE.update({k: min(1.0, v * fator) for k, v in peso_orig.items()})
            P.PENALIDADE_COMPLETUDE.update({k: v * fator for k, v in pen_orig.items()})
            for r in m.itertuples(index=False):
                novo = motor.processar_caso(r, bens.get(r.imovel_id, vazio), cal, catalogo)
                mudou_nivel += novo["confianca"] != base_nivel[r.imovel_id]
    finally:
        P.PESO_FONTE.update(peso_orig)
        P.PENALIDADE_COMPLETUDE.update(pen_orig)

    # Ordenação: quanto menor a confiança, mais larga a faixa de incêndio (máx ÷ mín).
    largura = {}
    for nivel in ("ALTA", "MEDIA", "BAIXA"):
        xs = [c["max"] / c["min"] for f in fichas if f["confianca"] == nivel
              for c in f["coberturas"] if c["cobertura"] == "INCENDIO_RAIO_EXPLOSAO_FUMACA"]
        if xs:
            largura[nivel] = round(statistics.median(xs), 2)
    fixas_ok = sum(set(catalogo[f["plano"]]) <= {c["cobertura"] for c in f["coberturas"]} for f in fichas)
    return {
        "casos_processados": n,
        "processados_pct": 100.0,
        "com_justificativa_pct": round(100 * (resultado.justificativa_recomendacao.str.len() > 0).mean(), 1),
        "completude_coberturas_fixas_pct": round(100 * fixas_ok / n, 1),
        "linhas_de_cobertura": len(coberturas),
        "faixas_vazias": int(coberturas.faixa_valor_min.isna().sum() + coberturas.faixa_valor_max.isna().sum()),
        "faixas_invertidas": int((coberturas.faixa_valor_min > coberturas.faixa_valor_max).sum()),
        "planos": dict(Counter(f["plano"] for f in fichas)),
        "elegibilidade": dict(Counter(f["elegibilidade"] for f in fichas)),
        "casos_com_confirmacao_de_elegibilidade": sum(bool(f["pendencias"]) for f in fichas),
        "confianca": dict(conf),
        "confianca_baixa_pct": round(100 * conf.get("BAIXA", 0) / n, 1),
        "confianca_estabilidade_casos_que_mudam_com_pesos_20pct": int(mudou_nivel),
        "confianca_largura_incendio_mediana": largura,
        "canal": dict(Counter(f["canal"] for f in fichas)),
        "perguntas_media": round(sum(len(f["perguntas"]) for f in fichas) / n, 2),
        "perguntas_candidatas_media": round(sum(f["perguntas_candidatas"] for f in fichas) / n, 2),
        "teste_justica_casos_alterados": mudou_justica,
        "familia_declarada_muda_plano": int(familia_muda_plano),
        "familia_declarada_muda_valor_ou_confianca": int(familia_fora_do_lugar),
        "sensibilidade_area_10pct_incendio_media_pct": round(sum(variacoes) / n, 2),
        "sensibilidade_area_casos_com_queda": int(quedas),
        "tempo_segundos": round(segundos, 2),
    }


def casos_contrastantes(fichas):
    """Casos para a demo e o vídeo. Os três primeiros são os perfis do slide 14
    (apartamento urbano, casa familiar, casa de lazer); depois, casos de canal e elegibilidade."""
    def primeiro(*conds):
        ordem = sorted(fichas, key=lambda f: f["imovel_id"])
        return next((f["imovel_id"] for cond in conds for f in ordem if cond(f)), None)
    tipo = lambda f: f["campos"]["tipo"]["valor"]
    uso = lambda f: f["campos"]["uso"]["valor"]
    motivo = lambda f, cod: any(m["codigo"] == cod for m in f["motivos"])
    eleg = lambda f: f["elegibilidade"] == "SIM"
    return {
        "perfil_A_apto_urbano": primeiro(
            lambda f: eleg(f) and tipo(f) == "APARTAMENTO" and uso(f) == "RESIDENCIAL_HABITUAL" and f["plano"] == "PRATICO"
            and (motivo(f, "ELETRONICOS") or motivo(f, "VIDROS")),
            lambda f: eleg(f) and tipo(f) == "APARTAMENTO" and f["plano"] == "PRATICO"),
        "perfil_B_casa_familiar": primeiro(
            lambda f: eleg(f) and tipo(f).startswith("CASA") and f["plano"] == "TOTAL" and motivo(f, "FAMILIA_DECLARADA"),
            lambda f: eleg(f) and tipo(f).startswith("CASA") and f["plano"] == "TOTAL"),
        "perfil_C_casa_lazer": primeiro(
            lambda f: eleg(f) and uso(f) == "LAZER_VERANEIO",
            lambda f: eleg(f) and uso(f) == "RESIDENCIAL_LOCADO_A_TERCEIROS"),
        "nao_elegivel_seguro_existente": primeiro(lambda f: any(p["codigo"] == "SEGURO_EXISTENTE" for p in f["pendencias"])
                                                  and not eleg(f)),
        "one_click_limpo": primeiro(lambda f: f["canal"] == "ONE_CLICK" and f["confianca"] == "ALTA" and not f["pendencias"]),
        "inquilino_total": primeiro(lambda f: f["campos"]["vinculo"]["valor"] == "INQUILINO" and f["plano"] == "TOTAL"),
        "elegibilidade_a_confirmar": primeiro(lambda f: any(p["codigo"] == "POSSIVEL_REFORMA" for p in f["pendencias"]))
                                     or primeiro(lambda f: bool(f["pendencias"])),
    }
