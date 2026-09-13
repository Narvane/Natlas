# Domain Model and Backend/Frontend Separation

## Overview

Natlas will be structured around the idea that a story is fundamentally a **narrative graph**, rather than a traditional hierarchical tree.

The backend will be responsible for representing and persisting the **meaning and structure of the story**, while the frontend will be responsible for determining **how that structure is spatially organized and visually rendered**.

This separation prevents visual concerns, such as matrix positions or React Flow coordinates, from becoming part of the core narrative model.

---

# 1. Backend: Narrative Model

The backend will contain the information that represents the actual structure and meaning of the story.

The main concepts are:

```text
Story
 ├── Line
 │    └── Node
 │         ├── StoryNode
 │         └── GapNode
 │
 ├── Relation
 │
 └── Alignment
```

### Story

Represents the story as a whole.

A Story contains its Lines, Relations, and Alignments.

### Line

Represents a narrative path or timeline within the story.

A Line contains Nodes.

A Line does not represent a visual row or spatial position. It is a narrative concept that identifies a sequence or perspective within the story.

### Node

Represents a point within a Line.

Nodes are the fundamental elements used to represent the progression of the story.

The Node hierarchy is:

```text
Node
├── StoryNode
└── GapNode
```

### StoryNode

Represents an actual narrative element.

For example, a StoryNode may represent a scene, event, or other meaningful point in the story.

A StoryNode contains narrative information such as its title.

### GapNode

Represents an intentional interval within a Line.

Unlike a StoryNode, a GapNode does not represent narrative content. Its purpose is to represent a gap in the narrative progression.

A GapNode has a size:

```text
SHORT
MEDIUM
LONG
```

The size represents the relative length of the gap within Natlas' spatial model.

### Relation

Represents an explicit relationship between two Nodes.

For example:

```text
Node A → Node B
```

A Relation connects a source Node to a target Node and has a type that defines its meaning.

Current relation types are:

```text
NEXT
LINE
```

The set of relation types may evolve as the narrative model develops.

The important principle is that relationships between Nodes are represented explicitly rather than being hidden inside nested child objects.

---

# 2. Forks

A fork is a **structural concept**, not a separate domain entity.

A fork occurs when a Node has multiple outgoing `BRANCH` Relations.

For example:

```text
                 ┌── BRANCH ──> Node B
                 │
Node A ──────────┤
                 │
                 └── BRANCH ──> Node C
```

There is therefore no need for a `Fork` class in the domain model.

The fork is simply the structure that emerges from the Relations between Nodes.

This keeps the model focused on the fundamental elements that actually need to be persisted.

---

# 3. Alignment

An Alignment is a first-class domain entity.

An Alignment represents Nodes that share the same narrative alignment.

For example:

```text
Alignment
 ├── Node A2
 ├── Node B3
 └── Node C1
```

The Nodes may belong to different Lines while still participating in the same Alignment.

The relationship is therefore represented by the Alignment itself rather than through mutual references between Nodes.

Instead of:

```text
A2 → B3
B3 → A2
```

the model represents:

```text
Alignment X
 ├── A2
 └── B3
```

This allows an Alignment to contain two or more Nodes without creating circular references between Node objects.

Alignment is therefore part of the narrative model, even though its information will later be used by the frontend to determine spatial positioning.

---

# 4. The Backend Represents the Narrative Graph

The persisted domain model should be understood as a **narrative graph**.

Conceptually:

```text
              Node
             /    \
            ↓      ↓
         Node     Node
           │
           ↓
         Node
```

The connections between Nodes are represented explicitly through Relations.

Therefore, the backend should not depend on a deeply nested tree structure such as:

```text
Node
 └── children
      └── children
           └── children
```

Instead, the graph is composed of independent domain concepts:

```text
Nodes
Relations
Alignments
```

This allows the backend to work directly with the graph model rather than having to transform a hierarchical tree into a graph later.

---

# 5. Frontend: Spatial Model

The organization of Nodes within the visual matrix will be handled by the frontend.

The backend will not store visual coordinates such as:

```text
x = 500
y = 300
```

Nor will matrix positions necessarily be persisted as part of the narrative domain.

The backend describes:

> **What exists and how the elements are related.**

The frontend determines:

> **How those elements should be organized spatially.**

This distinction is important because the same narrative model may potentially be represented using different spatial arrangements or visualizations.

---

# 6. Matrix and Spatial Positioning

The frontend will be responsible for concepts related to spatial organization, such as:

```text
Matrix
MatrixPosition
Row
Column
Filler
```

These concepts belong to the spatial representation rather than the narrative domain.

Based on the Nodes, Lines, and Alignments received from the backend, the frontend will construct the matrix required for visualization.

For example:

```text
              Line A      Line B      Line C

Position 1       A1          B1

Position 2       A2          B2          C1

Position 3       A3
```

In this example, `A2`, `B2`, and `C1` may belong to the same Alignment in the narrative model.

The frontend uses that information to determine that those Nodes should occupy the same spatial position within the matrix.

The actual matrix position is therefore a consequence of the narrative model and the frontend's positioning rules, rather than information that needs to be stored by the backend.

---

# 7. PositionTransposer

The `PositionTransposer` will be responsible for transforming the narrative model received from the backend into the spatial representation used by the frontend.

Conceptually:

```text
Backend
   │
   ├── Nodes
   ├── Lines
   ├── Relations
   └── Alignments
          │
          ↓
   PositionTransposer
          │
          ↓
       Matrix
          │
          ↓
    React Flow
```

The `PositionTransposer` determines where each Node should be placed within the matrix according to Natlas' spatial rules.

The resulting matrix positions can then be translated into the actual coordinates required by React Flow.

The `PositionTransposer` therefore belongs to the frontend and acts as the boundary between the **narrative representation** and the **spatial representation**.

---

# 8. Separation of Domain and Presentation

The architecture will follow three conceptual levels.

## Narrative Model

Represents the meaning and structure of the story.

```text
Story
Line
Node
├── StoryNode
└── GapNode
Relation
Alignment
```

## Spatial Model

Represents how the narrative structure is organized spatially.

```text
Matrix
MatrixPosition
Row
Column
Filler
```

## Rendering Model

Represents how the spatial model is rendered by the interface.

For React Flow, this includes concepts such as:

```text
React Flow Node
React Flow Edge
x
y
width
height
handles
```

The backend will be responsible for the **Narrative Model**.

The frontend will be responsible for the **Spatial Model** and the **Rendering Model**.

---

# 9. Core Principle

The main architectural principle is:

> **The backend stores what the story is. The frontend decides how the story is visualized.**

Therefore:

```text
"Node A2 is aligned with Node B3"
```

is narrative information and belongs to the backend.

Whereas:

```text
"A2 and B3 occupy matrix position [3,5]"
```

is a spatial decision and belongs to the frontend.

And:

```text
"A2 is rendered at x=420, y=280"
```

is a rendering decision and belongs to React Flow/the frontend.

The three statements describe different levels of the system and should not be mixed.

---

# 10. API Representation

The backend API should expose the information necessary for the frontend to reconstruct the narrative model.

Conceptually, the representation may contain:

```json
{
  "story": {},
  "lines": [],
  "relations": [],
  "alignments": []
}
```

The exact API representation does not need to mirror the internal domain classes exactly.

What matters is that the API provides the narrative information required by the frontend, without introducing spatial or rendering concerns into the backend.

The frontend can then construct its own spatial representation from that information.

---

# 11. Benefits

This approach provides several benefits:

* The persisted model represents a graph rather than an artificial hierarchy.
* Relationships between Nodes are explicit.
* Forks emerge naturally from `BRANCH` Relations without requiring a separate entity.
* Alignments are first-class domain entities.
* Alignments do not require circular references between Nodes.
* The backend remains independent from the visual implementation.
* The frontend can change its positioning rules without changing the narrative model.
* The matrix can evolve independently from the database model.
* React Flow remains a rendering layer rather than becoming part of the domain model.
* Different visualizations can potentially be created from the same narrative model.
* Spatial concerns such as coordinates and fillers do not pollute the narrative domain.
* The backend can evolve according to narrative requirements rather than the constraints of a particular frontend library.

---

# Architectural Decision

Natlas will use a **graph-oriented narrative domain model in the backend**, with Lines, Nodes, Relations, and Alignments represented explicitly.

The Node hierarchy is:

```text
Node
├── StoryNode
└── GapNode
```

Relations connect Nodes explicitly, with their type defining the meaning of the connection.

A narrative fork is not represented as a separate entity. It emerges from multiple `BRANCH` Relations originating from the same Node.

**Alignments will be first-class domain entities**, allowing multiple Nodes — potentially from different Lines — to participate in the same alignment without creating circular references between Node objects.

The **matrix and spatial positioning will be handled by the frontend**, calculated from the narrative information received from the backend.

This establishes a clear separation:

```text
BACKEND
"What is the structure of the story?"

        ↓

FRONTEND
"How should that structure be spatially organized?"

        ↓

REACT FLOW
"How should that organization be rendered?"
```

This approach will be used as the architectural basis for the development of Natlas.
