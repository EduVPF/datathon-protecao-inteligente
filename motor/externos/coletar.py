"""Atualiza as fontes externas pelas APIs oficiais. O motor NÃO chama a internet:
ele lê os CSVs desta pasta, que este script renova. Se uma API falhar, o CSV salvo
fica como está (com a data de referência), e o motor segue funcionando (RN-12).
Uso:
    python motor/externos/coletar.py --ao-vivo             SINAPI (IBGE/SIDRA) e IPCA (Banco Central) pelas APIs
    python motor/externos/coletar.py                       só o IPCA
    python motor/externos/coletar.py --atlas ARQUIVO.csv   resume a base do Atlas de Desastres

A base do Atlas (86 MB) é baixada à mão em https://atlasdigital.mdr.gov.br/paginas/downloads.xhtml
("Ponto e Vírgula (CSV)"); o portal de dados abertos do MIDR recusa downloads automáticos.
"""
import argparse
import csv
import datetime
import json
import urllib.request
from pathlib import Path

PASTA = Path(__file__).resolve().parent
IPCA_API = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json"
# SINAPI no SIDRA (IBGE): tabela 6586 = custo médio do m² sem desoneração (variável 9327);
# tabela 2296 = com desoneração (variável 48). Nível 3 = UF; último mês publicado.
SIDRA_SINAPI = {"sem": ("6586", "9327"), "com": ("2296", "48")}
UFS = {"SP": 35, "RJ": 33, "MG": 31, "PR": 41, "RS": 43, "DF": 53, "GO": 52, "BA": 29, "PE": 26, "CE": 23}


def _baixar_json(url, timeout):
    with urllib.request.urlopen(url, timeout=timeout) as resp:
        return json.load(resp)

# As 10 capitais da base do datathon (código IBGE → município, UF)
CAPITAIS = {2304400: ("Fortaleza", "CE"), 2611606: ("Recife", "PE"), 2927408: ("Salvador", "BA"),
            3106200: ("Belo Horizonte", "MG"), 3304557: ("Rio de Janeiro", "RJ"), 3550308: ("Sao Paulo", "SP"),
            4106902: ("Curitiba", "PR"), 4314902: ("Porto Alegre", "RS"), 5208707: ("Goiania", "GO"),
            5300108: ("Brasilia", "DF")}
# COBRADE → grupo da cobertura. Inundação de rio e deslizamento ficam fora (exclusões comuns do residencial).
GRUPOS_COBRADE = {13214: "agua", 12300: "agua", 12200: "agua",     # chuvas intensas, alagamentos, enxurradas
                  13215: "vento", 13213: "vento", 13112: "vento"}  # vendavais e ciclones, granizo


def atualizar_ipca(timeout=20):
    dados = _baixar_json(IPCA_API, timeout)
    with open(PASTA / "ipca_mensal.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["data", "variacao_mensal_pct"])
        for d in dados:
            w.writerow([d["data"], d["valor"]])
    print(f"IPCA: {len(dados)} meses gravados ({dados[0]['data']} a {dados[-1]['data']})")


def atualizar_sinapi(ufs=UFS, timeout=20):
    """Custo médio do m² por UF, com e sem desoneração, no último mês do SIDRA."""
    valores, mes = {}, None
    for tipo, (tabela, variavel) in SIDRA_SINAPI.items():
        url = (f"https://apisidra.ibge.gov.br/values/t/{tabela}/n3/{','.join(map(str, ufs.values()))}"
               f"/v/{variavel}/p/last%201?formato=json")
        for linha in _baixar_json(url, timeout)[1:]:   # a primeira linha é o cabeçalho
            valores.setdefault(int(linha["D1C"]), {})[tipo] = float(linha["V"])
            mes = linha["D3C"]
    hoje = datetime.date.today().isoformat()
    with open(PASTA / "sinapi_uf.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["uf", "sinapi_m2_sem_desoneracao", "sinapi_m2_com_desoneracao", "mes_referencia", "fonte", "data_acesso"])
        for uf, cod in ufs.items():
            v = valores[cod]
            w.writerow([uf, f"{v['sem']:.2f}", f"{v['com']:.2f}", f"{mes[:4]}-{mes[4:]}",
                        "IBGE SINAPI via API SIDRA (tabelas 6586 e 2296)", hoje])
    print(f"SINAPI: {len(ufs)} UFs gravadas ({mes[:4]}-{mes[4:]})")


def atualizar_tudo(timeout=5):
    """Tenta cada API; a que falhar mantém o CSV salvo. Devolve o que aconteceu com cada fonte."""
    resultado = {}
    for nome, funcao in (("sinapi", atualizar_sinapi), ("ipca", atualizar_ipca)):
        try:
            funcao(timeout=timeout)
            resultado[nome] = "atualizado pela API"
        except Exception as erro:   # sem internet, API fora do ar ou formato novo: segue com o salvo
            resultado[nome] = f"mantido o valor salvo ({type(erro).__name__})"
    return resultado


def _numero(texto):
    try:
        return float(str(texto).replace(".", "").replace(",", "."))
    except ValueError:
        return 0.0


def resumir_atlas(caminho):
    """Lê o CSV do Atlas (separador ;, latin-1) e grava desastres_municipio.csv com, por capital e
    grupo: registros 1991–2025, registros 2016–2025, último ano e moradias danificadas ou destruídas."""
    resumo = {cod: {g: {"total": 0, "dez_anos": 0, "ultimo": 0, "moradias": 0} for g in ("agua", "vento")}
              for cod in CAPITAIS}
    with open(caminho, encoding="latin-1") as f:
        for l in csv.DictReader(f, delimiter=";"):
            try:
                cod, cobrade = int(float(l["Cod_IBGE_Mun"])), int(float(l["Cod_Cobrade"]))
            except (TypeError, ValueError):
                continue
            grupo = GRUPOS_COBRADE.get(cobrade)
            if cod not in CAPITAIS or not grupo:
                continue
            ano = int(l["Data_Evento"][-4:]) if l["Data_Evento"][-4:].isdigit() else 0
            g = resumo[cod][grupo]
            g["total"] += 1
            g["dez_anos"] += ano >= 2016
            g["ultimo"] = max(g["ultimo"], ano)
            g["moradias"] += _numero(l["DM_Uni Habita Danificadas"]) + _numero(l["DM_Uni Habita Destruidas"])
    with open(PASTA / "desastres_municipio.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, lineterminator="\n")
        w.writerow(["codigo_ibge_municipio", "municipio", "uf"]
                   + [f"{g}_{c}" for g in ("agua", "vento")
                      for c in ("registros_1991_2025", "registros_2016_2025", "ultimo_ano", "moradias_atingidas")]
                   + ["fonte", "acesso"])
        for cod, (mun, uf) in CAPITAIS.items():
            linha = [cod, mun, uf]
            for g in ("agua", "vento"):
                x = resumo[cod][g]
                linha += [x["total"], x["dez_anos"], x["ultimo"] or "", int(x["moradias"])]
            w.writerow(linha + ["Atlas Digital de Desastres no Brasil / S2iD (Sedec/MIDR), base 1991-2025 v1.1 de 06/08/2026",
                                "28/10/2026"])
    print(f"Atlas: {len(CAPITAIS)} capitais gravadas em desastres_municipio.csv")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--atlas", type=Path, help="CSV do Atlas de Desastres baixado à mão")
    ap.add_argument("--ao-vivo", action="store_true", help="SINAPI e IPCA pelas APIs do IBGE e do Banco Central")
    args = ap.parse_args()
    if args.ao_vivo:
        print(atualizar_tudo())
    elif args.atlas:
        resumir_atlas(args.atlas)
    else:
        atualizar_ipca()
