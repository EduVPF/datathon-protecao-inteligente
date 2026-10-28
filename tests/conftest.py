"""Fixtures compartilhadas: carregam as bases uma vez por sessão de testes."""
import sys
from pathlib import Path
from types import SimpleNamespace

import pandas as pd
import pytest

RAIZ = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "motor"))

import motor  # noqa: E402


@pytest.fixture(scope="session")
def dev():
    return motor.carregar(RAIZ / "dados" / "desenvolvimento")


@pytest.fixture(scope="session")
def teste():
    return motor.carregar(RAIZ / "dados" / "teste_comum")


@pytest.fixture(scope="session")
def cal(dev):
    return motor.calibrar(dev)


def _mesclado(dados):
    return (dados["enderecos_imoveis"]
            .merge(dados["sinais_imobiliarios"], on=["imovel_id", "cliente_id"])
            .merge(dados["clientes"], on="cliente_id"))


@pytest.fixture(scope="session")
def linha(dev):
    """linha(**campos): uma linha real da base de desenvolvimento com campos sobrescritos."""
    base = _mesclado(dev).iloc[0].to_dict()

    def _f(**campos):
        return SimpleNamespace(**{**base, **campos})
    return _f


@pytest.fixture(scope="session")
def caso(teste):
    """caso(imovel_id) -> (linha, bens do imóvel) da base Teste Comum."""
    m = _mesclado(teste)
    b = teste["bens_compras"]

    def _f(imovel_id):
        r = SimpleNamespace(**m[m.imovel_id == imovel_id].iloc[0].to_dict())
        return r, b[b.imovel_id_referencia == imovel_id]
    return _f


@pytest.fixture(scope="session")
def vazio(teste):
    return teste["bens_compras"].iloc[0:0]


@pytest.fixture(scope="session")
def ficha(teste, cal, caso):
    """ficha(imovel_id, **campos): ficha de um caso da base de teste, com campos sobrescritos."""
    catalogo = teste["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()

    def _f(imovel_id, **campos):
        r, b = caso(imovel_id)
        r = SimpleNamespace(**{**vars(r), **campos})
        return motor.processar_caso(r, b, cal, catalogo)
    return _f
