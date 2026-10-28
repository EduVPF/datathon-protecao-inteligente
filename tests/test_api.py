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


def test_area_zero_ou_negativa_e_recusada():
    for area in (0, -50):
        r = cliente.post("/recomendar", json={"imovel_id": "IMO_CASO_00005_01", "area_m2": area})
        assert r.status_code == 422


def test_fontes_com_data():
    f = cliente.get("/fontes").json()
    assert f["sinapi"].startswith("20") and f["ipca_ultimo_mes"]
