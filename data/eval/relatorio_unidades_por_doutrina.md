# Desempenho por Unidade — Combinações de Doutrina (Postura x Formação)

_Gerado em 2026-06-21_

## Metodologia

Partidas espelhadas: a mesma combinação de **postura** (ofensiva/defensiva) e **formação** (concentrada/dividida) é aplicada simetricamente às equipes azul e vermelha em cada célula, isolando o efeito desse par de eixos sobre o desempenho individual das unidades. Os demais eixos de doutrina (engajamento, política de combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) são sorteados aleatoriamente por partida. 150 partidas por célula (600 partidas no total), usando o motor heurístico de `ml/simulate_games.py` (mesmo gerador dos dados de treino). Cada célula é reportada em dois recortes: **geral** (todas as partidas) e **vitória decisiva** (somente partidas concluídas por objetivo de cenário, excluindo o desempate de timeout por soma de HP).

## Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=84.7%, red=15.3%
- Motivo de conclusão: timeout=54.0%, victory=46.0%
- Duração média: 12.71 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.68, red=51.63
- Unidades perdidas em média: blue=4.34, red=5.32

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.65 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.35 | 0.34 | 0.1 | 0.32 | 60.4 | 2.27 | 88.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 66.7 | 3.87 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.01 | 100.0 | 3.85 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.45 | 0.0 | 0.45 | 2.22 | 53.8 | 2.4 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.68 | 0.0 | 0.44 | 1.81 | 50.6 | 2.39 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.42 | 0.06 | 0.06 | 0.35 | 65.4 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.03 | 25.0 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 72.7 | 0.0 | 2.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 75.3 | 0.0 | 2.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 76.7 | 0.0 | 2.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 83.3 | 0.0 | 1.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 90.7 | 0.0 | 0.53 | 0.0 | 0.0 | — | 3.49 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 80.0 | 0.0 | 1.03 | 0.0 | 0.0 | — | 2.34 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.37 | 0.31 | 0.09 | 0.32 | 47.9 | 1.46 | — | 99.3 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.4 | 0.2 | 0.09 | 0.27 | 45.0 | 1.53 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 95.3 | 0.02 | 0.19 | 0.0 | 0.04 | 50.0 | 2.23 | 90.6 | 98.0 |
| BLUE-PAT-C2 | blue | surface | 81.3 | 0.43 | 0.79 | 0.03 | 0.47 | 54.9 | 2.07 | 90.3 | 78.7 |
| BLUE-PAT-O1 | blue | surface | 58.7 | 2.88 | 2.61 | 0.35 | 2.71 | 44.8 | 2.06 | 89.9 | 92.5 |
| BLUE-PAT-O2 | blue | surface | 94.7 | 2.47 | 0.29 | 0.45 | 2.1 | 50.5 | 3.19 | 39.5 | 83.7 |
| BLUE-PORTO-ACU | blue | land | 89.3 | 0.0 | 2.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 44.7 | 0.0 | 14.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 86.0 | 0.0 | 5.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 74.7 | 0.0 | 6.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.7 | 2.85 | 0.83 | 0.53 | 2.63 | 46.2 | 2.35 | 94.3 | 96.0 |
| BLUE-SAG-S1 | blue | surface | 81.3 | 1.95 | 2.51 | 0.33 | 2.38 | 42.0 | 2.41 | 43.5 | 97.0 |
| BLUE-SAG-S2 | blue | surface | 94.0 | 3.38 | 0.89 | 0.7 | 3.18 | 48.6 | 2.93 | 42.7 | 99.0 |
| BLUE-SUB-1 | blue | submarine | 78.0 | 4.8 | 0.82 | 0.68 | 4.09 | 59.8 | 2.87 | 91.6 | 70.2 |
| BLUE-SUB-2 | blue | submarine | 93.3 | 1.79 | 0.18 | 0.45 | 1.89 | 52.1 | 3.4 | 40.4 | 94.4 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.65 | 0.2 | 0.09 | 0.63 | 57.9 | 2.41 | 95.9 | 93.0 |
| BLUE-SUB-N | blue | submarine | 58.0 | 4.75 | 1.77 | 0.46 | 4.35 | 46.9 | 2.06 | — | 81.4 |
| RED-AKE | red | surface | 69.3 | 0.0 | 2.65 | 0.0 | 0.0 | — | 8.27 | 98.1 | — |
| RED-AOR-G | red | surface | 61.3 | 0.0 | 1.88 | 0.0 | 0.0 | — | 5.64 | 99.4 | — |
| RED-AWACS-K | red | air | 76.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.21 | — | — |
| RED-GANF | red | surface | 98.7 | 0.05 | 0.72 | 0.01 | 0.09 | 61.5 | 0.0 | 79.8 | — |
| RED-GBPA | red | surface | 76.7 | 1.27 | 1.75 | 0.23 | 1.26 | 46.6 | 0.0 | — | 97.9 |
| RED-GE-1 | red | surface | 65.3 | 16.34 | 5.69 | 1.14 | 10.58 | 63.0 | 3.25 | 90.3 | 78.3 |
| RED-GE-2 | red | surface | 52.0 | 11.57 | 6.54 | 0.75 | 7.3 | 64.7 | 3.38 | 85.7 | 75.2 |
| RED-GE-3 | red | surface | 71.3 | 1.58 | 3.15 | 0.26 | 1.34 | 57.2 | 2.24 | 89.7 | 89.8 |
| RED-GLOG | red | surface | 74.0 | 0.0 | 2.23 | 0.0 | 0.0 | — | 7.97 | 99.5 | — |
| RED-KMF-1 | red | air | 76.7 | 0.99 | 0.01 | 0.19 | 1.05 | 39.2 | 4.41 | — | — |
| RED-KMF-2 | red | air | 76.7 | 0.76 | 0.05 | 0.13 | 0.91 | 30.7 | 4.56 | — | — |
| RED-KS-1 | red | submarine | 12.0 | 5.05 | 2.87 | 0.43 | 3.12 | 48.9 | 2.71 | 79.9 | 69.3 |
| RED-KSN | red | submarine | 32.7 | 9.75 | 2.93 | 0.5 | 6.39 | 64.3 | 2.32 | — | 77.0 |
| RED-MPRA-K1 | red | air | 58.7 | 2.19 | 0.91 | 0.34 | 1.41 | 50.7 | 1.27 | — | 97.9 |
| RED-MPRA-K2 | red | air | 58.7 | 1.96 | 0.71 | 0.36 | 1.15 | 48.3 | 1.52 | — | 98.6 |
| RED-OPSESP-1 | red | surface | 76.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.13 | 3.6 | 0.0 | 0.17 | 50.0 | 0.0 | — | 94.2 |

### Somente vitória decisiva

- Partidas: **69**
- Taxa de vitória: blue=66.7%, red=33.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.49 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.13, red=65.87
- Unidades perdidas em média: blue=6.13, red=6.75

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.91 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.32 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 95.7 | 0.61 | 0.58 | 0.16 | 0.54 | 64.9 | 4.04 | 83.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.04 | 66.7 | 6.91 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.06 | 0.0 | 0.03 | 0.03 | 100.0 | 6.83 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.64 | 0.0 | 0.48 | 2.45 | 52.1 | 3.99 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.51 | 0.0 | 0.45 | 2.03 | 46.4 | 3.97 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.3 | 0.0 | 0.06 | 0.3 | 61.9 | 0.64 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.06 | 25.0 | 1.28 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 58.0 | 0.0 | 3.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 52.2 | 0.0 | 4.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 55.1 | 0.0 | 3.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 75.4 | 0.0 | 2.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.6 | 0.0 | 1.0 | 0.0 | 0.0 | — | 4.78 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 63.8 | 0.0 | 1.91 | 0.0 | 0.0 | — | 4.13 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 94.2 | 0.3 | 0.26 | 0.12 | 0.42 | 37.9 | 1.77 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.3 | 0.41 | 0.32 | 0.1 | 0.39 | 37.0 | 1.96 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 92.8 | 0.04 | 0.3 | 0.0 | 0.07 | 60.0 | 4.51 | 81.4 | 96.4 |
| BLUE-PAT-C2 | blue | surface | 65.2 | 0.35 | 1.51 | 0.06 | 0.41 | 53.6 | 4.09 | 81.6 | 82.6 |
| BLUE-PAT-O1 | blue | surface | 34.8 | 4.13 | 3.99 | 0.52 | 3.87 | 42.3 | 3.29 | 87.1 | 88.8 |
| BLUE-PAT-O2 | blue | surface | 91.3 | 3.96 | 0.48 | 0.65 | 3.51 | 47.1 | 4.7 | 62.2 | 84.1 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 42.0 | 0.0 | 16.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 75.4 | 0.0 | 9.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 89.9 | 0.0 | 4.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 71.0 | 3.81 | 1.58 | 0.67 | 3.62 | 47.6 | 4.19 | 91.1 | 93.5 |
| BLUE-SAG-S1 | blue | surface | 65.2 | 3.46 | 4.39 | 0.43 | 4.13 | 40.7 | 4.52 | 66.2 | 94.3 |
| BLUE-SAG-S2 | blue | surface | 89.9 | 5.1 | 1.64 | 0.88 | 4.51 | 48.9 | 4.9 | 67.4 | 97.9 |
| BLUE-SUB-1 | blue | submarine | 72.5 | 6.64 | 1.07 | 0.93 | 5.52 | 60.6 | 5.51 | 87.9 | 56.7 |
| BLUE-SUB-2 | blue | submarine | 89.9 | 1.75 | 0.26 | 0.39 | 1.84 | 55.1 | 5.71 | 71.4 | 89.7 |
| BLUE-SUB-3 | blue | submarine | 91.3 | 1.29 | 0.3 | 0.17 | 1.22 | 59.5 | 4.67 | 93.0 | 86.4 |
| BLUE-SUB-N | blue | submarine | 47.8 | 5.72 | 2.19 | 0.62 | 5.93 | 45.7 | 3.68 | — | 75.5 |
| RED-AKE | red | surface | 49.3 | 0.0 | 3.93 | 0.0 | 0.0 | — | 7.28 | 97.6 | — |
| RED-AOR-G | red | surface | 40.6 | 0.0 | 2.71 | 0.0 | 0.0 | — | 4.12 | 99.0 | — |
| RED-AWACS-K | red | air | 49.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.22 | — | — |
| RED-GANF | red | surface | 97.1 | 0.12 | 1.57 | 0.01 | 0.19 | 61.5 | 0.0 | 79.8 | — |
| RED-GBPA | red | surface | 49.3 | 2.35 | 3.71 | 0.45 | 2.22 | 47.7 | 0.0 | — | 95.5 |
| RED-GE-1 | red | surface | 82.6 | 16.81 | 4.17 | 1.22 | 11.03 | 60.6 | 3.0 | 87.8 | 76.3 |
| RED-GE-2 | red | surface | 52.2 | 15.12 | 7.32 | 1.0 | 9.03 | 62.3 | 3.33 | 82.5 | 67.8 |
| RED-GE-3 | red | surface | 47.8 | 2.99 | 5.78 | 0.48 | 2.46 | 58.8 | 3.81 | 83.0 | 80.8 |
| RED-GLOG | red | surface | 53.6 | 0.0 | 4.06 | 0.0 | 0.0 | — | 7.36 | 99.2 | — |
| RED-KMF-1 | red | air | 49.3 | 2.06 | 0.01 | 0.36 | 2.06 | 38.7 | 6.7 | — | — |
| RED-KMF-2 | red | air | 49.3 | 1.49 | 0.1 | 0.25 | 1.78 | 30.9 | 6.87 | — | — |
| RED-KS-1 | red | submarine | 23.2 | 6.62 | 2.55 | 0.61 | 3.99 | 49.5 | 3.43 | 77.3 | 60.1 |
| RED-KSN | red | submarine | 18.8 | 10.61 | 3.61 | 0.55 | 6.46 | 64.3 | 2.72 | — | 75.9 |
| RED-MPRA-K1 | red | air | 18.8 | 4.04 | 1.59 | 0.58 | 2.58 | 49.4 | 2.46 | — | 95.4 |
| RED-MPRA-K2 | red | air | 15.9 | 3.59 | 1.35 | 0.62 | 2.07 | 47.6 | 2.16 | — | 96.9 |
| RED-OPSESP-1 | red | surface | 49.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.67 | 0.0 | 0.16 | 36.4 | 0.0 | — | 94.7 |

## Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=70.7%, red=29.3%
- Motivo de conclusão: timeout=44.0%, victory=56.0%
- Duração média: 11.26 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.03, red=59.25
- Unidades perdidas em média: blue=4.83, red=5.29

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.65 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.7 | 0.29 | 0.62 | 0.06 | 0.35 | 42.3 | 2.23 | 85.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.03 | 100.0 | 3.97 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 50.0 | 3.96 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.4 | 0.0 | 0.45 | 2.1 | 45.1 | 2.71 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.47 | 0.0 | 0.51 | 1.67 | 56.6 | 2.67 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.31 | 0.04 | 0.03 | 0.29 | 62.8 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.05 | 57.1 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 63.3 | 0.0 | 3.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 62.7 | 0.0 | 3.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.3 | 0.0 | 3.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 78.0 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.0 | 0.0 | 0.81 | 0.0 | 0.0 | — | 2.87 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 78.7 | 0.0 | 1.19 | 0.0 | 0.0 | — | 1.92 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 91.3 | 0.51 | 0.32 | 0.11 | 0.42 | 61.9 | 2.55 | — | 98.9 |
| BLUE-MPRA-2 | blue | air | 96.0 | 0.43 | 0.17 | 0.09 | 0.34 | 52.9 | 2.53 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 93.3 | 0.1 | 0.28 | 0.0 | 0.12 | 50.0 | 2.47 | 87.4 | 94.3 |
| BLUE-PAT-C2 | blue | surface | 87.3 | 0.42 | 0.53 | 0.03 | 0.41 | 58.1 | 2.27 | 89.1 | 78.7 |
| BLUE-PAT-O1 | blue | surface | 52.7 | 3.32 | 2.69 | 0.3 | 2.97 | 45.5 | 1.87 | 86.8 | 88.7 |
| BLUE-PAT-O2 | blue | surface | 92.7 | 2.41 | 0.49 | 0.42 | 2.28 | 48.0 | 3.56 | 37.5 | 83.3 |
| BLUE-PORTO-ACU | blue | land | 92.0 | 0.0 | 2.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 30.0 | 0.0 | 16.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 80.0 | 0.0 | 7.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 78.7 | 0.0 | 5.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.7 | 2.78 | 0.91 | 0.44 | 2.51 | 50.0 | 2.16 | 93.7 | 96.5 |
| BLUE-SAG-S1 | blue | surface | 84.7 | 2.4 | 2.33 | 0.39 | 2.63 | 44.4 | 2.46 | 38.3 | 97.2 |
| BLUE-SAG-S2 | blue | surface | 90.0 | 3.19 | 1.52 | 0.74 | 3.25 | 45.4 | 3.27 | 36.6 | 98.6 |
| BLUE-SUB-1 | blue | submarine | 83.3 | 3.95 | 0.57 | 0.56 | 3.69 | 54.7 | 3.09 | 87.0 | 72.7 |
| BLUE-SUB-2 | blue | submarine | 96.7 | 1.99 | 0.14 | 0.49 | 2.18 | 52.6 | 3.28 | 43.5 | 93.6 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 0.65 | 0.1 | 0.11 | 0.67 | 55.4 | 2.55 | 93.0 | 92.0 |
| BLUE-SUB-N | blue | submarine | 65.3 | 5.36 | 1.63 | 0.52 | 5.01 | 46.9 | 2.0 | — | 78.6 |
| RED-AKE | red | surface | 64.0 | 0.0 | 2.88 | 0.0 | 0.0 | — | 7.31 | 98.2 | — |
| RED-AOR-G | red | surface | 61.3 | 0.0 | 1.93 | 0.0 | 0.0 | — | 4.74 | 99.3 | — |
| RED-AWACS-K | red | air | 78.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.13 | — | — |
| RED-GANF | red | surface | 97.3 | 0.07 | 1.14 | 0.01 | 0.1 | 66.7 | 0.0 | 80.8 | — |
| RED-GBPA | red | surface | 78.7 | 1.38 | 1.87 | 0.24 | 1.17 | 48.9 | 0.0 | — | 97.1 |
| RED-GE-1 | red | surface | 72.7 | 17.39 | 4.89 | 1.07 | 10.91 | 65.8 | 3.21 | 84.7 | 77.2 |
| RED-GE-2 | red | surface | 63.3 | 13.38 | 5.39 | 0.91 | 8.45 | 62.3 | 3.25 | 81.6 | 69.8 |
| RED-GE-3 | red | surface | 61.3 | 2.01 | 4.23 | 0.25 | 1.85 | 59.9 | 2.83 | 83.1 | 84.0 |
| RED-GLOG | red | surface | 78.0 | 0.0 | 1.99 | 0.0 | 0.0 | — | 7.15 | 99.4 | — |
| RED-KMF-1 | red | air | 78.7 | 0.96 | 0.01 | 0.15 | 1.11 | 31.9 | 5.37 | — | — |
| RED-KMF-2 | red | air | 78.7 | 1.15 | 0.01 | 0.19 | 0.95 | 43.4 | 5.25 | — | — |
| RED-KS-1 | red | submarine | 20.0 | 6.37 | 2.55 | 0.51 | 3.69 | 53.2 | 2.81 | 73.1 | 63.6 |
| RED-KSN | red | submarine | 38.0 | 10.89 | 2.67 | 0.67 | 6.89 | 64.0 | 2.57 | — | 74.8 |
| RED-MPRA-K1 | red | air | 50.0 | 2.92 | 1.11 | 0.43 | 1.83 | 48.2 | 2.13 | — | 97.6 |
| RED-MPRA-K2 | red | air | 50.0 | 2.57 | 0.99 | 0.38 | 1.55 | 45.9 | 2.08 | — | 97.7 |
| RED-OPSESP-1 | red | surface | 78.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.18 | 3.37 | 0.01 | 0.14 | 61.9 | 0.0 | — | 95.3 |

### Somente vitória decisiva

- Partidas: **84**
- Taxa de vitória: blue=47.6%, red=52.4%
- Motivo de conclusão: victory=100.0%
- Duração média: 5.96 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.13, red=68.57
- Unidades perdidas em média: blue=5.68, red=5.98

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.46 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.02 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.6 | 0.42 | 0.33 | 0.1 | 0.55 | 39.1 | 3.06 | 80.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.02 | 0.0 | 0.02 | 0.02 | 100.0 | 4.68 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.67 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 2.48 | 0.0 | 0.44 | 2.19 | 37.5 | 2.75 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.04 | 0.0 | 0.51 | 1.77 | 50.3 | 2.71 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.26 | 0.0 | 0.01 | 0.35 | 51.7 | 0.49 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.05 | 0.0 | 0.02 | 0.08 | 57.1 | 0.98 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 44.0 | 0.0 | 5.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 41.7 | 0.0 | 5.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 39.3 | 0.0 | 5.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.6 | 0.0 | 2.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.1 | 0.0 | 1.1 | 0.0 | 0.0 | — | 3.15 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 71.4 | 0.0 | 1.63 | 0.0 | 0.0 | — | 2.83 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 95.2 | 0.6 | 0.18 | 0.15 | 0.55 | 54.3 | 1.73 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 97.6 | 0.46 | 0.17 | 0.11 | 0.42 | 48.6 | 1.65 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 94.0 | 0.18 | 0.18 | 0.0 | 0.21 | 50.0 | 3.62 | 82.1 | 89.9 |
| BLUE-PAT-C2 | blue | surface | 85.7 | 0.61 | 0.5 | 0.02 | 0.63 | 60.4 | 3.37 | 84.3 | 69.0 |
| BLUE-PAT-O1 | blue | surface | 42.9 | 4.75 | 3.26 | 0.43 | 3.86 | 48.1 | 2.31 | 87.5 | 83.9 |
| BLUE-PAT-O2 | blue | surface | 92.9 | 3.37 | 0.57 | 0.54 | 3.14 | 46.2 | 4.44 | 48.8 | 82.4 |
| BLUE-PORTO-ACU | blue | land | 98.8 | 0.0 | 0.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 20.2 | 0.0 | 18.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 69.0 | 0.0 | 11.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 91.7 | 0.0 | 3.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.8 | 3.4 | 1.25 | 0.52 | 3.25 | 46.9 | 3.07 | 90.5 | 94.3 |
| BLUE-SAG-S1 | blue | surface | 78.6 | 3.51 | 3.17 | 0.52 | 3.69 | 44.2 | 3.38 | 49.2 | 95.6 |
| BLUE-SAG-S2 | blue | surface | 89.3 | 4.12 | 1.82 | 0.85 | 4.05 | 45.0 | 4.44 | 46.3 | 97.5 |
| BLUE-SUB-1 | blue | submarine | 84.5 | 3.95 | 0.44 | 0.51 | 3.94 | 55.3 | 3.95 | 89.7 | 69.3 |
| BLUE-SUB-2 | blue | submarine | 96.4 | 1.96 | 0.13 | 0.46 | 2.24 | 53.7 | 4.15 | 65.2 | 90.9 |
| BLUE-SUB-3 | blue | submarine | 97.6 | 0.94 | 0.07 | 0.17 | 0.99 | 54.2 | 3.44 | 94.3 | 88.2 |
| BLUE-SUB-N | blue | submarine | 69.0 | 6.01 | 1.57 | 0.58 | 5.4 | 47.6 | 2.87 | — | 77.2 |
| RED-AKE | red | surface | 57.1 | 0.0 | 3.44 | 0.0 | 0.0 | — | 6.79 | 98.8 | — |
| RED-AOR-G | red | surface | 50.0 | 0.0 | 2.42 | 0.0 | 0.0 | — | 4.35 | 99.1 | — |
| RED-AWACS-K | red | air | 61.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.76 | — | — |
| RED-GANF | red | surface | 95.2 | 0.11 | 1.94 | 0.01 | 0.17 | 64.3 | 0.0 | 83.8 | — |
| RED-GBPA | red | surface | 61.9 | 1.73 | 3.05 | 0.3 | 1.35 | 52.2 | 0.0 | — | 95.8 |
| RED-GE-1 | red | surface | 90.5 | 17.25 | 3.3 | 1.01 | 10.65 | 65.1 | 3.19 | 84.3 | 77.1 |
| RED-GE-2 | red | surface | 73.8 | 16.01 | 4.82 | 1.07 | 9.63 | 63.2 | 3.21 | 83.6 | 64.4 |
| RED-GE-3 | red | surface | 39.3 | 3.36 | 6.74 | 0.39 | 2.98 | 60.0 | 4.42 | 75.0 | 73.2 |
| RED-GLOG | red | surface | 71.4 | 0.0 | 2.67 | 0.0 | 0.0 | — | 6.83 | 99.3 | — |
| RED-KMF-1 | red | air | 61.9 | 1.37 | 0.01 | 0.21 | 1.61 | 29.6 | 7.17 | — | — |
| RED-KMF-2 | red | air | 61.9 | 1.87 | 0.01 | 0.27 | 1.39 | 47.9 | 6.98 | — | — |
| RED-KS-1 | red | submarine | 28.6 | 8.13 | 2.19 | 0.71 | 4.54 | 53.8 | 3.01 | 71.1 | 54.9 |
| RED-KSN | red | submarine | 36.9 | 12.68 | 2.7 | 0.83 | 7.44 | 66.4 | 3.21 | — | 72.2 |
| RED-MPRA-K1 | red | air | 17.9 | 3.06 | 1.82 | 0.44 | 2.14 | 41.1 | 3.14 | — | 95.6 |
| RED-MPRA-K2 | red | air | 17.9 | 2.86 | 1.6 | 0.42 | 1.89 | 42.8 | 3.14 | — | 95.8 |
| RED-OPSESP-1 | red | surface | 61.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.15 | 3.43 | 0.0 | 0.13 | 63.6 | 0.0 | — | 95.6 |

## Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=24.0%, blue=76.0%
- Motivo de conclusão: victory=36.7%, timeout=63.3%
- Duração média: 14.36 turnos
- Dano médio causado por equipe (pontos de HP): blue=34.15, red=60.32
- Unidades perdidas em média: blue=5.11, red=5.09

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.11 | 50.0 | 0.88 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.59 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.74 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 90.7 | 0.25 | 1.19 | 0.06 | 0.25 | 48.6 | 2.03 | 82.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.02 | 0.08 | 50.0 | 6.39 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.05 | 25.0 | 6.37 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.88 | 0.0 | 0.64 | 2.39 | 54.3 | 4.65 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.57 | 0.0 | 0.5 | 1.81 | 50.2 | 4.68 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.24 | 0.08 | 0.03 | 0.25 | 70.3 | 0.29 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 0.59 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 63.3 | 0.0 | 3.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 67.3 | 0.0 | 2.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.0 | 0.0 | 2.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 73.3 | 0.0 | 2.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.0 | 0.0 | 0.83 | 0.0 | 0.0 | — | 2.52 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 80.7 | 0.0 | 1.03 | 0.0 | 0.0 | — | 2.31 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 96.7 | 0.31 | 0.17 | 0.07 | 0.28 | 45.2 | 2.45 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 95.3 | 0.1 | 0.25 | 0.03 | 0.18 | 33.3 | 2.44 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 86.0 | 0.01 | 0.56 | 0.0 | 0.01 | 50.0 | 2.57 | 90.2 | 99.3 |
| BLUE-PAT-C2 | blue | surface | 76.0 | 0.17 | 0.97 | 0.02 | 0.18 | 51.9 | 2.25 | 90.0 | 90.3 |
| BLUE-PAT-O1 | blue | surface | 70.7 | 3.19 | 1.88 | 0.37 | 3.37 | 41.2 | 1.99 | 91.1 | 93.7 |
| BLUE-PAT-O2 | blue | surface | 84.7 | 2.34 | 1.01 | 0.5 | 2.09 | 47.8 | 3.0 | 31.7 | 87.7 |
| BLUE-PORTO-ACU | blue | land | 83.3 | 0.0 | 3.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 30.0 | 0.0 | 16.11 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 2.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 63.3 | 0.0 | 9.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 2.01 | 0.94 | 0.24 | 2.13 | 43.4 | 1.93 | 94.1 | 97.5 |
| BLUE-SAG-S1 | blue | surface | 74.0 | 2.45 | 3.93 | 0.31 | 2.21 | 46.4 | 1.9 | 30.5 | 98.7 |
| BLUE-SAG-S2 | blue | surface | 89.3 | 3.09 | 1.49 | 0.59 | 2.74 | 48.4 | 2.64 | 32.1 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 85.3 | 3.21 | 0.55 | 0.49 | 2.81 | 60.8 | 2.93 | 78.9 | 77.0 |
| BLUE-SUB-2 | blue | submarine | 90.7 | 2.4 | 0.29 | 0.59 | 2.03 | 54.6 | 3.59 | 30.3 | 95.7 |
| BLUE-SUB-3 | blue | submarine | 93.3 | 0.55 | 0.25 | 0.07 | 0.51 | 55.3 | 2.89 | 86.1 | 94.4 |
| BLUE-SUB-N | blue | submarine | 62.0 | 5.27 | 1.78 | 0.56 | 4.49 | 50.2 | 1.57 | — | 82.4 |
| RED-AKE | red | surface | 56.7 | 0.0 | 3.44 | 0.0 | 0.0 | — | 7.81 | 97.2 | — |
| RED-AOR-G | red | surface | 68.0 | 0.0 | 1.58 | 0.0 | 0.0 | — | 4.76 | 99.3 | — |
| RED-AWACS-K | red | air | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.5 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.48 | 0.0 | 0.0 | — | 0.0 | 59.4 | — |
| RED-GBPA | red | surface | 97.3 | 0.75 | 0.32 | 0.13 | 0.67 | 55.4 | 0.0 | — | 97.8 |
| RED-GE-1 | red | surface | 70.0 | 17.31 | 4.57 | 1.19 | 11.25 | 63.9 | 2.36 | 78.5 | 76.2 |
| RED-GE-2 | red | surface | 54.0 | 12.43 | 6.17 | 0.86 | 8.01 | 61.6 | 3.03 | 75.9 | 72.4 |
| RED-GE-3 | red | surface | 69.3 | 1.05 | 3.44 | 0.15 | 0.99 | 55.4 | 2.18 | 77.6 | 90.7 |
| RED-GLOG | red | surface | 61.3 | 0.0 | 2.9 | 0.0 | 0.0 | — | 7.46 | 99.4 | — |
| RED-KMF-1 | red | air | 97.3 | 0.91 | 0.13 | 0.16 | 0.87 | 42.0 | 4.98 | — | — |
| RED-KMF-2 | red | air | 97.3 | 0.67 | 0.08 | 0.11 | 0.74 | 37.8 | 5.02 | — | — |
| RED-KS-1 | red | submarine | 28.7 | 6.78 | 2.54 | 0.65 | 4.37 | 50.2 | 1.87 | 56.7 | 59.1 |
| RED-KSN | red | submarine | 44.0 | 13.02 | 2.59 | 0.87 | 7.93 | 64.7 | 2.37 | — | 72.7 |
| RED-MPRA-K1 | red | air | 66.7 | 3.63 | 1.16 | 0.51 | 1.98 | 49.8 | 1.89 | — | 99.8 |
| RED-MPRA-K2 | red | air | 67.3 | 3.6 | 1.06 | 0.46 | 1.84 | 51.1 | 2.27 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.16 | 3.68 | 0.02 | 0.09 | 84.6 | 0.0 | — | 97.1 |

### Somente vitória decisiva

- Partidas: **55**
- Taxa de vitória: red=65.5%, blue=34.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.07 turnos
- Dano médio causado por equipe (pontos de HP): blue=43.29, red=74.6
- Unidades perdidas em média: blue=6.45, red=6.51

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.0 | 0.15 | 37.5 | 1.47 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.98 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 90.9 | 0.58 | 1.38 | 0.13 | 0.47 | 50.0 | 3.31 | 76.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.09 | 0.0 | 0.05 | 0.13 | 57.1 | 7.44 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.02 | 0.07 | 25.0 | 7.53 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.64 | 0.0 | 0.55 | 2.62 | 43.1 | 5.0 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.44 | 0.0 | 0.49 | 2.09 | 45.2 | 5.0 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.31 | 0.0 | 0.02 | 0.4 | 63.6 | 0.49 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.98 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 32.7 | 0.0 | 5.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 36.4 | 0.0 | 5.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 43.6 | 0.0 | 4.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 58.2 | 0.0 | 4.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 70.9 | 0.0 | 1.44 | 0.0 | 0.0 | — | 4.11 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 74.5 | 0.0 | 1.38 | 0.0 | 0.0 | — | 3.98 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 92.7 | 0.78 | 0.35 | 0.15 | 0.65 | 44.4 | 2.42 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 89.1 | 0.22 | 0.56 | 0.05 | 0.42 | 26.1 | 2.2 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 85.5 | 0.02 | 0.58 | 0.0 | 0.02 | 100.0 | 3.84 | 88.5 | 99.1 |
| BLUE-PAT-C2 | blue | surface | 65.5 | 0.2 | 1.45 | 0.04 | 0.18 | 50.0 | 3.64 | 87.6 | 90.9 |
| BLUE-PAT-O1 | blue | surface | 58.2 | 5.24 | 2.89 | 0.73 | 4.82 | 46.4 | 2.76 | 84.5 | 88.6 |
| BLUE-PAT-O2 | blue | surface | 90.9 | 3.35 | 0.55 | 0.64 | 2.89 | 45.9 | 3.27 | 50.4 | 90.5 |
| BLUE-PORTO-ACU | blue | land | 92.7 | 0.0 | 2.44 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 18.2 | 0.0 | 18.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 4.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 65.5 | 0.0 | 10.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 81.8 | 3.0 | 1.15 | 0.44 | 3.04 | 46.1 | 3.11 | 89.4 | 97.7 |
| BLUE-SAG-S1 | blue | surface | 80.0 | 4.76 | 3.38 | 0.53 | 4.38 | 43.2 | 3.13 | 42.5 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 94.5 | 4.93 | 1.27 | 0.98 | 4.0 | 50.9 | 3.84 | 44.4 | 99.5 |
| BLUE-SUB-1 | blue | submarine | 80.0 | 4.8 | 0.71 | 0.67 | 4.2 | 58.4 | 3.87 | 84.5 | 65.9 |
| BLUE-SUB-2 | blue | submarine | 92.7 | 1.91 | 0.24 | 0.47 | 1.71 | 56.4 | 4.02 | 56.1 | 95.0 |
| BLUE-SUB-3 | blue | submarine | 90.9 | 0.91 | 0.35 | 0.13 | 0.73 | 55.0 | 3.73 | 89.0 | 91.8 |
| BLUE-SUB-N | blue | submarine | 69.1 | 5.05 | 1.31 | 0.44 | 4.58 | 47.2 | 2.35 | — | 78.8 |
| RED-AKE | red | surface | 52.7 | 0.0 | 3.44 | 0.0 | 0.0 | — | 8.0 | 98.0 | — |
| RED-AOR-G | red | surface | 49.1 | 0.0 | 2.45 | 0.0 | 0.0 | — | 5.15 | 98.7 | — |
| RED-AWACS-K | red | air | 92.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.47 | — | — |
| RED-GANF | red | surface | 96.4 | 0.0 | 0.82 | 0.0 | 0.0 | — | 0.0 | 58.3 | — |
| RED-GBPA | red | surface | 92.7 | 1.36 | 0.75 | 0.24 | 1.31 | 55.6 | 0.0 | — | 95.5 |
| RED-GE-1 | red | surface | 81.8 | 19.31 | 3.33 | 1.24 | 12.62 | 64.3 | 1.53 | 76.3 | 73.5 |
| RED-GE-2 | red | surface | 47.3 | 15.47 | 7.22 | 1.18 | 9.76 | 59.2 | 3.29 | 75.9 | 63.8 |
| RED-GE-3 | red | surface | 32.7 | 2.33 | 7.6 | 0.31 | 2.2 | 53.7 | 4.44 | 72.0 | 79.7 |
| RED-GLOG | red | surface | 50.9 | 0.0 | 3.62 | 0.0 | 0.0 | — | 8.02 | 99.3 | — |
| RED-KMF-1 | red | air | 92.7 | 1.8 | 0.33 | 0.35 | 1.82 | 40.0 | 9.24 | — | — |
| RED-KMF-2 | red | air | 92.7 | 1.4 | 0.11 | 0.24 | 1.55 | 37.6 | 9.25 | — | — |
| RED-KS-1 | red | submarine | 30.9 | 7.87 | 2.35 | 0.73 | 4.75 | 52.9 | 2.18 | 56.3 | 53.1 |
| RED-KSN | red | submarine | 50.9 | 16.33 | 2.4 | 1.09 | 8.89 | 66.5 | 2.85 | — | 66.8 |
| RED-MPRA-K1 | red | air | 23.6 | 4.6 | 2.69 | 0.6 | 2.69 | 48.0 | 3.69 | — | 99.4 |
| RED-MPRA-K2 | red | air | 29.1 | 3.93 | 2.36 | 0.47 | 2.33 | 46.1 | 4.42 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 92.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.2 | 3.84 | 0.02 | 0.11 | 100.0 | 0.0 | — | 96.4 |

## Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=87.3%, red=12.7%
- Motivo de conclusão: victory=40.7%, timeout=59.3%
- Duração média: 14.26 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.71, red=64.81
- Unidades perdidas em média: blue=5.62, red=5.41

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.08 | 16.7 | 1.2 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.83 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.65 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 90.7 | 0.07 | 1.25 | 0.02 | 0.15 | 31.8 | 2.7 | 79.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.02 | 0.11 | 29.4 | 7.87 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.02 | 0.09 | 42.9 | 7.91 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.36 | 0.0 | 0.57 | 2.19 | 53.5 | 5.52 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.63 | 0.0 | 0.51 | 1.67 | 56.8 | 5.64 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.3 | 0.06 | 0.05 | 0.14 | 85.7 | 0.4 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.01 | 0.03 | 0.01 | 0.01 | 100.0 | 0.79 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 76.0 | 0.0 | 2.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 78.7 | 0.0 | 2.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.0 | 0.0 | 2.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.0 | 0.0 | 2.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 80.0 | 0.0 | 1.19 | 0.0 | 0.0 | — | 3.51 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 67.3 | 0.0 | 1.73 | 0.0 | 0.0 | — | 3.25 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 96.0 | 0.35 | 0.18 | 0.09 | 0.29 | 55.8 | 3.94 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.3 | 0.33 | 0.29 | 0.05 | 0.32 | 52.1 | 3.47 | — | 99.8 |
| BLUE-PAT-C1 | blue | surface | 79.3 | 0.05 | 0.85 | 0.01 | 0.07 | 70.0 | 3.67 | 83.9 | 97.0 |
| BLUE-PAT-C2 | blue | surface | 73.3 | 0.14 | 1.12 | 0.01 | 0.24 | 55.6 | 3.35 | 86.0 | 89.0 |
| BLUE-PAT-O1 | blue | surface | 72.0 | 4.09 | 1.75 | 0.38 | 4.04 | 45.5 | 2.58 | 87.4 | 94.8 |
| BLUE-PAT-O2 | blue | surface | 82.0 | 2.56 | 1.09 | 0.47 | 2.39 | 49.3 | 3.99 | 30.3 | 88.5 |
| BLUE-PORTO-ACU | blue | land | 81.3 | 0.0 | 3.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 24.0 | 0.0 | 18.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 54.0 | 0.0 | 9.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 73.3 | 2.37 | 1.53 | 0.24 | 2.29 | 43.6 | 2.47 | 93.1 | 98.4 |
| BLUE-SAG-S1 | blue | surface | 72.0 | 3.19 | 3.97 | 0.44 | 2.97 | 45.6 | 2.7 | 40.5 | 99.0 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.9 | 1.95 | 0.74 | 3.29 | 48.0 | 3.83 | 28.9 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 83.3 | 3.55 | 0.61 | 0.55 | 3.1 | 57.8 | 3.92 | 74.8 | 77.4 |
| BLUE-SUB-2 | blue | submarine | 88.7 | 2.06 | 0.42 | 0.51 | 2.12 | 51.6 | 4.77 | 33.7 | 93.0 |
| BLUE-SUB-3 | blue | submarine | 90.7 | 0.49 | 0.3 | 0.08 | 0.64 | 46.9 | 4.13 | 81.2 | 93.6 |
| BLUE-SUB-N | blue | submarine | 55.3 | 6.19 | 2.13 | 0.63 | 5.39 | 50.1 | 2.0 | — | 80.0 |
| RED-AKE | red | surface | 42.7 | 0.0 | 4.45 | 0.0 | 0.0 | — | 7.59 | 96.8 | — |
| RED-AOR-G | red | surface | 58.7 | 0.0 | 2.0 | 0.0 | 0.0 | — | 3.59 | 99.1 | — |
| RED-AWACS-K | red | air | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.89 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.99 | 0.0 | 0.0 | — | 0.0 | 50.9 | — |
| RED-GBPA | red | surface | 93.3 | 1.01 | 0.83 | 0.2 | 0.9 | 50.4 | 0.0 | — | 98.0 |
| RED-GE-1 | red | surface | 66.7 | 20.51 | 5.54 | 1.37 | 12.59 | 66.7 | 2.16 | 78.3 | 73.6 |
| RED-GE-2 | red | surface | 60.0 | 12.17 | 5.75 | 0.87 | 8.88 | 60.9 | 1.89 | 73.5 | 70.4 |
| RED-GE-3 | red | surface | 68.7 | 1.51 | 3.63 | 0.21 | 1.49 | 54.5 | 1.73 | 78.0 | 87.1 |
| RED-GLOG | red | surface | 49.3 | 0.0 | 3.98 | 0.0 | 0.0 | — | 6.55 | 99.2 | — |
| RED-KMF-1 | red | air | 93.3 | 0.89 | 0.06 | 0.17 | 0.92 | 36.2 | 5.03 | — | — |
| RED-KMF-2 | red | air | 93.3 | 0.62 | 0.09 | 0.12 | 0.77 | 40.5 | 5.11 | — | — |
| RED-KS-1 | red | submarine | 35.3 | 8.16 | 2.2 | 0.75 | 4.88 | 55.6 | 2.45 | 55.5 | 53.4 |
| RED-KSN | red | submarine | 35.3 | 12.08 | 2.83 | 0.85 | 8.47 | 61.5 | 2.01 | — | 71.6 |
| RED-MPRA-K1 | red | air | 67.3 | 4.66 | 0.97 | 0.69 | 2.21 | 53.2 | 1.9 | — | 100.0 |
| RED-MPRA-K2 | red | air | 66.7 | 3.13 | 0.85 | 0.39 | 1.77 | 50.9 | 2.23 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 3.55 | 0.01 | 0.03 | 75.0 | 0.0 | — | 99.1 |

### Somente vitória decisiva

- Partidas: **61**
- Taxa de vitória: blue=68.9%, red=31.1%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.8 turnos
- Dano médio causado por equipe (pontos de HP): blue=50.25, red=73.18
- Unidades perdidas em média: blue=6.7, red=6.95

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.0 | 0.05 | 33.3 | 2.02 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.41 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.11 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 91.8 | 0.05 | 1.31 | 0.02 | 0.16 | 30.0 | 4.16 | 73.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.02 | 0.11 | 28.6 | 9.34 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.08 | 0.0 | 0.05 | 0.11 | 71.4 | 9.21 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.3 | 0.0 | 0.62 | 2.52 | 50.6 | 5.77 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.72 | 0.0 | 0.49 | 1.93 | 50.8 | 5.92 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.23 | 0.0 | 0.03 | 0.1 | 83.3 | 0.67 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.03 | 0.03 | 100.0 | 1.33 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 65.6 | 0.0 | 3.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 65.6 | 0.0 | 3.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 57.4 | 0.0 | 3.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 65.6 | 0.0 | 3.36 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 75.4 | 0.0 | 1.49 | 0.0 | 0.0 | — | 5.46 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 57.4 | 0.0 | 2.28 | 0.0 | 0.0 | — | 5.59 | 99.1 | — |
| BLUE-MPRA-1 | blue | air | 93.4 | 0.77 | 0.31 | 0.18 | 0.59 | 55.6 | 3.3 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 82.0 | 0.79 | 0.52 | 0.13 | 0.67 | 58.5 | 2.75 | — | 99.5 |
| BLUE-PAT-C1 | blue | surface | 73.8 | 0.1 | 1.05 | 0.0 | 0.15 | 66.7 | 5.69 | 81.1 | 93.4 |
| BLUE-PAT-C2 | blue | surface | 60.7 | 0.13 | 1.51 | 0.0 | 0.23 | 50.0 | 4.8 | 79.5 | 89.3 |
| BLUE-PAT-O1 | blue | surface | 65.6 | 6.18 | 2.18 | 0.51 | 6.02 | 45.2 | 3.36 | 81.6 | 90.2 |
| BLUE-PAT-O2 | blue | surface | 85.2 | 4.1 | 1.1 | 0.54 | 3.36 | 49.8 | 4.95 | 50.0 | 95.9 |
| BLUE-PORTO-ACU | blue | land | 86.9 | 0.0 | 2.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 19.7 | 0.0 | 18.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.4 | 0.0 | 10.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 62.3 | 3.44 | 2.16 | 0.38 | 3.21 | 46.9 | 4.03 | 88.8 | 97.5 |
| BLUE-SAG-S1 | blue | surface | 72.1 | 5.89 | 4.15 | 0.82 | 5.44 | 45.8 | 4.03 | 58.0 | 98.5 |
| BLUE-SAG-S2 | blue | surface | 88.5 | 5.39 | 2.25 | 1.05 | 5.0 | 45.9 | 5.9 | 51.0 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 75.4 | 5.23 | 0.85 | 0.77 | 4.69 | 54.2 | 5.0 | 77.1 | 69.9 |
| BLUE-SUB-2 | blue | submarine | 86.9 | 1.61 | 0.48 | 0.44 | 1.61 | 62.2 | 5.57 | 59.8 | 93.2 |
| BLUE-SUB-3 | blue | submarine | 85.2 | 0.98 | 0.46 | 0.16 | 1.11 | 50.0 | 5.16 | 85.4 | 88.7 |
| BLUE-SUB-N | blue | submarine | 55.7 | 7.18 | 2.23 | 0.7 | 5.95 | 51.8 | 3.05 | — | 76.4 |
| RED-AKE | red | surface | 31.1 | 0.0 | 5.41 | 0.0 | 0.0 | — | 7.8 | 96.9 | — |
| RED-AOR-G | red | surface | 29.5 | 0.0 | 3.38 | 0.0 | 0.0 | — | 3.87 | 98.3 | — |
| RED-AWACS-K | red | air | 83.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.87 | — | — |
| RED-GANF | red | surface | 96.7 | 0.0 | 1.85 | 0.0 | 0.0 | — | 0.0 | 48.3 | — |
| RED-GBPA | red | surface | 83.6 | 1.52 | 1.92 | 0.33 | 1.46 | 51.7 | 0.0 | — | 96.4 |
| RED-GE-1 | red | surface | 68.9 | 21.87 | 6.33 | 1.44 | 12.77 | 67.0 | 2.3 | 70.4 | 72.7 |
| RED-GE-2 | red | surface | 67.2 | 14.38 | 5.8 | 1.11 | 9.98 | 60.8 | 1.87 | 75.2 | 65.9 |
| RED-GE-3 | red | surface | 34.4 | 2.95 | 7.7 | 0.41 | 3.16 | 52.8 | 3.39 | 72.0 | 72.8 |
| RED-GLOG | red | surface | 32.8 | 0.0 | 5.07 | 0.0 | 0.0 | — | 7.02 | 99.3 | — |
| RED-KMF-1 | red | air | 83.6 | 1.41 | 0.15 | 0.3 | 1.66 | 32.7 | 9.23 | — | — |
| RED-KMF-2 | red | air | 83.6 | 1.07 | 0.1 | 0.21 | 1.43 | 41.4 | 9.31 | — | — |
| RED-KS-1 | red | submarine | 49.2 | 9.31 | 1.52 | 0.87 | 5.46 | 56.5 | 2.93 | 53.4 | 46.2 |
| RED-KSN | red | submarine | 16.4 | 11.97 | 3.69 | 0.77 | 8.28 | 60.8 | 2.41 | — | 70.4 |
| RED-MPRA-K1 | red | air | 36.1 | 5.44 | 1.85 | 0.82 | 2.36 | 56.9 | 3.61 | — | 100.0 |
| RED-MPRA-K2 | red | air | 34.4 | 3.26 | 1.66 | 0.44 | 2.02 | 51.2 | 4.41 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 83.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 3.82 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
