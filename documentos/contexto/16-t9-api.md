# 16 · T9 · API para agentes e outros canais

**Em uma frase:** o motor também responde por uma API. Qualquer canal (app, sistema do gerente ou um agente autônomo) pode pedir a ficha de um caso e mandar as confirmações do cliente.

**Onde estamos:** Fase 3 (opcional) · Tarefa T9 do [`PLANO_UNIFICADO.md`](../PLANO_UNIFICADO.md) · issue #9

## O que fizemos
- **`motor/api.py` (FastAPI):**
  - `GET /saude`: confere se está no ar;
  - `GET /fichas/{imovel_id}`: a ficha completa, igual à usada nas planilhas;
  - `POST /recomendar`: recalcula a ficha com as confirmações do cliente. Hoje aceita `bens` ("menos", "isso" ou "mais") e `area_m2`. **O dado confirmado passa a valer o máximo na confiança.**
- **`processar_caso(..., confirmados=...)`:** o motor aceita a lista de campos confirmados.
- **`requirements-api.txt`** separado, para a automação principal continuar leve.
- **4 testes:** `tests/test_api.py`, que pulam sozinhos se a API não estiver instalada.

## Como usar
```bash
pip install -r requirements-api.txt
uvicorn api:app --app-dir motor --port 8000
```
Abra `http://localhost:8000/docs`: a página de testes do FastAPI permite chamar a API pelo navegador.

Exemplo de confirmação:
```json
POST /recomendar
{"imovel_id": "IMO_CASO_00005_01", "bens": "mais"}
```
Resultado: a faixa de roubo sobe e a confiança aumenta, porque os bens passam a "CONFIRMADO".

## Por que importa
- O guia pergunta: *"Como a mesma lógica pode apoiar jornada digital, atendimento assistido e agentes autônomos?"* A API é a resposta concreta.
- **Critério da banca:** viabilidade técnica e de negócio (10%): integração e escalabilidade.

## O que você precisa entender
- **A API não tem lógica própria;** ela chama o mesmo `processar_caso` que gera as planilhas. Por isso nunca diverge da entrega.
- **Um agente autônomo** (um chatbot, por exemplo) só precisa fazer as perguntas da ficha, mandar as respostas para `/recomendar` e mostrar o motivo. A decisão continua explicável.

## O que ficou de fora da Fase 3
| Tarefa | Situação | Por quê |
|---|---|---|
| T8 · Separar o motor em módulos | Não feita | Refatoração arriscada na véspera, sem ganho para a banca. `motor.py` está organizado por seções |
| T10 · Atlas de Desastres | Não feita | Depende de baixar os dados à mão no site do Ministério; fica como próximo passo no pitch |

## Frase para o pitch
> "O mesmo motor atende o app, o gerente e, amanhã, um agente autônomo. É uma chamada de API, com o mesmo motivo e as mesmas faixas."

## Próximo passo
- [90 · Revisão do time](90-revisao.md)
