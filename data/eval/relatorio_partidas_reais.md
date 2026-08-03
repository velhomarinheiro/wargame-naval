# Análise Estatística — Partidas Reais Humano × Máquina

_Gerado a partir de 9 logs `game_*.jsonl` em `data/game-logs/`_

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

## 2. Desfechos agregados

- Partidas analisadas: **9**
- Vencedores: —=1, blue=8
- Motivo de conclusão: disconnect=1, victory=8
- Partidas por vitória decisiva (objetivo): **8/9**

## 3. Efetividade média por equipe (todas as partidas)

| Métrica | Blue | Red |
|---|---|---|
| Baixas médias/partida | 12.44 | 9.56 |
| Sobrevivência média % | 65.4 | 43.8 |
| Dano médio causado (HP) | 27.2 | 78.0 |
| Abates médios/partida | 3.11 | 9.44 |
| Movimentos médios/partida | 49.3 | 56.4 |
| Ataques declarados médios/partida | 21.9 | 31.7 |

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

## 5. Unidades mais efetivas (dano causado somado em todas as partidas)

| Unidade | Equipe | Categoria | Partidas | Dano causado | Abates | Disparos | Sobrev.% |
|---|---|---|---|---|---|---|---|
| RED-GE-1 | red | surface | 9 | 255.0 | 27 | 54 | 88.9 |
| RED-KSN | red | submarine | 9 | 157.0 | 19 | 34 | 44.4 |
| RED-GE-2 | red | surface | 9 | 69.0 | 6 | 20 | 33.3 |
| RED-SEOP-2 | red | specops | 9 | 56.0 | 8 | 24 | 66.7 |
| RED-GE-3 | red | surface | 9 | 46.0 | 6 | 12 | 100.0 |
| BLUE-SUB-N | blue | submarine | 9 | 45.0 | 2 | 17 | 33.3 |
| RED-KS-1 | red | submarine | 9 | 43.0 | 6 | 9 | 66.7 |
| BLUE-CJAT-1 | blue | air | 9 | 25.0 | 3 | 8 | 77.8 |
| RED-GBPA | red | surface | 9 | 25.0 | 3 | 9 | 0.0 |
| BLUE-SUB-1 | blue | submarine | 9 | 20.0 | 2 | 9 | 33.3 |
| RED-KMF-2 | red | air | 9 | 19.0 | 3 | 9 | 0.0 |
| BLUE-MPRA-1 | blue | air | 9 | 18.0 | 1 | 6 | 22.2 |
| BLUE-MPRA-2 | blue | air | 9 | 18.0 | 0 | 8 | 22.2 |
| BLUE-SAG-P | blue | surface | 9 | 16.0 | 2 | 9 | 11.1 |
| BLUE-DCOST1 | blue | land | 9 | 16.0 | 2 | 5 | 100.0 |

## 6. Dano causado por categoria de unidade (somado)

| Equipe | Categoria | Dano causado | Abates |
|---|---|---|---|
| red | surface | 399.0 | 44 |
| red | submarine | 200.0 | 25 |
| blue | submarine | 87.0 | 8 |
| blue | air | 79.0 | 9 |
| red | specops | 58.0 | 8 |
| blue | surface | 49.0 | 7 |
| red | air | 45.0 | 8 |
| blue | land | 30.0 | 4 |
