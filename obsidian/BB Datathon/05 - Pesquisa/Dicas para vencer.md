---
tags: [pesquisa, estrategia]
---
# Dicas para vencer o datathon

## O que os jurados costumam avaliar
Regulamentos de datathons/hackathons brasileiros e portugueses repetem os mesmos critérios:
- **Problema real e impacto** (valor de negócio, monetização) — pesa mais que sofisticação técnica.
- **Viabilidade** — dá para o BB implementar de verdade? Usa canais que já existem (App BB, gerente PJ)?
- **Inovação** na abordagem.
- **MVP funcionando** na demo (em vários eventos é obrigatório demonstrar ao vivo).
- **Qualidade do pitch** — normalmente 5 a 8 minutos.

> ⚠️ Confirmar no regulamento **deste** evento os critérios e o tempo de pitch, e otimizar para eles.

## Estratégia para o nosso caso
1. **Comece pela dor, não pelo modelo.** Frase-guia: *"Para o cliente BB que não sabe responder a entrevista do seguro residencial (nem sabe que tem a dor), nosso motor entrega uma proposta pronta, com 2–3 perguntas e um motivo claro, e dá ao gerente o argumento de venda."*
2. **Os dados são a prova.** Todo argumento do pitch deve vir com um número tirado dos CSVs (ex.: "em X% dos imóveis conseguimos inferir o tipo com alta confiança, então a entrevista cai de 15 para 2 perguntas").
3. **Simples e explicável > complexo.** Regras transparentes + score de confiança. A banca disse que **o motivo é o principal ponto**: explicar *por que* cada cobertura foi sugerida.
4. **Fale em métricas de negócio:** perguntas economizadas, % de propostas com alta confiança, cobertura adequada (sem sub/superseguro), tempo do gerente.
5. **Não invente:** toda sugestão deve ser rastreável a um dado recebido (pediram "adequação").
6. **MVP com duas pontas:** (a) o gerente vê proposta, confiança, perguntas e argumento; (b) o cliente recebe proposta pronta no app (*click-to-buy*), confirma, compara e ajusta.
7. **Canais:** App BB (click-to-buy), central de atendimento, gerente, WhatsApp BB. Momentos-gatilho: financiamento imobiliário, mudança de endereço, compra de eletrônicos.
8. **Corte escopo cedo.** *Feature freeze* na noite do dia 28. O resto é polimento e ensaio.
9. **Tenha plano B da demo:** vídeo gravado + prints, caso internet/notebook falhe.
10. **Ensaie 3 vezes cronometrado.** Estrutura: Problema → Insight dos dados → Solução → Demo → Impacto → Próximos passos.

## Contexto do produto real (BB Seguros)
> As notas abaixo são sobre o seguro **empresarial**, pesquisado antes da transcrição. O desafio é **residencial**, mas a lógica de coberturas e canais é parecida.
- Contratação já possível em agência, central, **App BB (autoatendimento)**, site BB Seguros e corretora.
- Planos citados na imprensa: **Essencial, Prático e Total**; coberturas como incêndio, roubo, danos naturais, lucros cessantes, responsabilidade civil, home office, delivery, deterioração em frigorificação.
- Novidade (dez/2025): cobertura de **riscos cibernéticos para PMEs** com contratação simplificada — bom gancho de inovação.
- ⚠️ Parte das fontes é conteúdo patrocinado; confirmar detalhes no app/site oficial.

## Referências técnicas (cross-sell / propensão)
- Prática comum: **um modelo de propensão por produto** + regra de negócio que escolhe a melhor oferta.
- Separar **"quem tem chance de comprar"** (propensão) de **"qual plano oferecer"** (recomendação).
- Avaliar por **uplift/lift vs. baseline** e propor piloto controlado (grupo controle) — ótimo para "próximos passos".
- Ganhos reportados por fornecedores: +10–20% em receita de cross-sell (não verificado — usar com cautela).

## Fontes
- [Hackathon Teias USP — edital](https://j4.fearp.usp.br/images/institucional/docs_teias/Edital_Hackathon_Teias_USP_-_2024.pdf)
- [Datathon Iscte 2025 — regulamento](https://ibs.iscte-iul.pt/assets/files/2025/03/12/1741785121633_Datathon_2025___regulamento_V25_02_2025.pdf)
- [SEDUC-PI — regulamento hackathon](https://seduc.pi.gov.br/_dopiauiparaomundo/SEI_0024145804_SEDUC_Documento.pdf)
- [Reskilll — How to Win a Hackathon in 2026](https://blogs.reskilll.com/?p=205)
- [Distrito — Datathon e inovação aberta](https://www.distrito.me/blog/datathon-inovacao-aberta)
- [InfoMoney — Seguro empresarial BB Seguros](https://www.infomoney.com.br/negocios/preco-acessivel-e-protecao-digital-sao-destaques-do-seguro-empresarial-da-bb-seguros/)
- [Mercado & Consumo — apólice com home office e delivery](https://mercadoeconsumo.com.br/16/11/2022/economia/bb-seguros-lanca-apolice-empresarial-com-cobertura-para-home-office-e-delivery/amp/)
- [Legismap — riscos cibernéticos para PMEs](https://legismap.com.br/conteudos/artigos-e-noticias/bb-seguros-lanca-protecao-inedita-contra-riscos-ciberneticos-para-pmes)
- [DataRobot — Predict which insurance products to offer](https://pathfinder.datarobot.com/use-case/predict-which-insurance-products-to-offer)
- [Dataiku — Next best offer in banking](https://www.dataiku.com/blog/next-best-offer-banking)
- [AWS — Edelweiss cross-sell com ML](https://aws.amazon.com/blogs/machine-learning/edelweiss-improves-cross-sell-using-machine-learning-on-amazon-sagemaker/)
- [Visbanking — Propensity modeling](https://visbanking.com/propensity-modeling)

## Ligações
[[Referências de mercado]] · [[Roteiro do pitch]] · [[Regras e contexto]]
