# Timeline Graph — Modelo, Algoritmo e Arquitetura de Ações

## 1. Objetivo

A aplicação representa uma estrutura composta por várias **Lines**, cada uma contendo Nodes ordenados temporalmente.

Nodes de Lines diferentes podem estar **alinhados**, indicando que representam o mesmo momento temporal. Além disso, existem **Relations** que expressam ordem temporal entre Nodes.

A estrutura persistida não deve depender de coordenadas visuais (`X`, `Y`). O backend mantém apenas a informação semântica e, a partir dela, reconstrói a estrutura completa que será enviada ao front-end para renderização.

A arquitetura proposta é:

```text
                BACKEND

  Nodes + Lines + Relations + Alignments
                    |
                    v
          Resolução temporal
                    |
                    v
             Ordenação temporal
                    |
                    v
             Cálculo de layout
                    |
                    v
       Estrutura completa de renderização
                    |
                    v
                  FRONT
                    |
                    v
               Renderização
```

O front-end não decide a posição dos Nodes e não mantém uma versão local autoritativa do estado.

---

## 2. Princípio central

A estrutura deve ser dividida em três níveis:

### 2.1. Modelo semântico

Representa o que existe e como os elementos se relacionam.

- `Lines`
- `Nodes`
- `Relations`
- `Alignments`

### 2.2. Estrutura temporal derivada

Representa os diferentes momentos temporais encontrados a partir dos Nodes e Alignments.

Exemplo:

```text
T0 = A1, B1, C1
T1 = B2
T2 = B3, C2
T3 = A2, B4
```

Esses `T0`, `T1`, `T2` etc. são estruturas intermediárias do algoritmo. Eles não precisam necessariamente existir no modelo persistido.

### 2.3. Estrutura de renderização

É produzida pelo backend e contém a posição final de cada Node.

Por exemplo:

```text
A1 -> (0, 0)
B1 -> (0, 1)
C1 -> (0, 2)
B2 -> (1, 1)
B3 -> (2, 1)
C2 -> (2, 2)
A2 -> (3, 0)
B4 -> (3, 1)
```

Essa camada é descartável e pode ser reconstruída sempre que o modelo semântico mudar.

---

# 3. Modelo de dados

Uma representação conceitual pode ser:

```json
{
  "lines": [
    { "id": "A" },
    { "id": "B" },
    { "id": "C" }
  ],

  "nodes": [
    { "id": "A1", "line": "A" },
    { "id": "A2", "line": "A" },

    { "id": "B1", "line": "B" },
    { "id": "B2", "line": "B" },
    { "id": "B3", "line": "B" },
    { "id": "B4", "line": "B" },

    { "id": "C1", "line": "C" },
    { "id": "C2", "line": "C" }
  ],

  "relations": [
    { "from": "A1", "to": "A2", "type": "before" },
    { "from": "B1", "to": "B2", "type": "before" },
    { "from": "B2", "to": "B3", "type": "before" },
    { "from": "B3", "to": "B4", "type": "before" },
    { "from": "C1", "to": "C2", "type": "before" }
  ],

  "alignments": [
    {
      "id": "T0",
      "nodes": ["A1", "B1", "C1"]
    },
    {
      "id": "T2",
      "nodes": ["B3", "C2"]
    },
    {
      "id": "T3",
      "nodes": ["A2", "B4"]
    }
  ]
}
```

O exemplo acima é conceitual. Os nomes e formatos concretos podem mudar na implementação.

---

# 4. Relações e alinhamentos possuem funções diferentes

## Relations

Uma Relation representa uma ordem.

```text
A1 -> A2
```

significa:

> A1 acontece antes de A2.

As Relations formam o grafo temporal.

## Alignments

Um Alignment representa simultaneidade.

```text
A1 = B1 = C1
```

Isso significa que esses Nodes ocupam o mesmo momento temporal.

É preferível tratar um Alignment como um **grupo de equivalência temporal**:

```json
{
  "id": "T0",
  "nodes": ["A1", "B1", "C1"]
}
```

em vez de armazenar pares isolados como `A1-B1` e `B1-C1`.

---

# 5. Construção da estrutura temporal

O backend recebe o modelo semântico e primeiro resolve os Alignments.

No exemplo inicial:

```text
A1 = B1 = C1
B3 = C2
A2 = B4
```

Os grupos temporais ficam:

```text
T0 = [A1, B1, C1]
T1 = [B2]
T2 = [B3, C2]
T3 = [A2, B4]
```

Nodes sem Alignment formam sozinhos um grupo temporal.

O resultado pode ser pensado como uma sequência de **Time Slots**:

```text
T0 -> T1 -> T2 -> T3
```

---

# 6. Reconstrução do eixo X

O objetivo não é armazenar `X` nos Nodes.

O algoritmo deriva `X` dos Time Slots.

Por exemplo:

```text
T0 -> X = 0
T1 -> X = 1
T2 -> X = 2
T3 -> X = 3
```

Todos os Nodes de um mesmo Time Slot recebem o mesmo X:

```text
A1 -> X=0
B1 -> X=0
C1 -> X=0

B2 -> X=1

B3 -> X=2
C2 -> X=2

A2 -> X=3
B4 -> X=3
```

O eixo X, portanto, é uma **projeção da ordem temporal**.

---

# 7. Reconstrução do eixo Y

O eixo Y pode ser derivado da posição da `Line`.

Exemplo:

```text
Line A -> Y = 0
Line B -> Y = 1
Line C -> Y = 2
```

Assim:

```text
A1 -> (0, 0)
B1 -> (0, 1)
C1 -> (0, 2)
B2 -> (1, 1)
B3 -> (2, 1)
C2 -> (2, 2)
A2 -> (3, 0)
B4 -> (3, 1)
```

O `Y` também não precisa ser persistido no Node.

---

# 8. Relação com um grafo temporal

Depois de resolver os Alignments, pode-se enxergar o problema como um grafo direcionado acíclico de momentos temporais.

Exemplo:

```text
T0 -> T1 -> T2 -> T3
```

As Relations originais são usadas para descobrir as restrições desse grafo.

Por exemplo:

```text
A1 -> A2
B1 -> B2
B2 -> B3
B3 -> B4
C1 -> C2
```

considerando os Alignments:

```text
A1,B1,C1 = T0
B2       = T1
B3,C2    = T2
A2,B4    = T3
```

essas Relations podem ser projetadas para relações entre Time Slots:

```text
T0 -> T3
T0 -> T1
T1 -> T2
T2 -> T3
T0 -> T2
```

A partir dessas restrições, o backend pode obter uma ordenação temporal válida.

O importante é que o layout não precisa interpretar diretamente as coordenadas visuais. Ele trabalha primeiro sobre a ordem temporal.

---

# 9. Inserção de um novo Node

Considere o estado:

```text
        X
        0   1   2   3

A       A1-----------A2
        ●             ●

B       B1--B2--B3--B4
        ●   ●   ●   ●

C       C1-------C2
        ●        ●
```

Agora uma ação cria um novo Node `A3` na Line A.

Além disso, a ação informa as relações:

```text
A1 -> A3
A3 -> A2
A3 -> B2
```

A intenção semântica é:

> A3 acontece depois de A1, antes de A2 e antes de B2.

O backend não precisa dizer ao front-end:

```text
"coloque A3 em X=1"
```

Isso seria uma consequência visual, não uma regra de domínio.

O backend altera o modelo semântico:

```text
A1 -> A3 -> A2

A1 -> ...
A3 -> B2
```

Depois disso, a estrutura temporal é reconstruída.

Se a nova ordem temporal resultante for:

```text
T0 -> T1 -> T2 -> T3 -> T4
```

então o layout poderá derivar:

```text
T0 -> X=0
T1 -> X=1
T2 -> X=2
T3 -> X=3
T4 -> X=4
```

Não é necessário alterar manualmente o X de todos os Nodes existentes.

---

# 10. Regra importante: ações alteram o modelo, não o layout

Uma ação deve expressar uma intenção semântica.

Exemplos conceituais:

```text
CreateNode
MoveNode
DeleteNode
CreateRelation
DeleteRelation
CreateAlignment
RemoveAlignment
```

A implementação concreta pode usar outros nomes.

A regra é:

```text
Ação
  -> altera modelo semântico
  -> valida consistência
  -> reconstrói estrutura temporal
  -> reconstrói layout
  -> devolve estado completo
```

O front-end não precisa executar uma segunda etapa de sincronização local.

---

# 11. Fluxo de uma ação

Exemplo: usuário adiciona `A3`.

```text
FRONT
  |
  | comando / ação
  v
BACKEND
  |
  | 1. interpreta a ação
  | 2. altera Nodes / Relations / Alignments
  | 3. valida o novo modelo
  | 4. resolve Alignments
  | 5. constrói Time Slots
  | 6. calcula ordem temporal
  | 7. calcula X/Y
  | 8. monta payload completo
  v
FRONT
  |
  | recebe estrutura completa
  v
RENDER
```

O front-end não precisa descobrir o impacto da alteração.

---

# 12. O front-end como renderer

O front-end deve ser tratado como uma projeção visual do estado fornecido pelo backend.

Conceitualmente:

```text
Backend State
      |
      v
Renderer
      |
      v
Tela
```

Não:

```text
Usuário
  |
  v
Frontend calcula mudança
  |
  v
Frontend salva mudança
  |
  v
Backend tenta reconciliar
```

O segundo modelo cria duas fontes de lógica.

No modelo proposto, a lógica de domínio e de reconstrução permanece centralizada no backend.

---

# 13. Payload de renderização

O backend pode continuar mantendo o modelo semântico separado do payload de renderização.

Exemplo conceitual:

```json
{
  "lines": [
    { "id": "A", "y": 0 },
    { "id": "B", "y": 1 },
    { "id": "C", "y": 2 }
  ],

  "nodes": [
    { "id": "A1", "line": "A", "x": 0, "y": 0 },
    { "id": "A2", "line": "A", "x": 3, "y": 0 },
    { "id": "B1", "line": "B", "x": 0, "y": 1 },
    { "id": "B2", "line": "B", "x": 1, "y": 1 },
    { "id": "B3", "line": "B", "x": 2, "y": 1 },
    { "id": "B4", "line": "B", "x": 3, "y": 1 },
    { "id": "C1", "line": "C", "x": 0, "y": 2 },
    { "id": "C2", "line": "C", "x": 2, "y": 2 }
  ]
}
```

Esse payload é derivado. Ele não precisa ser a fonte de verdade persistida.

---

# 14. Pipeline do algoritmo

A implementação pode ser organizada aproximadamente assim:

```text
Semantic Model
    |
    +--> Nodes
    +--> Lines
    +--> Relations
    +--> Alignments
    |
    v
Resolve Alignments
    |
    v
Build Time Slots
    |
    v
Build Temporal Graph
    |
    v
Topological Ordering / Temporal Layering
    |
    v
Assign X
    |
    v
Assign Y from Lines
    |
    v
Build Render Tree / Render State
```

O algoritmo de layout pode evoluir depois sem alterar o modelo semântico.

---

# 15. Invariantes importantes

Algumas regras devem permanecer verdadeiras após qualquer ação válida:

1. Um Node pertence a uma única `Line`.
2. Um Node pode participar de no máximo um grupo de simultaneidade, caso o domínio adote essa regra.
3. Nodes alinhados possuem o mesmo X no layout derivado.
4. Uma Relation `A -> B` exige que A não apareça depois de B temporalmente.
5. Relations não podem formar ciclos, caso o domínio seja temporalmente acíclico.
6. Coordenadas não são fonte de verdade do domínio.
7. O backend é responsável por reconstruir o estado completo após uma ação.

---

# 16. Conceito central da arquitetura

A ideia pode ser resumida em uma frase:

> **O usuário altera relações semânticas; o backend transforma essas relações em uma ordem temporal e somente então deriva a posição visual.**

Assim, o sistema não precisa pensar em termos de:

```text
"mover o Node para X=4"
```

mas em termos de:

```text
"A3 acontece depois de A1 e antes de B2"
```

O `X=4` é uma consequência calculada pelo backend.

---

# 17. Separação final de responsabilidades

## Domínio

```text
Line
Node
Relation
Alignment
```

Define o significado da estrutura.

## Motor temporal

```text
Alignment resolution
Time Slots
Temporal Graph
Ordering
```

Determina a ordem temporal derivada.

## Motor de layout

```text
X
Y
Node positions
Render tree/state
```

Transforma a ordem temporal em uma estrutura visual.

## Front-end

```text
Receive complete state
Render
Send actions
```

O front-end não precisa conhecer as regras internas usadas para calcular o estado final.
