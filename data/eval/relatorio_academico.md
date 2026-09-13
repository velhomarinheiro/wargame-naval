# Relatório Estatístico e Descritivo — Simulações Operação Atlântico Sul

_Gerado em 2026-09-13_

## 1. Metodologia

As simulações ocorrem em um grid hexagonal *offset* (`odd-q`, topo-plano) de 16×10 células, com unidades organizadas em ordem de batalha (OOB) por equipe (azul/vermelho), categorizadas em superfície, submarino, aéreo e terrestre. O motor de jogo modela: (a) deslocamento via BFS limitado por alcance de movimento e por categoria de terreno navegável; (b) combustível por categoria (naval/aéreo), com recompletamento por adjacência a provedores (navio-tanque, logístico ou porto, conforme equipe); (c) combate por arma com alcance e salvo (`SALVO_SIZE`) próprios, com prioridade de arma por categoria de alvo; (d) condição de vitória por objetivos de cenário (não por aniquilação total) — a equipe azul vence atingindo ≥3 de 5 critérios (porta-aviões inimigo afundado, ≥2 navios logísticos afundados, navio anfíbio afundado, submarino nuclear afundado, ou ≥50% de degradação da força de superfície vermelha); a equipe vermelha vence atingindo os 2 critérios (≥3 FPSOs afundados e ≥40% de degradação dos portos azuis). Quando nenhum critério é atingido até o turno limite (18), o resultado é decidido por **timeout**, atribuindo a vitória à equipe com maior soma total de pontos de vida remanescentes — critério distinto e bem mais permissivo do que a vitória por objetivo (**vitória decisiva**).

### Fatores de doutrina heurística adicionados

Cinco eixos de decisão independentes, sorteados aleatoriamente por equipe e
por partida (`random_doctrine()` em `ml/simulate_games.py`), modulam as
heurísticas de movimentação e combate usadas para gerar dados de treino:

1. **Formação — concentrada vs. dividida** (`formation`): no modo
   concentrado, as unidades de superfície convergem para o alvo de maior
   valor inimigo (empilhamento de poder de fogo); no modo dividido, os
   alvos são distribuídos em round-robin entre as unidades, vetorando-as
   para alvos distintos.
2. **Postura — ofensiva vs. defensiva** (`posture`): a postura ofensiva
   reduz a distância de standoff ideal (`ideal_range - 1`) e o ruído de
   decisão (multiplicador 0.6), favorecendo aproximação e engajamento
   rápido; a postura defensiva aumenta o standoff (`ideal_range + 1`) e o
   ruído (multiplicador 1.3), favorecendo cautela e dispersão de risco.
3. **Engajamento — simultâneo vs. sequencial** (`engagement`): no modo
   simultâneo, o motor busca um alvo único alcançável por ≥2 categorias de
   unidades (ex.: superfície + aéreo) e concentra fogo coordenado nesse
   alvo na mesma fase; no modo sequencial, os engajamentos progridem
   unidade a unidade, sem essa coordenação.
4. **Economia de munição**: o tamanho do salvo (`_salvo_size`) é limitado a
   uma fração do estoque inicial (até a 30%) enquanto a unidade está fora
   de alcance de recompletamento; perto de portos/bases (equipe azul) ou
   para unidades terrestres/aéreas, após o turno 3, o limite é relaxado
   para o salvo completo — refletindo a possibilidade real de
   reabastecimento.
5. **Economia de combustível** (`fuel_policy`): três políticas —
   *economize* (reduz o orçamento de movimento naval em 40% quando o
   tanque não está confortável), *escort* (desloca-se em direção ao navio
   reabastecedor — tanque/logístico — mais próximo quando o combustível
   cai abaixo de 70%) e *anchor* (equipe azul se aproxima do porto mais
   próximo sob a mesma condição). Essas políticas só atuam quando o tanque
   já não está confortável (<70%), para não desviar unidades com
   combustível pleno de sua missão tática.

### Conjuntos de dados

- **Conjunto 1 — Self-play da rede neural treinada** (400 partidas): réplica fiel da lógica decisória de produção (`bot.js`) — tensor de estado de 9 canais, ranking de células por logit das redes `move_net.onnx`/`attack_net.onnx`, emergência de combustível abaixo de 35%, sem doutrina heurística (a rede decide sozinha, fruto do aprendizado por imitação sobre os dados heurísticos).
- **Conjunto 2 — Self-play do motor heurístico de doutrina** (400 partidas): estratégias base (`aggressive`/`defensive`/`flanking`) e os 5 fatores de doutrina sorteados aleatoriamente e de forma independente para cada equipe a cada partida — mesmo gerador usado para produzir os dados de treino da rede.

## 2. Conjunto 1 — Self-play da rede neural treinada

### Geral (todas as partidas)

- Partidas: **400**
- Taxa de vitória: blue=81.8%, red=18.2%
- Motivo de conclusão: timeout=80.0%, victory=20.0%
- Duração média: 16.76 turnos
- Dano médio causado por equipe (pontos de HP): blue=18.0, red=74.22
- Unidades perdidas em média: blue=9.75, red=4.12

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 29.2 | 0.01 | 2.56 | 0.0 | 0.09 | 8.8 | 10.52 | — | — |
| BLUE-ADA-2 | blue | land | 99.8 | 0.03 | 0.01 | 0.0 | 0.12 | 20.4 | 25.91 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 86.2 | 1.13 | 1.84 | 0.34 | 3.54 | 23.1 | 29.73 | 83.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.32 | 0.0 | 0.07 | 0.48 | 44.6 | 33.43 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.25 | 0.01 | 0.1 | 0.41 | 43.8 | 33.43 | — | — |
| BLUE-CJAT-1 | blue | air | 99.5 | 0.23 | 0.03 | 0.07 | 0.25 | 44.0 | 33.41 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 96.2 | 0.15 | 0.16 | 0.04 | 0.17 | 39.1 | 33.03 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 52.5 | 0.16 | 1.81 | 0.02 | 0.2 | 60.8 | 14.03 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.8 | 0.85 | 0.01 | 0.34 | 0.67 | 69.3 | 25.91 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 7.8 | 0.0 | 7.17 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 63.0 | 0.0 | 3.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 61.5 | 0.0 | 3.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 38.0 | 0.0 | 5.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 71.0 | 0.0 | 1.42 | 0.0 | 0.0 | — | 28.34 | 99.2 | — |
| BLUE-LOG-T | blue | surface | 40.5 | 0.0 | 2.83 | 0.0 | 0.0 | — | 19.29 | 99.8 | — |
| BLUE-MPRA-1 | blue | air | 83.2 | 0.8 | 0.51 | 0.14 | 0.64 | 56.9 | 30.76 | — | 99.5 |
| BLUE-MPRA-2 | blue | air | 63.0 | 0.28 | 1.27 | 0.06 | 0.32 | 46.5 | 24.57 | — | 99.2 |
| BLUE-PAT-C1 | blue | surface | 62.0 | 0.15 | 1.5 | 0.02 | 0.15 | 62.9 | 26.35 | 74.6 | 93.0 |
| BLUE-PAT-C2 | blue | surface | 47.5 | 0.08 | 2.15 | 0.01 | 0.11 | 60.0 | 23.77 | 78.1 | 94.8 |
| BLUE-PAT-O1 | blue | surface | 74.2 | 0.84 | 1.58 | 0.21 | 1.18 | 47.8 | 27.42 | 86.0 | 88.1 |
| BLUE-PAT-O2 | blue | surface | 68.8 | 0.59 | 1.8 | 0.15 | 0.98 | 41.8 | 27.79 | 84.0 | 89.9 |
| BLUE-PORTO-ACU | blue | land | 81.5 | 0.0 | 5.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 99.5 | 0.0 | 1.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.05 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 2.5 | 0.0 | 17.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 89.0 | 3.77 | 0.61 | 0.56 | 4.51 | 53.4 | 30.12 | 83.4 | 89.5 |
| BLUE-SAG-S1 | blue | surface | 90.5 | 2.04 | 1.29 | 0.5 | 2.59 | 52.6 | 31.11 | 80.8 | 94.9 |
| BLUE-SAG-S2 | blue | surface | 76.2 | 1.4 | 3.63 | 0.39 | 1.98 | 45.9 | 28.45 | 80.7 | 97.1 |
| BLUE-SUB-1 | blue | submarine | 32.5 | 0.96 | 2.21 | 0.16 | 0.85 | 65.9 | 16.59 | 98.8 | 89.9 |
| BLUE-SUB-2 | blue | submarine | 75.0 | 0.52 | 0.92 | 0.12 | 0.51 | 59.8 | 29.1 | 91.0 | 94.8 |
| BLUE-SUB-3 | blue | submarine | 67.5 | 0.38 | 1.03 | 0.07 | 0.32 | 59.1 | 28.1 | 91.3 | 96.8 |
| BLUE-SUB-N | blue | submarine | 66.8 | 3.06 | 1.53 | 0.72 | 2.28 | 45.8 | 26.91 | — | 91.4 |
| RED-AKE | red | surface | 64.0 | 0.0 | 2.73 | 0.0 | 0.0 | — | 28.29 | 99.8 | — |
| RED-AOR-G | red | surface | 88.5 | 0.0 | 0.51 | 0.0 | 0.0 | — | 32.06 | 99.7 | — |
| RED-AWACS-K | red | air | 53.0 | 0.0 | 1.19 | 0.0 | 0.0 | — | 25.26 | — | — |
| RED-GANF | red | surface | 95.0 | 0.27 | 1.29 | 0.08 | 1.19 | 22.9 | 32.05 | 85.8 | — |
| RED-GBPA | red | surface | 99.8 | 6.08 | 0.03 | 0.89 | 6.75 | 48.5 | 33.43 | — | 73.1 |
| RED-GE-1 | red | surface | 99.8 | 22.87 | 0.06 | 2.94 | 17.24 | 49.1 | 32.5 | 85.0 | 68.4 |
| RED-GE-2 | red | surface | 99.5 | 17.28 | 0.12 | 2.29 | 14.29 | 46.4 | 32.49 | 85.2 | 59.0 |
| RED-GE-3 | red | surface | 97.5 | 1.22 | 0.47 | 0.29 | 1.69 | 47.4 | 32.06 | 83.5 | 91.7 |
| RED-GLOG | red | surface | 82.0 | 0.0 | 1.44 | 0.0 | 0.0 | — | 31.38 | 100.0 | — |
| RED-KMF-1 | red | air | 99.8 | 1.77 | 0.02 | 0.3 | 2.28 | 41.8 | 33.43 | — | — |
| RED-KMF-2 | red | air | 99.2 | 1.65 | 0.42 | 0.43 | 1.93 | 43.5 | 33.38 | — | — |
| RED-KS-1 | red | submarine | 34.8 | 7.34 | 2.09 | 0.77 | 4.22 | 54.9 | 12.54 | 41.8 | 57.9 |
| RED-KSN | red | submarine | 92.2 | 12.28 | 0.41 | 1.21 | 11.41 | 45.7 | 32.55 | — | 70.0 |
| RED-MPRA-K1 | red | air | 90.0 | 1.99 | 0.23 | 0.32 | 1.39 | 45.4 | 32.68 | — | 100.0 |
| RED-MPRA-K2 | red | air | 76.0 | 1.25 | 0.65 | 0.21 | 0.89 | 44.6 | 30.55 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 14.0 | 0.01 | 2.65 | 0.0 | 0.0 | 100.0 | 0.0 | — | 99.9 |
| RED-OPSESP-2 | red | surface | 2.8 | 0.22 | 3.69 | 0.03 | 0.2 | 59.0 | 0.0 | — | 93.5 |

### Somente vitória decisiva

- Partidas: **80**
- Taxa de vitória: red=91.2%, blue=8.8%
- Motivo de conclusão: victory=100.0%
- Duração média: 11.81 turnos
- Dano médio causado por equipe (pontos de HP): blue=24.21, red=81.11
- Unidades perdidas em média: blue=10.14, red=4.95

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 23.8 | 0.01 | 2.83 | 0.0 | 0.05 | 25.0 | 7.11 | — | — |
| BLUE-ADA-2 | blue | land | 98.8 | 0.1 | 0.04 | 0.01 | 0.24 | 42.1 | 19.46 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.5 | 1.24 | 0.64 | 0.3 | 4.34 | 18.7 | 21.56 | 91.2 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.54 | 0.0 | 0.1 | 0.88 | 41.4 | 23.16 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.53 | 0.03 | 0.25 | 0.76 | 47.5 | 23.16 | — | — |
| BLUE-CJAT-1 | blue | air | 98.8 | 0.45 | 0.05 | 0.15 | 0.45 | 50.0 | 23.14 | — | 99.8 |
| BLUE-CJAT-2 | blue | air | 90.0 | 0.21 | 0.41 | 0.07 | 0.28 | 40.9 | 22.62 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 42.5 | 0.23 | 2.16 | 0.01 | 0.3 | 54.2 | 9.6 | — | 99.9 |
| BLUE-DCOST2 | blue | land | 98.8 | 1.11 | 0.03 | 0.41 | 0.85 | 67.6 | 19.46 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 0.0 | 0.0 | 7.49 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 11.2 | 0.0 | 6.47 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 38.8 | 0.0 | 4.78 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 36.2 | 0.0 | 5.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 82.5 | 0.0 | 0.95 | 0.0 | 0.0 | — | 20.75 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 43.8 | 0.0 | 2.51 | 0.0 | 0.0 | — | 13.14 | 99.9 | — |
| BLUE-MPRA-1 | blue | air | 77.5 | 0.93 | 0.68 | 0.17 | 0.86 | 49.3 | 21.18 | — | 98.7 |
| BLUE-MPRA-2 | blue | air | 55.0 | 0.21 | 1.31 | 0.04 | 0.42 | 32.4 | 15.8 | — | 98.7 |
| BLUE-PAT-C1 | blue | surface | 72.5 | 0.31 | 1.21 | 0.0 | 0.33 | 65.4 | 20.24 | 80.6 | 84.4 |
| BLUE-PAT-C2 | blue | surface | 58.8 | 0.2 | 1.7 | 0.03 | 0.24 | 57.9 | 18.49 | 84.8 | 88.1 |
| BLUE-PAT-O1 | blue | surface | 88.8 | 1.15 | 0.74 | 0.31 | 1.64 | 48.9 | 20.49 | 84.0 | 77.2 |
| BLUE-PAT-O2 | blue | surface | 81.2 | 0.85 | 1.06 | 0.17 | 1.35 | 41.7 | 21.01 | 83.4 | 81.6 |
| BLUE-PORTO-ACU | blue | land | 60.0 | 0.0 | 8.1 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 97.5 | 0.0 | 5.74 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.14 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 0.0 | 0.0 | 17.25 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 92.5 | 4.46 | 0.38 | 0.59 | 5.46 | 56.1 | 20.95 | 86.0 | 82.2 |
| BLUE-SAG-S1 | blue | surface | 91.2 | 2.44 | 1.1 | 0.53 | 3.27 | 52.7 | 22.04 | 82.9 | 90.6 |
| BLUE-SAG-S2 | blue | surface | 80.0 | 1.98 | 2.91 | 0.4 | 2.48 | 46.0 | 20.54 | 85.7 | 94.7 |
| BLUE-SUB-1 | blue | submarine | 28.8 | 1.23 | 2.35 | 0.23 | 1.02 | 69.5 | 10.88 | 99.6 | 88.0 |
| BLUE-SUB-2 | blue | submarine | 83.8 | 1.11 | 0.46 | 0.19 | 1.07 | 58.1 | 21.76 | 94.8 | 88.9 |
| BLUE-SUB-3 | blue | submarine | 76.2 | 0.81 | 0.85 | 0.12 | 0.71 | 61.4 | 21.04 | 93.5 | 92.8 |
| BLUE-SUB-N | blue | submarine | 80.0 | 4.12 | 1.05 | 0.86 | 3.21 | 46.7 | 20.48 | — | 88.3 |
| RED-AKE | red | surface | 45.0 | 0.0 | 3.92 | 0.0 | 0.0 | — | 19.32 | 100.0 | — |
| RED-AOR-G | red | surface | 86.2 | 0.0 | 0.56 | 0.0 | 0.0 | — | 22.71 | 99.7 | — |
| RED-AWACS-K | red | air | 42.5 | 0.0 | 1.44 | 0.0 | 0.0 | — | 17.31 | — | — |
| RED-GANF | red | surface | 88.8 | 0.34 | 2.79 | 0.07 | 1.57 | 21.4 | 22.55 | 79.6 | — |
| RED-GBPA | red | surface | 98.8 | 6.96 | 0.12 | 0.91 | 7.12 | 49.5 | 23.16 | — | 71.7 |
| RED-GE-1 | red | surface | 100.0 | 25.8 | 0.12 | 2.98 | 16.44 | 55.1 | 22.85 | 77.6 | 69.1 |
| RED-GE-2 | red | surface | 98.8 | 18.59 | 0.28 | 2.27 | 13.43 | 52.4 | 22.81 | 78.9 | 59.6 |
| RED-GE-3 | red | surface | 95.0 | 1.54 | 0.96 | 0.39 | 2.23 | 51.7 | 22.61 | 75.8 | 91.1 |
| RED-GLOG | red | surface | 68.8 | 0.0 | 2.64 | 0.0 | 0.0 | — | 21.76 | 99.9 | — |
| RED-KMF-1 | red | air | 98.8 | 1.77 | 0.03 | 0.39 | 2.58 | 38.8 | 23.16 | — | — |
| RED-KMF-2 | red | air | 98.8 | 1.77 | 0.36 | 0.51 | 2.15 | 42.4 | 23.16 | — | — |
| RED-KS-1 | red | submarine | 36.2 | 6.61 | 2.11 | 0.65 | 3.77 | 53.3 | 11.9 | 47.6 | 62.4 |
| RED-KSN | red | submarine | 81.2 | 13.84 | 0.96 | 1.3 | 11.55 | 47.2 | 22.54 | — | 69.9 |
| RED-MPRA-K1 | red | air | 83.8 | 2.51 | 0.39 | 0.42 | 1.55 | 46.8 | 22.65 | — | 100.0 |
| RED-MPRA-K2 | red | air | 70.0 | 1.18 | 0.94 | 0.2 | 0.88 | 34.3 | 21.2 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 6.2 | 0.0 | 3.0 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 3.8 | 0.2 | 3.59 | 0.04 | 0.1 | 75.0 | 0.0 | — | 96.7 |

## 3. Conjunto 2 — Self-play do motor heurístico de doutrina

### Geral (todas as partidas)

- Partidas: **400**
- Taxa de vitória: red=22.2%, blue=77.8%
- Motivo de conclusão: victory=46.0%, timeout=54.0%
- Duração média: 12.91 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=49.12, red=30.96
- Unidades perdidas em média: blue=4.58, red=6.14

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 194 | 75.3 |
| blue | formation | dispersed | 206 | 80.1 |
| blue | posture | defensive | 199 | 72.4 |
| blue | posture | offensive | 201 | 83.1 |
| blue | engagement | sequential | 195 | 75.4 |
| blue | engagement | simultaneous | 205 | 80.0 |
| blue | fuel_policy | anchor | 144 | 79.9 |
| blue | fuel_policy | economize | 112 | 77.7 |
| blue | fuel_policy | escort | 144 | 75.7 |
| red | formation | concentrated | 211 | 22.3 |
| red | formation | dispersed | 189 | 22.2 |
| red | posture | defensive | 180 | 22.8 |
| red | posture | offensive | 220 | 21.8 |
| red | engagement | sequential | 194 | 21.6 |
| red | engagement | simultaneous | 206 | 22.8 |
| red | fuel_policy | anchor | 147 | 22.4 |
| red | fuel_policy | economize | 141 | 17.0 |
| red | fuel_policy | escort | 112 | 28.6 |

### Somente vitória decisiva

- Partidas: **184**
- Taxa de vitória: red=48.4%, blue=51.6%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.93 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=58.18, red=42.67
- Unidades perdidas em média: blue=5.82, red=8.34

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 87 | 44.8 |
| blue | formation | dispersed | 97 | 57.7 |
| blue | posture | defensive | 81 | 32.1 |
| blue | posture | offensive | 103 | 67.0 |
| blue | engagement | sequential | 93 | 48.4 |
| blue | engagement | simultaneous | 91 | 54.9 |
| blue | fuel_policy | anchor | 67 | 56.7 |
| blue | fuel_policy | economize | 50 | 50.0 |
| blue | fuel_policy | escort | 67 | 47.8 |
| red | formation | concentrated | 96 | 49.0 |
| red | formation | dispersed | 88 | 47.7 |
| red | posture | defensive | 83 | 49.4 |
| red | posture | offensive | 101 | 47.5 |
| red | engagement | sequential | 88 | 47.7 |
| red | engagement | simultaneous | 96 | 49.0 |
| red | fuel_policy | anchor | 71 | 46.5 |
| red | fuel_policy | economize | 58 | 41.4 |
| red | fuel_policy | escort | 55 | 58.2 |

## 4. Discussão e ressalvas metodológicas

- **Achado principal:** no Conjunto 1 (rede neural), a taxa geral de vitória de Blue (81.8%) se inverte quase completamente quando o critério é restrito à vitória decisiva — Red vence 91.2% das partidas concluídas por objetivo de cenário. Isso indica que, em termos puramente táticos (não contaminados pelo desempate de timeout), a política aprendida pela rede para a equipe vermelha é substancialmente mais eficaz do que a da equipe azul.

- A vitória por **timeout** é decidida por soma agregada de HP, o que favorece estruturalmente a equipe azul: sua OOB inclui numerosos ativos terrestres estáticos (bases aéreas, portos, baterias) que raramente são atingidos e mantêm HP pleno, inflando o total independentemente do desempenho tático. Por isso, os subconjuntos de **vitória decisiva** (concluídos por critério de objetivo, não por esse desempate) são a referência mais fiel para avaliar efetividade tática real.
- O conjunto 1 (rede neural) usa a OOB de treino (`sim.OOB`, incluindo unidades Op.Esp. e bases sintéticas usadas só para geração de dados), não a OOB do jogo em produção (`shared/order_of_battle.js`), garantindo consistência com a distribuição em que as redes foram treinadas.
- Os dois conjuntos não são diretamente comparáveis em força tática absoluta: o conjunto 1 reflete o comportamento aprendido pela rede (sujeito à qualidade dos dados de treino e à capacidade do modelo), enquanto o conjunto 2 reflete heurísticas determinísticas com diversidade de doutrina — a comparação relevante é estrutural (quais fatores deslocam taxas de vitória, duração e perdas), não de desempenho absoluto entre os dois motores.
