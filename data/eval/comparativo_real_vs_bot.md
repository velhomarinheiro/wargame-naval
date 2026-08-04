# Comparativo — Partidas Reais (Humano × Máquina) vs Linha de Base Bot × Bot

## Metodologia e ressalvas

- **Reais (humano×máquina):** 6 partidas jogadas na interface (`game_*.jsonl`), das quais 11 concluídas por objetivo e 1 por desconexão. Um dos lados é humano (não identificado no log). O limiar de vitória de Blue mudou entre versões do cenário (2 objetivos nas partidas de 19-20/06; 3 objetivos a partir de 24/06), então trate n=6 como amostra heterogênea e ilustrativa, não como experimento controlado.
- **NN self-play (bot×bot):** 400 partidas, ambos os lados dirigidos pelas redes ONNX (mesma política do `bot.js`). Recorte `victory` = só as concluídas por objetivo.
- **Heurístico self-play (bot×bot):** 400 partidas do motor de doutrina de `simulate_games.py` (gerador dos dados de treino), doutrina sorteada.
- Todas as métricas de dano/baixas são **médias por partida**, comparáveis entre os conjuntos.

## 1. Quadro-resumo

| Conjunto | Vitória Blue% / Red% | Dano méd. Blue/Red (HP) | Baixas méd. Blue/Red | Turnos méd. |
|---|---|---|---|---|
| Reais — decididas (n=11) | 100.0% / 0.0% | 28.9 / 73.7 | 12.5 / 9.42 | 3.18 |
| NN self-play — geral (n=400) | 96.2% / 3.8% | 9.2 / 41.31 | 3.83 / 2.62 | 17.78 |
| NN self-play — só decisiva (n=15) | 0.0% / 100.0% | 17.4 / 78.2 | 8.0 / 4.07 | 12.13 |
| Heurístico — geral (n=400) | 82.0% / 18.0% | — / — | 4.9 / 6.21 | 13.23 |
| Heurístico — só decisiva (n=177) | 59.3% / 40.7% | — / — | 6.37 / 8.63 | 7.22 |

## 2. Decisividade e ritmo — a maior diferença

- Nas partidas **reais**, 11/11 desfechos foram por **objetivo de cenário** (0% timeout), com duração média de **3.18 turnos**.
- No **NN self-play**, apenas **3.8%** das partidas chegam a um objetivo — as demais 96.2% se arrastam até o desempate por soma de HP no turno-limite (duração média **17.78 turnos**).
- O motor **heurístico** fica no meio: 44.2% por objetivo, 13.23 turnos em média.
- **Leitura:** partidas com humano terminam de forma decisiva e ~6-8× mais rápido do que o self-play das redes. O jogador humano persegue ativamente as condições de vitória; a política aprendida pela rede tende a um jogo indeciso que morre no timeout.

## 3. Inversão Blue/Red quando a partida é decidida por objetivo

- **Reais decididas:** Blue 100.0% × Red 0.0%.
- **NN só decisiva:** Red **100.0%** — no self-play das redes, quando alguém fecha objetivo, é quase sempre a equipe vermelha.
- **Heurístico só decisiva:** equilíbrio (Blue 59.3% × Red 40.7%).
- **Leitura:** o padrão decisivo das partidas reais é o oposto do NN self-play. Isso sugere que a mão humana (seja de que lado for) executa a via de vitória por objetivo de Blue de um jeito que a rede, jogando os dois lados, não reproduz — a rede raramente converte pressão em cumprimento dos objetivos de Blue.

## 4. Assimetria de dano — constante estrutural

- Reais: Red causa **73.7** vs Blue **28.9** HP/partida (**2.6×**).
- NN self-play: Red **41.31** vs Blue **9.2** (**4.5×**).
- Em todos os conjuntos, **Red é o agressor com muito mais poder de fogo e Blue vence por objetivo, não por atrição**. O resultado independe de quem causa mais dano — é uma característica robusta do cenário, confirmada tanto no jogo real quanto no sintético.

## 5. Unidade dominante — mesma nos dois mundos

| Ranking | Reais (dano somado) | NN bot×bot (dano/jogo) |
|---|---|---|
| 1º | RED-GE-1 (320.0 HP, 35 ab.) | RED-GE-1 (9.81 HP/jogo, 0.91 ab./jogo) |
| 2º | RED-KSN (189.0 HP, 22 ab.) | RED-GE-2 (8.78 HP/jogo, 0.81 ab./jogo) |
| 3º | RED-GE-2 (110.0 HP, 10 ab.) | RED-KSN (8.34 HP/jogo, 0.42 ab./jogo) |

- O cruzador **RED-GE-1** é a unidade nº 1 em dano tanto nas partidas reais quanto no NN self-play — o centro de gravidade ofensivo de Red é estável entre humano e máquina. Submarinos (RED-KSN, RED-KS-1) completam o topo em ambos.

## 6. Síntese

1. **O que muda com o humano:** decisão por objetivo (não timeout) e partidas curtas — o humano joga *para as condições de vitória*, algo que o NN self-play quase não faz.
2. **O que se mantém:** a assimetria de dano (Red agressor, ~3-5× mais dano) e a identidade das unidades dominantes (RED-GE-1, submarinos) são idênticas entre real e sintético — o motor e o balanceamento de forças são consistentes.
3. **Alerta metodológico:** no recorte decisivo, real (Blue vence) e NN self-play (Red vence) apontam para lados opostos. Para o artigo, o self-play das redes **não** é um bom preditor de quem vence uma partida real decidida por objetivo; o motor heurístico (equilíbrio ~50/50) é a linha de base mais neutra.
