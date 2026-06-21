# Desempenho por Unidade — Configurações Cruzadas de Doutrina (Blue x Red, Postura x Formação)

_Gerado em 2026-06-21_

## Metodologia

Desenho fatorial completo: cada equipe adota, de forma independente, uma das 4 combinações de **postura** (ofensiva/defensiva) x **formação** (concentrada/dividida) — totalizando 4×4 = 16 confrontos possíveis. Diferente do experimento espelhado anterior (`ml/report_doctrine_units.py`), aqui as equipes podem adotar combinações *diferentes* entre si, permitindo avaliar qual doutrina de Blue se sai melhor contra qual doutrina de Red. Os demais eixos (engajamento, política de combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) são sorteados aleatoriamente por partida. 150 partidas por confronto (2400 partidas no total). Cada confronto é reportado em dois recortes: **geral** (todas as partidas) e **vitória decisiva** (somente partidas concluídas por objetivo de cenário, excluindo o desempate de timeout por soma de HP).

## Matriz-resumo — Taxa de vitória geral (Blue% / Red%)

| Blue \ Red | Ofensiva / Concentrada | Ofensiva / Dividida | Defensiva / Concentrada | Defensiva / Dividida |
|---|---|---|---|---|
| Ofensiva / Concentrada | 87.3% / 12.7% | 83.3% / 16.7% | 83.3% / 16.7% | 82.0% / 18.0% |
| Ofensiva / Dividida | 84.7% / 15.3% | 85.3% / 14.7% | 82.7% / 17.3% | 76.0% / 24.0% |
| Defensiva / Concentrada | 81.3% / 18.7% | 75.3% / 24.7% | 73.3% / 26.7% | 78.0% / 22.0% |
| Defensiva / Dividida | 78.0% / 22.0% | 81.3% / 18.7% | 80.0% / 20.0% | 80.0% / 20.0% |

## Matriz-resumo — Taxa de vitória somente decisiva (Blue% / Red%)

| Blue \ Red | Ofensiva / Concentrada | Ofensiva / Dividida | Defensiva / Concentrada | Defensiva / Dividida |
|---|---|---|---|---|
| Ofensiva / Concentrada | 70.8% / 29.2% (n=65) | 63.8% / 36.2% (n=69) | 65.3% / 34.7% (n=72) | 63.0% / 37.0% (n=73) |
| Ofensiva / Dividida | 70.9% / 29.1% (n=79) | 64.5% / 35.5% (n=62) | 64.4% / 35.6% (n=73) | 55.0% / 45.0% (n=80) |
| Defensiva / Concentrada | 51.7% / 48.3% (n=58) | 28.8% / 71.2% (n=52) | 42.9% / 57.1% (n=70) | 49.2% / 50.8% (n=65) |
| Defensiva / Dividida | 46.8% / 53.2% (n=62) | 53.3% / 46.7% (n=60) | 50.8% / 49.2% (n=61) | 54.5% / 45.5% (n=66) |

## Blue: Ofensiva / Concentrada × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=12.7%, blue=87.3%
- Motivo de conclusão: victory=43.3%, timeout=56.7%
- Duração média: 12.81 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.12, red=50.91
- Unidades perdidas em média: blue=4.14, red=5.48

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.63 | — | — |
| BLUE-AERO-CF | blue | land | 96.0 | 0.0 | 0.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.28 | 0.38 | 0.12 | 0.33 | 52.0 | 2.09 | 84.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.71 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 3.7 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.61 | 0.0 | 0.65 | 2.58 | 53.2 | 2.33 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.85 | 0.0 | 0.51 | 1.96 | 52.7 | 2.33 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.3 | 0.09 | 0.06 | 0.33 | 38.8 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 73.3 | 0.0 | 2.36 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 74.7 | 0.0 | 2.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 79.3 | 0.0 | 2.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 83.3 | 0.0 | 2.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 88.0 | 0.0 | 0.58 | 0.0 | 0.0 | — | 3.33 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 82.0 | 0.0 | 0.95 | 0.0 | 0.0 | — | 2.09 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 87.3 | 0.57 | 0.43 | 0.13 | 0.43 | 53.8 | 1.62 | — | 98.6 |
| BLUE-MPRA-2 | blue | air | 95.3 | 0.37 | 0.19 | 0.09 | 0.35 | 52.8 | 1.66 | — | 99.8 |
| BLUE-PAT-C1 | blue | surface | 98.0 | 0.13 | 0.15 | 0.01 | 0.11 | 68.8 | 2.29 | 91.1 | 95.7 |
| BLUE-PAT-C2 | blue | surface | 84.0 | 0.39 | 0.81 | 0.02 | 0.4 | 63.3 | 2.15 | 91.1 | 80.0 |
| BLUE-PAT-O1 | blue | surface | 56.7 | 3.11 | 2.62 | 0.29 | 2.77 | 46.6 | 1.95 | 90.5 | 91.5 |
| BLUE-PAT-O2 | blue | surface | 94.0 | 2.48 | 0.39 | 0.51 | 2.2 | 49.4 | 3.09 | 35.2 | 84.2 |
| BLUE-PORTO-ACU | blue | land | 90.7 | 0.0 | 1.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 47.3 | 0.0 | 13.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 84.0 | 0.0 | 6.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 80.7 | 0.0 | 5.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.3 | 2.6 | 0.77 | 0.37 | 2.39 | 51.4 | 2.23 | 91.8 | 96.1 |
| BLUE-SAG-S1 | blue | surface | 83.3 | 2.3 | 2.37 | 0.41 | 2.39 | 43.7 | 2.35 | 43.7 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.13 | 1.15 | 0.67 | 2.99 | 47.0 | 2.85 | 35.2 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 80.0 | 4.1 | 0.81 | 0.69 | 3.75 | 56.8 | 2.83 | 89.8 | 72.8 |
| BLUE-SUB-2 | blue | submarine | 95.3 | 1.94 | 0.12 | 0.47 | 1.91 | 53.0 | 3.23 | 40.3 | 94.4 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 0.57 | 0.09 | 0.07 | 0.53 | 51.2 | 2.39 | 94.6 | 94.2 |
| BLUE-SUB-N | blue | submarine | 60.7 | 5.35 | 1.88 | 0.41 | 4.72 | 48.2 | 2.13 | — | 79.9 |
| RED-AKE | red | surface | 64.7 | 0.0 | 2.86 | 0.0 | 0.0 | — | 7.9 | 98.2 | — |
| RED-AOR-G | red | surface | 64.0 | 0.0 | 1.75 | 0.0 | 0.0 | — | 5.86 | 99.6 | — |
| RED-AWACS-K | red | air | 74.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.51 | — | — |
| RED-GANF | red | surface | 96.0 | 0.03 | 0.8 | 0.0 | 0.04 | 66.7 | 0.0 | 80.0 | — |
| RED-GBPA | red | surface | 74.0 | 1.17 | 2.03 | 0.2 | 1.21 | 51.9 | 0.0 | — | 98.9 |
| RED-GE-1 | red | surface | 60.7 | 15.61 | 6.26 | 0.97 | 9.92 | 64.8 | 3.48 | 87.2 | 79.8 |
| RED-GE-2 | red | surface | 51.3 | 11.23 | 6.51 | 0.77 | 7.15 | 63.4 | 3.56 | 82.0 | 75.6 |
| RED-GE-3 | red | surface | 76.0 | 1.63 | 3.02 | 0.25 | 1.38 | 60.4 | 2.34 | 89.7 | 88.9 |
| RED-GLOG | red | surface | 72.7 | 0.0 | 2.51 | 0.0 | 0.0 | — | 7.97 | 99.5 | — |
| RED-KMF-1 | red | air | 74.0 | 1.27 | 0.01 | 0.23 | 1.17 | 41.1 | 4.68 | — | — |
| RED-KMF-2 | red | air | 74.0 | 1.26 | 0.01 | 0.24 | 0.96 | 43.1 | 4.72 | — | — |
| RED-KS-1 | red | submarine | 15.3 | 5.65 | 2.75 | 0.45 | 3.31 | 52.9 | 2.71 | 76.5 | 67.7 |
| RED-KSN | red | submarine | 28.7 | 8.96 | 2.98 | 0.44 | 5.97 | 62.5 | 2.47 | — | 78.7 |
| RED-MPRA-K1 | red | air | 56.7 | 2.41 | 0.88 | 0.36 | 1.33 | 48.0 | 1.59 | — | 97.9 |
| RED-MPRA-K2 | red | air | 56.7 | 1.52 | 0.93 | 0.21 | 1.13 | 40.8 | 1.7 | — | 98.3 |
| RED-OPSESP-1 | red | surface | 74.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.17 | 3.82 | 0.01 | 0.15 | 60.9 | 0.0 | — | 94.9 |

### Somente vitória decisiva

- Partidas: **65**
- Taxa de vitória: red=29.2%, blue=70.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.03 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.14, red=66.34
- Unidades perdidas em média: blue=5.66, red=6.98

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.98 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.32 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.5 | 0.55 | 0.34 | 0.22 | 0.63 | 51.2 | 3.75 | 75.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.38 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 6.38 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.77 | 0.0 | 0.71 | 2.86 | 51.1 | 3.52 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.65 | 0.0 | 0.52 | 2.17 | 49.6 | 3.49 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.32 | 0.0 | 0.09 | 0.43 | 25.0 | 0.66 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.02 | 0.0 | 0.02 | 0.02 | 100.0 | 1.32 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 58.5 | 0.0 | 3.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 56.9 | 0.0 | 3.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 55.4 | 0.0 | 3.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 73.8 | 0.0 | 3.2 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 76.9 | 0.0 | 1.11 | 0.0 | 0.0 | — | 4.35 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 66.2 | 0.0 | 1.72 | 0.0 | 0.0 | — | 4.08 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 90.8 | 0.63 | 0.26 | 0.18 | 0.55 | 52.8 | 1.78 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 95.4 | 0.26 | 0.23 | 0.09 | 0.4 | 42.3 | 1.82 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 96.9 | 0.31 | 0.28 | 0.02 | 0.23 | 73.3 | 4.66 | 84.1 | 90.8 |
| BLUE-PAT-C2 | blue | surface | 66.2 | 0.42 | 1.6 | 0.05 | 0.37 | 62.5 | 4.31 | 84.9 | 83.1 |
| BLUE-PAT-O1 | blue | surface | 33.8 | 4.08 | 3.88 | 0.42 | 4.05 | 43.3 | 3.06 | 85.5 | 87.3 |
| BLUE-PAT-O2 | blue | surface | 95.4 | 4.02 | 0.29 | 0.71 | 3.4 | 46.2 | 4.91 | 56.6 | 90.4 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 40.0 | 0.0 | 16.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 72.3 | 0.0 | 10.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 92.3 | 0.0 | 4.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 76.9 | 3.8 | 1.42 | 0.58 | 3.26 | 56.6 | 3.94 | 89.0 | 93.3 |
| BLUE-SAG-S1 | blue | surface | 67.7 | 3.98 | 4.18 | 0.65 | 3.94 | 43.8 | 4.65 | 62.0 | 98.0 |
| BLUE-SAG-S2 | blue | surface | 89.2 | 4.18 | 1.95 | 0.8 | 4.12 | 46.3 | 5.0 | 55.8 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 78.5 | 5.15 | 0.72 | 0.85 | 4.71 | 59.2 | 5.38 | 86.5 | 64.2 |
| BLUE-SUB-2 | blue | submarine | 95.4 | 2.11 | 0.11 | 0.43 | 1.78 | 54.3 | 5.6 | 72.5 | 90.2 |
| BLUE-SUB-3 | blue | submarine | 96.9 | 1.12 | 0.11 | 0.15 | 0.97 | 50.8 | 4.78 | 92.8 | 89.0 |
| BLUE-SUB-N | blue | submarine | 60.0 | 6.77 | 2.03 | 0.51 | 5.82 | 48.7 | 3.72 | — | 75.3 |
| RED-AKE | red | surface | 44.6 | 0.0 | 4.43 | 0.0 | 0.0 | — | 7.29 | 97.7 | — |
| RED-AOR-G | red | surface | 38.5 | 0.0 | 3.0 | 0.0 | 0.0 | — | 4.46 | 99.4 | — |
| RED-AWACS-K | red | air | 40.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.32 | — | — |
| RED-GANF | red | surface | 90.8 | 0.06 | 1.83 | 0.0 | 0.09 | 66.7 | 0.0 | 72.0 | — |
| RED-GBPA | red | surface | 40.0 | 1.63 | 4.38 | 0.29 | 1.97 | 49.2 | 0.0 | — | 97.7 |
| RED-GE-1 | red | surface | 84.6 | 16.49 | 3.78 | 1.0 | 10.37 | 64.4 | 2.92 | 83.8 | 77.6 |
| RED-GE-2 | red | surface | 61.5 | 14.08 | 6.17 | 1.02 | 8.74 | 65.0 | 3.48 | 80.4 | 68.2 |
| RED-GE-3 | red | surface | 58.5 | 2.72 | 5.31 | 0.35 | 2.4 | 59.0 | 4.05 | 80.7 | 78.7 |
| RED-GLOG | red | surface | 49.2 | 0.0 | 4.63 | 0.0 | 0.0 | — | 7.14 | 99.2 | — |
| RED-KMF-1 | red | air | 40.0 | 2.37 | 0.03 | 0.4 | 2.23 | 37.9 | 6.66 | — | — |
| RED-KMF-2 | red | air | 40.0 | 2.32 | 0.02 | 0.4 | 1.85 | 40.0 | 6.71 | — | — |
| RED-KS-1 | red | submarine | 27.7 | 8.34 | 2.38 | 0.71 | 4.57 | 57.6 | 3.4 | 72.3 | 54.5 |
| RED-KSN | red | submarine | 18.5 | 11.05 | 3.51 | 0.46 | 6.14 | 69.2 | 2.77 | — | 77.3 |
| RED-MPRA-K1 | red | air | 9.2 | 4.29 | 1.77 | 0.6 | 2.54 | 43.0 | 2.42 | — | 95.1 |
| RED-MPRA-K2 | red | air | 7.7 | 2.98 | 1.78 | 0.43 | 2.22 | 41.0 | 2.09 | — | 96.2 |
| RED-OPSESP-1 | red | surface | 40.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.11 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## Blue: Ofensiva / Concentrada × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=83.3%, red=16.7%
- Motivo de conclusão: victory=46.0%, timeout=54.0%
- Duração média: 12.62 turnos
- Dano médio causado por equipe (pontos de HP): blue=34.79, red=51.61
- Unidades perdidas em média: blue=4.2, red=5.14

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.9 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.7 | 0.38 | 0.52 | 0.08 | 0.37 | 58.2 | 2.19 | 89.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.01 | 100.0 | 3.86 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.85 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.66 | 0.0 | 0.48 | 1.97 | 48.8 | 2.45 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.03 | 0.0 | 0.37 | 1.52 | 49.1 | 2.43 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.23 | 0.08 | 0.03 | 0.3 | 60.0 | 0.3 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.07 | 0.0 | 0.03 | 0.09 | 50.0 | 0.6 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 72.7 | 0.0 | 2.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 74.0 | 0.0 | 2.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 78.7 | 0.0 | 2.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 86.0 | 0.0 | 1.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 92.0 | 0.0 | 0.42 | 0.0 | 0.0 | — | 3.06 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 85.3 | 0.0 | 0.7 | 0.0 | 0.0 | — | 2.11 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.45 | 0.2 | 0.09 | 0.35 | 53.8 | 1.1 | — | 98.4 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.41 | 0.21 | 0.09 | 0.31 | 52.2 | 1.08 | — | 99.7 |
| BLUE-PAT-C1 | blue | surface | 92.7 | 0.13 | 0.31 | 0.01 | 0.17 | 57.7 | 2.24 | 92.3 | 93.7 |
| BLUE-PAT-C2 | blue | surface | 84.7 | 0.49 | 0.67 | 0.04 | 0.59 | 56.8 | 2.01 | 91.7 | 73.7 |
| BLUE-PAT-O1 | blue | surface | 56.7 | 2.82 | 2.67 | 0.27 | 2.74 | 43.6 | 2.05 | 90.9 | 90.0 |
| BLUE-PAT-O2 | blue | surface | 93.3 | 2.53 | 0.44 | 0.43 | 2.26 | 51.6 | 3.24 | 40.3 | 83.2 |
| BLUE-PORTO-ACU | blue | land | 87.3 | 0.0 | 2.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 38.7 | 0.0 | 14.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 86.0 | 0.0 | 5.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 71.3 | 0.0 | 6.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.3 | 3.09 | 0.78 | 0.46 | 2.91 | 46.8 | 2.3 | 94.6 | 94.8 |
| BLUE-SAG-S1 | blue | surface | 86.7 | 2.45 | 2.11 | 0.38 | 2.47 | 41.4 | 2.32 | 38.6 | 97.0 |
| BLUE-SAG-S2 | blue | surface | 95.3 | 3.52 | 0.87 | 0.73 | 3.42 | 46.4 | 3.02 | 42.7 | 98.8 |
| BLUE-SUB-1 | blue | submarine | 79.3 | 3.36 | 0.65 | 0.47 | 3.4 | 54.3 | 2.63 | 94.3 | 75.2 |
| BLUE-SUB-2 | blue | submarine | 94.7 | 2.02 | 0.15 | 0.49 | 2.17 | 52.1 | 3.27 | 39.0 | 92.1 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.74 | 0.16 | 0.13 | 0.69 | 59.2 | 2.23 | 95.9 | 91.9 |
| BLUE-SUB-N | blue | submarine | 63.3 | 5.35 | 1.77 | 0.55 | 4.68 | 47.7 | 1.89 | — | 80.1 |
| RED-AKE | red | surface | 72.7 | 0.0 | 2.65 | 0.0 | 0.0 | — | 7.25 | 97.8 | — |
| RED-AOR-G | red | surface | 61.3 | 0.0 | 1.93 | 0.0 | 0.0 | — | 4.79 | 99.3 | — |
| RED-AWACS-K | red | air | 78.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.87 | — | — |
| RED-GANF | red | surface | 97.3 | 0.03 | 0.79 | 0.01 | 0.04 | 83.3 | 0.0 | 84.8 | — |
| RED-GBPA | red | surface | 78.0 | 0.81 | 1.69 | 0.11 | 0.87 | 46.6 | 0.0 | — | 97.5 |
| RED-GE-1 | red | surface | 66.0 | 17.29 | 5.7 | 1.16 | 10.73 | 65.4 | 3.23 | 92.5 | 78.1 |
| RED-GE-2 | red | surface | 58.7 | 11.67 | 5.6 | 0.86 | 7.8 | 62.2 | 3.15 | 87.5 | 73.8 |
| RED-GE-3 | red | surface | 70.7 | 1.67 | 3.37 | 0.21 | 1.43 | 58.4 | 2.21 | 89.6 | 88.9 |
| RED-GLOG | red | surface | 81.3 | 0.0 | 1.61 | 0.0 | 0.0 | — | 6.78 | 99.6 | — |
| RED-KMF-1 | red | air | 78.0 | 0.81 | 0.09 | 0.14 | 1.04 | 32.7 | 4.25 | — | — |
| RED-KMF-2 | red | air | 78.0 | 0.83 | 0.01 | 0.19 | 0.89 | 35.3 | 4.22 | — | — |
| RED-KS-1 | red | submarine | 8.0 | 4.99 | 3.02 | 0.4 | 3.2 | 49.6 | 2.73 | 79.6 | 69.1 |
| RED-KSN | red | submarine | 38.7 | 9.69 | 2.75 | 0.49 | 6.37 | 61.9 | 2.33 | — | 76.9 |
| RED-MPRA-K1 | red | air | 58.7 | 2.18 | 1.03 | 0.36 | 1.31 | 49.2 | 1.55 | — | 98.7 |
| RED-MPRA-K2 | red | air | 60.0 | 1.57 | 0.86 | 0.27 | 1.03 | 49.7 | 1.83 | — | 98.3 |
| RED-OPSESP-1 | red | surface | 78.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 3.67 | 0.0 | 0.11 | 47.1 | 0.0 | — | 96.2 |

### Somente vitória decisiva

- Partidas: **69**
- Taxa de vitória: blue=63.8%, red=36.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.3 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.35, red=61.09
- Unidades perdidas em média: blue=5.29, red=6.61

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.74 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.17 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.6 | 0.59 | 0.48 | 0.13 | 0.62 | 58.1 | 3.49 | 84.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.03 | 100.0 | 5.93 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.97 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.52 | 0.0 | 0.54 | 2.41 | 42.2 | 3.22 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.67 | 0.0 | 0.36 | 1.87 | 39.5 | 3.23 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.19 | 0.0 | 0.01 | 0.33 | 43.5 | 0.58 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.14 | 0.0 | 0.06 | 0.17 | 50.0 | 1.16 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 52.2 | 0.0 | 4.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 49.3 | 0.0 | 4.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 62.3 | 0.0 | 3.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 82.6 | 0.0 | 1.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 87.0 | 0.0 | 0.62 | 0.0 | 0.0 | — | 4.14 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 75.4 | 0.0 | 1.17 | 0.0 | 0.0 | — | 3.65 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 95.7 | 0.48 | 0.09 | 0.1 | 0.45 | 51.6 | 1.78 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 89.9 | 0.71 | 0.36 | 0.13 | 0.49 | 50.0 | 1.83 | — | 99.8 |
| BLUE-PAT-C1 | blue | surface | 91.3 | 0.26 | 0.38 | 0.01 | 0.33 | 56.5 | 4.07 | 87.0 | 88.4 |
| BLUE-PAT-C2 | blue | surface | 75.4 | 0.62 | 1.06 | 0.07 | 0.68 | 55.3 | 3.74 | 85.3 | 68.1 |
| BLUE-PAT-O1 | blue | surface | 36.2 | 4.55 | 4.0 | 0.46 | 4.25 | 43.0 | 2.93 | 88.7 | 84.1 |
| BLUE-PAT-O2 | blue | surface | 94.2 | 3.84 | 0.33 | 0.55 | 3.49 | 45.6 | 4.58 | 58.4 | 81.5 |
| BLUE-PORTO-ACU | blue | land | 98.6 | 0.0 | 0.55 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 34.8 | 0.0 | 15.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 72.5 | 0.0 | 9.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 91.3 | 0.0 | 3.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.7 | 4.81 | 1.29 | 0.7 | 4.17 | 50.0 | 3.77 | 90.2 | 90.4 |
| BLUE-SAG-S1 | blue | surface | 79.7 | 4.16 | 3.29 | 0.61 | 4.3 | 42.1 | 4.22 | 55.2 | 94.7 |
| BLUE-SAG-S2 | blue | surface | 95.7 | 4.71 | 1.13 | 0.86 | 4.43 | 44.4 | 4.64 | 60.7 | 97.7 |
| BLUE-SUB-1 | blue | submarine | 76.8 | 4.28 | 0.75 | 0.57 | 4.59 | 53.6 | 4.87 | 91.7 | 65.2 |
| BLUE-SUB-2 | blue | submarine | 97.1 | 2.13 | 0.09 | 0.51 | 2.07 | 56.6 | 5.07 | 67.0 | 87.0 |
| BLUE-SUB-3 | blue | submarine | 95.7 | 1.42 | 0.09 | 0.2 | 1.19 | 61.0 | 4.1 | 93.9 | 85.7 |
| BLUE-SUB-N | blue | submarine | 59.4 | 7.16 | 1.99 | 0.71 | 6.48 | 49.2 | 3.29 | — | 72.9 |
| RED-AKE | red | surface | 62.3 | 0.0 | 3.52 | 0.0 | 0.0 | — | 7.1 | 97.4 | — |
| RED-AOR-G | red | surface | 39.1 | 0.0 | 3.07 | 0.0 | 0.0 | — | 4.87 | 99.3 | — |
| RED-AWACS-K | red | air | 52.2 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.43 | — | — |
| RED-GANF | red | surface | 94.2 | 0.03 | 1.72 | 0.0 | 0.04 | 66.7 | 0.0 | 83.1 | — |
| RED-GBPA | red | surface | 52.2 | 1.2 | 3.51 | 0.17 | 1.3 | 44.4 | 0.0 | — | 96.8 |
| RED-GE-1 | red | surface | 75.4 | 17.52 | 5.52 | 1.13 | 10.19 | 66.0 | 3.3 | 88.7 | 78.2 |
| RED-GE-2 | red | surface | 59.4 | 14.36 | 6.38 | 1.16 | 9.17 | 60.0 | 3.26 | 84.8 | 67.6 |
| RED-GE-3 | red | surface | 44.9 | 2.8 | 6.2 | 0.33 | 2.46 | 61.2 | 3.78 | 80.9 | 79.3 |
| RED-GLOG | red | surface | 68.1 | 0.0 | 2.68 | 0.0 | 0.0 | — | 6.86 | 99.4 | — |
| RED-KMF-1 | red | air | 52.2 | 1.36 | 0.09 | 0.19 | 1.77 | 30.3 | 7.03 | — | — |
| RED-KMF-2 | red | air | 52.2 | 1.54 | 0.01 | 0.35 | 1.55 | 36.4 | 6.88 | — | — |
| RED-KS-1 | red | submarine | 15.9 | 5.96 | 2.64 | 0.46 | 3.81 | 50.2 | 3.23 | 78.8 | 62.0 |
| RED-KSN | red | submarine | 23.2 | 10.58 | 3.59 | 0.55 | 6.54 | 63.9 | 3.17 | — | 75.7 |
| RED-MPRA-K1 | red | air | 15.9 | 3.26 | 1.94 | 0.58 | 2.16 | 46.3 | 2.84 | — | 97.1 |
| RED-MPRA-K2 | red | air | 17.4 | 2.41 | 1.71 | 0.36 | 1.75 | 45.5 | 2.99 | — | 96.4 |
| RED-OPSESP-1 | red | surface | 52.2 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.75 | 0.0 | 0.13 | 55.6 | 0.0 | — | 95.7 |

## Blue: Ofensiva / Concentrada × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=83.3%, red=16.7%
- Motivo de conclusão: timeout=52.0%, victory=48.0%
- Duração média: 12.69 turnos
- Dano médio causado por equipe (pontos de HP): blue=34.2, red=57.03
- Unidades perdidas em média: blue=4.8, red=5.07

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 0.92 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.63 | — | — |
| BLUE-AERO-CF | blue | land | 96.7 | 0.0 | 0.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.11 | 0.47 | 0.03 | 0.07 | 54.5 | 1.98 | 86.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.02 | 33.3 | 3.26 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 50.0 | 3.31 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.95 | 0.0 | 0.65 | 2.43 | 54.2 | 1.91 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.83 | 0.0 | 0.53 | 1.81 | 53.5 | 1.87 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.28 | 0.02 | 0.04 | 0.19 | 57.1 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 64.7 | 0.0 | 2.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 72.7 | 0.0 | 2.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 78.7 | 0.0 | 2.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 78.0 | 0.0 | 2.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 87.3 | 0.0 | 0.62 | 0.0 | 0.0 | — | 2.25 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 75.3 | 0.0 | 1.33 | 0.0 | 0.0 | — | 1.97 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 96.7 | 0.33 | 0.15 | 0.1 | 0.28 | 45.2 | 1.24 | — | 99.8 |
| BLUE-MPRA-2 | blue | air | 98.0 | 0.25 | 0.09 | 0.06 | 0.25 | 43.2 | 1.23 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 96.0 | 0.07 | 0.13 | 0.01 | 0.06 | 66.7 | 2.36 | 89.6 | 97.0 |
| BLUE-PAT-C2 | blue | surface | 80.7 | 0.33 | 0.69 | 0.05 | 0.31 | 68.1 | 2.17 | 87.6 | 85.3 |
| BLUE-PAT-O1 | blue | surface | 55.3 | 3.47 | 2.62 | 0.33 | 2.77 | 46.9 | 2.03 | 89.3 | 91.5 |
| BLUE-PAT-O2 | blue | surface | 93.3 | 2.27 | 0.41 | 0.52 | 2.07 | 52.9 | 3.05 | 34.9 | 86.7 |
| BLUE-PORTO-ACU | blue | land | 81.3 | 0.0 | 3.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.7 | 0.0 | 16.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.0 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 61.3 | 0.0 | 9.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 85.3 | 2.18 | 0.87 | 0.31 | 1.97 | 46.4 | 2.27 | 92.3 | 97.9 |
| BLUE-SAG-S1 | blue | surface | 77.3 | 1.98 | 3.38 | 0.22 | 2.04 | 41.2 | 2.26 | 35.0 | 99.3 |
| BLUE-SAG-S2 | blue | surface | 95.3 | 2.62 | 1.05 | 0.55 | 2.37 | 48.5 | 2.69 | 33.1 | 99.7 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 2.96 | 0.7 | 0.41 | 3.07 | 53.1 | 3.16 | 86.0 | 74.8 |
| BLUE-SUB-2 | blue | submarine | 92.0 | 1.81 | 0.25 | 0.51 | 1.89 | 51.8 | 3.3 | 40.5 | 95.2 |
| BLUE-SUB-3 | blue | submarine | 98.0 | 0.51 | 0.08 | 0.1 | 0.34 | 66.7 | 2.25 | 92.6 | 96.2 |
| BLUE-SUB-N | blue | submarine | 52.0 | 6.25 | 2.12 | 0.65 | 4.99 | 51.4 | 2.03 | — | 81.3 |
| RED-AKE | red | surface | 56.7 | 0.0 | 3.49 | 0.0 | 0.0 | — | 8.76 | 97.3 | — |
| RED-AOR-G | red | surface | 62.0 | 0.0 | 1.87 | 0.0 | 0.0 | — | 4.3 | 99.2 | — |
| RED-AWACS-K | red | air | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.51 | — | — |
| RED-GANF | red | surface | 99.3 | 0.01 | 0.81 | 0.0 | 0.01 | 100.0 | 0.0 | 71.3 | — |
| RED-GBPA | red | surface | 72.7 | 0.95 | 2.03 | 0.2 | 0.99 | 45.9 | 0.0 | — | 99.0 |
| RED-GE-1 | red | surface | 72.7 | 18.61 | 4.17 | 1.34 | 11.33 | 68.5 | 2.74 | 87.4 | 76.6 |
| RED-GE-2 | red | surface | 61.3 | 12.29 | 5.55 | 0.82 | 7.86 | 64.4 | 3.1 | 80.8 | 72.1 |
| RED-GE-3 | red | surface | 72.0 | 0.93 | 3.15 | 0.13 | 1.14 | 52.6 | 2.0 | 79.9 | 91.7 |
| RED-GLOG | red | surface | 63.3 | 0.0 | 3.13 | 0.0 | 0.0 | — | 7.86 | 99.3 | — |
| RED-KMF-1 | red | air | 72.7 | 0.71 | 0.0 | 0.13 | 0.81 | 34.7 | 4.59 | — | — |
| RED-KMF-2 | red | air | 72.7 | 0.75 | 0.0 | 0.12 | 0.68 | 35.3 | 4.57 | — | — |
| RED-KS-1 | red | submarine | 38.0 | 6.27 | 1.93 | 0.49 | 4.17 | 48.0 | 1.71 | 61.1 | 59.8 |
| RED-KSN | red | submarine | 36.7 | 11.98 | 3.11 | 0.87 | 8.01 | 60.4 | 2.26 | — | 72.6 |
| RED-MPRA-K1 | red | air | 52.0 | 2.65 | 0.73 | 0.4 | 1.69 | 42.3 | 1.64 | — | 96.9 |
| RED-MPRA-K2 | red | air | 54.7 | 1.83 | 0.72 | 0.29 | 1.26 | 44.4 | 2.12 | — | 98.0 |
| RED-OPSESP-1 | red | surface | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.04 | 3.52 | 0.01 | 0.04 | 66.7 | 0.0 | — | 98.7 |

### Somente vitória decisiva

- Partidas: **72**
- Taxa de vitória: red=34.7%, blue=65.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.93 turnos
- Dano médio causado por equipe (pontos de HP): blue=41.99, red=69.83
- Unidades perdidas em média: blue=6.36, red=6.15

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 1.88 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.28 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.6 | 0.0 | 0.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 95.8 | 0.22 | 0.81 | 0.06 | 0.15 | 54.5 | 3.78 | 78.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.04 | 33.3 | 6.31 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.03 | 50.0 | 6.39 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.11 | 0.0 | 0.6 | 2.39 | 50.6 | 3.64 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.44 | 0.0 | 0.54 | 1.79 | 50.4 | 3.58 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.21 | 0.0 | 0.04 | 0.17 | 50.0 | 0.62 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.25 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 54.2 | 0.0 | 3.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 58.3 | 0.0 | 3.65 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.1 | 0.0 | 3.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 66.7 | 0.0 | 3.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 76.4 | 0.0 | 1.18 | 0.0 | 0.0 | — | 3.99 | 99.1 | — |
| BLUE-LOG-T | blue | surface | 59.7 | 0.0 | 2.07 | 0.0 | 0.0 | — | 3.86 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 95.8 | 0.58 | 0.21 | 0.18 | 0.53 | 42.1 | 2.12 | — | 99.5 |
| BLUE-MPRA-2 | blue | air | 95.8 | 0.5 | 0.18 | 0.12 | 0.5 | 41.7 | 2.15 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 91.7 | 0.12 | 0.28 | 0.01 | 0.1 | 71.4 | 4.53 | 82.4 | 95.1 |
| BLUE-PAT-C2 | blue | surface | 69.4 | 0.42 | 1.17 | 0.08 | 0.35 | 60.0 | 4.19 | 80.3 | 84.7 |
| BLUE-PAT-O1 | blue | surface | 27.8 | 4.07 | 4.04 | 0.42 | 3.29 | 46.8 | 2.81 | 83.9 | 86.5 |
| BLUE-PAT-O2 | blue | surface | 95.8 | 3.47 | 0.26 | 0.67 | 3.18 | 48.9 | 4.88 | 59.2 | 87.8 |
| BLUE-PORTO-ACU | blue | land | 84.7 | 0.0 | 3.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 19.4 | 0.0 | 18.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.44 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 61.1 | 0.0 | 10.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 70.8 | 2.92 | 1.75 | 0.46 | 2.39 | 51.7 | 4.25 | 86.8 | 95.6 |
| BLUE-SAG-S1 | blue | surface | 70.8 | 3.64 | 3.94 | 0.38 | 3.82 | 41.1 | 4.39 | 56.8 | 98.5 |
| BLUE-SAG-S2 | blue | surface | 91.7 | 3.72 | 1.82 | 0.74 | 3.51 | 43.9 | 4.99 | 59.7 | 99.3 |
| BLUE-SUB-1 | blue | submarine | 75.0 | 4.18 | 0.94 | 0.56 | 4.72 | 52.4 | 5.51 | 83.5 | 61.6 |
| BLUE-SUB-2 | blue | submarine | 93.1 | 1.68 | 0.24 | 0.38 | 1.74 | 52.8 | 5.54 | 68.3 | 91.0 |
| BLUE-SUB-3 | blue | submarine | 97.2 | 1.07 | 0.1 | 0.21 | 0.67 | 70.8 | 4.46 | 92.0 | 92.2 |
| BLUE-SUB-N | blue | submarine | 52.8 | 7.58 | 2.1 | 0.72 | 6.28 | 50.4 | 3.71 | — | 75.0 |
| RED-AKE | red | surface | 45.8 | 0.0 | 4.03 | 0.0 | 0.0 | — | 8.1 | 97.4 | — |
| RED-AOR-G | red | surface | 47.2 | 0.0 | 2.53 | 0.0 | 0.0 | — | 4.1 | 98.6 | — |
| RED-AWACS-K | red | air | 43.1 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.81 | — | — |
| RED-GANF | red | surface | 98.6 | 0.03 | 1.68 | 0.0 | 0.03 | 100.0 | 0.0 | 79.2 | — |
| RED-GBPA | red | surface | 43.1 | 1.68 | 4.22 | 0.35 | 1.82 | 44.3 | 0.0 | — | 97.9 |
| RED-GE-1 | red | surface | 90.3 | 20.21 | 2.0 | 1.51 | 12.21 | 70.4 | 1.61 | 89.9 | 74.4 |
| RED-GE-2 | red | surface | 61.1 | 15.15 | 6.62 | 1.04 | 9.69 | 64.0 | 2.43 | 81.9 | 64.5 |
| RED-GE-3 | red | surface | 50.0 | 1.5 | 5.61 | 0.22 | 1.96 | 50.4 | 3.33 | 79.4 | 85.6 |
| RED-GLOG | red | surface | 50.0 | 0.0 | 3.99 | 0.0 | 0.0 | — | 7.31 | 98.9 | — |
| RED-KMF-1 | red | air | 43.1 | 1.42 | 0.0 | 0.25 | 1.61 | 33.6 | 6.89 | — | — |
| RED-KMF-2 | red | air | 43.1 | 1.44 | 0.0 | 0.22 | 1.36 | 34.7 | 6.97 | — | — |
| RED-KS-1 | red | submarine | 52.8 | 7.39 | 1.49 | 0.6 | 4.75 | 50.0 | 2.38 | 61.3 | 52.5 |
| RED-KSN | red | submarine | 23.6 | 12.28 | 3.74 | 0.83 | 7.67 | 62.0 | 2.07 | — | 71.7 |
| RED-MPRA-K1 | red | air | 8.3 | 5.24 | 1.24 | 0.78 | 3.31 | 42.9 | 3.12 | — | 93.5 |
| RED-MPRA-K2 | red | air | 11.1 | 3.42 | 1.29 | 0.54 | 2.39 | 43.6 | 3.28 | — | 95.8 |
| RED-OPSESP-1 | red | surface | 43.1 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.08 | 3.56 | 0.01 | 0.06 | 100.0 | 0.0 | — | 98.1 |

## Blue: Ofensiva / Concentrada × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=82.0%, red=18.0%
- Motivo de conclusão: timeout=51.3%, victory=48.7%
- Duração média: 12.73 turnos
- Dano médio causado por equipe (pontos de HP): blue=31.11, red=60.21
- Unidades perdidas em média: blue=5.11, red=4.83

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.92 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.63 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.55 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.7 | 0.1 | 0.36 | 0.03 | 0.13 | 65.0 | 1.98 | 89.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.71 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.71 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.31 | 0.0 | 0.65 | 2.25 | 51.5 | 2.15 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.49 | 0.0 | 0.47 | 1.65 | 56.0 | 2.17 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.21 | 0.03 | 0.03 | 0.13 | 65.0 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.61 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 67.3 | 0.0 | 2.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 75.3 | 0.0 | 2.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 68.7 | 0.0 | 2.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 68.7 | 0.0 | 2.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.0 | 0.0 | 0.67 | 0.0 | 0.0 | — | 2.35 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 70.0 | 0.0 | 1.52 | 0.0 | 0.0 | — | 2.19 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 99.3 | 0.27 | 0.05 | 0.07 | 0.2 | 53.3 | 1.32 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 98.7 | 0.21 | 0.09 | 0.05 | 0.19 | 39.3 | 1.31 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 94.7 | 0.07 | 0.25 | 0.01 | 0.05 | 71.4 | 2.35 | 91.6 | 98.0 |
| BLUE-PAT-C2 | blue | surface | 74.0 | 0.19 | 1.13 | 0.03 | 0.25 | 67.6 | 2.15 | 91.2 | 88.0 |
| BLUE-PAT-O1 | blue | surface | 55.3 | 3.11 | 2.58 | 0.31 | 2.86 | 44.3 | 2.14 | 87.6 | 94.8 |
| BLUE-PAT-O2 | blue | surface | 96.0 | 2.39 | 0.29 | 0.49 | 2.14 | 50.2 | 3.23 | 28.4 | 88.8 |
| BLUE-PORTO-ACU | blue | land | 84.0 | 0.0 | 3.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.7 | 0.0 | 16.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.3 | 0.0 | 10.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 1.99 | 1.33 | 0.23 | 1.8 | 43.3 | 2.12 | 96.1 | 97.9 |
| BLUE-SAG-S1 | blue | surface | 72.7 | 2.13 | 3.79 | 0.31 | 2.32 | 41.1 | 2.34 | 32.6 | 99.1 |
| BLUE-SAG-S2 | blue | surface | 94.7 | 2.69 | 0.89 | 0.57 | 2.63 | 46.8 | 2.58 | 29.3 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 2.91 | 0.7 | 0.42 | 2.59 | 61.7 | 2.69 | 87.5 | 79.3 |
| BLUE-SUB-2 | blue | submarine | 94.0 | 2.07 | 0.23 | 0.58 | 2.24 | 51.2 | 3.33 | 33.1 | 94.8 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 0.48 | 0.11 | 0.06 | 0.41 | 47.5 | 2.41 | 95.4 | 95.8 |
| BLUE-SUB-N | blue | submarine | 53.3 | 4.5 | 2.15 | 0.54 | 4.49 | 44.4 | 1.98 | — | 82.7 |
| RED-AKE | red | surface | 52.7 | 0.0 | 3.89 | 0.0 | 0.0 | — | 8.34 | 97.0 | — |
| RED-AOR-G | red | surface | 63.3 | 0.0 | 1.81 | 0.0 | 0.0 | — | 3.87 | 99.5 | — |
| RED-AWACS-K | red | air | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.99 | — | — |
| RED-GANF | red | surface | 96.7 | 0.03 | 1.03 | 0.0 | 0.05 | 50.0 | 0.0 | 73.7 | — |
| RED-GBPA | red | surface | 72.7 | 1.19 | 2.1 | 0.19 | 1.15 | 54.3 | 0.0 | — | 98.1 |
| RED-GE-1 | red | surface | 82.7 | 18.53 | 3.24 | 1.31 | 11.87 | 66.4 | 2.25 | 84.2 | 74.5 |
| RED-GE-2 | red | surface | 80.7 | 11.97 | 3.32 | 0.85 | 7.95 | 63.8 | 1.95 | 82.5 | 71.7 |
| RED-GE-3 | red | surface | 75.3 | 1.61 | 2.71 | 0.21 | 1.33 | 60.8 | 1.81 | 80.4 | 88.2 |
| RED-GLOG | red | surface | 64.7 | 0.0 | 2.87 | 0.0 | 0.0 | — | 7.75 | 99.4 | — |
| RED-KMF-1 | red | air | 72.7 | 0.95 | 0.01 | 0.13 | 0.97 | 40.7 | 3.97 | — | — |
| RED-KMF-2 | red | air | 72.7 | 0.73 | 0.05 | 0.15 | 0.83 | 35.5 | 3.85 | — | — |
| RED-KS-1 | red | submarine | 36.7 | 6.95 | 2.09 | 0.63 | 4.67 | 49.1 | 1.94 | 60.9 | 55.5 |
| RED-KSN | red | submarine | 40.7 | 13.93 | 2.59 | 0.99 | 8.81 | 63.4 | 2.09 | — | 69.6 |
| RED-MPRA-K1 | red | air | 52.7 | 2.6 | 0.79 | 0.38 | 1.44 | 50.9 | 0.88 | — | 97.4 |
| RED-MPRA-K2 | red | air | 52.7 | 1.65 | 0.97 | 0.27 | 1.09 | 48.2 | 0.97 | — | 97.8 |
| RED-OPSESP-1 | red | surface | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.09 | 3.65 | 0.01 | 0.05 | 71.4 | 0.0 | — | 98.4 |

### Somente vitória decisiva

- Partidas: **73**
- Taxa de vitória: blue=63.0%, red=37.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.18 turnos
- Dano médio causado por equipe (pontos de HP): blue=39.64, red=71.18
- Unidades perdidas em média: blue=6.71, red=6.11

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.77 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.21 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.08 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.6 | 0.19 | 0.55 | 0.04 | 0.25 | 66.7 | 3.67 | 81.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.23 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.25 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.44 | 0.0 | 0.63 | 2.32 | 48.5 | 3.88 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.58 | 0.0 | 0.55 | 1.73 | 57.1 | 3.89 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.26 | 0.0 | 0.04 | 0.16 | 66.7 | 0.59 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.18 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 60.3 | 0.0 | 3.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 60.3 | 0.0 | 3.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 46.6 | 0.0 | 4.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 56.2 | 0.0 | 3.74 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 74.0 | 0.0 | 1.21 | 0.0 | 0.0 | — | 4.11 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 50.7 | 0.0 | 2.6 | 0.0 | 0.0 | — | 4.16 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 98.6 | 0.55 | 0.1 | 0.12 | 0.38 | 53.6 | 2.36 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 97.3 | 0.44 | 0.19 | 0.11 | 0.37 | 40.7 | 2.32 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 90.4 | 0.14 | 0.47 | 0.01 | 0.1 | 71.4 | 4.16 | 85.2 | 95.9 |
| BLUE-PAT-C2 | blue | surface | 56.2 | 0.21 | 1.9 | 0.03 | 0.29 | 66.7 | 3.96 | 84.2 | 85.6 |
| BLUE-PAT-O1 | blue | surface | 26.0 | 3.73 | 4.26 | 0.4 | 3.49 | 43.9 | 3.01 | 79.0 | 91.4 |
| BLUE-PAT-O2 | blue | surface | 95.9 | 3.63 | 0.26 | 0.66 | 3.07 | 50.0 | 4.63 | 50.5 | 92.1 |
| BLUE-PORTO-ACU | blue | land | 95.9 | 0.0 | 2.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 23.3 | 0.0 | 18.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.6 | 0.0 | 2.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 65.8 | 0.0 | 10.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 63.0 | 2.92 | 2.49 | 0.37 | 2.71 | 44.4 | 3.96 | 93.8 | 96.0 |
| BLUE-SAG-S1 | blue | surface | 67.1 | 3.88 | 4.49 | 0.53 | 4.19 | 41.5 | 4.33 | 54.7 | 98.2 |
| BLUE-SAG-S2 | blue | surface | 90.4 | 4.12 | 1.55 | 0.78 | 4.05 | 45.9 | 4.74 | 51.0 | 99.1 |
| BLUE-SUB-1 | blue | submarine | 76.7 | 4.68 | 0.86 | 0.66 | 4.23 | 60.2 | 4.71 | 86.6 | 67.5 |
| BLUE-SUB-2 | blue | submarine | 94.5 | 1.62 | 0.14 | 0.42 | 1.88 | 51.1 | 5.1 | 61.8 | 91.4 |
| BLUE-SUB-3 | blue | submarine | 95.9 | 0.84 | 0.18 | 0.1 | 0.71 | 48.1 | 4.26 | 93.8 | 92.3 |
| BLUE-SUB-N | blue | submarine | 46.6 | 5.44 | 2.23 | 0.66 | 5.45 | 44.7 | 3.49 | — | 78.0 |
| RED-AKE | red | surface | 43.8 | 0.0 | 4.59 | 0.0 | 0.0 | — | 7.99 | 97.4 | — |
| RED-AOR-G | red | surface | 45.2 | 0.0 | 2.66 | 0.0 | 0.0 | — | 3.55 | 99.3 | — |
| RED-AWACS-K | red | air | 43.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.9 | — | — |
| RED-GANF | red | surface | 93.2 | 0.05 | 2.12 | 0.0 | 0.11 | 50.0 | 0.0 | 76.3 | — |
| RED-GBPA | red | surface | 43.8 | 2.0 | 4.21 | 0.29 | 1.97 | 56.2 | 0.0 | — | 96.4 |
| RED-GE-1 | red | surface | 94.5 | 19.32 | 2.11 | 1.36 | 12.51 | 65.2 | 1.96 | 86.9 | 72.2 |
| RED-GE-2 | red | surface | 90.4 | 14.58 | 2.89 | 1.23 | 9.48 | 61.0 | 1.37 | 86.5 | 65.9 |
| RED-GE-3 | red | surface | 53.4 | 2.9 | 5.15 | 0.38 | 2.45 | 61.5 | 3.16 | 77.2 | 77.2 |
| RED-GLOG | red | surface | 50.7 | 0.0 | 3.84 | 0.0 | 0.0 | — | 7.99 | 99.1 | — |
| RED-KMF-1 | red | air | 43.8 | 1.78 | 0.01 | 0.25 | 1.89 | 40.6 | 6.93 | — | — |
| RED-KMF-2 | red | air | 43.8 | 1.49 | 0.1 | 0.3 | 1.62 | 36.4 | 6.82 | — | — |
| RED-KS-1 | red | submarine | 54.8 | 8.26 | 1.49 | 0.85 | 5.32 | 52.3 | 2.92 | 61.2 | 48.6 |
| RED-KSN | red | submarine | 17.8 | 13.58 | 3.49 | 0.96 | 8.33 | 63.0 | 2.33 | — | 69.6 |
| RED-MPRA-K1 | red | air | 6.8 | 4.27 | 1.47 | 0.67 | 2.51 | 49.2 | 1.7 | — | 94.7 |
| RED-MPRA-K2 | red | air | 6.8 | 2.85 | 1.82 | 0.42 | 1.85 | 50.4 | 1.78 | — | 95.4 |
| RED-OPSESP-1 | red | surface | 43.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.1 | 3.7 | 0.0 | 0.07 | 60.0 | 0.0 | — | 97.7 |

## Blue: Ofensiva / Dividida × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=84.7%, red=15.3%
- Motivo de conclusão: victory=52.7%, timeout=47.3%
- Duração média: 11.93 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.87, red=51.22
- Unidades perdidas em média: blue=4.41, red=5.36

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.1 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.75 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.7 | 0.35 | 0.37 | 0.12 | 0.38 | 47.4 | 2.25 | 89.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 4.19 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.18 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.29 | 0.0 | 0.52 | 2.33 | 50.1 | 2.22 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.13 | 0.0 | 0.45 | 1.86 | 54.5 | 2.24 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.21 | 0.05 | 0.05 | 0.29 | 46.5 | 0.37 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.03 | 80.0 | 0.73 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 78.7 | 0.0 | 2.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 79.3 | 0.0 | 2.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 75.3 | 0.0 | 2.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 82.7 | 0.0 | 1.94 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 90.0 | 0.0 | 0.63 | 0.0 | 0.0 | — | 3.79 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 77.3 | 0.0 | 1.23 | 0.0 | 0.0 | — | 2.45 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.33 | 0.24 | 0.06 | 0.31 | 45.7 | 1.28 | — | 99.1 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.47 | 0.25 | 0.09 | 0.34 | 66.7 | 1.35 | — | 98.3 |
| BLUE-PAT-C1 | blue | surface | 89.3 | 0.1 | 0.43 | 0.01 | 0.15 | 50.0 | 2.83 | 92.0 | 94.0 |
| BLUE-PAT-C2 | blue | surface | 80.7 | 0.3 | 0.88 | 0.03 | 0.34 | 58.8 | 2.51 | 91.1 | 83.0 |
| BLUE-PAT-O1 | blue | surface | 50.7 | 2.91 | 2.89 | 0.29 | 2.61 | 44.5 | 1.82 | 88.6 | 88.7 |
| BLUE-PAT-O2 | blue | surface | 89.3 | 2.24 | 0.73 | 0.43 | 2.43 | 44.7 | 3.72 | 44.1 | 83.3 |
| BLUE-PORTO-ACU | blue | land | 90.7 | 0.0 | 1.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 50.0 | 0.0 | 13.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 86.0 | 0.0 | 5.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 78.7 | 0.0 | 5.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 86.7 | 2.77 | 0.87 | 0.45 | 2.63 | 45.9 | 2.54 | 91.8 | 96.2 |
| BLUE-SAG-S1 | blue | surface | 84.0 | 2.81 | 2.46 | 0.4 | 2.57 | 45.6 | 2.88 | 48.0 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.85 | 1.2 | 0.78 | 3.19 | 50.2 | 3.61 | 43.7 | 98.4 |
| BLUE-SUB-1 | blue | submarine | 79.3 | 4.35 | 0.74 | 0.59 | 3.83 | 57.3 | 3.25 | 89.0 | 72.0 |
| BLUE-SUB-2 | blue | submarine | 88.7 | 1.73 | 0.43 | 0.39 | 1.95 | 53.1 | 3.75 | 46.6 | 92.0 |
| BLUE-SUB-3 | blue | submarine | 92.0 | 0.86 | 0.2 | 0.09 | 0.71 | 58.5 | 2.69 | 92.4 | 91.9 |
| BLUE-SUB-N | blue | submarine | 56.0 | 5.13 | 1.99 | 0.59 | 4.81 | 45.6 | 2.25 | — | 79.5 |
| RED-AKE | red | surface | 61.3 | 0.0 | 3.02 | 0.0 | 0.0 | — | 7.8 | 97.8 | — |
| RED-AOR-G | red | surface | 60.7 | 0.0 | 1.93 | 0.0 | 0.0 | — | 5.51 | 99.7 | — |
| RED-AWACS-K | red | air | 72.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.45 | — | — |
| RED-GANF | red | surface | 98.0 | 0.01 | 1.22 | 0.0 | 0.01 | 50.0 | 0.0 | 81.6 | — |
| RED-GBPA | red | surface | 72.0 | 1.31 | 2.43 | 0.25 | 1.2 | 50.6 | 0.0 | — | 97.3 |
| RED-GE-1 | red | surface | 66.7 | 15.57 | 5.53 | 1.02 | 9.93 | 64.5 | 3.39 | 88.1 | 80.3 |
| RED-GE-2 | red | surface | 54.7 | 10.52 | 6.49 | 0.69 | 7.2 | 62.1 | 3.55 | 84.4 | 76.1 |
| RED-GE-3 | red | surface | 72.7 | 2.17 | 3.14 | 0.33 | 1.94 | 54.3 | 2.45 | 87.7 | 84.1 |
| RED-GLOG | red | surface | 72.0 | 0.0 | 2.25 | 0.0 | 0.0 | — | 7.88 | 99.4 | — |
| RED-KMF-1 | red | air | 72.0 | 1.13 | 0.05 | 0.24 | 1.12 | 38.7 | 3.92 | — | — |
| RED-KMF-2 | red | air | 72.0 | 0.94 | 0.01 | 0.18 | 0.87 | 37.4 | 3.95 | — | — |
| RED-KS-1 | red | submarine | 14.7 | 5.51 | 2.63 | 0.46 | 3.34 | 51.9 | 2.81 | 76.7 | 67.3 |
| RED-KSN | red | submarine | 28.0 | 8.87 | 3.12 | 0.48 | 5.71 | 61.9 | 2.4 | — | 79.4 |
| RED-MPRA-K1 | red | air | 56.7 | 3.08 | 0.61 | 0.48 | 1.77 | 49.1 | 1.87 | — | 97.0 |
| RED-MPRA-K2 | red | air | 54.7 | 2.01 | 0.77 | 0.29 | 1.43 | 46.3 | 1.77 | — | 96.8 |
| RED-OPSESP-1 | red | surface | 72.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.1 | 3.67 | 0.0 | 0.09 | 71.4 | 0.0 | — | 96.9 |

### Somente vitória decisiva

- Partidas: **79**
- Taxa de vitória: blue=70.9%, red=29.1%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.47 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.05, red=64.67
- Unidades perdidas em média: blue=6.1, red=6.58

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 2.01 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.37 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.61 | 0.37 | 0.19 | 0.66 | 46.2 | 3.7 | 86.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 7.08 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.09 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.58 | 0.0 | 0.61 | 2.59 | 48.3 | 3.44 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.65 | 0.0 | 0.43 | 2.04 | 48.4 | 3.52 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.25 | 0.0 | 0.05 | 0.32 | 44.0 | 0.67 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.0 | 0.03 | 100.0 | 1.33 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 63.3 | 0.0 | 3.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 63.3 | 0.0 | 3.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 59.5 | 0.0 | 3.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.2 | 0.0 | 2.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 83.5 | 0.0 | 1.09 | 0.0 | 0.0 | — | 4.78 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 60.8 | 0.0 | 2.09 | 0.0 | 0.0 | — | 4.08 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 94.9 | 0.34 | 0.16 | 0.06 | 0.38 | 40.0 | 1.54 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 100.0 | 0.46 | 0.03 | 0.11 | 0.37 | 62.1 | 1.56 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 82.3 | 0.18 | 0.66 | 0.03 | 0.27 | 47.6 | 5.15 | 90.1 | 89.2 |
| BLUE-PAT-C2 | blue | surface | 65.8 | 0.27 | 1.51 | 0.01 | 0.41 | 56.2 | 4.48 | 84.2 | 82.9 |
| BLUE-PAT-O1 | blue | surface | 21.5 | 3.52 | 4.63 | 0.35 | 3.27 | 42.6 | 2.49 | 84.7 | 82.3 |
| BLUE-PAT-O2 | blue | surface | 83.5 | 3.42 | 1.1 | 0.58 | 3.9 | 40.6 | 5.72 | 61.3 | 83.5 |
| BLUE-PORTO-ACU | blue | land | 97.5 | 0.0 | 0.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 45.6 | 0.0 | 14.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 74.7 | 0.0 | 9.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 93.7 | 0.0 | 3.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 77.2 | 3.77 | 1.53 | 0.61 | 3.52 | 47.8 | 4.32 | 91.7 | 93.4 |
| BLUE-SAG-S1 | blue | surface | 73.4 | 4.68 | 4.05 | 0.65 | 4.2 | 45.8 | 5.05 | 68.9 | 97.3 |
| BLUE-SAG-S2 | blue | surface | 88.6 | 5.43 | 2.01 | 0.96 | 4.46 | 48.3 | 5.95 | 61.4 | 97.1 |
| BLUE-SUB-1 | blue | submarine | 70.9 | 5.68 | 1.04 | 0.71 | 4.92 | 57.1 | 5.61 | 87.0 | 60.0 |
| BLUE-SUB-2 | blue | submarine | 83.5 | 1.95 | 0.54 | 0.32 | 1.97 | 53.2 | 6.24 | 70.0 | 86.2 |
| BLUE-SUB-3 | blue | submarine | 87.3 | 1.58 | 0.33 | 0.14 | 1.23 | 60.8 | 4.89 | 91.4 | 85.8 |
| BLUE-SUB-N | blue | submarine | 46.8 | 6.65 | 2.25 | 0.76 | 6.03 | 46.4 | 3.73 | — | 75.2 |
| RED-AKE | red | surface | 43.0 | 0.0 | 4.33 | 0.0 | 0.0 | — | 7.24 | 97.2 | — |
| RED-AOR-G | red | surface | 39.2 | 0.0 | 2.91 | 0.0 | 0.0 | — | 4.72 | 99.4 | — |
| RED-AWACS-K | red | air | 46.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.7 | — | — |
| RED-GANF | red | surface | 96.2 | 0.01 | 2.25 | 0.0 | 0.03 | 50.0 | 0.0 | 74.3 | — |
| RED-GBPA | red | surface | 46.8 | 1.68 | 4.52 | 0.33 | 1.73 | 48.9 | 0.0 | — | 95.3 |
| RED-GE-1 | red | surface | 79.7 | 17.52 | 4.61 | 1.23 | 10.47 | 64.4 | 3.0 | 88.8 | 78.2 |
| RED-GE-2 | red | surface | 59.5 | 13.59 | 6.61 | 0.92 | 8.77 | 61.3 | 3.49 | 83.8 | 69.8 |
| RED-GE-3 | red | surface | 51.9 | 3.61 | 5.58 | 0.53 | 3.32 | 55.0 | 4.14 | 78.7 | 71.1 |
| RED-GLOG | red | surface | 54.4 | 0.0 | 3.66 | 0.0 | 0.0 | — | 7.58 | 99.0 | — |
| RED-KMF-1 | red | air | 46.8 | 1.8 | 0.09 | 0.37 | 1.85 | 36.3 | 6.58 | — | — |
| RED-KMF-2 | red | air | 46.8 | 1.67 | 0.01 | 0.29 | 1.47 | 37.9 | 6.63 | — | — |
| RED-KS-1 | red | submarine | 25.3 | 7.15 | 2.46 | 0.66 | 4.28 | 53.6 | 3.38 | 71.9 | 57.5 |
| RED-KSN | red | submarine | 16.5 | 9.28 | 3.67 | 0.54 | 5.91 | 62.5 | 2.8 | — | 78.3 |
| RED-MPRA-K1 | red | air | 19.0 | 4.92 | 1.13 | 0.76 | 2.9 | 48.5 | 3.13 | — | 94.3 |
| RED-MPRA-K2 | red | air | 16.5 | 3.32 | 1.41 | 0.47 | 2.42 | 46.1 | 3.22 | — | 93.9 |
| RED-OPSESP-1 | red | surface | 46.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.11 | 3.82 | 0.0 | 0.1 | 62.5 | 0.0 | — | 96.6 |

## Blue: Ofensiva / Dividida × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=85.3%, red=14.7%
- Motivo de conclusão: victory=41.3%, timeout=58.7%
- Duração média: 13.13 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.81, red=49.83
- Unidades perdidas em média: blue=4.27, red=5.36

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.9 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.59 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.27 | 0.38 | 0.09 | 0.32 | 58.3 | 2.31 | 89.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 66.7 | 3.93 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 3.88 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.35 | 0.0 | 0.54 | 2.17 | 50.2 | 2.34 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.14 | 0.0 | 0.35 | 1.67 | 53.4 | 2.27 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.57 | 0.07 | 0.08 | 0.43 | 68.8 | 0.3 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.07 | 0.01 | 0.01 | 0.09 | 38.5 | 0.59 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 72.0 | 0.0 | 2.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 77.3 | 0.0 | 2.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 78.0 | 0.0 | 2.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 82.7 | 0.0 | 1.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 92.0 | 0.0 | 0.46 | 0.0 | 0.0 | — | 3.43 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 78.7 | 0.0 | 1.08 | 0.0 | 0.0 | — | 2.34 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 87.3 | 0.4 | 0.43 | 0.11 | 0.37 | 50.0 | 2.09 | — | 98.4 |
| BLUE-MPRA-2 | blue | air | 96.0 | 0.51 | 0.18 | 0.12 | 0.3 | 66.7 | 2.17 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 93.3 | 0.11 | 0.32 | 0.02 | 0.16 | 54.2 | 2.58 | 90.1 | 93.7 |
| BLUE-PAT-C2 | blue | surface | 83.3 | 0.43 | 0.81 | 0.05 | 0.45 | 51.5 | 2.3 | 89.1 | 76.0 |
| BLUE-PAT-O1 | blue | surface | 48.7 | 2.39 | 2.93 | 0.21 | 2.6 | 39.5 | 1.71 | 88.5 | 88.8 |
| BLUE-PAT-O2 | blue | surface | 94.7 | 2.39 | 0.4 | 0.49 | 2.31 | 47.1 | 3.53 | 38.3 | 80.0 |
| BLUE-PORTO-ACU | blue | land | 92.0 | 0.0 | 1.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 48.0 | 0.0 | 13.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 86.0 | 0.0 | 5.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 80.0 | 0.0 | 5.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.3 | 2.83 | 0.87 | 0.47 | 2.71 | 52.5 | 2.29 | 94.4 | 96.2 |
| BLUE-SAG-S1 | blue | surface | 83.3 | 2.33 | 2.73 | 0.39 | 2.55 | 43.2 | 2.37 | 41.6 | 98.0 |
| BLUE-SAG-S2 | blue | surface | 93.3 | 3.47 | 1.24 | 0.68 | 3.23 | 47.1 | 3.19 | 39.1 | 98.5 |
| BLUE-SUB-1 | blue | submarine | 76.7 | 4.06 | 0.81 | 0.55 | 4.01 | 52.2 | 2.87 | 85.8 | 73.2 |
| BLUE-SUB-2 | blue | submarine | 95.3 | 2.29 | 0.2 | 0.56 | 2.19 | 52.1 | 3.51 | 39.1 | 91.9 |
| BLUE-SUB-3 | blue | submarine | 93.3 | 0.59 | 0.2 | 0.08 | 0.7 | 46.7 | 2.51 | 93.0 | 92.4 |
| BLUE-SUB-N | blue | submarine | 59.3 | 5.61 | 1.73 | 0.56 | 5.11 | 46.7 | 1.95 | — | 78.6 |
| RED-AKE | red | surface | 74.0 | 0.0 | 2.18 | 0.0 | 0.0 | — | 8.01 | 98.5 | — |
| RED-AOR-G | red | surface | 56.0 | 0.0 | 2.13 | 0.0 | 0.0 | — | 5.27 | 99.4 | — |
| RED-AWACS-K | red | air | 78.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.01 | — | — |
| RED-GANF | red | surface | 99.3 | 0.04 | 0.7 | 0.01 | 0.05 | 85.7 | 0.0 | 82.0 | — |
| RED-GBPA | red | surface | 78.7 | 1.31 | 1.79 | 0.26 | 1.16 | 52.3 | 0.0 | — | 97.3 |
| RED-GE-1 | red | surface | 60.0 | 14.23 | 6.63 | 0.93 | 9.66 | 63.4 | 3.68 | 90.0 | 80.7 |
| RED-GE-2 | red | surface | 50.0 | 10.86 | 6.79 | 0.8 | 7.4 | 59.4 | 3.71 | 83.6 | 75.8 |
| RED-GE-3 | red | surface | 72.0 | 1.39 | 3.13 | 0.22 | 1.47 | 55.7 | 2.12 | 88.4 | 87.9 |
| RED-GLOG | red | surface | 81.3 | 0.0 | 1.43 | 0.0 | 0.0 | — | 7.87 | 99.6 | — |
| RED-KMF-1 | red | air | 78.7 | 1.41 | 0.0 | 0.22 | 1.23 | 44.3 | 4.31 | — | — |
| RED-KMF-2 | red | air | 78.7 | 0.65 | 0.0 | 0.11 | 1.05 | 28.0 | 4.41 | — | — |
| RED-KS-1 | red | submarine | 11.3 | 5.16 | 2.87 | 0.43 | 3.16 | 46.6 | 2.73 | 78.8 | 68.7 |
| RED-KSN | red | submarine | 26.0 | 9.99 | 3.2 | 0.62 | 6.17 | 62.8 | 2.57 | — | 78.0 |
| RED-MPRA-K1 | red | air | 60.7 | 2.49 | 0.66 | 0.36 | 1.48 | 47.7 | 1.26 | — | 98.0 |
| RED-MPRA-K2 | red | air | 63.3 | 2.13 | 0.77 | 0.3 | 1.41 | 43.1 | 1.97 | — | 97.8 |
| RED-OPSESP-1 | red | surface | 78.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.18 | 3.53 | 0.01 | 0.13 | 73.7 | 0.0 | — | 95.8 |

### Somente vitória decisiva

- Partidas: **62**
- Taxa de vitória: blue=64.5%, red=35.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.23 turnos
- Dano médio causado por equipe (pontos de HP): blue=44.53, red=66.1
- Unidades perdidas em média: blue=6.16, red=6.52

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.29 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.8 | 0.63 | 0.5 | 0.19 | 0.71 | 59.1 | 4.1 | 86.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.02 | 0.05 | 66.7 | 6.73 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 6.65 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 2.94 | 0.0 | 0.53 | 1.94 | 40.8 | 3.81 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 1.98 | 0.0 | 0.26 | 1.45 | 47.8 | 3.65 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.34 | 0.0 | 0.06 | 0.4 | 52.0 | 0.65 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.16 | 0.0 | 0.02 | 0.21 | 38.5 | 1.29 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 54.8 | 0.0 | 3.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 56.5 | 0.0 | 3.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 56.5 | 0.0 | 3.76 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.6 | 0.0 | 2.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 87.1 | 0.0 | 0.74 | 0.0 | 0.0 | — | 4.55 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 67.7 | 0.0 | 1.74 | 0.0 | 0.0 | — | 4.56 | 99.2 | — |
| BLUE-MPRA-1 | blue | air | 91.9 | 0.23 | 0.18 | 0.11 | 0.42 | 42.3 | 2.08 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.9 | 0.53 | 0.34 | 0.15 | 0.39 | 62.5 | 2.18 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 85.5 | 0.24 | 0.69 | 0.05 | 0.37 | 52.2 | 4.95 | 83.3 | 86.3 |
| BLUE-PAT-C2 | blue | surface | 74.2 | 0.45 | 1.19 | 0.06 | 0.53 | 48.5 | 4.42 | 83.9 | 76.6 |
| BLUE-PAT-O1 | blue | surface | 25.8 | 3.29 | 4.26 | 0.24 | 3.95 | 37.6 | 2.68 | 92.3 | 80.6 |
| BLUE-PAT-O2 | blue | surface | 93.5 | 4.23 | 0.44 | 0.71 | 3.97 | 45.9 | 5.52 | 58.9 | 79.4 |
| BLUE-PORTO-ACU | blue | land | 96.8 | 0.0 | 0.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 37.1 | 0.0 | 15.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 72.6 | 0.0 | 9.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 95.2 | 0.0 | 3.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 75.8 | 3.97 | 1.63 | 0.71 | 4.08 | 51.4 | 3.95 | 92.5 | 92.3 |
| BLUE-SAG-S1 | blue | surface | 64.5 | 3.84 | 4.81 | 0.6 | 4.15 | 42.4 | 4.4 | 64.0 | 97.0 |
| BLUE-SAG-S2 | blue | surface | 91.9 | 5.37 | 1.94 | 0.85 | 4.89 | 46.9 | 5.69 | 61.0 | 96.6 |
| BLUE-SUB-1 | blue | submarine | 72.6 | 4.39 | 0.94 | 0.61 | 4.89 | 49.2 | 5.47 | 88.6 | 64.5 |
| BLUE-SUB-2 | blue | submarine | 90.3 | 2.84 | 0.37 | 0.52 | 2.39 | 58.1 | 5.66 | 73.1 | 84.5 |
| BLUE-SUB-3 | blue | submarine | 85.5 | 0.98 | 0.44 | 0.15 | 1.29 | 45.0 | 4.52 | 93.5 | 85.7 |
| BLUE-SUB-N | blue | submarine | 46.8 | 8.1 | 2.23 | 0.68 | 6.56 | 49.6 | 3.68 | — | 73.7 |
| RED-AKE | red | surface | 56.5 | 0.0 | 3.5 | 0.0 | 0.0 | — | 7.16 | 97.5 | — |
| RED-AOR-G | red | surface | 37.1 | 0.0 | 3.13 | 0.0 | 0.0 | — | 4.58 | 99.5 | — |
| RED-AWACS-K | red | air | 48.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.85 | — | — |
| RED-GANF | red | surface | 98.4 | 0.1 | 1.58 | 0.02 | 0.11 | 85.7 | 0.0 | 84.7 | — |
| RED-GBPA | red | surface | 48.4 | 2.65 | 4.08 | 0.53 | 2.11 | 53.4 | 0.0 | — | 94.7 |
| RED-GE-1 | red | surface | 82.3 | 16.42 | 5.0 | 1.15 | 10.4 | 62.2 | 3.26 | 88.5 | 78.3 |
| RED-GE-2 | red | surface | 61.3 | 14.68 | 6.18 | 1.18 | 9.1 | 59.6 | 3.05 | 84.6 | 68.5 |
| RED-GE-3 | red | surface | 46.8 | 3.02 | 6.03 | 0.47 | 2.97 | 57.1 | 3.84 | 79.2 | 74.9 |
| RED-GLOG | red | surface | 69.4 | 0.0 | 2.37 | 0.0 | 0.0 | — | 7.42 | 99.5 | — |
| RED-KMF-1 | red | air | 48.4 | 2.61 | 0.0 | 0.35 | 2.45 | 44.1 | 6.63 | — | — |
| RED-KMF-2 | red | air | 48.4 | 1.44 | 0.0 | 0.21 | 2.15 | 27.8 | 6.81 | — | — |
| RED-KS-1 | red | submarine | 22.6 | 7.03 | 2.56 | 0.68 | 4.44 | 46.9 | 3.81 | 75.3 | 56.0 |
| RED-KSN | red | submarine | 16.1 | 10.55 | 3.73 | 0.5 | 6.24 | 64.1 | 2.85 | — | 76.7 |
| RED-MPRA-K1 | red | air | 16.1 | 3.76 | 1.19 | 0.58 | 2.55 | 42.4 | 2.74 | — | 95.2 |
| RED-MPRA-K2 | red | air | 19.4 | 3.55 | 1.55 | 0.48 | 2.31 | 42.7 | 3.31 | — | 94.6 |
| RED-OPSESP-1 | red | surface | 48.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.31 | 3.63 | 0.02 | 0.18 | 81.8 | 0.0 | — | 94.1 |

## Blue: Ofensiva / Dividida × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=82.7%, red=17.3%
- Motivo de conclusão: timeout=51.3%, victory=48.7%
- Duração média: 12.35 turnos
- Dano médio causado por equipe (pontos de HP): blue=30.6, red=60.73
- Unidades perdidas em média: blue=4.89, red=4.68

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.02 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.7 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.13 | 0.13 | 0.03 | 0.13 | 55.0 | 2.18 | 81.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.02 | 0.03 | 75.0 | 3.95 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 3.93 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.33 | 0.0 | 0.58 | 2.01 | 57.3 | 2.58 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.6 | 0.0 | 0.34 | 1.46 | 47.5 | 2.51 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.25 | 0.07 | 0.03 | 0.15 | 60.9 | 0.34 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 0.68 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 69.3 | 0.0 | 2.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 72.0 | 0.0 | 2.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 78.0 | 0.0 | 2.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 69.3 | 0.0 | 3.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.7 | 0.0 | 0.79 | 0.0 | 0.0 | — | 2.87 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 74.7 | 0.0 | 1.4 | 0.0 | 0.0 | — | 2.21 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 94.0 | 0.26 | 0.19 | 0.03 | 0.31 | 38.3 | 1.45 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 98.7 | 0.13 | 0.06 | 0.06 | 0.3 | 33.3 | 1.56 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 94.7 | 0.09 | 0.22 | 0.01 | 0.09 | 78.6 | 2.63 | 89.3 | 96.0 |
| BLUE-PAT-C2 | blue | surface | 81.3 | 0.18 | 0.96 | 0.01 | 0.27 | 52.5 | 2.39 | 89.3 | 87.3 |
| BLUE-PAT-O1 | blue | surface | 64.0 | 3.1 | 2.17 | 0.33 | 2.85 | 44.4 | 2.05 | 89.5 | 91.5 |
| BLUE-PAT-O2 | blue | surface | 90.7 | 2.44 | 0.77 | 0.49 | 2.23 | 50.3 | 3.57 | 36.1 | 83.8 |
| BLUE-PORTO-ACU | blue | land | 81.3 | 0.0 | 3.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 21.3 | 0.0 | 18.11 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.34 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 54.0 | 0.0 | 10.81 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 1.45 | 0.91 | 0.24 | 1.57 | 40.7 | 2.29 | 94.7 | 98.3 |
| BLUE-SAG-S1 | blue | surface | 78.7 | 2.43 | 3.35 | 0.37 | 2.13 | 48.4 | 2.53 | 38.3 | 97.9 |
| BLUE-SAG-S2 | blue | surface | 96.0 | 3.19 | 1.06 | 0.69 | 2.65 | 46.7 | 3.25 | 32.6 | 99.1 |
| BLUE-SUB-1 | blue | submarine | 78.7 | 3.07 | 0.71 | 0.43 | 2.77 | 56.4 | 3.19 | 89.4 | 78.2 |
| BLUE-SUB-2 | blue | submarine | 92.7 | 2.0 | 0.26 | 0.55 | 2.27 | 52.6 | 3.67 | 43.3 | 94.1 |
| BLUE-SUB-3 | blue | submarine | 96.0 | 0.41 | 0.18 | 0.07 | 0.45 | 64.7 | 2.64 | 93.4 | 95.2 |
| BLUE-SUB-N | blue | submarine | 59.3 | 4.51 | 1.87 | 0.39 | 4.43 | 44.9 | 2.05 | — | 83.5 |
| RED-AKE | red | surface | 54.0 | 0.0 | 3.67 | 0.0 | 0.0 | — | 7.57 | 97.5 | — |
| RED-AOR-G | red | surface | 66.0 | 0.0 | 1.68 | 0.0 | 0.0 | — | 3.85 | 99.3 | — |
| RED-AWACS-K | red | air | 68.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.07 | — | — |
| RED-GANF | red | surface | 97.3 | 0.03 | 1.48 | 0.0 | 0.04 | 66.7 | 0.0 | 78.6 | — |
| RED-GBPA | red | surface | 68.7 | 1.03 | 2.3 | 0.17 | 1.19 | 46.6 | 0.0 | — | 96.8 |
| RED-GE-1 | red | surface | 86.0 | 17.41 | 2.42 | 1.06 | 11.91 | 65.2 | 1.63 | 88.7 | 75.6 |
| RED-GE-2 | red | surface | 77.3 | 13.25 | 3.67 | 0.9 | 8.49 | 61.1 | 2.22 | 85.8 | 70.3 |
| RED-GE-3 | red | surface | 72.0 | 1.56 | 3.35 | 0.19 | 1.79 | 51.9 | 2.3 | 81.8 | 84.3 |
| RED-GLOG | red | surface | 69.3 | 0.0 | 2.45 | 0.0 | 0.0 | — | 7.07 | 99.5 | — |
| RED-KMF-1 | red | air | 68.7 | 0.78 | 0.0 | 0.12 | 1.11 | 31.3 | 3.97 | — | — |
| RED-KMF-2 | red | air | 68.7 | 1.03 | 0.0 | 0.15 | 1.0 | 38.7 | 4.07 | — | — |
| RED-KS-1 | red | submarine | 35.3 | 7.35 | 2.08 | 0.63 | 4.44 | 51.7 | 1.97 | 65.3 | 57.4 |
| RED-KSN | red | submarine | 44.0 | 13.4 | 2.56 | 0.92 | 7.98 | 65.2 | 1.86 | — | 71.8 |
| RED-MPRA-K1 | red | air | 55.3 | 2.35 | 0.69 | 0.36 | 1.57 | 40.4 | 2.16 | — | 97.4 |
| RED-MPRA-K2 | red | air | 53.3 | 2.51 | 0.8 | 0.39 | 1.42 | 49.3 | 1.77 | — | 97.3 |
| RED-OPSESP-1 | red | surface | 68.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.05 | 3.46 | 0.0 | 0.05 | 50.0 | 0.0 | — | 98.2 |

### Somente vitória decisiva

- Partidas: **73**
- Taxa de vitória: blue=64.4%, red=35.6%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.38 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.64, red=69.95
- Unidades perdidas em média: blue=6.14, red=5.95

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.97 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.36 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.27 | 0.16 | 0.07 | 0.26 | 57.9 | 3.99 | 77.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.04 | 0.05 | 75.0 | 6.73 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 6.67 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.23 | 0.0 | 0.63 | 2.37 | 54.9 | 4.01 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.82 | 0.0 | 0.41 | 1.75 | 47.7 | 3.85 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.38 | 0.0 | 0.05 | 0.26 | 57.9 | 0.66 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 100.0 | 1.32 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 54.8 | 0.0 | 4.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 61.6 | 0.0 | 3.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.6 | 0.0 | 4.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 56.2 | 0.0 | 3.96 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 76.7 | 0.0 | 1.41 | 0.0 | 0.0 | — | 4.37 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 61.6 | 0.0 | 2.03 | 0.0 | 0.0 | — | 3.9 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 87.7 | 0.48 | 0.4 | 0.04 | 0.58 | 38.1 | 2.25 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 97.3 | 0.23 | 0.11 | 0.12 | 0.56 | 31.7 | 2.38 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 91.8 | 0.18 | 0.3 | 0.01 | 0.19 | 78.6 | 4.89 | 81.5 | 91.8 |
| BLUE-PAT-C2 | blue | surface | 68.5 | 0.3 | 1.68 | 0.03 | 0.45 | 51.5 | 4.55 | 81.1 | 82.2 |
| BLUE-PAT-O1 | blue | surface | 43.8 | 4.41 | 3.45 | 0.48 | 3.99 | 44.7 | 2.81 | 89.3 | 86.0 |
| BLUE-PAT-O2 | blue | surface | 84.9 | 3.78 | 1.16 | 0.6 | 3.41 | 45.8 | 5.18 | 60.5 | 85.3 |
| BLUE-PORTO-ACU | blue | land | 93.2 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 20.5 | 0.0 | 18.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 64.4 | 0.0 | 10.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 71.2 | 2.44 | 1.67 | 0.44 | 2.34 | 44.4 | 3.99 | 91.0 | 96.7 |
| BLUE-SAG-S1 | blue | surface | 72.6 | 4.52 | 4.42 | 0.67 | 4.01 | 47.1 | 4.79 | 57.3 | 95.8 |
| BLUE-SAG-S2 | blue | surface | 95.9 | 4.64 | 1.68 | 0.86 | 3.86 | 45.4 | 5.78 | 54.1 | 98.1 |
| BLUE-SUB-1 | blue | submarine | 75.3 | 4.82 | 0.92 | 0.62 | 4.32 | 54.9 | 5.23 | 89.2 | 67.5 |
| BLUE-SUB-2 | blue | submarine | 95.9 | 1.51 | 0.15 | 0.37 | 1.82 | 54.9 | 5.6 | 69.8 | 90.4 |
| BLUE-SUB-3 | blue | submarine | 95.9 | 0.74 | 0.16 | 0.11 | 0.77 | 67.9 | 4.82 | 91.0 | 91.8 |
| BLUE-SUB-N | blue | submarine | 54.8 | 4.77 | 2.11 | 0.38 | 5.42 | 43.4 | 3.49 | — | 79.8 |
| RED-AKE | red | surface | 39.7 | 0.0 | 4.33 | 0.0 | 0.0 | — | 6.95 | 97.7 | — |
| RED-AOR-G | red | surface | 45.2 | 0.0 | 2.66 | 0.0 | 0.0 | — | 3.3 | 98.9 | — |
| RED-AWACS-K | red | air | 37.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.03 | — | — |
| RED-GANF | red | surface | 94.5 | 0.05 | 3.03 | 0.0 | 0.08 | 66.7 | 0.0 | 80.6 | — |
| RED-GBPA | red | surface | 37.0 | 1.58 | 4.53 | 0.23 | 2.01 | 44.2 | 0.0 | — | 93.4 |
| RED-GE-1 | red | surface | 97.3 | 16.27 | 1.04 | 0.99 | 11.0 | 64.9 | 0.97 | 87.3 | 77.4 |
| RED-GE-2 | red | surface | 82.2 | 15.64 | 4.07 | 1.16 | 9.4 | 60.8 | 2.22 | 83.4 | 66.0 |
| RED-GE-3 | red | surface | 49.3 | 3.12 | 6.04 | 0.37 | 3.33 | 54.7 | 3.74 | 75.1 | 69.6 |
| RED-GLOG | red | surface | 50.7 | 0.0 | 3.77 | 0.0 | 0.0 | — | 6.71 | 99.2 | — |
| RED-KMF-1 | red | air | 37.0 | 1.49 | 0.0 | 0.25 | 2.07 | 31.8 | 5.86 | — | — |
| RED-KMF-2 | red | air | 37.0 | 1.9 | 0.0 | 0.3 | 1.85 | 36.3 | 6.03 | — | — |
| RED-KS-1 | red | submarine | 57.5 | 8.97 | 1.26 | 0.84 | 5.05 | 53.9 | 2.58 | 60.5 | 49.7 |
| RED-KSN | red | submarine | 26.0 | 12.82 | 3.36 | 0.79 | 7.38 | 65.7 | 2.11 | — | 72.6 |
| RED-MPRA-K1 | red | air | 13.7 | 3.82 | 1.23 | 0.58 | 2.64 | 38.3 | 3.03 | — | 94.7 |
| RED-MPRA-K2 | red | air | 13.7 | 4.21 | 1.34 | 0.63 | 2.6 | 47.9 | 3.38 | — | 94.5 |
| RED-OPSESP-1 | red | surface | 37.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.05 | 3.99 | 0.0 | 0.05 | 75.0 | 0.0 | — | 98.2 |

## Blue: Ofensiva / Dividida × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=76.0%, red=24.0%
- Motivo de conclusão: victory=53.3%, timeout=46.7%
- Duração média: 12.19 turnos
- Dano médio causado por equipe (pontos de HP): blue=33.61, red=59.17
- Unidades perdidas em média: blue=4.91, red=5.1

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.92 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.59 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.05 | 0.25 | 0.01 | 0.1 | 53.3 | 1.87 | 84.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 33.3 | 3.37 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 3.4 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.73 | 0.0 | 0.7 | 2.24 | 56.2 | 2.21 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.14 | 0.0 | 0.38 | 1.6 | 53.3 | 2.24 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.12 | 0.07 | 0.01 | 0.13 | 45.0 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 0.6 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 66.0 | 0.0 | 2.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.7 | 0.0 | 2.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.0 | 0.0 | 2.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 69.3 | 0.0 | 2.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.0 | 0.0 | 0.78 | 0.0 | 0.0 | — | 2.05 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 73.3 | 0.0 | 1.49 | 0.0 | 0.0 | — | 1.88 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 97.3 | 0.33 | 0.07 | 0.08 | 0.35 | 42.3 | 1.53 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 98.7 | 0.19 | 0.07 | 0.03 | 0.25 | 37.8 | 1.52 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 95.3 | 0.09 | 0.27 | 0.01 | 0.12 | 55.6 | 2.29 | 86.6 | 94.7 |
| BLUE-PAT-C2 | blue | surface | 82.0 | 0.41 | 0.8 | 0.03 | 0.35 | 66.0 | 2.21 | 88.4 | 85.3 |
| BLUE-PAT-O1 | blue | surface | 56.0 | 3.81 | 2.69 | 0.35 | 3.35 | 42.7 | 2.01 | 84.8 | 89.0 |
| BLUE-PAT-O2 | blue | surface | 92.7 | 2.61 | 0.48 | 0.57 | 2.09 | 54.0 | 2.87 | 28.0 | 88.8 |
| BLUE-PORTO-ACU | blue | land | 83.3 | 0.0 | 3.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 25.3 | 0.0 | 17.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 59.3 | 0.0 | 9.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 85.3 | 1.81 | 0.94 | 0.26 | 1.85 | 43.5 | 1.92 | 94.2 | 98.4 |
| BLUE-SAG-S1 | blue | surface | 82.0 | 2.06 | 3.15 | 0.34 | 2.13 | 42.0 | 2.17 | 28.8 | 99.4 |
| BLUE-SAG-S2 | blue | surface | 95.3 | 3.01 | 0.94 | 0.62 | 2.54 | 48.0 | 2.81 | 24.9 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 3.41 | 0.68 | 0.51 | 2.71 | 58.2 | 3.02 | 87.4 | 79.0 |
| BLUE-SUB-2 | blue | submarine | 96.0 | 2.01 | 0.19 | 0.54 | 2.03 | 52.3 | 3.14 | 35.9 | 96.0 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 0.42 | 0.11 | 0.06 | 0.42 | 47.6 | 2.3 | 93.1 | 96.0 |
| BLUE-SUB-N | blue | submarine | 55.3 | 5.39 | 1.99 | 0.57 | 4.53 | 47.8 | 1.88 | — | 82.4 |
| RED-AKE | red | surface | 59.3 | 0.0 | 3.51 | 0.0 | 0.0 | — | 7.88 | 97.5 | — |
| RED-AOR-G | red | surface | 55.3 | 0.0 | 2.17 | 0.0 | 0.0 | — | 4.05 | 99.3 | — |
| RED-AWACS-K | red | air | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.98 | — | — |
| RED-GANF | red | surface | 99.3 | 0.05 | 0.99 | 0.01 | 0.09 | 61.5 | 0.0 | 71.7 | — |
| RED-GBPA | red | surface | 73.3 | 0.85 | 1.91 | 0.15 | 1.01 | 49.0 | 0.0 | — | 98.2 |
| RED-GE-1 | red | surface | 76.7 | 18.21 | 3.87 | 1.2 | 11.48 | 66.0 | 2.47 | 85.3 | 75.8 |
| RED-GE-2 | red | surface | 78.0 | 11.52 | 3.6 | 0.83 | 7.99 | 61.1 | 2.45 | 82.5 | 72.5 |
| RED-GE-3 | red | surface | 68.0 | 2.11 | 3.83 | 0.28 | 1.85 | 56.8 | 2.37 | 80.3 | 83.2 |
| RED-GLOG | red | surface | 67.3 | 0.0 | 2.81 | 0.0 | 0.0 | — | 7.49 | 99.3 | — |
| RED-KMF-1 | red | air | 73.3 | 0.83 | 0.01 | 0.09 | 0.9 | 36.3 | 5.15 | — | — |
| RED-KMF-2 | red | air | 73.3 | 0.9 | 0.01 | 0.17 | 0.81 | 38.0 | 4.97 | — | — |
| RED-KS-1 | red | submarine | 39.3 | 6.85 | 1.99 | 0.6 | 4.33 | 51.3 | 1.94 | 60.6 | 58.6 |
| RED-KSN | red | submarine | 34.7 | 13.87 | 2.96 | 0.98 | 8.55 | 62.2 | 2.41 | — | 70.2 |
| RED-MPRA-K1 | red | air | 48.7 | 2.19 | 1.1 | 0.31 | 1.35 | 45.5 | 1.38 | — | 96.2 |
| RED-MPRA-K2 | red | air | 47.3 | 1.71 | 1.17 | 0.28 | 1.04 | 47.4 | 1.25 | — | 98.0 |
| RED-OPSESP-1 | red | surface | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.69 | 0.01 | 0.03 | 60.0 | 0.0 | — | 98.9 |

### Somente vitória decisiva

- Partidas: **80**
- Taxa de vitória: blue=55.0%, red=45.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.1 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.61, red=71.61
- Unidades perdidas em média: blue=6.25, red=6.21

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.61 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.04 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.2 | 0.1 | 0.47 | 0.03 | 0.19 | 53.3 | 3.09 | 76.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.04 | 33.3 | 4.99 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.03 | 100.0 | 5.14 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.38 | 0.0 | 0.7 | 2.38 | 54.2 | 3.04 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.16 | 0.0 | 0.41 | 1.71 | 49.6 | 3.08 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.11 | 33.3 | 0.54 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.01 | 100.0 | 1.05 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 52.5 | 0.0 | 3.98 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 56.2 | 0.0 | 3.98 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 55.0 | 0.0 | 4.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 53.8 | 0.0 | 3.94 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 78.8 | 0.0 | 1.26 | 0.0 | 0.0 | — | 3.49 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 61.2 | 0.0 | 2.23 | 0.0 | 0.0 | — | 3.26 | 99.2 | — |
| BLUE-MPRA-1 | blue | air | 95.0 | 0.55 | 0.14 | 0.14 | 0.62 | 42.0 | 1.76 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 97.5 | 0.35 | 0.12 | 0.06 | 0.45 | 38.9 | 1.76 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 91.2 | 0.16 | 0.5 | 0.01 | 0.23 | 55.6 | 3.86 | 79.8 | 90.0 |
| BLUE-PAT-C2 | blue | surface | 71.2 | 0.54 | 1.24 | 0.06 | 0.46 | 64.9 | 3.77 | 80.8 | 81.2 |
| BLUE-PAT-O1 | blue | surface | 36.2 | 4.16 | 3.98 | 0.38 | 4.16 | 39.3 | 2.59 | 77.6 | 82.8 |
| BLUE-PAT-O2 | blue | surface | 93.8 | 3.52 | 0.36 | 0.61 | 2.88 | 48.7 | 4.15 | 48.5 | 90.6 |
| BLUE-PORTO-ACU | blue | land | 90.0 | 0.0 | 3.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 15.0 | 0.0 | 19.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 60.0 | 0.0 | 10.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 75.0 | 2.69 | 1.61 | 0.42 | 2.33 | 51.6 | 3.26 | 91.9 | 97.2 |
| BLUE-SAG-S1 | blue | surface | 77.5 | 3.39 | 3.7 | 0.57 | 3.52 | 41.5 | 3.73 | 46.0 | 99.0 |
| BLUE-SAG-S2 | blue | surface | 93.8 | 4.46 | 1.39 | 0.93 | 3.71 | 48.1 | 4.62 | 43.0 | 98.6 |
| BLUE-SUB-1 | blue | submarine | 76.2 | 4.84 | 0.84 | 0.75 | 4.01 | 57.3 | 4.39 | 87.7 | 71.9 |
| BLUE-SUB-2 | blue | submarine | 98.8 | 1.61 | 0.09 | 0.4 | 1.75 | 47.9 | 4.58 | 58.3 | 94.1 |
| BLUE-SUB-3 | blue | submarine | 96.2 | 0.6 | 0.14 | 0.09 | 0.61 | 46.9 | 3.77 | 93.4 | 94.4 |
| BLUE-SUB-N | blue | submarine | 53.8 | 5.99 | 2.06 | 0.6 | 4.78 | 48.7 | 2.98 | — | 79.7 |
| RED-AKE | red | surface | 52.5 | 0.0 | 3.75 | 0.0 | 0.0 | — | 7.86 | 97.0 | — |
| RED-AOR-G | red | surface | 32.5 | 0.0 | 3.26 | 0.0 | 0.0 | — | 3.6 | 98.9 | — |
| RED-AWACS-K | red | air | 50.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.16 | — | — |
| RED-GANF | red | surface | 98.8 | 0.1 | 1.71 | 0.01 | 0.16 | 61.5 | 0.0 | 80.8 | — |
| RED-GBPA | red | surface | 50.0 | 1.38 | 3.45 | 0.24 | 1.51 | 50.4 | 0.0 | — | 96.9 |
| RED-GE-1 | red | surface | 88.8 | 20.26 | 2.45 | 1.34 | 12.34 | 67.0 | 1.89 | 85.3 | 73.1 |
| RED-GE-2 | red | surface | 87.5 | 13.51 | 3.02 | 1.05 | 9.51 | 59.5 | 1.69 | 87.6 | 66.7 |
| RED-GE-3 | red | surface | 45.0 | 3.64 | 6.56 | 0.49 | 3.2 | 55.9 | 3.79 | 77.7 | 70.5 |
| RED-GLOG | red | surface | 62.5 | 0.0 | 3.3 | 0.0 | 0.0 | — | 7.62 | 99.3 | — |
| RED-KMF-1 | red | air | 50.0 | 1.52 | 0.01 | 0.17 | 1.6 | 36.7 | 8.43 | — | — |
| RED-KMF-2 | red | air | 50.0 | 1.56 | 0.01 | 0.29 | 1.43 | 37.7 | 8.07 | — | — |
| RED-KS-1 | red | submarine | 50.0 | 7.91 | 1.66 | 0.76 | 4.69 | 54.7 | 2.38 | 63.7 | 53.9 |
| RED-KSN | red | submarine | 23.8 | 15.65 | 3.39 | 1.05 | 8.95 | 62.0 | 2.66 | — | 67.1 |
| RED-MPRA-K1 | red | air | 7.5 | 3.48 | 1.93 | 0.5 | 2.04 | 46.6 | 2.49 | — | 92.9 |
| RED-MPRA-K2 | red | air | 3.8 | 2.5 | 2.12 | 0.34 | 1.46 | 44.4 | 1.81 | — | 96.3 |
| RED-OPSESP-1 | red | surface | 50.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.1 | 3.98 | 0.01 | 0.04 | 66.7 | 0.0 | — | 98.8 |

## Blue: Defensiva / Concentrada × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=81.3%, red=18.7%
- Motivo de conclusão: timeout=61.3%, victory=38.7%
- Duração média: 13.9 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.06, red=55.54
- Unidades perdidas em média: blue=4.49, red=5.39

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.13 | 31.6 | 0.92 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.65 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.3 | 0.21 | 1.01 | 0.05 | 0.25 | 54.1 | 2.31 | 87.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.02 | 0.0 | 0.01 | 0.07 | 30.0 | 5.21 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.07 | 45.5 | 5.11 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.51 | 0.0 | 0.48 | 2.41 | 48.5 | 3.55 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.25 | 0.0 | 0.54 | 1.95 | 58.4 | 3.49 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.36 | 0.03 | 0.06 | 0.25 | 63.2 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.01 | 0.01 | 0.03 | 80.0 | 0.61 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 67.3 | 0.0 | 3.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 72.7 | 0.0 | 2.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 76.7 | 0.0 | 2.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 83.3 | 0.0 | 1.94 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 89.3 | 0.0 | 0.53 | 0.0 | 0.0 | — | 3.38 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 82.0 | 0.0 | 0.99 | 0.0 | 0.0 | — | 2.1 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.46 | 0.28 | 0.1 | 0.33 | 64.0 | 2.81 | — | 99.3 |
| BLUE-MPRA-2 | blue | air | 95.3 | 0.31 | 0.18 | 0.11 | 0.27 | 62.5 | 2.92 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 84.0 | 0.05 | 0.65 | 0.01 | 0.05 | 28.6 | 2.35 | 92.6 | 97.7 |
| BLUE-PAT-C2 | blue | surface | 78.7 | 0.25 | 0.84 | 0.02 | 0.19 | 69.0 | 2.09 | 92.1 | 89.7 |
| BLUE-PAT-O1 | blue | surface | 65.3 | 2.83 | 2.23 | 0.25 | 2.94 | 42.6 | 1.71 | 90.7 | 95.0 |
| BLUE-PAT-O2 | blue | surface | 94.7 | 2.16 | 0.39 | 0.43 | 1.94 | 51.2 | 3.07 | 38.8 | 84.3 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 2.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 36.0 | 0.0 | 15.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 82.7 | 0.0 | 5.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 67.3 | 0.0 | 7.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 85.3 | 2.82 | 0.82 | 0.47 | 2.81 | 46.7 | 2.08 | 93.2 | 97.0 |
| BLUE-SAG-S1 | blue | surface | 85.3 | 2.73 | 2.27 | 0.38 | 2.83 | 42.8 | 1.98 | 42.7 | 98.0 |
| BLUE-SAG-S2 | blue | surface | 92.0 | 3.05 | 1.2 | 0.76 | 3.07 | 46.1 | 2.89 | 42.5 | 99.3 |
| BLUE-SUB-1 | blue | submarine | 84.7 | 3.94 | 0.57 | 0.61 | 3.63 | 54.2 | 2.52 | 86.9 | 74.3 |
| BLUE-SUB-2 | blue | submarine | 93.3 | 2.1 | 0.25 | 0.53 | 2.17 | 55.1 | 3.56 | 33.8 | 92.6 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.67 | 0.22 | 0.09 | 0.53 | 52.5 | 2.67 | 90.2 | 94.2 |
| BLUE-SUB-N | blue | submarine | 74.0 | 5.18 | 1.15 | 0.45 | 4.3 | 51.3 | 1.58 | — | 80.6 |
| RED-AKE | red | surface | 66.0 | 0.0 | 2.93 | 0.0 | 0.0 | — | 7.5 | 97.8 | — |
| RED-AOR-G | red | surface | 62.7 | 0.0 | 1.66 | 0.0 | 0.0 | — | 4.88 | 99.4 | — |
| RED-AWACS-K | red | air | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.77 | — | — |
| RED-GANF | red | surface | 98.7 | 0.01 | 0.55 | 0.0 | 0.01 | 100.0 | 0.0 | 67.0 | — |
| RED-GBPA | red | surface | 95.3 | 0.56 | 0.57 | 0.11 | 0.83 | 43.5 | 0.0 | — | 98.9 |
| RED-GE-1 | red | surface | 59.3 | 17.83 | 6.26 | 1.13 | 11.61 | 63.8 | 3.05 | 89.5 | 75.4 |
| RED-GE-2 | red | surface | 44.0 | 12.33 | 6.95 | 0.83 | 8.0 | 63.2 | 3.4 | 83.5 | 72.6 |
| RED-GE-3 | red | surface | 70.7 | 1.17 | 3.49 | 0.15 | 1.07 | 57.5 | 2.21 | 85.4 | 90.9 |
| RED-GLOG | red | surface | 69.3 | 0.0 | 2.29 | 0.0 | 0.0 | — | 7.19 | 99.4 | — |
| RED-KMF-1 | red | air | 95.3 | 0.91 | 0.1 | 0.19 | 1.0 | 41.3 | 5.17 | — | — |
| RED-KMF-2 | red | air | 94.7 | 0.83 | 0.22 | 0.17 | 0.84 | 46.8 | 5.18 | — | — |
| RED-KS-1 | red | submarine | 10.0 | 4.84 | 2.77 | 0.4 | 3.04 | 49.8 | 2.71 | 75.6 | 70.5 |
| RED-KSN | red | submarine | 39.3 | 10.69 | 2.75 | 0.57 | 6.77 | 65.8 | 2.33 | — | 75.3 |
| RED-MPRA-K1 | red | air | 66.0 | 3.07 | 1.1 | 0.47 | 1.76 | 46.6 | 1.59 | — | 99.6 |
| RED-MPRA-K2 | red | air | 71.3 | 2.98 | 0.95 | 0.45 | 1.63 | 52.9 | 2.79 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.33 | 3.49 | 0.02 | 0.21 | 78.1 | 0.0 | — | 92.9 |

### Somente vitória decisiva

- Partidas: **58**
- Taxa de vitória: blue=51.7%, red=48.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.4 turnos
- Dano médio causado por equipe (pontos de HP): blue=51.38, red=72.14
- Unidades perdidas em média: blue=6.72, red=7.4

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.07 | 0.0 | 0.0 | 0.29 | 23.5 | 1.91 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.34 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 87.9 | 0.5 | 1.97 | 0.1 | 0.53 | 58.1 | 4.03 | 83.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.02 | 0.14 | 37.5 | 8.4 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.19 | 0.0 | 0.03 | 0.16 | 33.3 | 8.29 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.17 | 0.0 | 0.66 | 3.1 | 46.1 | 5.28 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.95 | 0.0 | 0.57 | 2.52 | 52.7 | 5.09 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.28 | 0.0 | 0.05 | 0.36 | 57.1 | 0.64 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.02 | 0.05 | 66.7 | 1.28 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 41.4 | 0.0 | 5.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 43.1 | 0.0 | 4.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 60.3 | 0.0 | 3.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 67.2 | 0.0 | 2.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 79.3 | 0.0 | 1.0 | 0.0 | 0.0 | — | 5.21 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 70.7 | 0.0 | 1.69 | 0.0 | 0.0 | — | 4.53 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 86.2 | 0.81 | 0.5 | 0.16 | 0.59 | 64.7 | 3.16 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 94.8 | 0.55 | 0.22 | 0.19 | 0.47 | 55.6 | 3.33 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 67.2 | 0.14 | 1.21 | 0.03 | 0.09 | 40.0 | 4.45 | 87.1 | 95.7 |
| BLUE-PAT-C2 | blue | surface | 53.4 | 0.16 | 1.57 | 0.02 | 0.1 | 66.7 | 3.84 | 89.7 | 94.8 |
| BLUE-PAT-O1 | blue | surface | 43.1 | 3.86 | 3.76 | 0.38 | 4.45 | 40.3 | 2.47 | 86.2 | 90.5 |
| BLUE-PAT-O2 | blue | surface | 91.4 | 3.41 | 0.69 | 0.69 | 2.88 | 47.9 | 4.16 | 59.5 | 90.5 |
| BLUE-PORTO-ACU | blue | land | 93.1 | 0.0 | 1.26 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 32.8 | 0.0 | 16.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 65.5 | 0.0 | 10.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 86.2 | 0.0 | 4.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 75.9 | 4.52 | 1.34 | 0.72 | 4.41 | 48.0 | 3.6 | 93.7 | 95.0 |
| BLUE-SAG-S1 | blue | surface | 75.9 | 5.69 | 3.62 | 0.69 | 5.53 | 43.3 | 3.66 | 63.6 | 95.9 |
| BLUE-SAG-S2 | blue | surface | 86.2 | 4.69 | 2.02 | 1.05 | 4.6 | 44.6 | 4.67 | 58.3 | 98.3 |
| BLUE-SUB-1 | blue | submarine | 81.0 | 5.53 | 0.66 | 0.9 | 5.07 | 53.1 | 4.03 | 82.8 | 59.9 |
| BLUE-SUB-2 | blue | submarine | 89.7 | 2.38 | 0.29 | 0.41 | 2.17 | 54.0 | 5.48 | 63.2 | 86.9 |
| BLUE-SUB-3 | blue | submarine | 94.8 | 1.26 | 0.28 | 0.16 | 0.93 | 50.0 | 4.55 | 86.5 | 89.7 |
| BLUE-SUB-N | blue | submarine | 60.3 | 7.14 | 1.71 | 0.55 | 5.83 | 52.7 | 3.14 | — | 74.1 |
| RED-AKE | red | surface | 41.4 | 0.0 | 4.78 | 0.0 | 0.0 | — | 7.1 | 96.8 | — |
| RED-AOR-G | red | surface | 34.5 | 0.0 | 2.9 | 0.0 | 0.0 | — | 4.74 | 99.0 | — |
| RED-AWACS-K | red | air | 87.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.14 | — | — |
| RED-GANF | red | surface | 96.6 | 0.03 | 1.41 | 0.0 | 0.03 | 100.0 | 0.0 | 57.8 | — |
| RED-GBPA | red | surface | 87.9 | 1.33 | 1.4 | 0.28 | 1.88 | 44.0 | 0.0 | — | 97.6 |
| RED-GE-1 | red | surface | 72.4 | 19.74 | 5.59 | 1.34 | 11.88 | 64.2 | 3.22 | 83.3 | 73.9 |
| RED-GE-2 | red | surface | 32.8 | 15.34 | 8.31 | 1.09 | 9.16 | 65.0 | 4.0 | 78.5 | 66.6 |
| RED-GE-3 | red | surface | 39.7 | 2.59 | 7.47 | 0.34 | 2.33 | 55.6 | 4.29 | 71.5 | 80.2 |
| RED-GLOG | red | surface | 37.9 | 0.0 | 4.5 | 0.0 | 0.0 | — | 7.17 | 98.8 | — |
| RED-KMF-1 | red | air | 87.9 | 1.95 | 0.17 | 0.41 | 2.14 | 42.7 | 7.81 | — | — |
| RED-KMF-2 | red | air | 86.2 | 1.81 | 0.4 | 0.4 | 1.81 | 47.6 | 7.9 | — | — |
| RED-KS-1 | red | submarine | 15.5 | 6.22 | 2.78 | 0.59 | 3.76 | 54.1 | 3.47 | 72.3 | 62.4 |
| RED-KSN | red | submarine | 29.3 | 12.02 | 3.34 | 0.71 | 6.95 | 69.2 | 3.14 | — | 74.0 |
| RED-MPRA-K1 | red | air | 29.3 | 5.14 | 2.26 | 0.76 | 3.07 | 44.4 | 2.76 | — | 98.9 |
| RED-MPRA-K2 | red | air | 36.2 | 5.71 | 2.12 | 0.78 | 3.07 | 48.9 | 3.48 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 87.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.26 | 3.97 | 0.03 | 0.12 | 71.4 | 0.0 | — | 96.0 |

## Blue: Defensiva / Concentrada × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=24.7%, blue=75.3%
- Motivo de conclusão: victory=34.7%, timeout=65.3%
- Duração média: 14.21 turnos
- Dano médio causado por equipe (pontos de HP): blue=33.52, red=59.49
- Unidades perdidas em média: blue=4.83, red=5.07

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.06 | 0.0 | 0.01 | 0.18 | 33.3 | 0.86 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.0 | 0.17 | 1.07 | 0.04 | 0.24 | 41.7 | 2.27 | 78.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.01 | 0.09 | 57.1 | 6.23 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.07 | 18.2 | 6.18 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.47 | 0.0 | 0.54 | 1.94 | 58.4 | 4.88 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.0 | 0.0 | 0.36 | 1.43 | 47.7 | 4.89 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.25 | 0.0 | 0.05 | 0.2 | 66.7 | 0.29 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.03 | 20.0 | 0.57 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 64.0 | 0.0 | 3.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 66.0 | 0.0 | 2.98 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 71.3 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 82.0 | 0.0 | 2.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 83.3 | 0.0 | 0.92 | 0.0 | 0.0 | — | 3.15 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 76.7 | 0.0 | 1.2 | 0.0 | 0.0 | — | 2.2 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 91.3 | 0.45 | 0.25 | 0.07 | 0.35 | 52.8 | 3.06 | — | 99.0 |
| BLUE-MPRA-2 | blue | air | 94.7 | 0.2 | 0.25 | 0.03 | 0.27 | 39.0 | 3.07 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.3 | 0.03 | 0.7 | 0.0 | 0.09 | 35.7 | 2.29 | 90.1 | 96.0 |
| BLUE-PAT-C2 | blue | surface | 76.7 | 0.22 | 1.08 | 0.03 | 0.23 | 55.9 | 1.79 | 92.6 | 88.0 |
| BLUE-PAT-O1 | blue | surface | 70.7 | 3.14 | 1.85 | 0.33 | 3.16 | 43.9 | 1.85 | 87.7 | 92.5 |
| BLUE-PAT-O2 | blue | surface | 92.0 | 1.99 | 0.49 | 0.48 | 2.03 | 46.2 | 3.16 | 35.0 | 82.3 |
| BLUE-PORTO-ACU | blue | land | 84.0 | 0.0 | 2.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.7 | 0.0 | 16.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 88.7 | 0.0 | 5.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 70.0 | 0.0 | 7.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 2.73 | 1.01 | 0.45 | 2.58 | 46.5 | 2.19 | 91.0 | 96.1 |
| BLUE-SAG-S1 | blue | surface | 82.0 | 2.44 | 2.51 | 0.39 | 2.53 | 43.7 | 1.97 | 36.4 | 97.9 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.7 | 1.57 | 0.77 | 3.1 | 51.6 | 2.71 | 34.9 | 98.8 |
| BLUE-SUB-1 | blue | submarine | 85.3 | 3.66 | 0.53 | 0.53 | 3.58 | 54.4 | 2.82 | 85.2 | 75.8 |
| BLUE-SUB-2 | blue | submarine | 93.3 | 2.24 | 0.27 | 0.55 | 2.11 | 54.7 | 3.67 | 30.0 | 95.2 |
| BLUE-SUB-3 | blue | submarine | 90.7 | 0.8 | 0.29 | 0.07 | 0.81 | 60.3 | 3.04 | 85.2 | 91.0 |
| BLUE-SUB-N | blue | submarine | 77.3 | 3.89 | 1.08 | 0.33 | 4.18 | 43.4 | 1.45 | — | 82.0 |
| RED-AKE | red | surface | 68.0 | 0.0 | 2.59 | 0.0 | 0.0 | — | 7.45 | 98.2 | — |
| RED-AOR-G | red | surface | 67.3 | 0.0 | 1.7 | 0.0 | 0.0 | — | 4.41 | 99.5 | — |
| RED-AWACS-K | red | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.97 | — | — |
| RED-GANF | red | surface | 99.3 | 0.0 | 0.45 | 0.0 | 0.0 | — | 0.0 | 69.6 | — |
| RED-GBPA | red | surface | 100.0 | 0.74 | 0.22 | 0.14 | 0.62 | 57.0 | 0.0 | — | 99.2 |
| RED-GE-1 | red | surface | 67.3 | 18.95 | 5.2 | 1.25 | 12.41 | 63.3 | 2.77 | 89.9 | 73.5 |
| RED-GE-2 | red | surface | 52.0 | 13.11 | 6.39 | 0.83 | 8.57 | 61.4 | 2.93 | 83.5 | 70.1 |
| RED-GE-3 | red | surface | 69.3 | 0.89 | 3.47 | 0.13 | 0.91 | 59.6 | 2.07 | 85.4 | 92.8 |
| RED-GLOG | red | surface | 76.7 | 0.0 | 1.83 | 0.0 | 0.0 | — | 7.15 | 99.4 | — |
| RED-KMF-1 | red | air | 99.3 | 0.73 | 0.14 | 0.11 | 0.84 | 36.5 | 5.4 | — | — |
| RED-KMF-2 | red | air | 99.3 | 0.75 | 0.17 | 0.18 | 0.72 | 42.6 | 5.38 | — | — |
| RED-KS-1 | red | submarine | 9.3 | 4.91 | 3.08 | 0.41 | 3.07 | 49.5 | 2.74 | 75.5 | 69.8 |
| RED-KSN | red | submarine | 43.3 | 11.09 | 2.53 | 0.65 | 7.27 | 63.5 | 2.47 | — | 73.4 |
| RED-MPRA-K1 | red | air | 66.7 | 4.22 | 0.99 | 0.57 | 2.23 | 50.1 | 2.07 | — | 100.0 |
| RED-MPRA-K2 | red | air | 70.0 | 3.8 | 1.19 | 0.55 | 2.0 | 50.7 | 2.52 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.29 | 3.57 | 0.02 | 0.23 | 73.5 | 0.0 | — | 92.4 |

### Somente vitória decisiva

- Partidas: **52**
- Taxa de vitória: red=71.2%, blue=28.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.08 turnos
- Dano médio causado por equipe (pontos de HP): blue=42.52, red=72.0
- Unidades perdidas em média: blue=6.21, red=6.31

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.08 | 0.0 | 0.0 | 0.25 | 30.8 | 1.33 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.96 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.2 | 0.19 | 1.02 | 0.06 | 0.44 | 43.5 | 2.9 | 80.4 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.02 | 0.0 | 0.0 | 0.06 | 33.3 | 5.62 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.06 | 0.0 | 5.77 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.6 | 0.0 | 0.62 | 2.19 | 50.9 | 3.87 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.0 | 0.0 | 0.38 | 1.6 | 44.6 | 3.79 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.33 | 0.0 | 0.06 | 0.33 | 58.8 | 0.44 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.06 | 0.0 | 0.88 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 26.9 | 0.0 | 6.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 23.1 | 0.0 | 6.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 38.5 | 0.0 | 4.81 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 73.1 | 0.0 | 2.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.6 | 0.0 | 0.88 | 0.0 | 0.0 | — | 4.15 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 78.8 | 0.0 | 1.13 | 0.0 | 0.0 | — | 3.69 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 88.5 | 0.79 | 0.37 | 0.13 | 0.6 | 54.8 | 2.23 | — | 99.4 |
| BLUE-MPRA-2 | blue | air | 92.3 | 0.35 | 0.44 | 0.06 | 0.4 | 47.6 | 2.15 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 82.7 | 0.08 | 0.69 | 0.0 | 0.15 | 50.0 | 3.25 | 90.4 | 94.2 |
| BLUE-PAT-C2 | blue | surface | 67.3 | 0.33 | 1.44 | 0.04 | 0.38 | 55.0 | 2.6 | 91.7 | 82.7 |
| BLUE-PAT-O1 | blue | surface | 67.3 | 5.02 | 2.02 | 0.58 | 5.08 | 43.9 | 2.71 | 83.7 | 85.6 |
| BLUE-PAT-O2 | blue | surface | 98.1 | 2.87 | 0.13 | 0.63 | 2.48 | 48.8 | 3.15 | 45.2 | 84.6 |
| BLUE-PORTO-ACU | blue | land | 90.4 | 0.0 | 1.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 19.2 | 0.0 | 18.81 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 75.0 | 0.0 | 11.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 90.4 | 0.0 | 4.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 82.7 | 4.1 | 1.25 | 0.65 | 4.08 | 48.6 | 2.75 | 92.3 | 93.8 |
| BLUE-SAG-S1 | blue | surface | 82.7 | 3.69 | 2.63 | 0.65 | 4.37 | 40.1 | 2.63 | 44.4 | 96.2 |
| BLUE-SAG-S2 | blue | surface | 88.5 | 5.1 | 1.63 | 1.02 | 4.23 | 50.9 | 3.5 | 42.4 | 97.4 |
| BLUE-SUB-1 | blue | submarine | 84.6 | 3.77 | 0.56 | 0.44 | 4.42 | 49.1 | 3.27 | 85.1 | 71.2 |
| BLUE-SUB-2 | blue | submarine | 92.3 | 2.75 | 0.31 | 0.56 | 2.27 | 57.6 | 3.88 | 59.7 | 92.3 |
| BLUE-SUB-3 | blue | submarine | 86.5 | 1.08 | 0.35 | 0.06 | 1.21 | 55.6 | 3.06 | 92.6 | 86.3 |
| BLUE-SUB-N | blue | submarine | 71.2 | 4.4 | 1.33 | 0.37 | 5.13 | 44.6 | 2.27 | — | 78.6 |
| RED-AKE | red | surface | 61.5 | 0.0 | 3.06 | 0.0 | 0.0 | — | 8.08 | 98.5 | — |
| RED-AOR-G | red | surface | 48.1 | 0.0 | 2.77 | 0.0 | 0.0 | — | 4.75 | 99.4 | — |
| RED-AWACS-K | red | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.0 | — | — |
| RED-GANF | red | surface | 98.1 | 0.0 | 0.81 | 0.0 | 0.0 | — | 0.0 | 74.4 | — |
| RED-GBPA | red | surface | 100.0 | 1.25 | 0.52 | 0.21 | 0.98 | 58.8 | 0.0 | — | 98.8 |
| RED-GE-1 | red | surface | 78.8 | 19.54 | 4.65 | 1.13 | 12.1 | 64.1 | 3.08 | 87.2 | 73.8 |
| RED-GE-2 | red | surface | 51.9 | 17.0 | 6.87 | 1.27 | 10.37 | 63.8 | 3.35 | 85.1 | 62.1 |
| RED-GE-3 | red | surface | 32.7 | 2.04 | 7.65 | 0.33 | 2.08 | 57.4 | 4.42 | 75.2 | 83.3 |
| RED-GLOG | red | surface | 71.2 | 0.0 | 2.23 | 0.0 | 0.0 | — | 7.88 | 99.3 | — |
| RED-KMF-1 | red | air | 100.0 | 1.08 | 0.08 | 0.15 | 1.56 | 30.9 | 8.67 | — | — |
| RED-KMF-2 | red | air | 100.0 | 1.12 | 0.15 | 0.31 | 1.35 | 37.1 | 8.54 | — | — |
| RED-KS-1 | red | submarine | 7.7 | 6.1 | 3.23 | 0.6 | 3.62 | 52.1 | 2.96 | 76.8 | 64.2 |
| RED-KSN | red | submarine | 46.2 | 14.52 | 2.44 | 0.98 | 8.63 | 64.4 | 3.81 | — | 67.2 |
| RED-MPRA-K1 | red | air | 32.7 | 4.1 | 2.0 | 0.48 | 2.79 | 45.5 | 3.85 | — | 100.0 |
| RED-MPRA-K2 | red | air | 36.5 | 5.1 | 2.33 | 0.73 | 2.63 | 48.2 | 4.33 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.17 | 3.73 | 0.02 | 0.19 | 70.0 | 0.0 | — | 93.6 |

## Blue: Defensiva / Concentrada × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=73.3%, red=26.7%
- Motivo de conclusão: timeout=53.3%, victory=46.7%
- Duração média: 13.3 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.37, red=68.77
- Unidades perdidas em média: blue=6.15, red=5.56

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.07 | 0.0 | 0.0 | 0.17 | 40.0 | 1.22 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.83 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.65 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 88.7 | 0.19 | 1.76 | 0.05 | 0.24 | 61.1 | 3.05 | 76.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.09 | 57.1 | 7.96 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.06 | 0.0 | 0.03 | 0.07 | 40.0 | 7.96 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.77 | 0.0 | 0.61 | 2.19 | 52.6 | 5.96 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.13 | 0.0 | 0.37 | 1.6 | 47.9 | 5.95 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.44 | 0.07 | 0.05 | 0.38 | 61.4 | 0.41 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.81 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 60.0 | 0.0 | 3.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 61.3 | 0.0 | 3.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.0 | 0.0 | 3.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 70.7 | 0.0 | 2.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 75.3 | 0.0 | 1.17 | 0.0 | 0.0 | — | 3.16 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 66.7 | 0.0 | 1.65 | 0.0 | 0.0 | — | 3.09 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 90.0 | 0.4 | 0.3 | 0.08 | 0.29 | 48.8 | 3.16 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 93.3 | 0.12 | 0.24 | 0.03 | 0.24 | 30.6 | 3.22 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 76.0 | 0.03 | 1.01 | 0.0 | 0.04 | 83.3 | 3.45 | 84.3 | 98.0 |
| BLUE-PAT-C2 | blue | surface | 65.3 | 0.09 | 1.59 | 0.01 | 0.14 | 52.4 | 3.2 | 84.6 | 94.7 |
| BLUE-PAT-O1 | blue | surface | 60.7 | 4.1 | 2.46 | 0.46 | 3.7 | 44.7 | 2.23 | 88.4 | 88.5 |
| BLUE-PAT-O2 | blue | surface | 89.3 | 2.4 | 0.63 | 0.56 | 2.03 | 52.8 | 3.46 | 36.3 | 87.2 |
| BLUE-PORTO-ACU | blue | land | 77.3 | 0.0 | 4.44 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.7 | 0.0 | 16.96 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 52.7 | 0.0 | 10.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 82.7 | 2.34 | 1.08 | 0.32 | 2.19 | 46.6 | 2.61 | 89.6 | 98.0 |
| BLUE-SAG-S1 | blue | surface | 73.3 | 3.39 | 3.98 | 0.45 | 3.14 | 43.5 | 2.67 | 37.5 | 99.3 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.42 | 1.61 | 0.71 | 2.77 | 48.3 | 3.23 | 39.0 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 82.7 | 3.85 | 0.67 | 0.59 | 3.08 | 58.9 | 3.93 | 74.9 | 74.8 |
| BLUE-SUB-2 | blue | submarine | 87.3 | 1.87 | 0.45 | 0.51 | 2.4 | 49.4 | 4.43 | 35.9 | 93.8 |
| BLUE-SUB-3 | blue | submarine | 89.3 | 0.67 | 0.35 | 0.09 | 0.55 | 58.5 | 3.89 | 82.6 | 94.2 |
| BLUE-SUB-N | blue | submarine | 60.7 | 5.93 | 1.91 | 0.62 | 4.81 | 50.5 | 2.05 | — | 81.3 |
| RED-AKE | red | surface | 49.3 | 0.0 | 3.93 | 0.0 | 0.0 | — | 8.39 | 97.0 | — |
| RED-AOR-G | red | surface | 58.0 | 0.0 | 2.03 | 0.0 | 0.0 | — | 4.28 | 98.9 | — |
| RED-AWACS-K | red | air | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.29 | — | — |
| RED-GANF | red | surface | 100.0 | 0.01 | 0.44 | 0.0 | 0.01 | 100.0 | 0.0 | 57.6 | — |
| RED-GBPA | red | surface | 95.3 | 1.17 | 0.71 | 0.23 | 1.0 | 56.7 | 0.0 | — | 97.1 |
| RED-GE-1 | red | surface | 72.7 | 19.68 | 4.53 | 1.25 | 12.39 | 64.3 | 2.15 | 79.0 | 74.2 |
| RED-GE-2 | red | surface | 49.3 | 13.79 | 6.66 | 1.05 | 8.65 | 63.6 | 2.82 | 79.7 | 70.1 |
| RED-GE-3 | red | surface | 61.3 | 1.47 | 4.49 | 0.14 | 1.56 | 48.7 | 2.81 | 75.6 | 86.6 |
| RED-GLOG | red | surface | 53.3 | 0.0 | 3.53 | 0.0 | 0.0 | — | 7.73 | 99.3 | — |
| RED-KMF-1 | red | air | 95.3 | 0.87 | 0.1 | 0.16 | 1.2 | 30.6 | 6.5 | — | — |
| RED-KMF-2 | red | air | 95.3 | 1.58 | 0.06 | 0.31 | 1.09 | 45.1 | 6.59 | — | — |
| RED-KS-1 | red | submarine | 32.7 | 8.05 | 1.93 | 0.7 | 4.98 | 52.3 | 2.34 | 54.6 | 53.0 |
| RED-KSN | red | submarine | 40.7 | 13.83 | 2.55 | 1.05 | 8.79 | 62.1 | 2.01 | — | 69.5 |
| RED-MPRA-K1 | red | air | 61.3 | 4.79 | 1.29 | 0.71 | 2.5 | 52.3 | 2.67 | — | 99.9 |
| RED-MPRA-K2 | red | air | 60.7 | 3.48 | 1.31 | 0.53 | 1.8 | 54.8 | 2.41 | — | 99.7 |
| RED-OPSESP-1 | red | surface | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 3.81 | 0.01 | 0.07 | 70.0 | 0.0 | — | 97.8 |

### Somente vitória decisiva

- Partidas: **70**
- Taxa de vitória: red=57.1%, blue=42.9%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.93 turnos
- Dano médio causado por equipe (pontos de HP): blue=44.83, red=77.01
- Unidades perdidas em média: blue=7.36, red=6.59

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.09 | 0.0 | 0.0 | 0.2 | 42.9 | 1.84 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.24 | — | — |
| BLUE-AERO-CF | blue | land | 98.6 | 0.0 | 0.34 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.6 | 0.0 | 0.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 91.4 | 0.31 | 1.54 | 0.1 | 0.37 | 65.4 | 3.86 | 70.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.17 | 0.0 | 0.04 | 0.13 | 55.6 | 8.8 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.03 | 0.1 | 28.6 | 8.66 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.11 | 0.0 | 0.66 | 2.57 | 49.4 | 6.06 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.0 | 0.0 | 0.41 | 1.89 | 43.9 | 6.09 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.57 | 0.0 | 0.11 | 0.53 | 54.1 | 0.61 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.23 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 48.6 | 0.0 | 4.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 42.9 | 0.0 | 5.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 42.9 | 0.0 | 4.76 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 58.6 | 0.0 | 3.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 67.1 | 0.0 | 1.54 | 0.0 | 0.0 | — | 4.34 | 99.0 | — |
| BLUE-LOG-T | blue | surface | 64.3 | 0.0 | 1.69 | 0.0 | 0.0 | — | 4.54 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 81.4 | 0.6 | 0.59 | 0.13 | 0.46 | 43.8 | 2.83 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 90.0 | 0.24 | 0.33 | 0.04 | 0.37 | 38.5 | 3.01 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 68.6 | 0.03 | 1.47 | 0.0 | 0.04 | 66.7 | 4.44 | 81.7 | 97.9 |
| BLUE-PAT-C2 | blue | surface | 54.3 | 0.09 | 2.1 | 0.01 | 0.16 | 36.4 | 3.84 | 81.7 | 94.3 |
| BLUE-PAT-O1 | blue | surface | 47.1 | 5.31 | 3.3 | 0.64 | 4.44 | 44.4 | 2.71 | 84.6 | 82.1 |
| BLUE-PAT-O2 | blue | surface | 91.4 | 3.01 | 0.59 | 0.63 | 2.69 | 47.3 | 4.57 | 55.7 | 89.3 |
| BLUE-PORTO-ACU | blue | land | 78.6 | 0.0 | 3.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 20.0 | 0.0 | 18.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.1 | 0.0 | 10.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 2.83 | 1.37 | 0.37 | 2.73 | 49.2 | 3.56 | 87.0 | 96.5 |
| BLUE-SAG-S1 | blue | surface | 78.6 | 5.34 | 3.93 | 0.71 | 5.09 | 42.7 | 3.81 | 48.9 | 99.1 |
| BLUE-SAG-S2 | blue | surface | 87.1 | 4.16 | 1.9 | 0.84 | 3.73 | 42.9 | 4.37 | 55.7 | 100.0 |
| BLUE-SUB-1 | blue | submarine | 75.7 | 4.99 | 0.91 | 0.71 | 4.3 | 57.5 | 4.99 | 76.6 | 64.5 |
| BLUE-SUB-2 | blue | submarine | 87.1 | 1.59 | 0.51 | 0.39 | 1.93 | 51.9 | 5.21 | 62.3 | 91.8 |
| BLUE-SUB-3 | blue | submarine | 88.6 | 0.67 | 0.34 | 0.1 | 0.66 | 52.2 | 4.69 | 83.9 | 92.3 |
| BLUE-SUB-N | blue | submarine | 65.7 | 6.64 | 1.59 | 0.64 | 5.31 | 50.5 | 2.96 | — | 76.7 |
| RED-AKE | red | surface | 44.3 | 0.0 | 4.14 | 0.0 | 0.0 | — | 7.44 | 96.4 | — |
| RED-AOR-G | red | surface | 41.4 | 0.0 | 2.7 | 0.0 | 0.0 | — | 4.56 | 98.0 | — |
| RED-AWACS-K | red | air | 90.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.04 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.57 | 0.0 | 0.0 | — | 0.0 | 58.8 | — |
| RED-GBPA | red | surface | 90.0 | 1.43 | 1.3 | 0.29 | 1.24 | 55.2 | 0.0 | — | 98.0 |
| RED-GE-1 | red | surface | 85.7 | 19.61 | 3.46 | 1.2 | 12.34 | 65.0 | 1.44 | 76.7 | 74.8 |
| RED-GE-2 | red | surface | 45.7 | 16.57 | 7.7 | 1.31 | 10.0 | 62.9 | 3.06 | 77.0 | 65.1 |
| RED-GE-3 | red | surface | 34.3 | 2.46 | 7.69 | 0.24 | 2.73 | 46.6 | 4.51 | 69.8 | 77.0 |
| RED-GLOG | red | surface | 42.9 | 0.0 | 4.37 | 0.0 | 0.0 | — | 7.2 | 99.3 | — |
| RED-KMF-1 | red | air | 90.0 | 1.29 | 0.16 | 0.26 | 1.8 | 32.5 | 8.47 | — | — |
| RED-KMF-2 | red | air | 90.0 | 2.46 | 0.03 | 0.47 | 1.61 | 44.2 | 8.46 | — | — |
| RED-KS-1 | red | submarine | 38.6 | 9.8 | 1.7 | 0.97 | 5.37 | 58.5 | 2.41 | 55.9 | 47.3 |
| RED-KSN | red | submarine | 32.9 | 12.91 | 2.83 | 0.97 | 7.63 | 64.8 | 2.09 | — | 72.5 |
| RED-MPRA-K1 | red | air | 35.7 | 6.36 | 2.13 | 0.97 | 3.31 | 50.9 | 4.1 | — | 99.8 |
| RED-MPRA-K2 | red | air | 34.3 | 4.07 | 2.1 | 0.66 | 2.3 | 51.6 | 4.27 | — | 99.3 |
| RED-OPSESP-1 | red | surface | 90.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 3.96 | 0.01 | 0.06 | 100.0 | 0.0 | — | 98.1 |

## Blue: Defensiva / Concentrada × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=22.0%, blue=78.0%
- Motivo de conclusão: victory=43.3%, timeout=56.7%
- Duração média: 14.06 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.75, red=63.19
- Unidades perdidas em média: blue=5.59, red=5.25

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.04 | 16.7 | 1.02 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.72 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 91.3 | 0.19 | 1.21 | 0.03 | 0.18 | 55.6 | 2.77 | 84.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.01 | 0.08 | 66.7 | 6.94 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.05 | 0.0 | 0.05 | 0.07 | 80.0 | 6.78 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.35 | 0.0 | 0.55 | 1.88 | 53.2 | 5.1 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.97 | 0.0 | 0.39 | 1.39 | 51.4 | 5.23 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.22 | 0.01 | 0.03 | 0.17 | 60.0 | 0.34 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.67 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 58.7 | 0.0 | 3.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 69.3 | 0.0 | 2.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.7 | 0.0 | 2.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 79.3 | 0.0 | 2.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 80.7 | 0.0 | 1.03 | 0.0 | 0.0 | — | 3.01 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 66.7 | 0.0 | 1.86 | 0.0 | 0.0 | — | 3.01 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 91.3 | 0.33 | 0.35 | 0.07 | 0.37 | 43.6 | 2.35 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.45 | 0.22 | 0.07 | 0.31 | 45.7 | 2.45 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.3 | 0.05 | 0.75 | 0.01 | 0.03 | 60.0 | 3.07 | 87.7 | 98.7 |
| BLUE-PAT-C2 | blue | surface | 66.0 | 0.11 | 1.3 | 0.01 | 0.15 | 68.2 | 2.93 | 90.2 | 93.7 |
| BLUE-PAT-O1 | blue | surface | 67.3 | 4.47 | 1.98 | 0.49 | 4.13 | 43.4 | 2.81 | 90.1 | 92.5 |
| BLUE-PAT-O2 | blue | surface | 96.0 | 3.03 | 0.29 | 0.64 | 2.39 | 54.0 | 3.29 | 27.0 | 89.3 |
| BLUE-PORTO-ACU | blue | land | 82.0 | 0.0 | 4.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.7 | 0.0 | 16.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 53.3 | 0.0 | 10.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.7 | 2.11 | 0.88 | 0.25 | 2.23 | 44.8 | 2.46 | 92.1 | 97.9 |
| BLUE-SAG-S1 | blue | surface | 72.7 | 2.93 | 3.81 | 0.39 | 2.86 | 42.2 | 2.17 | 37.6 | 98.8 |
| BLUE-SAG-S2 | blue | surface | 94.7 | 3.57 | 0.99 | 0.69 | 3.34 | 45.1 | 3.06 | 33.0 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 76.7 | 2.93 | 0.79 | 0.41 | 2.88 | 57.2 | 3.09 | 81.8 | 78.8 |
| BLUE-SUB-2 | blue | submarine | 85.3 | 2.06 | 0.43 | 0.5 | 2.29 | 51.2 | 3.84 | 34.9 | 92.5 |
| BLUE-SUB-3 | blue | submarine | 90.0 | 0.88 | 0.31 | 0.11 | 0.66 | 60.6 | 3.23 | 88.0 | 93.2 |
| BLUE-SUB-N | blue | submarine | 62.0 | 4.97 | 1.71 | 0.56 | 4.54 | 45.4 | 1.83 | — | 82.2 |
| RED-AKE | red | surface | 50.7 | 0.0 | 4.26 | 0.0 | 0.0 | — | 8.19 | 97.2 | — |
| RED-AOR-G | red | surface | 58.0 | 0.0 | 2.12 | 0.0 | 0.0 | — | 4.53 | 99.1 | — |
| RED-AWACS-K | red | air | 98.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.13 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.43 | 0.0 | 0.0 | — | 0.0 | 58.9 | — |
| RED-GBPA | red | surface | 98.0 | 0.9 | 0.49 | 0.19 | 0.69 | 52.4 | 0.0 | — | 97.7 |
| RED-GE-1 | red | surface | 74.7 | 20.35 | 4.68 | 1.51 | 12.59 | 64.4 | 2.65 | 78.6 | 73.4 |
| RED-GE-2 | red | surface | 64.0 | 13.31 | 4.8 | 0.97 | 8.31 | 62.4 | 2.08 | 76.7 | 72.3 |
| RED-GE-3 | red | surface | 64.7 | 2.09 | 4.17 | 0.29 | 1.77 | 59.8 | 2.2 | 75.8 | 85.0 |
| RED-GLOG | red | surface | 61.3 | 0.0 | 3.15 | 0.0 | 0.0 | — | 7.54 | 99.4 | — |
| RED-KMF-1 | red | air | 98.0 | 0.74 | 0.19 | 0.15 | 0.92 | 36.2 | 6.62 | — | — |
| RED-KMF-2 | red | air | 97.3 | 0.8 | 0.27 | 0.18 | 0.77 | 44.0 | 6.61 | — | — |
| RED-KS-1 | red | submarine | 32.0 | 6.47 | 2.29 | 0.51 | 4.15 | 48.3 | 1.83 | 55.6 | 59.9 |
| RED-KSN | red | submarine | 40.0 | 13.7 | 2.76 | 1.01 | 8.87 | 61.1 | 2.41 | — | 69.4 |
| RED-MPRA-K1 | red | air | 64.0 | 2.78 | 1.07 | 0.4 | 1.63 | 47.8 | 2.29 | — | 100.0 |
| RED-MPRA-K2 | red | air | 62.7 | 1.97 | 1.29 | 0.37 | 1.11 | 52.1 | 2.31 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 98.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.08 | 3.77 | 0.01 | 0.07 | 90.0 | 0.0 | — | 97.8 |

### Somente vitória decisiva

- Partidas: **65**
- Taxa de vitória: red=50.8%, blue=49.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.91 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.88, red=73.18
- Unidades perdidas em média: blue=7.09, red=6.51

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 1.66 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.17 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.5 | 0.0 | 0.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 89.2 | 0.43 | 1.52 | 0.08 | 0.38 | 60.0 | 3.74 | 80.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.0 | 0.05 | 66.7 | 8.42 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.06 | 0.0 | 0.06 | 0.06 | 100.0 | 8.25 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.43 | 0.0 | 0.57 | 2.18 | 49.3 | 5.68 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.03 | 0.0 | 0.34 | 1.66 | 44.4 | 5.68 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.2 | 0.0 | 0.06 | 0.2 | 61.5 | 0.55 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.09 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 40.0 | 0.0 | 4.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 52.3 | 0.0 | 4.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 47.7 | 0.0 | 4.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.3 | 0.0 | 2.82 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 70.8 | 0.0 | 1.43 | 0.0 | 0.0 | — | 4.12 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 56.9 | 0.0 | 2.43 | 0.0 | 0.0 | — | 4.68 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 83.1 | 0.65 | 0.74 | 0.11 | 0.74 | 41.7 | 2.35 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 86.2 | 0.92 | 0.51 | 0.14 | 0.68 | 43.2 | 2.15 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 78.5 | 0.11 | 0.97 | 0.02 | 0.08 | 60.0 | 4.25 | 80.5 | 96.9 |
| BLUE-PAT-C2 | blue | surface | 50.8 | 0.09 | 1.69 | 0.0 | 0.14 | 66.7 | 4.28 | 87.7 | 93.8 |
| BLUE-PAT-O1 | blue | surface | 53.8 | 6.83 | 2.85 | 0.77 | 6.12 | 46.5 | 3.74 | 85.5 | 88.5 |
| BLUE-PAT-O2 | blue | surface | 95.4 | 3.74 | 0.37 | 0.66 | 3.37 | 49.3 | 3.97 | 41.1 | 91.5 |
| BLUE-PORTO-ACU | blue | land | 90.8 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.2 | 0.0 | 17.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 3.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 58.5 | 0.0 | 10.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 78.5 | 2.82 | 1.28 | 0.31 | 3.34 | 39.6 | 3.49 | 89.6 | 97.0 |
| BLUE-SAG-S1 | blue | surface | 72.3 | 5.26 | 3.98 | 0.74 | 4.92 | 43.4 | 3.32 | 51.7 | 97.8 |
| BLUE-SAG-S2 | blue | surface | 93.8 | 4.94 | 1.08 | 0.95 | 4.82 | 46.0 | 4.31 | 52.8 | 99.0 |
| BLUE-SUB-1 | blue | submarine | 69.2 | 4.2 | 1.15 | 0.54 | 4.23 | 54.5 | 3.94 | 81.7 | 70.0 |
| BLUE-SUB-2 | blue | submarine | 80.0 | 2.25 | 0.51 | 0.42 | 2.62 | 48.2 | 4.72 | 54.2 | 85.8 |
| BLUE-SUB-3 | blue | submarine | 86.2 | 1.54 | 0.43 | 0.22 | 1.05 | 58.8 | 4.17 | 88.9 | 89.8 |
| BLUE-SUB-N | blue | submarine | 60.0 | 5.35 | 1.74 | 0.54 | 4.91 | 45.5 | 2.77 | — | 79.9 |
| RED-AKE | red | surface | 47.7 | 0.0 | 4.31 | 0.0 | 0.0 | — | 8.18 | 97.6 | — |
| RED-AOR-G | red | surface | 35.4 | 0.0 | 3.08 | 0.0 | 0.0 | — | 4.82 | 98.5 | — |
| RED-AWACS-K | red | air | 95.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 9.15 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.85 | 0.0 | 0.0 | — | 0.0 | 60.1 | — |
| RED-GBPA | red | surface | 95.4 | 1.37 | 1.0 | 0.28 | 1.03 | 58.2 | 0.0 | — | 96.9 |
| RED-GE-1 | red | surface | 76.9 | 21.45 | 5.54 | 1.6 | 12.62 | 66.0 | 2.71 | 74.9 | 73.2 |
| RED-GE-2 | red | surface | 63.1 | 15.62 | 5.51 | 1.14 | 9.26 | 62.8 | 1.88 | 77.7 | 68.7 |
| RED-GE-3 | red | surface | 32.3 | 4.4 | 8.22 | 0.65 | 3.66 | 59.2 | 3.94 | 67.5 | 70.1 |
| RED-GLOG | red | surface | 50.8 | 0.0 | 3.77 | 0.0 | 0.0 | — | 7.88 | 99.4 | — |
| RED-KMF-1 | red | air | 95.4 | 1.15 | 0.34 | 0.26 | 1.46 | 37.9 | 10.18 | — | — |
| RED-KMF-2 | red | air | 95.4 | 1.11 | 0.37 | 0.28 | 1.22 | 40.5 | 10.15 | — | — |
| RED-KS-1 | red | submarine | 35.4 | 7.58 | 2.26 | 0.68 | 4.63 | 49.8 | 1.88 | 56.5 | 53.7 |
| RED-KSN | red | submarine | 27.7 | 14.65 | 3.54 | 1.2 | 9.52 | 57.2 | 3.05 | — | 65.6 |
| RED-MPRA-K1 | red | air | 38.5 | 3.54 | 1.89 | 0.52 | 2.09 | 50.0 | 3.89 | — | 100.0 |
| RED-MPRA-K2 | red | air | 36.9 | 2.22 | 2.15 | 0.49 | 1.37 | 52.8 | 4.49 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 95.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.11 | 4.06 | 0.0 | 0.08 | 100.0 | 0.0 | — | 97.4 |

## Blue: Defensiva / Dividida × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=78.0%, red=22.0%
- Motivo de conclusão: timeout=58.7%, victory=41.3%
- Duração média: 13.59 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.33, red=57.4
- Unidades perdidas em média: blue=4.86, red=5.43

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.17 | 26.9 | 1.04 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.71 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.0 | 0.22 | 1.09 | 0.07 | 0.26 | 53.8 | 2.34 | 86.4 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.11 | 29.4 | 6.58 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.11 | 47.1 | 6.59 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.31 | 0.0 | 0.66 | 2.41 | 53.9 | 4.55 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.2 | 0.0 | 0.45 | 1.81 | 47.8 | 4.53 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.29 | 0.05 | 0.05 | 0.23 | 68.6 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.02 | 0.0 | 0.02 | 0.03 | 60.0 | 0.69 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 65.3 | 0.0 | 3.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 71.3 | 0.0 | 2.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.7 | 0.0 | 2.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 81.3 | 0.0 | 2.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 87.3 | 0.0 | 0.64 | 0.0 | 0.0 | — | 2.89 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 77.3 | 0.0 | 1.13 | 0.0 | 0.0 | — | 2.37 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 91.3 | 0.41 | 0.37 | 0.07 | 0.31 | 51.1 | 2.64 | — | 99.2 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.27 | 0.21 | 0.06 | 0.28 | 52.4 | 2.62 | — | 99.4 |
| BLUE-PAT-C1 | blue | surface | 79.3 | 0.12 | 0.9 | 0.01 | 0.1 | 53.3 | 2.99 | 88.2 | 95.3 |
| BLUE-PAT-C2 | blue | surface | 76.7 | 0.25 | 1.01 | 0.03 | 0.25 | 54.1 | 2.72 | 89.8 | 88.0 |
| BLUE-PAT-O1 | blue | surface | 66.0 | 3.59 | 2.29 | 0.33 | 3.27 | 40.4 | 1.46 | 88.1 | 93.2 |
| BLUE-PAT-O2 | blue | surface | 91.3 | 2.71 | 0.54 | 0.51 | 2.63 | 50.5 | 3.51 | 32.5 | 86.2 |
| BLUE-PORTO-ACU | blue | land | 89.3 | 0.0 | 2.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 40.0 | 0.0 | 15.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 88.0 | 0.0 | 5.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 72.0 | 0.0 | 6.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 2.54 | 1.18 | 0.39 | 2.65 | 45.3 | 2.34 | 95.9 | 96.9 |
| BLUE-SAG-S1 | blue | surface | 79.3 | 2.81 | 2.93 | 0.43 | 2.67 | 48.8 | 2.19 | 33.5 | 97.6 |
| BLUE-SAG-S2 | blue | surface | 88.0 | 3.75 | 1.81 | 0.76 | 3.53 | 48.2 | 3.24 | 32.1 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 3.53 | 0.61 | 0.49 | 3.55 | 54.1 | 3.13 | 81.6 | 74.8 |
| BLUE-SUB-2 | blue | submarine | 94.0 | 2.02 | 0.26 | 0.53 | 2.07 | 53.1 | 4.0 | 31.5 | 93.7 |
| BLUE-SUB-3 | blue | submarine | 92.0 | 0.68 | 0.26 | 0.1 | 0.59 | 51.7 | 3.4 | 85.2 | 94.1 |
| BLUE-SUB-N | blue | submarine | 70.7 | 5.43 | 1.3 | 0.42 | 4.73 | 47.2 | 1.79 | — | 78.2 |
| RED-AKE | red | surface | 54.7 | 0.0 | 3.53 | 0.0 | 0.0 | — | 7.46 | 97.0 | — |
| RED-AOR-G | red | surface | 67.3 | 0.0 | 1.65 | 0.0 | 0.0 | — | 4.59 | 99.5 | — |
| RED-AWACS-K | red | air | 96.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.34 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.81 | 0.0 | 0.0 | — | 0.0 | 70.2 | — |
| RED-GBPA | red | surface | 96.7 | 0.76 | 0.55 | 0.15 | 0.85 | 43.8 | 0.0 | — | 98.3 |
| RED-GE-1 | red | surface | 62.0 | 17.57 | 6.27 | 1.15 | 11.58 | 64.4 | 2.87 | 88.7 | 75.9 |
| RED-GE-2 | red | surface | 43.3 | 11.36 | 7.41 | 0.81 | 7.77 | 61.4 | 3.21 | 83.7 | 73.5 |
| RED-GE-3 | red | surface | 72.7 | 1.19 | 3.38 | 0.15 | 1.02 | 58.2 | 2.09 | 87.9 | 90.0 |
| RED-GLOG | red | surface | 68.7 | 0.0 | 2.65 | 0.0 | 0.0 | — | 7.51 | 99.3 | — |
| RED-KMF-1 | red | air | 96.7 | 0.87 | 0.15 | 0.11 | 1.01 | 36.8 | 4.77 | — | — |
| RED-KMF-2 | red | air | 96.7 | 1.01 | 0.12 | 0.2 | 0.89 | 42.1 | 4.73 | — | — |
| RED-KS-1 | red | submarine | 10.7 | 5.55 | 2.8 | 0.45 | 3.27 | 53.4 | 2.83 | 72.6 | 68.0 |
| RED-KSN | red | submarine | 37.3 | 10.2 | 2.68 | 0.61 | 6.61 | 64.3 | 2.26 | — | 76.1 |
| RED-MPRA-K1 | red | air | 68.0 | 4.79 | 1.02 | 0.65 | 2.35 | 53.0 | 1.72 | — | 100.0 |
| RED-MPRA-K2 | red | air | 68.0 | 3.98 | 1.01 | 0.58 | 1.97 | 52.0 | 1.54 | — | 99.9 |
| RED-OPSESP-1 | red | surface | 96.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.12 | 3.28 | 0.01 | 0.12 | 72.2 | 0.0 | — | 96.0 |

### Somente vitória decisiva

- Partidas: **62**
- Taxa de vitória: blue=46.8%, red=53.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.32 turnos
- Dano médio causado por equipe (pontos de HP): blue=48.52, red=72.16
- Unidades perdidas em média: blue=6.4, red=6.81

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.08 | 0.0 | 0.02 | 0.27 | 29.4 | 1.74 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.19 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 88.7 | 0.5 | 1.53 | 0.16 | 0.58 | 52.8 | 3.79 | 83.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.03 | 0.15 | 33.3 | 7.63 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.06 | 0.0 | 0.02 | 0.13 | 50.0 | 7.53 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.4 | 0.0 | 0.73 | 3.16 | 45.9 | 4.9 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.65 | 0.0 | 0.56 | 2.52 | 42.3 | 5.03 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.4 | 0.37 | 0.1 | 0.1 | 0.26 | 75.0 | 0.58 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.02 | 0.0 | 0.02 | 0.02 | 100.0 | 1.16 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 38.7 | 0.0 | 4.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 40.3 | 0.0 | 5.24 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 43.5 | 0.0 | 4.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 74.2 | 0.0 | 2.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 83.9 | 0.0 | 0.84 | 0.0 | 0.0 | — | 4.65 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 61.3 | 0.0 | 1.97 | 0.0 | 0.0 | — | 3.87 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 93.5 | 0.56 | 0.37 | 0.11 | 0.39 | 54.2 | 2.02 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 95.2 | 0.23 | 0.23 | 0.03 | 0.34 | 19.0 | 2.08 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 69.4 | 0.21 | 1.27 | 0.02 | 0.21 | 53.8 | 4.39 | 84.7 | 90.3 |
| BLUE-PAT-C2 | blue | surface | 66.1 | 0.11 | 1.4 | 0.0 | 0.18 | 36.4 | 3.82 | 89.8 | 91.9 |
| BLUE-PAT-O1 | blue | surface | 56.5 | 5.26 | 3.27 | 0.53 | 5.13 | 38.7 | 1.81 | 83.9 | 87.5 |
| BLUE-PAT-O2 | blue | surface | 91.9 | 4.53 | 0.52 | 0.68 | 3.85 | 50.6 | 4.87 | 53.5 | 89.1 |
| BLUE-PORTO-ACU | blue | land | 96.8 | 0.0 | 0.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 40.3 | 0.0 | 16.56 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 77.4 | 0.0 | 10.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 87.1 | 0.0 | 3.82 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 72.6 | 3.52 | 1.66 | 0.6 | 3.79 | 43.8 | 3.6 | 91.8 | 94.2 |
| BLUE-SAG-S1 | blue | surface | 72.6 | 4.44 | 4.08 | 0.63 | 4.44 | 45.1 | 3.48 | 55.8 | 96.9 |
| BLUE-SAG-S2 | blue | surface | 83.9 | 4.77 | 2.55 | 0.81 | 4.63 | 42.9 | 4.65 | 54.4 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 80.6 | 4.37 | 0.66 | 0.58 | 4.85 | 52.5 | 3.95 | 77.0 | 63.5 |
| BLUE-SUB-2 | blue | submarine | 93.5 | 1.94 | 0.27 | 0.48 | 2.06 | 53.1 | 4.94 | 62.8 | 92.7 |
| BLUE-SUB-3 | blue | submarine | 88.7 | 0.98 | 0.4 | 0.21 | 0.84 | 55.8 | 4.06 | 87.6 | 92.5 |
| BLUE-SUB-N | blue | submarine | 64.5 | 7.44 | 1.5 | 0.5 | 5.98 | 48.5 | 2.87 | — | 72.8 |
| RED-AKE | red | surface | 33.9 | 0.0 | 5.03 | 0.0 | 0.0 | — | 7.02 | 95.6 | — |
| RED-AOR-G | red | surface | 51.6 | 0.0 | 2.48 | 0.0 | 0.0 | — | 4.61 | 99.3 | — |
| RED-AWACS-K | red | air | 91.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.19 | — | — |
| RED-GANF | red | surface | 98.4 | 0.0 | 1.4 | 0.0 | 0.0 | — | 0.0 | 65.4 | — |
| RED-GBPA | red | surface | 91.9 | 1.13 | 1.21 | 0.21 | 1.44 | 43.8 | 0.0 | — | 96.6 |
| RED-GE-1 | red | surface | 74.2 | 18.65 | 5.55 | 1.26 | 11.98 | 64.5 | 2.71 | 85.3 | 74.6 |
| RED-GE-2 | red | surface | 35.5 | 14.5 | 8.53 | 0.98 | 9.1 | 62.2 | 3.53 | 81.8 | 66.9 |
| RED-GE-3 | red | surface | 46.8 | 2.73 | 6.76 | 0.32 | 2.18 | 60.7 | 4.08 | 81.9 | 78.4 |
| RED-GLOG | red | surface | 50.0 | 0.0 | 4.19 | 0.0 | 0.0 | — | 6.94 | 99.0 | — |
| RED-KMF-1 | red | air | 91.9 | 1.6 | 0.26 | 0.19 | 1.79 | 36.0 | 8.03 | — | — |
| RED-KMF-2 | red | air | 91.9 | 2.02 | 0.19 | 0.35 | 1.58 | 44.9 | 7.95 | — | — |
| RED-KS-1 | red | submarine | 12.9 | 7.35 | 2.56 | 0.68 | 4.05 | 59.0 | 3.15 | 72.1 | 59.7 |
| RED-KSN | red | submarine | 33.9 | 12.23 | 2.92 | 0.77 | 7.55 | 64.3 | 3.03 | — | 71.8 |
| RED-MPRA-K1 | red | air | 38.7 | 6.5 | 1.92 | 0.84 | 3.31 | 53.2 | 3.55 | — | 100.0 |
| RED-MPRA-K2 | red | air | 38.7 | 5.4 | 1.85 | 0.77 | 2.79 | 50.9 | 3.06 | — | 99.7 |
| RED-OPSESP-1 | red | surface | 91.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 3.65 | 0.02 | 0.08 | 60.0 | 0.0 | — | 97.3 |

## Blue: Defensiva / Dividida × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=81.3%, red=18.7%
- Motivo de conclusão: timeout=60.0%, victory=40.0%
- Duração média: 13.71 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.99, red=58.73
- Unidades perdidas em média: blue=4.86, red=5.68

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.0 | 0.16 | 25.0 | 1.0 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.71 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.0 | 0.17 | 0.91 | 0.05 | 0.19 | 42.9 | 2.61 | 79.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.01 | 0.16 | 41.7 | 6.59 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.17 | 0.0 | 0.06 | 0.15 | 43.5 | 6.61 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.07 | 0.0 | 0.58 | 2.39 | 48.3 | 4.87 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.5 | 0.0 | 0.49 | 1.84 | 50.4 | 4.81 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.28 | 0.05 | 0.03 | 0.35 | 53.8 | 0.33 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.05 | 0.02 | 0.01 | 0.05 | 42.9 | 0.65 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 62.7 | 0.0 | 3.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 69.3 | 0.0 | 2.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 79.3 | 0.0 | 2.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 79.3 | 0.0 | 2.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 81.3 | 0.0 | 0.93 | 0.0 | 0.0 | — | 3.13 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 77.3 | 0.0 | 1.37 | 0.0 | 0.0 | — | 2.7 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 89.3 | 0.25 | 0.43 | 0.04 | 0.37 | 37.5 | 3.7 | — | 98.9 |
| BLUE-MPRA-2 | blue | air | 93.3 | 0.37 | 0.29 | 0.09 | 0.3 | 46.7 | 3.86 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 80.7 | 0.03 | 0.89 | 0.01 | 0.06 | 55.6 | 2.92 | 86.6 | 97.0 |
| BLUE-PAT-C2 | blue | surface | 72.7 | 0.33 | 1.11 | 0.03 | 0.37 | 53.6 | 2.44 | 89.8 | 78.7 |
| BLUE-PAT-O1 | blue | surface | 70.0 | 4.12 | 1.84 | 0.44 | 4.01 | 43.3 | 2.05 | 90.1 | 96.2 |
| BLUE-PAT-O2 | blue | surface | 90.7 | 2.69 | 0.61 | 0.49 | 2.53 | 47.8 | 3.51 | 32.5 | 84.7 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 2.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 32.7 | 0.0 | 15.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 85.3 | 0.0 | 6.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 70.0 | 0.0 | 7.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 2.79 | 1.09 | 0.39 | 2.67 | 47.8 | 2.42 | 89.7 | 96.6 |
| BLUE-SAG-S1 | blue | surface | 80.7 | 3.29 | 2.91 | 0.5 | 3.03 | 47.4 | 2.19 | 36.3 | 98.1 |
| BLUE-SAG-S2 | blue | surface | 92.0 | 3.03 | 1.34 | 0.62 | 3.4 | 40.0 | 3.37 | 35.9 | 99.7 |
| BLUE-SUB-1 | blue | submarine | 83.3 | 4.12 | 0.61 | 0.55 | 3.65 | 55.6 | 3.52 | 80.4 | 72.4 |
| BLUE-SUB-2 | blue | submarine | 96.0 | 2.15 | 0.17 | 0.61 | 2.09 | 54.0 | 4.42 | 31.1 | 94.0 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.82 | 0.17 | 0.13 | 0.66 | 57.6 | 3.75 | 84.2 | 93.1 |
| BLUE-SUB-N | blue | submarine | 72.7 | 5.63 | 1.34 | 0.55 | 5.21 | 47.5 | 1.67 | — | 76.7 |
| RED-AKE | red | surface | 60.0 | 0.0 | 2.9 | 0.0 | 0.0 | — | 7.29 | 97.6 | — |
| RED-AOR-G | red | surface | 60.7 | 0.0 | 1.83 | 0.0 | 0.0 | — | 4.59 | 99.1 | — |
| RED-AWACS-K | red | air | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.36 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.7 | 0.0 | 0.0 | — | 0.0 | 68.0 | — |
| RED-GBPA | red | surface | 97.3 | 0.95 | 0.55 | 0.18 | 0.85 | 45.7 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 59.3 | 17.5 | 6.87 | 1.09 | 11.63 | 63.2 | 3.23 | 87.8 | 75.4 |
| RED-GE-2 | red | surface | 36.7 | 12.83 | 7.74 | 0.9 | 8.11 | 64.1 | 3.27 | 80.5 | 72.1 |
| RED-GE-3 | red | surface | 70.0 | 1.22 | 3.51 | 0.14 | 1.12 | 61.3 | 2.19 | 88.3 | 90.4 |
| RED-GLOG | red | surface | 70.7 | 0.0 | 2.21 | 0.0 | 0.0 | — | 7.24 | 99.4 | — |
| RED-KMF-1 | red | air | 96.7 | 1.14 | 0.2 | 0.23 | 0.95 | 43.7 | 5.6 | — | — |
| RED-KMF-2 | red | air | 97.3 | 0.71 | 0.13 | 0.11 | 0.76 | 41.2 | 5.67 | — | — |
| RED-KS-1 | red | submarine | 14.7 | 4.84 | 2.63 | 0.35 | 3.27 | 49.4 | 2.59 | 71.7 | 67.6 |
| RED-KSN | red | submarine | 32.0 | 10.35 | 2.81 | 0.57 | 6.58 | 64.5 | 2.38 | — | 76.0 |
| RED-MPRA-K1 | red | air | 60.0 | 4.5 | 1.31 | 0.63 | 2.49 | 48.0 | 1.87 | — | 99.8 |
| RED-MPRA-K2 | red | air | 62.7 | 4.5 | 1.13 | 0.64 | 2.15 | 52.6 | 2.42 | — | 99.6 |
| RED-OPSESP-1 | red | surface | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.19 | 3.48 | 0.0 | 0.15 | 82.6 | 0.0 | — | 94.9 |

### Somente vitória decisiva

- Partidas: **60**
- Taxa de vitória: blue=53.3%, red=46.7%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.28 turnos
- Dano médio causado por equipe (pontos de HP): blue=48.78, red=69.47
- Unidades perdidas em média: blue=5.95, red=7.1

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.0 | 0.18 | 9.1 | 1.65 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.17 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.7 | 0.33 | 0.78 | 0.1 | 0.38 | 43.5 | 3.8 | 80.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.02 | 0.17 | 40.0 | 7.38 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.08 | 0.0 | 0.05 | 0.17 | 30.0 | 7.22 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.0 | 0.0 | 0.63 | 2.75 | 43.6 | 4.22 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.53 | 0.0 | 0.57 | 2.23 | 44.8 | 4.28 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.23 | 0.0 | 0.02 | 0.52 | 35.5 | 0.55 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.1 | 0.0 | 0.03 | 0.08 | 40.0 | 1.08 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 38.3 | 0.0 | 5.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 41.7 | 0.0 | 4.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 60.0 | 0.0 | 3.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 76.7 | 0.0 | 2.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 80.0 | 0.0 | 1.03 | 0.0 | 0.0 | — | 4.83 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 75.0 | 0.0 | 1.55 | 0.0 | 0.0 | — | 4.65 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 88.3 | 0.3 | 0.47 | 0.05 | 0.58 | 22.9 | 2.0 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.7 | 0.58 | 0.4 | 0.12 | 0.5 | 40.0 | 2.35 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 73.3 | 0.08 | 1.32 | 0.03 | 0.15 | 55.6 | 4.62 | 78.3 | 92.5 |
| BLUE-PAT-C2 | blue | surface | 53.3 | 0.45 | 1.93 | 0.05 | 0.53 | 50.0 | 3.4 | 89.2 | 72.5 |
| BLUE-PAT-O1 | blue | surface | 65.0 | 5.83 | 2.23 | 0.6 | 6.0 | 42.8 | 2.45 | 87.7 | 94.2 |
| BLUE-PAT-O2 | blue | surface | 95.0 | 4.0 | 0.5 | 0.62 | 3.93 | 43.2 | 4.63 | 48.2 | 87.5 |
| BLUE-PORTO-ACU | blue | land | 98.3 | 0.0 | 0.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.7 | 0.0 | 17.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 73.3 | 0.0 | 11.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 91.7 | 0.0 | 4.4 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 4.25 | 1.42 | 0.6 | 3.95 | 51.1 | 3.57 | 87.5 | 93.3 |
| BLUE-SAG-S1 | blue | surface | 71.7 | 5.23 | 3.83 | 0.75 | 5.0 | 45.3 | 3.17 | 49.2 | 96.3 |
| BLUE-SAG-S2 | blue | surface | 95.0 | 4.53 | 1.15 | 0.82 | 4.95 | 39.1 | 4.97 | 53.8 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 83.3 | 4.67 | 0.55 | 0.68 | 4.2 | 54.8 | 3.77 | 82.2 | 65.0 |
| BLUE-SUB-2 | blue | submarine | 91.7 | 2.52 | 0.28 | 0.58 | 2.25 | 54.1 | 5.02 | 60.0 | 89.4 |
| BLUE-SUB-3 | blue | submarine | 90.0 | 1.28 | 0.33 | 0.17 | 1.03 | 59.7 | 4.18 | 89.1 | 88.3 |
| BLUE-SUB-N | blue | submarine | 68.3 | 6.65 | 1.58 | 0.62 | 6.0 | 47.5 | 2.65 | — | 73.9 |
| RED-AKE | red | surface | 43.3 | 0.0 | 4.1 | 0.0 | 0.0 | — | 6.8 | 97.1 | — |
| RED-AOR-G | red | surface | 40.0 | 0.0 | 2.73 | 0.0 | 0.0 | — | 4.43 | 98.8 | — |
| RED-AWACS-K | red | air | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.8 | — | — |
| RED-GANF | red | surface | 96.7 | 0.0 | 1.3 | 0.0 | 0.0 | — | 0.0 | 66.7 | — |
| RED-GBPA | red | surface | 93.3 | 1.57 | 1.13 | 0.25 | 1.37 | 46.3 | 0.0 | — | 98.7 |
| RED-GE-1 | red | surface | 71.7 | 17.45 | 6.28 | 0.85 | 11.38 | 64.3 | 3.45 | 84.7 | 75.8 |
| RED-GE-2 | red | surface | 31.7 | 15.05 | 8.47 | 1.07 | 8.88 | 66.2 | 3.35 | 86.0 | 67.1 |
| RED-GE-3 | red | surface | 40.0 | 2.78 | 7.12 | 0.32 | 2.35 | 62.4 | 4.3 | 78.4 | 79.0 |
| RED-GLOG | red | surface | 60.0 | 0.0 | 3.12 | 0.0 | 0.0 | — | 7.47 | 99.0 | — |
| RED-KMF-1 | red | air | 91.7 | 2.18 | 0.4 | 0.4 | 1.87 | 42.0 | 8.45 | — | — |
| RED-KMF-2 | red | air | 93.3 | 1.37 | 0.27 | 0.25 | 1.57 | 38.3 | 8.58 | — | — |
| RED-KS-1 | red | submarine | 13.3 | 6.03 | 2.67 | 0.43 | 3.82 | 50.7 | 2.97 | 74.2 | 62.0 |
| RED-KSN | red | submarine | 28.3 | 11.97 | 3.1 | 0.72 | 7.05 | 67.4 | 3.02 | — | 73.6 |
| RED-MPRA-K1 | red | air | 30.0 | 5.95 | 2.2 | 0.9 | 3.27 | 51.5 | 3.83 | — | 99.4 |
| RED-MPRA-K2 | red | air | 30.0 | 5.05 | 2.1 | 0.77 | 2.7 | 50.6 | 3.88 | — | 98.9 |
| RED-OPSESP-1 | red | surface | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.8 | 0.0 | 0.07 | 75.0 | 0.0 | — | 97.8 |

## Blue: Defensiva / Dividida × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=80.0%, red=20.0%
- Motivo de conclusão: victory=40.7%, timeout=59.3%
- Duração média: 13.96 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.49, red=64.87
- Unidades perdidas em média: blue=5.8, red=5.25

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.28 | 19.0 | 1.16 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.83 | — | — |
| BLUE-AERO-CF | blue | land | 96.7 | 0.0 | 0.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 88.0 | 0.2 | 1.51 | 0.05 | 0.12 | 72.2 | 2.91 | 77.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.11 | 0.0 | 0.03 | 0.11 | 47.1 | 8.13 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.09 | 0.0 | 0.03 | 0.11 | 50.0 | 8.21 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.74 | 0.0 | 0.79 | 2.18 | 58.7 | 6.06 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.33 | 0.0 | 0.37 | 1.41 | 53.8 | 6.19 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.25 | 0.04 | 0.04 | 0.18 | 66.7 | 0.39 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.0 | 0.04 | 0.0 | 0.0 | — | 0.76 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 61.3 | 0.0 | 3.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.7 | 0.0 | 2.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 79.3 | 0.0 | 2.65 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 71.3 | 0.0 | 2.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 78.0 | 0.0 | 1.23 | 0.0 | 0.0 | — | 3.31 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 66.7 | 0.0 | 1.62 | 0.0 | 0.0 | — | 2.89 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.21 | 0.27 | 0.05 | 0.25 | 39.5 | 3.51 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 96.7 | 0.31 | 0.16 | 0.07 | 0.29 | 54.5 | 3.61 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 77.3 | 0.02 | 0.81 | 0.0 | 0.01 | 50.0 | 3.35 | 81.8 | 99.3 |
| BLUE-PAT-C2 | blue | surface | 67.3 | 0.11 | 1.31 | 0.01 | 0.19 | 51.7 | 3.01 | 85.7 | 92.7 |
| BLUE-PAT-O1 | blue | surface | 70.7 | 4.54 | 1.87 | 0.44 | 4.19 | 42.5 | 2.48 | 85.4 | 94.2 |
| BLUE-PAT-O2 | blue | surface | 82.7 | 2.55 | 1.06 | 0.46 | 2.15 | 50.2 | 4.02 | 28.5 | 90.3 |
| BLUE-PORTO-ACU | blue | land | 81.3 | 0.0 | 3.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 24.7 | 0.0 | 16.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 60.0 | 0.0 | 9.56 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 77.3 | 1.96 | 1.31 | 0.27 | 1.97 | 43.2 | 2.4 | 90.8 | 98.5 |
| BLUE-SAG-S1 | blue | surface | 69.3 | 3.03 | 4.28 | 0.39 | 2.79 | 44.9 | 2.53 | 36.1 | 99.1 |
| BLUE-SAG-S2 | blue | surface | 83.3 | 3.49 | 2.33 | 0.64 | 3.07 | 45.2 | 3.67 | 30.1 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 82.7 | 3.39 | 0.68 | 0.47 | 3.01 | 55.4 | 4.19 | 75.1 | 77.2 |
| BLUE-SUB-2 | blue | submarine | 90.0 | 2.1 | 0.35 | 0.53 | 2.09 | 52.1 | 4.77 | 29.7 | 92.9 |
| BLUE-SUB-3 | blue | submarine | 89.3 | 0.7 | 0.27 | 0.09 | 0.68 | 64.7 | 4.11 | 81.5 | 92.5 |
| BLUE-SUB-N | blue | submarine | 63.3 | 5.31 | 1.71 | 0.52 | 4.87 | 49.3 | 1.99 | — | 80.7 |
| RED-AKE | red | surface | 46.7 | 0.0 | 4.44 | 0.0 | 0.0 | — | 7.54 | 96.7 | — |
| RED-AOR-G | red | surface | 62.7 | 0.0 | 1.82 | 0.0 | 0.0 | — | 3.67 | 99.2 | — |
| RED-AWACS-K | red | air | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.81 | — | — |
| RED-GANF | red | surface | 99.3 | 0.0 | 0.78 | 0.0 | 0.0 | — | 0.0 | 56.1 | — |
| RED-GBPA | red | surface | 93.3 | 0.83 | 0.77 | 0.15 | 0.9 | 42.2 | 0.0 | — | 97.9 |
| RED-GE-1 | red | surface | 72.7 | 19.06 | 4.83 | 1.27 | 11.96 | 64.5 | 1.93 | 80.2 | 74.8 |
| RED-GE-2 | red | surface | 51.3 | 12.3 | 6.19 | 0.88 | 8.39 | 62.9 | 2.39 | 76.1 | 71.4 |
| RED-GE-3 | red | surface | 71.3 | 1.25 | 3.35 | 0.2 | 1.27 | 56.3 | 1.83 | 74.8 | 90.6 |
| RED-GLOG | red | surface | 52.7 | 0.0 | 3.69 | 0.0 | 0.0 | — | 6.78 | 99.1 | — |
| RED-KMF-1 | red | air | 93.3 | 1.05 | 0.07 | 0.19 | 0.91 | 42.6 | 4.03 | — | — |
| RED-KMF-2 | red | air | 93.3 | 0.48 | 0.03 | 0.09 | 0.72 | 32.4 | 3.97 | — | — |
| RED-KS-1 | red | submarine | 38.7 | 7.26 | 2.09 | 0.68 | 4.77 | 49.9 | 2.26 | 50.7 | 53.7 |
| RED-KSN | red | submarine | 42.0 | 13.23 | 2.63 | 1.06 | 8.61 | 61.7 | 1.95 | — | 70.5 |
| RED-MPRA-K1 | red | air | 68.0 | 5.83 | 1.03 | 0.79 | 2.81 | 53.9 | 2.39 | — | 99.9 |
| RED-MPRA-K2 | red | air | 65.3 | 3.51 | 1.05 | 0.49 | 2.09 | 46.0 | 1.85 | — | 99.7 |
| RED-OPSESP-1 | red | surface | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.73 | 0.0 | 0.05 | 87.5 | 0.0 | — | 98.2 |

### Somente vitória decisiva

- Partidas: **61**
- Taxa de vitória: blue=50.8%, red=49.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.07 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.77, red=68.89
- Unidades perdidas em média: blue=6.62, red=6.59

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.0 | 0.13 | 37.5 | 1.82 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.3 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 86.9 | 0.38 | 1.82 | 0.08 | 0.23 | 71.4 | 4.87 | 75.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.02 | 0.05 | 33.3 | 9.05 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.03 | 50.0 | 8.97 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.7 | 0.0 | 0.79 | 2.21 | 57.8 | 6.05 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.67 | 0.0 | 0.3 | 1.41 | 47.7 | 6.2 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.39 | 0.0 | 0.08 | 0.2 | 75.0 | 0.61 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 98.4 | 0.0 | 0.1 | 0.0 | 0.0 | — | 1.2 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 44.3 | 0.0 | 4.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 55.7 | 0.0 | 3.72 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 57.4 | 0.0 | 3.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 59.0 | 0.0 | 3.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 75.4 | 0.0 | 1.43 | 0.0 | 0.0 | — | 5.23 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 63.9 | 0.0 | 1.79 | 0.0 | 0.0 | — | 4.77 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 83.6 | 0.48 | 0.67 | 0.11 | 0.59 | 36.1 | 2.87 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.8 | 0.72 | 0.39 | 0.16 | 0.7 | 53.5 | 3.23 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 75.4 | 0.05 | 1.0 | 0.0 | 0.03 | 50.0 | 4.85 | 78.4 | 98.4 |
| BLUE-PAT-C2 | blue | surface | 60.7 | 0.13 | 1.69 | 0.02 | 0.23 | 50.0 | 4.85 | 80.9 | 91.0 |
| BLUE-PAT-O1 | blue | surface | 68.9 | 6.66 | 2.05 | 0.74 | 6.15 | 41.3 | 3.34 | 81.1 | 88.9 |
| BLUE-PAT-O2 | blue | surface | 86.9 | 3.3 | 0.89 | 0.59 | 2.97 | 51.4 | 5.15 | 48.5 | 89.8 |
| BLUE-PORTO-ACU | blue | land | 86.9 | 0.0 | 2.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.2 | 0.0 | 16.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.79 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 67.2 | 0.0 | 9.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 72.1 | 3.26 | 1.54 | 0.46 | 3.02 | 45.7 | 3.66 | 91.7 | 97.1 |
| BLUE-SAG-S1 | blue | surface | 78.7 | 5.48 | 3.49 | 0.67 | 5.23 | 45.1 | 4.02 | 52.2 | 98.5 |
| BLUE-SAG-S2 | blue | surface | 88.5 | 4.9 | 1.89 | 0.89 | 4.57 | 41.2 | 5.69 | 51.2 | 98.8 |
| BLUE-SUB-1 | blue | submarine | 72.1 | 4.39 | 0.97 | 0.62 | 4.02 | 55.1 | 4.39 | 80.9 | 69.7 |
| BLUE-SUB-2 | blue | submarine | 88.5 | 1.95 | 0.31 | 0.41 | 2.11 | 48.1 | 5.49 | 60.6 | 91.0 |
| BLUE-SUB-3 | blue | submarine | 85.2 | 1.05 | 0.31 | 0.15 | 0.95 | 69.0 | 4.82 | 85.0 | 89.3 |
| BLUE-SUB-N | blue | submarine | 63.9 | 6.11 | 1.7 | 0.49 | 4.92 | 52.7 | 2.85 | — | 79.1 |
| RED-AKE | red | surface | 42.6 | 0.0 | 4.77 | 0.0 | 0.0 | — | 7.46 | 96.9 | — |
| RED-AOR-G | red | surface | 44.3 | 0.0 | 2.51 | 0.0 | 0.0 | — | 4.52 | 98.4 | — |
| RED-AWACS-K | red | air | 83.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.2 | — | — |
| RED-GANF | red | surface | 98.4 | 0.0 | 1.07 | 0.0 | 0.0 | — | 0.0 | 58.1 | — |
| RED-GBPA | red | surface | 83.6 | 1.2 | 1.67 | 0.2 | 1.34 | 41.5 | 0.0 | — | 94.8 |
| RED-GE-1 | red | surface | 80.3 | 18.62 | 4.61 | 1.34 | 11.54 | 66.3 | 1.62 | 70.1 | 76.1 |
| RED-GE-2 | red | surface | 47.5 | 13.43 | 7.3 | 1.0 | 9.03 | 62.3 | 2.75 | 78.1 | 68.7 |
| RED-GE-3 | red | surface | 36.1 | 2.95 | 7.59 | 0.48 | 2.84 | 57.2 | 3.82 | 68.6 | 78.6 |
| RED-GLOG | red | surface | 42.6 | 0.0 | 4.49 | 0.0 | 0.0 | — | 6.79 | 99.3 | — |
| RED-KMF-1 | red | air | 83.6 | 1.92 | 0.16 | 0.33 | 1.7 | 42.3 | 7.72 | — | — |
| RED-KMF-2 | red | air | 83.6 | 0.98 | 0.07 | 0.18 | 1.39 | 36.5 | 7.61 | — | — |
| RED-KS-1 | red | submarine | 41.0 | 9.0 | 2.1 | 0.97 | 5.48 | 52.4 | 2.61 | 55.0 | 46.2 |
| RED-KSN | red | submarine | 34.4 | 12.89 | 2.97 | 0.97 | 7.54 | 61.7 | 2.18 | — | 73.0 |
| RED-MPRA-K1 | red | air | 37.7 | 4.46 | 1.79 | 0.69 | 2.85 | 44.8 | 4.28 | — | 99.7 |
| RED-MPRA-K2 | red | air | 34.4 | 3.33 | 1.97 | 0.48 | 2.21 | 41.5 | 3.67 | — | 99.2 |
| RED-OPSESP-1 | red | surface | 83.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.11 | 3.72 | 0.0 | 0.07 | 100.0 | 0.0 | — | 97.8 |

## Blue: Defensiva / Dividida × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=80.0%, red=20.0%
- Motivo de conclusão: victory=44.0%, timeout=56.0%
- Duração média: 13.99 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.79, red=59.17
- Unidades perdidas em média: blue=4.94, red=5.33

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.01 | 0.1 | 20.0 | 0.89 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.3 | 0.11 | 1.0 | 0.05 | 0.18 | 48.1 | 2.41 | 84.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.01 | 0.06 | 55.6 | 5.36 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.06 | 33.3 | 5.31 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.63 | 0.0 | 0.65 | 2.23 | 52.2 | 3.83 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.41 | 0.0 | 0.47 | 1.63 | 52.2 | 3.79 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.15 | 0.07 | 0.03 | 0.15 | 52.2 | 0.3 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.6 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 66.0 | 0.0 | 2.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 69.3 | 0.0 | 2.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.0 | 0.0 | 2.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 75.3 | 0.0 | 2.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.7 | 0.0 | 1.03 | 0.0 | 0.0 | — | 2.81 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 75.3 | 0.0 | 1.37 | 0.0 | 0.0 | — | 2.19 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 95.3 | 0.29 | 0.21 | 0.07 | 0.27 | 46.3 | 1.93 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 97.3 | 0.23 | 0.1 | 0.03 | 0.18 | 44.4 | 1.92 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.3 | 0.05 | 0.69 | 0.01 | 0.03 | 60.0 | 2.63 | 86.6 | 98.3 |
| BLUE-PAT-C2 | blue | surface | 80.0 | 0.19 | 0.79 | 0.0 | 0.15 | 63.6 | 2.31 | 92.1 | 91.0 |
| BLUE-PAT-O1 | blue | surface | 70.7 | 4.08 | 1.85 | 0.4 | 3.95 | 42.1 | 2.3 | 86.8 | 94.7 |
| BLUE-PAT-O2 | blue | surface | 89.3 | 2.26 | 0.77 | 0.54 | 2.27 | 49.9 | 3.23 | 31.9 | 85.3 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 3.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 30.7 | 0.0 | 16.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 60.7 | 0.0 | 9.65 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 82.7 | 1.97 | 1.07 | 0.27 | 1.98 | 43.8 | 2.18 | 91.9 | 98.5 |
| BLUE-SAG-S1 | blue | surface | 76.7 | 2.77 | 3.35 | 0.39 | 2.43 | 45.5 | 2.08 | 32.4 | 99.4 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.49 | 1.23 | 0.67 | 3.03 | 45.7 | 3.07 | 29.1 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 82.0 | 3.44 | 0.51 | 0.41 | 2.83 | 60.5 | 2.42 | 80.2 | 77.2 |
| BLUE-SUB-2 | blue | submarine | 91.3 | 1.96 | 0.29 | 0.54 | 2.21 | 50.6 | 3.27 | 33.2 | 95.9 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.54 | 0.17 | 0.08 | 0.38 | 63.2 | 2.73 | 89.4 | 95.7 |
| BLUE-SUB-N | blue | submarine | 62.0 | 6.06 | 1.66 | 0.67 | 4.63 | 54.4 | 1.62 | — | 82.6 |
| RED-AKE | red | surface | 54.7 | 0.0 | 3.59 | 0.0 | 0.0 | — | 7.68 | 96.9 | — |
| RED-AOR-G | red | surface | 59.3 | 0.0 | 2.03 | 0.0 | 0.0 | — | 4.35 | 99.3 | — |
| RED-AWACS-K | red | air | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.88 | — | — |
| RED-GANF | red | surface | 99.3 | 0.0 | 0.74 | 0.0 | 0.0 | — | 0.0 | 56.5 | — |
| RED-GBPA | red | surface | 93.3 | 0.69 | 0.69 | 0.13 | 0.65 | 46.4 | 0.0 | — | 98.1 |
| RED-GE-1 | red | surface | 69.3 | 19.9 | 5.13 | 1.38 | 12.26 | 65.3 | 2.59 | 83.8 | 74.3 |
| RED-GE-2 | red | surface | 58.0 | 11.72 | 5.44 | 0.91 | 7.99 | 61.0 | 2.49 | 80.3 | 73.5 |
| RED-GE-3 | red | surface | 66.0 | 2.0 | 4.13 | 0.25 | 1.55 | 57.5 | 2.15 | 77.7 | 86.0 |
| RED-GLOG | red | surface | 61.3 | 0.0 | 3.23 | 0.0 | 0.0 | — | 7.19 | 99.3 | — |
| RED-KMF-1 | red | air | 93.3 | 0.63 | 0.04 | 0.13 | 0.69 | 38.8 | 6.06 | — | — |
| RED-KMF-2 | red | air | 93.3 | 0.54 | 0.02 | 0.1 | 0.57 | 34.9 | 6.05 | — | — |
| RED-KS-1 | red | submarine | 31.3 | 6.17 | 2.15 | 0.58 | 4.48 | 46.0 | 1.93 | 57.3 | 56.4 |
| RED-KSN | red | submarine | 36.7 | 12.41 | 2.85 | 0.77 | 8.25 | 60.2 | 2.47 | — | 71.4 |
| RED-MPRA-K1 | red | air | 62.0 | 2.64 | 1.05 | 0.35 | 1.47 | 50.2 | 1.73 | — | 99.8 |
| RED-MPRA-K2 | red | air | 62.7 | 2.33 | 1.19 | 0.33 | 1.34 | 45.8 | 1.68 | — | 99.7 |
| RED-OPSESP-1 | red | surface | 93.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.13 | 3.5 | 0.01 | 0.09 | 64.3 | 0.0 | — | 96.9 |

### Somente vitória decisiva

- Partidas: **66**
- Taxa de vitória: blue=54.5%, red=45.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.89 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.79, red=71.15
- Unidades perdidas em média: blue=6.61, red=6.82

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.0 | 0.08 | 20.0 | 1.7 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.18 | — | — |
| BLUE-AERO-CF | blue | land | 98.5 | 0.0 | 0.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.5 | 0.0 | 0.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 87.9 | 0.26 | 1.89 | 0.11 | 0.41 | 48.1 | 4.26 | 76.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.11 | 0.0 | 0.02 | 0.06 | 50.0 | 8.67 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.09 | 0.0 | 0.03 | 0.06 | 50.0 | 8.68 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.29 | 0.0 | 0.62 | 2.36 | 47.4 | 5.89 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.29 | 0.0 | 0.44 | 1.76 | 50.0 | 5.85 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.2 | 0.0 | 0.05 | 0.21 | 50.0 | 0.58 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.15 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 53.0 | 0.0 | 4.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 53.0 | 0.0 | 4.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 53.0 | 0.0 | 3.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 60.6 | 0.0 | 3.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 71.2 | 0.0 | 1.64 | 0.0 | 0.0 | — | 5.0 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 65.2 | 0.0 | 2.14 | 0.0 | 0.0 | — | 4.02 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 89.4 | 0.58 | 0.45 | 0.11 | 0.56 | 40.5 | 2.33 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 93.9 | 0.53 | 0.23 | 0.08 | 0.41 | 44.4 | 2.26 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 72.7 | 0.03 | 1.05 | 0.0 | 0.05 | 66.7 | 5.05 | 81.1 | 97.7 |
| BLUE-PAT-C2 | blue | surface | 66.7 | 0.15 | 1.41 | 0.0 | 0.17 | 63.6 | 4.2 | 87.6 | 91.7 |
| BLUE-PAT-O1 | blue | surface | 60.6 | 5.73 | 2.5 | 0.59 | 5.68 | 40.8 | 3.0 | 82.7 | 93.6 |
| BLUE-PAT-O2 | blue | surface | 87.9 | 3.18 | 0.91 | 0.67 | 3.35 | 44.3 | 4.64 | 51.1 | 93.6 |
| BLUE-PORTO-ACU | blue | land | 92.4 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.8 | 0.0 | 17.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 66.7 | 0.0 | 9.56 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 69.7 | 3.14 | 1.92 | 0.44 | 2.94 | 46.4 | 3.67 | 88.1 | 97.7 |
| BLUE-SAG-S1 | blue | surface | 69.7 | 5.64 | 3.67 | 0.8 | 4.55 | 47.7 | 3.55 | 50.0 | 99.3 |
| BLUE-SAG-S2 | blue | surface | 89.4 | 5.71 | 1.92 | 0.95 | 5.08 | 42.1 | 4.92 | 48.3 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 72.7 | 4.97 | 0.77 | 0.64 | 4.44 | 58.4 | 4.3 | 80.9 | 66.7 |
| BLUE-SUB-2 | blue | submarine | 89.4 | 1.86 | 0.35 | 0.42 | 1.91 | 51.6 | 5.0 | 55.6 | 93.4 |
| BLUE-SUB-3 | blue | submarine | 90.9 | 1.11 | 0.32 | 0.15 | 0.79 | 63.5 | 4.45 | 89.4 | 90.9 |
| BLUE-SUB-N | blue | submarine | 57.6 | 6.92 | 1.85 | 0.71 | 5.38 | 53.8 | 2.77 | — | 77.9 |
| RED-AKE | red | surface | 40.9 | 0.0 | 4.42 | 0.0 | 0.0 | — | 7.36 | 96.3 | — |
| RED-AOR-G | red | surface | 36.4 | 0.0 | 3.14 | 0.0 | 0.0 | — | 4.11 | 98.7 | — |
| RED-AWACS-K | red | air | 84.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.83 | — | — |
| RED-GANF | red | surface | 98.5 | 0.0 | 1.48 | 0.0 | 0.0 | — | 0.0 | 52.9 | — |
| RED-GBPA | red | surface | 84.8 | 1.41 | 1.53 | 0.24 | 1.29 | 47.1 | 0.0 | — | 95.6 |
| RED-GE-1 | red | surface | 75.8 | 22.53 | 5.18 | 1.65 | 13.41 | 66.6 | 2.06 | 78.9 | 72.0 |
| RED-GE-2 | red | surface | 53.0 | 12.68 | 6.26 | 1.05 | 8.94 | 58.6 | 1.61 | 80.3 | 70.2 |
| RED-GE-3 | red | surface | 37.9 | 4.26 | 7.7 | 0.56 | 3.17 | 57.9 | 3.67 | 71.3 | 71.3 |
| RED-GLOG | red | surface | 43.9 | 0.0 | 4.47 | 0.0 | 0.0 | — | 7.47 | 98.9 | — |
| RED-KMF-1 | red | air | 84.8 | 1.29 | 0.08 | 0.27 | 1.48 | 37.8 | 8.89 | — | — |
| RED-KMF-2 | red | air | 84.8 | 1.21 | 0.05 | 0.23 | 1.23 | 35.8 | 9.0 | — | — |
| RED-KS-1 | red | submarine | 34.8 | 8.0 | 2.08 | 0.86 | 5.29 | 49.9 | 2.79 | 56.7 | 47.7 |
| RED-KSN | red | submarine | 27.3 | 12.8 | 3.41 | 0.79 | 8.23 | 59.3 | 2.67 | — | 70.3 |
| RED-MPRA-K1 | red | air | 31.8 | 3.26 | 1.86 | 0.45 | 2.2 | 46.9 | 3.05 | — | 99.5 |
| RED-MPRA-K2 | red | air | 33.3 | 3.56 | 2.18 | 0.48 | 2.05 | 47.4 | 3.24 | — | 99.2 |
| RED-OPSESP-1 | red | surface | 84.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.15 | 3.95 | 0.02 | 0.06 | 100.0 | 0.0 | — | 98.0 |
