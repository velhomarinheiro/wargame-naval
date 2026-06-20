# Desempenho por Unidade — Combinações de Doutrina (Postura x Formação)

_Gerado em 2026-06-20_

## Metodologia

Partidas espelhadas: a mesma combinação de **postura** (ofensiva/defensiva) e **formação** (concentrada/dividida) é aplicada simetricamente às equipes azul e vermelha em cada célula, isolando o efeito desse par de eixos sobre o desempenho individual das unidades. Os demais eixos de doutrina (engajamento, política de combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) são sorteados aleatoriamente por partida. 150 partidas por célula (600 partidas no total), usando o motor heurístico de `ml/simulate_games.py` (mesmo gerador dos dados de treino). Cada célula é reportada em dois recortes: **geral** (todas as partidas) e **vitória decisiva** (somente partidas concluídas por objetivo de cenário, excluindo o desempate de timeout por soma de HP).

## Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=82.0%, red=18.0%
- Motivo de conclusão: timeout=50.7%, victory=49.3%
- Duração média: 12.07 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.25, red=60.14
- Unidades perdidas em média: blue=5.23, red=5.35

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.01 | 0.03 | 0.01 | 0.06 | 22.2 | 1.0 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.67 | — | — |
| BLUE-AERO-CF | blue | land | 96.0 | 0.0 | 0.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.7 | 0.32 | 0.33 | 0.12 | 0.42 | 49.2 | 2.47 | 86.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.03 | 50.0 | 3.97 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 33.3 | 3.98 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.19 | 0.0 | 0.62 | 2.1 | 57.5 | 2.58 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.62 | 0.0 | 0.39 | 1.53 | 56.1 | 2.61 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.47 | 0.08 | 0.08 | 0.24 | 86.1 | 0.33 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.67 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 66.0 | 0.0 | 3.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 65.3 | 0.0 | 3.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 69.3 | 0.0 | 3.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 76.0 | 0.0 | 2.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.7 | 0.0 | 0.77 | 0.0 | 0.0 | — | 3.25 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 75.3 | 0.0 | 1.38 | 0.0 | 0.0 | — | 2.12 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 89.3 | 0.54 | 0.37 | 0.11 | 0.32 | 64.6 | 1.57 | — | 99.6 |
| BLUE-MPRA-2 | blue | air | 89.3 | 0.28 | 0.33 | 0.05 | 0.23 | 57.1 | 1.57 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 92.0 | 0.13 | 0.37 | 0.03 | 0.07 | 70.0 | 2.44 | 87.0 | 95.3 |
| BLUE-PAT-C2 | blue | surface | 74.7 | 0.37 | 1.26 | 0.05 | 0.25 | 76.3 | 2.02 | 91.2 | 85.3 |
| BLUE-PAT-O1 | blue | surface | 43.3 | 2.37 | 3.6 | 0.21 | 1.9 | 44.9 | 1.66 | 89.3 | 90.3 |
| BLUE-PAT-O2 | blue | surface | 91.3 | 2.59 | 0.54 | 0.61 | 2.0 | 54.3 | 3.13 | 39.2 | 76.7 |
| BLUE-PORTO-ACU | blue | land | 88.7 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 44.7 | 0.0 | 15.34 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 82.7 | 0.0 | 6.11 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 73.3 | 0.0 | 5.96 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 82.0 | 2.41 | 1.17 | 0.37 | 2.56 | 45.3 | 2.44 | 93.8 | 96.7 |
| BLUE-SAG-S1 | blue | surface | 80.0 | 1.7 | 2.81 | 0.27 | 2.19 | 38.0 | 2.22 | 41.6 | 98.7 |
| BLUE-SAG-S2 | blue | surface | 90.7 | 3.35 | 1.55 | 0.67 | 3.32 | 46.8 | 3.1 | 41.6 | 99.1 |
| BLUE-SUB-1 | blue | submarine | 79.3 | 4.81 | 0.73 | 0.67 | 3.6 | 60.6 | 2.93 | 89.0 | 68.7 |
| BLUE-SUB-2 | blue | submarine | 94.0 | 2.13 | 0.2 | 0.51 | 1.93 | 53.6 | 3.5 | 46.6 | 92.3 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.81 | 0.19 | 0.13 | 0.51 | 71.1 | 2.51 | 94.3 | 93.1 |
| BLUE-SUB-N | blue | submarine | 56.7 | 5.11 | 2.13 | 0.44 | 3.45 | 59.3 | 2.05 | — | 76.7 |
| RED-AKE | red | surface | 69.3 | 0.0 | 2.83 | 0.0 | 0.0 | — | 7.51 | 98.2 | — |
| RED-AOR-G | red | surface | 61.3 | 0.0 | 2.03 | 0.0 | 0.0 | — | 4.71 | 99.4 | — |
| RED-AWACS-K | red | air | 74.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.19 | — | — |
| RED-GANF | red | surface | 98.7 | 0.03 | 0.83 | 0.0 | 0.03 | 80.0 | 0.0 | 77.4 | — |
| RED-GBPA | red | surface | 74.0 | 1.59 | 2.11 | 0.28 | 1.39 | 47.6 | 0.0 | — | 98.0 |
| RED-GE-1 | red | surface | 68.7 | 16.61 | 4.87 | 1.07 | 10.43 | 65.9 | 2.96 | 91.2 | 78.0 |
| RED-GE-2 | red | surface | 56.0 | 13.04 | 6.42 | 0.77 | 7.5 | 67.2 | 3.33 | 86.4 | 71.4 |
| RED-GE-3 | red | surface | 71.3 | 1.71 | 3.42 | 0.23 | 1.11 | 68.9 | 2.13 | 88.6 | 86.4 |
| RED-GLOG | red | surface | 72.0 | 0.0 | 2.39 | 0.0 | 0.0 | — | 7.04 | 99.4 | — |
| RED-KMF-1 | red | air | 74.0 | 1.15 | 0.03 | 0.22 | 1.26 | 32.3 | 4.42 | — | — |
| RED-KMF-2 | red | air | 74.0 | 1.02 | 0.0 | 0.21 | 1.07 | 42.9 | 4.46 | — | — |
| RED-KS-1 | red | submarine | 12.7 | 7.03 | 2.68 | 0.63 | 2.75 | 65.3 | 2.75 | 78.8 | 56.8 |
| RED-KSN | red | submarine | 36.7 | 11.31 | 2.85 | 0.83 | 6.59 | 67.3 | 2.32 | — | 73.9 |
| RED-MPRA-K1 | red | air | 53.3 | 3.89 | 0.98 | 0.57 | 1.7 | 58.4 | 1.55 | — | 97.1 |
| RED-MPRA-K2 | red | air | 54.0 | 2.74 | 0.9 | 0.41 | 1.18 | 60.5 | 1.84 | — | 98.7 |
| RED-OPSESP-1 | red | surface | 74.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 3.9 | 0.01 | 0.03 | 40.0 | 0.0 | — | 98.9 |

### Somente vitória decisiva

- Partidas: **74**
- Taxa de vitória: red=36.5%, blue=63.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 5.97 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.08, red=75.82
- Unidades perdidas em média: blue=7.04, red=6.64

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.12 | 22.2 | 1.91 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.27 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.53 | 0.49 | 0.22 | 0.69 | 49.0 | 4.07 | 80.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.05 | 50.0 | 6.64 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.04 | 33.3 | 6.62 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.62 | 0.0 | 0.74 | 2.45 | 55.8 | 3.97 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.84 | 0.0 | 0.41 | 1.73 | 57.0 | 4.04 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.34 | 0.0 | 0.04 | 0.26 | 84.2 | 0.64 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.27 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 52.7 | 0.0 | 4.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 43.2 | 0.0 | 4.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 48.6 | 0.0 | 4.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 68.9 | 0.0 | 2.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 77.0 | 0.0 | 1.36 | 0.0 | 0.0 | — | 4.11 | 99.0 | — |
| BLUE-LOG-T | blue | surface | 58.1 | 0.0 | 2.36 | 0.0 | 0.0 | — | 3.64 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 87.8 | 0.66 | 0.49 | 0.12 | 0.46 | 58.8 | 1.89 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 90.5 | 0.32 | 0.35 | 0.08 | 0.3 | 50.0 | 1.84 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 86.5 | 0.24 | 0.68 | 0.04 | 0.12 | 66.7 | 4.58 | 77.7 | 91.9 |
| BLUE-PAT-C2 | blue | surface | 56.8 | 0.3 | 2.11 | 0.04 | 0.2 | 73.3 | 3.78 | 84.5 | 90.5 |
| BLUE-PAT-O1 | blue | surface | 16.2 | 3.49 | 5.27 | 0.35 | 2.72 | 44.3 | 2.35 | 88.0 | 87.2 |
| BLUE-PAT-O2 | blue | surface | 86.5 | 3.54 | 0.85 | 0.68 | 2.99 | 48.9 | 4.59 | 60.3 | 84.5 |
| BLUE-PORTO-ACU | blue | land | 97.3 | 0.0 | 0.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 41.9 | 0.0 | 17.08 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 71.6 | 0.0 | 9.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 87.8 | 0.0 | 3.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 68.9 | 3.31 | 2.07 | 0.49 | 3.61 | 45.7 | 4.19 | 91.1 | 95.1 |
| BLUE-SAG-S1 | blue | surface | 62.2 | 2.38 | 4.49 | 0.36 | 3.55 | 35.4 | 3.91 | 59.5 | 98.0 |
| BLUE-SAG-S2 | blue | surface | 83.8 | 5.01 | 2.69 | 0.88 | 4.65 | 45.9 | 5.18 | 58.6 | 98.3 |
| BLUE-SUB-1 | blue | submarine | 77.0 | 6.59 | 0.84 | 0.92 | 4.54 | 64.3 | 5.0 | 90.7 | 52.9 |
| BLUE-SUB-2 | blue | submarine | 93.2 | 2.34 | 0.23 | 0.45 | 1.77 | 58.8 | 5.55 | 72.9 | 85.8 |
| BLUE-SUB-3 | blue | submarine | 91.9 | 1.38 | 0.28 | 0.22 | 0.81 | 71.7 | 4.57 | 91.1 | 87.7 |
| BLUE-SUB-N | blue | submarine | 50.0 | 6.12 | 2.5 | 0.57 | 4.36 | 59.8 | 3.49 | — | 71.3 |
| RED-AKE | red | surface | 50.0 | 0.0 | 4.04 | 0.0 | 0.0 | — | 6.85 | 97.1 | — |
| RED-AOR-G | red | surface | 41.9 | 0.0 | 2.97 | 0.0 | 0.0 | — | 3.65 | 99.3 | — |
| RED-AWACS-K | red | air | 48.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.85 | — | — |
| RED-GANF | red | surface | 97.3 | 0.05 | 1.57 | 0.0 | 0.07 | 80.0 | 0.0 | 69.6 | — |
| RED-GBPA | red | surface | 48.6 | 2.85 | 4.15 | 0.49 | 2.31 | 48.0 | 0.0 | — | 95.9 |
| RED-GE-1 | red | surface | 85.1 | 17.49 | 3.18 | 1.15 | 10.43 | 67.6 | 2.58 | 89.5 | 77.0 |
| RED-GE-2 | red | surface | 59.5 | 16.47 | 6.97 | 1.05 | 8.81 | 68.4 | 3.41 | 81.3 | 63.4 |
| RED-GE-3 | red | surface | 52.7 | 2.96 | 5.81 | 0.38 | 1.84 | 72.8 | 3.54 | 81.3 | 75.2 |
| RED-GLOG | red | surface | 51.4 | 0.0 | 4.15 | 0.0 | 0.0 | — | 6.74 | 99.0 | — |
| RED-KMF-1 | red | air | 48.6 | 2.0 | 0.05 | 0.35 | 2.23 | 31.5 | 6.23 | — | — |
| RED-KMF-2 | red | air | 48.6 | 1.96 | 0.0 | 0.38 | 1.93 | 42.7 | 6.32 | — | — |
| RED-KS-1 | red | submarine | 24.3 | 8.26 | 2.34 | 0.8 | 3.35 | 64.5 | 3.43 | 75.1 | 48.9 |
| RED-KSN | red | submarine | 28.4 | 11.68 | 3.3 | 0.74 | 6.51 | 68.5 | 2.66 | — | 73.3 |
| RED-MPRA-K1 | red | air | 14.9 | 7.14 | 1.76 | 1.0 | 3.11 | 58.3 | 2.85 | — | 94.6 |
| RED-MPRA-K2 | red | air | 13.5 | 4.97 | 1.65 | 0.7 | 2.08 | 59.1 | 2.64 | — | 97.7 |
| RED-OPSESP-1 | red | surface | 48.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.15 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=83.3%, red=16.7%
- Motivo de conclusão: timeout=50.0%, victory=50.0%
- Duração média: 12.01 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.44, red=56.6
- Unidades perdidas em média: blue=4.82, red=5.35

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.06 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.71 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.32 | 0.47 | 0.09 | 0.37 | 51.8 | 2.49 | 86.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.02 | 66.7 | 4.32 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 4.35 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.76 | 0.0 | 0.46 | 1.55 | 60.5 | 2.78 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.45 | 0.0 | 0.31 | 1.15 | 57.0 | 2.83 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.19 | 0.05 | 0.03 | 0.17 | 69.2 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.07 | 0.0 | 0.02 | 0.04 | 83.3 | 0.7 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 72.7 | 0.0 | 2.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 74.7 | 0.0 | 2.34 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.7 | 0.0 | 2.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 74.0 | 0.0 | 2.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.0 | 0.0 | 0.78 | 0.0 | 0.0 | — | 3.38 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 75.3 | 0.0 | 1.51 | 0.0 | 0.0 | — | 2.46 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.45 | 0.25 | 0.09 | 0.3 | 64.4 | 1.73 | — | 98.7 |
| BLUE-MPRA-2 | blue | air | 97.3 | 0.31 | 0.14 | 0.06 | 0.23 | 70.6 | 1.75 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 90.7 | 0.25 | 0.4 | 0.01 | 0.19 | 67.9 | 2.48 | 92.3 | 88.0 |
| BLUE-PAT-C2 | blue | surface | 80.7 | 0.6 | 0.81 | 0.05 | 0.45 | 79.4 | 2.41 | 89.7 | 72.0 |
| BLUE-PAT-O1 | blue | surface | 49.3 | 2.35 | 3.27 | 0.25 | 2.31 | 41.5 | 1.76 | 87.1 | 84.7 |
| BLUE-PAT-O2 | blue | surface | 88.0 | 3.13 | 0.67 | 0.6 | 2.39 | 52.6 | 3.75 | 41.1 | 69.0 |
| BLUE-PORTO-ACU | blue | land | 90.7 | 0.0 | 2.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 39.3 | 0.0 | 15.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 90.7 | 0.0 | 4.82 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 74.7 | 0.0 | 6.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.7 | 3.16 | 1.09 | 0.48 | 2.6 | 49.7 | 2.48 | 93.2 | 94.6 |
| BLUE-SAG-S1 | blue | surface | 78.7 | 2.4 | 3.38 | 0.29 | 2.25 | 42.6 | 2.45 | 41.7 | 96.3 |
| BLUE-SAG-S2 | blue | surface | 87.3 | 3.69 | 2.05 | 0.79 | 3.33 | 47.7 | 3.48 | 41.1 | 99.1 |
| BLUE-SUB-1 | blue | submarine | 78.0 | 3.77 | 0.77 | 0.51 | 3.07 | 61.4 | 2.97 | 89.8 | 71.2 |
| BLUE-SUB-2 | blue | submarine | 92.0 | 2.03 | 0.23 | 0.49 | 1.87 | 55.7 | 3.39 | 47.4 | 89.3 |
| BLUE-SUB-3 | blue | submarine | 91.3 | 0.92 | 0.31 | 0.12 | 0.79 | 60.2 | 2.57 | 94.1 | 87.2 |
| BLUE-SUB-N | blue | submarine | 60.7 | 6.55 | 1.75 | 0.69 | 4.07 | 60.6 | 2.19 | — | 72.9 |
| RED-AKE | red | surface | 62.7 | 0.0 | 2.95 | 0.0 | 0.0 | — | 6.78 | 98.1 | — |
| RED-AOR-G | red | surface | 60.7 | 0.0 | 2.11 | 0.0 | 0.0 | — | 4.07 | 99.5 | — |
| RED-AWACS-K | red | air | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.58 | — | — |
| RED-GANF | red | surface | 97.3 | 0.07 | 1.21 | 0.0 | 0.09 | 84.6 | 0.0 | 81.2 | — |
| RED-GBPA | red | surface | 72.7 | 1.32 | 2.25 | 0.21 | 1.28 | 54.2 | 0.0 | — | 95.6 |
| RED-GE-1 | red | surface | 66.0 | 15.67 | 5.59 | 0.94 | 10.35 | 64.6 | 2.71 | 87.8 | 78.6 |
| RED-GE-2 | red | surface | 60.0 | 12.22 | 6.08 | 0.91 | 7.61 | 63.2 | 2.65 | 88.8 | 72.5 |
| RED-GE-3 | red | surface | 70.0 | 2.17 | 3.45 | 0.31 | 1.57 | 64.7 | 2.16 | 86.4 | 83.7 |
| RED-GLOG | red | surface | 74.0 | 0.0 | 2.1 | 0.0 | 0.0 | — | 6.83 | 99.4 | — |
| RED-KMF-1 | red | air | 72.7 | 1.21 | 0.01 | 0.18 | 1.21 | 40.9 | 3.99 | — | — |
| RED-KMF-2 | red | air | 72.7 | 0.74 | 0.0 | 0.14 | 1.05 | 31.6 | 4.06 | — | — |
| RED-KS-1 | red | submarine | 15.3 | 7.23 | 2.67 | 0.57 | 2.83 | 66.3 | 2.73 | 78.9 | 56.1 |
| RED-KSN | red | submarine | 36.7 | 9.08 | 2.74 | 0.54 | 5.93 | 65.4 | 2.15 | — | 76.7 |
| RED-MPRA-K1 | red | air | 54.0 | 4.11 | 0.85 | 0.62 | 1.75 | 60.8 | 1.54 | — | 96.9 |
| RED-MPRA-K2 | red | air | 54.7 | 2.73 | 0.78 | 0.41 | 1.3 | 51.3 | 1.53 | — | 98.0 |
| RED-OPSESP-1 | red | surface | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.05 | 3.65 | 0.0 | 0.05 | 85.7 | 0.0 | — | 98.4 |

### Somente vitória decisiva

- Partidas: **75**
- Taxa de vitória: blue=66.7%, red=33.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.01 turnos
- Dano médio causado por equipe (pontos de HP): blue=45.49, red=69.15
- Unidades perdidas em média: blue=6.4, red=6.48

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.96 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.32 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.7 | 0.48 | 0.6 | 0.12 | 0.57 | 48.8 | 3.89 | 84.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.04 | 66.7 | 6.81 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.04 | 0.0 | 6.84 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 2.6 | 0.0 | 0.41 | 1.41 | 58.5 | 3.91 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.04 | 0.0 | 0.29 | 1.03 | 54.5 | 4.01 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.13 | 0.0 | 0.03 | 0.17 | 61.5 | 0.65 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.09 | 0.0 | 0.03 | 0.07 | 80.0 | 1.29 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 60.0 | 0.0 | 3.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 57.3 | 0.0 | 3.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.3 | 0.0 | 4.2 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 62.7 | 0.0 | 3.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 77.3 | 0.0 | 1.2 | 0.0 | 0.0 | — | 4.21 | 99.1 | — |
| BLUE-LOG-T | blue | surface | 60.0 | 0.0 | 2.53 | 0.0 | 0.0 | — | 4.21 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.47 | 0.16 | 0.12 | 0.41 | 61.3 | 1.79 | — | 99.1 |
| BLUE-MPRA-2 | blue | air | 97.3 | 0.33 | 0.13 | 0.08 | 0.27 | 65.0 | 1.8 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 86.7 | 0.45 | 0.48 | 0.03 | 0.31 | 69.6 | 4.56 | 89.1 | 78.7 |
| BLUE-PAT-C2 | blue | surface | 65.3 | 0.92 | 1.44 | 0.07 | 0.69 | 80.8 | 4.23 | 84.0 | 54.7 |
| BLUE-PAT-O1 | blue | surface | 25.3 | 3.0 | 4.75 | 0.33 | 3.07 | 38.3 | 2.23 | 87.1 | 78.0 |
| BLUE-PAT-O2 | blue | surface | 81.3 | 4.49 | 1.09 | 0.72 | 3.71 | 47.8 | 5.55 | 56.3 | 71.3 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 36.0 | 0.0 | 16.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 84.0 | 0.0 | 7.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 92.0 | 0.0 | 3.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 73.3 | 4.79 | 1.84 | 0.75 | 3.8 | 51.6 | 4.05 | 92.3 | 90.2 |
| BLUE-SAG-S1 | blue | surface | 66.7 | 4.17 | 5.13 | 0.45 | 3.76 | 44.3 | 4.31 | 57.4 | 93.2 |
| BLUE-SAG-S2 | blue | surface | 80.0 | 4.84 | 3.15 | 0.88 | 4.55 | 45.5 | 5.6 | 55.4 | 98.4 |
| BLUE-SUB-1 | blue | submarine | 69.3 | 4.97 | 1.01 | 0.65 | 3.79 | 63.0 | 4.91 | 91.7 | 58.7 |
| BLUE-SUB-2 | blue | submarine | 90.7 | 2.35 | 0.29 | 0.49 | 1.89 | 57.7 | 5.47 | 74.0 | 82.3 |
| BLUE-SUB-3 | blue | submarine | 88.0 | 1.56 | 0.45 | 0.23 | 1.35 | 59.4 | 4.67 | 91.7 | 77.7 |
| BLUE-SUB-N | blue | submarine | 53.3 | 7.75 | 2.07 | 0.79 | 4.89 | 60.8 | 3.65 | — | 66.9 |
| RED-AKE | red | surface | 49.3 | 0.0 | 3.99 | 0.0 | 0.0 | — | 6.04 | 98.2 | — |
| RED-AOR-G | red | surface | 46.7 | 0.0 | 2.8 | 0.0 | 0.0 | — | 3.65 | 99.3 | — |
| RED-AWACS-K | red | air | 46.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.92 | — | — |
| RED-GANF | red | surface | 94.7 | 0.15 | 2.24 | 0.0 | 0.17 | 84.6 | 0.0 | 77.9 | — |
| RED-GBPA | red | surface | 46.7 | 2.17 | 4.28 | 0.32 | 2.0 | 54.7 | 0.0 | — | 92.3 |
| RED-GE-1 | red | surface | 80.0 | 15.69 | 4.41 | 0.96 | 9.88 | 63.8 | 2.48 | 86.1 | 78.4 |
| RED-GE-2 | red | surface | 65.3 | 15.43 | 6.48 | 1.15 | 8.64 | 64.2 | 2.52 | 87.4 | 65.7 |
| RED-GE-3 | red | surface | 49.3 | 3.59 | 5.79 | 0.51 | 2.51 | 64.9 | 3.53 | 79.3 | 72.2 |
| RED-GLOG | red | surface | 54.7 | 0.0 | 3.48 | 0.0 | 0.0 | — | 6.15 | 99.1 | — |
| RED-KMF-1 | red | air | 46.7 | 1.91 | 0.01 | 0.28 | 1.99 | 37.6 | 5.63 | — | — |
| RED-KMF-2 | red | air | 46.7 | 1.33 | 0.0 | 0.25 | 1.76 | 32.6 | 5.73 | — | — |
| RED-KS-1 | red | submarine | 29.3 | 8.43 | 2.33 | 0.67 | 3.44 | 65.9 | 3.4 | 73.1 | 48.1 |
| RED-KSN | red | submarine | 26.7 | 8.89 | 2.99 | 0.57 | 5.84 | 66.4 | 2.52 | — | 76.4 |
| RED-MPRA-K1 | red | air | 16.0 | 7.13 | 1.45 | 1.05 | 2.97 | 61.4 | 2.83 | — | 93.8 |
| RED-MPRA-K2 | red | air | 16.0 | 4.41 | 1.43 | 0.64 | 2.19 | 51.2 | 2.33 | — | 96.0 |
| RED-OPSESP-1 | red | surface | 46.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 3.81 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.6 |

## Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=24.0%, blue=76.0%
- Motivo de conclusão: victory=46.0%, timeout=54.0%
- Duração média: 13.21 turnos
- Dano médio causado por equipe (pontos de HP): blue=39.05, red=66.73
- Unidades perdidas em média: blue=5.93, red=5.68

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.01 | 0.01 | 0.09 | 42.9 | 1.26 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.85 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.7 | 0.15 | 1.09 | 0.05 | 0.22 | 60.6 | 3.64 | 77.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.14 | 47.6 | 8.71 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.15 | 0.0 | 0.04 | 0.11 | 68.8 | 8.66 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.09 | 0.0 | 0.69 | 2.09 | 62.1 | 6.45 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.55 | 0.0 | 0.42 | 1.45 | 60.8 | 6.43 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.27 | 0.05 | 0.07 | 0.23 | 68.6 | 0.42 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.83 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 60.0 | 0.0 | 3.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 66.0 | 0.0 | 3.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 71.3 | 0.0 | 3.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 70.0 | 0.0 | 2.9 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 76.7 | 0.0 | 1.35 | 0.0 | 0.0 | — | 4.19 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 68.0 | 0.0 | 1.75 | 0.0 | 0.0 | — | 3.36 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.33 | 0.33 | 0.08 | 0.37 | 42.9 | 3.81 | — | 99.8 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.21 | 0.22 | 0.04 | 0.25 | 40.5 | 3.93 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 80.0 | 0.06 | 0.83 | 0.01 | 0.05 | 57.1 | 3.73 | 84.8 | 96.7 |
| BLUE-PAT-C2 | blue | surface | 61.3 | 0.2 | 1.73 | 0.04 | 0.15 | 81.8 | 2.96 | 88.7 | 89.3 |
| BLUE-PAT-O1 | blue | surface | 60.7 | 3.48 | 2.77 | 0.37 | 3.04 | 45.8 | 2.29 | 89.5 | 93.0 |
| BLUE-PAT-O2 | blue | surface | 88.7 | 3.49 | 0.73 | 0.68 | 2.84 | 45.5 | 4.47 | 41.1 | 84.3 |
| BLUE-PORTO-ACU | blue | land | 82.0 | 0.0 | 3.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 27.3 | 0.0 | 16.38 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 59.3 | 0.0 | 9.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 2.37 | 1.31 | 0.29 | 2.64 | 40.7 | 2.83 | 90.6 | 96.5 |
| BLUE-SAG-S1 | blue | surface | 74.0 | 3.16 | 4.17 | 0.43 | 3.0 | 44.0 | 3.15 | 46.9 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 91.3 | 3.71 | 1.6 | 0.76 | 3.25 | 48.4 | 3.85 | 40.9 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 81.3 | 3.14 | 0.69 | 0.48 | 2.57 | 57.8 | 3.73 | 80.8 | 74.6 |
| BLUE-SUB-2 | blue | submarine | 84.7 | 2.1 | 0.6 | 0.47 | 1.95 | 57.0 | 4.79 | 44.5 | 91.3 |
| BLUE-SUB-3 | blue | submarine | 90.0 | 0.92 | 0.32 | 0.13 | 0.69 | 60.2 | 4.12 | 80.3 | 90.8 |
| BLUE-SUB-N | blue | submarine | 61.3 | 6.55 | 1.95 | 0.61 | 3.83 | 62.9 | 2.03 | — | 77.5 |
| RED-AKE | red | surface | 50.0 | 0.0 | 3.9 | 0.0 | 0.0 | — | 6.81 | 96.9 | — |
| RED-AOR-G | red | surface | 50.0 | 0.0 | 2.51 | 0.0 | 0.0 | — | 3.57 | 98.6 | — |
| RED-AWACS-K | red | air | 94.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.6 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.71 | 0.0 | 0.0 | — | 0.0 | 56.7 | — |
| RED-GBPA | red | surface | 94.7 | 0.99 | 0.68 | 0.17 | 0.89 | 53.0 | 0.0 | — | 97.5 |
| RED-GE-1 | red | surface | 70.7 | 18.67 | 5.05 | 1.21 | 11.48 | 65.9 | 1.68 | 81.3 | 75.8 |
| RED-GE-2 | red | surface | 49.3 | 13.19 | 6.61 | 1.03 | 7.77 | 66.8 | 2.21 | 77.3 | 70.7 |
| RED-GE-3 | red | surface | 60.7 | 1.88 | 4.46 | 0.31 | 1.27 | 70.5 | 2.49 | 73.9 | 84.1 |
| RED-GLOG | red | surface | 52.7 | 0.0 | 3.63 | 0.0 | 0.0 | — | 6.43 | 99.0 | — |
| RED-KMF-1 | red | air | 94.7 | 0.89 | 0.15 | 0.17 | 0.99 | 32.9 | 4.97 | — | — |
| RED-KMF-2 | red | air | 94.7 | 0.79 | 0.03 | 0.17 | 0.83 | 37.9 | 4.99 | — | — |
| RED-KS-1 | red | submarine | 30.0 | 8.35 | 2.23 | 0.69 | 3.45 | 69.2 | 2.1 | 58.3 | 49.1 |
| RED-KSN | red | submarine | 42.0 | 13.56 | 2.53 | 1.02 | 7.99 | 66.4 | 1.91 | — | 70.6 |
| RED-MPRA-K1 | red | air | 62.7 | 4.45 | 1.11 | 0.58 | 2.01 | 54.5 | 2.55 | — | 100.0 |
| RED-MPRA-K2 | red | air | 63.3 | 3.96 | 1.21 | 0.57 | 1.73 | 59.2 | 2.71 | — | 99.8 |
| RED-OPSESP-1 | red | surface | 94.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 4.25 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.8 |

### Somente vitória decisiva

- Partidas: **69**
- Taxa de vitória: red=52.2%, blue=47.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.58 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.72, red=72.2
- Unidades perdidas em média: blue=6.65, red=6.86

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.04 | 33.3 | 1.78 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.2 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 91.3 | 0.23 | 1.3 | 0.09 | 0.28 | 73.7 | 4.35 | 74.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.09 | 33.3 | 8.54 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.01 | 0.07 | 60.0 | 8.58 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.9 | 0.0 | 0.62 | 2.28 | 59.2 | 5.59 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.52 | 0.0 | 0.43 | 1.68 | 52.6 | 5.42 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.43 | 0.0 | 0.12 | 0.38 | 65.4 | 0.59 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.16 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 39.1 | 0.0 | 5.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 44.9 | 0.0 | 4.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 50.7 | 0.0 | 4.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 59.4 | 0.0 | 3.81 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 75.4 | 0.0 | 1.29 | 0.0 | 0.0 | — | 5.12 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 65.2 | 0.0 | 2.01 | 0.0 | 0.0 | — | 4.58 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 88.4 | 0.65 | 0.45 | 0.16 | 0.65 | 46.7 | 1.9 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 87.0 | 0.43 | 0.39 | 0.09 | 0.46 | 40.6 | 2.1 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 78.3 | 0.12 | 0.88 | 0.01 | 0.09 | 50.0 | 4.67 | 81.4 | 94.2 |
| BLUE-PAT-C2 | blue | surface | 52.2 | 0.14 | 1.91 | 0.04 | 0.09 | 100.0 | 3.97 | 86.7 | 92.8 |
| BLUE-PAT-O1 | blue | surface | 43.5 | 3.93 | 3.93 | 0.52 | 3.16 | 50.5 | 2.59 | 85.9 | 88.4 |
| BLUE-PAT-O2 | blue | surface | 97.1 | 4.12 | 0.17 | 0.77 | 3.68 | 42.1 | 5.1 | 58.4 | 90.6 |
| BLUE-PORTO-ACU | blue | land | 91.3 | 0.0 | 2.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 24.6 | 0.0 | 17.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 66.7 | 0.0 | 9.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 78.3 | 2.8 | 1.55 | 0.38 | 3.54 | 42.6 | 3.91 | 89.9 | 94.9 |
| BLUE-SAG-S1 | blue | surface | 85.5 | 5.3 | 3.28 | 0.71 | 4.91 | 44.5 | 4.17 | 55.7 | 97.3 |
| BLUE-SAG-S2 | blue | surface | 94.2 | 5.07 | 1.29 | 1.01 | 4.41 | 49.7 | 4.65 | 58.7 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 79.7 | 4.16 | 0.62 | 0.58 | 3.41 | 58.7 | 4.13 | 81.6 | 66.1 |
| BLUE-SUB-2 | blue | submarine | 85.5 | 2.14 | 0.51 | 0.43 | 2.07 | 53.8 | 5.14 | 68.4 | 88.4 |
| BLUE-SUB-3 | blue | submarine | 89.9 | 1.12 | 0.3 | 0.17 | 0.84 | 63.8 | 4.43 | 84.9 | 88.0 |
| BLUE-SUB-N | blue | submarine | 66.7 | 7.52 | 1.77 | 0.68 | 4.22 | 62.5 | 2.8 | — | 73.8 |
| RED-AKE | red | surface | 50.7 | 0.0 | 3.84 | 0.0 | 0.0 | — | 7.32 | 96.8 | — |
| RED-AOR-G | red | surface | 21.7 | 0.0 | 3.87 | 0.0 | 0.0 | — | 4.0 | 97.5 | — |
| RED-AWACS-K | red | air | 88.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.71 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.87 | 0.0 | 0.0 | — | 0.0 | 62.7 | — |
| RED-GBPA | red | surface | 88.4 | 1.25 | 1.29 | 0.22 | 1.23 | 50.6 | 0.0 | — | 97.7 |
| RED-GE-1 | red | surface | 82.6 | 17.72 | 3.83 | 1.01 | 11.13 | 65.1 | 1.35 | 78.2 | 77.1 |
| RED-GE-2 | red | surface | 49.3 | 15.64 | 7.16 | 1.3 | 8.65 | 67.3 | 2.7 | 79.7 | 65.1 |
| RED-GE-3 | red | surface | 24.6 | 3.52 | 8.71 | 0.55 | 2.25 | 74.2 | 4.68 | 69.1 | 69.6 |
| RED-GLOG | red | surface | 46.4 | 0.0 | 3.88 | 0.0 | 0.0 | — | 7.38 | 99.0 | — |
| RED-KMF-1 | red | air | 88.4 | 1.28 | 0.13 | 0.26 | 1.43 | 34.3 | 8.12 | — | — |
| RED-KMF-2 | red | air | 88.4 | 1.04 | 0.01 | 0.23 | 1.19 | 35.4 | 8.16 | — | — |
| RED-KS-1 | red | submarine | 26.1 | 9.74 | 2.29 | 0.84 | 3.61 | 73.5 | 2.38 | 64.0 | 46.1 |
| RED-KSN | red | submarine | 39.1 | 13.62 | 2.59 | 1.01 | 7.65 | 68.8 | 2.14 | — | 69.4 |
| RED-MPRA-K1 | red | air | 36.2 | 3.84 | 1.84 | 0.51 | 2.09 | 47.2 | 4.2 | — | 100.0 |
| RED-MPRA-K2 | red | air | 37.7 | 4.55 | 2.0 | 0.71 | 2.13 | 60.5 | 4.54 | — | 99.5 |
| RED-OPSESP-1 | red | surface | 88.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.41 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=81.3%, red=18.7%
- Motivo de conclusão: timeout=63.3%, victory=36.7%
- Duração média: 14.16 turnos
- Dano médio causado por equipe (pontos de HP): blue=33.44, red=57.77
- Unidades perdidas em média: blue=4.91, red=5.02

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.08 | 50.0 | 0.88 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.7 | 0.0 | 0.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.3 | 0.05 | 0.87 | 0.03 | 0.15 | 31.8 | 2.25 | 84.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.02 | 0.11 | 35.3 | 5.54 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.1 | 0.0 | 0.04 | 0.09 | 50.0 | 5.51 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.58 | 0.0 | 0.59 | 1.79 | 60.2 | 3.93 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.4 | 0.0 | 0.44 | 1.25 | 64.2 | 4.0 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.13 | 0.05 | 0.02 | 0.13 | 47.4 | 0.29 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.57 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 68.0 | 0.0 | 2.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 72.7 | 0.0 | 2.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 76.7 | 0.0 | 2.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 66.0 | 0.0 | 3.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 87.3 | 0.0 | 0.69 | 0.0 | 0.0 | — | 2.76 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 70.7 | 0.0 | 1.82 | 0.0 | 0.0 | — | 2.0 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 96.7 | 0.22 | 0.13 | 0.05 | 0.23 | 45.7 | 3.0 | — | 99.8 |
| BLUE-MPRA-2 | blue | air | 96.7 | 0.16 | 0.12 | 0.04 | 0.2 | 30.0 | 3.02 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 88.0 | 0.03 | 0.55 | 0.0 | 0.03 | 80.0 | 2.36 | 91.4 | 98.0 |
| BLUE-PAT-C2 | blue | surface | 78.7 | 0.09 | 1.01 | 0.01 | 0.08 | 66.7 | 2.12 | 92.6 | 95.3 |
| BLUE-PAT-O1 | blue | surface | 70.0 | 3.25 | 2.0 | 0.31 | 2.96 | 44.4 | 1.82 | 87.9 | 96.0 |
| BLUE-PAT-O2 | blue | surface | 87.3 | 2.81 | 0.86 | 0.54 | 1.99 | 55.2 | 3.31 | 29.5 | 82.0 |
| BLUE-PORTO-ACU | blue | land | 86.0 | 0.0 | 3.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.7 | 0.0 | 15.99 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 62.7 | 0.0 | 9.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 86.0 | 1.91 | 1.01 | 0.3 | 1.86 | 44.4 | 1.9 | 92.9 | 98.8 |
| BLUE-SAG-S1 | blue | surface | 78.0 | 2.37 | 3.24 | 0.35 | 2.07 | 46.0 | 1.9 | 33.1 | 99.2 |
| BLUE-SAG-S2 | blue | surface | 90.0 | 2.54 | 1.47 | 0.57 | 2.5 | 45.3 | 2.81 | 30.9 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 80.0 | 2.83 | 0.73 | 0.37 | 2.25 | 59.3 | 2.8 | 83.2 | 80.5 |
| BLUE-SUB-2 | blue | submarine | 90.7 | 2.12 | 0.33 | 0.53 | 2.01 | 52.2 | 3.37 | 28.7 | 95.8 |
| BLUE-SUB-3 | blue | submarine | 94.0 | 0.62 | 0.18 | 0.12 | 0.46 | 58.0 | 2.83 | 87.0 | 94.5 |
| BLUE-SUB-N | blue | submarine | 65.3 | 6.1 | 1.77 | 0.68 | 3.89 | 58.7 | 1.59 | — | 78.9 |
| RED-AKE | red | surface | 55.3 | 0.0 | 3.37 | 0.0 | 0.0 | — | 6.35 | 97.5 | — |
| RED-AOR-G | red | surface | 65.3 | 0.0 | 1.59 | 0.0 | 0.0 | — | 3.61 | 99.2 | — |
| RED-AWACS-K | red | air | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.75 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.45 | 0.0 | 0.0 | — | 0.0 | 57.2 | — |
| RED-GBPA | red | surface | 93.3 | 0.43 | 0.59 | 0.07 | 0.47 | 54.9 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 74.7 | 17.38 | 4.43 | 1.17 | 10.98 | 67.5 | 2.32 | 82.7 | 76.7 |
| RED-GE-2 | red | surface | 64.0 | 10.39 | 4.87 | 0.7 | 7.02 | 62.8 | 2.15 | 77.7 | 75.1 |
| RED-GE-3 | red | surface | 70.7 | 1.86 | 3.31 | 0.24 | 1.1 | 69.7 | 1.81 | 81.3 | 86.1 |
| RED-GLOG | red | surface | 66.7 | 0.0 | 2.71 | 0.0 | 0.0 | — | 6.29 | 99.5 | — |
| RED-KMF-1 | red | air | 93.3 | 0.28 | 0.03 | 0.07 | 0.46 | 30.4 | 3.93 | — | — |
| RED-KMF-2 | red | air | 92.7 | 0.43 | 0.09 | 0.09 | 0.39 | 36.2 | 3.85 | — | — |
| RED-KS-1 | red | submarine | 29.3 | 7.41 | 2.45 | 0.71 | 3.45 | 63.8 | 2.01 | 58.9 | 51.3 |
| RED-KSN | red | submarine | 44.0 | 12.81 | 2.59 | 1.0 | 8.29 | 64.0 | 2.14 | — | 70.9 |
| RED-MPRA-K1 | red | air | 65.3 | 3.56 | 1.16 | 0.41 | 1.59 | 56.3 | 1.45 | — | 99.6 |
| RED-MPRA-K2 | red | air | 64.0 | 3.19 | 1.11 | 0.44 | 1.18 | 64.4 | 1.13 | — | 99.8 |
| RED-OPSESP-1 | red | surface | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.02 | 4.72 | 0.0 | 0.02 | 66.7 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **55**
- Taxa de vitória: blue=49.1%, red=50.9%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.53 turnos
- Dano médio causado por equipe (pontos de HP): blue=44.62, red=69.58
- Unidades perdidas em média: blue=6.2, red=6.85

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.0 | 0.05 | 100.0 | 1.64 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.11 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.24 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 96.4 | 0.0 | 0.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.5 | 0.07 | 0.89 | 0.05 | 0.29 | 25.0 | 3.24 | 85.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.09 | 20.0 | 6.78 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.09 | 0.0 | 0.05 | 0.07 | 75.0 | 6.87 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.78 | 0.0 | 0.65 | 1.91 | 59.0 | 4.24 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.89 | 0.0 | 0.44 | 1.31 | 58.3 | 4.35 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.05 | 0.0 | 0.0 | 0.13 | 42.9 | 0.55 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.07 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 47.3 | 0.0 | 4.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 50.9 | 0.0 | 4.4 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 54.5 | 0.0 | 4.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 45.5 | 0.0 | 4.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 90.9 | 0.0 | 0.53 | 0.0 | 0.0 | — | 4.11 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 58.2 | 0.0 | 2.62 | 0.0 | 0.0 | — | 3.58 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 90.9 | 0.56 | 0.36 | 0.13 | 0.6 | 45.5 | 1.71 | — | 99.4 |
| BLUE-MPRA-2 | blue | air | 90.9 | 0.35 | 0.33 | 0.09 | 0.53 | 27.6 | 1.89 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.6 | 0.07 | 0.6 | 0.0 | 0.07 | 75.0 | 3.93 | 87.0 | 96.4 |
| BLUE-PAT-C2 | blue | surface | 69.1 | 0.13 | 1.45 | 0.02 | 0.09 | 60.0 | 3.93 | 87.9 | 94.5 |
| BLUE-PAT-O1 | blue | surface | 56.4 | 5.98 | 2.93 | 0.56 | 4.87 | 47.8 | 2.44 | 74.9 | 89.1 |
| BLUE-PAT-O2 | blue | surface | 92.7 | 3.6 | 0.58 | 0.6 | 2.93 | 51.6 | 4.64 | 43.1 | 89.1 |
| BLUE-PORTO-ACU | blue | land | 87.3 | 0.0 | 2.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 14.5 | 0.0 | 18.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 67.3 | 0.0 | 9.56 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 83.6 | 3.2 | 1.0 | 0.56 | 3.24 | 45.5 | 3.15 | 94.7 | 97.3 |
| BLUE-SAG-S1 | blue | surface | 83.6 | 4.85 | 2.82 | 0.76 | 4.13 | 48.0 | 3.31 | 50.2 | 98.2 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.96 | 1.33 | 1.0 | 3.87 | 48.8 | 4.51 | 45.6 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 76.4 | 4.47 | 0.76 | 0.64 | 3.29 | 63.0 | 3.87 | 85.5 | 72.0 |
| BLUE-SUB-2 | blue | submarine | 87.3 | 1.53 | 0.4 | 0.29 | 1.67 | 40.2 | 4.18 | 60.2 | 93.9 |
| BLUE-SUB-3 | blue | submarine | 89.1 | 1.11 | 0.33 | 0.16 | 0.6 | 69.7 | 3.84 | 89.8 | 91.8 |
| BLUE-SUB-N | blue | submarine | 76.4 | 6.78 | 1.38 | 0.82 | 3.87 | 64.3 | 2.58 | — | 75.4 |
| RED-AKE | red | surface | 45.5 | 0.0 | 3.71 | 0.0 | 0.0 | — | 6.73 | 97.3 | — |
| RED-AOR-G | red | surface | 30.9 | 0.0 | 3.2 | 0.0 | 0.0 | — | 3.98 | 98.3 | — |
| RED-AWACS-K | red | air | 81.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.51 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.75 | 0.0 | 0.0 | — | 0.0 | 60.5 | — |
| RED-GBPA | red | surface | 81.8 | 0.76 | 1.49 | 0.11 | 0.85 | 51.1 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 81.8 | 18.25 | 3.87 | 1.2 | 11.85 | 64.4 | 1.84 | 77.5 | 75.4 |
| RED-GE-2 | red | surface | 67.3 | 12.2 | 4.95 | 0.89 | 8.22 | 63.9 | 1.53 | 80.8 | 70.0 |
| RED-GE-3 | red | surface | 25.5 | 4.85 | 8.33 | 0.62 | 2.78 | 72.5 | 4.13 | 76.9 | 63.6 |
| RED-GLOG | red | surface | 60.0 | 0.0 | 3.18 | 0.0 | 0.0 | — | 7.04 | 99.5 | — |
| RED-KMF-1 | red | air | 81.8 | 0.42 | 0.09 | 0.11 | 0.98 | 27.8 | 8.82 | — | — |
| RED-KMF-2 | red | air | 80.0 | 0.96 | 0.16 | 0.24 | 0.87 | 37.5 | 8.62 | — | — |
| RED-KS-1 | red | submarine | 32.7 | 9.84 | 2.27 | 1.02 | 4.13 | 69.2 | 2.62 | 60.4 | 40.9 |
| RED-KSN | red | submarine | 32.7 | 14.98 | 2.87 | 1.09 | 8.2 | 65.9 | 2.45 | — | 66.9 |
| RED-MPRA-K1 | red | air | 25.5 | 4.16 | 2.38 | 0.49 | 2.09 | 54.8 | 3.49 | — | 98.8 |
| RED-MPRA-K2 | red | air | 20.0 | 3.15 | 2.47 | 0.44 | 1.29 | 66.2 | 2.53 | — | 99.4 |
| RED-OPSESP-1 | red | surface | 81.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.89 | 0.0 | 0.02 | 0.0 | 0.0 | — | 99.4 |
