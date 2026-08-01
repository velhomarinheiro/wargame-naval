# Investigação — Queda de agressividade do bot após o retreino

_Análise de por que o self-play NN passou de 19,8% para 3,2% de vitórias
decisivas (e o dano médio de Red caiu de 75 para 42 HP/partida) depois de
retreinar os modelos incluindo as 8 partidas humanas (oversampling 5×)._

## Método

Comparação controlada entre os modelos **ANTIGO** (pré-retreino, recuperados do
commit `d49eaf8`) e **NOVO** (pós-retreino), em dois níveis:

1. **Por decisão (mesmo estado):** 1.400 estados de jogo coletados de self-play
   dirigido pelos modelos antigos; sobre cada estado idêntico replicamos as duas
   redes e medimos a propensão de ataque/movimento. Isola a política, sem
   divergência de trajetória.
2. **Emergente (self-play completo):** 40 partidas com cada combinação de redes,
   incluindo os cruzamentos (ablação) `move NOVO + atk ANTIGO` e
   `move ANTIGO + atk NOVO`, para atribuir o efeito a uma das redes.

Script: `ml/investigate_aggression.py`.

## Resultado 1 — Por decisão, as redes novas NÃO são menos agressivas

| Rede (mesmo estado) | Métrica | ANTIGO | NOVO |
|---|---|---|---|
| attack_net | ataques declarados / estado | 2,87 | **3,00** |
| attack_net | células top-30 sobre inimigo | 9,01 | **9,67** |
| attack_net | entropia dos logits | 3,03 | **2,40** (mais decidido) |
| move_net | avanço médio (Δdist, <0 = aproxima) | −1,05 | −0,94 |
| move_net | % de movimentos que aproximam | 60,8% | 58,4% |
| move_net | entropia dos logits | 2,73 | **2,97** (mais difuso) |

Sobre estados idênticos, o **attack_net novo dispara mais** e mira com mais
confiança (menor entropia). O **move_net novo** avança quase igual por passo,
mas tem **entropia maior** — distribui a preferência por mais células.

## Resultado 2 — Ablação: a causa é o move_net, não o attack_net

Self-play completo, 40 jogos por configuração:

| Configuração | Ataques/jogo | Contato/fase¹ | Turnos |
|---|---|---|---|
| move ANTIGO + atk ANTIGO | 87,1 | 7,82 | 18,0 |
| move NOVO + atk NOVO | **48,9** | 6,29 | 17,7 |
| move NOVO + atk **ANTIGO** | **48,3** | 6,74 | 18,0 |
| move ANTIGO + atk **NOVO** | **87,5** | 7,93 | 17,5 |

¹ nº de inimigos dentro do alcance de ataque de alguma unidade amiga, por fase.

O volume de ataques segue **exclusivamente o move_net**: com o move antigo são
~87 ataques/jogo independentemente do attack_net; com o move novo caem para ~48.
Trocar o attack_net não muda nada (`move ANTIGO + atk NOVO` = 87,5). **O
attack_net está inocente.**

## Mecanismo

A queda de agressividade **não** é uma política de ataque mais tímida — é um
efeito **emergente de posicionamento**:

1. O move_net retreinado tem **logits mais difusos** (entropia 2,73 → 2,97).
   Misturar as demonstrações humanas (19% das amostras de movimento, com
   distribuição de células-destino diferente da sintética) com os dados de bot
   **achata** a distribuição de destino aprendida — o modelo fica menos "pontudo"
   nas células de consolidação agressiva que o modelo puramente sintético
   preferia.
2. Em self-play isso **compõe ao longo de 18 turnos**: as forças se **dispersam**
   em vez de concentrar (o bot até move *mais* unidades, mas para posições mais
   espalhadas). O contato cai ~20% (7,82 → 6,29 inimigos em alcance por fase).
3. Como todo ataque exige um inimigo em alcance, a queda de contato é
   **amplificada** nos ataques (−44%: 87 → 49) — com força dispersa, menos
   atacantes alcançam cada alvo. Menos ataques → menos dano → mais partidas
   chegam ao turno-limite, e o desempate por soma de HP favorece Blue (→ 97%).

## Conclusão e recomendações

- **Causa raiz:** o achatamento da distribuição do `move_net` ao misturar duas
  fontes de demonstração (humana × sintética) com destinos divergentes — não uma
  perda de agressividade do `attack_net`.
- **Se o objetivo é um bot mais decisivo:**
  - Reduzir o oversampling humano (o efeito difusor cresce com o peso), ou
    treinar move e attack com pesos de fonte diferentes;
  - Treinar o move_net só com dados que concordem na direção (ex.: filtrar
    demonstrações por vitória decisiva), reduzindo o conflito de rótulos;
  - Ir além da imitação pura: uma recompensa orientada a objetivo (RL/curadoria)
    contornaria o achatamento inerente a imitar destinos conflitantes.
- **Nota metodológica:** imitação de célula-destino é sensível a rótulos
  conflitantes; adicionar dados "melhores" (humanos) pode reduzir a agressividade
  emergente se eles discordarem dos sintéticos sobre *para onde ir*.
