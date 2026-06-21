# Relatório Estatístico e Descritivo — Simulações Operação Atlântico Sul

_Gerado em 2026-06-21_

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
- Taxa de vitória: blue=90.2%, red=9.8%
- Motivo de conclusão: timeout=90.2%, victory=9.8%
- Duração média: 17.27 turnos
- Dano médio causado por equipe (pontos de HP): blue=13.6, red=59.95
- Unidades perdidas em média: blue=7.67, red=3.56

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 94.0 | 0.01 | 0.22 | 0.0 | 0.17 | 9.1 | 10.2 | — | — |
| BLUE-ADA-2 | blue | land | 99.8 | 0.0 | 0.02 | 0.0 | 0.01 | 0.0 | 33.34 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 98.0 | 1.07 | 0.43 | 0.33 | 2.32 | 26.4 | 33.16 | 97.6 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.07 | 21.4 | 34.49 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.06 | 45.8 | 34.49 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.04 | 22.2 | 34.49 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 0.01 | 0.0 | 0.01 | 0.04 | 28.6 | 34.49 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 99.0 | 0.02 | 0.04 | 0.0 | 0.03 | 38.5 | 10.44 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.23 | 0.0 | 0.12 | 0.25 | 59.6 | 33.4 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 55.2 | 0.0 | 3.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 81.5 | 0.0 | 1.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 57.8 | 0.0 | 3.98 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 68.8 | 0.0 | 3.61 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 84.8 | 0.0 | 0.71 | 0.0 | 0.0 | — | 32.79 | 99.6 | — |
| BLUE-LOG-T | blue | surface | 24.8 | 0.0 | 3.5 | 0.0 | 0.0 | — | 18.45 | 98.7 | — |
| BLUE-MPRA-1 | blue | air | 97.5 | 1.09 | 0.07 | 0.28 | 0.83 | 50.3 | 34.19 | — | 99.9 |
| BLUE-MPRA-2 | blue | air | 94.5 | 0.68 | 0.28 | 0.19 | 0.51 | 53.2 | 33.49 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 48.0 | 0.08 | 2.01 | 0.01 | 0.09 | 62.2 | 13.71 | 59.7 | 95.5 |
| BLUE-PAT-C2 | blue | surface | 40.5 | 0.08 | 2.43 | 0.01 | 0.09 | 73.0 | 21.09 | 85.5 | 95.8 |
| BLUE-PAT-O1 | blue | surface | 73.8 | 0.39 | 1.37 | 0.17 | 0.87 | 39.9 | 30.26 | 86.3 | 94.5 |
| BLUE-PAT-O2 | blue | surface | 66.5 | 0.34 | 1.87 | 0.15 | 0.64 | 42.7 | 29.03 | 85.3 | 96.4 |
| BLUE-PORTO-ACU | blue | land | 99.5 | 0.0 | 0.83 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 98.2 | 0.0 | 4.08 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 31.5 | 0.0 | 14.27 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 79.0 | 4.16 | 1.25 | 0.8 | 4.98 | 53.1 | 29.74 | 83.3 | 88.6 |
| BLUE-SAG-S1 | blue | surface | 80.5 | 1.11 | 2.37 | 0.36 | 1.84 | 44.8 | 30.57 | 73.5 | 97.1 |
| BLUE-SAG-S2 | blue | surface | 70.8 | 0.66 | 3.92 | 0.26 | 1.28 | 41.2 | 28.89 | 75.0 | 98.7 |
| BLUE-SUB-1 | blue | submarine | 6.0 | 0.53 | 3.05 | 0.08 | 0.44 | 69.9 | 9.31 | 95.3 | 94.8 |
| BLUE-SUB-2 | blue | submarine | 80.8 | 0.11 | 0.65 | 0.03 | 0.14 | 43.9 | 31.08 | 98.9 | 98.8 |
| BLUE-SUB-3 | blue | submarine | 47.8 | 0.1 | 1.67 | 0.04 | 0.13 | 63.5 | 22.7 | 98.4 | 98.8 |
| BLUE-SUB-N | blue | submarine | 55.2 | 2.85 | 1.92 | 0.7 | 2.13 | 43.0 | 26.05 | — | 92.1 |
| RED-AKE | red | surface | 84.8 | 0.0 | 1.39 | 0.0 | 0.0 | — | 30.94 | 100.0 | — |
| RED-AOR-G | red | surface | 98.2 | 0.0 | 0.07 | 0.0 | 0.0 | — | 34.28 | 100.0 | — |
| RED-AWACS-K | red | air | 65.2 | 0.0 | 0.84 | 0.0 | 0.0 | — | 27.96 | — | — |
| RED-GANF | red | surface | 99.5 | 0.18 | 0.38 | 0.05 | 0.65 | 28.0 | 34.32 | 97.4 | — |
| RED-GBPA | red | surface | 100.0 | 5.81 | 0.0 | 1.0 | 5.81 | 50.6 | 33.49 | — | 78.1 |
| RED-GE-1 | red | surface | 100.0 | 15.62 | 0.0 | 1.92 | 12.16 | 47.4 | 34.38 | 96.7 | 77.9 |
| RED-GE-2 | red | surface | 100.0 | 12.52 | 0.01 | 1.41 | 10.24 | 45.2 | 34.38 | 96.7 | 70.2 |
| RED-GE-3 | red | surface | 99.2 | 1.43 | 0.22 | 0.38 | 1.68 | 51.2 | 34.22 | 96.3 | 92.7 |
| RED-GLOG | red | surface | 96.8 | 0.0 | 0.27 | 0.0 | 0.0 | — | 32.96 | 100.0 | — |
| RED-KMF-1 | red | air | 100.0 | 1.13 | 0.0 | 0.19 | 1.12 | 42.0 | 34.49 | — | — |
| RED-KMF-2 | red | air | 100.0 | 0.91 | 0.2 | 0.2 | 0.92 | 39.4 | 34.49 | — | — |
| RED-KS-1 | red | submarine | 2.8 | 6.86 | 3.17 | 0.6 | 4.32 | 50.5 | 5.92 | 78.4 | 58.0 |
| RED-KSN | red | submarine | 95.5 | 8.81 | 0.25 | 0.62 | 6.68 | 57.0 | 33.76 | — | 78.7 |
| RED-MPRA-K1 | red | air | 91.8 | 3.83 | 0.19 | 0.65 | 2.95 | 48.2 | 33.52 | — | 100.0 |
| RED-MPRA-K2 | red | air | 80.5 | 2.6 | 0.47 | 0.61 | 2.12 | 48.2 | 31.34 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 29.2 | 0.04 | 2.25 | 0.01 | 0.02 | 62.5 | 0.0 | — | 99.3 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.21 | 3.88 | 0.03 | 0.13 | 70.6 | 0.0 | — | 95.7 |

### Somente vitória decisiva

- Partidas: **39**
- Taxa de vitória: red=100.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 10.49 turnos
- Dano médio causado por equipe (pontos de HP): blue=15.74, red=82.31
- Unidades perdidas em média: blue=9.67, red=3.85

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 94.9 | 0.03 | 0.26 | 0.0 | 0.26 | 10.0 | 8.38 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.03 | 0.0 | 19.46 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 1.05 | 0.05 | 0.31 | 2.49 | 24.7 | 19.56 | 100.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.03 | 0.0 | 0.0 | 0.18 | 14.3 | 20.56 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.1 | 0.0 | 0.03 | 0.18 | 57.1 | 20.56 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.1 | 0.0 | 0.05 | 0.15 | 33.3 | 20.56 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 0.0 | 0.03 | 0.0 | 0.1 | 0.0 | 20.56 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.03 | 0.0 | 0.0 | 0.03 | 100.0 | 8.41 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.28 | 0.0 | 0.1 | 0.38 | 53.3 | 19.46 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 2.6 | 0.0 | 7.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 33.3 | 0.0 | 5.41 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 23.1 | 0.0 | 5.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 20.5 | 0.0 | 5.9 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 89.7 | 0.0 | 0.46 | 0.0 | 0.0 | — | 19.82 | 99.9 | — |
| BLUE-LOG-T | blue | surface | 33.3 | 0.0 | 3.46 | 0.0 | 0.0 | — | 11.38 | 98.8 | — |
| BLUE-MPRA-1 | blue | air | 92.3 | 1.28 | 0.15 | 0.26 | 1.18 | 47.8 | 20.44 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 87.2 | 0.82 | 0.59 | 0.15 | 0.77 | 53.3 | 19.85 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 28.2 | 0.08 | 2.85 | 0.0 | 0.15 | 50.0 | 8.23 | 62.0 | 92.3 |
| BLUE-PAT-C2 | blue | surface | 43.6 | 0.15 | 1.85 | 0.0 | 0.28 | 54.5 | 13.77 | 85.9 | 89.7 |
| BLUE-PAT-O1 | blue | surface | 74.4 | 0.51 | 1.36 | 0.15 | 1.08 | 42.9 | 17.28 | 81.5 | 92.9 |
| BLUE-PAT-O2 | blue | surface | 69.2 | 0.54 | 1.74 | 0.23 | 0.85 | 45.5 | 16.72 | 81.3 | 94.9 |
| BLUE-PORTO-ACU | blue | land | 97.4 | 0.0 | 3.28 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 92.3 | 0.0 | 12.64 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.15 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 15.4 | 0.0 | 16.03 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.2 | 4.49 | 0.74 | 0.9 | 5.31 | 51.2 | 18.38 | 91.9 | 84.9 |
| BLUE-SAG-S1 | blue | surface | 84.6 | 1.33 | 2.03 | 0.41 | 1.92 | 46.7 | 16.77 | 73.8 | 96.6 |
| BLUE-SAG-S2 | blue | surface | 76.9 | 0.74 | 2.87 | 0.26 | 1.46 | 38.6 | 16.36 | 77.8 | 98.1 |
| BLUE-SUB-1 | blue | submarine | 2.6 | 0.92 | 3.03 | 0.13 | 0.67 | 61.5 | 8.05 | 95.0 | 92.9 |
| BLUE-SUB-2 | blue | submarine | 76.9 | 0.26 | 0.95 | 0.1 | 0.38 | 33.3 | 17.85 | 97.8 | 96.8 |
| BLUE-SUB-3 | blue | submarine | 59.0 | 0.1 | 1.08 | 0.03 | 0.13 | 60.0 | 13.97 | 99.1 | 98.4 |
| BLUE-SUB-N | blue | submarine | 48.7 | 2.9 | 2.26 | 0.74 | 3.23 | 32.5 | 15.08 | — | 89.0 |
| RED-AKE | red | surface | 79.5 | 0.0 | 1.92 | 0.0 | 0.0 | — | 17.67 | 100.0 | — |
| RED-AOR-G | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 20.54 | 100.0 | — |
| RED-AWACS-K | red | air | 56.4 | 0.0 | 1.1 | 0.0 | 0.0 | — | 16.33 | — | — |
| RED-GANF | red | surface | 97.4 | 0.28 | 1.1 | 0.0 | 0.97 | 28.9 | 20.46 | 92.5 | — |
| RED-GBPA | red | surface | 100.0 | 8.13 | 0.0 | 1.21 | 6.92 | 56.3 | 19.56 | — | 76.9 |
| RED-GE-1 | red | surface | 100.0 | 19.72 | 0.0 | 1.9 | 12.31 | 59.6 | 20.54 | 86.5 | 76.4 |
| RED-GE-2 | red | surface | 100.0 | 16.13 | 0.0 | 1.38 | 10.41 | 53.4 | 20.54 | 86.5 | 66.7 |
| RED-GE-3 | red | surface | 100.0 | 2.38 | 0.23 | 0.59 | 2.51 | 52.0 | 20.38 | 84.6 | 88.2 |
| RED-GLOG | red | surface | 94.9 | 0.0 | 0.38 | 0.0 | 0.0 | — | 18.82 | 100.0 | — |
| RED-KMF-1 | red | air | 100.0 | 2.33 | 0.0 | 0.38 | 2.0 | 43.6 | 20.56 | — | — |
| RED-KMF-2 | red | air | 100.0 | 1.85 | 0.28 | 0.44 | 1.59 | 43.5 | 20.56 | — | — |
| RED-KS-1 | red | submarine | 17.9 | 10.9 | 2.54 | 1.41 | 4.49 | 65.7 | 7.18 | 73.1 | 56.2 |
| RED-KSN | red | submarine | 94.9 | 11.13 | 0.54 | 0.54 | 9.08 | 55.6 | 20.41 | — | 72.3 |
| RED-MPRA-K1 | red | air | 94.9 | 5.64 | 0.15 | 0.97 | 3.97 | 54.2 | 20.46 | — | 100.0 |
| RED-MPRA-K2 | red | air | 74.4 | 3.1 | 0.54 | 0.79 | 2.74 | 42.1 | 18.03 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 5.1 | 0.31 | 3.08 | 0.03 | 0.08 | 100.0 | 0.0 | — | 97.4 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.41 | 3.87 | 0.03 | 0.26 | 70.0 | 0.0 | — | 91.5 |

## 3. Conjunto 2 — Self-play do motor heurístico de doutrina

### Geral (todas as partidas)

- Partidas: **400**
- Taxa de vitória: red=19.8%, blue=80.2%
- Motivo de conclusão: victory=44.0%, timeout=56.0%
- Duração média: 13.12 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=50.78, red=31.0
- Unidades perdidas em média: blue=4.87, red=6.14

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 203 | 80.3 |
| blue | formation | dispersed | 197 | 80.2 |
| blue | posture | defensive | 193 | 77.2 |
| blue | posture | offensive | 207 | 83.1 |
| blue | engagement | sequential | 201 | 78.1 |
| blue | engagement | simultaneous | 199 | 82.4 |
| blue | fuel_policy | anchor | 134 | 78.4 |
| blue | fuel_policy | economize | 139 | 82.0 |
| blue | fuel_policy | escort | 127 | 80.3 |
| red | formation | concentrated | 181 | 22.7 |
| red | formation | dispersed | 219 | 17.4 |
| red | posture | defensive | 210 | 20.0 |
| red | posture | offensive | 190 | 19.5 |
| red | engagement | sequential | 197 | 19.8 |
| red | engagement | simultaneous | 203 | 19.7 |
| red | fuel_policy | anchor | 121 | 22.3 |
| red | fuel_policy | economize | 131 | 21.4 |
| red | fuel_policy | escort | 148 | 16.2 |

### Somente vitória decisiva

- Partidas: **176**
- Taxa de vitória: red=44.9%, blue=55.1%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.91 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=57.65, red=42.13
- Unidades perdidas em média: blue=5.88, red=8.32

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 80 | 50.0 |
| blue | formation | dispersed | 96 | 59.4 |
| blue | posture | defensive | 77 | 42.9 |
| blue | posture | offensive | 99 | 64.6 |
| blue | engagement | sequential | 94 | 53.2 |
| blue | engagement | simultaneous | 82 | 57.3 |
| blue | fuel_policy | anchor | 63 | 54.0 |
| blue | fuel_policy | economize | 70 | 64.3 |
| blue | fuel_policy | escort | 43 | 41.9 |
| red | formation | concentrated | 86 | 47.7 |
| red | formation | dispersed | 90 | 42.2 |
| red | posture | defensive | 93 | 45.2 |
| red | posture | offensive | 83 | 44.6 |
| red | engagement | sequential | 84 | 46.4 |
| red | engagement | simultaneous | 92 | 43.5 |
| red | fuel_policy | anchor | 59 | 45.8 |
| red | fuel_policy | economize | 54 | 51.9 |
| red | fuel_policy | escort | 63 | 38.1 |

## 4. Discussão e ressalvas metodológicas

- **Achado principal:** no Conjunto 1 (rede neural), a taxa geral de vitória de Blue (90.2%) se inverte quase completamente quando o critério é restrito à vitória decisiva — Red vence 100.0% das partidas concluídas por objetivo de cenário. Isso indica que, em termos puramente táticos (não contaminados pelo desempate de timeout), a política aprendida pela rede para a equipe vermelha é substancialmente mais eficaz do que a da equipe azul.

- A vitória por **timeout** é decidida por soma agregada de HP, o que favorece estruturalmente a equipe azul: sua OOB inclui numerosos ativos terrestres estáticos (bases aéreas, portos, baterias) que raramente são atingidos e mantêm HP pleno, inflando o total independentemente do desempenho tático. Por isso, os subconjuntos de **vitória decisiva** (concluídos por critério de objetivo, não por esse desempate) são a referência mais fiel para avaliar efetividade tática real.
- O conjunto 1 (rede neural) usa a OOB de treino (`sim.OOB`, incluindo unidades Op.Esp. e bases sintéticas usadas só para geração de dados), não a OOB do jogo em produção (`shared/order_of_battle.js`), garantindo consistência com a distribuição em que as redes foram treinadas.
- Os dois conjuntos não são diretamente comparáveis em força tática absoluta: o conjunto 1 reflete o comportamento aprendido pela rede (sujeito à qualidade dos dados de treino e à capacidade do modelo), enquanto o conjunto 2 reflete heurísticas determinísticas com diversidade de doutrina — a comparação relevante é estrutural (quais fatores deslocam taxas de vitória, duração e perdas), não de desempenho absoluto entre os dois motores.
