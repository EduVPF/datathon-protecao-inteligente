"""Gera uma demo estática (um único HTML) com as duas jornadas — RASCUNHO.

Lê as fichas do motor e mostra, para o mesmo caso, a tela do cliente
(One Click Buy) e a tela do gerente (detalhe, rastreabilidade, alternativas).
"""
import json

HTML = r"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proteção Inteligente — rascunho</title>
<style>
:root{--bg:#f4f5f7;--card:#fff;--ink:#16181d;--mute:#5d6470;--line:#e2e5ea;--brand:#1f4fd1;--brand-ink:#fff;
--alta:#16794c;--media:#a86400;--baixa:#b3261e;--chip:#eef1f6}
@media (prefers-color-scheme:dark){:root{--bg:#111318;--card:#1a1d24;--ink:#eceef2;--mute:#9aa2ae;--line:#2a2f38;
--brand:#7aa2ff;--brand-ink:#0b1020;--alta:#4cc38a;--media:#f0b14a;--baixa:#ff8a80;--chip:#232833}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:16px;border-bottom:1px solid var(--line);background:var(--card)}
header h1{font-size:17px;margin:0 12px 0 0}select,button{font:inherit}
select{padding:8px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink);max-width:100%}
.tag{font-size:12px;padding:2px 8px;border-radius:99px;background:var(--chip);color:var(--mute);white-space:nowrap}
main{display:grid;grid-template-columns:380px 1fr;gap:24px;padding:24px;max-width:1400px;margin:auto}
@media (max-width:900px){main{grid-template-columns:1fr;padding:16px}}
h2{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin:0 0 10px}
.phone{background:var(--card);border:1px solid var(--line);border-radius:28px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.08)}
.plan{background:var(--brand);color:var(--brand-ink);border-radius:16px;padding:16px;margin:8px 0 14px}
.plan b{font-size:24px;display:block}.why{margin:0 0 14px;padding-left:18px}.why li{margin:4px 0}
.cov{display:flex;justify-content:space-between;gap:8px;padding:8px 0;border-bottom:1px solid var(--line);font-size:14px}
.cov small{color:var(--mute);display:block}.q{background:var(--chip);border-radius:12px;padding:10px 12px;margin:8px 0;font-size:14px}
.q .opts{display:flex;gap:8px;margin-top:8px}.q button{border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:99px;padding:4px 12px;cursor:pointer}
.q button.on{background:var(--brand);color:var(--brand-ink);border-color:var(--brand)}
.cta{width:100%;margin-top:14px;padding:14px;border:0;border-radius:14px;background:var(--brand);color:var(--brand-ink);font-weight:600;cursor:pointer}
.cta[disabled]{opacity:.45;cursor:not-allowed}.note{font-size:13px;color:var(--mute);margin-top:8px}
.panel{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:16px;overflow-x:auto}
.kpis{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px}.kpi{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 14px;min-width:120px}
.kpi span{display:block;font-size:12px;color:var(--mute)}.kpi b{font-size:18px}
table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-size:12px;color:var(--mute);font-weight:600}td.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.c{font-size:12px;font-weight:600;padding:1px 8px;border-radius:99px;border:1px solid currentColor;white-space:nowrap}
.c.ALTA{color:var(--alta)}.c.MEDIA{color:var(--media)}.c.BAIXA{color:var(--baixa)}
.motivo{display:flex;gap:8px;align-items:baseline;margin:6px 0}.pts{font-size:12px;color:var(--mute);min-width:70px}
.muted{color:var(--mute);font-size:13px}
</style></head><body>
<header><h1>Proteção Inteligente <span class="tag">rascunho</span></h1>
<select id="sel"></select><span class="tag" id="info"></span></header>
<main>
<section><h2>Jornada do cliente · app</h2><div class="phone" id="cliente"></div></section>
<section><h2>Jornada do gerente · mesma ficha, com o detalhe</h2><div id="gerente"></div></section>
</main>
<script>
const F = __FICHAS__;
const brl = v => "R$ " + Math.round(v).toLocaleString("pt-BR");
const ACENTO = {PRATICO:"Prático",ELETRICOS:"elétricos",AGUA:"água",INCENDIO:"Incêndio",EXPLOSAO:"explosão",VEICULOS:"veículos",
  AERONAVE:"aeronave",FUMACA:"fumaça",VIDROS:"vidros",RESPONSABILIDADE:"Responsabilidade",PROPRIETARIO:"Proprietário",
  CONDOMINIO:"condomínio",VERANEIO:"veraneio",ESTIMADO:"Estimado",AREA:"Área",VINCULO:"Vínculo",CONTEUDO:"Conteúdo",INFERIDO:"Inferido",OBSERVADO:"Observado"};
const nome = s => s.split("_").map(w=>ACENTO[w]||w.toLowerCase()).join(" ").replace(/^./,c=>c.toUpperCase());
const badge = c => `<span class="c ${c}">${c}</span>`;
const sel = document.getElementById("sel");
F.forEach((f,i)=>sel.add(new Option(`${f.imovel_id} · ${f.plano} · ${f.canal==="ONE_CLICK"?"1 clique":"gerente"}`, i)));
sel.onchange = () => render(F[sel.value]);

function render(f){
  document.getElementById("info").textContent = `${f.local} · ${nome(f.campos.tipo.valor)} · confiança ${f.confianca} (${f.confianca_score})`;
  const why = f.motivos_plano.map(m=>`<li>${m.texto.charAt(0).toUpperCase()+m.texto.slice(1)}</li>`).join("");
  const covs = f.coberturas.map(c=>`<div class="cov"><span>${nome(c.cobertura)}${c.tipo==="ADICIONAL"?" <span class='tag'>adicional</span>":""}</span>
     <span style="text-align:right">${brl((c.min+c.max)/2)}<small>${brl(c.min)} – ${brl(c.max)}</small></span></div>`).join("");
  const qs = f.perguntas.map((q,i)=>`<div class="q">${q.texto}<div class="opts">
     <button data-q="${i}" data-v="sim">Sim, confere</button><button data-q="${i}" data-v="nao">Ajustar</button></div></div>`).join("");
  const oneClick = f.canal==="ONE_CLICK";
  document.getElementById("cliente").innerHTML = `
    <div class="muted">Olá! Preparamos sua proteção com o que já sabemos.</div>
    <div class="plan">Plano sugerido<b>${nome(f.plano)}</b>${nome(f.campos.tipo.valor)} em ${f.local}</div>
    <h2>Por que este plano</h2><ul class="why">${why}</ul>
    ${qs?`<h2>Só confirme ${f.perguntas.length===1?"isto":"isto aqui"}</h2>${qs}`:""}
    <h2 style="margin-top:14px">Coberturas</h2>${covs}
    <button class="cta" id="cta" ${f.perguntas.length?"disabled":""}>${oneClick?"Contratar em 1 clique":"Falar com um especialista"}</button>
    <div class="note" id="nota">${oneClick?"Valores ajustáveis depois. Você pode trocar para o plano "+nome(f.alternativa.plano)+".":
      "Alguns pontos precisam de confirmação; um especialista termina com você."}</div>`;
  const resp = {};
  document.querySelectorAll(".q button").forEach(b=>b.onclick=()=>{
    resp[b.dataset.q]=b.dataset.v;
    b.parentNode.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
    const todas = Object.keys(resp).length===f.perguntas.length;
    document.getElementById("cta").disabled = !todas;
    if (Object.values(resp).includes("nao")) document.getElementById("nota").textContent =
      "Você ajustou uma informação: a proposta é recalculada (na versão final) ou segue para um especialista.";
  });

  const campos = Object.entries(f.campos).map(([k,d])=>`<tr><td>${nome(k)}</td><td><b>${typeof d.valor==="number"?(k==="area"?d.valor+" m²":brl(d.valor)):nome(String(d.valor))}</b>
     ${d.min!==undefined&&d.min!==d.max?`<div class="muted">${k==="area"?Math.round(d.min)+"–"+Math.round(d.max)+" m²":brl(d.min)+" – "+brl(d.max)}</div>`:""}</td>
     <td>${nome(d.natureza)}</td><td>${badge(d.confianca)}</td><td class="muted">${d.fonte}</td></tr>`).join("");
  const motivos = f.motivos.map(m=>`<div class="motivo"><span class="pts">${m.plano}${m.peso?" +"+m.peso:""}</span><span>${m.texto}</span></div>`).join("");
  const covT = f.coberturas.map(c=>`<tr><td>${nome(c.cobertura)}${c.tipo==="ADICIONAL"?" <span class='tag'>adicional</span>":""}</td>
     <td class="num">${brl(c.min)}</td><td class="num">${brl(c.max)}</td><td>${badge(c.confianca)}</td><td class="muted">${c.regra}</td></tr>`).join("");
  const pend = f.pendencias.map(p=>`<li>${p.texto}</li>`).join("");
  const perg = f.perguntas.map(q=>`<tr><td class="num">${q.prioridade}</td><td>${q.texto}</td></tr>`).join("");
  document.getElementById("gerente").innerHTML = `
    <div class="kpis">
      <div class="kpi"><span>Plano</span><b>${nome(f.plano)}</b></div>
      <div class="kpi"><span>Elegibilidade</span><b>${nome(f.elegibilidade)}</b></div>
      <div class="kpi"><span>Confiança geral</span><b>${f.confianca} · ${f.confianca_score}</b></div>
      <div class="kpi"><span>Canal sugerido</span><b>${f.canal==="ONE_CLICK"?"1 clique":"Gerente"}</b></div>
      <div class="kpi"><span>Pontos Prático / Total</span><b>${f.pontos.pratico} / ${f.pontos.total}</b></div>
    </div>
    ${pend?`<div class="panel"><h2>Elegibilidade a confirmar</h2><ul>${pend}</ul></div>`:""}
    <div class="panel"><h2>Motivos da recomendação</h2>${motivos}
      <p class="muted"><b>Alternativa:</b> ${f.alternativa.texto}</p></div>
    <div class="panel"><h2>O que sabemos e de onde veio</h2><table><tr><th>Dado</th><th>Valor</th><th>Natureza</th><th>Confiança</th><th>Fonte</th></tr>${campos}</table>
      <p class="muted">Cliente: ${f.perfil.idade} anos · renda ${brl(f.perfil.renda)} (${nome(f.perfil.origem_renda)}) · ${f.perfil.dependentes} dependente(s) · pet ${f.perfil.pet} · app ${f.perfil.usuario_app} (maturidade ${f.perfil.maturidade_digital})<br>
      Valor de reconstrução do imóvel: ${brl(f.valor_imovel.min)} – ${brl(f.valor_imovel.max)} (${brl(f.valor_imovel.cub_m2)}/m²)</p></div>
    <div class="panel"><h2>Coberturas e faixas</h2><table><tr><th>Cobertura</th><th>Mín.</th><th>Máx.</th><th>Confiança</th><th>Regra</th></tr>${covT}</table></div>
    <div class="panel"><h2>Perguntas priorizadas (${f.perguntas.length} de ${f.perguntas_candidatas})</h2>
      ${perg?`<table><tr><th>Prioridade</th><th>Pergunta</th></tr>${perg}</table>`:"<p class='muted'>Nenhuma: dados suficientes.</p>"}</div>`;
}
render(F[0]);
</script></body></html>"""


def gerar_demo(fichas, destino):
    destino.write_text(HTML.replace("__FICHAS__", json.dumps(fichas, ensure_ascii=False)), encoding="utf-8")
