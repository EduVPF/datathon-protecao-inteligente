"""F4: fontes ao vivo com reserva. Nenhum teste usa a internet: as APIs são simuladas."""
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "motor" / "externos"))

import coletar  # noqa: E402


def _sidra(valor_por_uf, mes="202609"):
    cab = {"V": "Valor", "D1C": "Unidade da Federação (Código)", "D3C": "Mês (Código)"}
    return [cab] + [{"V": str(v), "D1C": str(cod), "D3C": mes} for cod, v in valor_por_uf.items()]


def test_sinapi_ao_vivo_grava_o_csv(tmp_path, monkeypatch):
    monkeypatch.setattr(coletar, "PASTA", tmp_path)
    respostas = {"6586": _sidra({41: 2287.43, 35: 2210.0}), "2296": _sidra({41: 2161.79, 35: 2090.0})}
    monkeypatch.setattr(coletar, "_baixar_json", lambda url, timeout: respostas["6586" if "/t/6586/" in url else "2296"])
    coletar.atualizar_sinapi(ufs={"PR": 41, "SP": 35})
    linhas = (tmp_path / "sinapi_uf.csv").read_text(encoding="utf-8").splitlines()
    assert linhas[0].startswith("uf,sinapi_m2_sem_desoneracao,sinapi_m2_com_desoneracao,mes_referencia")
    assert "PR,2287.43,2161.79,2026-09" in linhas[1] + linhas[2]


def test_api_fora_do_ar_mantem_o_valor_salvo(tmp_path, monkeypatch):
    monkeypatch.setattr(coletar, "PASTA", tmp_path)
    salvo = "uf,sinapi_m2_sem_desoneracao\nPR,1000\n"
    (tmp_path / "sinapi_uf.csv").write_text(salvo, encoding="utf-8")

    def falha(url, timeout):
        raise OSError("sem internet")
    monkeypatch.setattr(coletar, "_baixar_json", falha)
    resultado = coletar.atualizar_tudo(timeout=1)
    assert (tmp_path / "sinapi_uf.csv").read_text(encoding="utf-8") == salvo
    assert resultado["sinapi"].startswith("mantido") and resultado["ipca"].startswith("mantido")


def test_ipca_ao_vivo(tmp_path, monkeypatch):
    monkeypatch.setattr(coletar, "PASTA", tmp_path)
    meses = [{"data": f"01/{m:02d}/2026", "valor": "0.3"} for m in range(1, 13)]
    monkeypatch.setattr(coletar, "_baixar_json", lambda url, timeout: meses)
    coletar.atualizar_ipca()
    linhas = (tmp_path / "ipca_mensal.csv").read_text(encoding="utf-8").splitlines()
    assert len(linhas) == 13 and linhas[1].split(",") == ["01/01/2026", "0.3"]


def test_resposta_incompleta_nao_apaga_o_salvo(tmp_path, monkeypatch):
    monkeypatch.setattr(coletar, "PASTA", tmp_path)
    for nome in ("sinapi_uf.csv", "ipca_mensal.csv"):
        (tmp_path / nome).write_text("salvo\n", encoding="utf-8")
    monkeypatch.setattr(coletar, "_baixar_json", lambda url, timeout: [] if "bcb" in url else _sidra({41: 1.0}))
    resultado = coletar.atualizar_tudo(timeout=1)
    assert all(v.startswith("mantido") for v in resultado.values())
    assert all((tmp_path / n).read_text(encoding="utf-8") == "salvo\n" for n in ("sinapi_uf.csv", "ipca_mensal.csv"))
