# Estatísticas Bot × Bot (self-play NN) — Eficácia e Eficiência por Unidade

_Gerado em 2026-09-14 · 2000 partidas · modelos `move_net`/`attack_net` treinados com 120 partidas sintéticas + 15 reais (oversampling 5×)._

## 1. Resultados gerais

| Métrica | Blue | Red |
|---|---|---|
| Taxa de vitória | 83.3% | 16.6% |
| Dano médio causado (HP/partida) | 18.01 | 74.4 |
| Perdas médias (unidades/partida) | 9.78 | 4.23 |

- **Motivo de conclusão:** timeout=82.2%, victory=17.8%
- **Duração média:** 16.93 turnos

> **Leitura:** Red concentra o poder de fogo (dano ~4× o de Blue) mas Blue vence a maioria — pela assimetria das condições de vitória e pelo desempate de *timeout* por soma de HP (inflado pelos ativos terrestres estáticos de Blue, que quase não são atingidos).

### 1.1. Vencedor por motivo de conclusão

| Motivo | Partidas | % do total | Vitória Blue% | Vitória Red% |
|---|---|---|---|---|
| Por objetivo (decisiva) | 355 | 17.8% | 6.2% | 93.8% |
| Por timeout (soma de HP) | 1645 | 82.2% | 100.0% | 0% |

> **Nas partidas vencidas por objetivo** (mérito tático real), Red vence **93.8%** e Blue **6.2%** — o inverso do placar geral. A vantagem agregada de Blue vem inteiramente do desempate de *timeout*.

## 2. Eficácia/eficiência por unidade — RED (agressor)

_Ordenado por dano causado por partida._

| Unidade | Categoria | Sobrev.% | Dano+/jogo | Dano−/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo |
|---|---|---|---|---|---|---|---|---|
| RED-GE-1 | surface | 100.0 | 23.16 | 0.02 | 2.9 | 17.78 | 48.5 | 32.95 |
| RED-GE-2 | surface | 99.3 | 17.25 | 0.14 | 2.23 | 14.87 | 44.2 | 32.93 |
| RED-KSN | submarine | 93.8 | 11.91 | 0.33 | 1.21 | 11.91 | 43.1 | 33.19 |
| RED-KS-1 | submarine | 31.8 | 7.3 | 2.17 | 0.74 | 4.4 | 53.0 | 12.74 |
| RED-GBPA | surface | 99.9 | 6.18 | 0.01 | 0.98 | 6.86 | 49.5 | 33.77 |
| RED-KMF-1 | air | 99.8 | 1.96 | 0.04 | 0.35 | 2.23 | 43.1 | 33.77 |
| RED-MPRA-K1 | air | 88.9 | 1.86 | 0.28 | 0.28 | 1.31 | 45.1 | 32.79 |
| RED-KMF-2 | air | 98.7 | 1.6 | 0.43 | 0.43 | 1.84 | 41.9 | 33.68 |
| RED-GE-3 | surface | 97.0 | 1.33 | 0.45 | 0.33 | 1.7 | 48.6 | 32.54 |
| RED-MPRA-K2 | air | 74.2 | 1.24 | 0.68 | 0.22 | 0.84 | 45.9 | 30.66 |
| RED-OPSESP-2 | surface | 2.3 | 0.33 | 3.55 | 0.03 | 0.26 | 67.5 | 0.0 |
| RED-GANF | surface | 95.0 | 0.29 | 1.14 | 0.08 | 1.11 | 25.7 | 32.54 |
| RED-AKE | surface | 61.2 | 0.0 | 2.92 | 0.0 | 0.0 | — | 28.0 |
| RED-AOR-G | surface | 87.2 | 0.0 | 0.51 | 0.0 | 0.0 | — | 32.52 |
| RED-AWACS-K | air | 53.1 | 0.0 | 1.19 | 0.0 | 0.0 | — | 25.93 |
| RED-GLOG | surface | 80.0 | 0.0 | 1.53 | 0.0 | 0.0 | — | 31.57 |
| RED-OPSESP-1 | surface | 14.4 | 0.0 | 2.63 | 0.0 | 0.0 | 66.7 | 0.0 |

## 2. Eficácia/eficiência por unidade — BLUE (defensor)

_Ordenado por dano causado por partida._

| Unidade | Categoria | Sobrev.% | Dano+/jogo | Dano−/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo |
|---|---|---|---|---|---|---|---|---|
| BLUE-SAG-P | surface | 88.0 | 4.13 | 0.66 | 0.69 | 4.71 | 54.4 | 30.86 |
| BLUE-SUB-N | submarine | 68.5 | 2.96 | 1.41 | 0.71 | 2.29 | 45.8 | 27.75 |
| BLUE-SAG-S1 | surface | 88.3 | 1.97 | 1.48 | 0.51 | 2.62 | 50.6 | 31.29 |
| BLUE-SAG-S2 | surface | 76.0 | 1.29 | 3.63 | 0.39 | 1.92 | 47.3 | 28.9 |
| BLUE-ANFIB | surface | 85.3 | 1.11 | 1.93 | 0.32 | 3.59 | 22.7 | 30.32 |
| BLUE-SUB-1 | submarine | 29.9 | 0.99 | 2.25 | 0.16 | 0.93 | 63.4 | 15.9 |
| BLUE-PAT-O1 | surface | 72.1 | 0.84 | 1.6 | 0.25 | 1.26 | 46.1 | 27.72 |
| BLUE-DCOST2 | land | 99.9 | 0.75 | 0.0 | 0.31 | 0.72 | 64.0 | 26.25 |
| BLUE-PAT-O2 | surface | 71.6 | 0.68 | 1.61 | 0.19 | 1.06 | 44.2 | 29.2 |
| BLUE-MPRA-1 | air | 85.8 | 0.64 | 0.44 | 0.11 | 0.62 | 52.4 | 31.34 |
| BLUE-SUB-2 | submarine | 74.9 | 0.53 | 0.83 | 0.1 | 0.53 | 59.6 | 29.56 |
| BLUE-MPRA-2 | air | 64.2 | 0.33 | 1.33 | 0.07 | 0.32 | 54.2 | 25.14 |
| BLUE-SUB-3 | submarine | 68.4 | 0.32 | 1.01 | 0.06 | 0.34 | 56.0 | 28.87 |
| BLUE-CACA-1 | air | 100.0 | 0.31 | 0.0 | 0.08 | 0.53 | 39.4 | 33.77 |
| BLUE-CACA-2 | air | 100.0 | 0.26 | 0.01 | 0.09 | 0.45 | 40.7 | 33.77 |
| BLUE-CJAT-1 | air | 99.1 | 0.26 | 0.03 | 0.08 | 0.26 | 49.5 | 33.72 |
| BLUE-DCOST1 | land | 50.0 | 0.2 | 1.85 | 0.02 | 0.23 | 59.3 | 12.99 |
| BLUE-PAT-C1 | surface | 64.0 | 0.17 | 1.44 | 0.03 | 0.17 | 58.8 | 27.23 |
| BLUE-CJAT-2 | air | 94.2 | 0.15 | 0.22 | 0.04 | 0.17 | 44.0 | 33.25 |
| BLUE-PAT-C2 | surface | 50.3 | 0.08 | 2.0 | 0.02 | 0.11 | 51.5 | 24.89 |
| BLUE-ADA-2 | land | 99.7 | 0.03 | 0.01 | 0.0 | 0.18 | 16.8 | 26.2 |
| BLUE-ADA-1 | land | 30.2 | 0.01 | 2.51 | 0.0 | 0.11 | 6.1 | 10.17 |
| BLUE-AERO-CF | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.03 | 0.0 | 0.0 |
| BLUE-AERO-RJ | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 |
| BLUE-AERO-SP | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 0.0 |
| BLUE-FPSO1 | surface | 7.3 | 0.0 | 7.22 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO2 | surface | 61.9 | 0.0 | 3.31 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO3 | surface | 60.0 | 0.0 | 3.78 | 0.0 | 0.0 | — | 0.0 |
| BLUE-FPSO4 | surface | 41.8 | 0.0 | 5.35 | 0.0 | 0.0 | — | 0.0 |
| BLUE-LOG-A | surface | 71.0 | 0.0 | 1.37 | 0.0 | 0.0 | — | 28.77 |
| BLUE-LOG-T | surface | 36.3 | 0.0 | 3.03 | 0.0 | 0.0 | — | 18.4 |
| BLUE-PORTO-ACU | land | 79.5 | 0.0 | 5.27 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-RJ | land | 99.8 | 0.0 | 1.66 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-S | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 |
| BLUE-PORTO-V | land | 3.5 | 0.0 | 17.13 | 0.0 | 0.0 | — | 0.0 |

## 3. Unidades mais visadas (maior dano sofrido por partida)

| Unidade | Equipe | Categoria | Dano−/jogo | Sobrev.% |
|---|---|---|---|---|
| BLUE-PORTO-V | blue | land | 17.13 | 3.5 |
| BLUE-FPSO1 | blue | surface | 7.22 | 7.3 |
| BLUE-FPSO4 | blue | surface | 5.35 | 41.8 |
| BLUE-PORTO-ACU | blue | land | 5.27 | 79.5 |
| BLUE-FPSO3 | blue | surface | 3.78 | 60.0 |
| BLUE-SAG-S2 | blue | surface | 3.63 | 76.0 |
| RED-OPSESP-2 | red | surface | 3.55 | 2.3 |
| BLUE-FPSO2 | blue | surface | 3.31 | 61.9 |
| BLUE-LOG-T | blue | surface | 3.03 | 36.3 |
| RED-AKE | red | surface | 2.92 | 61.2 |
| RED-OPSESP-1 | red | surface | 2.63 | 14.4 |
| BLUE-ADA-1 | blue | land | 2.51 | 30.2 |

## Notas

- **Dano+/jogo**: HP retirado de inimigos por partida (eficácia ofensiva). **Dano−/jogo**: HP perdido por partida (vulnerabilidade). **Acerto%**: fração de engajamentos com dano efetivo (eficiência de tiro). **Mov./jogo**: movimentos declarados por partida (atividade).

- As médias por unidade são estáveis com este N; a **taxa de vitória decisiva** carrega variância de treino de ~±20 pontos (ver `estudo_variancia_agressividade.md`) — trate-a como ponto amostral de um conjunto de modelos, não como constante do sistema.
