# Análise Estatística — Partidas Reais Humano × Máquina

_Gerado a partir de 10 logs `game_*.jsonl` em `data/game-logs/`_

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

## 2. Desfechos agregados

- Partidas analisadas: **10**
- Vencedores: —=1, blue=9
- Motivo de conclusão: disconnect=1, victory=9
- Partidas por vitória decisiva (objetivo): **9/10**

## 3. Efetividade média por equipe (todas as partidas)

| Métrica | Blue | Red |
|---|---|---|
| Baixas médias/partida | 13.1 | 9.8 |
| Sobrevivência média % | 63.6 | 42.4 |
| Dano médio causado (HP) | 28.5 | 79.8 |
| Abates médios/partida | 3.4 | 9.7 |
| Movimentos médios/partida | 49.9 | 58.4 |
| Ataques declarados médios/partida | 23.3 | 33.2 |

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

## 5. Unidades mais efetivas (dano causado somado em todas as partidas)

| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |
|---|---|---|---|---|---|---|---|
| RED-GE-1 | red | surface | 10 | 282.0 | 31 | 65 | 90.0 |
| RED-KSN | red | submarine | 10 | 167.0 | 19 | 35 | 40.0 |
| RED-GE-2 | red | surface | 10 | 99.0 | 9 | 25 | 40.0 |
| RED-SEOP-2 | red | specops | 10 | 56.0 | 8 | 24 | 60.0 |
| RED-GE-3 | red | surface | 10 | 55.0 | 7 | 15 | 100.0 |
| BLUE-SUB-N | blue | submarine | 10 | 51.0 | 3 | 21 | 30.0 |
| RED-KS-1 | red | submarine | 10 | 43.0 | 6 | 9 | 60.0 |
| BLUE-DCOST1 | blue | land | 10 | 27.0 | 3 | 8 | 100.0 |
| RED-GBPA | red | surface | 10 | 27.0 | 4 | 10 | 0.0 |
| BLUE-CJAT-1 | blue | air | 10 | 25.0 | 3 | 8 | 70.0 |
| RED-MPRA-K2 | red | air | 10 | 24.0 | 3 | 8 | 0.0 |
| BLUE-MPRA-1 | blue | air | 10 | 21.0 | 1 | 7 | 20.0 |
| BLUE-SUB-1 | blue | submarine | 10 | 20.0 | 2 | 9 | 30.0 |
| RED-KMF-2 | red | air | 10 | 20.0 | 3 | 10 | 0.0 |
| BLUE-MPRA-2 | blue | air | 10 | 18.0 | 0 | 9 | 20.0 |

## 6. Dano causado por categoria de unidade (somado)

| Equipe | Categoria | Dano causado | Abates |
|---|---|---|---|
| red | surface | 468.0 | 54 |
| red | submarine | 210.0 | 25 |
| blue | submarine | 98.0 | 10 |
| blue | air | 84.0 | 10 |
| blue | surface | 62.0 | 9 |
| red | air | 62.0 | 10 |
| red | specops | 58.0 | 8 |
| blue | land | 41.0 | 5 |
