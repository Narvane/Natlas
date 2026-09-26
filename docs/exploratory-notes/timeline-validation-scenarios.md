# Timeline — Regras e Cenários de Validação

## 1. Objetivo

Este documento define cenários para validar o modelo de timeline baseado em:

- `Line`
- `Node`
- `Relation`
- `Alignment`
- `Interval`

A finalidade é verificar se a construção temporal e posicional consegue representar corretamente ordem, simultaneidade e distância sem acoplar essas regras ao mecanismo de renderização.

---

## 2. Regras fundamentais

### 2.1 Relation

Uma `Relation` define uma ordem obrigatória entre dois eventos.

```text
A1 → A2
```

Significa que `A1` deve ocorrer antes de `A2`.

---

### 2.2 Alignment

Um `Alignment` define que dois ou mais nodes representam o mesmo instante temporal.

```text
A1 = B1 = C1
```

Regra:

```text
A1.x == B1.x == C1.x
```

O alinhamento é uma restrição rígida: não pode ser quebrado para acomodar um intervalo.

---

### 2.3 Interval

Um `Interval` define a distância mínima entre dois eventos temporalmente relacionados.

Valores conceituais:

```text
SHORT  = 3
MEDIUM = 5
LONG   = 7
```

Esses valores representam **mínimos**, não distâncias absolutas.

Portanto, para:

```text
A1 -- LONG -- A2
```

vale:

```text
A2.x - A1.x >= 7
```

A distância efetiva pode ser maior que `7` caso outras restrições exijam isso.

---

## 3. Prioridade das restrições

O algoritmo deve tratar as regras em diferentes níveis.

### Hard constraints

Devem sempre ser satisfeitas:

```text
Alignment → nodes alinhados possuem o mesmo X
Relation  → a ordem temporal declarada precisa ser preservada
```

### Minimum constraints

Podem ser expandidas:

```text
Interval → define apenas uma distância mínima
```

Exemplo:

```text
B2 ---- LONG ---- B3
```

Se alguma outra restrição fizer `B3` precisar estar mais distante, o resultado pode ser:

```text
B2 -------- B3
```

sem que o intervalo deixe de ser `LONG`.

---

## 4. Princípio principal do posicionamento

O algoritmo não deve tentar manter os intervalos rigidamente iguais aos valores `3`, `5` e `7`.

Ele deve procurar um posicionamento que satisfaça:

```text
ordem
+
alinhamento
+
distâncias mínimas
```

Portanto:

```text
Intervalo declarado = restrição mínima
Posição final       = resultado das restrições combinadas
```

---

# 5. Cenários de validação

## 5.1 Linha simples

### Entrada

```text
A1 ---- SHORT ---- A2
```

### Esperado

```text
A2.x >= A1.x + 3
```

Não há outra restrição interferindo no posicionamento.

---

## 5.2 Linha com intervalos diferentes

### Entrada

```text
A1 -- SHORT -- A2 ----- LONG ----- A3
```

### Esperado

```text
A2.x >= A1.x + 3
A3.x >= A2.x + 7
```

---

## 5.3 Alignment básico

### Entrada

```text
A1
 |
 B1
```

Com:

```text
Alignment(A1, B1)
```

### Esperado

```text
A1.x == B1.x
```

---

## 5.4 Alignment após um intervalo

### Entrada

```text
A1 -- LONG -- A2
             |
             B2
```

Com:

```text
Alignment(A2, B2)
```

### Esperado

```text
A2.x == B2.x
A2.x >= A1.x + 7
```

O alinhamento não é deslocado para respeitar uma distância rígida; a posição do conjunto é calculada respeitando as duas regras.

---

## 5.5 Gap causando expansão

### Entrada

```text
B2 -------- LONG -------- B3
                           |
                           C2
```

Com:

```text
Alignment(B3, C2)
```

### Esperado

```text
B3.x == C2.x
B3.x >= B2.x + 7
```

Se outra linha precisar que `C2` fique ainda mais à direita, o intervalo `LONG` será expandido.

---

## 5.6 Vários nodes alinhados

### Entrada

```text
A1 = B1 = C1
```

### Esperado

```text
A1.x == B1.x == C1.x
```

O alinhamento deve ser tratado como um grupo, e não como uma coleção de pares independentes.

---

## 5.7 Node sem alignment

### Entrada

```text
A1 ---- A2

B1 ---- B2
```

Sem `Alignment` entre as linhas.

### Esperado

Cada linha deve respeitar suas próprias relações e intervalos. Não existe obrigação de igualdade entre seus X.

---

## 5.8 Inserção entre dois eventos

### Estado inicial

```text
A1 -------- A2
```

### Nova ação

Inserir `A3`:

```text
A1 → A3 → A2
```

### Esperado

Um novo momento temporal deve ser criado entre `A1` e `A2`.

```text
T0     T1     T2
A1     A3     A2
```

Nodes posteriores podem ter suas posições recalculadas.

---

## 5.9 Inserção cruzando linhas

### Estado

```text
A1 -------- A2

B1 ---- B2 ---- B3
```

### Nova regra

Criar `A3` com:

```text
A1 → A3 → A2
A3 → B2
```

### Esperado

`A3` precisa ocorrer depois de `A1` e antes de `B2`.

O algoritmo deve recalcular a distribuição temporal global em vez de simplesmente inserir `A3` em uma posição visual fixa.

---

## 5.10 Convergência de múltiplos caminhos

### Entrada

```text
A1 ----------→ A3

B1 ----→ B2 --→ A3
```

### Esperado

`A3` precisa respeitar simultaneamente os caminhos que chegam até ele.

Sua posição deve satisfazer todas as distâncias mínimas e relações precedentes.

---

## 5.11 Divergência

### Entrada

```text
        → A2
A1
        → B2
```

### Esperado

Tanto `A2` quanto `B2` devem ocorrer depois de `A1`.

Eles não precisam possuir o mesmo X, a menos que exista um `Alignment` determinando isso.

---

## 5.12 Alignment com caminhos de tamanhos diferentes

### Entrada

```text
A1 -- SHORT -- A2
                  |
                  X
                  |
B1 -- LONG -- B2 -+
```

Com:

```text
Alignment(A2, B2)
```

### Esperado

```text
A2.x == B2.x
```

A posição final deve ser suficientemente distante para satisfazer o caminho mais restritivo.

Um intervalo de uma das linhas pode terminar ocupando uma distância maior que sua distância mínima.

---

## 5.13 Ordem incompatível dentro da mesma Line

### Entrada

```text
A1 → A2
```

e simultaneamente:

```text
Alignment(A1, A2)
```

### Esperado

Estrutura inválida.

Não é possível satisfazer simultaneamente:

```text
A1 < A2
A1 == A2
```

---

## 5.14 Ciclo temporal

### Entrada

```text
A1 → B1 → A1
```

### Esperado

Estrutura inválida.

Não existe posicionamento temporal que satisfaça o ciclo.

---

## 5.15 Alignment impossível por ordem conflitante

### Entrada

```text
A1 → A2

B1 → A1

Alignment(A2, B1)
```

Isso exigiria simultaneamente:

```text
A1 < A2
B1 < A1
B1 == A2
```

### Esperado

Estrutura inválida, caso essas relações produzam uma contradição temporal.

O algoritmo deve detectar a inconsistência em vez de gerar coordenadas arbitrárias.

---

## 5.16 Intervalo longo + Alignment

### Entrada

```text
A1 -------- LONG -------- A2
                           |
                           B2
```

Com:

```text
Alignment(A2, B2)
```

### Esperado

```text
A2.x == B2.x
A2.x - A1.x >= 7
```

Se `B2` também estiver sujeito a outras restrições, o valor final pode ser maior que `7`.

---

## 5.17 Alignment entre eventos muito distantes

### Entrada

```text
A1 → A2 → A3 → A4 → A5
                         |
                         C5
```

Com:

```text
Alignment(A5, C5)
```

### Esperado

Todos os eventos intermediários continuam existindo e respeitando suas relações.

```text
A5.x == C5.x
```

O alinhamento não elimina os eventos anteriores nem compacta a linha artificialmente.

---

## 5.18 Múltiplos caminhos para o mesmo Node

### Entrada

```text
A1 ---- LONG ---- A3

B1 -- SHORT -- B2 ---- A3
```

### Esperado

`A3` precisa satisfazer simultaneamente as restrições provenientes de `A1` e `B2`.

A posição final é determinada pela maior restrição necessária para manter todas as relações válidas.

---

# 6. Invariantes que devem permanecer verdadeiros

Independentemente da estrutura criada ou da ação executada, o resultado final deve respeitar:

```text
1. Nodes alinhados possuem o mesmo X.

2. Se A → B, então B.x > A.x.

3. Se A → B possui intervalo I,
   então B.x - A.x >= minimum(I).

4. Um intervalo pode ser expandido, mas nunca reduzido abaixo de seu mínimo.

5. A posição Y é determinada pela Line do Node.

6. Alterações de posição não alteram a identidade dos Nodes.

7. Alterações de layout não devem modificar as Relations ou Alignments do domínio.

8. Estruturas temporais impossíveis devem ser detectadas como inválidas.
```

---

# 7. Exemplo completo de validação

Considere:

```text
A: A1 ------------ A2
       \
        A3

B: B1 -- B2 -- B3 -- B4

C: C1 -------- C2
```

Com:

```text
Alignment(A1, B1, C1)
Alignment(B3, C2)
Alignment(A2, B4)

A1 → A3 → A2
B1 → B2 → B3 → B4
C1 → C2

A1 → A3 = MEDIUM
A3 → A2 = SHORT
B2 → B3 = LONG
```

O resultado precisa satisfazer, simultaneamente:

```text
A1.x == B1.x == C1.x
B3.x == C2.x
A2.x == B4.x

A3.x >= A1.x + 5
A2.x >= A3.x + 3
B3.x >= B2.x + 7
```

Não é necessário que o espaçamento visual final seja exatamente `5`, `3` e `7`. Esses valores representam os mínimos.

---

# 8. Relação com o algoritmo

Uma forma conceitual de organizar o processamento é:

```text
Domain Model
    │
    ├── Nodes
    ├── Lines
    ├── Relations
    ├── Alignments
    └── Intervals
          │
          ▼
    Resolve Alignment Groups
          │
          ▼
    Build Temporal Graph
          │
          ▼
    Validate Constraints
          │
          ▼
    Calculate Minimum X
          │
          ▼
    Expand X where necessary
          │
          ▼
    Assign Y according to Line
          │
          ▼
    Render-ready Tree / Structure
```

O frontend recebe apenas o resultado final dessa construção.

As ações do usuário devem alterar o modelo no backend. Após cada ação, o backend reconstrói a estrutura derivada e devolve ao frontend uma nova representação completa.

---

# 9. Ideia central

A timeline não deve ser interpretada como uma matriz de posições armazenada no domínio.

Ela deve ser interpretada como um conjunto de **restrições temporais**:

```text
Relations  → quem vem antes de quem
Alignments → quem acontece no mesmo instante
Intervals  → quanto espaço mínimo existe entre eventos
Lines      → em qual eixo vertical o evento pertence
```

As coordenadas finais são consequência dessas regras.

```text
Domain
  ↓
Temporal constraints
  ↓
Valid temporal structure
  ↓
Coordinates
```

Essa separação permite alterar o algoritmo de layout sem alterar o significado dos dados.
