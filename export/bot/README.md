# Bot "Operação Atlântico Sul" — pacote portátil para outro simulador

Este diretório contém o bot treinado em formato **ONNX single-file** (pesos
embutidos, sem sidecar `.onnx.data`), pronto para ser incluído em qualquer
simulador que consiga rodar onnxruntime (Python, C++, C#, Java, Rust,
JavaScript via onnxruntime-web/-node, etc.).

## Arquivos

| Arquivo | Função | Entrada | Saída |
|---|---|---|---|
| `move_net.onnx` | Escolhe para onde mover | `state` float32 `[N,9,10,16]` | `logits` float32 `[N,160]` |
| `attack_net.onnx` | Escolhe o que atacar | `state` float32 `[N,9,10,16]` | `logits` float32 `[N,160]` |

Ambos: nome do input = `"state"`, nome do output = `"logits"`, eixo 0 dinâmico
(batch). 21,5 MB cada, autossuficientes.

O **bot completo = os 2 modelos + a lógica de decisão** descrita abaixo. A rede
sozinha só produz um "mapa de calor" de 160 células; quem transforma isso em
ordens válidas é o wrapper (Seções 3–4). Implementações de referência:
`bot.js` (produção, JS) e `ml/bot_vs_bot.py` (Python) no repositório.

## 1. Grade

- Grade hex **odd-q, topo plano**, largura `GRID_W=16`, altura `GRID_H=10`.
- Índice achatado de uma célula `(col,row)` → `idx = row*16 + col` (0..159).
  Inverso: `col = idx % 16`, `row = idx // 16`.
- Distância hex (cube coords, odd-q):
  ```
  cube(col,row) = (col, -col-z, z)  onde z = row - (col - (col&1))//2
  dist(a,b) = max(|ax-bx|, |ay-by|, |az-bz|)
  ```

## 2. Tensor de estado (entrada) — 9 canais × 10 linhas × 16 colunas

Zerar o tensor e, para cada unidade **viva** (`hp>0`) na sua célula `(col,row)`:

| Canal | Conteúdo |
|---|---|
| 0 | presença: `1.0` |
| 1 | equipe: `+1.0` se blue, `-1.0` se red |
| 2 | HP normalizado: `hp / maxHp` |
| 3 | categoria == `surface` ? 1 : 0 |
| 4 | categoria == `submarine` ? 1 : 0 |
| 5 | categoria == `air` ? 1 : 0 |
| 6 | categoria == `land` ? 1 : 0 |
| 7 | combustível: `fuel.current / fuel.max` (1.0 se a unidade não usa combustível) |
| 8 | armamento: `min(soma_das_quantidades_de_armas / 20, 1.0)` |

O tensor é **o mesmo** para as duas redes e representa o tabuleiro inteiro
(as duas equipes juntas). A perspectiva de equipe vem do canal 1, não de
espelhar o tabuleiro.

## 3. Decodificação e decisão — MOVIMENTO (`move_net`)

1. Rodar `move_net` no estado atual → 160 logits.
2. Ordenar as células por logit decrescente; pegar o **top-30**.
3. Para cada unidade própria móvel (viva, com pontos de movimento, combustível ok):
   - **Emergência de combustível:** se for unidade naval e `fuel.current/fuel.max < 0.35`,
     mover em direção ao reabastecedor amigo mais próximo (tanque/logístico para
     as duas equipes; porto também, mas só para blue), via caminho mais curto.
   - Senão, percorrer o top-30 na ordem e escolher a **primeira** célula que seja:
     (a) diferente da célula atual, (b) alcançável pelo tipo da unidade
     (terreno + BFS respeitando ocupação), (c) dentro do alcance de movimento.
   - Emitir uma ordem de movimento até essa célula; marcar a célula como ocupada.

## 4. Decodificação e decisão — ATAQUE (`attack_net`)

1. Rodar `attack_net` no estado atual → 160 logits; top-30 células.
2. Para cada unidade própria viva (combustível ok):
   - Percorrer o top-30 na ordem; para a primeira célula que contém um **inimigo**
     dentro do **alcance de ataque** da arma da unidade contra a categoria daquele
     alvo, emitir `{attackerId, targetId, amount: 1}` e parar.
- Observação: o bot sempre pede `amount: 1`; a resolução de dano/munição é do
  motor hospedeiro.

## 5. Dependências do simulador hospedeiro

A rede é portátil, mas a Seção 3–4 precisa de dados que **o simulador
hospedeiro fornece** (não estão no ONNX):

- geometria hex (distância, vizinhança, terreno/`can_enter` por categoria);
- BFS de caminho respeitando ocupação e alcance de movimento;
- alcance de ataque por (arma, categoria-alvo) de cada unidade;
- pontos de movimento, combustível e armamento de cada unidade.

Se o outro simulador usar OOB/regras diferentes, a rede ainda roda (o tensor só
depende de posição/HP/categoria/combustível/armas), mas foi **treinada na OOB e
no tabuleiro de Operação Atlântico Sul** — desempenho fora dessa distribuição
não é garantido.

## 6. Exemplo mínimo (Python)

Ver `reference_infer.py` neste diretório: monta o tensor, roda os dois modelos
e imprime as células top-5 de movimento e de ataque para um estado de exemplo.
Porte a mesma lógica para a linguagem do seu simulador.
