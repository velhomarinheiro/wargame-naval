# Análise Estatística — Partidas Reais Humano × Máquina

_Gerado a partir de 7 logs `game_*.jsonl` em `data/game-logs/`_

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

## 2. Desfechos agregados

- Partidas analisadas: **7**
- Vencedores: —=1, blue=6
- Motivo de conclusão: disconnect=1, victory=6
- Partidas por vitória decisiva (objetivo): **6/7**

## 3. Efetividade média por equipe (todas as partidas)

| Métrica | Blue | Red |
|---|---|---|
| Baixas médias/partida | 11.29 | 9.29 |
| Sobrevivência média % | 68.6 | 45.4 |
| Dano médio causado (HP) | 21.7 | 74.6 |
| Abates médios/partida | 2.43 | 8.71 |
| Movimentos médios/partida | 44.3 | 47.9 |
| Ataques declarados médios/partida | 17.9 | 27.4 |

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

## 5. Unidades mais efetivas (dano causado somado em todas as partidas)

| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |
|---|---|---|---|---|---|---|---|
| RED-GE-1 | red | surface | 7 | 199.0 | 18 | 37 | 85.7 |
| RED-KSN | red | submarine | 7 | 122.0 | 15 | 24 | 57.1 |
| RED-SEOP-2 | red | specops | 7 | 50.0 | 7 | 19 | 71.4 |
| RED-GE-3 | red | surface | 7 | 45.0 | 6 | 10 | 100.0 |
| RED-KS-1 | red | submarine | 7 | 43.0 | 6 | 9 | 71.4 |
| BLUE-SUB-N | blue | submarine | 7 | 33.0 | 2 | 14 | 42.9 |
| RED-GE-2 | red | surface | 7 | 29.0 | 2 | 14 | 42.9 |
| BLUE-SUB-1 | blue | submarine | 7 | 18.0 | 2 | 7 | 42.9 |
| BLUE-MPRA-1 | blue | air | 7 | 18.0 | 1 | 5 | 28.6 |
| BLUE-CJAT-1 | blue | air | 7 | 18.0 | 1 | 4 | 85.7 |
| BLUE-SAG-P | blue | surface | 7 | 15.0 | 2 | 7 | 0.0 |
| RED-GBPA | red | surface | 7 | 13.0 | 2 | 4 | 0.0 |
| BLUE-PAT-O1 | blue | surface | 7 | 9.0 | 0 | 3 | 28.6 |
| BLUE-SUB-2 | blue | submarine | 7 | 9.0 | 1 | 5 | 71.4 |
| RED-KMF-1 | red | air | 7 | 8.0 | 2 | 6 | 0.0 |

## 6. Dano causado por categoria de unidade (somado)

| Equipe | Categoria | Dano causado | Abates |
|---|---|---|---|
| red | surface | 287.0 | 29 |
| red | submarine | 165.0 | 21 |
| blue | submarine | 63.0 | 7 |
| red | specops | 50.0 | 7 |
| blue | air | 43.0 | 3 |
| blue | surface | 37.0 | 5 |
| red | air | 20.0 | 4 |
| blue | land | 9.0 | 2 |
