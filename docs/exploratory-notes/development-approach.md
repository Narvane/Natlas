# Development Approach

Natlas will be developed using **React Flow** as the visual and interaction layer, while using a **matrix-based positioning system** as the underlying model for the story structure.

The matrix will be responsible for determining the spatial position of every element in the story. React Flow will then be responsible for rendering those elements and providing the user with the interface to interact with them.

This means that the position of an element should not fundamentally be defined by an arbitrary `x` and `y` coordinate. Instead, its position will be derived from its location within the alignment matrix.

## Matrix as the Source of Position

The alignment matrix represents the spatial structure of the story.

Each branch occupies a row, while the matrix columns represent positions in the progression of the story.

For example:

```text
             1      2      3      4      5
Branch A     A             B             C
Branch B            D             E
Main Text           T1            T2
```

The important information is not simply that `D` has a certain screen coordinate. Its important information is that it occupies a specific **matrix position** relative to the other elements.

React Flow coordinates are therefore derived from the matrix.

Conceptually:

```text
Story Model
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

## Matrix Coordinates

Each element can be understood as having a matrix position such as:

```text
(row, column)
```

For example:

```text
Branch A, Column 5
Branch B, Column 8
Main Text, Column 8
```

The application can translate these logical positions into React Flow coordinates.

For example:

```text
x = column × columnWidth
y = branch × rowHeight
```

The actual spacing and layout rules can change independently from the story model.

This separation is important because the application should be able to change how the story is displayed without changing the underlying structure of the story.

## Gaps and Fillers

The matrix also makes it possible to represent the spatial dimensions of gaps.

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

The Gap is the meaningful element. The Fillers exist only to occupy the remaining matrix positions and preserve alignment with other branches.

This means that Fillers should not be treated as ordinary story nodes. They are generated or managed as part of the positioning system.

## React Flow's Role

React Flow will provide the mechanisms needed to interact with the structure visually, including:

* Rendering nodes and edges
* Dragging and selecting elements
* Zooming and panning
* Node interaction
* Connection and interaction handling
* Custom node components
* Visual feedback

However, React Flow should not become the source of truth for the story's structural position.

If a node is moved, the application should interpret that interaction as a change to the **matrix structure**, and then derive the corresponding React Flow coordinates.

Likewise, if the matrix changes because a gap is resized, a branch is modified, or a fork is introduced, the React Flow representation should be recalculated from the new matrix state.

## Separation Between Model and View

The architecture therefore follows a clear separation:

```text
┌─────────────────────────────┐
│        Story Model          │
│                             │
│ Lines / Branches / Nodes    │
│ Gaps / Fillers / Forks      │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Alignment Matrix       │
│                             │
│ Determines spatial position │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Layout / Mapping      │
│                             │
│ Matrix → X/Y coordinates    │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│         React Flow          │
│                             │
│ Rendering + Interaction     │
└─────────────────────────────┘
```

This approach allows Natlas to treat the matrix as a **logical representation of the story's spatial structure**, while React Flow acts as the technology used to display and manipulate that structure.

## Development Principle

The main development principle is:

> **The story structure defines the position; the visual layer renders the position.**

The implementation should therefore avoid building the story directly around React Flow's internal node coordinates.

React Flow is the canvas through which the user interacts with Natlas, but the **alignment matrix is what defines where things belong**.

This also provides a foundation for future features such as automatic alignment, gap expansion, branch insertion, forks, structural validation, alternative layouts, and AI operations over the story model without making those features dependent on the visual representation.
