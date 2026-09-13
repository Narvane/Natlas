# The Problem

As a story grows, it becomes increasingly difficult for a writer to keep its entire structure under control.

A long story is not just a sequence of texts. It contains many different kinds of information that evolve simultaneously: narrative progression, character arcs, momentum, time, events, and the relationships between them. While writing, however, the writer is usually focused on a small part of the story at a time.

This creates three major problems:

### 1. Loss of context

When working deeply on one scene or section, it is easy to lose awareness of its position within the larger story.

The writer may know exactly what they are writing now, while temporarily losing sight of what this moment represents in the overall structure.

### 2. Loss of control

As the story grows, its structure becomes increasingly difficult to hold in the mind at once. The writer may spend a long time developing one point while losing awareness of other parts of the story.

This can lead to unbalanced development, forgotten elements, structural gaps, or excessive detail in places that should remain brief.

### 3. Difficult maintenance

Stories change constantly during their creation. A structural decision made early may later be changed, removed, or replaced.

When structural information is embedded throughout notes and text, these changes can require finding and updating many different places. The same concept may be described repeatedly, creating duplication and increasing the chance of inconsistency.

---

# A Spatial Representation of the Story

To address these problems, Natlas represents the story through multiple **aligned lines**.

Instead of representing the story only as a linear sequence of text, the writer can define independent lines describing different aspects of its progression.

For example:

```text
Story
Beginning ─────────── Middle ─────────── End

Momentum
Crisis ───── Pre-ascent ───── Ascent ───── Decline

Time
Short ───────────── Medium ───────────── Long

Main Text
─────────────── Scene A ───── Scene B ─────────
```

Each Line represents a different dimension of the story.

A Line contains Nodes that represent specific points within that dimension. Different Lines can therefore describe different aspects of the same story while sharing a common spatial progression.

The exact dimensions are defined by the writer. They can represent any aspect of the story that is useful to them.

Because these Lines share the same spatial progression, their relationships can be understood through their position and alignment.

A point in the story can therefore have context across several dimensions simultaneously.

The **Main Text Line** represents the actual textual progression of the story. Its nodes contain the pieces of writing associated with the corresponding positions in the overall structure.

Other Lines can describe or organize aspects of the story without containing the actual prose.

This turns the story's structure into something that can be **seen, navigated, and maintained**, rather than something that must exist entirely in the writer's memory.

---

# How This Helps

The visualization is not only a way of displaying information. It is designed around a fundamental limitation of writing long stories: **the writer cannot keep every relevant relationship in their working memory at the same time.**

Human working memory is limited. While writing, attention naturally becomes concentrated on the current problem — a scene, a character, a dialogue, an event. This focus is useful for creative work, but it also creates a form of **local tunnel vision**: the writer becomes deeply aware of the current point while becoming less aware of the rest of the story.

The visualization acts as an external structure that compensates for this limitation.

### Context — seeing where the current point belongs

When information is represented spatially, relationships can be perceived without having to be mentally reconstructed.

Humans naturally understand spatial progression as a representation of sequence and time. We commonly interpret positions from left to right as progression, and distance as separation between events or stages.

By aligning multiple Lines along the same progression, the system allows the writer to perceive several relationships simultaneously.

For example:

```text
Story
Beginning ───────────── Middle ───────────── End
                                      │
Momentum
Crisis ───── Pre-ascent ───── Ascent ───── Decline
                                      │
Time
Short ───────────── Medium ───────────── Long
                                      │
Main Text
──────────────────────────── Scene X ───────
```

The writer does not need to consciously remember that Scene X occurs near the end, during the transition from ascent to decline, and within a short time interval.

The **position itself communicates that information**.

This reduces the amount of contextual information that must be held mentally while writing.

The structure therefore becomes an **external representation of context**.

---

### Control — reducing cognitive load

A long story contains a large number of relationships that compete for the writer's attention.

Without an external representation, the writer must constantly switch between:

* remembering what has already happened;
* remembering what is supposed to happen;
* understanding the current structural position;
* considering character development;
* maintaining pacing;
* remembering unresolved elements;
* deciding how much detail a section deserves.

The more information that must be held simultaneously, the easier it becomes to lose something.

The visualization allows this information to be **offloaded from working memory into a persistent external structure**.

This does not make the story itself less complex. Instead, it makes the complexity easier to inspect.

It also creates a natural distinction between **local focus and global awareness**.

The writer can focus deeply on a single scene while still being able to look at the larger structure and immediately understand:

> Where am I? What surrounds this point? What stage of the story am I in? How much of the story does this section represent? What other structures are active here?

This is particularly important because writing often produces local tunnel vision. A writer can spend hours developing one section and gradually lose awareness of how much attention that section is receiving relative to the rest of the story.

A spatial overview makes such imbalances visible.

A writer may notice, for example, that an enormous amount of structure has been developed around the beginning while the ending remains almost empty, or that a supposedly minor transition has received more detail than an important narrative event.

The visualization therefore provides a form of **structural feedback**.

---

### Maintenance — reducing duplication and preserving a single source of truth

The same external structure also makes the story easier to maintain.

In a conventional writing process, structural information often becomes mixed with the content itself. The writer may repeatedly describe that a particular section belongs to the "ascent", that a character is entering a certain phase, or that an event happens during a particular period.

As the story changes, these descriptions can become outdated.

The system instead treats structural information as a **separate layer**.

A concept such as "Ascent" is defined once. Nodes and other elements occupy positions within the structure rather than repeatedly describing that position inside the prose.

This creates a single source of truth for structural information.

If the writer later decides that the momentum model is no longer useful, they can change or remove that structural layer without having to search through the entire story for every place where that concept was mentioned.

The same principle applies to relationships between story elements.

For example, a narrative fork can be represented through **Relations between Nodes** rather than by duplicating information about the fork throughout the story.

A node can have multiple `BRANCH` relations leading to different nodes:

```text
                 ┌───> Node B
                 │
Node A ──────────┤
                 │
                 └───> Node C
```

The branching structure is therefore represented directly by the model.

This makes structural changes easier to manage because the relationship itself is maintained as part of the story model rather than being repeatedly described elsewhere.

This makes the story more **maintainable as it evolves**.

---

### The result

These three benefits are closely related:

**Context** reduces the need to mentally reconstruct where the writer is.

**Control** reduces the amount of structural information that must be held in working memory and makes the overall story easier to inspect.

**Maintenance** keeps structural information externalized and centralized, making changes less likely to produce inconsistencies.

Together, they allow the writer to do something that becomes increasingly difficult as a story grows:

> **Work deeply on one part of the story without losing control of the whole.**
