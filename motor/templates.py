"""Validação das 2 planilhas da entrega contra as regras do guia (§5 e §7).

validar_templates() devolve a lista de problemas encontrados; lista vazia = ok.
"""
import pandas as pd


def validar_templates(resultado, coberturas, template, template_coberturas, catalogo):
    erros = []
    fixas = catalogo.groupby("plano").cobertura_fixa.apply(set).to_dict()
    nomes_validos = set(catalogo.cobertura_fixa)

    # planilha 1: mesmas linhas, na mesma ordem, e as mesmas colunas do template
    if list(resultado.columns) != list(template.columns):
        erros.append("resultado: colunas diferentes do template")
    chaves = ["cliente_id", "imovel_id"]
    if not resultado[chaves].reset_index(drop=True).equals(template[chaves].reset_index(drop=True)):
        erros.append("resultado: linhas diferentes (ou fora de ordem) do template")
    for col in ["elegivel", "plano_recomendado", "justificativa_recomendacao", "confianca_geral"]:
        vazios = resultado[col].isna() | (resultado[col].astype(str).str.strip() == "")
        if vazios.any():
            erros.append(f"resultado: {int(vazios.sum())} linha(s) sem {col}")
    if not resultado.elegivel.isin(["SIM", "NAO"]).all():
        erros.append("resultado: elegivel fora de SIM/NAO")
    nao = resultado[resultado.elegivel == "NAO"]
    if (nao.motivo_inelegibilidade.fillna("").str.strip() == "").any():
        erros.append("resultado: caso NAO sem motivo de inelegibilidade")
    if not resultado.plano_recomendado.isin(list(fixas)).all():
        erros.append("resultado: plano fora do catálogo")

    # planilha 2: colunas, nomes do catálogo, faixas numéricas e coberturas fixas presentes
    if list(coberturas.columns) != list(template_coberturas.columns):
        erros.append("coberturas: colunas diferentes do template")
    fora = set(coberturas.cobertura) - nomes_validos
    if fora:
        erros.append(f"coberturas: nomes fora do catálogo (ou assistências): {sorted(fora)}")
    for col in ["faixa_valor_min", "faixa_valor_max"]:
        if not pd.api.types.is_integer_dtype(coberturas[col]):
            erros.append(f"coberturas: {col} não é número inteiro")
        if coberturas[col].isna().any():
            erros.append(f"coberturas: {col} vazio")
    if (coberturas.faixa_valor_min > coberturas.faixa_valor_max).any():
        erros.append("coberturas: faixa com mínimo maior que o máximo")
    if (coberturas.faixa_valor_min < 0).any():
        erros.append("coberturas: faixa negativa")
    niveis = {"ALTA", "MEDIA", "BAIXA"}
    if not resultado.confianca_geral.isin(niveis).all() or not coberturas.confianca_estimativa.isin(niveis).all():
        erros.append("confiança fora de ALTA/MEDIA/BAIXA")
    if coberturas.duplicated(["cliente_id", "imovel_id", "cobertura"]).any():
        erros.append("coberturas: a mesma cobertura repetida no mesmo caso")
    por_caso = coberturas.groupby(["cliente_id", "imovel_id"]).cobertura.apply(set).to_dict()
    for row in resultado.itertuples(index=False):
        tem = por_caso.get((row.cliente_id, row.imovel_id), set())
        faltam = fixas.get(row.plano_recomendado, set()) - tem
        if faltam:
            erros.append(f"coberturas: {row.imovel_id} sem as fixas {sorted(faltam)}")
        # RN-33: a lista da planilha 1 e as linhas da planilha 2 têm de ser as mesmas coberturas
        listadas = {c.strip() for c in str(row.coberturas_recomendadas).split(";") if c.strip()}
        if listadas != tem:
            erros.append(f"{row.imovel_id}: coberturas_recomendadas diferente das linhas da planilha de coberturas")
    return erros
