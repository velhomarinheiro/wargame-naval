# Análise Estatística — Partidas Reais Humano × Máquina

_Gerado a partir de 15 logs `game_*.jsonl` em `data/game-logs/`_

> **Ressalva:** os logs registram apenas as equipes `blue` e `red`; não identificam qual lado foi controlado por humano e qual pela máquina. As estatísticas são apresentadas por equipe.

## 1. Resumo por partida

| Sala | Data | Turnos | Duração (min) | Vencedor | Motivo | Baixas Blue | Baixas Red |
|---|---|---|---|---|---|---|---|
| 12EMDY | 2026-06-19 | 3 | 17.9 | — | disconnect | 14 | 7 |
| XB3BOC | 2026-06-19 | 1 | 9.0 | blue | victory | 6 | 8 |
| 579KZH | 2026-06-20 | 1 | 8.1 | blue | victory | 1 | 10 |
| H0ZNJ6 | 2026-06-24 | 2 | 12.4 | blue | victory | 8 | 9 |
| JUTH4W | 2026-06-24 | 2 | 14.8 | blue | victory | 9 | 9 |
| 43UWJO | 2026-07-01 | 3 | 20.2 | blue | victory | 18 | 10 |
| UYUMT7 | 2026-07-24 | 7 | 24.0 | blue | victory | 23 | 12 |
| U6XIVP | 2026-08-01 | 7 | 38.4 | blue | victory | 25 | 11 |
| CN9E1N | 2026-08-01 | 3 | 19.8 | blue | victory | 8 | 10 |
| C537HW | 2026-08-03 | 5 | 26.8 | blue | victory | 19 | 12 |
| FHFZUV | 2026-08-03 | 2 | 14.8 | blue | victory | 9 | 4 |
| CFHFRI | 2026-08-04 | 2 | 13.2 | blue | victory | 10 | 11 |
| O2FXF8 | 2026-08-05 | 5 | 19.2 | red | victory | 17 | 11 |
| PLPN0I | 2026-09-13 | 2 | 14.0 | blue | victory | 3 | 5 |
| LBHA4Q | 2026-09-13 | 4 | 26.4 | red | victory | 18 | 10 |

## 2. Desfechos agregados

- Partidas analisadas: **15**
- Vencedores: —=1, blue=12, red=2
- Motivo de conclusão: disconnect=1, victory=14
- Partidas por vitória decisiva (objetivo): **14/15**

## 3. Efetividade média por equipe (todas as partidas)

| Métrica | Blue | Red |
|---|---|---|
| Baixas médias/partida | 12.53 | 9.27 |
| Sobrevivência média % | 65.2 | 45.5 |
| Dano médio causado (HP) | 29.2 | 75.7 |
| Abates médios/partida | 3.67 | 8.93 |
| Movimentos médios/partida | 50.9 | 55.0 |
| Ataques declarados médios/partida | 23.5 | 32.2 |

## 4. Progresso de objetivos por partida

### 12EMDY (2026-06-19) — sem vencedor / disconnect

- **Blue** (1/2 objetivos, venceu=False): cumpridos: Destruir Porta-Aviões
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ▫️ Neutralizar GT Anfíbio — SP: 11/14
  - ▫️ Destruir Submarino Nuclear — SP: 2/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 24% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 10% degradado  (SP: 61/68)

### XB3BOC (2026-06-19) — blue / victory

- **Blue** (2/2 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Destruir Submarino Nuclear
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ▫️ Neutralizar GT Anfíbio — SP: 14/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 16% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 0/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 6% degradado  (SP: 64/68)

### 579KZH (2026-06-20) — blue / victory

- **Blue** (2/2 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Destruir Submarino Nuclear
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ▫️ Neutralizar GT Anfíbio — SP: 14/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 16% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 0/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 0% degradado  (SP: 68/68)

### H0ZNJ6 (2026-06-24) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ▫️ Destruir Submarino Nuclear — SP: 2/3
  - ✅ Degradar ≥50% Nav. Combatentes — 75% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 10% degradado  (SP: 61/68)

### JUTH4W (2026-06-24) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ▫️ Neutralizar GT Anfíbio — SP: 6/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 69% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 18% degradado  (SP: 56/68)

### 43UWJO (2026-07-01) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ▫️ Destruir Submarino Nuclear — SP: 3/3
  - ✅ Degradar ≥50% Nav. Combatentes — 82% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 2/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 24% degradado  (SP: 52/68)

### UYUMT7 (2026-07-24) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 1/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ▫️ Destruir Submarino Nuclear — SP: 3/3
  - ✅ Degradar ≥50% Nav. Combatentes — 67% degradado
- **Red** (1/2 objetivos, venceu=False): cumpridos: Neutralizar 4 FPSOs
  - ✅ Neutralizar 4 FPSOs — 4/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 41% degradado  (SP: 40/68)

### U6XIVP (2026-08-01) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ▫️ Neutralizar GT Anfíbio — SP: 4/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 51% degradado
- **Red** (1/2 objetivos, venceu=False): cumpridos: Neutralizar 4 FPSOs
  - ✅ Neutralizar 4 FPSOs — 4/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 40% degradado  (SP: 41/68)

### CN9E1N (2026-08-01) — blue / victory

- **Blue** (4/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 76% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 21% degradado  (SP: 54/68)

### C537HW (2026-08-03) — blue / victory

- **Blue** (4/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 1/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 61% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 40% degradado  (SP: 41/68)

### FHFZUV (2026-08-03) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Neutralizar GT Anfíbio; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ▫️ Destruir Porta-Aviões — SP: 3/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 59% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 3/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 0% degradado  (SP: 68/68)

### CFHFRI (2026-08-04) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Destruir Porta-Aviões; Neutralizar GT Anfíbio; Destruir Submarino Nuclear
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar ≥50% Logística — 0/3 unid. neutralizadas
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 39% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 4 FPSOs — 2/4 neutralizadas
  - ▫️ Degradar ≥50% Portos — 18% degradado  (SP: 56/68)

### O2FXF8 (2026-08-05) — red / victory

- **Blue** (2/3 objetivos, venceu=False): cumpridos: Destruir Porta-Aviões; Destruir Submarino Nuclear
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar 2 de 3 Logísticos — 0/3 neutralizados (precisa 2)
  - ▫️ Neutralizar GT Anfíbio — SP: 8/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 49% degradado
- **Red** (2/2 objetivos, venceu=True): cumpridos: Neutralizar 3 de 4 FPSOs; Degradar ≥40% Portos
  - ✅ Neutralizar 3 de 4 FPSOs — 3/4 neutralizadas (precisa 3)
  - ✅ Degradar ≥40% Portos — 46% degradado  (SP: 37/68)

### PLPN0I (2026-09-13) — blue / victory

- **Blue** (3/3 objetivos, venceu=True): cumpridos: Neutralizar GT Anfíbio; Destruir Submarino Nuclear; Degradar ≥50% Nav. Combatentes
  - ▫️ Destruir Porta-Aviões — SP: 6/6
  - ▫️ Neutralizar 2 de 3 Logísticos — 0/3 neutralizados (precisa 2)
  - ✅ Neutralizar GT Anfíbio — SP: 0/14
  - ✅ Destruir Submarino Nuclear — SP: 0/3
  - ✅ Degradar ≥50% Nav. Combatentes — 80% degradado
- **Red** (0/2 objetivos, venceu=False): nenhum objetivo cumprido
  - ▫️ Neutralizar 3 de 4 FPSOs — 2/4 neutralizadas (precisa 3)
  - ▫️ Degradar ≥40% Portos — 0% degradado  (SP: 68/68)

### LBHA4Q (2026-09-13) — red / victory

- **Blue** (1/3 objetivos, venceu=False): cumpridos: Destruir Porta-Aviões
  - ✅ Destruir Porta-Aviões — SP: 0/6
  - ▫️ Neutralizar 2 de 3 Logísticos — 1/3 neutralizados (precisa 2)
  - ▫️ Neutralizar GT Anfíbio — SP: 12/14
  - ▫️ Destruir Submarino Nuclear — SP: 1/3
  - ▫️ Degradar ≥50% Nav. Combatentes — 39% degradado
- **Red** (2/2 objetivos, venceu=True): cumpridos: Neutralizar 3 de 4 FPSOs; Degradar ≥40% Portos
  - ✅ Neutralizar 3 de 4 FPSOs — 3/4 neutralizadas (precisa 3)
  - ✅ Degradar ≥40% Portos — 41% degradado  (SP: 40/68)

## 5. Unidades mais efetivas (dano causado somado em todas as partidas)

| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |
|---|---|---|---|---|---|---|---|
| RED-GE-1 | red | surface | 15 | 380.0 | 40 | 90 | 80.0 |
| RED-KSN | red | submarine | 15 | 288.0 | 33 | 56 | 33.3 |
| RED-GE-2 | red | surface | 15 | 121.0 | 12 | 36 | 53.3 |
| RED-SEOP-2 | red | specops | 15 | 90.0 | 11 | 34 | 53.3 |
| RED-GE-3 | red | surface | 15 | 77.0 | 10 | 21 | 100.0 |
| BLUE-SUB-N | blue | submarine | 15 | 69.0 | 4 | 30 | 26.7 |
| RED-KS-1 | red | submarine | 15 | 50.0 | 7 | 11 | 53.3 |
| BLUE-CJAT-1 | blue | air | 15 | 47.0 | 5 | 14 | 66.7 |
| BLUE-MPRA-2 | blue | air | 15 | 41.0 | 3 | 16 | 26.7 |
| BLUE-MPRA-1 | blue | air | 15 | 37.0 | 3 | 14 | 20.0 |
| RED-MPRA-K2 | red | air | 15 | 32.0 | 3 | 11 | 0.0 |
| BLUE-DCOST1 | blue | land | 15 | 30.0 | 3 | 9 | 100.0 |
| RED-GBPA | red | surface | 15 | 30.0 | 5 | 12 | 13.3 |
| RED-KMF-2 | red | air | 15 | 29.0 | 4 | 17 | 13.3 |
| BLUE-SUB-1 | blue | submarine | 15 | 25.0 | 3 | 15 | 26.7 |

## 6. Dano causado por categoria de unidade (somado)

| Equipe | Categoria | Dano causado | Abates |
|---|---|---|---|
| red | surface | 616.0 | 70 |
| red | submarine | 338.0 | 40 |
| blue | air | 164.0 | 21 |
| blue | submarine | 126.0 | 12 |
| blue | surface | 102.0 | 17 |
| red | specops | 92.0 | 11 |
| red | air | 89.0 | 13 |
| blue | land | 44.0 | 5 |
| blue | specops | 2.0 | 0 |
