"""T9: API de demonstração. Pula se as dependências da API não estiverem instaladas."""
import pytest

pytest.importorskip("fastapi")
pytest.importorskip("httpx")
from fastapi.testclient import TestClient  # noqa: E402

import api  # noqa: E402

cliente = TestClient(api.app)


def test_ficha_existente():
    r = cliente.get("/fichas/IMO_CASO_00005_01")
    assert r.status_code == 200 and r.json()["plano"] in {"ESSENCIAL", "PRATICO", "TOTAL"}


def test_ficha_inexistente():
    assert cliente.get("/fichas/XXX").status_code == 404


def test_confirmar_bens_sobe_a_confianca():
    antes = cliente.get("/fichas/IMO_CASO_00005_01").json()["confianca_score"]
    depois = cliente.post("/recomendar", json={"imovel_id": "IMO_CASO_00005_01", "bens": "isso"}).json()
    assert depois["confianca_score"] > antes and depois["campos"]["bens"]["natureza"] == "CONFIRMADO"


def test_confirmar_mais_bens_aumenta_o_roubo():
    def roubo(f):
        return next(c for c in f["coberturas"] if c["cobertura"] == "ROUBO_FURTO_ARROMBAMENTO")["max"]
    isso = cliente.post("/recomendar", json={"imovel_id": "IMO_CASO_00005_01", "bens": "isso"}).json()
    mais = cliente.post("/recomendar", json={"imovel_id": "IMO_CASO_00005_01", "bens": "mais"}).json()
    assert roubo(mais) > roubo(isso)
