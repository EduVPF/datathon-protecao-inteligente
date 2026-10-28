"""Roda o motor de ponta a ponta — RASCUNHO.

1. Calibra a estimativa de área na base de desenvolvimento (dados/desenvolvimento).
2. Processa a base Teste Comum (dados/teste_comum).
3. Grava os dois templates, as fichas (JSON para as telas) e as métricas.

Uso:  python motor/gerar.py
"""
import json
import sys
import time
from collections import Counter
from pathlib import Path

import motor

DADOS = Path(__file__).resolve().parent.parent / "dados"
SAIDA = Path(__file__).resolve().parent / "saida"


def metricas(fichas, resultado, cob, segundos):
    n = len(fichas)
    planos_ok = all(
        set(motor_catalogo[f["plano"]]) <= {c["cobertura"] for c in f["coberturas"]} for f in fichas)
    return {
        "casos": n,
        "processados_pct": round(100 * resultado.plano_recomendado.notna().mean(), 1),
        "com_justificativa_pct": round(100 * (resultado.justificativa_recomendacao.str.len() > 0).mean(), 1),
        "planos": dict(Counter(f["plano"] for f in fichas)),
        "elegibilidade": dict(Counter(f["elegibilidade"] for f in fichas)),
        "confianca": dict(Counter(f["confianca"] for f in fichas)),
        "canal": dict(Counter(f["canal"] for f in fichas)),
        "perguntas_media": round(sum(len(f["perguntas"]) for f in fichas) / n, 2),
        "perguntas_candidatas_media": round(sum(f["perguntas_candidatas"] for f in fichas) / n, 2),
        "linhas_coberturas": len(cob),
        "coberturas_sem_faixa": int(cob.faixa_valor_min.isna().sum()),
        "faixas_invertidas": int((cob.faixa_valor_min > cob.faixa_valor_max).sum()),
        "todas_fixas_presentes": planos_ok,
        "tempo_segundos": round(segundos, 2),
    }


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    inicio = time.time()
    dev = motor.carregar(DADOS / "desenvolvimento")
    cal = motor.calibrar(dev)
    print(f"Calibração: {cal['n_calibracao']} imóveis com área, erro mediano {cal['erro_mediano_m2']:.1f} m²")

    teste = motor.carregar(DADOS / "teste_comum")
    motor_catalogo = teste["catalogo"].groupby("plano").cobertura_fixa.apply(list).to_dict()
    fichas = motor.processar(teste, cal)
    resultado, cob = motor.para_templates(fichas, teste["template"])

    SAIDA.mkdir(exist_ok=True)
    resultado.to_csv(SAIDA / "template_resultado_times.csv", index=False, encoding="utf-8-sig")
    cob.to_csv(SAIDA / "template_coberturas_times.csv", index=False, encoding="utf-8-sig")
    (SAIDA / "fichas.json").write_text(json.dumps(fichas, ensure_ascii=False, indent=1), encoding="utf-8")
    (SAIDA / "calibracao.json").write_text(json.dumps(cal, ensure_ascii=False, indent=1), encoding="utf-8")
    m = metricas(fichas, resultado, cob, time.time() - inicio)
    (SAIDA / "metricas.json").write_text(json.dumps(m, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(m, ensure_ascii=False, indent=1))
