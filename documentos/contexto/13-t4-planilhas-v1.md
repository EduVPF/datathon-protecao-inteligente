# 13 · T4 · Validação e planilhas v1

**Em uma frase:** as 2 planilhas da entrega agora saem completas e **conferidas automaticamente** contra as regras do guia; a primeira versão "de segurança" está salva em `entrega/` com a tag `v1-planilhas`.

**Onde estamos:** Fase 1 · Tarefa T4 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issue #4 · **fim da Fase 1**

## O que fizemos
- **`motor/templates.py` → `validar_templates()`** confere:
  - **planilha 1:** as mesmas colunas e as mesmas 138 linhas, **na ordem** do template; sem plano, justificativa ou confiança vazios; `elegivel` só SIM/NÃO; todo NÃO com motivo; plano existente no catálogo;
  - **planilha 2:** colunas iguais às do template; nomes de cobertura **do catálogo** (nenhuma assistência); faixas inteiras, sem vazio e sem mínimo maior que o máximo; **todas as coberturas fixas** do plano presentes em cada caso.
- **`motor/gerar.py` reescrito:**
  - valida antes de gravar e **termina com erro** se algo estiver fora da regra; o GitHub mostra isso em vermelho;
  - `--saida PASTA` grava em outra pasta (usado no teste de reprodutibilidade);
  - `--entrega` copia as 2 planilhas para `entrega/`, só se a validação passar.
- **Limpeza:** saíram as constantes e a função antiga do rascunho.
- **Os motivos foram reescritos** para ler bem depois do "porque".

## Exemplo real (CASO_00001, casa em condomínio)
> **Justificativa:** "Plano Prático porque seus bens comprovados somam pelo menos R$ 48.552, acima da maioria dos clientes; você tem pelo menos R$ 16.202 em eletrônicos, os mais visados num arrombamento. Por que não um plano mais barato: o Essencial não cobre roubo com arrombamento e quebra de vidros. Por que não um plano mais caro: o Total acrescenta o conserto de danos a terceiros, a perda de aluguel e as despesas emergenciais, mas os sinais ainda são fracos para isso. A confirmar antes de contratar: o cliente já tem seguro residencial…"
>
> **Perguntas:** "Você já tem seguro residencial da BB Seguros para este endereço? | Seus móveis, eletrodomésticos e eletrônicos ficam entre R$ 49.000 e R$ 131.000? | Estimamos que o imóvel tem cerca de 265 m². Confere?"

## Por que importa
- **É a entrega principal.** O guia diz que, sem as 2 planilhas completas, o time não apresenta.
- **Critério da banca:** adequação (20%), com todas as fixas e as faixas certas; viabilidade técnica (10%), com execução sem falhas e verificação automática.

## O que você precisa entender
- **Por que um validador?** Um erro bobo (uma cobertura faltando, uma faixa com texto) pode desclassificar a entrega. O validador pega isso antes da banca.
- **O teste do validador:** existe um teste que **estraga as planilhas de propósito** (inverte uma faixa e apaga uma cobertura) e confere se o validador acusa. Um validador que nunca reclama não prova nada.
- **`entrega/` × `motor/saida/`:** a `saida/` é gerada a cada rodada e não vai para o git. A `entrega/` é a versão oficial, versionada no GitHub.

## Como conferir
```bash
python -m pytest -q
python motor/gerar.py --entrega
```
Resultado esperado: 21 testes passando, `"erros_validacao": 0`, e as 2 planilhas em `entrega/`.

## Pendências e riscos
- **A confiança ainda é a versão simples:** 25 casos ALTA e 113 MÉDIA. A T5 troca por "fonte × frescor".
- **Métricas completas e casos contrastantes:** T6.

## Frase para o pitch
> "As planilhas passam por uma checagem automática a cada mudança no código. Se faltar uma cobertura obrigatória, o próprio GitHub acusa."

## Próximo passo
- [14 · T5 e T6 Provas](14-t5-t6-provas.md)
