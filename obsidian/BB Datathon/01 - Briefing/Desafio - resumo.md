---
tags: [briefing]
atualizado: 2026-10-27
---
# Desafio: resumo

Fontes: [[Guia oficial do datathon]] (oficial, vale mais) e [[Transcrição da apresentação]].

## Em uma frase
Construir uma lógica de recomendação de seguro residencial que segue o fluxo **sinais → sugestão inicial → confiança → confirmação → recomendação**, e que funcione em três canais: **One Click Buy** (o "click-to-buy" do áudio), atendimento assistido (gerente/central) e, no futuro, agentes autônomos.

- **Entrada:** cliente + imóvel + sinais disponíveis.
- **Saída:** elegibilidade + plano + coberturas + faixas + confiança + perguntas + motivos.

## O desafio era escolher
O guia oferece dois desafios: residencial ou empresarial. O pacote de dados que recebemos é o do **Seguro Residencial**. Isso resolve a dúvida do "empresarial".

## O MVP precisa responder
1. O caso é **elegível**? ([[Elegibilidade residencial]])
2. Que informações mínimas faltam para cotar?
3. Qual plano, coberturas e faixas fazem sentido?
4. O que foi **observado, estimado ou confirmado**?
5. Por que a recomendação é adequada e quais as **alternativas**?
6. Como a mesma lógica serve à jornada digital, ao atendimento assistido e a agentes?

## Guardrails (regras que não podem ser quebradas)
- Usar só os dados fornecidos e fontes externas públicas ou autorizadas.
- Aplicar a elegibilidade **antes** de recomendar.
- **Não usar dado sensível ou atributo pessoal como atalho** para risco ou patrimônio (renda e idade não podem decidir o valor dos bens).
- Não apresentar estimativa como fato confirmado.
- Toda recomendação tem que ser explicável, revisável e permitir confirmação humana.

## Planos (oficial)
Essencial, Prático e Total. Detalhes, nomes oficiais das coberturas e o que pode ser customizado em [[Catálogo do Seguro Residencial BB]].

## Entrega: 29/10 até 10h (sem isso, não apresenta)
- [[Templates de entrega|Dois templates]] preenchidos para **todos** os 138 imóveis da base comum.
- README com equipe, desafio, objetivo, arquitetura, arquivos, execução, premissas, limitações, métricas, resultados e **uso de IA**.
- Código/notebooks, `requirements.txt` e versão do Python.
- Documentação de dados externos (fonte, data de acesso, licença, método, transformação, limitações).
- Vídeo de até 5 min: problema, solução, demonstração, resultados, limitações e próximos passos.

## Apresentação no dia 29
5 min de pitch + 5 min de perguntas da banca. Estrutura sugerida em [[Roteiro do pitch]].

## Avaliação
Pesos em [[Critérios de avaliação]]. Os maiores: adequação da proteção (20%) e inovação (20%).

## O que a apresentadora reforçou no áudio
- Pensar na [[Jornada do cliente]] e na [[Jornada do gerente]].
- O [[Motivo da recomendação]] é o ponto principal.
- [[Personalizar sem decidir pela pessoa]], poucas perguntas, [[Alternativas comparáveis]].
- Equilíbrio entre rápido e entendível ([[Ideias de equilíbrio]]).

Ligações: [[Regras e contexto]] · [[Achados iniciais dos dados]]
