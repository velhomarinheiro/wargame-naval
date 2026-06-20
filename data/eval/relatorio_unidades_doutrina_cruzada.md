# Desempenho por Unidade — Configurações Cruzadas de Doutrina (Blue x Red, Postura x Formação)

_Gerado em 2026-06-20_

## Metodologia

Desenho fatorial completo: cada equipe adota, de forma independente, uma das 4 combinações de **postura** (ofensiva/defensiva) x **formação** (concentrada/dividida) — totalizando 4×4 = 16 confrontos possíveis. Diferente do experimento espelhado anterior (`ml/report_doctrine_units.py`), aqui as equipes podem adotar combinações *diferentes* entre si, permitindo avaliar qual doutrina de Blue se sai melhor contra qual doutrina de Red. Os demais eixos (engajamento, política de combustível) e a estratégia base (`aggressive`/`defensive`/`flanking`) são sorteados aleatoriamente por partida. 150 partidas por confronto (2400 partidas no total). Cada confronto é reportado em dois recortes: **geral** (todas as partidas) e **vitória decisiva** (somente partidas concluídas por objetivo de cenário, excluindo o desempate de timeout por soma de HP).

## Matriz-resumo — Taxa de vitória geral (Blue% / Red%)

| Blue \ Red | Ofensiva / Concentrada | Ofensiva / Dividida | Defensiva / Concentrada | Defensiva / Dividida |
|---|---|---|---|---|
| Ofensiva / Concentrada | 78.7% / 21.3% | 83.3% / 16.7% | 78.7% / 21.3% | 80.7% / 19.3% |
| Ofensiva / Dividida | 82.0% / 18.0% | 82.0% / 18.0% | 83.3% / 16.7% | 76.7% / 23.3% |
| Defensiva / Concentrada | 72.0% / 28.0% | 77.3% / 22.7% | 74.7% / 25.3% | 78.7% / 21.3% |
| Defensiva / Dividida | 77.3% / 22.7% | 78.0% / 22.0% | 72.0% / 28.0% | 80.0% / 20.0% |

## Matriz-resumo — Taxa de vitória somente decisiva (Blue% / Red%)

| Blue \ Red | Ofensiva / Concentrada | Ofensiva / Dividida | Defensiva / Concentrada | Defensiva / Dividida |
|---|---|---|---|---|
| Ofensiva / Concentrada | 61.0% / 39.0% (n=82) | 63.8% / 36.2% (n=69) | 56.2% / 43.8% (n=73) | 61.3% / 38.7% (n=75) |
| Ofensiva / Dividida | 63.5% / 36.5% (n=74) | 64.5% / 35.5% (n=76) | 65.8% / 34.2% (n=73) | 58.3% / 41.7% (n=84) |
| Defensiva / Concentrada | 37.3% / 62.7% (n=67) | 39.3% / 60.7% (n=56) | 40.6% / 59.4% (n=64) | 45.8% / 54.2% (n=59) |
| Defensiva / Dividida | 54.1% / 45.9% (n=74) | 45.9% / 54.1% (n=61) | 37.3% / 62.7% (n=67) | 53.1% / 46.9% (n=64) |

## Blue: Ofensiva / Concentrada × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=21.3%, blue=78.7%
- Motivo de conclusão: victory=54.7%, timeout=45.3%
- Duração média: 11.53 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.31, red=55.67
- Unidades perdidas em média: blue=4.64, red=5.87

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.01 | 50.0 | 1.04 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.71 | — | — |
| BLUE-AERO-CF | blue | land | 99.3 | 0.0 | 0.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.31 | 0.29 | 0.13 | 0.45 | 45.6 | 2.24 | 87.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.04 | 50.0 | 4.27 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 66.7 | 4.3 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.39 | 0.0 | 0.64 | 2.17 | 59.5 | 2.74 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.13 | 0.0 | 0.46 | 1.55 | 64.4 | 2.69 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.32 | 0.01 | 0.06 | 0.2 | 73.3 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.69 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 68.0 | 0.0 | 3.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 66.7 | 0.0 | 3.2 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.0 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 80.7 | 0.0 | 2.24 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.7 | 0.0 | 0.82 | 0.0 | 0.0 | — | 3.22 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 76.0 | 0.0 | 1.24 | 0.0 | 0.0 | — | 2.52 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 90.0 | 0.39 | 0.38 | 0.08 | 0.33 | 56.0 | 1.32 | — | 99.6 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.41 | 0.3 | 0.09 | 0.27 | 61.0 | 1.32 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 94.0 | 0.08 | 0.23 | 0.01 | 0.09 | 64.3 | 2.61 | 90.7 | 94.7 |
| BLUE-PAT-C2 | blue | surface | 76.7 | 0.31 | 1.12 | 0.03 | 0.28 | 69.0 | 2.13 | 90.7 | 83.3 |
| BLUE-PAT-O1 | blue | surface | 37.3 | 2.83 | 3.99 | 0.33 | 2.43 | 46.7 | 1.75 | 85.9 | 87.3 |
| BLUE-PAT-O2 | blue | surface | 94.0 | 2.75 | 0.48 | 0.57 | 2.04 | 55.2 | 3.25 | 40.1 | 76.3 |
| BLUE-PORTO-ACU | blue | land | 92.0 | 0.0 | 1.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 52.7 | 0.0 | 13.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 82.0 | 0.0 | 7.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 82.7 | 0.0 | 4.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 92.0 | 3.21 | 0.65 | 0.55 | 2.57 | 52.5 | 2.6 | 94.7 | 96.9 |
| BLUE-SAG-S1 | blue | surface | 80.7 | 2.67 | 3.29 | 0.35 | 2.22 | 47.7 | 2.51 | 41.7 | 97.9 |
| BLUE-SAG-S2 | blue | surface | 89.3 | 3.2 | 1.48 | 0.72 | 2.99 | 48.0 | 2.95 | 47.6 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 81.3 | 5.46 | 0.64 | 0.78 | 4.01 | 62.1 | 3.53 | 83.5 | 62.4 |
| BLUE-SUB-2 | blue | submarine | 96.0 | 1.84 | 0.17 | 0.43 | 1.82 | 50.9 | 3.44 | 47.3 | 93.1 |
| BLUE-SUB-3 | blue | submarine | 96.0 | 0.77 | 0.15 | 0.12 | 0.42 | 66.7 | 2.63 | 93.8 | 93.3 |
| BLUE-SUB-N | blue | submarine | 57.3 | 6.19 | 1.94 | 0.51 | 3.82 | 62.0 | 2.2 | — | 75.8 |
| RED-AKE | red | surface | 70.7 | 0.0 | 2.55 | 0.0 | 0.0 | — | 7.77 | 98.4 | — |
| RED-AOR-G | red | surface | 51.3 | 0.0 | 2.46 | 0.0 | 0.0 | — | 4.81 | 99.5 | — |
| RED-AWACS-K | red | air | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.77 | — | — |
| RED-GANF | red | surface | 98.0 | 0.05 | 0.61 | 0.0 | 0.05 | 87.5 | 0.0 | 80.1 | — |
| RED-GBPA | red | surface | 73.3 | 1.07 | 2.15 | 0.19 | 1.1 | 48.5 | 0.0 | — | 98.0 |
| RED-GE-1 | red | surface | 62.0 | 15.83 | 6.25 | 1.03 | 9.99 | 65.4 | 3.32 | 85.7 | 79.0 |
| RED-GE-2 | red | surface | 44.0 | 11.71 | 7.41 | 0.73 | 6.97 | 65.6 | 3.43 | 82.1 | 73.5 |
| RED-GE-3 | red | surface | 63.3 | 1.72 | 4.42 | 0.29 | 1.43 | 64.0 | 2.53 | 87.7 | 85.0 |
| RED-GLOG | red | surface | 74.0 | 0.0 | 2.38 | 0.0 | 0.0 | — | 7.57 | 99.5 | — |
| RED-KMF-1 | red | air | 73.3 | 1.02 | 0.01 | 0.19 | 1.07 | 36.6 | 5.12 | — | — |
| RED-KMF-2 | red | air | 73.3 | 0.83 | 0.0 | 0.15 | 0.91 | 38.0 | 5.13 | — | — |
| RED-KS-1 | red | submarine | 11.3 | 6.37 | 2.75 | 0.49 | 2.76 | 66.7 | 2.81 | 79.6 | 56.4 |
| RED-KSN | red | submarine | 27.3 | 10.38 | 3.23 | 0.59 | 5.95 | 65.4 | 2.67 | — | 76.0 |
| RED-MPRA-K1 | red | air | 48.7 | 3.76 | 1.16 | 0.55 | 1.72 | 60.1 | 1.74 | — | 97.6 |
| RED-MPRA-K2 | red | air | 49.3 | 2.91 | 0.95 | 0.43 | 1.45 | 54.4 | 2.01 | — | 97.6 |
| RED-OPSESP-1 | red | surface | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 3.99 | 0.0 | 0.03 | 60.0 | 0.0 | — | 98.9 |

### Somente vitória decisiva

- Partidas: **82**
- Taxa de vitória: red=39.0%, blue=61.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.16 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.46, red=66.67
- Unidades perdidas em média: blue=5.68, red=6.88

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 1.68 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.16 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.41 | 0.1 | 0.18 | 0.65 | 43.4 | 3.24 | 85.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.09 | 0.0 | 0.01 | 0.06 | 60.0 | 5.29 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.02 | 50.0 | 5.3 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.56 | 0.0 | 0.65 | 2.33 | 59.7 | 2.91 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.11 | 0.0 | 0.51 | 1.72 | 62.4 | 2.95 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.26 | 0.0 | 0.05 | 0.18 | 73.3 | 0.56 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.12 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 52.4 | 0.0 | 4.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 46.3 | 0.0 | 4.96 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.0 | 0.0 | 4.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.0 | 0.0 | 3.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.9 | 0.0 | 1.09 | 0.0 | 0.0 | — | 4.02 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 62.2 | 0.0 | 1.96 | 0.0 | 0.0 | — | 3.89 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 91.5 | 0.45 | 0.29 | 0.09 | 0.4 | 57.6 | 1.17 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.3 | 0.34 | 0.09 | 0.32 | 50.0 | 1.15 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 91.5 | 0.15 | 0.33 | 0.02 | 0.16 | 69.2 | 3.73 | 87.0 | 91.5 |
| BLUE-PAT-C2 | blue | surface | 64.6 | 0.32 | 1.73 | 0.04 | 0.32 | 69.2 | 3.3 | 86.0 | 81.7 |
| BLUE-PAT-O1 | blue | surface | 24.4 | 4.16 | 4.84 | 0.49 | 3.28 | 49.1 | 2.3 | 86.8 | 82.9 |
| BLUE-PAT-O2 | blue | surface | 96.3 | 3.34 | 0.39 | 0.66 | 2.91 | 50.6 | 4.28 | 56.6 | 82.3 |
| BLUE-PORTO-ACU | blue | land | 97.6 | 0.0 | 0.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 51.2 | 0.0 | 15.44 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 72.0 | 0.0 | 10.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 93.9 | 0.0 | 3.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 91.5 | 4.44 | 0.76 | 0.78 | 3.44 | 54.3 | 3.8 | 92.2 | 95.0 |
| BLUE-SAG-S1 | blue | surface | 72.0 | 4.1 | 4.51 | 0.52 | 3.33 | 48.0 | 3.85 | 58.5 | 96.9 |
| BLUE-SAG-S2 | blue | surface | 89.0 | 3.71 | 1.51 | 0.71 | 3.76 | 43.8 | 4.21 | 63.0 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 80.5 | 6.5 | 0.54 | 0.96 | 4.56 | 60.7 | 4.83 | 85.4 | 54.4 |
| BLUE-SUB-2 | blue | submarine | 97.6 | 1.78 | 0.1 | 0.38 | 1.61 | 57.6 | 4.49 | 70.3 | 91.2 |
| BLUE-SUB-3 | blue | submarine | 97.6 | 1.24 | 0.1 | 0.18 | 0.6 | 73.5 | 3.85 | 95.0 | 90.1 |
| BLUE-SUB-N | blue | submarine | 51.2 | 6.54 | 2.22 | 0.55 | 4.33 | 60.8 | 3.16 | — | 72.8 |
| RED-AKE | red | surface | 57.3 | 0.0 | 3.68 | 0.0 | 0.0 | — | 7.52 | 98.2 | — |
| RED-AOR-G | red | surface | 39.0 | 0.0 | 3.15 | 0.0 | 0.0 | — | 4.41 | 99.5 | — |
| RED-AWACS-K | red | air | 51.2 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.72 | — | — |
| RED-GANF | red | surface | 96.3 | 0.09 | 1.1 | 0.0 | 0.1 | 87.5 | 0.0 | 78.7 | — |
| RED-GBPA | red | surface | 51.2 | 1.33 | 3.73 | 0.21 | 1.55 | 48.0 | 0.0 | — | 96.6 |
| RED-GE-1 | red | surface | 78.0 | 18.04 | 4.83 | 1.2 | 10.5 | 66.7 | 3.13 | 86.6 | 76.5 |
| RED-GE-2 | red | surface | 48.8 | 14.72 | 7.56 | 0.93 | 8.02 | 66.1 | 3.46 | 82.0 | 67.2 |
| RED-GE-3 | red | surface | 45.1 | 2.52 | 6.46 | 0.38 | 1.96 | 65.8 | 3.74 | 79.9 | 76.0 |
| RED-GLOG | red | surface | 59.8 | 0.0 | 3.71 | 0.0 | 0.0 | — | 7.72 | 99.2 | — |
| RED-KMF-1 | red | air | 51.2 | 1.65 | 0.01 | 0.29 | 1.61 | 37.9 | 7.09 | — | — |
| RED-KMF-2 | red | air | 51.2 | 1.44 | 0.0 | 0.24 | 1.38 | 40.7 | 7.16 | — | — |
| RED-KS-1 | red | submarine | 17.1 | 7.23 | 2.35 | 0.59 | 3.32 | 65.4 | 3.5 | 77.6 | 49.0 |
| RED-KSN | red | submarine | 23.2 | 10.85 | 3.46 | 0.6 | 6.4 | 63.6 | 3.0 | — | 73.6 |
| RED-MPRA-K1 | red | air | 11.0 | 4.39 | 1.95 | 0.62 | 2.23 | 57.4 | 2.4 | — | 95.5 |
| RED-MPRA-K2 | red | air | 13.4 | 4.41 | 1.5 | 0.63 | 2.09 | 56.7 | 2.9 | — | 95.5 |
| RED-OPSESP-1 | red | surface | 51.2 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 3.96 | 0.0 | 0.01 | 0.0 | 0.0 | — | 99.6 |

## Blue: Ofensiva / Concentrada × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=83.3%, red=16.7%
- Motivo de conclusão: timeout=54.0%, victory=46.0%
- Duração média: 12.45 turnos
- Dano médio causado por equipe (pontos de HP): blue=32.96, red=53.57
- Unidades perdidas em média: blue=4.29, red=5.09

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.63 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.36 | 0.36 | 0.14 | 0.49 | 53.4 | 2.24 | 87.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.02 | 0.0 | 0.01 | 0.04 | 50.0 | 3.19 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.01 | 0.03 | 40.0 | 3.19 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.57 | 0.0 | 0.41 | 1.67 | 51.4 | 2.05 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.21 | 0.0 | 0.38 | 1.29 | 61.1 | 2.09 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.49 | 0.07 | 0.07 | 0.31 | 78.3 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.03 | 75.0 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 74.0 | 0.0 | 2.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 78.7 | 0.0 | 2.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.0 | 0.0 | 2.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.0 | 0.0 | 2.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 93.3 | 0.0 | 0.45 | 0.0 | 0.0 | — | 3.24 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 84.0 | 0.0 | 0.93 | 0.0 | 0.0 | — | 2.09 | 99.9 | — |
| BLUE-MPRA-1 | blue | air | 90.7 | 0.33 | 0.37 | 0.06 | 0.33 | 38.0 | 1.16 | — | 98.7 |
| BLUE-MPRA-2 | blue | air | 96.7 | 0.45 | 0.09 | 0.1 | 0.27 | 50.0 | 1.17 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 97.3 | 0.07 | 0.09 | 0.01 | 0.11 | 56.2 | 2.25 | 90.1 | 93.3 |
| BLUE-PAT-C2 | blue | surface | 82.7 | 0.51 | 0.77 | 0.04 | 0.39 | 69.5 | 2.22 | 91.6 | 76.7 |
| BLUE-PAT-O1 | blue | surface | 52.7 | 1.95 | 2.8 | 0.22 | 1.88 | 46.8 | 1.65 | 94.1 | 94.7 |
| BLUE-PAT-O2 | blue | surface | 96.7 | 2.57 | 0.23 | 0.57 | 2.21 | 53.5 | 3.04 | 39.4 | 74.7 |
| BLUE-PORTO-ACU | blue | land | 88.0 | 0.0 | 2.6 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 38.0 | 0.0 | 15.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 88.0 | 0.0 | 4.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 73.3 | 0.0 | 6.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 88.0 | 2.29 | 0.81 | 0.42 | 2.33 | 46.7 | 2.27 | 91.9 | 95.5 |
| BLUE-SAG-S1 | blue | surface | 83.3 | 2.24 | 2.66 | 0.33 | 2.23 | 45.2 | 2.24 | 39.7 | 97.0 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.61 | 1.2 | 0.75 | 3.07 | 49.9 | 2.94 | 40.3 | 98.9 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 3.85 | 0.64 | 0.57 | 3.03 | 64.0 | 2.51 | 94.9 | 70.2 |
| BLUE-SUB-2 | blue | submarine | 95.3 | 2.04 | 0.15 | 0.54 | 1.77 | 58.5 | 3.0 | 41.3 | 91.9 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 0.65 | 0.15 | 0.09 | 0.4 | 65.0 | 2.14 | 95.0 | 93.2 |
| BLUE-SUB-N | blue | submarine | 60.7 | 4.71 | 1.63 | 0.35 | 3.5 | 57.0 | 1.9 | — | 76.4 |
| RED-AKE | red | surface | 74.0 | 0.0 | 2.22 | 0.0 | 0.0 | — | 6.63 | 98.3 | — |
| RED-AOR-G | red | surface | 64.7 | 0.0 | 1.81 | 0.0 | 0.0 | — | 4.17 | 99.6 | — |
| RED-AWACS-K | red | air | 75.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.02 | — | — |
| RED-GANF | red | surface | 99.3 | 0.01 | 0.39 | 0.0 | 0.01 | 100.0 | 0.0 | 87.3 | — |
| RED-GBPA | red | surface | 75.3 | 0.91 | 1.84 | 0.19 | 1.0 | 50.0 | 0.0 | — | 99.7 |
| RED-GE-1 | red | surface | 68.7 | 15.85 | 5.11 | 0.86 | 10.4 | 66.5 | 2.87 | 92.1 | 78.3 |
| RED-GE-2 | red | surface | 56.0 | 11.41 | 6.04 | 0.8 | 7.06 | 65.7 | 2.67 | 89.5 | 74.5 |
| RED-GE-3 | red | surface | 70.7 | 1.64 | 3.31 | 0.23 | 1.15 | 63.0 | 2.0 | 90.0 | 87.8 |
| RED-GLOG | red | surface | 79.3 | 0.0 | 1.63 | 0.0 | 0.0 | — | 6.35 | 99.6 | — |
| RED-KMF-1 | red | air | 75.3 | 1.11 | 0.04 | 0.16 | 1.04 | 39.7 | 3.34 | — | — |
| RED-KMF-2 | red | air | 75.3 | 0.67 | 0.02 | 0.17 | 0.87 | 38.9 | 3.3 | — | — |
| RED-KS-1 | red | submarine | 10.0 | 6.85 | 2.69 | 0.58 | 2.73 | 64.1 | 2.53 | 81.0 | 57.2 |
| RED-KSN | red | submarine | 44.0 | 9.89 | 2.31 | 0.59 | 6.19 | 66.1 | 1.96 | — | 76.1 |
| RED-MPRA-K1 | red | air | 59.3 | 3.13 | 0.9 | 0.42 | 1.41 | 59.7 | 1.5 | — | 97.8 |
| RED-MPRA-K2 | red | air | 60.0 | 2.03 | 0.75 | 0.29 | 1.0 | 56.0 | 1.38 | — | 98.4 |
| RED-OPSESP-1 | red | surface | 75.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 3.9 | 0.0 | 0.05 | 37.5 | 0.0 | — | 98.2 |

### Somente vitória decisiva

- Partidas: **69**
- Taxa de vitória: blue=63.8%, red=36.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 5.94 turnos
- Dano médio causado por equipe (pontos de HP): blue=45.36, red=68.8
- Unidades perdidas em média: blue=6.19, red=6.84

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.03 | 0.03 | 100.0 | 2.04 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.36 | — | — |
| BLUE-AERO-CF | blue | land | 98.6 | 0.0 | 0.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 95.7 | 0.72 | 0.78 | 0.28 | 1.01 | 52.9 | 4.35 | 79.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.03 | 0.09 | 50.0 | 6.94 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.07 | 40.0 | 6.94 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.52 | 0.0 | 0.52 | 1.8 | 49.2 | 4.07 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.77 | 0.0 | 0.39 | 1.3 | 58.9 | 4.16 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.46 | 0.0 | 0.07 | 0.26 | 72.2 | 0.68 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.04 | 0.0 | 0.0 | 0.04 | 66.7 | 1.36 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 55.1 | 0.0 | 4.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 59.4 | 0.0 | 3.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 56.5 | 0.0 | 4.26 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 62.3 | 0.0 | 3.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 85.5 | 0.0 | 0.97 | 0.0 | 0.0 | — | 4.54 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 68.1 | 0.0 | 1.87 | 0.0 | 0.0 | — | 4.41 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 91.3 | 0.43 | 0.3 | 0.09 | 0.51 | 37.1 | 1.96 | — | 99.5 |
| BLUE-MPRA-2 | blue | air | 95.7 | 0.46 | 0.14 | 0.13 | 0.43 | 40.0 | 2.03 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 94.2 | 0.14 | 0.2 | 0.03 | 0.23 | 56.2 | 4.81 | 80.7 | 85.5 |
| BLUE-PAT-C2 | blue | surface | 69.6 | 0.7 | 1.36 | 0.06 | 0.49 | 67.6 | 4.71 | 82.6 | 71.0 |
| BLUE-PAT-O1 | blue | surface | 21.7 | 2.88 | 4.65 | 0.33 | 2.88 | 45.7 | 2.54 | 92.5 | 92.8 |
| BLUE-PAT-O2 | blue | surface | 92.8 | 4.0 | 0.49 | 0.74 | 3.81 | 49.0 | 4.87 | 64.8 | 78.3 |
| BLUE-PORTO-ACU | blue | land | 98.6 | 0.0 | 0.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 40.6 | 0.0 | 16.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 78.3 | 0.0 | 9.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 94.2 | 0.0 | 3.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 73.9 | 3.38 | 1.77 | 0.54 | 3.64 | 47.4 | 4.23 | 90.1 | 90.9 |
| BLUE-SAG-S1 | blue | surface | 63.8 | 4.33 | 4.77 | 0.58 | 4.03 | 46.4 | 4.52 | 61.0 | 94.4 |
| BLUE-SAG-S2 | blue | surface | 84.1 | 5.94 | 2.55 | 1.04 | 4.88 | 50.7 | 5.48 | 63.9 | 97.9 |
| BLUE-SUB-1 | blue | submarine | 72.5 | 5.71 | 1.0 | 0.86 | 4.29 | 66.9 | 5.07 | 91.9 | 54.7 |
| BLUE-SUB-2 | blue | submarine | 91.3 | 2.12 | 0.28 | 0.51 | 1.71 | 59.3 | 5.45 | 75.1 | 84.2 |
| BLUE-SUB-3 | blue | submarine | 92.8 | 1.33 | 0.32 | 0.19 | 0.86 | 64.4 | 4.65 | 93.5 | 85.3 |
| BLUE-SUB-N | blue | submarine | 44.9 | 6.29 | 2.43 | 0.42 | 4.83 | 54.7 | 3.64 | — | 69.1 |
| RED-AKE | red | surface | 55.1 | 0.0 | 3.45 | 0.0 | 0.0 | — | 6.64 | 97.3 | — |
| RED-AOR-G | red | surface | 46.4 | 0.0 | 2.59 | 0.0 | 0.0 | — | 4.3 | 99.4 | — |
| RED-AWACS-K | red | air | 46.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.58 | — | — |
| RED-GANF | red | surface | 98.6 | 0.01 | 0.84 | 0.0 | 0.01 | 100.0 | 0.0 | 82.8 | — |
| RED-GBPA | red | surface | 46.4 | 1.62 | 4.0 | 0.33 | 1.78 | 48.0 | 0.0 | — | 99.4 |
| RED-GE-1 | red | surface | 79.7 | 16.54 | 4.41 | 0.87 | 9.72 | 68.0 | 3.1 | 90.6 | 78.5 |
| RED-GE-2 | red | surface | 52.2 | 13.99 | 7.12 | 1.14 | 8.2 | 65.4 | 2.86 | 85.4 | 68.0 |
| RED-GE-3 | red | surface | 42.0 | 3.38 | 6.52 | 0.46 | 2.17 | 66.0 | 3.77 | 81.1 | 74.4 |
| RED-GLOG | red | surface | 59.4 | 0.0 | 3.19 | 0.0 | 0.0 | — | 6.81 | 99.3 | — |
| RED-KMF-1 | red | air | 46.4 | 2.25 | 0.09 | 0.3 | 2.06 | 40.8 | 6.3 | — | — |
| RED-KMF-2 | red | air | 46.4 | 1.38 | 0.04 | 0.32 | 1.72 | 38.7 | 6.19 | — | — |
| RED-KS-1 | red | submarine | 20.3 | 8.49 | 2.23 | 0.81 | 3.65 | 64.7 | 3.38 | 77.5 | 45.2 |
| RED-KSN | red | submarine | 24.6 | 10.3 | 3.19 | 0.51 | 5.88 | 69.7 | 2.64 | — | 76.3 |
| RED-MPRA-K1 | red | air | 13.0 | 6.46 | 1.91 | 0.86 | 2.83 | 60.5 | 2.74 | — | 95.2 |
| RED-MPRA-K2 | red | air | 15.9 | 4.35 | 1.57 | 0.58 | 2.04 | 57.4 | 2.93 | — | 96.6 |
| RED-OPSESP-1 | red | surface | 46.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 4.22 | 0.0 | 0.04 | 33.3 | 0.0 | — | 98.6 |

## Blue: Ofensiva / Concentrada × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=78.7%, red=21.3%
- Motivo de conclusão: timeout=51.3%, victory=48.7%
- Duração média: 12.26 turnos
- Dano médio causado por equipe (pontos de HP): blue=32.47, red=61.83
- Unidades perdidas em média: blue=5.38, red=4.81

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.02 | 66.7 | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.63 | — | — |
| BLUE-AERO-CF | blue | land | 97.3 | 0.0 | 0.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.7 | 0.0 | 0.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.17 | 0.4 | 0.05 | 0.17 | 50.0 | 2.12 | 83.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.04 | 50.0 | 3.93 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.01 | 0.03 | 60.0 | 3.91 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.81 | 0.0 | 0.56 | 1.89 | 58.7 | 2.53 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.88 | 0.0 | 0.39 | 1.35 | 55.0 | 2.49 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.33 | 0.02 | 0.05 | 0.2 | 80.0 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 62.0 | 0.0 | 3.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.0 | 0.0 | 2.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 72.7 | 0.0 | 2.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 71.3 | 0.0 | 2.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.7 | 0.0 | 0.83 | 0.0 | 0.0 | — | 2.43 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 75.3 | 0.0 | 1.37 | 0.0 | 0.0 | — | 1.93 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 94.7 | 0.19 | 0.18 | 0.04 | 0.26 | 35.9 | 1.17 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 96.0 | 0.3 | 0.11 | 0.05 | 0.2 | 50.0 | 1.17 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 93.3 | 0.07 | 0.34 | 0.0 | 0.06 | 77.8 | 2.41 | 87.9 | 95.3 |
| BLUE-PAT-C2 | blue | surface | 78.0 | 0.23 | 1.01 | 0.03 | 0.21 | 61.3 | 2.22 | 92.0 | 88.0 |
| BLUE-PAT-O1 | blue | surface | 50.0 | 2.53 | 3.02 | 0.25 | 2.43 | 43.3 | 1.97 | 87.3 | 88.7 |
| BLUE-PAT-O2 | blue | surface | 90.0 | 2.75 | 0.72 | 0.63 | 2.1 | 53.7 | 3.28 | 34.1 | 78.7 |
| BLUE-PORTO-ACU | blue | land | 81.3 | 0.0 | 3.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 30.7 | 0.0 | 16.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 58.7 | 0.0 | 9.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 2.04 | 1.05 | 0.28 | 1.9 | 48.1 | 2.39 | 90.2 | 97.5 |
| BLUE-SAG-S1 | blue | surface | 74.7 | 1.94 | 3.92 | 0.27 | 1.83 | 45.8 | 2.05 | 36.0 | 98.8 |
| BLUE-SAG-S2 | blue | surface | 94.0 | 2.91 | 1.13 | 0.67 | 2.65 | 46.5 | 2.93 | 35.3 | 99.7 |
| BLUE-SUB-1 | blue | submarine | 76.7 | 3.23 | 0.86 | 0.45 | 2.39 | 61.7 | 2.75 | 88.4 | 74.1 |
| BLUE-SUB-2 | blue | submarine | 87.3 | 2.15 | 0.51 | 0.49 | 2.18 | 51.1 | 3.3 | 44.8 | 93.0 |
| BLUE-SUB-3 | blue | submarine | 93.3 | 0.6 | 0.19 | 0.09 | 0.42 | 68.3 | 2.4 | 91.2 | 93.7 |
| BLUE-SUB-N | blue | submarine | 50.7 | 5.25 | 2.17 | 0.49 | 3.19 | 61.1 | 1.97 | — | 79.6 |
| RED-AKE | red | surface | 58.0 | 0.0 | 3.38 | 0.0 | 0.0 | — | 8.41 | 97.4 | — |
| RED-AOR-G | red | surface | 66.7 | 0.0 | 1.63 | 0.0 | 0.0 | — | 4.71 | 99.4 | — |
| RED-AWACS-K | red | air | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.32 | — | — |
| RED-GANF | red | surface | 99.3 | 0.01 | 0.49 | 0.0 | 0.01 | 100.0 | 0.0 | 73.1 | — |
| RED-GBPA | red | surface | 73.3 | 1.07 | 2.1 | 0.18 | 1.09 | 50.9 | 0.0 | — | 98.0 |
| RED-GE-1 | red | surface | 81.3 | 17.53 | 3.21 | 1.23 | 10.89 | 65.7 | 2.07 | 85.5 | 77.3 |
| RED-GE-2 | red | surface | 74.0 | 14.49 | 4.74 | 1.05 | 7.79 | 65.7 | 2.62 | 81.1 | 69.8 |
| RED-GE-3 | red | surface | 69.3 | 1.63 | 3.76 | 0.23 | 1.21 | 64.1 | 2.28 | 78.9 | 85.4 |
| RED-GLOG | red | surface | 65.3 | 0.0 | 2.85 | 0.0 | 0.0 | — | 8.15 | 99.4 | — |
| RED-KMF-1 | red | air | 73.3 | 0.69 | 0.01 | 0.13 | 0.81 | 32.0 | 4.44 | — | — |
| RED-KMF-2 | red | air | 73.3 | 0.63 | 0.0 | 0.14 | 0.73 | 35.8 | 4.4 | — | — |
| RED-KS-1 | red | submarine | 34.0 | 7.5 | 2.21 | 0.73 | 3.61 | 65.7 | 2.17 | 63.9 | 48.6 |
| RED-KSN | red | submarine | 47.3 | 12.93 | 2.47 | 0.89 | 7.84 | 67.9 | 1.99 | — | 70.5 |
| RED-MPRA-K1 | red | air | 51.3 | 3.03 | 0.89 | 0.45 | 1.43 | 52.6 | 2.04 | — | 98.2 |
| RED-MPRA-K2 | red | air | 53.3 | 2.3 | 0.79 | 0.36 | 1.01 | 59.6 | 1.76 | — | 98.9 |
| RED-OPSESP-1 | red | surface | 73.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 3.94 | 0.0 | 0.02 | 66.7 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **73**
- Taxa de vitória: red=43.8%, blue=56.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.21 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.42, red=70.75
- Unidades perdidas em média: blue=6.53, red=5.82

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.03 | 50.0 | 1.77 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.19 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.08 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.6 | 0.0 | 0.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 95.9 | 0.25 | 0.63 | 0.07 | 0.3 | 45.5 | 3.81 | 82.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.01 | 0.07 | 40.0 | 6.15 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.05 | 75.0 | 6.11 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.01 | 0.0 | 0.7 | 1.99 | 58.6 | 3.6 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.33 | 0.0 | 0.33 | 1.29 | 50.0 | 3.55 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.27 | 0.0 | 0.03 | 0.21 | 73.3 | 0.59 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 1.18 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 50.7 | 0.0 | 4.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 54.8 | 0.0 | 3.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 57.5 | 0.0 | 4.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.4 | 0.0 | 3.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 79.5 | 0.0 | 1.16 | 0.0 | 0.0 | — | 4.07 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 68.5 | 0.0 | 1.96 | 0.0 | 0.0 | — | 3.58 | 99.1 | — |
| BLUE-MPRA-1 | blue | air | 91.8 | 0.27 | 0.3 | 0.07 | 0.42 | 32.3 | 1.59 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 93.2 | 0.38 | 0.19 | 0.05 | 0.32 | 52.2 | 1.56 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 93.2 | 0.12 | 0.4 | 0.0 | 0.11 | 75.0 | 4.3 | 84.2 | 91.8 |
| BLUE-PAT-C2 | blue | surface | 68.5 | 0.3 | 1.45 | 0.05 | 0.21 | 66.7 | 3.93 | 89.7 | 87.7 |
| BLUE-PAT-O1 | blue | surface | 16.4 | 3.08 | 5.01 | 0.32 | 2.86 | 43.5 | 2.63 | 78.4 | 80.1 |
| BLUE-PAT-O2 | blue | surface | 94.5 | 3.77 | 0.33 | 0.75 | 3.18 | 46.1 | 4.85 | 58.6 | 88.4 |
| BLUE-PORTO-ACU | blue | land | 91.8 | 0.0 | 2.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 27.4 | 0.0 | 17.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 65.8 | 0.0 | 8.74 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 74.0 | 2.81 | 1.63 | 0.37 | 2.62 | 47.6 | 4.15 | 91.2 | 95.4 |
| BLUE-SAG-S1 | blue | surface | 63.0 | 3.4 | 5.42 | 0.45 | 3.26 | 44.1 | 3.71 | 59.3 | 97.6 |
| BLUE-SAG-S2 | blue | surface | 93.2 | 4.23 | 1.51 | 0.86 | 4.03 | 43.5 | 5.14 | 60.1 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 72.6 | 4.44 | 0.93 | 0.59 | 3.33 | 61.3 | 4.4 | 89.3 | 61.6 |
| BLUE-SUB-2 | blue | submarine | 93.2 | 2.07 | 0.38 | 0.4 | 1.81 | 56.1 | 5.16 | 71.2 | 88.4 |
| BLUE-SUB-3 | blue | submarine | 93.2 | 1.04 | 0.14 | 0.18 | 0.68 | 70.0 | 4.4 | 91.0 | 89.7 |
| BLUE-SUB-N | blue | submarine | 45.2 | 6.51 | 2.47 | 0.56 | 3.85 | 62.6 | 3.34 | — | 74.6 |
| RED-AKE | red | surface | 47.9 | 0.0 | 4.08 | 0.0 | 0.0 | — | 7.1 | 97.1 | — |
| RED-AOR-G | red | surface | 52.1 | 0.0 | 2.29 | 0.0 | 0.0 | — | 3.49 | 99.1 | — |
| RED-AWACS-K | red | air | 46.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.86 | — | — |
| RED-GANF | red | surface | 98.6 | 0.01 | 1.01 | 0.0 | 0.01 | 100.0 | 0.0 | 75.3 | — |
| RED-GBPA | red | surface | 46.6 | 1.47 | 4.07 | 0.22 | 1.74 | 45.7 | 0.0 | — | 96.2 |
| RED-GE-1 | red | surface | 97.3 | 17.26 | 1.21 | 1.26 | 10.11 | 65.6 | 1.33 | 88.0 | 78.8 |
| RED-GE-2 | red | surface | 82.2 | 16.93 | 5.22 | 1.3 | 8.63 | 65.4 | 2.37 | 82.5 | 65.0 |
| RED-GE-3 | red | surface | 46.6 | 2.88 | 6.73 | 0.38 | 2.11 | 64.3 | 3.63 | 74.5 | 74.0 |
| RED-GLOG | red | surface | 50.7 | 0.0 | 3.96 | 0.0 | 0.0 | — | 6.84 | 99.1 | — |
| RED-KMF-1 | red | air | 46.6 | 1.26 | 0.03 | 0.23 | 1.45 | 33.0 | 6.01 | — | — |
| RED-KMF-2 | red | air | 46.6 | 1.05 | 0.0 | 0.21 | 1.3 | 34.7 | 5.89 | — | — |
| RED-KS-1 | red | submarine | 47.9 | 8.84 | 1.81 | 0.79 | 3.88 | 67.5 | 2.56 | 62.3 | 43.3 |
| RED-KSN | red | submarine | 37.0 | 12.23 | 3.05 | 0.85 | 6.88 | 68.7 | 1.88 | — | 72.3 |
| RED-MPRA-K1 | red | air | 9.6 | 5.23 | 1.51 | 0.78 | 2.36 | 54.1 | 3.01 | — | 96.3 |
| RED-MPRA-K2 | red | air | 13.7 | 3.56 | 1.3 | 0.51 | 1.59 | 59.5 | 2.85 | — | 97.7 |
| RED-OPSESP-1 | red | surface | 46.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 4.16 | 0.0 | 0.03 | 50.0 | 0.0 | — | 99.1 |

## Blue: Ofensiva / Concentrada × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=80.7%, red=19.3%
- Motivo de conclusão: timeout=50.0%, victory=50.0%
- Duração média: 12.37 turnos
- Dano médio causado por equipe (pontos de HP): blue=33.56, red=60.91
- Unidades perdidas em média: blue=5.08, red=5.13

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.01 | 0.04 | 50.0 | 0.95 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.65 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.22 | 0.1 | 0.05 | 0.24 | 50.0 | 2.03 | 86.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.05 | 37.5 | 3.29 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.05 | 42.9 | 3.29 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.0 | 0.0 | 0.59 | 1.93 | 62.8 | 2.01 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.33 | 0.0 | 0.46 | 1.39 | 59.1 | 2.06 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.19 | 0.09 | 0.02 | 0.13 | 70.0 | 0.32 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.64 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 69.3 | 0.0 | 2.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 74.0 | 0.0 | 2.56 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.7 | 0.0 | 2.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.0 | 0.0 | 3.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.0 | 0.0 | 0.89 | 0.0 | 0.0 | — | 2.78 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 68.7 | 0.0 | 1.72 | 0.0 | 0.0 | — | 1.91 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 95.3 | 0.35 | 0.11 | 0.08 | 0.29 | 47.7 | 1.26 | — | 99.8 |
| BLUE-MPRA-2 | blue | air | 94.7 | 0.17 | 0.17 | 0.04 | 0.24 | 36.1 | 1.22 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 96.7 | 0.05 | 0.15 | 0.0 | 0.04 | 100.0 | 2.3 | 88.1 | 97.3 |
| BLUE-PAT-C2 | blue | surface | 78.7 | 0.25 | 1.03 | 0.02 | 0.27 | 62.5 | 2.23 | 88.1 | 81.3 |
| BLUE-PAT-O1 | blue | surface | 52.7 | 2.81 | 2.85 | 0.24 | 2.55 | 43.7 | 1.87 | 88.4 | 93.7 |
| BLUE-PAT-O2 | blue | surface | 96.0 | 2.92 | 0.37 | 0.65 | 2.15 | 54.2 | 3.08 | 32.5 | 78.0 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 3.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.0 | 0.0 | 16.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 1.81 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 52.7 | 0.0 | 10.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 1.75 | 0.93 | 0.29 | 1.83 | 42.3 | 2.2 | 90.7 | 98.3 |
| BLUE-SAG-S1 | blue | surface | 80.0 | 2.41 | 3.65 | 0.33 | 1.94 | 46.0 | 2.35 | 33.7 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 94.0 | 2.82 | 1.23 | 0.65 | 2.63 | 47.5 | 2.76 | 31.5 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 79.3 | 3.03 | 0.81 | 0.45 | 2.37 | 58.9 | 3.01 | 85.7 | 78.7 |
| BLUE-SUB-2 | blue | submarine | 94.0 | 2.17 | 0.31 | 0.55 | 1.9 | 55.4 | 3.13 | 40.3 | 94.8 |
| BLUE-SUB-3 | blue | submarine | 96.0 | 0.54 | 0.15 | 0.1 | 0.37 | 61.8 | 2.36 | 92.3 | 94.2 |
| BLUE-SUB-N | blue | submarine | 56.0 | 5.45 | 2.05 | 0.58 | 3.38 | 62.7 | 1.95 | — | 79.1 |
| RED-AKE | red | surface | 58.0 | 0.0 | 3.42 | 0.0 | 0.0 | — | 7.67 | 98.0 | — |
| RED-AOR-G | red | surface | 67.3 | 0.0 | 1.69 | 0.0 | 0.0 | — | 3.89 | 99.4 | — |
| RED-AWACS-K | red | air | 70.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.62 | — | — |
| RED-GANF | red | surface | 98.0 | 0.01 | 0.7 | 0.0 | 0.01 | 100.0 | 0.0 | 74.0 | — |
| RED-GBPA | red | surface | 70.0 | 0.85 | 2.28 | 0.15 | 1.13 | 45.6 | 0.0 | — | 99.1 |
| RED-GE-1 | red | surface | 81.3 | 17.47 | 3.37 | 1.16 | 11.18 | 64.8 | 2.42 | 85.2 | 75.8 |
| RED-GE-2 | red | surface | 70.0 | 12.43 | 4.27 | 0.81 | 7.33 | 67.1 | 2.0 | 80.9 | 72.8 |
| RED-GE-3 | red | surface | 69.3 | 2.11 | 3.59 | 0.27 | 1.28 | 71.4 | 2.09 | 83.7 | 83.4 |
| RED-GLOG | red | surface | 61.3 | 0.0 | 3.11 | 0.0 | 0.0 | — | 6.95 | 99.3 | — |
| RED-KMF-1 | red | air | 70.0 | 0.88 | 0.0 | 0.17 | 0.78 | 40.2 | 4.65 | — | — |
| RED-KMF-2 | red | air | 70.0 | 0.62 | 0.0 | 0.12 | 0.64 | 35.4 | 4.74 | — | — |
| RED-KS-1 | red | submarine | 30.7 | 7.73 | 2.23 | 0.67 | 3.33 | 68.5 | 2.25 | 67.0 | 51.4 |
| RED-KSN | red | submarine | 38.0 | 13.61 | 2.77 | 0.97 | 7.92 | 64.7 | 2.09 | — | 70.7 |
| RED-MPRA-K1 | red | air | 52.0 | 2.89 | 0.98 | 0.41 | 1.39 | 62.0 | 1.79 | — | 97.3 |
| RED-MPRA-K2 | red | air | 50.0 | 2.31 | 1.05 | 0.35 | 1.17 | 52.6 | 1.53 | — | 97.6 |
| RED-OPSESP-1 | red | surface | 70.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.1 | 0.0 | 0.01 | 0.0 | 0.0 | — | 99.8 |

### Somente vitória decisiva

- Partidas: **75**
- Taxa de vitória: red=38.7%, blue=61.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.75 turnos
- Dano médio causado por equipe (pontos de HP): blue=42.91, red=75.69
- Unidades perdidas em média: blue=6.83, red=6.37

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.08 | 50.0 | 1.85 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.27 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.41 | 0.2 | 0.09 | 0.47 | 48.6 | 3.73 | 78.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.09 | 0.0 | 0.01 | 0.11 | 37.5 | 6.12 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.08 | 0.0 | 0.03 | 0.09 | 42.9 | 6.11 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.8 | 0.0 | 0.69 | 2.19 | 63.4 | 3.63 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.99 | 0.0 | 0.43 | 1.52 | 53.5 | 3.72 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.12 | 44.4 | 0.63 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.25 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 61.3 | 0.0 | 3.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 60.0 | 0.0 | 3.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 56.0 | 0.0 | 4.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 52.0 | 0.0 | 4.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 73.3 | 0.0 | 1.41 | 0.0 | 0.0 | — | 4.21 | 99.0 | — |
| BLUE-LOG-T | blue | surface | 50.7 | 0.0 | 2.77 | 0.0 | 0.0 | — | 3.71 | 99.1 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.61 | 0.2 | 0.12 | 0.49 | 45.9 | 2.11 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 90.7 | 0.33 | 0.25 | 0.08 | 0.44 | 39.4 | 2.07 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 96.0 | 0.09 | 0.23 | 0.0 | 0.08 | 100.0 | 4.4 | 80.7 | 94.7 |
| BLUE-PAT-C2 | blue | surface | 68.0 | 0.27 | 1.43 | 0.03 | 0.29 | 68.2 | 4.24 | 81.8 | 81.3 |
| BLUE-PAT-O1 | blue | surface | 20.0 | 3.07 | 4.81 | 0.28 | 3.15 | 41.5 | 2.57 | 82.9 | 90.7 |
| BLUE-PAT-O2 | blue | surface | 94.7 | 3.73 | 0.39 | 0.65 | 3.15 | 43.6 | 4.6 | 55.5 | 92.7 |
| BLUE-PORTO-ACU | blue | land | 93.3 | 0.0 | 2.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 16.0 | 0.0 | 18.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 54.7 | 0.0 | 10.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 69.3 | 2.61 | 1.76 | 0.43 | 2.71 | 44.8 | 4.05 | 88.8 | 96.8 |
| BLUE-SAG-S1 | blue | surface | 65.3 | 4.45 | 4.95 | 0.6 | 3.52 | 45.8 | 4.31 | 56.8 | 96.9 |
| BLUE-SAG-S2 | blue | surface | 89.3 | 4.51 | 2.15 | 0.99 | 4.08 | 47.1 | 5.03 | 54.4 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 74.7 | 4.45 | 0.92 | 0.71 | 3.47 | 59.2 | 5.0 | 85.0 | 70.8 |
| BLUE-SUB-2 | blue | submarine | 96.0 | 1.83 | 0.16 | 0.43 | 1.47 | 55.5 | 5.08 | 68.1 | 91.5 |
| BLUE-SUB-3 | blue | submarine | 93.3 | 0.95 | 0.28 | 0.17 | 0.65 | 61.2 | 4.6 | 91.1 | 89.5 |
| BLUE-SUB-N | blue | submarine | 50.7 | 6.53 | 2.36 | 0.61 | 4.09 | 62.9 | 3.39 | — | 72.1 |
| RED-AKE | red | surface | 44.0 | 0.0 | 4.33 | 0.0 | 0.0 | — | 7.63 | 98.0 | — |
| RED-AOR-G | red | surface | 50.7 | 0.0 | 2.57 | 0.0 | 0.0 | — | 3.56 | 98.8 | — |
| RED-AWACS-K | red | air | 40.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 7.27 | — | — |
| RED-GANF | red | surface | 96.0 | 0.03 | 1.4 | 0.0 | 0.03 | 100.0 | 0.0 | 73.0 | — |
| RED-GBPA | red | surface | 40.0 | 1.55 | 4.51 | 0.27 | 1.97 | 46.6 | 0.0 | — | 98.4 |
| RED-GE-1 | red | surface | 98.7 | 18.52 | 1.57 | 1.24 | 11.68 | 65.1 | 1.87 | 83.3 | 73.9 |
| RED-GE-2 | red | surface | 78.7 | 15.59 | 4.07 | 1.05 | 8.65 | 68.4 | 1.39 | 79.8 | 67.0 |
| RED-GE-3 | red | surface | 45.3 | 3.63 | 6.43 | 0.41 | 2.29 | 71.5 | 3.41 | 79.5 | 68.9 |
| RED-GLOG | red | surface | 45.3 | 0.0 | 4.41 | 0.0 | 0.0 | — | 7.48 | 98.9 | — |
| RED-KMF-1 | red | air | 40.0 | 1.73 | 0.0 | 0.32 | 1.49 | 41.1 | 7.29 | — | — |
| RED-KMF-2 | red | air | 40.0 | 1.12 | 0.0 | 0.23 | 1.2 | 35.6 | 7.31 | — | — |
| RED-KS-1 | red | submarine | 45.3 | 9.2 | 1.73 | 0.89 | 3.91 | 72.4 | 3.05 | 65.1 | 42.5 |
| RED-KSN | red | submarine | 21.3 | 14.49 | 3.71 | 0.99 | 7.85 | 67.2 | 2.12 | — | 68.2 |
| RED-MPRA-K1 | red | air | 10.7 | 5.41 | 1.72 | 0.76 | 2.56 | 61.5 | 3.27 | — | 94.7 |
| RED-MPRA-K2 | red | air | 5.3 | 4.43 | 1.95 | 0.67 | 2.17 | 53.4 | 2.49 | — | 95.1 |
| RED-OPSESP-1 | red | surface | 40.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.51 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## Blue: Ofensiva / Dividida × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=82.0%, red=18.0%
- Motivo de conclusão: victory=49.3%, timeout=50.7%
- Duração média: 11.98 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.83, red=53.1
- Unidades perdidas em média: blue=4.57, red=5.56

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.0 | 0.05 | 37.5 | 1.02 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.69 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.33 | 0.23 | 0.13 | 0.35 | 53.8 | 2.19 | 88.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.02 | 33.3 | 3.83 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 3.84 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.94 | 0.0 | 0.55 | 2.04 | 59.2 | 2.34 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.45 | 0.0 | 0.41 | 1.55 | 53.9 | 2.35 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.47 | 0.01 | 0.07 | 0.3 | 66.7 | 0.33 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 0.68 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 71.3 | 0.0 | 2.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.7 | 0.0 | 2.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 74.7 | 0.0 | 2.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 76.0 | 0.0 | 2.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 88.7 | 0.0 | 0.57 | 0.0 | 0.0 | — | 4.31 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 78.7 | 0.0 | 1.4 | 0.0 | 0.0 | — | 2.71 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.28 | 0.18 | 0.07 | 0.25 | 51.4 | 1.23 | — | 99.1 |
| BLUE-MPRA-2 | blue | air | 94.7 | 0.21 | 0.16 | 0.03 | 0.21 | 56.2 | 1.2 | — | 99.1 |
| BLUE-PAT-C1 | blue | surface | 88.7 | 0.21 | 0.43 | 0.03 | 0.14 | 61.9 | 2.44 | 86.7 | 90.0 |
| BLUE-PAT-C2 | blue | surface | 84.7 | 0.41 | 0.76 | 0.02 | 0.44 | 62.1 | 2.47 | 90.7 | 74.7 |
| BLUE-PAT-O1 | blue | surface | 43.3 | 2.57 | 3.68 | 0.28 | 2.24 | 48.2 | 1.73 | 86.4 | 80.7 |
| BLUE-PAT-O2 | blue | surface | 89.3 | 2.94 | 0.65 | 0.65 | 2.21 | 55.0 | 3.89 | 48.0 | 69.7 |
| BLUE-PORTO-ACU | blue | land | 93.3 | 0.0 | 1.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 51.3 | 0.0 | 13.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 86.7 | 0.0 | 6.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 85.3 | 0.0 | 4.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.3 | 2.73 | 0.87 | 0.53 | 2.53 | 50.1 | 2.58 | 94.3 | 97.2 |
| BLUE-SAG-S1 | blue | surface | 78.0 | 2.27 | 3.23 | 0.33 | 2.1 | 48.6 | 2.4 | 53.1 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 90.0 | 3.41 | 1.51 | 0.7 | 3.01 | 46.5 | 3.61 | 51.3 | 99.7 |
| BLUE-SUB-1 | blue | submarine | 78.7 | 4.53 | 0.71 | 0.71 | 3.73 | 59.3 | 3.51 | 87.1 | 65.0 |
| BLUE-SUB-2 | blue | submarine | 94.7 | 1.85 | 0.21 | 0.41 | 1.86 | 51.6 | 3.47 | 52.9 | 92.0 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.73 | 0.16 | 0.09 | 0.55 | 67.5 | 2.51 | 94.4 | 91.5 |
| BLUE-SUB-N | blue | submarine | 52.7 | 6.41 | 2.26 | 0.53 | 4.23 | 63.5 | 2.29 | — | 72.5 |
| RED-AKE | red | surface | 66.7 | 0.0 | 2.75 | 0.0 | 0.0 | — | 7.53 | 98.3 | — |
| RED-AOR-G | red | surface | 66.0 | 0.0 | 1.63 | 0.0 | 0.0 | — | 5.36 | 99.4 | — |
| RED-AWACS-K | red | air | 76.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.15 | — | — |
| RED-GANF | red | surface | 99.3 | 0.02 | 0.76 | 0.0 | 0.04 | 50.0 | 0.0 | 81.7 | — |
| RED-GBPA | red | surface | 76.0 | 1.09 | 2.03 | 0.21 | 1.3 | 47.7 | 0.0 | — | 96.5 |
| RED-GE-1 | red | surface | 61.3 | 13.65 | 6.11 | 0.93 | 9.05 | 66.5 | 3.42 | 90.9 | 81.9 |
| RED-GE-2 | red | surface | 50.7 | 11.5 | 6.59 | 0.71 | 7.01 | 65.7 | 3.69 | 85.0 | 74.4 |
| RED-GE-3 | red | surface | 68.7 | 2.11 | 3.91 | 0.33 | 1.63 | 63.9 | 2.44 | 89.1 | 81.2 |
| RED-GLOG | red | surface | 72.0 | 0.0 | 2.49 | 0.0 | 0.0 | — | 7.33 | 99.4 | — |
| RED-KMF-1 | red | air | 76.0 | 1.21 | 0.0 | 0.23 | 1.16 | 42.5 | 4.57 | — | — |
| RED-KMF-2 | red | air | 76.0 | 0.91 | 0.01 | 0.15 | 0.95 | 36.4 | 4.53 | — | — |
| RED-KS-1 | red | submarine | 14.0 | 6.66 | 2.66 | 0.55 | 2.67 | 68.2 | 2.72 | 79.4 | 58.2 |
| RED-KSN | red | submarine | 27.3 | 9.86 | 2.97 | 0.59 | 5.85 | 65.6 | 2.62 | — | 76.5 |
| RED-MPRA-K1 | red | air | 56.7 | 3.71 | 1.03 | 0.54 | 1.73 | 52.3 | 1.7 | — | 97.8 |
| RED-MPRA-K2 | red | air | 56.7 | 2.33 | 1.03 | 0.33 | 1.26 | 52.9 | 1.59 | — | 98.7 |
| RED-OPSESP-1 | red | surface | 76.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 3.86 | 0.0 | 0.03 | 60.0 | 0.0 | — | 98.9 |

### Somente vitória decisiva

- Partidas: **74**
- Taxa de vitória: blue=63.5%, red=36.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 5.8 turnos
- Dano médio causado por equipe (pontos de HP): blue=45.65, red=68.78
- Unidades perdidas em média: blue=6.04, red=6.61

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.0 | 0.08 | 50.0 | 1.91 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.28 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.59 | 0.0 | 0.22 | 0.58 | 51.2 | 3.34 | 83.3 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.01 | 0.01 | 100.0 | 5.92 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.96 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.27 | 0.0 | 0.61 | 2.03 | 60.7 | 3.08 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.08 | 0.0 | 0.41 | 1.49 | 47.3 | 3.11 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.16 | 0.0 | 0.04 | 0.19 | 50.0 | 0.62 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.01 | 100.0 | 1.27 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 56.8 | 0.0 | 3.8 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 48.6 | 0.0 | 4.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 56.8 | 0.0 | 4.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.9 | 0.0 | 3.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.4 | 0.0 | 0.91 | 0.0 | 0.0 | — | 4.69 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 66.2 | 0.0 | 2.11 | 0.0 | 0.0 | — | 4.35 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 95.9 | 0.34 | 0.12 | 0.11 | 0.38 | 46.4 | 1.28 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 94.6 | 0.27 | 0.18 | 0.05 | 0.3 | 50.0 | 1.18 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 81.1 | 0.41 | 0.65 | 0.05 | 0.27 | 60.0 | 4.43 | 77.0 | 81.1 |
| BLUE-PAT-C2 | blue | surface | 78.4 | 0.35 | 0.96 | 0.03 | 0.31 | 69.6 | 4.31 | 84.2 | 79.7 |
| BLUE-PAT-O1 | blue | surface | 23.0 | 3.54 | 5.09 | 0.36 | 3.03 | 47.8 | 2.5 | 86.4 | 70.3 |
| BLUE-PAT-O2 | blue | surface | 83.8 | 4.09 | 1.04 | 0.78 | 3.51 | 49.2 | 5.59 | 67.2 | 68.9 |
| BLUE-PORTO-ACU | blue | land | 97.3 | 0.0 | 0.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 40.5 | 0.0 | 16.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 75.7 | 0.0 | 10.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 93.2 | 0.0 | 3.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 81.1 | 3.57 | 1.39 | 0.66 | 3.28 | 50.6 | 4.09 | 89.9 | 96.3 |
| BLUE-SAG-S1 | blue | surface | 67.6 | 3.55 | 4.23 | 0.51 | 3.49 | 47.7 | 4.07 | 67.4 | 97.4 |
| BLUE-SAG-S2 | blue | surface | 83.8 | 4.45 | 2.42 | 0.86 | 3.99 | 45.4 | 5.66 | 67.4 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 78.4 | 5.16 | 0.72 | 0.82 | 4.11 | 60.9 | 5.59 | 87.4 | 54.9 |
| BLUE-SUB-2 | blue | submarine | 95.9 | 2.08 | 0.18 | 0.35 | 1.92 | 51.4 | 5.38 | 74.9 | 86.7 |
| BLUE-SUB-3 | blue | submarine | 94.6 | 1.05 | 0.2 | 0.08 | 0.85 | 65.1 | 4.46 | 91.7 | 86.1 |
| BLUE-SUB-N | blue | submarine | 55.4 | 7.53 | 2.09 | 0.62 | 5.14 | 64.2 | 3.62 | — | 67.2 |
| RED-AKE | red | surface | 47.3 | 0.0 | 4.42 | 0.0 | 0.0 | — | 6.43 | 98.0 | — |
| RED-AOR-G | red | surface | 51.4 | 0.0 | 2.2 | 0.0 | 0.0 | — | 4.09 | 99.2 | — |
| RED-AWACS-K | red | air | 51.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.15 | — | — |
| RED-GANF | red | surface | 98.6 | 0.04 | 1.49 | 0.0 | 0.08 | 50.0 | 0.0 | 78.0 | — |
| RED-GBPA | red | surface | 51.4 | 1.59 | 3.92 | 0.3 | 1.93 | 45.5 | 0.0 | — | 93.2 |
| RED-GE-1 | red | surface | 79.7 | 15.97 | 3.91 | 1.08 | 9.73 | 68.5 | 2.8 | 89.6 | 78.9 |
| RED-GE-2 | red | surface | 64.9 | 14.97 | 5.8 | 0.89 | 8.39 | 68.3 | 3.34 | 83.9 | 66.3 |
| RED-GE-3 | red | surface | 48.6 | 3.41 | 6.58 | 0.53 | 2.61 | 64.8 | 4.0 | 80.5 | 66.2 |
| RED-GLOG | red | surface | 51.4 | 0.0 | 4.27 | 0.0 | 0.0 | — | 6.55 | 99.1 | — |
| RED-KMF-1 | red | air | 51.4 | 2.14 | 0.0 | 0.39 | 2.09 | 42.6 | 6.77 | — | — |
| RED-KMF-2 | red | air | 51.4 | 1.54 | 0.01 | 0.24 | 1.76 | 34.6 | 6.77 | — | — |
| RED-KS-1 | red | submarine | 25.7 | 8.76 | 2.15 | 0.74 | 3.54 | 70.2 | 3.51 | 74.8 | 46.2 |
| RED-KSN | red | submarine | 25.7 | 11.16 | 2.95 | 0.55 | 6.11 | 67.5 | 2.8 | — | 75.3 |
| RED-MPRA-K1 | red | air | 17.6 | 5.49 | 1.93 | 0.76 | 2.7 | 51.0 | 2.61 | — | 95.5 |
| RED-MPRA-K2 | red | air | 20.3 | 3.69 | 1.84 | 0.55 | 2.05 | 53.9 | 2.86 | — | 97.3 |
| RED-OPSESP-1 | red | surface | 51.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 4.19 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.5 |

## Blue: Ofensiva / Dividida × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=82.0%, red=18.0%
- Motivo de conclusão: victory=50.7%, timeout=49.3%
- Duração média: 11.88 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.09, red=55.82
- Unidades perdidas em média: blue=4.53, red=5.25

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.0 | 0.01 | 0.0 | 0.01 | 0.0 | 0.98 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.66 | — | — |
| BLUE-AERO-CF | blue | land | 96.0 | 0.0 | 0.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 99.3 | 0.18 | 0.2 | 0.05 | 0.31 | 43.5 | 2.31 | 86.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.02 | 66.7 | 3.35 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 50.0 | 3.35 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.32 | 0.0 | 0.47 | 1.63 | 54.1 | 1.91 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.85 | 0.0 | 0.39 | 1.15 | 63.6 | 1.95 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.23 | 0.05 | 0.04 | 0.23 | 55.9 | 0.33 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.03 | 100.0 | 0.65 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 68.0 | 0.0 | 2.99 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 71.3 | 0.0 | 2.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 76.0 | 0.0 | 2.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 81.3 | 0.0 | 2.04 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 85.3 | 0.0 | 0.87 | 0.0 | 0.0 | — | 3.77 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 81.3 | 0.0 | 1.09 | 0.0 | 0.0 | — | 2.55 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 96.7 | 0.39 | 0.13 | 0.1 | 0.28 | 59.5 | 1.38 | — | 99.1 |
| BLUE-MPRA-2 | blue | air | 94.7 | 0.25 | 0.19 | 0.04 | 0.22 | 51.5 | 1.37 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 92.7 | 0.19 | 0.29 | 0.01 | 0.11 | 76.5 | 2.61 | 87.6 | 91.3 |
| BLUE-PAT-C2 | blue | surface | 83.3 | 0.61 | 0.71 | 0.07 | 0.4 | 80.0 | 2.39 | 90.7 | 72.7 |
| BLUE-PAT-O1 | blue | surface | 48.7 | 2.45 | 3.21 | 0.25 | 2.11 | 49.2 | 1.79 | 87.5 | 85.3 |
| BLUE-PAT-O2 | blue | surface | 92.7 | 3.18 | 0.47 | 0.61 | 2.37 | 51.0 | 3.73 | 47.0 | 70.0 |
| BLUE-PORTO-ACU | blue | land | 88.7 | 0.0 | 2.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 44.7 | 0.0 | 14.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 85.3 | 0.0 | 6.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 74.7 | 0.0 | 5.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 88.7 | 2.61 | 0.7 | 0.49 | 2.45 | 46.7 | 2.6 | 90.6 | 96.8 |
| BLUE-SAG-S1 | blue | surface | 80.0 | 2.07 | 2.97 | 0.26 | 2.47 | 38.9 | 2.45 | 46.5 | 97.4 |
| BLUE-SAG-S2 | blue | surface | 91.3 | 3.23 | 1.67 | 0.71 | 3.21 | 43.9 | 3.64 | 44.8 | 98.9 |
| BLUE-SUB-1 | blue | submarine | 78.0 | 3.97 | 0.89 | 0.55 | 3.31 | 60.6 | 2.69 | 87.9 | 69.2 |
| BLUE-SUB-2 | blue | submarine | 96.0 | 2.06 | 0.21 | 0.44 | 1.93 | 52.9 | 3.43 | 50.3 | 91.2 |
| BLUE-SUB-3 | blue | submarine | 96.7 | 1.25 | 0.13 | 0.18 | 0.75 | 66.4 | 2.54 | 91.9 | 88.8 |
| BLUE-SUB-N | blue | submarine | 56.7 | 6.21 | 1.89 | 0.57 | 3.87 | 64.9 | 2.22 | — | 74.7 |
| RED-AKE | red | surface | 73.3 | 0.0 | 2.27 | 0.0 | 0.0 | — | 7.31 | 98.6 | — |
| RED-AOR-G | red | surface | 65.3 | 0.0 | 1.91 | 0.0 | 0.0 | — | 4.85 | 99.5 | — |
| RED-AWACS-K | red | air | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.91 | — | — |
| RED-GANF | red | surface | 97.3 | 0.03 | 1.02 | 0.0 | 0.05 | 57.1 | 0.0 | 82.8 | — |
| RED-GBPA | red | surface | 72.7 | 1.01 | 2.13 | 0.18 | 1.08 | 45.7 | 0.0 | — | 95.3 |
| RED-GE-1 | red | surface | 65.3 | 15.82 | 5.49 | 0.9 | 9.98 | 64.5 | 3.07 | 89.7 | 79.6 |
| RED-GE-2 | red | surface | 54.0 | 12.67 | 6.35 | 1.01 | 7.47 | 65.5 | 2.95 | 86.9 | 72.4 |
| RED-GE-3 | red | surface | 72.7 | 1.87 | 3.16 | 0.25 | 1.32 | 67.2 | 1.95 | 88.0 | 86.2 |
| RED-GLOG | red | surface | 78.7 | 0.0 | 1.83 | 0.0 | 0.0 | — | 7.23 | 99.6 | — |
| RED-KMF-1 | red | air | 72.7 | 0.78 | 0.04 | 0.15 | 1.03 | 31.0 | 4.27 | — | — |
| RED-KMF-2 | red | air | 72.7 | 0.81 | 0.01 | 0.14 | 0.88 | 38.6 | 4.3 | — | — |
| RED-KS-1 | red | submarine | 12.0 | 6.41 | 2.72 | 0.48 | 2.82 | 65.7 | 2.78 | 79.3 | 56.9 |
| RED-KSN | red | submarine | 35.3 | 11.21 | 2.65 | 0.62 | 6.24 | 67.7 | 2.27 | — | 75.5 |
| RED-MPRA-K1 | red | air | 54.7 | 3.07 | 0.73 | 0.45 | 1.56 | 54.7 | 1.87 | — | 96.0 |
| RED-MPRA-K2 | red | air | 52.7 | 2.1 | 0.84 | 0.36 | 1.14 | 55.0 | 1.43 | — | 97.3 |
| RED-OPSESP-1 | red | surface | 72.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.04 | 3.96 | 0.0 | 0.04 | 66.7 | 0.0 | — | 98.7 |

### Somente vitória decisiva

- Partidas: **76**
- Taxa de vitória: blue=64.5%, red=35.5%
- Motivo de conclusão: victory=100.0%
- Duração média: 5.92 turnos
- Dano médio causado por equipe (pontos de HP): blue=44.11, red=69.43
- Unidades perdidas em média: blue=6.2, red=6.45

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 1.93 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.3 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.7 | 0.33 | 0.39 | 0.11 | 0.54 | 43.9 | 3.87 | 77.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.0 | 0.04 | 66.7 | 6.61 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.03 | 50.0 | 6.61 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 2.41 | 0.0 | 0.39 | 1.39 | 48.1 | 3.58 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.46 | 0.0 | 0.43 | 1.0 | 68.4 | 3.67 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.11 | 25.0 | 0.64 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.04 | 0.0 | 0.0 | 0.04 | 100.0 | 1.29 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 51.3 | 0.0 | 4.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 55.3 | 0.0 | 3.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.8 | 0.0 | 3.89 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 73.7 | 0.0 | 2.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 71.1 | 0.0 | 1.71 | 0.0 | 0.0 | — | 4.49 | 98.8 | — |
| BLUE-LOG-T | blue | surface | 65.8 | 0.0 | 2.0 | 0.0 | 0.0 | — | 4.25 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 100.0 | 0.42 | 0.04 | 0.14 | 0.32 | 62.5 | 1.99 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 94.7 | 0.18 | 0.18 | 0.03 | 0.24 | 38.9 | 1.95 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 85.5 | 0.37 | 0.58 | 0.03 | 0.22 | 76.5 | 4.99 | 76.8 | 82.9 |
| BLUE-PAT-C2 | blue | surface | 73.7 | 0.79 | 1.18 | 0.09 | 0.45 | 79.4 | 4.53 | 82.7 | 67.1 |
| BLUE-PAT-O1 | blue | surface | 26.3 | 3.36 | 4.62 | 0.41 | 2.86 | 49.3 | 2.5 | 85.8 | 81.6 |
| BLUE-PAT-O2 | blue | surface | 85.5 | 4.18 | 0.91 | 0.66 | 3.75 | 43.9 | 5.64 | 68.2 | 75.0 |
| BLUE-PORTO-ACU | blue | land | 98.7 | 0.0 | 0.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 39.5 | 0.0 | 16.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 78.9 | 0.0 | 9.08 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 88.2 | 0.0 | 4.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 77.6 | 3.96 | 1.37 | 0.74 | 3.5 | 47.7 | 4.11 | 88.4 | 94.7 |
| BLUE-SAG-S1 | blue | surface | 64.5 | 3.58 | 4.68 | 0.38 | 3.97 | 40.7 | 4.45 | 65.8 | 95.8 |
| BLUE-SAG-S2 | blue | surface | 82.9 | 4.34 | 3.18 | 0.84 | 4.42 | 42.0 | 6.04 | 58.4 | 97.9 |
| BLUE-SUB-1 | blue | submarine | 71.1 | 4.86 | 1.17 | 0.68 | 4.01 | 61.3 | 4.84 | 89.1 | 58.7 |
| BLUE-SUB-2 | blue | submarine | 94.7 | 2.66 | 0.22 | 0.49 | 1.91 | 61.4 | 5.74 | 75.3 | 83.1 |
| BLUE-SUB-3 | blue | submarine | 93.4 | 2.37 | 0.25 | 0.34 | 1.43 | 67.0 | 4.97 | 91.9 | 78.0 |
| BLUE-SUB-N | blue | submarine | 47.4 | 7.72 | 2.25 | 0.66 | 4.93 | 65.9 | 3.74 | — | 67.7 |
| RED-AKE | red | surface | 55.3 | 0.0 | 3.67 | 0.0 | 0.0 | — | 6.16 | 98.0 | — |
| RED-AOR-G | red | surface | 43.4 | 0.0 | 3.05 | 0.0 | 0.0 | — | 3.13 | 99.3 | — |
| RED-AWACS-K | red | air | 46.1 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.14 | — | — |
| RED-GANF | red | surface | 94.7 | 0.05 | 2.01 | 0.0 | 0.09 | 57.1 | 0.0 | 81.4 | — |
| RED-GBPA | red | surface | 46.1 | 1.8 | 4.2 | 0.32 | 1.99 | 45.0 | 0.0 | — | 90.8 |
| RED-GE-1 | red | surface | 80.3 | 16.59 | 4.28 | 0.84 | 9.87 | 63.9 | 2.54 | 89.8 | 78.8 |
| RED-GE-2 | red | surface | 61.8 | 15.46 | 6.3 | 1.33 | 8.75 | 64.5 | 2.55 | 85.3 | 64.7 |
| RED-GE-3 | red | surface | 55.3 | 3.37 | 5.12 | 0.43 | 2.16 | 70.7 | 3.05 | 80.8 | 75.7 |
| RED-GLOG | red | surface | 61.8 | 0.0 | 3.26 | 0.0 | 0.0 | — | 6.18 | 99.3 | — |
| RED-KMF-1 | red | air | 46.1 | 1.43 | 0.08 | 0.26 | 1.92 | 28.8 | 5.72 | — | — |
| RED-KMF-2 | red | air | 46.1 | 1.57 | 0.01 | 0.26 | 1.66 | 38.9 | 5.83 | — | — |
| RED-KS-1 | red | submarine | 22.4 | 7.62 | 2.37 | 0.61 | 3.41 | 69.1 | 3.54 | 74.6 | 48.2 |
| RED-KSN | red | submarine | 26.3 | 11.63 | 2.87 | 0.63 | 6.11 | 67.7 | 2.55 | — | 75.3 |
| RED-MPRA-K1 | red | air | 15.8 | 5.86 | 1.3 | 0.83 | 2.92 | 55.0 | 2.67 | — | 92.1 |
| RED-MPRA-K2 | red | air | 13.2 | 4.01 | 1.51 | 0.68 | 2.17 | 55.2 | 2.29 | — | 94.7 |
| RED-OPSESP-1 | red | surface | 46.1 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.04 | 4.07 | 0.0 | 0.04 | 66.7 | 0.0 | — | 98.7 |

## Blue: Ofensiva / Dividida × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=83.3%, red=16.7%
- Motivo de conclusão: timeout=51.3%, victory=48.7%
- Duração média: 12.24 turnos
- Dano médio causado por equipe (pontos de HP): blue=31.15, red=59.57
- Unidades perdidas em média: blue=5.06, red=4.67

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.01 | 0.03 | 0.0 | 0.02 | 33.3 | 1.04 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.7 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.55 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 0.25 | 0.31 | 0.05 | 0.24 | 41.7 | 2.23 | 87.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.01 | 0.01 | 50.0 | 3.67 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 3.68 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.83 | 0.0 | 0.59 | 1.78 | 64.0 | 2.16 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.05 | 0.0 | 0.45 | 1.25 | 58.3 | 2.2 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.13 | 0.06 | 0.01 | 0.18 | 51.9 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.69 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 69.3 | 0.0 | 2.77 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 78.0 | 0.0 | 1.97 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 72.7 | 0.0 | 2.76 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.0 | 0.0 | 3.32 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 86.7 | 0.0 | 0.72 | 0.0 | 0.0 | — | 2.62 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 74.7 | 0.0 | 1.46 | 0.0 | 0.0 | — | 2.19 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 97.3 | 0.21 | 0.07 | 0.06 | 0.17 | 65.4 | 1.2 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 96.0 | 0.15 | 0.15 | 0.04 | 0.17 | 40.0 | 1.26 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 90.0 | 0.07 | 0.49 | 0.01 | 0.04 | 100.0 | 2.52 | 88.4 | 96.7 |
| BLUE-PAT-C2 | blue | surface | 80.7 | 0.23 | 0.81 | 0.01 | 0.21 | 65.6 | 2.35 | 90.4 | 86.0 |
| BLUE-PAT-O1 | blue | surface | 50.7 | 2.14 | 2.99 | 0.19 | 2.17 | 46.2 | 1.83 | 89.0 | 89.3 |
| BLUE-PAT-O2 | blue | surface | 88.7 | 2.88 | 0.72 | 0.63 | 2.15 | 52.9 | 3.61 | 36.7 | 78.0 |
| BLUE-PORTO-ACU | blue | land | 84.0 | 0.0 | 3.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.0 | 0.0 | 16.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 61.3 | 0.0 | 9.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.7 | 1.51 | 0.99 | 0.19 | 1.62 | 44.4 | 2.41 | 91.5 | 98.2 |
| BLUE-SAG-S1 | blue | surface | 74.0 | 1.77 | 4.02 | 0.21 | 1.78 | 44.2 | 2.25 | 34.8 | 98.4 |
| BLUE-SAG-S2 | blue | surface | 91.3 | 2.95 | 1.46 | 0.61 | 2.61 | 47.1 | 3.29 | 36.5 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 83.3 | 2.6 | 0.57 | 0.44 | 2.15 | 57.5 | 2.8 | 88.6 | 78.8 |
| BLUE-SUB-2 | blue | submarine | 90.7 | 1.69 | 0.35 | 0.49 | 1.81 | 54.2 | 3.55 | 43.8 | 93.8 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.75 | 0.17 | 0.11 | 0.49 | 61.6 | 2.62 | 92.9 | 93.9 |
| BLUE-SUB-N | blue | submarine | 60.0 | 5.89 | 1.77 | 0.59 | 3.71 | 61.2 | 2.05 | — | 78.1 |
| RED-AKE | red | surface | 54.7 | 0.0 | 3.64 | 0.0 | 0.0 | — | 7.6 | 97.3 | — |
| RED-AOR-G | red | surface | 67.3 | 0.0 | 1.53 | 0.0 | 0.0 | — | 4.05 | 99.1 | — |
| RED-AWACS-K | red | air | 70.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 2.97 | — | — |
| RED-GANF | red | surface | 99.3 | 0.03 | 0.8 | 0.0 | 0.05 | 71.4 | 0.0 | 73.0 | — |
| RED-GBPA | red | surface | 70.0 | 0.97 | 2.28 | 0.15 | 1.03 | 46.5 | 0.0 | — | 95.2 |
| RED-GE-1 | red | surface | 84.0 | 16.49 | 2.75 | 1.01 | 10.41 | 64.7 | 1.85 | 84.7 | 78.4 |
| RED-GE-2 | red | surface | 76.0 | 12.59 | 4.17 | 0.87 | 7.34 | 65.6 | 2.27 | 80.0 | 71.7 |
| RED-GE-3 | red | surface | 73.3 | 1.53 | 3.17 | 0.24 | 1.18 | 68.4 | 1.79 | 79.7 | 85.7 |
| RED-GLOG | red | surface | 65.3 | 0.0 | 2.84 | 0.0 | 0.0 | — | 6.8 | 99.3 | — |
| RED-KMF-1 | red | air | 70.0 | 0.75 | 0.0 | 0.13 | 0.85 | 33.1 | 2.96 | — | — |
| RED-KMF-2 | red | air | 70.0 | 0.74 | 0.02 | 0.13 | 0.75 | 38.9 | 2.93 | — | — |
| RED-KS-1 | red | submarine | 38.0 | 7.88 | 1.89 | 0.75 | 3.39 | 65.0 | 2.29 | 62.3 | 50.5 |
| RED-KSN | red | submarine | 42.7 | 12.55 | 2.67 | 0.91 | 7.6 | 67.7 | 1.69 | — | 72.8 |
| RED-MPRA-K1 | red | air | 58.0 | 3.52 | 0.63 | 0.48 | 1.64 | 54.5 | 1.58 | — | 96.4 |
| RED-MPRA-K2 | red | air | 56.7 | 2.52 | 0.73 | 0.41 | 1.23 | 54.6 | 1.63 | — | 97.1 |
| RED-OPSESP-1 | red | surface | 70.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.01 | 0.0 | 0.02 | 0.0 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **73**
- Taxa de vitória: red=34.2%, blue=65.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.16 turnos
- Dano médio causado por equipe (pontos de HP): blue=40.55, red=73.79
- Unidades perdidas em média: blue=6.9, red=5.92

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.01 | 0.0 | 0.0 | 0.04 | 33.3 | 2.05 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.38 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.6 | 0.0 | 0.26 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.3 | 0.41 | 0.48 | 0.08 | 0.42 | 41.9 | 4.05 | 76.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.01 | 0.03 | 50.0 | 6.63 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 6.62 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.77 | 0.0 | 0.55 | 1.92 | 61.4 | 3.64 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.88 | 0.0 | 0.44 | 1.38 | 53.5 | 3.74 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.18 | 0.0 | 0.01 | 0.26 | 42.1 | 0.68 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.37 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 60.3 | 0.0 | 3.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 63.0 | 0.0 | 3.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 58.9 | 0.0 | 3.66 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 46.6 | 0.0 | 4.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 74.0 | 0.0 | 1.44 | 0.0 | 0.0 | — | 4.37 | 99.1 | — |
| BLUE-LOG-T | blue | surface | 56.2 | 0.0 | 2.55 | 0.0 | 0.0 | — | 3.9 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 94.5 | 0.42 | 0.14 | 0.12 | 0.34 | 68.0 | 2.07 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.8 | 0.32 | 0.32 | 0.08 | 0.33 | 41.7 | 2.19 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 82.2 | 0.14 | 0.9 | 0.01 | 0.07 | 100.0 | 4.86 | 82.2 | 94.5 |
| BLUE-PAT-C2 | blue | surface | 68.5 | 0.36 | 1.32 | 0.03 | 0.25 | 83.3 | 4.52 | 81.3 | 83.6 |
| BLUE-PAT-O1 | blue | surface | 17.8 | 2.71 | 5.12 | 0.29 | 2.64 | 48.7 | 2.38 | 84.4 | 80.1 |
| BLUE-PAT-O2 | blue | surface | 86.3 | 4.1 | 0.86 | 0.77 | 3.41 | 47.0 | 5.68 | 61.0 | 80.1 |
| BLUE-PORTO-ACU | blue | land | 91.8 | 0.0 | 2.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 19.2 | 0.0 | 18.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.6 | 0.0 | 2.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 69.9 | 0.0 | 9.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 71.2 | 2.26 | 1.88 | 0.27 | 2.34 | 46.8 | 4.44 | 86.2 | 96.7 |
| BLUE-SAG-S1 | blue | surface | 60.3 | 3.16 | 5.49 | 0.38 | 3.22 | 43.4 | 4.3 | 55.1 | 97.3 |
| BLUE-SAG-S2 | blue | surface | 84.9 | 4.81 | 2.48 | 0.93 | 4.11 | 48.0 | 5.95 | 62.1 | 98.4 |
| BLUE-SUB-1 | blue | submarine | 79.5 | 4.62 | 0.78 | 0.85 | 3.6 | 59.3 | 5.04 | 89.5 | 64.4 |
| BLUE-SUB-2 | blue | submarine | 93.2 | 1.59 | 0.25 | 0.36 | 1.33 | 59.8 | 5.92 | 72.5 | 89.7 |
| BLUE-SUB-3 | blue | submarine | 94.5 | 1.23 | 0.19 | 0.18 | 0.79 | 65.5 | 5.08 | 90.8 | 88.9 |
| BLUE-SUB-N | blue | submarine | 50.7 | 6.51 | 2.21 | 0.55 | 4.14 | 61.9 | 3.73 | — | 73.7 |
| RED-AKE | red | surface | 45.2 | 0.0 | 4.22 | 0.0 | 0.0 | — | 6.58 | 97.2 | — |
| RED-AOR-G | red | surface | 53.4 | 0.0 | 2.01 | 0.0 | 0.0 | — | 3.38 | 98.5 | — |
| RED-AWACS-K | red | air | 38.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.64 | — | — |
| RED-GANF | red | surface | 98.6 | 0.07 | 1.62 | 0.0 | 0.1 | 71.4 | 0.0 | 76.4 | — |
| RED-GBPA | red | surface | 38.4 | 1.82 | 4.56 | 0.27 | 1.88 | 46.0 | 0.0 | — | 91.5 |
| RED-GE-1 | red | surface | 97.3 | 16.34 | 1.16 | 0.93 | 10.33 | 64.1 | 1.25 | 88.4 | 78.1 |
| RED-GE-2 | red | surface | 78.1 | 15.95 | 4.95 | 1.25 | 8.62 | 65.7 | 2.01 | 82.6 | 64.4 |
| RED-GE-3 | red | surface | 46.6 | 3.03 | 6.32 | 0.48 | 2.29 | 70.1 | 3.26 | 78.6 | 71.5 |
| RED-GLOG | red | surface | 52.1 | 0.0 | 3.82 | 0.0 | 0.0 | — | 6.29 | 98.9 | — |
| RED-KMF-1 | red | air | 38.4 | 1.55 | 0.0 | 0.26 | 1.71 | 33.6 | 5.67 | — | — |
| RED-KMF-2 | red | air | 38.4 | 1.51 | 0.01 | 0.25 | 1.51 | 39.1 | 5.58 | — | — |
| RED-KS-1 | red | submarine | 52.1 | 8.82 | 1.56 | 0.95 | 3.58 | 68.2 | 3.14 | 64.6 | 46.3 |
| RED-KSN | red | submarine | 24.7 | 13.01 | 3.38 | 0.86 | 7.04 | 69.3 | 1.51 | — | 72.0 |
| RED-MPRA-K1 | red | air | 15.1 | 6.79 | 1.26 | 0.89 | 3.14 | 53.7 | 3.11 | — | 92.7 |
| RED-MPRA-K2 | red | air | 12.3 | 4.9 | 1.4 | 0.77 | 2.4 | 54.3 | 3.23 | — | 94.1 |
| RED-OPSESP-1 | red | surface | 38.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.27 | 0.0 | 0.04 | 0.0 | 0.0 | — | 98.6 |

## Blue: Ofensiva / Dividida × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=76.7%, red=23.3%
- Motivo de conclusão: timeout=44.0%, victory=56.0%
- Duração média: 11.64 turnos
- Dano médio causado por equipe (pontos de HP): blue=33.18, red=66.62
- Unidades perdidas em média: blue=5.59, red=4.97

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 99.3 | 0.0 | 0.03 | 0.0 | 0.0 | — | 1.06 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.73 | — | — |
| BLUE-AERO-CF | blue | land | 96.0 | 0.0 | 0.84 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.7 | 0.0 | 0.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.14 | 0.13 | 0.03 | 0.12 | 66.7 | 2.17 | 80.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.02 | 66.7 | 3.96 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 3.96 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.44 | 0.0 | 0.59 | 1.66 | 66.3 | 2.39 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.71 | 0.0 | 0.33 | 1.11 | 58.4 | 2.43 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.11 | 0.09 | 0.01 | 0.11 | 52.9 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.71 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 66.7 | 0.0 | 2.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.0 | 0.0 | 2.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.0 | 0.0 | 3.36 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.0 | 0.0 | 3.54 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.0 | 0.0 | 0.97 | 0.0 | 0.0 | — | 2.93 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 67.3 | 0.0 | 1.97 | 0.0 | 0.0 | — | 2.07 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 98.0 | 0.33 | 0.07 | 0.06 | 0.26 | 41.0 | 1.58 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 96.7 | 0.27 | 0.11 | 0.07 | 0.24 | 58.3 | 1.73 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 91.3 | 0.16 | 0.39 | 0.03 | 0.05 | 75.0 | 2.83 | 88.0 | 96.0 |
| BLUE-PAT-C2 | blue | surface | 78.0 | 0.22 | 0.93 | 0.02 | 0.29 | 67.4 | 2.67 | 88.7 | 84.7 |
| BLUE-PAT-O1 | blue | surface | 48.0 | 2.65 | 3.29 | 0.21 | 2.38 | 48.7 | 1.99 | 89.4 | 85.3 |
| BLUE-PAT-O2 | blue | surface | 85.3 | 3.13 | 0.95 | 0.65 | 2.22 | 56.2 | 3.71 | 41.5 | 74.7 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 3.5 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 18.7 | 0.0 | 18.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.7 | 0.0 | 2.33 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.3 | 0.0 | 10.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 1.87 | 1.07 | 0.29 | 1.6 | 49.6 | 2.38 | 92.4 | 98.6 |
| BLUE-SAG-S1 | blue | surface | 74.7 | 2.16 | 3.58 | 0.33 | 1.93 | 49.5 | 2.35 | 39.2 | 97.7 |
| BLUE-SAG-S2 | blue | surface | 90.7 | 3.17 | 1.53 | 0.67 | 2.45 | 53.3 | 3.29 | 37.7 | 98.7 |
| BLUE-SUB-1 | blue | submarine | 78.0 | 3.07 | 0.83 | 0.46 | 2.65 | 57.7 | 3.22 | 86.8 | 76.4 |
| BLUE-SUB-2 | blue | submarine | 93.3 | 2.25 | 0.29 | 0.51 | 2.04 | 55.2 | 3.82 | 41.8 | 93.6 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.63 | 0.18 | 0.1 | 0.51 | 64.5 | 2.57 | 92.1 | 94.2 |
| BLUE-SUB-N | blue | submarine | 54.7 | 5.83 | 2.05 | 0.59 | 3.7 | 59.8 | 2.21 | — | 78.6 |
| RED-AKE | red | surface | 56.0 | 0.0 | 3.64 | 0.0 | 0.0 | — | 6.81 | 97.8 | — |
| RED-AOR-G | red | surface | 63.3 | 0.0 | 1.95 | 0.0 | 0.0 | — | 4.25 | 99.5 | — |
| RED-AWACS-K | red | air | 70.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.99 | — | — |
| RED-GANF | red | surface | 97.3 | 0.1 | 1.14 | 0.01 | 0.17 | 57.7 | 0.0 | 71.0 | — |
| RED-GBPA | red | surface | 70.7 | 1.13 | 2.14 | 0.17 | 1.11 | 53.3 | 0.0 | — | 94.7 |
| RED-GE-1 | red | surface | 82.7 | 18.24 | 3.12 | 1.14 | 11.54 | 64.8 | 2.12 | 85.9 | 75.5 |
| RED-GE-2 | red | surface | 78.7 | 12.86 | 3.71 | 0.83 | 7.96 | 65.2 | 1.92 | 82.2 | 70.7 |
| RED-GE-3 | red | surface | 69.3 | 2.71 | 3.53 | 0.36 | 1.61 | 75.1 | 1.98 | 84.6 | 78.0 |
| RED-GLOG | red | surface | 70.0 | 0.0 | 2.55 | 0.0 | 0.0 | — | 6.75 | 99.4 | — |
| RED-KMF-1 | red | air | 70.7 | 0.8 | 0.0 | 0.13 | 0.85 | 32.0 | 4.17 | — | — |
| RED-KMF-2 | red | air | 70.7 | 0.73 | 0.01 | 0.16 | 0.71 | 35.5 | 4.07 | — | — |
| RED-KS-1 | red | submarine | 30.0 | 8.51 | 2.51 | 0.79 | 3.41 | 68.0 | 2.17 | 66.4 | 50.0 |
| RED-KSN | red | submarine | 45.3 | 15.68 | 2.55 | 1.17 | 8.83 | 68.3 | 2.13 | — | 67.3 |
| RED-MPRA-K1 | red | air | 50.0 | 3.57 | 1.09 | 0.45 | 1.5 | 63.6 | 1.14 | — | 97.6 |
| RED-MPRA-K2 | red | air | 52.0 | 2.25 | 1.01 | 0.37 | 1.21 | 52.7 | 1.42 | — | 98.2 |
| RED-OPSESP-1 | red | surface | 70.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.04 | 4.22 | 0.0 | 0.02 | 100.0 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **84**
- Taxa de vitória: blue=58.3%, red=41.7%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.64 turnos
- Dano médio causado por equipe (pontos de HP): blue=42.27, red=75.06
- Unidades perdidas em média: blue=6.8, red=6.18

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.79 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.23 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.2 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 97.6 | 0.0 | 0.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.24 | 0.15 | 0.06 | 0.18 | 73.3 | 3.27 | 77.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.06 | 0.0 | 0.01 | 0.04 | 66.7 | 5.88 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.01 | 100.0 | 5.86 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.23 | 0.0 | 0.76 | 2.07 | 65.5 | 3.24 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.1 | 0.0 | 0.4 | 1.36 | 56.1 | 3.29 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.08 | 0.0 | 0.0 | 0.12 | 30.0 | 0.6 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 98.8 | 0.0 | 0.06 | 0.0 | 0.0 | — | 1.19 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 57.1 | 0.0 | 3.7 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 56.0 | 0.0 | 3.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 57.1 | 0.0 | 4.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 51.2 | 0.0 | 4.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 75.0 | 0.0 | 1.51 | 0.0 | 0.0 | — | 3.99 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 53.6 | 0.0 | 2.63 | 0.0 | 0.0 | — | 3.33 | 99.1 | — |
| BLUE-MPRA-1 | blue | air | 96.4 | 0.6 | 0.12 | 0.11 | 0.44 | 43.2 | 1.8 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.4 | 0.2 | 0.11 | 0.38 | 56.2 | 2.0 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 90.5 | 0.29 | 0.37 | 0.05 | 0.1 | 75.0 | 4.55 | 83.9 | 92.9 |
| BLUE-PAT-C2 | blue | surface | 70.2 | 0.26 | 1.26 | 0.02 | 0.35 | 65.5 | 4.35 | 80.8 | 81.0 |
| BLUE-PAT-O1 | blue | surface | 22.6 | 3.37 | 4.8 | 0.26 | 3.07 | 49.2 | 2.4 | 85.4 | 75.6 |
| BLUE-PAT-O2 | blue | surface | 83.3 | 4.23 | 1.18 | 0.71 | 3.3 | 50.5 | 5.11 | 58.7 | 77.4 |
| BLUE-PORTO-ACU | blue | land | 95.2 | 0.0 | 2.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 14.3 | 0.0 | 18.7 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 60.7 | 0.0 | 10.36 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 75.0 | 2.67 | 1.75 | 0.4 | 2.36 | 48.5 | 3.56 | 87.2 | 97.6 |
| BLUE-SAG-S1 | blue | surface | 67.9 | 3.56 | 4.21 | 0.55 | 3.21 | 49.6 | 3.83 | 52.5 | 96.3 |
| BLUE-SAG-S2 | blue | surface | 85.7 | 4.2 | 2.24 | 0.85 | 3.48 | 51.4 | 5.11 | 53.8 | 97.6 |
| BLUE-SUB-1 | blue | submarine | 73.8 | 4.46 | 1.0 | 0.67 | 3.75 | 59.0 | 4.67 | 87.5 | 66.1 |
| BLUE-SUB-2 | blue | submarine | 95.2 | 2.15 | 0.19 | 0.4 | 1.65 | 58.3 | 5.24 | 62.4 | 90.0 |
| BLUE-SUB-3 | blue | submarine | 96.4 | 0.99 | 0.08 | 0.15 | 0.7 | 67.8 | 4.23 | 91.5 | 91.2 |
| BLUE-SUB-N | blue | submarine | 52.4 | 6.38 | 2.25 | 0.64 | 4.4 | 58.4 | 3.45 | — | 72.7 |
| RED-AKE | red | surface | 47.6 | 0.0 | 4.19 | 0.0 | 0.0 | — | 6.21 | 98.2 | — |
| RED-AOR-G | red | surface | 44.0 | 0.0 | 3.0 | 0.0 | 0.0 | — | 3.82 | 99.4 | — |
| RED-AWACS-K | red | air | 47.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.75 | — | — |
| RED-GANF | red | surface | 95.2 | 0.18 | 2.04 | 0.01 | 0.31 | 57.7 | 0.0 | 72.0 | — |
| RED-GBPA | red | surface | 47.6 | 1.6 | 3.71 | 0.24 | 1.7 | 52.4 | 0.0 | — | 91.4 |
| RED-GE-1 | red | surface | 91.7 | 18.17 | 2.25 | 1.19 | 11.54 | 65.4 | 1.69 | 86.7 | 74.7 |
| RED-GE-2 | red | surface | 83.3 | 13.6 | 3.67 | 0.93 | 8.71 | 62.8 | 1.44 | 84.7 | 67.0 |
| RED-GE-3 | red | surface | 46.4 | 4.52 | 6.2 | 0.61 | 2.75 | 74.5 | 3.3 | 80.5 | 62.1 |
| RED-GLOG | red | surface | 59.5 | 0.0 | 3.54 | 0.0 | 0.0 | — | 6.62 | 99.2 | — |
| RED-KMF-1 | red | air | 47.6 | 1.29 | 0.0 | 0.21 | 1.45 | 30.3 | 7.05 | — | — |
| RED-KMF-2 | red | air | 47.6 | 1.3 | 0.01 | 0.27 | 1.23 | 35.9 | 6.88 | — | — |
| RED-KS-1 | red | submarine | 42.9 | 9.64 | 2.25 | 0.95 | 3.77 | 69.4 | 2.86 | 64.9 | 44.4 |
| RED-KSN | red | submarine | 29.8 | 15.77 | 3.2 | 1.15 | 8.2 | 70.7 | 2.31 | — | 67.3 |
| RED-MPRA-K1 | red | air | 11.9 | 5.54 | 1.87 | 0.68 | 2.31 | 63.4 | 2.02 | — | 95.6 |
| RED-MPRA-K2 | red | air | 15.5 | 3.39 | 1.75 | 0.55 | 1.89 | 52.2 | 2.49 | — | 96.8 |
| RED-OPSESP-1 | red | surface | 47.6 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.07 | 4.6 | 0.0 | 0.04 | 100.0 | 0.0 | — | 98.8 |

## Blue: Defensiva / Concentrada × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=28.0%, blue=72.0%
- Motivo de conclusão: victory=44.7%, timeout=55.3%
- Duração média: 13.02 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.9, red=59.77
- Unidades perdidas em média: blue=4.95, red=5.44

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.09 | 50.0 | 0.96 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.66 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.0 | 0.27 | 0.73 | 0.1 | 0.33 | 50.0 | 2.51 | 84.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.13 | 0.0 | 0.04 | 0.11 | 43.8 | 5.93 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.11 | 0.0 | 0.03 | 0.06 | 66.7 | 6.03 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.91 | 0.0 | 0.59 | 2.13 | 56.7 | 4.53 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.33 | 0.0 | 0.4 | 1.54 | 59.3 | 4.46 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.31 | 0.0 | 0.03 | 0.24 | 66.7 | 0.32 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.64 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 59.3 | 0.0 | 3.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 61.3 | 0.0 | 3.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 67.3 | 0.0 | 3.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 78.7 | 0.0 | 2.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.7 | 0.0 | 1.03 | 0.0 | 0.0 | — | 2.69 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 73.3 | 0.0 | 1.38 | 0.0 | 0.0 | — | 2.23 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.43 | 0.21 | 0.12 | 0.33 | 51.0 | 2.16 | — | 99.3 |
| BLUE-MPRA-2 | blue | air | 91.3 | 0.32 | 0.25 | 0.05 | 0.33 | 48.0 | 2.23 | — | 99.6 |
| BLUE-PAT-C1 | blue | surface | 84.0 | 0.1 | 0.66 | 0.02 | 0.09 | 84.6 | 2.47 | 88.4 | 95.3 |
| BLUE-PAT-C2 | blue | surface | 76.0 | 0.16 | 1.27 | 0.01 | 0.13 | 68.4 | 2.08 | 93.0 | 92.0 |
| BLUE-PAT-O1 | blue | surface | 57.3 | 2.88 | 3.02 | 0.27 | 2.33 | 47.6 | 1.56 | 92.5 | 93.3 |
| BLUE-PAT-O2 | blue | surface | 91.3 | 3.04 | 0.6 | 0.59 | 2.26 | 54.0 | 3.19 | 34.1 | 74.0 |
| BLUE-PORTO-ACU | blue | land | 92.0 | 0.0 | 2.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 41.3 | 0.0 | 15.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 83.3 | 0.0 | 6.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 76.7 | 0.0 | 5.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 84.0 | 2.57 | 0.97 | 0.42 | 2.85 | 47.5 | 2.07 | 92.9 | 96.1 |
| BLUE-SAG-S1 | blue | surface | 84.7 | 3.07 | 2.66 | 0.43 | 2.66 | 48.4 | 2.15 | 33.3 | 98.5 |
| BLUE-SAG-S2 | blue | surface | 90.7 | 4.0 | 1.42 | 0.81 | 3.54 | 48.8 | 2.8 | 38.4 | 99.1 |
| BLUE-SUB-1 | blue | submarine | 84.7 | 3.31 | 0.54 | 0.51 | 2.82 | 60.3 | 2.72 | 84.9 | 74.4 |
| BLUE-SUB-2 | blue | submarine | 90.0 | 2.04 | 0.35 | 0.48 | 1.99 | 53.5 | 3.27 | 34.8 | 91.4 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.83 | 0.17 | 0.13 | 0.56 | 66.7 | 2.69 | 88.9 | 92.4 |
| BLUE-SUB-N | blue | submarine | 72.7 | 5.02 | 1.25 | 0.4 | 3.37 | 60.6 | 1.66 | — | 78.3 |
| RED-AKE | red | surface | 68.0 | 0.0 | 2.8 | 0.0 | 0.0 | — | 7.19 | 97.8 | — |
| RED-AOR-G | red | surface | 66.0 | 0.0 | 1.65 | 0.0 | 0.0 | — | 5.05 | 99.6 | — |
| RED-AWACS-K | red | air | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.53 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.37 | 0.0 | 0.0 | — | 0.0 | 68.3 | — |
| RED-GBPA | red | surface | 97.3 | 0.64 | 0.35 | 0.1 | 0.65 | 50.5 | 0.0 | — | 99.5 |
| RED-GE-1 | red | surface | 65.3 | 17.11 | 5.94 | 1.02 | 11.14 | 64.8 | 3.12 | 89.4 | 76.6 |
| RED-GE-2 | red | surface | 40.7 | 12.65 | 7.37 | 0.94 | 7.61 | 63.9 | 3.5 | 82.9 | 72.0 |
| RED-GE-3 | red | surface | 65.3 | 1.33 | 3.87 | 0.16 | 1.03 | 68.2 | 2.32 | 85.1 | 85.8 |
| RED-GLOG | red | surface | 70.7 | 0.0 | 2.42 | 0.0 | 0.0 | — | 7.15 | 99.4 | — |
| RED-KMF-1 | red | air | 96.7 | 1.09 | 0.24 | 0.19 | 1.15 | 37.6 | 4.97 | — | — |
| RED-KMF-2 | red | air | 96.7 | 0.95 | 0.19 | 0.19 | 1.03 | 37.0 | 4.98 | — | — |
| RED-KS-1 | red | submarine | 6.7 | 7.32 | 2.93 | 0.55 | 2.76 | 69.1 | 2.75 | 78.4 | 56.3 |
| RED-KSN | red | submarine | 42.0 | 11.45 | 2.49 | 0.7 | 6.8 | 66.9 | 2.66 | — | 72.9 |
| RED-MPRA-K1 | red | air | 66.0 | 3.59 | 1.19 | 0.55 | 1.84 | 51.4 | 2.19 | — | 100.0 |
| RED-MPRA-K2 | red | air | 65.3 | 3.52 | 1.2 | 0.55 | 1.58 | 62.4 | 2.17 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.11 | 3.88 | 0.01 | 0.09 | 71.4 | 0.0 | — | 96.9 |

### Somente vitória decisiva

- Partidas: **67**
- Taxa de vitória: red=62.7%, blue=37.3%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.85 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.6, red=73.73
- Unidades perdidas em média: blue=6.34, red=6.94

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.0 | 0.07 | 40.0 | 1.48 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.0 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.0 | 0.31 | 0.39 | 0.15 | 0.36 | 58.3 | 3.42 | 80.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.21 | 0.0 | 0.07 | 0.13 | 55.6 | 5.97 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.12 | 0.0 | 0.03 | 0.07 | 40.0 | 6.09 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.58 | 0.0 | 0.63 | 2.72 | 51.1 | 3.85 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.78 | 0.0 | 0.63 | 2.15 | 61.8 | 3.79 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.51 | 0.0 | 0.06 | 0.36 | 66.7 | 0.49 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.99 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 29.9 | 0.0 | 5.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 28.4 | 0.0 | 6.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 37.3 | 0.0 | 6.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 67.2 | 0.0 | 3.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 74.6 | 0.0 | 1.46 | 0.0 | 0.0 | — | 3.61 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 64.2 | 0.0 | 1.84 | 0.0 | 0.0 | — | 3.4 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 92.5 | 0.55 | 0.25 | 0.19 | 0.57 | 47.4 | 1.42 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 89.6 | 0.46 | 0.28 | 0.07 | 0.55 | 45.9 | 1.54 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 80.6 | 0.18 | 0.73 | 0.01 | 0.15 | 80.0 | 3.78 | 87.3 | 92.5 |
| BLUE-PAT-C2 | blue | surface | 64.2 | 0.16 | 1.73 | 0.01 | 0.12 | 87.5 | 3.12 | 93.5 | 94.0 |
| BLUE-PAT-O1 | blue | surface | 49.3 | 4.87 | 3.72 | 0.46 | 3.87 | 47.9 | 2.1 | 93.0 | 88.8 |
| BLUE-PAT-O2 | blue | surface | 94.0 | 3.55 | 0.4 | 0.67 | 2.82 | 50.3 | 4.0 | 51.5 | 80.6 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 37.3 | 0.0 | 17.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 65.7 | 0.0 | 13.91 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 95.5 | 0.0 | 2.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.1 | 2.96 | 1.36 | 0.52 | 3.81 | 45.9 | 2.88 | 90.7 | 95.5 |
| BLUE-SAG-S1 | blue | surface | 85.1 | 4.96 | 2.51 | 0.7 | 4.28 | 48.1 | 3.24 | 47.0 | 98.2 |
| BLUE-SAG-S2 | blue | surface | 94.0 | 5.43 | 1.19 | 1.06 | 4.75 | 49.1 | 3.99 | 52.8 | 98.5 |
| BLUE-SUB-1 | blue | submarine | 88.1 | 3.66 | 0.33 | 0.6 | 3.24 | 60.4 | 3.79 | 84.2 | 65.7 |
| BLUE-SUB-2 | blue | submarine | 88.1 | 2.0 | 0.43 | 0.36 | 1.99 | 52.6 | 4.22 | 61.4 | 87.7 |
| BLUE-SUB-3 | blue | submarine | 95.5 | 1.46 | 0.13 | 0.25 | 1.01 | 64.7 | 3.64 | 90.9 | 86.9 |
| BLUE-SUB-N | blue | submarine | 68.7 | 5.82 | 1.45 | 0.45 | 4.16 | 58.4 | 2.57 | — | 74.5 |
| RED-AKE | red | surface | 58.2 | 0.0 | 3.48 | 0.0 | 0.0 | — | 7.72 | 97.0 | — |
| RED-AOR-G | red | surface | 46.3 | 0.0 | 2.61 | 0.0 | 0.0 | — | 5.57 | 99.2 | — |
| RED-AWACS-K | red | air | 94.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 9.15 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.58 | 0.0 | 0.0 | — | 0.0 | 69.4 | — |
| RED-GBPA | red | surface | 94.0 | 1.06 | 0.78 | 0.19 | 0.9 | 56.7 | 0.0 | — | 99.4 |
| RED-GE-1 | red | surface | 79.1 | 18.61 | 5.57 | 1.03 | 11.79 | 65.3 | 3.37 | 86.1 | 74.4 |
| RED-GE-2 | red | surface | 32.8 | 16.85 | 8.76 | 1.25 | 9.21 | 65.5 | 4.39 | 80.2 | 62.6 |
| RED-GE-3 | red | surface | 25.4 | 2.58 | 8.22 | 0.33 | 2.07 | 64.7 | 4.69 | 78.0 | 70.6 |
| RED-GLOG | red | surface | 61.2 | 0.0 | 3.28 | 0.0 | 0.0 | — | 7.66 | 99.4 | — |
| RED-KMF-1 | red | air | 92.5 | 1.37 | 0.3 | 0.25 | 1.66 | 38.7 | 9.58 | — | — |
| RED-KMF-2 | red | air | 94.0 | 1.48 | 0.1 | 0.31 | 1.58 | 38.7 | 9.64 | — | — |
| RED-KS-1 | red | submarine | 9.0 | 8.94 | 2.64 | 0.78 | 3.1 | 70.7 | 3.06 | 78.1 | 51.9 |
| RED-KSN | red | submarine | 40.3 | 14.91 | 2.49 | 1.0 | 7.96 | 70.0 | 3.85 | — | 66.8 |
| RED-MPRA-K1 | red | air | 28.4 | 3.64 | 2.42 | 0.58 | 2.09 | 46.4 | 3.76 | — | 100.0 |
| RED-MPRA-K2 | red | air | 29.9 | 4.28 | 2.4 | 0.61 | 2.04 | 57.7 | 4.12 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 94.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 3.96 | 0.0 | 0.03 | 0.0 | 0.0 | — | 99.0 |

## Blue: Defensiva / Concentrada × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=77.3%, red=22.7%
- Motivo de conclusão: timeout=62.7%, victory=37.3%
- Duração média: 13.83 turnos
- Dano médio causado por equipe (pontos de HP): blue=35.21, red=60.73
- Unidades perdidas em média: blue=5.23, red=5.27

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.06 | 0.0 | 0.02 | 0.15 | 40.9 | 0.94 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.65 | — | — |
| BLUE-AERO-CF | blue | land | 96.7 | 0.0 | 0.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.0 | 0.18 | 0.88 | 0.07 | 0.29 | 37.2 | 2.56 | 82.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.08 | 33.3 | 6.84 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.01 | 0.06 | 33.3 | 6.89 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.12 | 0.0 | 0.49 | 1.79 | 57.2 | 5.22 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.94 | 0.0 | 0.35 | 1.31 | 58.7 | 5.17 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 97.3 | 0.47 | 0.12 | 0.08 | 0.33 | 71.4 | 0.31 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.01 | 100.0 | 0.63 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 62.7 | 0.0 | 3.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 64.0 | 0.0 | 3.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 68.0 | 0.0 | 3.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 78.7 | 0.0 | 2.23 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 83.3 | 0.0 | 0.77 | 0.0 | 0.0 | — | 3.03 | 99.3 | — |
| BLUE-LOG-T | blue | surface | 70.0 | 0.0 | 1.55 | 0.0 | 0.0 | — | 2.1 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 92.0 | 0.33 | 0.28 | 0.05 | 0.25 | 56.8 | 3.0 | — | 98.9 |
| BLUE-MPRA-2 | blue | air | 95.3 | 0.24 | 0.15 | 0.05 | 0.23 | 57.1 | 2.86 | — | 99.8 |
| BLUE-PAT-C1 | blue | surface | 83.3 | 0.01 | 0.81 | 0.0 | 0.03 | 40.0 | 2.41 | 88.4 | 96.7 |
| BLUE-PAT-C2 | blue | surface | 75.3 | 0.41 | 1.09 | 0.05 | 0.33 | 82.0 | 2.15 | 91.2 | 80.0 |
| BLUE-PAT-O1 | blue | surface | 53.3 | 2.69 | 2.91 | 0.28 | 2.13 | 49.7 | 1.55 | 89.5 | 94.0 |
| BLUE-PAT-O2 | blue | surface | 90.0 | 2.51 | 0.73 | 0.54 | 2.14 | 52.6 | 3.7 | 33.6 | 77.3 |
| BLUE-PORTO-ACU | blue | land | 90.7 | 0.0 | 2.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 36.7 | 0.0 | 15.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 85.3 | 0.0 | 6.24 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 74.0 | 0.0 | 6.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 82.0 | 2.63 | 1.19 | 0.4 | 2.67 | 44.8 | 2.22 | 91.1 | 96.5 |
| BLUE-SAG-S1 | blue | surface | 80.7 | 2.68 | 3.09 | 0.4 | 2.75 | 43.2 | 2.13 | 38.9 | 97.0 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.19 | 1.49 | 0.77 | 3.31 | 43.8 | 3.2 | 37.8 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 82.0 | 4.31 | 0.6 | 0.61 | 3.2 | 61.9 | 2.99 | 83.1 | 71.0 |
| BLUE-SUB-2 | blue | submarine | 91.3 | 1.97 | 0.39 | 0.47 | 1.83 | 55.1 | 3.87 | 35.7 | 93.6 |
| BLUE-SUB-3 | blue | submarine | 91.3 | 0.71 | 0.23 | 0.13 | 0.57 | 68.2 | 3.04 | 87.2 | 92.3 |
| BLUE-SUB-N | blue | submarine | 70.7 | 5.68 | 1.28 | 0.48 | 3.6 | 60.4 | 1.65 | — | 76.1 |
| RED-AKE | red | surface | 73.3 | 0.0 | 2.3 | 0.0 | 0.0 | — | 7.14 | 98.4 | — |
| RED-AOR-G | red | surface | 66.0 | 0.0 | 1.75 | 0.0 | 0.0 | — | 4.35 | 99.2 | — |
| RED-AWACS-K | red | air | 98.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.19 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.41 | 0.0 | 0.0 | — | 0.0 | 72.7 | — |
| RED-GBPA | red | surface | 98.7 | 0.63 | 0.38 | 0.15 | 0.69 | 47.1 | 0.0 | — | 99.5 |
| RED-GE-1 | red | surface | 62.0 | 17.19 | 6.13 | 1.13 | 11.35 | 63.6 | 3.29 | 89.1 | 75.7 |
| RED-GE-2 | red | surface | 46.7 | 13.51 | 6.91 | 0.99 | 7.74 | 67.4 | 3.15 | 84.3 | 70.9 |
| RED-GE-3 | red | surface | 64.0 | 1.37 | 3.83 | 0.19 | 0.95 | 70.4 | 2.25 | 91.1 | 88.6 |
| RED-GLOG | red | surface | 75.3 | 0.0 | 1.79 | 0.0 | 0.0 | — | 6.67 | 99.5 | — |
| RED-KMF-1 | red | air | 98.0 | 0.93 | 0.15 | 0.19 | 0.87 | 46.2 | 4.51 | — | — |
| RED-KMF-2 | red | air | 98.0 | 0.62 | 0.15 | 0.13 | 0.71 | 38.7 | 4.61 | — | — |
| RED-KS-1 | red | submarine | 8.7 | 6.81 | 2.82 | 0.57 | 2.59 | 68.6 | 2.71 | 77.0 | 59.0 |
| RED-KSN | red | submarine | 40.7 | 11.56 | 2.61 | 0.75 | 6.88 | 66.3 | 2.51 | — | 72.7 |
| RED-MPRA-K1 | red | air | 70.7 | 4.67 | 0.9 | 0.65 | 2.22 | 59.2 | 2.13 | — | 99.8 |
| RED-MPRA-K2 | red | air | 66.0 | 3.39 | 1.14 | 0.49 | 1.73 | 55.8 | 1.68 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 98.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.05 | 3.93 | 0.0 | 0.04 | 33.3 | 0.0 | — | 98.7 |

### Somente vitória decisiva

- Partidas: **56**
- Taxa de vitória: blue=39.3%, red=60.7%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.82 turnos
- Dano médio causado por equipe (pontos de HP): blue=43.89, red=68.77
- Unidades perdidas em média: blue=6.02, red=6.68

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.34 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.93 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.2 | 0.36 | 0.38 | 0.12 | 0.54 | 43.3 | 2.77 | 86.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 5.68 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.02 | 0.0 | 5.75 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.71 | 0.0 | 0.52 | 2.02 | 56.6 | 3.61 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.38 | 0.0 | 0.38 | 1.45 | 64.2 | 3.75 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.3 | 0.0 | 0.09 | 0.29 | 56.2 | 0.45 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.07 | 0.0 | 0.02 | 0.04 | 100.0 | 0.89 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 26.8 | 0.0 | 6.38 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 26.8 | 0.0 | 6.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 39.3 | 0.0 | 5.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 80.4 | 0.0 | 2.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 89.3 | 0.0 | 0.45 | 0.0 | 0.0 | — | 4.04 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 60.7 | 0.0 | 2.11 | 0.0 | 0.0 | — | 3.0 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 94.6 | 0.61 | 0.29 | 0.12 | 0.46 | 50.0 | 1.0 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.1 | 0.23 | 0.23 | 0.07 | 0.38 | 42.9 | 0.93 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.9 | 0.04 | 0.64 | 0.0 | 0.05 | 66.7 | 3.2 | 89.3 | 94.6 |
| BLUE-PAT-C2 | blue | surface | 69.6 | 0.52 | 1.12 | 0.04 | 0.41 | 82.6 | 2.73 | 90.5 | 73.2 |
| BLUE-PAT-O1 | blue | surface | 48.2 | 3.89 | 3.3 | 0.5 | 3.05 | 50.3 | 1.79 | 93.2 | 91.1 |
| BLUE-PAT-O2 | blue | surface | 96.4 | 3.32 | 0.23 | 0.64 | 2.75 | 55.2 | 3.96 | 53.8 | 72.3 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 30.4 | 0.0 | 17.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 66.1 | 0.0 | 12.96 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 98.2 | 0.0 | 2.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 78.6 | 4.29 | 1.34 | 0.59 | 3.95 | 49.3 | 2.95 | 93.6 | 93.1 |
| BLUE-SAG-S1 | blue | surface | 83.9 | 4.09 | 2.61 | 0.64 | 4.45 | 41.4 | 2.75 | 52.0 | 96.0 |
| BLUE-SAG-S2 | blue | surface | 96.4 | 4.3 | 0.73 | 0.95 | 4.16 | 42.5 | 3.89 | 52.3 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 83.9 | 4.84 | 0.66 | 0.73 | 3.46 | 66.0 | 3.11 | 88.9 | 62.3 |
| BLUE-SUB-2 | blue | submarine | 92.9 | 2.14 | 0.27 | 0.54 | 1.75 | 61.2 | 3.73 | 68.0 | 93.1 |
| BLUE-SUB-3 | blue | submarine | 92.9 | 1.11 | 0.21 | 0.18 | 0.86 | 66.7 | 3.16 | 92.9 | 86.2 |
| BLUE-SUB-N | blue | submarine | 69.6 | 6.7 | 1.2 | 0.55 | 4.11 | 61.7 | 2.5 | — | 72.4 |
| RED-AKE | red | surface | 73.2 | 0.0 | 2.3 | 0.0 | 0.0 | — | 7.66 | 99.1 | — |
| RED-AOR-G | red | surface | 41.1 | 0.0 | 2.95 | 0.0 | 0.0 | — | 4.25 | 98.7 | — |
| RED-AWACS-K | red | air | 96.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.77 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.57 | 0.0 | 0.0 | — | 0.0 | 82.3 | — |
| RED-GBPA | red | surface | 96.4 | 0.64 | 0.8 | 0.18 | 0.89 | 46.0 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 76.8 | 17.43 | 4.98 | 1.07 | 10.93 | 64.7 | 4.16 | 84.0 | 75.7 |
| RED-GE-2 | red | surface | 51.8 | 17.71 | 6.8 | 1.36 | 8.96 | 70.3 | 3.68 | 88.8 | 61.9 |
| RED-GE-3 | red | surface | 14.3 | 3.32 | 9.14 | 0.46 | 2.39 | 70.1 | 5.27 | 83.8 | 70.8 |
| RED-GLOG | red | surface | 69.6 | 0.0 | 2.29 | 0.0 | 0.0 | — | 7.18 | 99.3 | — |
| RED-KMF-1 | red | air | 96.4 | 1.71 | 0.14 | 0.34 | 1.57 | 47.7 | 9.36 | — | — |
| RED-KMF-2 | red | air | 94.6 | 1.23 | 0.23 | 0.21 | 1.21 | 42.6 | 9.52 | — | — |
| RED-KS-1 | red | submarine | 1.8 | 7.38 | 2.89 | 0.68 | 2.88 | 69.6 | 2.79 | 82.9 | 55.7 |
| RED-KSN | red | submarine | 44.6 | 14.11 | 2.34 | 0.91 | 7.54 | 69.0 | 3.79 | — | 68.7 |
| RED-MPRA-K1 | red | air | 35.7 | 3.18 | 1.86 | 0.46 | 1.88 | 52.4 | 4.11 | — | 99.4 |
| RED-MPRA-K2 | red | air | 25.0 | 2.02 | 2.59 | 0.34 | 1.45 | 55.6 | 3.68 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 96.4 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.04 | 4.0 | 0.0 | 0.04 | 50.0 | 0.0 | — | 98.8 |

## Blue: Defensiva / Concentrada × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=74.7%, red=25.3%
- Motivo de conclusão: timeout=57.3%, victory=42.7%
- Duração média: 13.55 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.61, red=65.98
- Unidades perdidas em média: blue=5.85, red=5.45

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.06 | 0.01 | 0.0 | 0.14 | 42.9 | 1.0 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.68 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.26 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.0 | 0.18 | 1.15 | 0.05 | 0.22 | 42.4 | 2.59 | 81.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.19 | 0.0 | 0.05 | 0.11 | 62.5 | 7.25 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.07 | 50.0 | 7.32 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.19 | 0.0 | 0.7 | 2.21 | 56.6 | 5.49 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.87 | 0.0 | 0.45 | 1.55 | 62.9 | 5.39 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.33 | 0.04 | 0.05 | 0.21 | 62.5 | 0.33 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.67 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 54.0 | 0.0 | 4.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 69.3 | 0.0 | 2.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 70.0 | 0.0 | 3.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.7 | 0.0 | 3.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 78.7 | 0.0 | 1.33 | 0.0 | 0.0 | — | 2.99 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 69.3 | 0.0 | 1.66 | 0.0 | 0.0 | — | 2.25 | 99.6 | — |
| BLUE-MPRA-1 | blue | air | 95.3 | 0.26 | 0.19 | 0.07 | 0.28 | 38.1 | 3.89 | — | 99.8 |
| BLUE-MPRA-2 | blue | air | 94.0 | 0.27 | 0.19 | 0.06 | 0.23 | 52.9 | 3.77 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 81.3 | 0.09 | 0.83 | 0.01 | 0.02 | 100.0 | 2.99 | 89.7 | 98.7 |
| BLUE-PAT-C2 | blue | surface | 64.0 | 0.16 | 1.59 | 0.03 | 0.14 | 57.1 | 2.37 | 91.7 | 91.3 |
| BLUE-PAT-O1 | blue | surface | 55.3 | 3.4 | 2.83 | 0.31 | 2.99 | 47.0 | 1.97 | 88.0 | 93.7 |
| BLUE-PAT-O2 | blue | surface | 86.0 | 3.18 | 0.99 | 0.65 | 2.39 | 51.4 | 3.83 | 33.0 | 81.0 |
| BLUE-PORTO-ACU | blue | land | 90.0 | 0.0 | 3.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 28.0 | 0.0 | 16.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 58.0 | 0.0 | 9.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 81.3 | 2.33 | 1.05 | 0.28 | 2.17 | 47.4 | 2.29 | 93.5 | 97.6 |
| BLUE-SAG-S1 | blue | surface | 71.3 | 2.36 | 4.05 | 0.34 | 2.17 | 47.1 | 2.24 | 33.7 | 99.4 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.26 | 1.89 | 0.65 | 3.08 | 44.2 | 3.21 | 31.3 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 80.0 | 2.95 | 0.73 | 0.41 | 2.28 | 59.4 | 3.27 | 81.9 | 76.3 |
| BLUE-SUB-2 | blue | submarine | 88.7 | 2.28 | 0.35 | 0.52 | 1.94 | 57.7 | 4.14 | 33.0 | 94.1 |
| BLUE-SUB-3 | blue | submarine | 91.3 | 0.81 | 0.31 | 0.09 | 0.58 | 62.1 | 3.63 | 83.2 | 92.2 |
| BLUE-SUB-N | blue | submarine | 66.7 | 6.34 | 1.59 | 0.71 | 4.07 | 60.2 | 1.7 | — | 77.4 |
| RED-AKE | red | surface | 50.7 | 0.0 | 3.96 | 0.0 | 0.0 | — | 6.83 | 97.7 | — |
| RED-AOR-G | red | surface | 56.7 | 0.0 | 2.19 | 0.0 | 0.0 | — | 3.65 | 99.1 | — |
| RED-AWACS-K | red | air | 98.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.07 | — | — |
| RED-GANF | red | surface | 99.3 | 0.0 | 0.48 | 0.0 | 0.0 | — | 0.0 | 58.1 | — |
| RED-GBPA | red | surface | 98.7 | 0.6 | 0.28 | 0.11 | 0.47 | 45.1 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 70.7 | 18.08 | 4.73 | 1.17 | 11.57 | 64.9 | 2.37 | 81.3 | 75.3 |
| RED-GE-2 | red | surface | 50.7 | 14.31 | 6.27 | 1.12 | 7.87 | 67.5 | 2.85 | 77.9 | 69.6 |
| RED-GE-3 | red | surface | 63.3 | 1.71 | 4.43 | 0.25 | 1.29 | 67.5 | 2.39 | 76.7 | 84.6 |
| RED-GLOG | red | surface | 58.7 | 0.0 | 3.42 | 0.0 | 0.0 | — | 7.26 | 99.2 | — |
| RED-KMF-1 | red | air | 98.7 | 0.74 | 0.07 | 0.13 | 0.74 | 40.5 | 5.39 | — | — |
| RED-KMF-2 | red | air | 98.7 | 0.72 | 0.05 | 0.12 | 0.61 | 56.5 | 5.2 | — | — |
| RED-KS-1 | red | submarine | 30.7 | 7.92 | 2.41 | 0.73 | 3.41 | 65.4 | 2.15 | 57.7 | 50.9 |
| RED-KSN | red | submarine | 44.0 | 13.04 | 2.58 | 1.01 | 8.19 | 63.1 | 2.06 | — | 70.0 |
| RED-MPRA-K1 | red | air | 61.3 | 5.25 | 1.28 | 0.73 | 2.03 | 60.5 | 2.5 | — | 100.0 |
| RED-MPRA-K2 | red | air | 67.3 | 3.55 | 1.09 | 0.47 | 1.48 | 59.9 | 2.43 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 98.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.06 | 4.37 | 0.01 | 0.03 | 75.0 | 0.0 | — | 99.1 |

### Somente vitória decisiva

- Partidas: **64**
- Taxa de vitória: blue=40.6%, red=59.4%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.58 turnos
- Dano médio causado por equipe (pontos de HP): blue=45.09, red=73.14
- Unidades perdidas em média: blue=6.59, red=6.56

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.0 | 0.11 | 14.3 | 1.41 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.95 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.2 | 0.31 | 1.02 | 0.09 | 0.36 | 43.5 | 3.25 | 84.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.03 | 0.0 | 6.62 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.05 | 0.0 | 0.03 | 0.06 | 50.0 | 6.73 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.28 | 0.0 | 0.8 | 2.53 | 52.5 | 4.41 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 4.78 | 0.0 | 0.53 | 1.8 | 67.0 | 4.16 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.42 | 0.0 | 0.06 | 0.25 | 75.0 | 0.47 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.94 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 29.7 | 0.0 | 6.52 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 54.7 | 0.0 | 4.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 51.6 | 0.0 | 5.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 50.0 | 0.0 | 4.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 79.7 | 0.0 | 1.25 | 0.0 | 0.0 | — | 4.16 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 70.3 | 0.0 | 1.44 | 0.0 | 0.0 | — | 3.06 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 92.2 | 0.45 | 0.34 | 0.09 | 0.52 | 33.3 | 2.38 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 89.1 | 0.55 | 0.38 | 0.11 | 0.44 | 46.4 | 2.55 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 84.4 | 0.06 | 0.61 | 0.0 | 0.02 | 100.0 | 4.11 | 89.3 | 98.4 |
| BLUE-PAT-C2 | blue | surface | 60.9 | 0.17 | 1.7 | 0.02 | 0.11 | 71.4 | 3.2 | 91.4 | 93.8 |
| BLUE-PAT-O1 | blue | surface | 40.6 | 4.0 | 4.08 | 0.42 | 3.72 | 47.5 | 2.27 | 82.7 | 87.5 |
| BLUE-PAT-O2 | blue | surface | 92.2 | 4.33 | 0.69 | 0.8 | 3.3 | 52.1 | 4.55 | 45.9 | 82.8 |
| BLUE-PORTO-ACU | blue | land | 95.3 | 0.0 | 2.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 20.3 | 0.0 | 17.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.8 | 0.0 | 10.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 81.2 | 3.36 | 1.11 | 0.45 | 3.02 | 53.4 | 3.17 | 93.5 | 95.5 |
| BLUE-SAG-S1 | blue | surface | 78.1 | 3.91 | 3.14 | 0.56 | 3.44 | 49.5 | 3.19 | 40.5 | 98.8 |
| BLUE-SAG-S2 | blue | surface | 93.8 | 4.27 | 1.55 | 0.88 | 4.06 | 43.8 | 4.45 | 44.7 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 76.6 | 3.48 | 0.8 | 0.45 | 2.66 | 62.4 | 3.5 | 88.2 | 70.1 |
| BLUE-SUB-2 | blue | submarine | 90.6 | 2.48 | 0.3 | 0.52 | 1.89 | 62.0 | 4.12 | 57.2 | 92.2 |
| BLUE-SUB-3 | blue | submarine | 87.5 | 1.09 | 0.39 | 0.11 | 0.8 | 60.8 | 3.59 | 89.0 | 89.6 |
| BLUE-SUB-N | blue | submarine | 71.9 | 6.08 | 1.19 | 0.64 | 3.69 | 66.5 | 2.19 | — | 76.8 |
| RED-AKE | red | surface | 53.1 | 0.0 | 3.48 | 0.0 | 0.0 | — | 7.56 | 98.4 | — |
| RED-AOR-G | red | surface | 37.5 | 0.0 | 2.89 | 0.0 | 0.0 | — | 4.25 | 98.4 | — |
| RED-AWACS-K | red | air | 96.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.45 | — | — |
| RED-GANF | red | surface | 98.4 | 0.0 | 0.75 | 0.0 | 0.0 | — | 0.0 | 72.4 | — |
| RED-GBPA | red | surface | 96.9 | 0.62 | 0.59 | 0.11 | 0.64 | 36.6 | 0.0 | — | 98.8 |
| RED-GE-1 | red | surface | 78.1 | 16.92 | 3.94 | 1.02 | 11.25 | 64.6 | 1.8 | 85.2 | 76.1 |
| RED-GE-2 | red | surface | 45.3 | 17.69 | 7.31 | 1.48 | 8.73 | 70.1 | 2.98 | 85.6 | 63.9 |
| RED-GE-3 | red | surface | 26.6 | 3.59 | 9.06 | 0.53 | 2.64 | 67.5 | 4.66 | 75.3 | 68.7 |
| RED-GLOG | red | surface | 57.8 | 0.0 | 3.38 | 0.0 | 0.0 | — | 8.22 | 99.5 | — |
| RED-KMF-1 | red | air | 96.9 | 1.23 | 0.14 | 0.22 | 1.28 | 36.6 | 8.81 | — | — |
| RED-KMF-2 | red | air | 96.9 | 1.2 | 0.11 | 0.16 | 1.06 | 61.8 | 8.52 | — | — |
| RED-KS-1 | red | submarine | 25.0 | 9.17 | 2.62 | 0.86 | 3.53 | 69.5 | 2.33 | 65.7 | 48.1 |
| RED-KSN | red | submarine | 48.4 | 14.56 | 2.2 | 1.03 | 8.03 | 66.3 | 2.19 | — | 67.7 |
| RED-MPRA-K1 | red | air | 28.1 | 4.91 | 2.22 | 0.72 | 1.83 | 61.5 | 3.75 | — | 100.0 |
| RED-MPRA-K2 | red | air | 42.2 | 3.14 | 1.92 | 0.45 | 1.47 | 61.7 | 4.3 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 96.9 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.09 | 4.47 | 0.02 | 0.02 | 100.0 | 0.0 | — | 99.5 |

## Blue: Defensiva / Concentrada × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: red=21.3%, blue=78.7%
- Motivo de conclusão: victory=39.3%, timeout=60.7%
- Duração média: 14.09 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.01, red=67.22
- Unidades perdidas em média: blue=6.03, red=5.45

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.01 | 0.13 | 20.0 | 1.16 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.82 | — | — |
| BLUE-AERO-CF | blue | land | 98.0 | 0.0 | 0.58 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.0 | 0.21 | 1.09 | 0.09 | 0.19 | 64.3 | 2.73 | 74.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.14 | 42.9 | 7.77 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.11 | 43.8 | 7.77 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.67 | 0.0 | 0.61 | 1.93 | 58.8 | 5.96 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.25 | 0.0 | 0.41 | 1.37 | 58.3 | 5.96 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.7 | 0.14 | 0.09 | 0.01 | 0.15 | 50.0 | 0.39 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.76 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 64.7 | 0.0 | 3.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 73.3 | 0.0 | 2.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 73.3 | 0.0 | 2.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 64.0 | 0.0 | 3.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 74.7 | 0.0 | 1.52 | 0.0 | 0.0 | — | 3.08 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 63.3 | 0.0 | 2.19 | 0.0 | 0.0 | — | 2.67 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 98.0 | 0.26 | 0.07 | 0.08 | 0.26 | 41.0 | 3.95 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 93.3 | 0.29 | 0.29 | 0.06 | 0.25 | 44.7 | 3.79 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 82.0 | 0.0 | 0.79 | 0.0 | 0.01 | 0.0 | 3.14 | 86.7 | 99.3 |
| BLUE-PAT-C2 | blue | surface | 62.7 | 0.16 | 1.74 | 0.01 | 0.14 | 76.2 | 2.81 | 86.6 | 90.7 |
| BLUE-PAT-O1 | blue | surface | 59.3 | 3.38 | 2.67 | 0.36 | 3.22 | 40.8 | 2.33 | 89.5 | 92.3 |
| BLUE-PAT-O2 | blue | surface | 81.3 | 3.18 | 1.09 | 0.65 | 2.34 | 51.0 | 3.56 | 37.9 | 82.3 |
| BLUE-PORTO-ACU | blue | land | 85.3 | 0.0 | 3.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 23.3 | 0.0 | 17.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 59.3 | 0.0 | 10.09 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.3 | 2.3 | 1.4 | 0.33 | 2.17 | 45.1 | 2.5 | 92.9 | 97.8 |
| BLUE-SAG-S1 | blue | surface | 67.3 | 2.68 | 4.58 | 0.35 | 2.56 | 45.8 | 2.5 | 35.4 | 98.8 |
| BLUE-SAG-S2 | blue | surface | 88.0 | 3.59 | 1.86 | 0.71 | 3.02 | 46.6 | 3.32 | 36.5 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 78.7 | 3.45 | 0.81 | 0.47 | 2.33 | 66.6 | 3.41 | 76.3 | 76.8 |
| BLUE-SUB-2 | blue | submarine | 86.0 | 1.92 | 0.49 | 0.44 | 1.81 | 52.6 | 4.03 | 36.4 | 94.7 |
| BLUE-SUB-3 | blue | submarine | 90.7 | 0.67 | 0.28 | 0.09 | 0.53 | 62.5 | 3.7 | 83.6 | 92.3 |
| BLUE-SUB-N | blue | submarine | 61.3 | 6.67 | 1.85 | 0.72 | 4.23 | 61.3 | 1.96 | — | 76.0 |
| RED-AKE | red | surface | 48.7 | 0.0 | 4.06 | 0.0 | 0.0 | — | 7.37 | 97.3 | — |
| RED-AOR-G | red | surface | 57.3 | 0.0 | 2.1 | 0.0 | 0.0 | — | 3.88 | 99.0 | — |
| RED-AWACS-K | red | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.85 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.49 | 0.0 | 0.0 | — | 0.0 | 51.7 | — |
| RED-GBPA | red | surface | 100.0 | 0.95 | 0.26 | 0.19 | 0.75 | 46.9 | 0.0 | — | 98.8 |
| RED-GE-1 | red | surface | 76.0 | 20.29 | 4.53 | 1.5 | 12.6 | 66.3 | 2.13 | 75.1 | 73.2 |
| RED-GE-2 | red | surface | 54.0 | 12.5 | 6.06 | 0.88 | 7.71 | 66.1 | 1.94 | 70.8 | 71.6 |
| RED-GE-3 | red | surface | 66.7 | 2.11 | 3.94 | 0.28 | 1.29 | 72.5 | 1.91 | 75.2 | 83.8 |
| RED-GLOG | red | surface | 48.0 | 0.0 | 3.89 | 0.0 | 0.0 | — | 6.73 | 98.8 | — |
| RED-KMF-1 | red | air | 99.3 | 1.04 | 0.08 | 0.23 | 0.93 | 42.1 | 5.02 | — | — |
| RED-KMF-2 | red | air | 100.0 | 0.58 | 0.03 | 0.1 | 0.75 | 31.9 | 5.07 | — | — |
| RED-KS-1 | red | submarine | 33.3 | 7.63 | 2.27 | 0.75 | 3.5 | 65.5 | 2.21 | 54.7 | 49.6 |
| RED-KSN | red | submarine | 37.3 | 12.85 | 2.77 | 0.91 | 7.89 | 64.3 | 1.96 | — | 70.9 |
| RED-MPRA-K1 | red | air | 67.3 | 4.77 | 1.1 | 0.59 | 2.07 | 55.6 | 1.83 | — | 100.0 |
| RED-MPRA-K2 | red | air | 65.3 | 4.51 | 1.23 | 0.62 | 1.87 | 58.9 | 1.72 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 4.21 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.8 |

### Somente vitória decisiva

- Partidas: **59**
- Taxa de vitória: red=54.2%, blue=45.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.07 turnos
- Dano médio causado por equipe (pontos de HP): blue=48.66, red=78.83
- Unidades perdidas em média: blue=7.59, red=6.97

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.0 | 0.19 | 18.2 | 1.88 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.34 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.3 | 0.0 | 0.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 94.9 | 0.41 | 0.93 | 0.19 | 0.32 | 73.7 | 4.02 | 65.9 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.08 | 0.0 | 8.27 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.0 | 0.07 | 25.0 | 8.39 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.78 | 0.0 | 0.56 | 2.12 | 52.0 | 5.36 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.71 | 0.0 | 0.53 | 1.63 | 61.5 | 5.34 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.08 | 0.0 | 0.02 | 0.24 | 28.6 | 0.63 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.24 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 47.5 | 0.0 | 4.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 54.2 | 0.0 | 3.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 47.5 | 0.0 | 4.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 47.5 | 0.0 | 4.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 61.0 | 0.0 | 2.25 | 0.0 | 0.0 | — | 4.66 | 98.9 | — |
| BLUE-LOG-T | blue | surface | 45.8 | 0.0 | 3.25 | 0.0 | 0.0 | — | 4.22 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 96.6 | 0.63 | 0.14 | 0.19 | 0.56 | 42.4 | 3.29 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 86.4 | 0.54 | 0.61 | 0.08 | 0.53 | 41.9 | 3.08 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 81.4 | 0.0 | 0.73 | 0.0 | 0.0 | — | 4.64 | 79.4 | 100.0 |
| BLUE-PAT-C2 | blue | surface | 44.1 | 0.15 | 2.39 | 0.0 | 0.15 | 77.8 | 4.25 | 79.7 | 91.5 |
| BLUE-PAT-O1 | blue | surface | 39.0 | 4.51 | 4.05 | 0.53 | 4.08 | 43.6 | 3.2 | 84.9 | 85.6 |
| BLUE-PAT-O2 | blue | surface | 88.1 | 4.68 | 0.59 | 0.85 | 3.59 | 45.3 | 4.56 | 57.3 | 88.1 |
| BLUE-PORTO-ACU | blue | land | 91.5 | 0.0 | 2.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 15.3 | 0.0 | 18.46 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 64.4 | 0.0 | 11.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 71.2 | 2.97 | 2.05 | 0.42 | 3.07 | 45.9 | 3.64 | 87.3 | 97.0 |
| BLUE-SAG-S1 | blue | surface | 64.4 | 4.53 | 4.92 | 0.61 | 4.66 | 44.4 | 4.05 | 46.6 | 97.9 |
| BLUE-SAG-S2 | blue | surface | 89.8 | 5.46 | 1.86 | 1.03 | 4.92 | 46.9 | 4.81 | 53.4 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 71.2 | 5.07 | 1.02 | 0.73 | 3.69 | 63.3 | 4.56 | 76.9 | 64.2 |
| BLUE-SUB-2 | blue | submarine | 88.1 | 1.9 | 0.47 | 0.34 | 1.51 | 58.4 | 5.12 | 57.5 | 92.4 |
| BLUE-SUB-3 | blue | submarine | 89.8 | 1.03 | 0.24 | 0.07 | 0.78 | 63.0 | 4.63 | 85.4 | 87.9 |
| BLUE-SUB-N | blue | submarine | 62.7 | 8.17 | 1.83 | 0.83 | 5.07 | 59.9 | 3.15 | — | 70.5 |
| RED-AKE | red | surface | 40.7 | 0.0 | 4.34 | 0.0 | 0.0 | — | 6.95 | 98.1 | — |
| RED-AOR-G | red | surface | 30.5 | 0.0 | 3.46 | 0.0 | 0.0 | — | 4.02 | 98.0 | — |
| RED-AWACS-K | red | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 9.2 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.85 | 0.0 | 0.0 | — | 0.0 | 53.2 | — |
| RED-GBPA | red | surface | 100.0 | 1.2 | 0.53 | 0.24 | 0.97 | 50.9 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 84.7 | 21.02 | 4.59 | 1.59 | 13.32 | 66.7 | 2.1 | 70.4 | 71.9 |
| RED-GE-2 | red | surface | 47.5 | 14.34 | 7.44 | 1.03 | 8.61 | 67.9 | 1.66 | 78.4 | 67.7 |
| RED-GE-3 | red | surface | 28.8 | 4.58 | 8.37 | 0.63 | 2.73 | 72.7 | 4.02 | 74.7 | 66.1 |
| RED-GLOG | red | surface | 40.7 | 0.0 | 4.31 | 0.0 | 0.0 | — | 7.24 | 98.5 | — |
| RED-KMF-1 | red | air | 100.0 | 1.98 | 0.03 | 0.41 | 1.8 | 40.6 | 9.54 | — | — |
| RED-KMF-2 | red | air | 100.0 | 1.15 | 0.07 | 0.2 | 1.47 | 32.2 | 9.56 | — | — |
| RED-KS-1 | red | submarine | 27.1 | 9.19 | 2.44 | 0.98 | 3.8 | 71.9 | 2.85 | 62.3 | 44.7 |
| RED-KSN | red | submarine | 25.4 | 13.88 | 3.14 | 0.97 | 8.05 | 63.8 | 2.14 | — | 68.0 |
| RED-MPRA-K1 | red | air | 39.0 | 6.36 | 2.24 | 0.81 | 2.68 | 54.4 | 3.44 | — | 100.0 |
| RED-MPRA-K2 | red | air | 35.6 | 5.14 | 2.39 | 0.73 | 2.44 | 54.9 | 3.63 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.47 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## Blue: Defensiva / Dividida × Red: Ofensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=77.3%, red=22.7%
- Motivo de conclusão: timeout=50.7%, victory=49.3%
- Duração média: 12.19 turnos
- Dano médio causado por equipe (pontos de HP): blue=36.87, red=54.74
- Unidades perdidas em média: blue=4.43, red=5.43

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.01 | 0.08 | 25.0 | 1.06 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.73 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.3 | 0.26 | 0.89 | 0.07 | 0.34 | 43.1 | 2.51 | 84.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.01 | 0.1 | 66.7 | 5.98 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.05 | 0.0 | 0.02 | 0.08 | 58.3 | 5.84 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 3.91 | 0.0 | 0.47 | 1.81 | 53.9 | 3.95 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.3 | 0.0 | 0.37 | 1.41 | 52.6 | 3.89 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.25 | 0.01 | 0.03 | 0.24 | 61.1 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.05 | 0.0 | 0.01 | 0.01 | 100.0 | 0.71 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 70.7 | 0.0 | 2.7 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 69.3 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 73.3 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 74.0 | 0.0 | 2.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 89.3 | 0.0 | 0.69 | 0.0 | 0.0 | — | 3.3 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 84.0 | 0.0 | 0.91 | 0.0 | 0.0 | — | 2.6 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 94.0 | 0.35 | 0.21 | 0.11 | 0.31 | 63.8 | 1.97 | — | 98.7 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.25 | 0.24 | 0.05 | 0.25 | 50.0 | 2.03 | — | 99.8 |
| BLUE-PAT-C1 | blue | surface | 82.0 | 0.15 | 0.79 | 0.01 | 0.09 | 85.7 | 2.89 | 87.9 | 94.0 |
| BLUE-PAT-C2 | blue | surface | 80.7 | 0.09 | 0.76 | 0.01 | 0.15 | 52.2 | 2.68 | 89.9 | 89.3 |
| BLUE-PAT-O1 | blue | surface | 64.0 | 3.39 | 2.42 | 0.35 | 3.02 | 43.0 | 1.45 | 88.9 | 94.3 |
| BLUE-PAT-O2 | blue | surface | 92.0 | 3.09 | 0.48 | 0.55 | 2.49 | 50.5 | 3.61 | 41.7 | 80.3 |
| BLUE-PORTO-ACU | blue | land | 88.0 | 0.0 | 2.59 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 48.7 | 0.0 | 14.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 84.7 | 0.0 | 6.22 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 76.7 | 0.0 | 5.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 88.0 | 2.91 | 0.75 | 0.52 | 2.76 | 44.4 | 2.53 | 90.8 | 97.2 |
| BLUE-SAG-S1 | blue | surface | 84.0 | 3.13 | 2.87 | 0.47 | 2.94 | 48.1 | 2.46 | 41.5 | 97.4 |
| BLUE-SAG-S2 | blue | surface | 92.0 | 4.13 | 1.32 | 0.8 | 3.52 | 46.8 | 3.07 | 45.0 | 99.3 |
| BLUE-SUB-1 | blue | submarine | 80.7 | 3.45 | 0.65 | 0.49 | 2.81 | 61.0 | 2.84 | 87.6 | 71.8 |
| BLUE-SUB-2 | blue | submarine | 92.7 | 1.95 | 0.3 | 0.52 | 2.05 | 53.7 | 3.79 | 45.8 | 93.6 |
| BLUE-SUB-3 | blue | submarine | 94.0 | 0.66 | 0.2 | 0.15 | 0.54 | 58.0 | 3.29 | 83.5 | 93.8 |
| BLUE-SUB-N | blue | submarine | 70.0 | 5.39 | 1.29 | 0.42 | 3.2 | 64.8 | 1.73 | — | 76.9 |
| RED-AKE | red | surface | 63.3 | 0.0 | 3.04 | 0.0 | 0.0 | — | 6.99 | 97.7 | — |
| RED-AOR-G | red | surface | 68.0 | 0.0 | 1.67 | 0.0 | 0.0 | — | 5.13 | 99.5 | — |
| RED-AWACS-K | red | air | 94.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 3.29 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.55 | 0.0 | 0.0 | — | 0.0 | 77.3 | — |
| RED-GBPA | red | surface | 94.0 | 0.92 | 0.64 | 0.16 | 0.79 | 53.8 | 0.0 | — | 98.8 |
| RED-GE-1 | red | surface | 64.0 | 16.05 | 6.01 | 0.91 | 9.98 | 66.5 | 3.05 | 89.7 | 79.4 |
| RED-GE-2 | red | surface | 48.7 | 10.79 | 6.7 | 0.66 | 6.62 | 64.7 | 3.23 | 87.0 | 75.6 |
| RED-GE-3 | red | surface | 70.0 | 1.38 | 3.79 | 0.19 | 0.99 | 65.5 | 2.21 | 89.5 | 86.1 |
| RED-GLOG | red | surface | 69.3 | 0.0 | 2.37 | 0.0 | 0.0 | — | 6.68 | 99.4 | — |
| RED-KMF-1 | red | air | 94.0 | 0.97 | 0.14 | 0.18 | 0.9 | 45.2 | 3.75 | — | — |
| RED-KMF-2 | red | air | 93.3 | 0.71 | 0.17 | 0.15 | 0.69 | 48.1 | 3.74 | — | — |
| RED-KS-1 | red | submarine | 6.0 | 7.38 | 2.91 | 0.61 | 2.91 | 68.2 | 3.07 | 77.1 | 54.7 |
| RED-KSN | red | submarine | 42.0 | 10.55 | 2.62 | 0.63 | 6.01 | 68.8 | 2.33 | — | 76.5 |
| RED-MPRA-K1 | red | air | 64.0 | 3.19 | 1.11 | 0.52 | 1.68 | 56.3 | 1.61 | — | 100.0 |
| RED-MPRA-K2 | red | air | 62.7 | 2.77 | 1.09 | 0.41 | 1.42 | 54.0 | 1.77 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 94.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.03 | 4.05 | 0.0 | 0.05 | 42.9 | 0.0 | — | 98.4 |

### Somente vitória decisiva

- Partidas: **74**
- Taxa de vitória: blue=54.1%, red=45.9%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.22 turnos
- Dano médio causado por equipe (pontos de HP): blue=47.3, red=59.26
- Unidades perdidas em média: blue=4.99, red=6.76

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 1.62 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.12 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.2 | 0.41 | 1.05 | 0.09 | 0.58 | 37.2 | 3.22 | 86.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.01 | 0.07 | 60.0 | 6.27 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.0 | 0.03 | 50.0 | 6.15 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.95 | 0.0 | 0.69 | 2.26 | 55.1 | 3.35 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.95 | 0.0 | 0.42 | 1.64 | 53.7 | 3.27 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.16 | 0.0 | 0.03 | 0.22 | 62.5 | 0.54 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.09 | 0.0 | 0.01 | 0.01 | 100.0 | 1.08 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 52.7 | 0.0 | 4.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 45.9 | 0.0 | 4.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 55.4 | 0.0 | 4.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 67.6 | 0.0 | 3.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 91.9 | 0.0 | 0.45 | 0.0 | 0.0 | — | 4.19 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 82.4 | 0.0 | 0.89 | 0.0 | 0.0 | — | 4.01 | 99.8 | — |
| BLUE-MPRA-1 | blue | air | 95.9 | 0.36 | 0.18 | 0.16 | 0.45 | 63.6 | 0.91 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 90.5 | 0.28 | 0.28 | 0.07 | 0.38 | 42.9 | 0.95 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 79.7 | 0.31 | 0.86 | 0.03 | 0.19 | 85.7 | 4.26 | 88.1 | 87.8 |
| BLUE-PAT-C2 | blue | surface | 71.6 | 0.11 | 1.15 | 0.01 | 0.15 | 54.5 | 3.64 | 85.1 | 90.5 |
| BLUE-PAT-O1 | blue | surface | 59.5 | 5.14 | 2.78 | 0.53 | 4.92 | 39.3 | 1.65 | 88.5 | 89.9 |
| BLUE-PAT-O2 | blue | surface | 97.3 | 4.7 | 0.24 | 0.76 | 3.96 | 49.1 | 4.7 | 55.9 | 81.1 |
| BLUE-PORTO-ACU | blue | land | 100.0 | 0.0 | 0.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 58.1 | 0.0 | 14.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 70.3 | 0.0 | 11.42 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 100.0 | 0.0 | 1.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 91.9 | 3.61 | 0.59 | 0.68 | 3.99 | 42.7 | 3.58 | 90.1 | 96.1 |
| BLUE-SAG-S1 | blue | surface | 87.8 | 4.73 | 2.86 | 0.68 | 4.66 | 46.4 | 3.68 | 51.5 | 95.9 |
| BLUE-SAG-S2 | blue | surface | 98.6 | 5.09 | 0.77 | 0.91 | 4.72 | 43.8 | 4.08 | 58.7 | 98.9 |
| BLUE-SUB-1 | blue | submarine | 74.3 | 4.08 | 0.82 | 0.54 | 3.23 | 60.7 | 3.46 | 89.8 | 63.0 |
| BLUE-SUB-2 | blue | submarine | 89.2 | 2.09 | 0.35 | 0.49 | 2.12 | 49.0 | 4.62 | 72.2 | 91.6 |
| BLUE-SUB-3 | blue | submarine | 87.8 | 0.96 | 0.39 | 0.2 | 0.77 | 54.4 | 3.8 | 91.6 | 90.0 |
| BLUE-SUB-N | blue | submarine | 59.5 | 6.19 | 1.65 | 0.46 | 3.7 | 63.5 | 2.69 | — | 73.7 |
| RED-AKE | red | surface | 52.7 | 0.0 | 3.69 | 0.0 | 0.0 | — | 6.89 | 97.3 | — |
| RED-AOR-G | red | surface | 50.0 | 0.0 | 2.43 | 0.0 | 0.0 | — | 5.66 | 99.4 | — |
| RED-AWACS-K | red | air | 87.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.2 | — | — |
| RED-GANF | red | surface | 100.0 | 0.0 | 0.86 | 0.0 | 0.0 | — | 0.0 | 75.9 | — |
| RED-GBPA | red | surface | 87.8 | 1.42 | 1.23 | 0.22 | 1.12 | 51.8 | 0.0 | — | 98.4 |
| RED-GE-1 | red | surface | 68.9 | 14.8 | 6.05 | 0.88 | 8.88 | 67.1 | 3.3 | 90.2 | 81.9 |
| RED-GE-2 | red | surface | 45.9 | 12.14 | 7.58 | 0.69 | 7.09 | 65.9 | 3.97 | 91.4 | 71.8 |
| RED-GE-3 | red | surface | 40.5 | 2.69 | 7.54 | 0.38 | 1.95 | 64.6 | 4.08 | 80.7 | 72.7 |
| RED-GLOG | red | surface | 55.4 | 0.0 | 3.5 | 0.0 | 0.0 | — | 7.09 | 99.2 | — |
| RED-KMF-1 | red | air | 87.8 | 1.61 | 0.28 | 0.27 | 1.53 | 44.2 | 7.09 | — | — |
| RED-KMF-2 | red | air | 86.5 | 1.12 | 0.3 | 0.22 | 1.19 | 48.9 | 7.04 | — | — |
| RED-KS-1 | red | submarine | 6.8 | 9.07 | 3.0 | 0.73 | 3.34 | 71.3 | 3.15 | 79.2 | 48.9 |
| RED-KSN | red | submarine | 40.5 | 11.31 | 2.65 | 0.66 | 6.31 | 68.1 | 3.09 | — | 74.4 |
| RED-MPRA-K1 | red | air | 33.8 | 2.39 | 2.08 | 0.51 | 1.72 | 55.1 | 3.0 | — | 100.0 |
| RED-MPRA-K2 | red | air | 32.4 | 2.66 | 1.96 | 0.43 | 1.7 | 48.4 | 3.32 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 87.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.05 | 4.14 | 0.0 | 0.05 | 50.0 | 0.0 | — | 98.2 |

## Blue: Defensiva / Dividida × Red: Ofensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=78.0%, red=22.0%
- Motivo de conclusão: victory=40.7%, timeout=59.3%
- Duração média: 13.31 turnos
- Dano médio causado por equipe (pontos de HP): blue=37.25, red=58.55
- Unidades perdidas em média: blue=4.9, red=5.44

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.04 | 0.0 | 0.01 | 0.13 | 31.6 | 1.04 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.71 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 91.3 | 0.23 | 1.13 | 0.07 | 0.29 | 45.5 | 2.57 | 81.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.01 | 0.09 | 30.8 | 6.51 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.05 | 62.5 | 6.47 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.57 | 0.0 | 0.62 | 1.89 | 56.7 | 4.62 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.59 | 0.0 | 0.29 | 1.24 | 55.9 | 4.55 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.17 | 0.03 | 0.04 | 0.17 | 38.5 | 0.34 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.07 | 0.03 | 0.01 | 0.01 | 100.0 | 0.69 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 63.3 | 0.0 | 3.11 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 67.3 | 0.0 | 3.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 75.3 | 0.0 | 2.45 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 74.7 | 0.0 | 2.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 80.7 | 0.0 | 1.13 | 0.0 | 0.0 | — | 3.15 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 74.7 | 0.0 | 1.41 | 0.0 | 0.0 | — | 2.43 | 99.7 | — |
| BLUE-MPRA-1 | blue | air | 87.3 | 0.27 | 0.5 | 0.04 | 0.31 | 39.1 | 2.46 | — | 98.7 |
| BLUE-MPRA-2 | blue | air | 92.7 | 0.33 | 0.29 | 0.07 | 0.29 | 50.0 | 2.37 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.3 | 0.05 | 0.81 | 0.01 | 0.05 | 25.0 | 3.01 | 85.8 | 96.0 |
| BLUE-PAT-C2 | blue | surface | 76.7 | 0.31 | 1.09 | 0.0 | 0.23 | 74.3 | 2.29 | 90.3 | 80.7 |
| BLUE-PAT-O1 | blue | surface | 66.0 | 2.8 | 2.24 | 0.3 | 3.08 | 38.5 | 1.55 | 86.2 | 94.7 |
| BLUE-PAT-O2 | blue | surface | 88.0 | 3.09 | 0.69 | 0.63 | 2.33 | 54.4 | 3.58 | 37.9 | 76.7 |
| BLUE-PORTO-ACU | blue | land | 90.7 | 0.0 | 2.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 39.3 | 0.0 | 15.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 90.7 | 0.0 | 5.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 74.7 | 0.0 | 6.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.3 | 3.05 | 1.27 | 0.45 | 2.63 | 50.4 | 2.29 | 92.2 | 96.1 |
| BLUE-SAG-S1 | blue | surface | 82.7 | 2.69 | 3.11 | 0.45 | 2.9 | 46.7 | 2.35 | 36.3 | 96.4 |
| BLUE-SAG-S2 | blue | surface | 89.3 | 3.33 | 1.56 | 0.69 | 3.39 | 44.9 | 3.13 | 34.4 | 99.4 |
| BLUE-SUB-1 | blue | submarine | 82.7 | 3.85 | 0.61 | 0.61 | 2.96 | 62.6 | 3.01 | 84.6 | 73.0 |
| BLUE-SUB-2 | blue | submarine | 94.7 | 2.27 | 0.28 | 0.53 | 2.05 | 55.4 | 3.97 | 35.9 | 91.2 |
| BLUE-SUB-3 | blue | submarine | 94.7 | 0.83 | 0.18 | 0.09 | 0.51 | 72.7 | 3.24 | 84.2 | 92.5 |
| BLUE-SUB-N | blue | submarine | 72.7 | 6.63 | 1.15 | 0.5 | 3.75 | 65.5 | 1.71 | — | 74.3 |
| RED-AKE | red | surface | 65.3 | 0.0 | 2.79 | 0.0 | 0.0 | — | 6.98 | 97.7 | — |
| RED-AOR-G | red | surface | 64.0 | 0.0 | 1.77 | 0.0 | 0.0 | — | 4.62 | 99.3 | — |
| RED-AWACS-K | red | air | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.33 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.85 | 0.0 | 0.0 | — | 0.0 | 72.4 | — |
| RED-GBPA | red | surface | 95.3 | 0.85 | 0.57 | 0.18 | 0.94 | 44.7 | 0.0 | — | 98.9 |
| RED-GE-1 | red | surface | 61.3 | 16.72 | 6.15 | 0.98 | 10.69 | 65.4 | 3.2 | 89.6 | 77.5 |
| RED-GE-2 | red | surface | 46.7 | 12.07 | 6.98 | 0.84 | 7.43 | 64.7 | 2.99 | 85.7 | 72.2 |
| RED-GE-3 | red | surface | 66.7 | 1.31 | 3.87 | 0.15 | 0.77 | 72.2 | 2.01 | 87.1 | 89.9 |
| RED-GLOG | red | surface | 75.3 | 0.0 | 2.11 | 0.0 | 0.0 | — | 6.81 | 99.5 | — |
| RED-KMF-1 | red | air | 94.0 | 1.2 | 0.19 | 0.22 | 1.01 | 45.4 | 4.83 | — | — |
| RED-KMF-2 | red | air | 95.3 | 1.11 | 0.25 | 0.18 | 0.79 | 44.1 | 4.77 | — | — |
| RED-KS-1 | red | submarine | 6.7 | 6.88 | 3.01 | 0.55 | 2.75 | 73.1 | 2.91 | 77.4 | 56.6 |
| RED-KSN | red | submarine | 36.0 | 9.92 | 2.77 | 0.57 | 6.27 | 64.4 | 2.34 | — | 75.7 |
| RED-MPRA-K1 | red | air | 65.3 | 4.72 | 1.03 | 0.67 | 2.2 | 54.5 | 2.1 | — | 100.0 |
| RED-MPRA-K2 | red | air | 70.0 | 3.76 | 0.97 | 0.55 | 1.83 | 56.6 | 2.57 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 95.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 3.93 | 0.0 | 0.02 | 66.7 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **61**
- Taxa de vitória: blue=45.9%, red=54.1%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.48 turnos
- Dano médio causado por equipe (pontos de HP): blue=46.3, red=68.87
- Unidades perdidas em média: blue=5.97, red=6.64

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.0 | 0.0 | 0.15 | 22.2 | 1.72 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.16 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.7 | 0.31 | 0.57 | 0.15 | 0.48 | 41.4 | 3.39 | 79.7 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.02 | 0.05 | 33.3 | 6.82 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.02 | 0.0 | 0.02 | 0.02 | 100.0 | 6.95 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 4.2 | 0.0 | 0.69 | 1.97 | 50.8 | 3.87 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 2.41 | 0.0 | 0.26 | 1.23 | 53.3 | 3.8 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.03 | 0.0 | 0.02 | 0.2 | 16.7 | 0.56 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.07 | 0.0 | 0.02 | 0.02 | 100.0 | 1.13 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 36.1 | 0.0 | 5.26 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 39.3 | 0.0 | 5.44 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 52.5 | 0.0 | 3.95 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 63.9 | 0.0 | 3.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 78.7 | 0.0 | 1.33 | 0.0 | 0.0 | — | 4.33 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 68.9 | 0.0 | 1.72 | 0.0 | 0.0 | — | 4.02 | 99.8 | — |
| BLUE-MPRA-1 | blue | air | 91.8 | 0.18 | 0.31 | 0.05 | 0.44 | 25.9 | 1.8 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.8 | 0.33 | 0.36 | 0.08 | 0.38 | 43.5 | 1.57 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 78.7 | 0.11 | 1.0 | 0.03 | 0.13 | 25.0 | 4.44 | 83.6 | 90.2 |
| BLUE-PAT-C2 | blue | surface | 70.5 | 0.39 | 1.51 | 0.0 | 0.33 | 70.0 | 3.75 | 85.2 | 72.1 |
| BLUE-PAT-O1 | blue | surface | 63.9 | 4.51 | 2.49 | 0.43 | 4.9 | 39.1 | 2.1 | 84.9 | 91.0 |
| BLUE-PAT-O2 | blue | surface | 93.4 | 4.3 | 0.39 | 0.85 | 3.51 | 54.2 | 4.49 | 57.2 | 77.9 |
| BLUE-PORTO-ACU | blue | land | 98.4 | 0.0 | 0.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 32.8 | 0.0 | 17.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 78.7 | 0.0 | 10.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 91.8 | 0.0 | 3.36 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 72.1 | 4.2 | 1.69 | 0.57 | 3.98 | 50.6 | 3.62 | 91.1 | 92.4 |
| BLUE-SAG-S1 | blue | surface | 78.7 | 4.38 | 4.0 | 0.7 | 4.66 | 46.5 | 3.57 | 49.8 | 93.3 |
| BLUE-SAG-S2 | blue | surface | 91.8 | 4.75 | 1.62 | 0.87 | 4.72 | 44.1 | 4.52 | 54.4 | 98.8 |
| BLUE-SUB-1 | blue | submarine | 80.3 | 4.23 | 0.75 | 0.67 | 3.31 | 64.9 | 4.18 | 86.8 | 62.9 |
| BLUE-SUB-2 | blue | submarine | 93.4 | 2.15 | 0.28 | 0.52 | 1.9 | 56.9 | 4.92 | 69.4 | 87.9 |
| BLUE-SUB-3 | blue | submarine | 91.8 | 1.56 | 0.28 | 0.16 | 0.9 | 76.4 | 4.1 | 90.0 | 86.5 |
| BLUE-SUB-N | blue | submarine | 67.2 | 8.11 | 1.43 | 0.52 | 4.75 | 64.5 | 2.82 | — | 68.0 |
| RED-AKE | red | surface | 57.4 | 0.0 | 3.2 | 0.0 | 0.0 | — | 6.9 | 97.7 | — |
| RED-AOR-G | red | surface | 45.9 | 0.0 | 2.48 | 0.0 | 0.0 | — | 4.85 | 98.9 | — |
| RED-AWACS-K | red | air | 88.5 | 0.0 | 0.0 | 0.0 | 0.0 | — | 6.82 | — | — |
| RED-GANF | red | surface | 96.7 | 0.0 | 1.48 | 0.0 | 0.0 | — | 0.0 | 76.4 | — |
| RED-GBPA | red | surface | 88.5 | 1.03 | 1.23 | 0.21 | 1.1 | 41.8 | 0.0 | — | 99.3 |
| RED-GE-1 | red | surface | 77.0 | 16.16 | 5.33 | 0.84 | 10.31 | 66.0 | 3.15 | 86.5 | 78.4 |
| RED-GE-2 | red | surface | 50.8 | 16.56 | 7.2 | 1.23 | 8.77 | 67.7 | 3.25 | 88.5 | 65.0 |
| RED-GE-3 | red | surface | 31.1 | 2.85 | 8.07 | 0.31 | 1.61 | 75.5 | 3.9 | 74.0 | 79.2 |
| RED-GLOG | red | surface | 60.7 | 0.0 | 3.34 | 0.0 | 0.0 | — | 6.77 | 99.4 | — |
| RED-KMF-1 | red | air | 86.9 | 1.36 | 0.28 | 0.23 | 1.39 | 40.0 | 7.46 | — | — |
| RED-KMF-2 | red | air | 88.5 | 1.25 | 0.46 | 0.11 | 1.13 | 37.7 | 7.31 | — | — |
| RED-KS-1 | red | submarine | 9.8 | 7.9 | 2.72 | 0.74 | 3.08 | 75.0 | 3.3 | 76.8 | 51.3 |
| RED-KSN | red | submarine | 34.4 | 10.46 | 2.9 | 0.61 | 6.38 | 67.9 | 2.9 | — | 74.4 |
| RED-MPRA-K1 | red | air | 31.1 | 6.84 | 1.9 | 0.98 | 3.1 | 55.0 | 3.51 | — | 100.0 |
| RED-MPRA-K2 | red | air | 41.0 | 4.44 | 1.84 | 0.7 | 2.43 | 54.7 | 4.38 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 88.5 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.02 | 3.89 | 0.0 | 0.02 | 100.0 | 0.0 | — | 99.5 |

## Blue: Defensiva / Dividida × Red: Defensiva / Concentrada

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=72.0%, red=28.0%
- Motivo de conclusão: timeout=55.3%, victory=44.7%
- Duração média: 13.21 turnos
- Dano médio causado por equipe (pontos de HP): blue=34.73, red=63.39
- Unidades perdidas em média: blue=5.23, red=5.19

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.03 | 0.01 | 0.0 | 0.11 | 23.5 | 0.88 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.61 | — | — |
| BLUE-AERO-CF | blue | land | 96.7 | 0.0 | 0.6 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 96.0 | 0.15 | 0.67 | 0.05 | 0.25 | 43.2 | 2.14 | 82.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.06 | 0.0 | 0.01 | 0.07 | 36.4 | 5.1 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.06 | 44.4 | 5.05 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.93 | 0.0 | 0.75 | 2.05 | 69.8 | 3.43 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.17 | 0.0 | 0.47 | 1.33 | 63.5 | 3.38 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.0 | 0.2 | 0.08 | 0.05 | 0.15 | 68.2 | 0.29 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.3 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.57 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 61.3 | 0.0 | 3.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 67.3 | 0.0 | 2.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 66.0 | 0.0 | 3.35 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 69.3 | 0.0 | 3.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 83.3 | 0.0 | 1.01 | 0.0 | 0.0 | — | 2.91 | 99.5 | — |
| BLUE-LOG-T | blue | surface | 70.7 | 0.0 | 1.77 | 0.0 | 0.0 | — | 2.17 | 99.5 | — |
| BLUE-MPRA-1 | blue | air | 94.7 | 0.24 | 0.22 | 0.03 | 0.23 | 50.0 | 1.75 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 90.7 | 0.21 | 0.29 | 0.05 | 0.24 | 52.8 | 1.82 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 88.0 | 0.02 | 0.63 | 0.0 | 0.01 | 100.0 | 2.43 | 86.8 | 99.3 |
| BLUE-PAT-C2 | blue | surface | 78.0 | 0.11 | 1.07 | 0.0 | 0.09 | 61.5 | 2.16 | 89.6 | 95.3 |
| BLUE-PAT-O1 | blue | surface | 68.7 | 3.45 | 2.16 | 0.33 | 3.15 | 43.6 | 1.82 | 85.0 | 93.7 |
| BLUE-PAT-O2 | blue | surface | 89.3 | 2.36 | 0.74 | 0.47 | 1.93 | 48.8 | 3.21 | 27.7 | 84.0 |
| BLUE-PORTO-ACU | blue | land | 84.0 | 0.0 | 3.63 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 26.0 | 0.0 | 17.07 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.7 | 0.0 | 2.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 58.7 | 0.0 | 9.82 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 83.3 | 1.93 | 1.04 | 0.23 | 2.01 | 42.4 | 1.87 | 90.6 | 98.8 |
| BLUE-SAG-S1 | blue | surface | 76.0 | 2.52 | 3.72 | 0.39 | 2.18 | 45.9 | 2.07 | 31.3 | 98.7 |
| BLUE-SAG-S2 | blue | surface | 92.7 | 3.31 | 1.29 | 0.72 | 2.78 | 48.7 | 3.03 | 27.3 | 99.9 |
| BLUE-SUB-1 | blue | submarine | 85.3 | 2.81 | 0.51 | 0.4 | 2.04 | 63.4 | 2.62 | 84.5 | 79.5 |
| BLUE-SUB-2 | blue | submarine | 87.3 | 1.79 | 0.49 | 0.46 | 1.91 | 51.4 | 3.06 | 35.8 | 96.2 |
| BLUE-SUB-3 | blue | submarine | 95.3 | 0.45 | 0.14 | 0.09 | 0.3 | 71.1 | 2.53 | 89.3 | 95.8 |
| BLUE-SUB-N | blue | submarine | 73.3 | 5.98 | 1.47 | 0.66 | 3.49 | 63.5 | 1.51 | — | 80.1 |
| RED-AKE | red | surface | 54.0 | 0.0 | 3.74 | 0.0 | 0.0 | — | 7.56 | 97.2 | — |
| RED-AOR-G | red | surface | 62.7 | 0.0 | 1.83 | 0.0 | 0.0 | — | 4.31 | 99.1 | — |
| RED-AWACS-K | red | air | 96.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 4.83 | — | — |
| RED-GANF | red | surface | 99.3 | 0.0 | 0.47 | 0.0 | 0.0 | — | 0.0 | 64.7 | — |
| RED-GBPA | red | surface | 96.7 | 0.36 | 0.48 | 0.06 | 0.53 | 42.5 | 0.0 | — | 99.9 |
| RED-GE-1 | red | surface | 78.7 | 18.31 | 3.91 | 1.21 | 11.61 | 65.2 | 2.23 | 83.3 | 75.3 |
| RED-GE-2 | red | surface | 59.3 | 13.5 | 5.6 | 0.93 | 7.65 | 67.1 | 3.03 | 81.8 | 70.5 |
| RED-GE-3 | red | surface | 62.7 | 1.41 | 4.42 | 0.15 | 0.91 | 72.8 | 2.28 | 78.5 | 87.2 |
| RED-GLOG | red | surface | 63.3 | 0.0 | 2.99 | 0.0 | 0.0 | — | 7.58 | 99.1 | — |
| RED-KMF-1 | red | air | 96.0 | 0.71 | 0.13 | 0.11 | 0.59 | 43.8 | 5.05 | — | — |
| RED-KMF-2 | red | air | 96.0 | 0.68 | 0.08 | 0.15 | 0.47 | 47.9 | 4.95 | — | — |
| RED-KS-1 | red | submarine | 26.0 | 8.08 | 2.31 | 0.71 | 3.62 | 68.1 | 1.89 | 60.8 | 49.0 |
| RED-KSN | red | submarine | 45.3 | 13.77 | 2.25 | 1.03 | 7.97 | 68.1 | 2.25 | — | 70.2 |
| RED-MPRA-K1 | red | air | 66.0 | 3.47 | 1.1 | 0.44 | 1.59 | 53.8 | 2.41 | — | 100.0 |
| RED-MPRA-K2 | red | air | 64.0 | 3.11 | 1.11 | 0.44 | 1.25 | 59.0 | 2.34 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 96.7 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 4.32 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.8 |

### Somente vitória decisiva

- Partidas: **67**
- Taxa de vitória: blue=37.3%, red=62.7%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.28 turnos
- Dano médio causado por equipe (pontos de HP): blue=44.9, red=78.73
- Unidades perdidas em média: blue=6.97, red=6.49

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.1 | 0.0 | 1.52 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.04 | — | — |
| BLUE-AERO-CF | blue | land | 98.5 | 0.0 | 0.24 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.5 | 0.0 | 0.34 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.5 | 0.24 | 0.57 | 0.1 | 0.42 | 42.9 | 3.03 | 76.1 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.07 | 40.0 | 6.43 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.03 | 0.07 | 40.0 | 6.58 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.9 | 0.0 | 0.78 | 2.42 | 65.4 | 3.87 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.96 | 0.0 | 0.6 | 1.69 | 61.9 | 3.81 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.3 | 0.0 | 0.06 | 0.25 | 64.7 | 0.51 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.99 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 35.8 | 0.0 | 5.48 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 44.8 | 0.0 | 4.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 38.8 | 0.0 | 5.55 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 59.7 | 0.0 | 3.94 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 74.6 | 0.0 | 1.51 | 0.0 | 0.0 | — | 4.16 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 53.7 | 0.0 | 2.7 | 0.0 | 0.0 | — | 3.43 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 91.0 | 0.51 | 0.43 | 0.06 | 0.45 | 50.0 | 1.55 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 82.1 | 0.43 | 0.6 | 0.1 | 0.48 | 53.1 | 1.69 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 83.6 | 0.04 | 0.87 | 0.0 | 0.01 | 100.0 | 4.01 | 82.3 | 98.5 |
| BLUE-PAT-C2 | blue | surface | 65.7 | 0.21 | 1.6 | 0.0 | 0.13 | 66.7 | 3.34 | 84.1 | 92.5 |
| BLUE-PAT-O1 | blue | surface | 53.7 | 5.0 | 3.42 | 0.58 | 4.37 | 45.1 | 2.04 | 80.1 | 87.3 |
| BLUE-PAT-O2 | blue | surface | 89.6 | 3.07 | 0.72 | 0.57 | 2.78 | 48.9 | 4.4 | 43.3 | 82.8 |
| BLUE-PORTO-ACU | blue | land | 91.0 | 0.0 | 3.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 14.9 | 0.0 | 19.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 2.21 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 61.2 | 0.0 | 11.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 73.1 | 2.58 | 1.7 | 0.28 | 2.75 | 47.3 | 3.1 | 85.7 | 98.1 |
| BLUE-SAG-S1 | blue | surface | 76.1 | 4.4 | 3.96 | 0.66 | 3.67 | 46.7 | 3.4 | 42.7 | 97.8 |
| BLUE-SAG-S2 | blue | surface | 91.0 | 5.06 | 1.7 | 1.04 | 4.18 | 48.6 | 4.97 | 47.0 | 99.8 |
| BLUE-SUB-1 | blue | submarine | 76.1 | 4.27 | 0.94 | 0.57 | 3.22 | 63.0 | 4.06 | 84.0 | 65.9 |
| BLUE-SUB-2 | blue | submarine | 89.6 | 1.33 | 0.49 | 0.31 | 1.72 | 47.0 | 4.64 | 57.8 | 94.4 |
| BLUE-SUB-3 | blue | submarine | 92.5 | 0.84 | 0.21 | 0.16 | 0.54 | 69.4 | 3.64 | 87.9 | 92.5 |
| BLUE-SUB-N | blue | submarine | 68.7 | 6.69 | 1.6 | 0.57 | 3.84 | 66.1 | 2.51 | — | 76.1 |
| RED-AKE | red | surface | 53.7 | 0.0 | 3.76 | 0.0 | 0.0 | — | 7.76 | 97.0 | — |
| RED-AOR-G | red | surface | 43.3 | 0.0 | 2.84 | 0.0 | 0.0 | — | 4.4 | 98.5 | — |
| RED-AWACS-K | red | air | 92.5 | 0.0 | 0.0 | 0.0 | 0.0 | — | 8.42 | — | — |
| RED-GANF | red | surface | 98.5 | 0.0 | 0.64 | 0.0 | 0.0 | — | 0.0 | 66.0 | — |
| RED-GBPA | red | surface | 92.5 | 0.52 | 0.99 | 0.09 | 0.82 | 40.0 | 0.0 | — | 99.7 |
| RED-GE-1 | red | surface | 91.0 | 19.73 | 3.33 | 1.24 | 12.22 | 66.5 | 1.6 | 80.7 | 74.1 |
| RED-GE-2 | red | surface | 52.2 | 17.61 | 7.27 | 1.42 | 9.49 | 66.5 | 2.82 | 80.8 | 61.1 |
| RED-GE-3 | red | surface | 23.9 | 2.93 | 9.09 | 0.31 | 1.87 | 72.8 | 4.36 | 75.1 | 74.1 |
| RED-GLOG | red | surface | 53.7 | 0.0 | 3.51 | 0.0 | 0.0 | — | 7.76 | 99.0 | — |
| RED-KMF-1 | red | air | 92.5 | 1.27 | 0.16 | 0.18 | 1.09 | 39.7 | 8.91 | — | — |
| RED-KMF-2 | red | air | 91.0 | 1.33 | 0.15 | 0.28 | 0.85 | 49.1 | 8.82 | — | — |
| RED-KS-1 | red | submarine | 26.9 | 9.28 | 2.19 | 0.85 | 3.84 | 72.8 | 2.37 | 66.0 | 44.3 |
| RED-KSN | red | submarine | 43.3 | 16.55 | 2.36 | 1.3 | 8.43 | 68.5 | 2.63 | — | 66.3 |
| RED-MPRA-K1 | red | air | 32.8 | 4.84 | 2.1 | 0.66 | 2.33 | 54.5 | 4.57 | — | 100.0 |
| RED-MPRA-K2 | red | air | 31.3 | 4.66 | 2.09 | 0.64 | 1.96 | 57.3 | 4.51 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 92.5 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 4.42 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.5 |

## Blue: Defensiva / Dividida × Red: Defensiva / Dividida

### Geral (todas as partidas)

- Partidas: **150**
- Taxa de vitória: blue=80.0%, red=20.0%
- Motivo de conclusão: timeout=57.3%, victory=42.7%
- Duração média: 13.85 turnos
- Dano médio causado por equipe (pontos de HP): blue=38.67, red=65.89
- Unidades perdidas em média: blue=5.82, red=5.57

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.07 | 0.0 | 0.01 | 0.13 | 50.0 | 1.06 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.72 | — | — |
| BLUE-AERO-CF | blue | land | 98.7 | 0.0 | 0.37 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 99.3 | 0.0 | 0.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 92.0 | 0.09 | 1.05 | 0.03 | 0.19 | 42.9 | 2.71 | 77.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.09 | 0.0 | 0.02 | 0.13 | 45.0 | 7.13 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.03 | 0.09 | 35.7 | 7.02 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 5.43 | 0.0 | 0.71 | 2.19 | 59.8 | 5.27 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.77 | 0.0 | 0.43 | 1.51 | 62.4 | 5.33 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.3 | 0.2 | 0.01 | 0.04 | 0.14 | 66.7 | 0.35 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.01 | 0.0 | 0.01 | 0.0 | 0.7 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 62.0 | 0.0 | 3.31 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 70.7 | 0.0 | 2.73 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 73.3 | 0.0 | 2.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 72.0 | 0.0 | 2.85 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.7 | 0.0 | 1.1 | 0.0 | 0.0 | — | 3.45 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 64.7 | 0.0 | 1.86 | 0.0 | 0.0 | — | 2.56 | 99.4 | — |
| BLUE-MPRA-1 | blue | air | 93.3 | 0.21 | 0.23 | 0.07 | 0.29 | 34.9 | 3.0 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 91.3 | 0.24 | 0.37 | 0.05 | 0.27 | 37.5 | 2.96 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 82.0 | 0.1 | 0.77 | 0.01 | 0.05 | 87.5 | 3.23 | 85.2 | 96.0 |
| BLUE-PAT-C2 | blue | surface | 70.7 | 0.29 | 1.15 | 0.01 | 0.22 | 72.7 | 2.83 | 82.9 | 88.0 |
| BLUE-PAT-O1 | blue | surface | 62.7 | 4.03 | 2.41 | 0.43 | 3.85 | 41.9 | 2.18 | 87.5 | 91.7 |
| BLUE-PAT-O2 | blue | surface | 82.7 | 2.81 | 1.03 | 0.55 | 2.29 | 51.5 | 3.7 | 33.9 | 83.7 |
| BLUE-PORTO-ACU | blue | land | 86.7 | 0.0 | 3.7 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 23.3 | 0.0 | 17.3 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 99.3 | 0.0 | 1.8 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 54.7 | 0.0 | 10.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 80.0 | 2.38 | 1.15 | 0.36 | 2.27 | 44.9 | 2.33 | 88.7 | 97.8 |
| BLUE-SAG-S1 | blue | surface | 70.0 | 2.5 | 4.42 | 0.33 | 2.63 | 42.9 | 2.18 | 35.4 | 98.6 |
| BLUE-SAG-S2 | blue | surface | 88.7 | 3.19 | 1.67 | 0.63 | 3.03 | 45.1 | 3.27 | 32.1 | 99.6 |
| BLUE-SUB-1 | blue | submarine | 74.7 | 3.89 | 0.89 | 0.55 | 2.73 | 63.9 | 3.11 | 80.2 | 73.6 |
| BLUE-SUB-2 | blue | submarine | 88.7 | 2.25 | 0.47 | 0.57 | 2.17 | 50.3 | 3.87 | 31.4 | 92.8 |
| BLUE-SUB-3 | blue | submarine | 92.7 | 0.87 | 0.24 | 0.14 | 0.65 | 61.2 | 3.4 | 84.3 | 91.9 |
| BLUE-SUB-N | blue | submarine | 62.0 | 6.24 | 1.71 | 0.62 | 3.92 | 58.5 | 1.79 | — | 77.9 |
| RED-AKE | red | surface | 56.0 | 0.0 | 3.55 | 0.0 | 0.0 | — | 7.45 | 97.8 | — |
| RED-AOR-G | red | surface | 56.7 | 0.0 | 2.16 | 0.0 | 0.0 | — | 4.27 | 99.1 | — |
| RED-AWACS-K | red | air | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 5.97 | — | — |
| RED-GANF | red | surface | 98.7 | 0.0 | 0.82 | 0.0 | 0.0 | — | 0.0 | 60.8 | — |
| RED-GBPA | red | surface | 97.3 | 1.14 | 0.41 | 0.19 | 0.97 | 52.7 | 0.0 | — | 97.5 |
| RED-GE-1 | red | surface | 67.3 | 19.48 | 5.68 | 1.38 | 12.41 | 66.6 | 2.63 | 82.2 | 73.4 |
| RED-GE-2 | red | surface | 53.3 | 13.23 | 6.08 | 0.9 | 7.96 | 65.2 | 2.29 | 82.7 | 70.6 |
| RED-GE-3 | red | surface | 63.3 | 1.86 | 4.47 | 0.27 | 1.48 | 64.4 | 2.19 | 76.2 | 80.3 |
| RED-GLOG | red | surface | 60.0 | 0.0 | 3.31 | 0.0 | 0.0 | — | 7.47 | 99.2 | — |
| RED-KMF-1 | red | air | 97.3 | 1.05 | 0.09 | 0.22 | 0.98 | 44.2 | 6.09 | — | — |
| RED-KMF-2 | red | air | 96.7 | 0.66 | 0.09 | 0.11 | 0.73 | 35.8 | 6.11 | — | — |
| RED-KS-1 | red | submarine | 26.7 | 7.43 | 2.28 | 0.69 | 3.4 | 64.1 | 2.26 | 60.3 | 50.1 |
| RED-KSN | red | submarine | 36.7 | 13.85 | 2.9 | 1.07 | 8.57 | 65.2 | 2.39 | — | 67.7 |
| RED-MPRA-K1 | red | air | 59.3 | 4.43 | 1.21 | 0.6 | 1.85 | 61.7 | 1.53 | — | 100.0 |
| RED-MPRA-K2 | red | air | 64.7 | 2.75 | 1.21 | 0.39 | 1.38 | 52.2 | 2.21 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 97.3 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 4.42 | 0.0 | 0.02 | 66.7 | 0.0 | — | 99.3 |

### Somente vitória decisiva

- Partidas: **64**
- Taxa de vitória: blue=53.1%, red=46.9%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.28 turnos
- Dano médio causado por equipe (pontos de HP): blue=49.16, red=75.33
- Unidades perdidas em média: blue=7.0, red=7.12

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 100.0 | 0.02 | 0.0 | 0.02 | 0.02 | 100.0 | 1.69 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.14 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 98.4 | 0.0 | 0.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 93.8 | 0.14 | 0.91 | 0.05 | 0.31 | 40.0 | 3.59 | 76.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.08 | 0.0 | 0.03 | 0.12 | 37.5 | 8.12 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.06 | 0.0 | 7.75 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 6.45 | 0.0 | 0.88 | 2.64 | 58.6 | 4.98 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 3.95 | 0.0 | 0.55 | 1.8 | 61.7 | 4.97 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.11 | 0.0 | 0.03 | 0.08 | 40.0 | 0.56 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 1.12 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 45.3 | 0.0 | 4.75 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 56.2 | 0.0 | 3.92 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 53.1 | 0.0 | 4.16 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 54.7 | 0.0 | 4.2 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 81.2 | 0.0 | 1.25 | 0.0 | 0.0 | — | 4.98 | 99.4 | — |
| BLUE-LOG-T | blue | surface | 54.7 | 0.0 | 2.33 | 0.0 | 0.0 | — | 4.03 | 99.3 | — |
| BLUE-MPRA-1 | blue | air | 89.1 | 0.47 | 0.34 | 0.16 | 0.48 | 41.9 | 2.45 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 85.9 | 0.34 | 0.7 | 0.06 | 0.44 | 39.3 | 2.41 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 81.2 | 0.23 | 0.75 | 0.02 | 0.12 | 87.5 | 4.81 | 83.9 | 90.6 |
| BLUE-PAT-C2 | blue | surface | 60.9 | 0.17 | 1.45 | 0.0 | 0.17 | 72.7 | 3.95 | 79.2 | 87.5 |
| BLUE-PAT-O1 | blue | surface | 51.6 | 5.86 | 3.38 | 0.62 | 5.69 | 41.5 | 2.66 | 84.5 | 84.4 |
| BLUE-PAT-O2 | blue | surface | 84.4 | 3.17 | 0.89 | 0.59 | 3.06 | 48.0 | 4.64 | 55.8 | 87.5 |
| BLUE-PORTO-ACU | blue | land | 90.6 | 0.0 | 2.8 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 17.2 | 0.0 | 19.06 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 98.4 | 0.0 | 2.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 57.8 | 0.0 | 10.69 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 70.3 | 3.56 | 1.81 | 0.59 | 3.39 | 48.4 | 3.34 | 87.6 | 95.7 |
| BLUE-SAG-S1 | blue | surface | 70.3 | 3.97 | 4.67 | 0.59 | 4.25 | 43.8 | 3.52 | 47.7 | 97.6 |
| BLUE-SAG-S2 | blue | surface | 93.8 | 4.41 | 1.2 | 0.78 | 4.36 | 42.7 | 5.16 | 46.6 | 99.2 |
| BLUE-SUB-1 | blue | submarine | 68.8 | 5.38 | 0.94 | 0.75 | 3.86 | 63.6 | 4.33 | 85.2 | 62.5 |
| BLUE-SUB-2 | blue | submarine | 85.9 | 1.88 | 0.56 | 0.42 | 1.88 | 48.3 | 4.86 | 59.2 | 91.4 |
| BLUE-SUB-3 | blue | submarine | 87.5 | 1.5 | 0.34 | 0.27 | 1.06 | 63.2 | 4.45 | 87.2 | 86.7 |
| BLUE-SUB-N | blue | submarine | 68.8 | 7.47 | 1.55 | 0.72 | 4.55 | 58.8 | 2.7 | — | 73.0 |
| RED-AKE | red | surface | 45.3 | 0.0 | 4.31 | 0.0 | 0.0 | — | 7.95 | 97.9 | — |
| RED-AOR-G | red | surface | 25.0 | 0.0 | 3.64 | 0.0 | 0.0 | — | 4.75 | 98.4 | — |
| RED-AWACS-K | red | air | 93.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 10.11 | — | — |
| RED-GANF | red | surface | 96.9 | 0.0 | 1.2 | 0.0 | 0.0 | — | 0.0 | 63.8 | — |
| RED-GBPA | red | surface | 93.8 | 1.58 | 0.86 | 0.27 | 1.38 | 52.3 | 0.0 | — | 96.9 |
| RED-GE-1 | red | surface | 76.6 | 20.8 | 5.33 | 1.38 | 13.0 | 67.3 | 2.64 | 73.5 | 72.0 |
| RED-GE-2 | red | surface | 54.7 | 16.17 | 6.12 | 1.2 | 9.03 | 66.8 | 1.81 | 81.7 | 64.9 |
| RED-GE-3 | red | surface | 26.6 | 3.72 | 9.03 | 0.53 | 2.95 | 64.6 | 4.0 | 62.6 | 60.4 |
| RED-GLOG | red | surface | 48.4 | 0.0 | 4.25 | 0.0 | 0.0 | — | 8.31 | 99.3 | — |
| RED-KMF-1 | red | air | 93.8 | 2.02 | 0.06 | 0.42 | 1.62 | 47.1 | 10.28 | — | — |
| RED-KMF-2 | red | air | 93.8 | 1.12 | 0.05 | 0.17 | 1.2 | 33.8 | 10.31 | — | — |
| RED-KS-1 | red | submarine | 29.7 | 9.56 | 2.16 | 0.97 | 3.7 | 71.7 | 2.86 | 62.6 | 45.0 |
| RED-KSN | red | submarine | 21.9 | 14.03 | 3.55 | 1.11 | 8.28 | 65.5 | 2.81 | — | 66.4 |
| RED-MPRA-K1 | red | air | 26.6 | 3.8 | 2.06 | 0.59 | 1.84 | 59.3 | 2.95 | — | 100.0 |
| RED-MPRA-K2 | red | air | 35.9 | 2.53 | 1.97 | 0.36 | 1.27 | 55.6 | 3.88 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 93.8 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.56 | 0.0 | 0.02 | 0.0 | 0.0 | — | 99.5 |
