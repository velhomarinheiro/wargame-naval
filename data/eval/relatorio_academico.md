# Relatório Estatístico e Descritivo — Simulações Operação Atlântico Sul

_Gerado em 2026-08-01_

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
- Taxa de vitória: blue=96.2%, red=3.8%
- Motivo de conclusão: timeout=96.2%, victory=3.8%
- Duração média: 17.78 turnos
- Dano médio causado por equipe (pontos de HP): blue=9.2, red=41.31
- Unidades perdidas em média: blue=3.83, red=2.62

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 88.5 | 0.01 | 0.48 | 0.0 | 1.1 | 0.9 | 17.49 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.03 | 0.0 | 31.01 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.01 | 0.0 | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 99.5 | 0.9 | 0.1 | 0.28 | 2.31 | 23.4 | 35.34 | 97.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.02 | 0.18 | 31.5 | 35.53 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.05 | 0.0 | 0.03 | 0.16 | 31.2 | 35.53 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.12 | 0.01 | 0.05 | 0.13 | 56.9 | 35.53 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 98.8 | 0.05 | 0.05 | 0.03 | 0.07 | 39.3 | 35.32 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 98.2 | 0.03 | 0.09 | 0.01 | 0.06 | 39.1 | 18.63 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 1.08 | 0.0 | 0.51 | 1.01 | 65.8 | 31.01 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 53.8 | 0.0 | 4.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 90.8 | 0.0 | 0.87 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 72.5 | 0.0 | 3.12 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 52.5 | 0.0 | 4.4 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 95.8 | 0.0 | 0.18 | 0.0 | 0.0 | — | 34.56 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 86.8 | 0.0 | 0.6 | 0.0 | 0.0 | — | 32.32 | 99.8 | — |
| BLUE-MPRA-1 | blue | air | 99.5 | 0.33 | 0.03 | 0.06 | 0.3 | 62.5 | 35.4 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 98.0 | 0.24 | 0.09 | 0.1 | 0.23 | 62.6 | 35.07 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 86.2 | 0.06 | 0.55 | 0.02 | 0.07 | 53.8 | 33.23 | 94.4 | 97.1 |
| BLUE-PAT-C2 | blue | surface | 75.5 | 0.06 | 0.99 | 0.01 | 0.04 | 66.7 | 28.94 | 95.1 | 98.2 |
| BLUE-PAT-O1 | blue | surface | 82.8 | 0.45 | 1.06 | 0.06 | 1.34 | 31.1 | 30.13 | 93.1 | 98.4 |
| BLUE-PAT-O2 | blue | surface | 97.2 | 0.17 | 0.15 | 0.05 | 0.35 | 37.6 | 35.05 | 95.5 | 97.8 |
| BLUE-PORTO-ACU | blue | land | 99.2 | 0.0 | 1.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 99.5 | 0.0 | 1.99 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.02 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 9.2 | 0.0 | 16.55 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 87.8 | 3.35 | 0.69 | 0.77 | 3.23 | 59.7 | 32.85 | 94.4 | 90.1 |
| BLUE-SAG-S1 | blue | surface | 92.0 | 0.43 | 0.92 | 0.12 | 0.73 | 39.5 | 34.16 | 93.3 | 99.0 |
| BLUE-SAG-S2 | blue | surface | 89.2 | 0.24 | 1.61 | 0.09 | 0.53 | 38.5 | 33.43 | 93.7 | 99.5 |
| BLUE-SUB-1 | blue | submarine | 83.0 | 0.22 | 0.56 | 0.03 | 0.2 | 65.9 | 31.89 | 99.5 | 97.9 |
| BLUE-SUB-2 | blue | submarine | 95.2 | 0.52 | 0.17 | 0.17 | 0.45 | 65.4 | 34.96 | 98.6 | 97.9 |
| BLUE-SUB-3 | blue | submarine | 89.8 | 0.26 | 0.33 | 0.07 | 0.26 | 53.3 | 33.88 | 98.6 | 98.8 |
| BLUE-SUB-N | blue | submarine | 96.0 | 0.56 | 0.17 | 0.15 | 0.56 | 43.7 | 34.83 | — | 99.1 |
| RED-AKE | red | surface | 97.5 | 0.0 | 0.28 | 0.0 | 0.0 | — | 34.16 | 100.0 | — |
| RED-AOR-G | red | surface | 99.5 | 0.0 | 0.01 | 0.0 | 0.0 | — | 35.49 | 100.0 | — |
| RED-AWACS-K | red | air | 81.2 | 0.0 | 0.75 | 0.0 | 0.0 | — | 31.62 | — | — |
| RED-GANF | red | surface | 99.8 | 0.06 | 0.2 | 0.01 | 0.23 | 25.6 | 35.5 | 99.0 | — |
| RED-GBPA | red | surface | 99.8 | 1.58 | 0.02 | 0.23 | 1.72 | 48.2 | 34.49 | — | 94.0 |
| RED-GE-1 | red | surface | 100.0 | 9.79 | 0.0 | 0.89 | 7.21 | 56.2 | 35.52 | 98.5 | 85.6 |
| RED-GE-2 | red | surface | 99.8 | 8.91 | 0.05 | 0.82 | 6.31 | 56.3 | 35.52 | 98.5 | 78.5 |
| RED-GE-3 | red | surface | 99.2 | 0.35 | 0.17 | 0.07 | 0.46 | 41.3 | 35.46 | 98.2 | 97.8 |
| RED-GLOG | red | surface | 99.5 | 0.0 | 0.04 | 0.0 | 0.0 | — | 34.48 | 100.0 | — |
| RED-KMF-1 | red | air | 99.8 | 0.39 | 0.01 | 0.06 | 0.48 | 39.7 | 35.49 | — | — |
| RED-KMF-2 | red | air | 99.8 | 0.35 | 0.07 | 0.06 | 0.41 | 40.2 | 35.49 | — | — |
| RED-KS-1 | red | submarine | 18.5 | 6.86 | 2.72 | 0.68 | 4.29 | 51.7 | 7.26 | 60.7 | 58.9 |
| RED-KSN | red | submarine | 98.0 | 8.04 | 0.13 | 0.48 | 5.95 | 60.6 | 35.24 | — | 79.8 |
| RED-MPRA-K1 | red | air | 96.5 | 2.33 | 0.08 | 0.18 | 1.57 | 47.1 | 35.2 | — | 100.0 |
| RED-MPRA-K2 | red | air | 89.2 | 2.16 | 0.3 | 0.29 | 1.31 | 48.6 | 33.67 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 59.0 | 0.0 | 1.38 | 0.0 | 0.0 | 100.0 | 0.0 | — | 99.9 |
| RED-OPSESP-2 | red | surface | 0.2 | 0.5 | 2.99 | 0.04 | 0.42 | 62.1 | 0.0 | — | 86.3 |

### Somente vitória decisiva

- Partidas: **15**
- Taxa de vitória: red=100.0%
- Motivo de conclusão: victory=100.0%
- Duração média: 12.13 turnos
- Dano médio causado por equipe (pontos de HP): blue=17.4, red=78.2
- Unidades perdidas em média: blue=8.0, red=4.07

**Estatísticas por unidade (equipe azul e vermelha):**

| ID | Equipe | Categoria | Sobrev.% | Dano+/jogo | Dano-/jogo | Abates/jogo | Tiros/jogo | Acerto% | Mov./jogo | Comb.% rest. | Mun.% rest. |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BLUE-ADA-1 | blue | land | 80.0 | 0.07 | 0.6 | 0.0 | 1.53 | 4.3 | 12.27 | — | — |
| BLUE-ADA-2 | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.4 | 0.0 | 20.53 | — | — |
| BLUE-AERO-CF | blue | land | 100.0 | 0.0 | 0.07 | 0.0 | 0.07 | 0.0 | 0.0 | — | — |
| BLUE-AERO-RJ | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-AERO-SP | blue | land | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-ANFIB | blue | surface | 100.0 | 1.13 | 0.0 | 0.33 | 3.33 | 24.0 | 23.47 | 97.5 | — |
| BLUE-CACA-1 | blue | air | 100.0 | 0.07 | 0.0 | 0.0 | 0.33 | 20.0 | 23.47 | — | — |
| BLUE-CACA-2 | blue | air | 100.0 | 0.2 | 0.0 | 0.13 | 0.33 | 60.0 | 23.47 | — | — |
| BLUE-CJAT-1 | blue | air | 100.0 | 0.33 | 0.07 | 0.13 | 0.33 | 60.0 | 23.47 | — | 100.0 |
| BLUE-CJAT-2 | blue | air | 93.3 | 0.0 | 0.47 | 0.0 | 0.13 | 0.0 | 23.07 | — | 100.0 |
| BLUE-DCOST1 | blue | land | 100.0 | 0.53 | 0.07 | 0.07 | 0.93 | 28.6 | 13.13 | — | 100.0 |
| BLUE-DCOST2 | blue | land | 100.0 | 0.8 | 0.0 | 0.53 | 1.13 | 70.6 | 20.53 | — | 100.0 |
| BLUE-FPSO1 | blue | surface | 0.0 | 0.0 | 7.13 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO2 | blue | surface | 6.7 | 0.0 | 7.4 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO3 | blue | surface | 13.3 | 0.0 | 6.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-FPSO4 | blue | surface | 26.7 | 0.0 | 5.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-LOG-A | blue | surface | 93.3 | 0.0 | 0.27 | 0.0 | 0.0 | — | 23.33 | 99.8 | — |
| BLUE-LOG-T | blue | surface | 73.3 | 0.0 | 1.4 | 0.0 | 0.0 | — | 20.13 | 99.8 | — |
| BLUE-MPRA-1 | blue | air | 100.0 | 0.47 | 0.0 | 0.07 | 0.47 | 57.1 | 23.47 | — | 100.0 |
| BLUE-MPRA-2 | blue | air | 100.0 | 0.53 | 0.13 | 0.07 | 0.33 | 80.0 | 23.47 | — | 100.0 |
| BLUE-PAT-C1 | blue | surface | 80.0 | 0.0 | 0.6 | 0.0 | 0.2 | 0.0 | 22.67 | 92.2 | 90.0 |
| BLUE-PAT-C2 | blue | surface | 46.7 | 0.13 | 2.13 | 0.0 | 0.2 | 66.7 | 14.8 | 90.0 | 90.0 |
| BLUE-PAT-O1 | blue | surface | 86.7 | 0.73 | 0.8 | 0.07 | 2.47 | 27.0 | 22.0 | 90.7 | 86.7 |
| BLUE-PAT-O2 | blue | surface | 93.3 | 0.8 | 0.33 | 0.13 | 1.53 | 52.2 | 22.93 | 92.7 | 83.3 |
| BLUE-PORTO-ACU | blue | land | 86.7 | 0.0 | 5.93 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-RJ | blue | land | 93.3 | 0.0 | 8.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-S | blue | land | 100.0 | 0.0 | 0.53 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-PORTO-V | blue | land | 6.7 | 0.0 | 16.67 | 0.0 | 0.0 | — | 0.0 | — | — |
| BLUE-SAG-P | blue | surface | 73.3 | 5.27 | 1.2 | 1.33 | 6.4 | 53.1 | 19.87 | 92.8 | 86.2 |
| BLUE-SAG-S1 | blue | surface | 73.3 | 1.33 | 3.4 | 0.4 | 2.6 | 38.5 | 19.73 | 88.0 | 95.9 |
| BLUE-SAG-S2 | blue | surface | 66.7 | 0.93 | 4.73 | 0.13 | 1.73 | 34.6 | 17.6 | 89.3 | 98.1 |
| BLUE-SUB-1 | blue | submarine | 73.3 | 1.33 | 0.87 | 0.07 | 1.4 | 57.1 | 20.8 | 100.0 | 85.8 |
| BLUE-SUB-2 | blue | submarine | 86.7 | 1.87 | 0.47 | 0.53 | 1.6 | 62.5 | 22.33 | 99.7 | 85.8 |
| BLUE-SUB-3 | blue | submarine | 53.3 | 0.33 | 1.6 | 0.0 | 0.8 | 41.7 | 19.13 | 99.7 | 94.2 |
| BLUE-SUB-N | blue | submarine | 93.3 | 0.53 | 0.2 | 0.07 | 1.53 | 30.4 | 22.87 | — | 93.7 |
| RED-AKE | red | surface | 93.3 | 0.0 | 1.13 | 0.0 | 0.0 | — | 22.47 | 100.0 | — |
| RED-AOR-G | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 23.47 | 100.0 | — |
| RED-AWACS-K | red | air | 53.3 | 0.0 | 1.27 | 0.0 | 0.0 | — | 19.33 | — | — |
| RED-GANF | red | surface | 100.0 | 0.27 | 1.4 | 0.07 | 0.87 | 30.8 | 23.47 | 92.7 | — |
| RED-GBPA | red | surface | 100.0 | 6.27 | 0.0 | 0.93 | 6.07 | 52.7 | 22.47 | — | 71.3 |
| RED-GE-1 | red | surface | 100.0 | 16.73 | 0.0 | 1.33 | 11.93 | 56.4 | 23.27 | 82.8 | 75.7 |
| RED-GE-2 | red | surface | 93.3 | 18.47 | 1.4 | 1.8 | 10.53 | 62.0 | 23.27 | 82.8 | 63.6 |
| RED-GE-3 | red | surface | 86.7 | 1.93 | 1.8 | 0.33 | 2.47 | 43.2 | 22.67 | 80.7 | 88.9 |
| RED-GLOG | red | surface | 100.0 | 0.0 | 0.0 | 0.0 | 0.0 | — | 22.47 | 100.0 | — |
| RED-KMF-1 | red | air | 100.0 | 1.53 | 0.0 | 0.27 | 2.2 | 24.2 | 23.47 | — | — |
| RED-KMF-2 | red | air | 100.0 | 1.87 | 0.53 | 0.33 | 1.87 | 53.6 | 23.47 | — | — |
| RED-KS-1 | red | submarine | 6.7 | 7.47 | 2.67 | 0.67 | 3.47 | 61.5 | 6.73 | 74.7 | 67.3 |
| RED-KSN | red | submarine | 86.7 | 14.8 | 1.0 | 0.87 | 8.27 | 60.5 | 22.27 | — | 71.7 |
| RED-MPRA-K1 | red | air | 93.3 | 4.27 | 0.13 | 0.47 | 2.67 | 55.0 | 23.27 | — | 100.0 |
| RED-MPRA-K2 | red | air | 73.3 | 3.87 | 0.6 | 0.73 | 2.07 | 45.2 | 22.13 | — | 100.0 |
| RED-OPSESP-1 | red | surface | 6.7 | 0.0 | 2.93 | 0.0 | 0.0 | — | 0.0 | — | 100.0 |
| RED-OPSESP-2 | red | surface | 0.0 | 0.73 | 2.53 | 0.2 | 0.53 | 75.0 | 0.0 | — | 82.2 |

## 3. Conjunto 2 — Self-play do motor heurístico de doutrina

### Geral (todas as partidas)

- Partidas: **400**
- Taxa de vitória: blue=82.0%, red=18.0%
- Motivo de conclusão: victory=44.2%, timeout=55.8%
- Duração média: 13.23 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=50.1, red=31.82
- Unidades perdidas em média: blue=4.9, red=6.21

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 194 | 78.4 |
| blue | formation | dispersed | 206 | 85.4 |
| blue | posture | defensive | 202 | 81.2 |
| blue | posture | offensive | 198 | 82.8 |
| blue | engagement | sequential | 181 | 75.1 |
| blue | engagement | simultaneous | 219 | 87.7 |
| blue | fuel_policy | anchor | 135 | 77.8 |
| blue | fuel_policy | economize | 133 | 83.5 |
| blue | fuel_policy | escort | 132 | 84.8 |
| red | formation | concentrated | 212 | 17.5 |
| red | formation | dispersed | 188 | 18.6 |
| red | posture | defensive | 195 | 21.0 |
| red | posture | offensive | 205 | 15.1 |
| red | engagement | sequential | 193 | 20.2 |
| red | engagement | simultaneous | 207 | 15.9 |
| red | fuel_policy | anchor | 128 | 21.1 |
| red | fuel_policy | economize | 135 | 23.7 |
| red | fuel_policy | escort | 137 | 9.5 |

### Somente vitória decisiva

- Partidas: **177**
- Taxa de vitória: blue=59.3%, red=40.7%
- Motivo de conclusão: victory=100.0%
- Duração média: 7.22 turnos
- Dano médio sofrido por equipe (pontos de HP): blue=60.08, red=44.58
- Unidades perdidas em média: blue=6.37, red=8.63

**Efeito marginal de cada eixo de doutrina sobre a taxa de vitória da própria equipe** (média sobre a doutrina do oponente, sorteada aleatoriamente):

| Equipe | Eixo | Valor | n | Taxa de vitória% |
|---|---|---|---|---|
| blue | formation | concentrated | 89 | 52.8 |
| blue | formation | dispersed | 88 | 65.9 |
| blue | posture | defensive | 82 | 53.7 |
| blue | posture | offensive | 95 | 64.2 |
| blue | engagement | sequential | 88 | 48.9 |
| blue | engagement | simultaneous | 89 | 69.7 |
| blue | fuel_policy | anchor | 58 | 48.3 |
| blue | fuel_policy | economize | 60 | 63.3 |
| blue | fuel_policy | escort | 59 | 66.1 |
| red | formation | concentrated | 98 | 37.8 |
| red | formation | dispersed | 79 | 44.3 |
| red | posture | defensive | 85 | 48.2 |
| red | posture | offensive | 92 | 33.7 |
| red | engagement | sequential | 92 | 42.4 |
| red | engagement | simultaneous | 85 | 38.8 |
| red | fuel_policy | anchor | 60 | 45.0 |
| red | fuel_policy | economize | 65 | 49.2 |
| red | fuel_policy | escort | 52 | 25.0 |

## 4. Discussão e ressalvas metodológicas

- **Achado principal:** no Conjunto 1 (rede neural), a taxa geral de vitória de Blue (96.2%) se inverte quase completamente quando o critério é restrito à vitória decisiva — Red vence 100.0% das partidas concluídas por objetivo de cenário. Isso indica que, em termos puramente táticos (não contaminados pelo desempate de timeout), a política aprendida pela rede para a equipe vermelha é substancialmente mais eficaz do que a da equipe azul.

- A vitória por **timeout** é decidida por soma agregada de HP, o que favorece estruturalmente a equipe azul: sua OOB inclui numerosos ativos terrestres estáticos (bases aéreas, portos, baterias) que raramente são atingidos e mantêm HP pleno, inflando o total independentemente do desempenho tático. Por isso, os subconjuntos de **vitória decisiva** (concluídos por critério de objetivo, não por esse desempate) são a referência mais fiel para avaliar efetividade tática real.
- O conjunto 1 (rede neural) usa a OOB de treino (`sim.OOB`, incluindo unidades Op.Esp. e bases sintéticas usadas só para geração de dados), não a OOB do jogo em produção (`shared/order_of_battle.js`), garantindo consistência com a distribuição em que as redes foram treinadas.
- Os dois conjuntos não são diretamente comparáveis em força tática absoluta: o conjunto 1 reflete o comportamento aprendido pela rede (sujeito à qualidade dos dados de treino e à capacidade do modelo), enquanto o conjunto 2 reflete heurísticas determinísticas com diversidade de doutrina — a comparação relevante é estrutural (quais fatores deslocam taxas de vitória, duração e perdas), não de desempenho absoluto entre os dois motores.
