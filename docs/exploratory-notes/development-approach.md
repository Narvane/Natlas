# Development Approach

Natlas will be developed using **React Flow** as the visual and interaction layer, while using a **matrix-based positioning system** as the underlying spatial model for the story structure.

The matrix will be responsible for determining the spatial position of elements in the story. React Flow will then be responsible for rendering those elements and providing the user with the interface to interact with them.

This means that the position of an element should not fundamentally be defined by an arbitrary `x` and `y` coordinate. Instead, its position will be derived from its location within the alignment matrix.

## Matrix as the Source of Position

The alignment matrix represents the **spatial structure** of the story.

Each Line occupies a row, while the matrix columns represent positions in the progression of the story.

For example:

```text
             1      2      3      4      5

Line A       A             B             C
Line B              D             E
Main Text           T1            T2
```

The important information is not simply that `D` has a certain screen coordinate.

Its important spatial information is that it occupies a specific **matrix position** relative to the other elements.

The matrix position is determined by the frontend's spatial rules and by the narrative information received from the backend.

React Flow coordinates are therefore derived from the matrix.

Conceptually:

```text
Narrative Model
      ↓
Spatial Model
      ↓
Alignment Matrix
      ↓
Matrix Position
      ↓
React Flow Position
      ↓
Visual Node
```

This allows the visual representation to remain a consequence of the story model rather than becoming the model itself.

---

# Matrix Coordinates

Each element can be understood as having a matrix position such as:

```text
(row, column)
```

For example:

```text
Line A, Column 5
Line B, Column 8
Main Text, Column 8
```

The application can translate these logical positions into React Flow coordinates.

For example:

```text
x = column × columnWidth
y = row × rowHeight
```

The actual spacing and layout rules can change independently from the narrative model.

This separation is important because the application should be able to change how the story is displayed without changing the underlying structure of the story.

The matrix therefore acts as the intermediate spatial representation between the narrative model and the rendering layer.

---

# Gaps and Fillers

The matrix also makes it possible to represent the spatial dimensions of gaps.

A `GapNode` represents an intentional interval within a Line.

Its size determines how much space the gap should occupy within the matrix.

A Short Gap, for example, may occupy 3 matrix positions:

```text
[Filler] [Gap] [Filler]
```

A Medium Gap may occupy 5:

```text
[Filler] [Filler] [Gap] [Filler] [Filler]
```

And a Long Gap may occupy 7:

```text
[Filler] [Filler] [Filler] [Gap] [Filler] [Filler] [Filler]
```

The Gap is the meaningful narrative element.

The Fillers exist only to occupy the remaining matrix positions and preserve spatial alignment with other Lines.

Therefore, Fillers should not be treated as ordinary story Nodes.

They are generated or managed by the spatial positioning system as part of the matrix construction process.

---

# Alignment and the Matrix

The backend's `Alignment` entity provides narrative information that can influence the construction of the matrix.

For example:

```text
Alignment X
 ├── Node A2
 ├── Node B3
 └── Node C1
```

The frontend can use this information when determining the corresponding matrix positions.

Conceptually:

```text
Backend Alignment
        ↓
Spatial Positioning Rules
        ↓
Same Matrix Position
```

An Alignment therefore does not directly contain a matrix coordinate.

Instead, it provides information that the frontend's positioning system can use to determine spatial relationships.

This distinction keeps the narrative concept of **alignment** separate from the spatial concept of a **matrix position**.

---

# PositionTransposer

The `PositionTransposer` will be responsible for transforming the narrative model received from the backend into the spatial representation used by the frontend.

Conceptually:

```text
Backend
   │
   ├── Story
   ├── Lines
   ├── Nodes
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

It may also generate spatial elements such as Fillers when constructing the matrix.

The resulting matrix positions can then be translated into the actual coordinates required by React Flow.

The `PositionTransposer` therefore acts as the boundary between the **narrative representation** and the **spatial representation**.

---

# React Flow's Role

React Flow will provide the mechanisms needed to interact with the structure visually, including:

* Rendering nodes and edges
* Dragging and selecting elements
* Zooming and panning
* Node interaction
* Connection and interaction handling
* Custom node components
* Visual feedback

However, React Flow should not become the source of truth for the story's structural position.

If a Node is moved, the application should interpret that interaction as a change to the **matrix structure**, rather than simply changing an arbitrary `x` and `y` coordinate.

The matrix can then be recalculated or updated, and the corresponding React Flow coordinates can be derived from it.

Likewise, if the matrix changes because a GapNode is resized, a Line is modified, or a new narrative branch is introduced, the React Flow representation should be recalculated from the new matrix state.

---

# Separation Between Model and View

The architecture therefore follows a clear separation:

```text
┌─────────────────────────────┐
│      Narrative Model        │
│                             │
│ Story / Lines / Nodes       │
│ Relations / Alignments      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Spatial Model         │
│                             │
│ Matrix / Positions /        │
│ Rows / Columns / Fillers    │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Rendering Model        │
│                             │
│ React Flow Nodes / Edges    │
│ X / Y / Dimensions /        │
│ Handles / Visual State      │
└─────────────────────────────┘
```

The **Narrative Model** represents what the story is.

The **Spatial Model** represents how the story is organized spatially.

The **Rendering Model** represents how that spatial organization is rendered by the interface.

This creates a progression:

```text
Narrative
    ↓
Spatial
    ↓
Rendering
```

Each layer depends on the information from the layer above it, but the layers do not need to be coupled to the implementation details of the layers below them.

---

# Development Principle

The main development principle is:

> **The story structure defines the spatial organization; the spatial organization defines the visual position.**

The implementation should therefore avoid building the story directly around React Flow's internal node coordinates.

React Flow is the interface through which the user interacts with Natlas, but the **alignment matrix is what defines the spatial organization of the story**.

The matrix should therefore be treated as a logical spatial representation rather than merely as a mechanism for calculating `x` and `y`.

This also provides a foundation for future features such as:

* Automatic alignment
* Gap expansion
* Line insertion
* Branch insertion
* Structural validation
* Alternative layouts
* AI operations over the story model

These features can operate on the narrative or spatial models without becoming dependent on React Flow's rendering representation.

---

# Core Flow

The overall development approach can be summarized as:

```text
┌─────────────────────┐
│   Narrative Model   │
│                     │
│ Story               │
│ Lines               │
│ Nodes               │
│ Relations           │
│ Alignments          │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Spatial Model    │
│                     │
│ Matrix              │
│ Matrix Positions    │
│ Rows / Columns      │
│ Fillers             │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    React Flow       │
│                     │
│ Rendering           │
│ Interaction         │
│ X / Y coordinates   │
└─────────────────────┘
```

The fundamental principle is:

> **The backend defines what exists. The matrix defines where it belongs. React Flow defines how it is displayed and interacted with.**

This approach will be used as the basis for implementing Natlas' positioning and visualization system.
