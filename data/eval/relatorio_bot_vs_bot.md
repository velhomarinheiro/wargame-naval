# Estatísticas Bot × Bot (self-play NN) — Eficácia e Eficiência por Unidade

_Gerado em 2026-09-14 · 1000 partidas · modelos `move_net`/`attack_net` treinados com 120 partidas sintéticas + 15 reais (oversampling 5×)._

## 1. Resultados gerais

| Métrica | Blue | Red |
|---|---|---|
| Taxa de vitória | 85.4% | 14.6% |
| Dano médio causado (HP/partida) | 18.51 | 73.81 |
| Perdas médias (unidades/partida) | 9.72 | 4.34 |

- **Motivo de conclusão:** timeout=83.6%, victory=16.4%
- **Duração média:** 17.01 turnos

> **Leitura:** Red concentra o poder de fogo (dano ~4× o de Blue) mas Blue vence a maioria — pela assimetria das condições de vitória e pelo desempate de *timeout* por soma de HP (inflado pelos ativos terrestres estáticos de Blue, que quase não são atingidos).

## 2. Eficácia/eficiência por unidade — RED (agressor)

_Ordenado por dano causado por partida._

| Unidade | Categoria | Sobrev.% | Dano+/jogo | Dano−/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo |
|---|---|---|---|---|---|---|---|---|
| RED-GE-1 | surface | 99.7 | 22.7 | 0.06 | 2.85 | 17.42 | 49.0 | 33.0 |
| RED-GE-2 | surface | 99.2 | 17.49 | 0.2 | 2.26 | 14.56 | 45.1 | 32.99 |
| RED-KSN | submarine | 92.6 | 11.73 | 0.38 | 1.18 | 11.66 | 44.0 | 33.18 |
| RED-KS-1 | submarine | 35.0 | 7.15 | 2.02 | 0.71 | 4.23 | 53.0 | 12.57 |
| RED-GBPA | surface | 99.8 | 6.28 | 0.02 | 1.01 | 6.85 | 49.3 | 33.94 |
| RED-KMF-1 | air | 99.7 | 1.96 | 0.06 | 0.34 | 2.26 | 41.9 | 33.94 |
| RED-MPRA-K1 | air | 86.6 | 1.87 | 0.33 | 0.3 | 1.3 | 44.7 | 32.71 |
| RED-KMF-2 | air | 98.0 | 1.62 | 0.48 | 0.44 | 1.86 | 43.8 | 33.81 |
| RED-GE-3 | surface | 96.4 | 1.32 | 0.52 | 0.35 | 1.73 | 48.4 | 32.53 |
| RED-MPRA-K2 | air | 73.1 | 1.1 | 0.7 | 0.2 | 0.83 | 42.8 | 30.73 |
| RED-OPSESP-2 | surface | 2.2 | 0.31 | 3.58 | 0.03 | 0.25 | 66.7 | 0.0 |
| RED-GANF | surface | 95.0 | 0.27 | 1.12 | 0.06 | 1.18 | 23.3 | 32.62 |
| RED-AKE | surface | 60.6 | 0.0 | 2.96 | 0.0 | 0.0 | — | 27.77 |
| RED-AOR-G | surface | 85.8 | 0.0 | 0.59 | 0.0 | 0.0 | — | 32.45 |
| RED-AWACS-K | air | 50.8 | 0.0 | 1.25 | 0.0 | 0.0 | — | 25.54 |
| RED-GLOG | surface | 78.4 | 0.0 | 1.61 | 0.0 | 0.0 | — | 31.3 |
| RED-OPSESP-1 | surface | 12.7 | 0.0 | 2.62 | 0.0 | 0.01 | 80.0 | 0.0 |

## 2. Eficácia/eficiência por unidade — BLUE (defensor)

_Ordenado por dano causado por partida._

| Unidade | Categoria | Sobrev.% | Dano+/jogo | Dano−/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo |
|---|---|---|---|---|---|---|---|---|
| BLUE-SAG-P | surface | 88.4 | 3.96 | 0.67 | 0.64 | 4.87 | 53.7 | 31.14 |
| BLUE-SUB-N | submarine | 67.2 | 3.17 | 1.51 | 0.73 | 2.33 | 46.3 | 27.45 |
| BLUE-SAG-S1 | surface | 90.5 | 1.99 | 1.34 | 0.51 | 2.86 | 48.3 | 31.82 |
| BLUE-SAG-S2 | surface | 76.2 | 1.46 | 3.62 | 0.47 | 2.12 | 48.1 | 29.06 |
| BLUE-ANFIB | surface | 86.0 | 1.05 | 1.83 | 0.31 | 3.71 | 20.8 | 30.42 |
| BLUE-SUB-1 | submarine | 29.7 | 1.0 | 2.22 | 0.15 | 0.96 | 65.0 | 15.72 |
| BLUE-PAT-O1 | surface | 73.8 | 0.87 | 1.51 | 0.25 | 1.35 | 47.5 | 28.11 |
| BLUE-DCOST2 | land | 100.0 | 0.74 | 0.0 | 0.31 | 0.7 | 66.1 | 26.47 |
| BLUE-PAT-O2 | surface | 71.5 | 0.73 | 1.66 | 0.22 | 1.15 | 46.0 | 29.25 |
| BLUE-MPRA-1 | air | 85.5 | 0.65 | 0.48 | 0.12 | 0.63 | 53.7 | 31.57 |
| BLUE-SUB-2 | submarine | 74.8 | 0.56 | 0.82 | 0.11 | 0.54 | 59.8 | 29.54 |
| BLUE-SUB-3 | submarine | 67.5 | 0.34 | 1.08 | 0.06 | 0.34 | 57.7 | 28.87 |
| BLUE-MPRA-2 | air | 66.7 | 0.33 | 1.29 | 0.06 | 0.31 | 51.5 | 25.87 |
| BLUE-CACA-1 | air | 100.0 | 0.32 | 0.0 | 0.07 | 0.55 | 38.8 | 33.94 |
| BLUE-CJAT-1 | air | 98.4 | 0.28 | 0.06 | 0.07 | 0.31 | 44.4 | 33.87 |
| BLUE-CACA-2 | air | 99.9 | 0.27 | 0.04 | 0.09 | 0.47 | 39.6 | 33.93 |
| BLUE-CJAT-2 | air | 91.9 | 0.22 | 0.27 | 0.07 | 0.2 | 55.4 | 33.19 |
| BLUE-DCOST1 | land | 49.3 | 0.2 | 1.93 | 0.03 | 0.18 | 59.8 | 13.46 |
| BLUE-PAT-C1 | surface | 64.9 | 0.16 | 1.36 | 0.02 | 0.2 | 61.0 | 27.58 |
| BLUE-PAT-C2 | surface | 49.9 | 0.15 | 2.01 | 0.03 | 0.15 | 58.2 | 25.07 |
| BLUE-ADA-2 | land | 99.9 | 0.02 | 0.0 | 0.0 | 0.16 | 11.9 | 26.45 |
| BLUE-ADA-1 | land | 30.1 | 0.01 | 2.49 | 0.0 | 0.09 | 7.5 | 10.46 |
| BLUE-AERO-CF | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 0.0 |
| BLUE-AERO-RJ | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 |
| BLUE-AERO-SP | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 0.0 |
| BLUE-FPSO1 | surface | 7.2 | 0.0 | 7.13 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO2 | surface | 63.0 | 0.0 | 3.16 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO3 | surface | 61.0 | 0.0 | 3.76 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO4 | surface | 42.2 | 0.0 | 5.34 | 0.0 | 0.0 | — | 0.0 |
| BLUE-LOG-A | surface | 71.0 | 0.0 | 1.41 | 0.0 | 0.0 | — | 28.86 |
| BLUE-LOG-T | surface | 36.6 | 0.0 | 3.06 | 0.0 | 0.0 | — | 18.44 |
| BLUE-PORTO-ACU | land | 82.2 | 0.0 | 4.88 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-RJ | land | 99.7 | 0.0 | 1.73 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-S | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-V | land | 2.7 | 0.0 | 17.15 | 0.0 | 0.0 | — | 0.0 |

## 3. Unidades mais visadas (maior dano sofrido por partida)

| Unidade | Equipe | Categoria | Dano−/jogo | Sobrev.% |
|---|---|---|---|---|
| BLUE-PORTO-V | blue | land | 17.15 | 2.7 |
| BLUE-FPSO1 | blue | surface | 7.13 | 7.2 |
| BLUE-FPSO4 | blue | surface | 5.34 | 42.2 |
| BLUE-PORTO-ACU | blue | land | 4.88 | 82.2 |
| BLUE-FPSO3 | blue | surface | 3.76 | 61.0 |
| BLUE-SAG-S2 | blue | surface | 3.62 | 76.2 |
| RED-OPSESP-2 | red | surface | 3.58 | 2.2 |
| BLUE-FPSO2 | blue | surface | 3.16 | 63.0 |
| BLUE-LOG-T | blue | surface | 3.06 | 36.6 |
| RED-AKE | red | surface | 2.96 | 60.6 |
| RED-OPSESP-1 | red | surface | 2.62 | 12.7 |
| BLUE-ADA-1 | blue | land | 2.49 | 30.1 |

## Notas

- **Dano+/jogo**: HP retirado de inimigos por partida (eficácia ofensiva). **Dano−/jogo**: HP perdido por partida (vulnerabilidade). **Acerto%**: fração de engajamentos com dano efetivo (eficiência de tiro). **Mov./jogo**: movimentos declarados por partida (atividade).

- As médias por unidade são estáveis com este N; a **taxa de vitória decisiva** carrega variância de treino de ~±20 pontos (ver `estudo_variancia_agressividade.md`) — trate-a como ponto amostral de um conjunto de modelos, não como constante do sistema.
