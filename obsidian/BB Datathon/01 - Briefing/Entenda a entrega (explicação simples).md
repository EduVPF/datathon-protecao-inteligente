---
tags: [briefing, didatico, entrega]
data: 2026-10-28
---
# Entenda a entrega (explicação simples)

Página visual para compartilhar a tela: `prototipo/entenda_a_entrega.html`.

## Em uma frase
Eles mandaram 138 casas de clientes. A gente preenche **duas planilhas de resposta** (pode segurar? qual plano? quanto de cada cobertura? por quê?) e mostra isso funcionando num vídeo de até 5 minutos.

- É como uma **prova**: os 5 times recebem as mesmas 138 questões. Não existe gabarito; avaliam se a resposta é coerente e explicada.
- As **duas planilhas** são a folha de respostas. Sem elas completas, o time nem apresenta (RN-40).
- O **app** é a demonstração. Ajuda na nota, não substitui as planilhas.

## Entra → motor → sai
- **Entra:** `clientes` (120), `enderecos_imoveis` (138), `sinais_imobiliarios`, `bens_compras` (494), `territorio`, catálogo e dicionário.
- **Motor (5 passos por casa):** pode segurar? → que casa é essa? → quanto vale? → qual plano e quanto de cada cobertura? → confiança, perguntas e motivo.
- **Sai (obrigatório):** `template_resultado_times.csv` (138 linhas), `template_coberturas_times.csv` (uma linha por cobertura; de 828 a 1.518 linhas), código + `requirements.txt`, README, vídeo. Demonstração e dados externos documentados conforme o caso.

## Nota
65% vem do motor e das planilhas (adequação, uso dos dados, explicabilidade, viabilidade, privacidade). 35% vem da ideia, da jornada e do vídeo (inovação e jornada).

## Onde estamos (28/10)
- Feito: regras, dados explorados, protótipo da jornada.
- Desenhado: lógica de valores ([[Como calcular o valor dos bens e da casa]], [[Bens sem nota - método em 3 camadas]]).
- **Falta: motor em código nos 138 casos, as 2 planilhas, métricas, README e vídeo.** O cronograma oficial marca a base de teste e a gravação para hoje (28/10, tarde e noite).

## Opinião e recomendação
A direção está boa e tem diferenciais reais. O risco é ter gasto quase todo o esforço nos 35% (jornada e ideias). **Congelar ideias novas, colocar 3 pessoas no motor e nas planilhas**, e o app só lê o resultado do motor para alguns casos na demo.

## Plano até 29/10, 10h
1. Agora: fechar as regras do motor (tipo, uso, vínculo, elegibilidade, plano).
2. Hoje à tarde: motor v1 nos 138 casos gerando as 2 planilhas (primeiro completo, depois bonito).
3. Hoje à noite: faixas com a lógica de valores, métricas, casos contrastantes, corrigir apto no protótipo, ligar a demo ao motor.
4. Madrugada/cedo: README e gravação do vídeo.
5. 29/10 até 9h: conferência final e entrega.

Ligações: [[Guia oficial do datathon]] · [[Templates de entrega]] · [[Critérios de avaliação]] · [[Regras de negócio]] · [[Aplicação em Python]] · [[Métricas de bancos e seguradoras]]
