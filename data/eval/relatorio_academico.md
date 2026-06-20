# Relatório Estatístico e Descritivo — Simulações Operação Atlântico Sul

_Gerado em 2026-06-20_

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
- Taxa de vitória: blue=80.2%, red=19.8%
- Motivo de conclusão: timeout=80.0%, victory=20.0%
- Duração média: 16.0 turnos
- Dano médio causado por equipe (pontos de HP): blue=16.0, red=72.54
- Unidades perdidas em média: blue=8.87, red=3.75

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 92.0 | 0.04 | 0.33 | 0.01 | 0.58 | 6.9 | 11.85 | — | — |
| BLUE-ADA-2 | blue | land | 99.5 | 0.0 | 0.01 | 0.0 | 0.01 | 0.0 | 30.77 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 97.0 | 1.21 | 0.49 | 0.37 | 2.0 | 36.6 | 30.54 | 97.8 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.02 | 0.13 | 30.8 | 31.91 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.04 | 0.0 | 0.02 | 0.11 | 39.5 | 31.91 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.09 | 0.0 | 0.04 | 0.08 | 54.5 | 31.91 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 0.03 | 0.0 | 0.01 | 0.04 | 38.9 | 31.91 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 97.8 | 0.1 | 0.08 | 0.01 | 0.08 | 65.6 | 12.26 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 99.8 | 0.17 | 0.01 | 0.04 | 0.09 | 73.5 | 30.77 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 34.5 | 0.0 | 5.71 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 59.5 | 0.0 | 3.43 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 42.5 | 0.0 | 5.19 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 35.0 | 0.0 | 6.18 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 88.2 | 0.0 | 0.66 | 0.0 | 0.0 | — | 30.43 | 99.7 | — |
| BLUE-LOG-T | blue | surface | 28.5 | 0.0 | 3.79 | 0.0 | 0.0 | — | 15.66 | 98.6 | — |
| BLUE-MPRA-1 | blue | air | 98.0 | 0.57 | 0.07 | 0.12 | 0.47 | 49.5 | 31.64 | — | 99.9 |
| BLUE-MPRA-2 | blue | air | 88.5 | 0.31 | 0.44 | 0.06 | 0.29 | 48.7 | 29.82 | — | 99.9 |
| BLUE-PAT-C1 | blue | surface | 39.0 | 0.19 | 2.57 | 0.03 | 0.1 | 92.1 | 9.86 | 52.8 | 92.2 |
| BLUE-PAT-C2 | blue | surface | 35.2 | 0.36 | 2.96 | 0.09 | 0.2 | 80.8 | 17.49 | 75.5 | 83.5 |
| BLUE-PAT-O1 | blue | surface | 69.5 | 0.42 | 1.89 | 0.11 | 0.71 | 39.9 | 25.78 | 77.7 | 93.6 |
| BLUE-PAT-O2 | blue | surface | 62.0 | 0.27 | 2.18 | 0.1 | 0.51 | 40.6 | 24.56 | 78.9 | 95.8 |
| BLUE-PORTO-ACU | blue | land | 99.2 | 0.0 | 0.68 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 96.8 | 0.0 | 5.57 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 24.2 | 0.0 | 15.29 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 77.2 | 5.62 | 1.43 | 1.27 | 4.54 | 61.9 | 26.42 | 83.4 | 78.4 |
| BLUE-SAG-S1 | blue | surface | 81.2 | 1.38 | 2.31 | 0.34 | 1.6 | 48.8 | 27.05 | 75.5 | 95.7 |
| BLUE-SAG-S2 | blue | surface | 68.8 | 0.83 | 4.09 | 0.22 | 1.13 | 46.1 | 24.82 | 72.4 | 98.4 |
| BLUE-SUB-1 | blue | submarine | 5.8 | 0.68 | 3.09 | 0.14 | 0.32 | 82.2 | 7.09 | 93.2 | 92.9 |
| BLUE-SUB-2 | blue | submarine | 83.2 | 0.34 | 0.56 | 0.07 | 0.27 | 59.3 | 29.02 | 96.0 | 97.1 |
| BLUE-SUB-3 | blue | submarine | 59.0 | 0.19 | 1.36 | 0.04 | 0.15 | 64.5 | 22.42 | 95.9 | 98.0 |
| BLUE-SUB-N | blue | submarine | 51.2 | 3.12 | 2.15 | 0.64 | 1.92 | 49.0 | 22.63 | — | 89.4 |
| RED-AKE | red | surface | 82.5 | 0.0 | 1.48 | 0.0 | 0.0 | — | 27.43 | 99.9 | — |
| RED-AOR-G | red | surface | 97.8 | 0.0 | 0.11 | 0.0 | 0.0 | — | 31.45 | 99.9 | — |
| RED-AWACS-K | red | air | 67.2 | 0.0 | 0.77 | 0.0 | 0.0 | — | 26.12 | — | — |
| RED-GANF | red | surface | 94.2 | 0.15 | 1.29 | 0.04 | 0.43 | 34.7 | 30.53 | 96.5 | — |
| RED-GBPA | red | surface | 99.5 | 6.75 | 0.04 | 1.11 | 5.21 | 57.6 | 30.89 | — | 67.6 |
| RED-GE-1 | red | surface | 99.5 | 19.35 | 0.06 | 2.07 | 11.4 | 55.2 | 31.29 | 92.2 | 73.1 |
| RED-GE-2 | red | surface | 99.5 | 13.46 | 0.08 | 1.39 | 9.32 | 51.8 | 31.26 | 92.2 | 68.0 |
| RED-GE-3 | red | surface | 98.5 | 1.93 | 0.35 | 0.44 | 1.45 | 62.7 | 31.16 | 91.8 | 88.0 |
| RED-GLOG | red | surface | 94.2 | 0.0 | 0.48 | 0.0 | 0.0 | — | 29.88 | 100.0 | — |
| RED-KMF-1 | red | air | 99.5 | 1.05 | 0.03 | 0.2 | 1.16 | 41.5 | 31.89 | — | — |
| RED-KMF-2 | red | air | 99.5 | 0.86 | 0.23 | 0.2 | 0.96 | 39.5 | 31.89 | — | — |
| RED-KS-1 | red | submarine | 3.0 | 9.62 | 3.12 | 0.97 | 4.01 | 68.7 | 6.0 | 81.0 | 42.8 |
| RED-KSN | red | submarine | 94.2 | 9.37 | 0.34 | 0.66 | 6.74 | 60.1 | 30.87 | — | 78.0 |
| RED-MPRA-K1 | red | air | 92.8 | 6.36 | 0.16 | 0.98 | 3.02 | 59.5 | 31.06 | — | 99.9 |
| RED-MPRA-K2 | red | air | 82.5 | 3.6 | 0.46 | 0.79 | 1.91 | 62.1 | 29.12 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 18.5 | 0.04 | 3.03 | 0.01 | 0.01 | 100.0 | 0.0 | — | 99.7 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.01 | 3.96 | 0.0 | 0.01 | 66.7 | 0.0 | — | 99.8 |

### Somente vitória decisiva

- Partidas: **80**
- Taxa de vitória: red=98.8%, blue=1.2%
- Motivo de conclusão: victory=100.0%
- Duração média: 8.03 turnos
- Dano médio causado por equipe (pontos de HP): blue=16.25, red=85.86
- Unidades perdidas em média: blue=9.74, red=3.8

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 93.8 | 0.05 | 0.29 | 0.01 | 0.21 | 23.5 | 7.94 | — | — |
| BLUE-ADA-2 | blue | land | 97.5 | 0.0 | 0.05 | 0.0 | 0.04 | 0.0 | 14.36 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 0.95 | 0.0 | 0.31 | 2.11 | 26.6 | 14.51 | 100.0 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.04 | 0.0 | 0.03 | 0.17 | 21.4 | 15.53 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.07 | 0.0 | 0.05 | 0.15 | 50.0 | 15.53 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.05 | 0.0 | 0.03 | 0.09 | 57.1 | 15.53 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 100.0 | 0.0 | 0.0 | 0.0 | 0.06 | 0.0 | 15.53 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.12 | 0.0 | 0.01 | 0.15 | 66.7 | 8.21 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 98.8 | 0.28 | 0.05 | 0.09 | 0.11 | 77.8 | 14.39 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 0.0 | 0.0 | 8.6 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 31.2 | 0.0 | 5.4 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 25.0 | 0.0 | 6.51 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 8.8 | 0.0 | 7.6 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 97.5 | 0.0 | 0.14 | 0.0 | 0.0 | — | 15.38 | 99.9 | — |
| BLUE-LOG-T | blue | surface | 33.8 | 0.0 | 3.06 | 0.0 | 0.0 | — | 8.71 | 98.7 | — |
| BLUE-MPRA-1 | blue | air | 96.2 | 0.79 | 0.09 | 0.16 | 0.61 | 46.9 | 15.38 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 76.2 | 0.45 | 0.84 | 0.09 | 0.39 | 48.4 | 13.53 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 23.8 | 0.07 | 3.29 | 0.01 | 0.05 | 100.0 | 4.69 | 56.2 | 96.2 |
| BLUE-PAT-C2 | blue | surface | 30.0 | 0.68 | 3.06 | 0.2 | 0.38 | 76.7 | 9.69 | 72.9 | 67.5 |
| BLUE-PAT-O1 | blue | surface | 71.2 | 0.42 | 1.69 | 0.16 | 0.78 | 45.2 | 12.05 | 70.5 | 95.6 |
| BLUE-PAT-O2 | blue | surface | 53.8 | 0.15 | 2.59 | 0.07 | 0.47 | 31.6 | 11.06 | 74.4 | 98.1 |
| BLUE-PORTO-ACU | blue | land | 96.2 | 0.0 | 1.62 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 86.2 | 0.0 | 14.39 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 21.2 | 0.0 | 15.86 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 95.0 | 5.2 | 0.3 | 1.12 | 4.33 | 62.1 | 14.44 | 89.6 | 77.5 |
| BLUE-SAG-S1 | blue | surface | 91.2 | 1.07 | 1.26 | 0.26 | 1.48 | 41.5 | 13.11 | 72.8 | 95.6 |
| BLUE-SAG-S2 | blue | surface | 80.0 | 0.8 | 2.59 | 0.24 | 1.09 | 44.8 | 12.4 | 70.5 | 98.6 |
| BLUE-SUB-1 | blue | submarine | 2.5 | 0.35 | 3.31 | 0.1 | 0.23 | 72.2 | 3.09 | 97.9 | 95.0 |
| BLUE-SUB-2 | blue | submarine | 92.5 | 0.44 | 0.25 | 0.09 | 0.28 | 63.6 | 14.78 | 96.7 | 97.0 |
| BLUE-SUB-3 | blue | submarine | 78.8 | 0.19 | 0.59 | 0.04 | 0.14 | 72.7 | 13.16 | 97.3 | 97.7 |
| BLUE-SUB-N | blue | submarine | 45.0 | 4.08 | 2.44 | 0.72 | 2.86 | 48.5 | 12.28 | — | 83.7 |
| RED-AKE | red | surface | 81.2 | 0.0 | 1.66 | 0.0 | 0.0 | — | 13.03 | 99.8 | — |
| RED-AOR-G | red | surface | 97.5 | 0.0 | 0.1 | 0.0 | 0.0 | — | 15.22 | 99.9 | — |
| RED-AWACS-K | red | air | 65.0 | 0.0 | 0.8 | 0.0 | 0.0 | — | 14.19 | — | — |
| RED-GANF | red | surface | 96.2 | 0.17 | 0.76 | 0.06 | 0.61 | 28.6 | 15.22 | 92.2 | — |
| RED-GBPA | red | surface | 97.5 | 8.29 | 0.17 | 1.32 | 6.34 | 55.8 | 14.47 | — | 62.0 |
| RED-GE-1 | red | surface | 98.8 | 20.52 | 0.16 | 1.77 | 10.34 | 65.1 | 15.12 | 77.4 | 74.6 |
| RED-GE-2 | red | surface | 100.0 | 14.57 | 0.03 | 1.05 | 8.56 | 63.9 | 15.12 | 77.4 | 67.6 |
| RED-GE-3 | red | surface | 98.8 | 3.01 | 0.46 | 0.65 | 1.99 | 70.4 | 14.95 | 76.0 | 80.2 |
| RED-GLOG | red | surface | 93.8 | 0.0 | 0.65 | 0.0 | 0.0 | — | 14.16 | 100.0 | — |
| RED-KMF-1 | red | air | 97.5 | 1.54 | 0.0 | 0.31 | 1.7 | 40.4 | 15.47 | — | — |
| RED-KMF-2 | red | air | 97.5 | 1.43 | 0.25 | 0.35 | 1.41 | 42.5 | 15.47 | — | — |
| RED-KS-1 | red | submarine | 13.8 | 10.91 | 2.73 | 1.27 | 3.46 | 79.4 | 5.7 | 78.9 | 47.1 |
| RED-KSN | red | submarine | 93.8 | 12.51 | 0.44 | 0.64 | 7.79 | 64.2 | 15.4 | — | 74.5 |
| RED-MPRA-K1 | red | air | 90.0 | 8.15 | 0.16 | 1.19 | 3.26 | 65.9 | 15.0 | — | 99.6 |
| RED-MPRA-K2 | red | air | 86.2 | 4.74 | 0.3 | 1.11 | 2.0 | 74.4 | 14.5 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 0.0 | 0.01 | 3.34 | 0.0 | 0.01 | 100.0 | 0.0 | — | 99.6 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.0 | 4.24 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |

## 3. Conjunto 2 — Self-play do motor heurístico de doutrina

### Geral (todas as partidas)

- Partidas: **400**
- Taxa de vitória: blue=75.2%, red=24.8%
- Motivo de conclusão: timeout=50.5%, victory=49.5%
- Duração média: 12.39 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=52.68, red=30.79
- Unidades perdidas em média: blue=5.15, red=6.21

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 183 | 74.9 |
| blue | formation | dispersed | 217 | 75.6 |
| blue | posture | defensive | 198 | 68.2 |
| blue | posture | offensive | 202 | 82.2 |
| blue | engagement | sequential | 214 | 77.1 |
| blue | engagement | simultaneous | 186 | 73.1 |
| blue | fuel_policy | anchor | 120 | 75.8 |
| blue | fuel_policy | economize | 149 | 75.2 |
| blue | fuel_policy | escort | 131 | 74.8 |
| red | formation | concentrated | 193 | 27.5 |
| red | formation | dispersed | 207 | 22.2 |
| red | posture | defensive | 207 | 29.0 |
| red | posture | offensive | 193 | 20.2 |
| red | engagement | sequential | 194 | 24.2 |
| red | engagement | simultaneous | 206 | 25.2 |
| red | fuel_policy | anchor | 131 | 22.9 |
| red | fuel_policy | economize | 130 | 23.8 |
| red | fuel_policy | escort | 139 | 27.3 |

### Somente vitória decisiva

- Partidas: **198**
- Taxa de vitória: blue=50.0%, red=50.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 6.66 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=62.88, red=41.08
- Unidades perdidas em média: blue=6.62, red=8.24

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 95 | 51.6 |
| blue | formation | dispersed | 103 | 48.5 |
| blue | posture | defensive | 98 | 35.7 |
| blue | posture | offensive | 100 | 64.0 |
| blue | engagement | sequential | 105 | 53.3 |
| blue | engagement | simultaneous | 93 | 46.2 |
| blue | fuel_policy | anchor | 58 | 50.0 |
| blue | fuel_policy | economize | 82 | 54.9 |
| blue | fuel_policy | escort | 58 | 43.1 |
| red | formation | concentrated | 101 | 52.5 |
| red | formation | dispersed | 97 | 47.4 |
| red | posture | defensive | 105 | 57.1 |
| red | posture | offensive | 93 | 41.9 |
| red | engagement | sequential | 100 | 47.0 |
| red | engagement | simultaneous | 98 | 53.1 |
| red | fuel_policy | anchor | 65 | 46.2 |
| red | fuel_policy | economize | 62 | 50.0 |
| red | fuel_policy | escort | 71 | 53.5 |

## 4. Discussão e ressalvas metodológicas

- **Achado principal:** no Conjunto 1 (rede neural), a taxa geral de vitória de Blue (80.2%) se inverte quase completamente quando o critério é restrito à vitória decisiva — Red vence 98.8% das partidas concluídas por objetivo de cenário. Isso indica que, em termos puramente táticos (não contaminados pelo desempate de timeout), a política aprendida pela rede para a equipe vermelha é substancialmente mais eficaz do que a da equipe azul.

- A vitória por **timeout** é decidida por soma agregada de HP, o que favorece estruturalmente a equipe azul: sua OOB inclui numerosos ativos terrestres estáticos (bases aéreas, portos, baterias) que raramente são atingidos e mantêm HP pleno, inflando o total independentemente do desempenho tático. Por isso, os subconjuntos de **vitória decisiva** (concluídos por critério de objetivo, não por esse desempate) são a referência mais fiel para avaliar efetividade tática real.
- O conjunto 1 (rede neural) usa a OOB de treino (`sim.OOB`, incluindo unidades Op.Esp. e bases sintéticas usadas só para geração de dados), não a OOB do jogo em produção (`shared/order_of_battle.js`), garantindo consistência com a distribuição em que as redes foram treinadas.
- No motor de simulação, o campo `amount` de uma ordem de ataque (incluindo a economia de munição da doutrina) não restringe o consumo real de munição em `resolve_attack()` — a arma sempre dispara seu salvo padrão. Os percentuais de munição remanescente refletem, portanto, o número de disparos realizados, não uma limitação de quantidade por disparo aplicada pela política de economia.
- Os dois conjuntos não são diretamente comparáveis em força tática absoluta: o conjunto 1 reflete o comportamento aprendido pela rede (sujeito à qualidade dos dados de treino e à capacidade do modelo), enquanto o conjunto 2 reflete heurísticas determinísticas com diversidade de doutrina — a comparação relevante é estrutural (quais fatores deslocam taxas de vitória, duração e perdas), não de desempenho absoluto entre os dois motores.
