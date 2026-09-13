# Core Structure

Natlas provides the writer with three fundamental structural concepts:

* **Lines**
* **Nodes**
* **Alignments**

Relations connect nodes and define how they relate to one another within the story structure.

Together, these elements form the basic structure through which a story can be modeled.

The model can be understood somewhat like a Git flow: lines represent different dimensions or perspectives of the story, while nodes represent specific points along those lines. However, unlike a traditional branch graph, Natlas organizes these elements through a **spatial alignment matrix**.

The purpose of this matrix is to allow different lines to share the same positions along the story's progression.

---

## Lines and Nodes

A **Line** represents a distinct narrative dimension within a story.

A story can contain multiple lines, and each line contains its own sequence of nodes.

For example:

```text
Line A:  1 ─── 2 ─── 3
Line B:  4 ─── 5 ─── 6
```

Although the nodes have different identities and belong to different lines, their positions can be aligned.

This creates three shared **story positions**:

```text
Position 1:  1 ─── 4
Position 2:  2 ─── 5
Position 3:  3 ─── 6
```

The important concept here is that a position does not belong exclusively to one line. It represents a location in the overall progression of the story, which can be occupied by elements from multiple lines.

For example, the writer could work on the second story position:

```text
Line A:  1 ─── [2] ─── 3
Line B:  4 ─── [5] ─── 6
```

The writer is therefore not simply working on node `2` or node `5`. They are working on **the second position of the story**, where those two nodes coexist.

This distinction becomes important as more lines and structural dimensions are introduced.

---

## The Main Text Line

There is one special line that always exists in Natlas: the **Main Text Line**.

Unlike other lines, this line represents the actual textual progression of the story.

For example, suppose the previous structure contains:

* Line A
* Line B
* Main Text Line

The Main Text Line is always positioned at the bottom of the structure and cannot be removed.

Its nodes represent the actual pieces of writing that make up the story.

Therefore, if the writer wants to write at the second story position, the corresponding text node would exist on the Main Text Line:

```text
Line A:        1 ─── 2 ─── 3
Line B:        4 ─── 5 ─── 6
Main Text:     ───── Text ─────
                       ↑
                   Story Position 2
```

This creates a fundamental separation between **modeling the story** and **writing the story**.

The upper lines describe and organize aspects of the story, while the Main Text Line contains the actual prose.

---

# Nodes

A **Node** represents a specific point within a Line.

Nodes are associated with the Line they belong to.

Natlas currently defines two concrete types of nodes:

* **StoryNode**
* **GapNode**

`Node` itself is an abstract concept and is not instantiated directly.

Conceptually:

```text
Node
├── StoryNode
└── GapNode
```

---

## Story Nodes

A **StoryNode** represents a meaningful point in the story.

It contains a title and belongs to a specific Line.

For example:

```text
Line A:

[Beginning] ─── [Conflict] ─── [Resolution]
```

Each of these elements can be represented by a `StoryNode`.

The exact narrative meaning of a StoryNode depends on the writer's modeling needs.

---

# Gap Nodes

A **GapNode** represents an interval between meaningful story points.

A simple line can therefore be understood conceptually as:

```text
[GapNode] ─── [StoryNode 1] ─── [GapNode] ─── [StoryNode 2] ─── [GapNode]
```

The gaps are important because they provide positions that other lines can align against.

Consider the following structure:

```text
Line A:  (Gap) ─── 1 ─────────── (Gap) ─── 2 ─── (Gap) ─── 3
Line B:  (Gap) ─── 4 ─── (Gap) ─── 5 ─── (Gap)
```

Here, node `5` is aligned with a gap in Line A rather than directly with node `2`.

This means that `5` occupies a position **between the positions of `1` and `2`**.

The gap therefore acts as a structural reference point.

It allows different lines to express different levels of temporal or structural resolution without forcing every node to correspond directly to another node.

---

## Gap Sizes

Natlas defines three intentional gap sizes:

* **Short**
* **Medium**
* **Long**

These are represented by the `GapSize` value of a `GapNode`.

```text
GapNode
└── GapSize
    ├── SHORT
    ├── MEDIUM
    └── LONG
```

A **Short Gap**, **Medium Gap**, or **Long Gap** indicates that the writer considers the interval between two nodes meaningful in terms of the amount of story progression occurring there.

For example:

```text
1 ──[Short]── 2

2 ─────[Medium]───── 3

3 ───────────[Long]─────────── 4
```

These intervals can represent different scales of progression.

A short gap might represent a few minutes or a single scene transition.

A medium gap might represent several days or a sequence of events that does not need to be described in detail.

A long gap might represent months or years passing between two important points.

The exact interpretation is left to the writer. The important information is the **relative scale of the interval**.

These gaps can also be used as alignment targets by other lines, just like other structural positions.

---

# Relations

A **Relation** connects two nodes.

A relation has:

* a source node
* a target node
* a relation type

Conceptually:

```text
Node A ─── Relation ───> Node B
```

Relations are independent objects within the story and allow the structure to express connections between nodes.

Natlas currently defines two relation types:

* **NEXT**
* **LINE**

```text
Relation
└── RelationType
    ├── NEXT
    └── LINE
```

---

## Next Relations

A `NEXT` relation represents the normal progression from one node to another.

```text
Node A ─── NEXT ───> Node B
```

This expresses that Node B follows Node A in the narrative structure.

---

## Branch Relations

A `BRANCH` relation represents a divergence in the story.

A fork therefore does not need to exist as a separate entity in the model.

Instead, a fork emerges when multiple `BRANCH` relations originate from the same node.

For example:

```text
             ┌─── BRANCH ───> Node B
Node A ──────┤
             └─── BRANCH ───> Node C
```

Here, Node A is the origin of two possible directions.

This can be extended to any number of alternatives:

```text
             ┌───> Node B
             │
Node A ──────┼───> Node C
             │
             └───> Node D
```

The important distinction is that the **fork is a structural consequence of the relations**, rather than an independent object that needs to be modeled.

This allows the same model to represent both simple progression and more complex branching structures.

---

## Consequence Relations

A `CONSEQUENCE` relation represents a narrative consequence between two nodes.

```text
Node A ─── CONSEQUENCE ───> Node B
```

Unlike a `NEXT` relation, a consequence does not necessarily mean that the target node is simply the next element in the story's progression.

It represents a meaningful causal or consequential relationship between two nodes.

---

# Alignments

An **Alignment** represents a shared story position containing nodes from potentially different lines.

An alignment contains a collection of nodes:

```text
Alignment
└── nodes[]
```

For example:

```text
Line A:  1 ─── 2 ─── 3
Line B:  4 ─── 5 ─── 6

Alignment 1 → [1, 4]
Alignment 2 → [2, 5]
Alignment 3 → [3, 6]
```

The nodes remain members of their respective Lines, while the Alignment expresses their shared position within the overall story progression.

Therefore, an Alignment does not replace the relationship between a Node and its Line.

Instead, it provides another structural dimension:

```text
Node
 ├── belongs to → Line
 └── participates in → Alignment
```

This distinction allows the same node to retain its narrative identity while also participating in the shared spatial structure.

---

# Fillers

A **Filler** is an element used by the alignment system to occupy matrix space.

A Filler does not represent any story matter. It has no narrative meaning by itself and does not describe an event, concept, or interval.

Its only purpose is to **occupy space in the matrix so that other elements can be aligned correctly**.

For example, suppose one line contains a larger gap than another:

```text
Line A:  A ─────────────── B

Line B:  C ─── D
```

The alignment system may need additional positions between `C` and `D` so that `D` can occupy the correct position relative to the gap between `A` and `B`.

Those additional positions can be represented by Fillers.

Fillers therefore belong to the **spatial alignment mechanism**, rather than representing meaningful story content.

A useful way to think about them is:

> **A GapNode represents an interval. A Filler represents the space required to position that interval correctly.**

Fillers allow lines with different structures to coexist inside the same alignment matrix without forcing every position to contain meaningful story content.

---

# The Alignment Matrix

All of these concepts — lines, nodes, gap nodes, relations, alignments, and fillers — ultimately participate in a common **alignment matrix**.

The matrix provides the spatial framework that determines where each element exists relative to the others.

This means that Natlas does not treat the story simply as a collection of independent lines.

Instead, each line participates in a shared spatial structure.

The result is a model in which the writer can see not only **what exists**, but also **where each element exists in relation to everything else**.

The structure can therefore be understood through several complementary dimensions:

```text
Story
│
├── Lines
│   └── Nodes
│       ├── StoryNode
│       └── GapNode
│
├── Relations
│   ├── NEXT
│   └── LINE
│
└── Alignments
    └── Nodes
```

The alignment matrix provides the spatial organization that brings these concepts together.

It is the foundation upon which Natlas's story modeling capabilities are built.
