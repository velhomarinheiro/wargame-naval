# Análise Estatística — Partidas Reais Humano × Máquina

_Gerado a partir de 13 logs `game_*.jsonl` em `data/game-logs/`_

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

## 2. Desfechos agregados

- Partidas analisadas: **13**
- Vencedores: —=1, blue=11, red=1
- Motivo de conclusão: disconnect=1, victory=12
- Partidas por vitória decisiva (objetivo): **12/13**

## 3. Efetividade média por equipe (todas as partidas)

| Métrica | Blue | Red |
|---|---|---|
| Baixas médias/partida | 12.85 | 9.54 |
| Sobrevivência média % | 64.3 | 43.9 |
| Dano médio causado (HP) | 28.8 | 76.1 |
| Abates médios/partida | 3.54 | 9.15 |
| Movimentos médios/partida | 50.8 | 56.5 |
| Ataques declarados médios/partida | 23.5 | 32.7 |

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

## 5. Unidades mais efetivas (dano causado somado em todas as partidas)

| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |
|---|---|---|---|---|---|---|---|
| RED-GE-1 | red | surface | 13 | 341.0 | 37 | 81 | 84.6 |
| RED-KSN | red | submarine | 13 | 234.0 | 28 | 49 | 30.8 |
| RED-GE-2 | red | surface | 13 | 112.0 | 10 | 31 | 46.2 |
| RED-SEOP-2 | red | specops | 13 | 77.0 | 10 | 30 | 53.8 |
| RED-GE-3 | red | surface | 13 | 73.0 | 10 | 18 | 100.0 |
| BLUE-SUB-N | blue | submarine | 13 | 67.0 | 4 | 28 | 30.8 |
| RED-KS-1 | red | submarine | 13 | 43.0 | 6 | 9 | 53.8 |
| BLUE-CJAT-1 | blue | air | 13 | 34.0 | 3 | 9 | 69.2 |
| BLUE-MPRA-1 | blue | air | 13 | 30.0 | 2 | 10 | 15.4 |
| BLUE-DCOST1 | blue | land | 13 | 30.0 | 3 | 9 | 100.0 |
| BLUE-MPRA-2 | blue | air | 13 | 29.0 | 1 | 13 | 23.1 |
| RED-MPRA-K2 | red | air | 13 | 29.0 | 3 | 9 | 0.0 |
| RED-GBPA | red | surface | 13 | 27.0 | 4 | 11 | 7.7 |
| BLUE-SUB-1 | blue | submarine | 13 | 25.0 | 3 | 14 | 23.1 |
| RED-KMF-2 | red | air | 13 | 25.0 | 4 | 14 | 7.7 |

## 6. Dano causado por categoria de unidade (somado)

| Equipe | Categoria | Dano causado | Abates |
|---|---|---|---|
| red | surface | 559.0 | 64 |
| red | submarine | 277.0 | 34 |
| blue | submarine | 120.0 | 12 |
| blue | air | 119.0 | 14 |
| blue | surface | 90.0 | 15 |
| red | specops | 79.0 | 10 |
| red | air | 74.0 | 11 |
| blue | land | 44.0 | 5 |
| blue | specops | 2.0 | 0 |
