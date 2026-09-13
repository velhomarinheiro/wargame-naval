# Estudo de Variância — Agressividade do bot: efeito do dataset vs sorte do treino

_5 réplicas (seeds 11/23/37/51/73) por condição; cada réplica = um `move_net`
treinado do zero (40 épocas) + 100 partidas de self-play com `attack_net` fixo.
Condições: 0, 8 e 15 partidas humanas (sempre + 120 sintéticas)._

## Motivação

Comparações de **um único treino** sugeriram que adicionar 8 partidas humanas
**derrubou** a agressividade do bot (vitórias decisivas 19,8% → 3,2%) e que 15
partidas a **recuperaram** (→ 16,8%). Como a agressividade emergente depende
fortemente do `move_net` — cuja inicialização não é semeada — era preciso
separar **efeito do dataset** de **variância de treino** treinando várias
réplicas por condição.

## Resultado (média ± desvio-padrão entre 5 réplicas)

| Condição | Ataques/jogo | Dano/jogo | Vitória decisiva % | Contato/fase |
|---|---|---|---|---|
| **0 humanas** (só sintético) | 82,8 ± 21,0 | 70,8 ± 11,9 | 9,4 ± 6,9 | 5,9 ± 2,0 |
| **8 humanas** | 119,3 ± 21,2 | 91,9 ± 17,2 | 28,2 ± 20,5 | 10,3 ± 2,2 |
| **15 humanas** | 120,6 ± 17,4 | 89,7 ± 10,8 | 25,4 ± 20,1 | 9,7 ± 1,3 |

Réplicas individuais (vitória decisiva %) — a dispersão é enorme:
- 0 humanas: 8, 1, 7, 22, 9
- 8 humanas: 32, 6, 49, 51, 3
- 15 humanas: 34, 16, 15, 60, 2

Significância (Welch t, n=5 por grupo; |t|≳2,3 ≈ p<0,05):

| Métrica | 0 vs 8 | 0 vs 15 | 8 vs 15 |
|---|---|---|---|
| Ataques/jogo | 2,44 | 2,77 | 0,10 |
| Dano/jogo | 2,02 | 2,35 | −0,21 |
| Contato/fase | 2,93 | 3,07 | −0,51 |
| Vitória decisiva % | 1,74 | 1,51 | −0,20 |

## Conclusões

1. **A "queda seguida de recuperação" era variância de treino, não efeito do
   dataset.** Entre 8 e 15 partidas humanas não há diferença detectável em
   nenhuma métrica (|t| ≤ 0,5). O run comitado de 8 jogos (3,2% decisiva) e o de
   15 jogos (16,8%) foram simplesmente dois sorteios de uma distribuição larga —
   as réplicas de 8 jogos variam de 3% a 51% de vitória decisiva, e as de 15, de
   2% a 60%.

2. **Adicionar demonstrações humanas AUMENTA a agressividade, em média.** Contra
   o baseline sem humanos, os ataques/jogo sobem ~45% (82,8 → ~120), o dano ~28%
   (70,8 → ~90) e o contato/fase ~70% (5,9 → ~10), com t≈2,0–3,1 (efeito real
   para ataque/dano/contato; contato é o mais robusto). A vitória decisiva também
   sobe (9,4% → ~27%) mas com t≈1,5–1,7 (marginal), pois é a métrica de maior
   variância. **Isto é o oposto do que o run único de 8 jogos sugeria.**

3. **A agressividade emergente é intrinsecamente sensível ao seed.** Mesmo sem
   dados humanos, a vitória decisiva varia de 1% a 22% entre réplicas. Portanto,
   conclusões tiradas de **um único treino** sobre agressividade não são
   confiáveis — é preciso agregar réplicas.

## Recomendações

- **Não confiar em um único run.** Para implantar, treinar várias seeds e
  selecionar o `move_net` mais agressivo/decisivo por self-play (ou ensemble).
- **Manter as partidas humanas no treino** — elas ajudam a agressividade na
  média; o ganho de 8 para 15 é nulo, mas o de 0 para 8 é real.
- **Reportar no artigo com barras de erro / múltiplos seeds**, nunca com um
  único treino, dado o desvio-padrão de ~20 pontos na taxa de vitória decisiva.

_Dados brutos: `data/eval/variance_study_results.json`. Script:
`ml/variance_study.py`._
