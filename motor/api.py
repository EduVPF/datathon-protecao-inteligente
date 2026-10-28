"""API de demonstração (T9): a mesma ficha para app, gerente e agentes autônomos.

Uso:
    pip install -r requirements-api.txt
    uvicorn api:app --app-dir motor --port 8000
Depois abra http://localhost:8000/docs para testar no navegador.
"""
from types import SimpleNamespace
from typing import Literal, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

import motor
from gerar import DADOS

app = FastAPI(title="Proteção Inteligente · Motor do Seguro Residencial",
              description="Recomendação explicável de seguro residencial. Mesma ficha das planilhas da entrega.")

_cal = motor.calibrar(motor.carregar(DADOS / "desenvolvimento"))
_teste = motor.carregar(DADOS / "teste_comum")
_linhas = (_teste["enderecos_imoveis"].merge(_teste["sinais_imobiliarios"], on=["imovel_id", "cliente_id"])
           .merge(_teste["clientes"], on="cliente_id").set_index("imovel_id", drop=False))
_bens = dict(tuple(_teste["bens_compras"].groupby("imovel_id_referencia")))
_vazio = _teste["bens_compras"].iloc[0:0]
_catalogo = _teste["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()
_principais = _linhas[_linhas.endereco_principal_compativel == "SIM"].groupby("cliente_id").imovel_id.apply(set).to_dict()
_n_imoveis = _linhas.groupby("cliente_id").imovel_id.nunique().to_dict()
FATOR_BENS = {"menos": 0.75, "isso": 1.0, "mais": 1.3}


class Confirmacoes(BaseModel):
    imovel_id: str
    bens: Optional[Literal["menos", "isso", "mais"]] = None   # resposta à pergunta dos bens
    area_m2: Optional[float] = Field(None, gt=0, le=10000)    # área informada pelo cliente (m²); 0 ou negativa é recusada


def _ficha(imovel_id, campos_extra=None, confirmados=()):
    if imovel_id not in _linhas.index:
        raise HTTPException(status_code=404, detail=f"imóvel {imovel_id} não está na base de teste")
    r = SimpleNamespace(**{**_linhas.loc[imovel_id].to_dict(), **(campos_extra or {})})
    outro = bool(_principais.get(r.cliente_id, set()) - {imovel_id})
    return motor.processar_caso(r, _bens.get(imovel_id, _vazio), _cal, _catalogo, outro, confirmados,
                                n_imoveis=_n_imoveis.get(r.cliente_id))


@app.get("/saude")
def saude():
    return {"ok": True, "casos": len(_linhas)}


@app.get("/fontes")
def fontes():
    """De quando é cada fonte externa salva. O motor não depende de nenhuma delas para rodar;
    `python motor/externos/coletar.py --ao-vivo` renova SINAPI e IPCA pelas APIs oficiais."""
    P = motor.P
    return {"sinapi": P.referencia("sinapi_uf.csv", "mes_referencia"),
            "ipca_ultimo_mes": P.referencia("ipca_mensal.csv", "data"),
            "cub": P.referencia("cub_uf.csv", "mes_referencia"),
            "fipezap": P.referencia("fipezap_aluguel.csv", "mes_referencia") or "set/2026",
            "desastres_s2id": "1991-2025 (base de 06/08/2026)", "aneel_continuidade": "2025"}


@app.get("/fichas/{imovel_id}")
def ficha(imovel_id: str):
    """A ficha completa: dados com origem e confiança, plano, motivo, coberturas, perguntas e canal."""
    return _ficha(imovel_id)


@app.post("/recomendar")
def recomendar(c: Confirmacoes):
    """Recalcula a ficha com as confirmações do cliente. Dado confirmado passa a valer o máximo."""
    base = _linhas.loc[c.imovel_id] if c.imovel_id in _linhas.index else None
    extra, confirmados = {}, []
    if base is not None and c.bens:
        f = FATOR_BENS[c.bens]
        for col in ["compras_moveis_36m", "compras_eletrodomesticos_36m", "compras_eletronicos_36m"]:
            extra[col] = float(base[col]) * f
        confirmados.append("bens")
    if c.area_m2 is not None:
        extra["area_cadastrada_m2"] = c.area_m2
        confirmados.append("area")
    return _ficha(c.imovel_id, extra, tuple(confirmados))
