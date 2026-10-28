"""Atualiza as fontes externas. Rodar só quando quiser atualizar.

O motor NÃO chama este script: ele lê os CSVs desta pasta, para funcionar sem internet.
Uso:
    python motor/externos/coletar.py                       atualiza o IPCA (API do Banco Central)
    python motor/externos/coletar.py --atlas ARQUIVO.csv   resume a base do Atlas de Desastres

A base do Atlas (86 MB) é baixada à mão em https://atlasdigital.mdr.gov.br/paginas/downloads.xhtml
("Ponto e Vírgula (CSV)"); o portal de dados abertos do MIDR recusa downloads automáticos.
"""
import argparse
import csv
import json
import urllib.request
from pathlib import Path

PASTA = Path(__file__).resolve().parent
IPCA_API = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json"

# As 10 capitais da base do datathon (código IBGE → município, UF)
CAPITAIS = {2304400: ("Fortaleza", "CE"), 2611606: ("Recife", "PE"), 2927408: ("Salvador", "BA"),
            3106200: ("Belo Horizonte", "MG"), 3304557: ("Rio de Janeiro", "RJ"), 3550308: ("Sao Paulo", "SP"),
            4106902: ("Curitiba", "PR"), 4314902: ("Porto Alegre", "RS"), 5208707: ("Goiania", "GO"),
            5300108: ("Brasilia", "DF")}
# COBRADE → grupo da cobertura. Inundação de rio e deslizamento ficam fora (exclusões comuns do residencial).
GRUPOS_COBRADE = {13214: "agua", 12300: "agua", 12200: "agua",     # chuvas intensas, alagamentos, enxurradas
                  13215: "vento", 13213: "vento", 13112: "vento"}  # vendavais e ciclones, granizo


def atualizar_ipca():
    with urllib.request.urlopen(IPCA_API, timeout=20) as resp:
        dados = json.load(resp)
    with open(PASTA / "ipca_mensal.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["data", "variacao_mensal_pct"])
        for d in dados:
            w.writerow([d["data"], d["valor"]])
    print(f"IPCA: {len(dados)} meses gravados ({dados[0]['data']} a {dados[-1]['data']})")


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
    args = ap.parse_args()
    if args.atlas:
        resumir_atlas(args.atlas)
    else:
        atualizar_ipca()
