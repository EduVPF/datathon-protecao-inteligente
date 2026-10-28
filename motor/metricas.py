"""Evidências para a banca (guia §8): métricas da base de teste e casos contrastantes."""
from collections import Counter
from types import SimpleNamespace

import motor


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

    # Justiça: trocar renda, idade, dependentes e pet não pode mudar nada.
    # Sensibilidade: área 10% maior deve aumentar (ou manter) o incêndio.
    mudou_justica, variacoes, quedas = 0, [], 0
    for r in m.itertuples(index=False):
        b = bens.get(r.imovel_id, vazio)
        trocado = SimpleNamespace(**{**r._asdict(), "renda_mensal": 99999, "idade": 99,
                                     "quantidade_dependentes": 9, "possui_pet_informado": "SIM"})
        if motor.processar_caso(trocado, b, cal, catalogo) != motor.processar_caso(r, b, cal, catalogo):
            mudou_justica += 1
        maior = SimpleNamespace(**{**r._asdict(),
                                   "area_cadastrada_m2": r.area_cadastrada_m2 * 1.1,
                                   "pagamento_iptu_anual": r.pagamento_iptu_anual * 1.1,
                                   "energia_media_mensal_6m": r.energia_media_mensal_6m * 1.1})
        a, z = _incendio_meio(motor.processar_caso(r, b, cal, catalogo)), _incendio_meio(motor.processar_caso(maior, b, cal, catalogo))
        variacoes.append((z - a) / a * 100)
        quedas += z < a

    conf = Counter(f["confianca"] for f in fichas)
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
        "canal": dict(Counter(f["canal"] for f in fichas)),
        "perguntas_media": round(sum(len(f["perguntas"]) for f in fichas) / n, 2),
        "perguntas_candidatas_media": round(sum(f["perguntas_candidatas"] for f in fichas) / n, 2),
        "teste_justica_casos_alterados": mudou_justica,
        "sensibilidade_area_10pct_incendio_media_pct": round(sum(variacoes) / n, 2),
        "sensibilidade_area_casos_com_queda": int(quedas),
        "tempo_segundos": round(segundos, 2),
    }


def casos_contrastantes(fichas):
    """Três casos para a demo e o vídeo: 1 toque limpo, inquilino no Total e elegibilidade a confirmar."""
    def primeiro(cond):
        return next((f["imovel_id"] for f in sorted(fichas, key=lambda f: f["imovel_id"]) if cond(f)), None)
    return {
        "one_click_limpo": primeiro(lambda f: f["canal"] == "ONE_CLICK" and f["confianca"] == "ALTA" and not f["pendencias"]),
        "inquilino_total": primeiro(lambda f: f["campos"]["vinculo"]["valor"] == "INQUILINO" and f["plano"] == "TOTAL"),
        "elegibilidade_a_confirmar": primeiro(lambda f: any(p["codigo"] == "POSSIVEL_REFORMA" for p in f["pendencias"]))
                                     or primeiro(lambda f: bool(f["pendencias"])),
    }
