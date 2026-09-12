# Domain Model and Backend/Frontend Separation

## Overview

Natlas will be structured around the idea that a story is fundamentally a **narrative graph**, rather than a traditional hierarchical tree.

The backend will be responsible for representing and persisting the **meaning and structure of the story**, while the frontend will be responsible for determining **how that structure is spatially organized and visually rendered**.

This separation prevents visual concerns, such as matrix coordinates or React Flow positions, from becoming part of the core narrative model.

---

# 1. Backend: Narrative Model

The backend will contain the information that represents the actual structure and meaning of the story.

The main concepts are:

```text
Story
 ├── Branch
 │    └── Node
 │
 ├── NodeRelation
 │
 └── Alignment
```

### Story

Represents the story as a whole.

A Story contains multiple Branches and their associated narrative elements.

### Branch

Represents a narrative path or timeline within the story.

A Branch contains Nodes.

### Node

Represents a unit of narrative content.

A Node belongs to a Branch and can have relationships with other Nodes.

Nodes should not contain nested child objects to represent the entire narrative structure. Relationships between Nodes should instead be represented explicitly.

### NodeRelation

Represents a relationship between two Nodes.

For example:

```text
Node A → Node B
```

The relationship may have a type that defines its meaning, such as:

```text
NEXT
BRANCH
CONSEQUENCE
DEPENDENCY
```

The exact set of relationship types may evolve as the Natlas narrative model develops.

The important principle is that relationships are represented as explicit domain data rather than being hidden inside nested objects.

---

# 2. Alignment

An Alignment will be represented as its own domain entity.

An Alignment represents Nodes that share a narrative alignment.

For example:

```text
Alignment
 ├── Node A2
 ├── Node B3
 └── Node C1
```

The model should not represent this through mutual references such as:

```text
A2 → B3
B3 → A2
```

Instead, the Alignment itself represents the relationship between those Nodes.

This allows an Alignment to contain two or more Nodes without creating circular references between Node objects.

---

# 3. The Backend Represents the Narrative Graph

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

The relationships are stored explicitly.

Therefore, the backend should not depend on a deeply nested tree structure such as:

```text
Node
 └── children
      └── children
           └── children
```

Instead, the graph is composed of independent entities and explicit relationships:

```text
Nodes
Relations
Alignments
```

This allows the backend to work directly with the graph model rather than having to transform a hierarchical structure into a graph later.

---

# 4. Frontend: Spatial Model

The organization of Nodes within the visual matrix will be handled by the frontend.

The backend will not store visual coordinates such as:

```text
x = 500
y = 300
```

Nor will the matrix position necessarily be persisted as part of the narrative domain.

The backend describes **what exists and how the elements are related**.

The frontend determines **how those elements should be organized visually**.

---

# 5. Matrix and Spatial Positioning

The frontend will be responsible for concepts related to spatial organization, such as:

```text
Matrix
MatrixPosition
Row
Column
Filler
```

Based on the Nodes, Branches, and Alignments received from the backend, the frontend will construct the matrix required for visualization.

For example:

```text
              Branch A    Branch B    Branch C

Position 1       A1          B1

Position 2       A2          B2          C1

Position 3       A3
```

In this example, `A2`, `B2`, and `C1` may share an Alignment in the narrative model.

The frontend uses that information to place them within the same spatial position of the matrix.

---

# 6. PositionTransposer

The `PositionTransposer` will be responsible for transforming the narrative model received from the backend into the spatial representation used by the frontend.

Conceptually:

```text
Backend
   │
   ├── Nodes
   ├── Branches
   ├── Relations
   └── Alignments
          │
          ↓
   PositionTransposer
          │
          ↓
      MatrixGrid
          │
          ↓
      React Flow
```

The `PositionTransposer` determines where each Node should be placed within the matrix according to Natlas' spatial rules.

Those matrix positions can then be translated into the actual coordinates required by React Flow.

---

# 7. Separation of Domain and Presentation

The architecture will follow three conceptual levels.

## Narrative Model

Represents the meaning and structure of the story.

```text
Story
Branch
Node
NodeRelation
Alignment
```

## Spatial Model

Represents how the story is organized spatially.

```text
Matrix
MatrixPosition
Filler
Row
Column
```

## Rendering Model

Represents how the interface renders the spatial model.

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

# 8. Core Principle

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

---

# 9. API Representation

The backend can expose a normalized representation of the narrative graph:

```json
{
  "story": {},
  "branches": [],
  "nodes": [],
  "relations": [],
  "alignments": []
}
```

The frontend receives this model and builds its spatial representation from it.

The API therefore remains close to the backend domain model without requiring the backend to know anything about the specific visual implementation.

---

# 10. Benefits

This approach provides several benefits:

* The persisted model already represents a graph.
* Relationships between Nodes are explicit.
* Alignments do not require circular references.
* The backend remains independent from the visual implementation.
* The frontend can change its positioning rules without changing the narrative model.
* The matrix can evolve independently from the database model.
* React Flow remains a rendering layer rather than becoming part of the domain model.
* Different visualizations can be created from the same narrative model.
* The API can maintain a structure close to the actual domain without introducing unnecessary transformations.

## Architectural Decision

Natlas will use a **graph-oriented narrative domain model in the backend**, with Nodes, Branches, Relations, and Alignments represented explicitly and persisted independently.

**Alignments will be first-class domain entities**, allowing multiple Nodes to participate in the same alignment without creating circular object references.

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
