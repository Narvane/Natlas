# Core Structure

Natlas provides the writer with three fundamental structural elements:

- **Lines**
- **Branches**
- **Nodes**

Together, these elements form the basic structure through which a story can be modeled.

The model can be understood somewhat like a Git flow: branches represent different dimensions or perspectives of the story, while nodes represent specific points along those branches. However, unlike a traditional branch graph, Natlas organizes these elements through a **spatial alignment matrix**.

The purpose of this matrix is to allow different branches to share the same positions along the story's progression.

## Branches and Nodes

Consider a story with two branches:

- Branch A
- Branch B

Suppose each branch contains three nodes:

```
Branch A:  1 ─── 2 ─── 3
Branch B:  4 ─── 5 ─── 6
```

Although the nodes have different identities and belong to different branches, their positions can be aligned.

This creates three shared **story positions**:

```
Position 1:  1 ─── 4
Position 2:  2 ─── 5
Position 3:  3 ─── 6
```

The important concept here is that a position does not belong exclusively to one branch. It represents a location in the overall progression of the story, which can be occupied by elements from multiple branches.

For example, the writer could work on the second story position:

```
Branch A:  1 ─── [2] ─── 3
Branch B:  4 ─── [5] ─── 6
```

The writer is therefore not simply working on node `2` or node `5`. They are working on **the second position of the story**, where those two nodes coexist.

This distinction becomes important as more branches and structural dimensions are introduced.

---

## The Main Text Branch

There is one special branch that always exists in Natlas: the **Main Text Branch**.

Unlike other branches, this branch represents the actual textual progression of the story.

For example, suppose the previous structure contains:

- Branch A
- Branch B
- Main Text Branch

The Main Text Branch is always positioned at the bottom of the structure and cannot be removed.

Its nodes represent the actual pieces of writing that make up the story.

Therefore, if the writer wants to write at the second story position, the corresponding text node would exist on the Main Text Branch:

```
Branch A:        1 ─── 2 ─── 3
Branch B:        4 ─── 5 ─── 6
Main Text:       ───── Text ─────
                         ↑
                    Story Position 2
```

This creates a fundamental separation between **modeling the story** and **writing the story**.

The upper branches describe and organize aspects of the story, while the Main Text Branch contains the actual prose.

---

## Forks

Branches are not restricted to having a single node at each story position.

A branch may contain multiple nodes occupying the same position. These are called **Forks**.

A fork represents the possibility of multiple directions existing at the same point in a branch.

For example:

```
Branch A:  1 ─── 2.1
                 2.2 ─── 3

Branch B:  4 ─── 5 ─── 6
```

Here, Branch A has two possible nodes at the second story position:

- `2.1`
- `2.2`

These can be understood as two alternatives or directions originating from the same position.

The Main Text Branch must preserve this structure when aligning with other branches.

Therefore, if one branch contains a fork at a particular position, the Main Text Branch can contain the corresponding number of nodes at that same position:

```
Branch A:       1 ─── 2.1 ─── 3
                     2.2 ───

Branch B:       4 ─── 5 ───── 6

Main Text:      ───── Text 1 ─────
                     Text 2 ─────
```

Both `2.1` and `2.2` are aligned with `5`, producing two possible combinations at that story position.

The same principle applies when multiple branches contain forks.

For example:

```
Branch A:  1 ─── 2.1 / 2.2 ─── 3
Branch B:  4 ─── 5.1 / 5.2 ─── 6
```

The resulting Main Text Branch can represent all combinations:

```
2.1 ─── 5.1
2.2 ─── 5.1
2.1 ─── 5.2
2.2 ─── 5.2
```

This allows the structure to represent branching possibilities without abandoning the common spatial progression of the story.

---

# Gap Nodes

Another important concept in the structure is the **Gap Node**.

A normal node does not exist in isolation. It is surrounded by gaps that represent the space between neighboring nodes.

A simple branch therefore looks conceptually like:

```
(Gap) ─── 1 ─── (Gap) ─── 2 ─── (Gap) ─── 3 ─── (Gap)
```

The gaps are important because they provide positions that other branches can align against.

Consider the following structure:

```
Branch A:  (Gap) ─── 1 ─────────── (Gap) ─── 2 ─── (Gap) ─── 3
Branch B:  (Gap) ─── 4 ─── (Gap) ─── 5 ─── (Gap)
```

Here, node `5` is aligned with a gap in Branch A rather than with node `2`.

This means that `5` occupies a position **between the positions of `1` and `2`**.

The gap therefore acts as a structural reference point.

It allows different branches to express different levels of temporal or structural resolution without forcing every node to correspond directly to another node.

---

## Types of Gaps

Natlas provides four types of gaps:

- **Normal Gap**
- **Short Gap**
- **Medium Gap**
- **Long Gap**

A **Normal Gap** represents ordinary separation between two nodes.

It does not necessarily imply that something meaningful happens within that interval. Its primary purpose is structural: it provides a position that other elements can align with.

For example:

```
1 ─────────── 2
        ↑
     Normal Gap
```

The other three types represent **intentional intervals** defined by the writer.

A **Short Gap**, **Medium Gap**, or **Long Gap** indicates that the writer considers the interval between two nodes meaningful in terms of the amount of story progression occurring there.

For example:

```
1 ──[Short]── 2

2 ─────[Medium]───── 3

3 ───────────[Long]─────────── 4
```

These intervals can represent different scales of progression.

A short gap might represent a few minutes or a single scene transition.

A medium gap might represent several days or a sequence of events that does not need to be described in detail.

A long gap might represent months or years passing between two important points.

The exact interpretation is left to the writer. The important information is the **relative scale of the interval**.

These gaps can also be used as alignment targets by other branches, just like normal gap positions.

A gap, however, must always exist between nodes on the same branch. Gaps cannot be directly connected to other gaps within the same branch.

---

## Fillers

Another element that can occupy a position in the alignment matrix is a **Filler**.

A Filler does not represent any story matter. It has no narrative meaning by itself and does not describe an event, concept, or interval. Its only purpose is to **occupy space in the matrix so that other elements can be aligned correctly**.

Consider the following structure:

```
- A — (Gap) — B
- C
```

Now suppose we want to place node `D` on a **Short Gap** in the second branch, while keeping that gap aligned with the gap between `A` and `B`.

If a Short Gap occupies 3 matrix positions, the structure could look like this:

```
- A — (Filler) — (Filler) — (Filler) — (Gap) — (Filler) — (Filler) — (Filler) — B
- C — (Filler) — (Gap) — (Filler) — D
```

The exact number of positions occupied by a gap depends on its type. For example:

- **Short Gap:** 3 positions
- **Medium Gap:** 5 positions
- **Long Gap:** 7 positions

These values are always odd so that the actual Gap Node can occupy the **central position** of the interval.

In the example above, the Short Gap in the second branch needs to be aligned with the Gap between `A` and `B`. Because the second branch starts at a different position, Fillers are inserted to occupy the remaining matrix positions.

The same happens around the Gap itself. Since the gap occupies 3 positions, one position is used by the Gap Node and the remaining positions are represented by Fillers on either side, keeping the Gap Node centered within its interval.

Fillers therefore allow branches with different structures to coexist inside the same alignment matrix without forcing every position to contain meaningful story content.

A useful way to think about them is:

> **A Gap represents an interval. A Filler represents the space required to position that interval correctly.**

Fillers are therefore an implementation of **spatial alignment**, not a part of the story itself. They exist so that the matrix can preserve the relative position of meaningful elements across different branches.

---

# The Alignment Matrix

All of these concepts — branches, nodes, forks, and gaps — are ultimately managed by a common **alignment matrix**.

The matrix provides the spatial framework that determines where each element exists relative to the others.

This means that Natlas does not treat the story simply as a collection of independent branches.

Instead, each branch participates in a shared spatial structure.

The result is a model in which the writer can see not only **what exists**, but also **where each element exists in relation to everything else**.

This shared alignment is the foundation upon which the rest of Natlas's story modeling capabilities are built.