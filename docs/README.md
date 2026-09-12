# Natlas Documentation

This directory contains documentation intended to help developers and AI assistants understand the **Natlas** project.

Natlas is a **Narrative Atlas / Story Modelling Tool**. Its purpose is to represent and explore story structure through a structured visual model rather than treating a story as only a linear text document.

The documentation is intentionally separated into different levels of authority.

## Documentation Structure

```text
docs/
├── README.md
└── exploratory-notes/
    ├── ...
    └── ...
```

### `exploratory-notes/`

This folder contains **working and exploratory documentation** gathered during the design and development of Natlas.

The files in this folder are useful for understanding:

* concepts and terminology used by the project;
* design ideas and reasoning;
* possible data models;
* visual and interaction concepts;
* architectural experiments;
* decisions that were being considered;
* explanations of specific parts of the system;
* previous discussions that may still contain useful context.

These documents are deliberately kept separate from this README because they are **not necessarily authoritative specifications**.

They may be incomplete, outdated, overly specific, speculative, or even inconsistent with one another.

---

## Important: How to Read the Exploratory Notes

When using these documents to understand or modify the project, follow these rules.

### 1. Treat them as contextual evidence, not absolute truth

An exploratory document should answer:

> "What was being considered or understood about the project?"

It should **not automatically answer**:

> "What must the implementation be?"

The actual code and more authoritative project documentation take precedence over these notes.

### 2. Do not assume every statement is a final decision

Some documents describe ideas that were later changed.

A statement such as:

```text
Natlas will use X.
```

may actually represent an earlier design direction rather than a permanent architectural decision.

Likewise:

```text
The model should contain X.
```

may describe an experiment or proposal rather than the current domain model.

Use the notes to build a mental model, but verify important implementation details against the current code and newer documentation.

### 3. Expect contradictions

Different documents may describe the same concept differently.

If two exploratory notes disagree:

* do not silently combine them into a new rule;
* do not assume the most recently encountered statement is correct;
* do not modify the code simply to make the documents agree;
* inspect the current implementation and surrounding context;
* if the difference affects an important design decision, surface the ambiguity rather than hiding it.

Contradictions in these notes are acceptable. They are part of their exploratory nature.

### 4. Prefer current implementation over historical reasoning

When there is a conflict between an exploratory note and the existing implementation, the implementation is normally the stronger source of truth for **what currently exists**.

However, the exploratory note may still explain **why something was designed that way**, so do not discard its context merely because the implementation has evolved.

A useful distinction is:

```text
Exploratory notes
    ↓
Explain concepts, reasoning, experiments, and possible directions

Current code
    ↓
Defines what actually exists

Explicit current requirements / authoritative specifications
    ↓
Define what the system is expected to become
```

If an authoritative specification is introduced later, it should take precedence over exploratory notes where they conflict.

---

## Using These Documents as AI Context

These documents exist partly to give AI coding assistants enough context to reason about Natlas without requiring every concept to be rediscovered from the codebase.

When working on Natlas, an AI should:

1. Read this README first.
2. Use the files under `exploratory-notes/` to learn the project's vocabulary and conceptual background.
3. Inspect the current code before making implementation assumptions.
4. Distinguish clearly between **existing behavior**, **documented intent**, and **exploratory ideas**.
5. Preserve established concepts unless the requested change explicitly modifies them.
6. When documentation and code disagree, investigate the discrepancy instead of blindly following either source.
7. When an important ambiguity cannot be resolved from the code or documentation, ask for clarification or explicitly state the assumption being made.

The goal is **contextual understanding**, not blind adherence to every sentence in the notes.

---

## Core Concepts You May Encounter

The exploratory documentation discusses concepts such as:

* stories and narrative structure;
* branches and alternative story paths;
* story nodes;
* gap nodes representing temporal or structural intervals;
* different gap sizes such as short, medium, and long gaps;
* fillers used to preserve spatial alignment without representing story content;
* alignment matrices;
* positional/transposition logic for mapping the narrative model to a visual space;
* visual representation and interaction through a structured matrix rather than an unrestricted canvas.

These concepts are mentioned here only as an orientation guide. Their exact definitions and relationships should be verified against the relevant documentation and current implementation.

In particular, **do not infer that every concept listed here is already finalized, implemented, or immutable**.

---

## Documentation Philosophy

Natlas documentation is allowed to evolve.

During development, it is often useful to document an idea before its final form is known. Those documents can preserve valuable reasoning even after the implementation changes.

Therefore:

> **Exploratory documentation should preserve useful context without pretending to be a final specification.**

If a concept becomes stable and important enough to serve as an implementation contract, it should eventually be promoted into a more authoritative document rather than relying indefinitely on an exploratory note.

Until then, the files in `exploratory-notes/` should be treated as a **context library**: valuable for understanding Natlas, but not a source of unquestionable truth.
