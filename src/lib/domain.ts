type Id = string;

class Story {
    constructor(
        public branches: Branch[] = [],
        public nodes: Node[] = [],
        public alignments: Alignment[] = [],
        public relations: Relation[] = [],
    ) {}
}

class Branch {
    constructor(
        public readonly id: Id,
        public name: string,
    ) {}
}

abstract class Node {
    protected constructor(
        public readonly id: Id,
        public readonly branchId: Id,
        public readonly type: NodeType,
    ) {}
}

class StoryNode extends Node {
    constructor(
        id: Id,
        branchId: Id,
        public readonly title: string,
    ) {
        super(id, branchId, NodeType.REGULAR);
    }
}

class GapNode extends Node {
    constructor(
        id: Id,
        branchId: Id,
        public readonly size: GapSize,
    ) {
        super(id, branchId, NodeType.GAP);
    }
}

enum NodeType {
    REGULAR = "REGULAR",
    GAP = "GAP",
}

enum GapSize {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG",
}

class Alignment {
    constructor(
        public readonly id: Id,
        public readonly nodeIds: Id[] = [],
    ) {}
}

class Relation {
    constructor(
        public readonly id: Id,
        public readonly sourceNodeId: Id,
        public readonly targetNodeId: Id,
        public readonly type: RelationType,
    ) {}
}

enum RelationType {
    NEXT = "NEXT",
    BRANCH = "BRANCH",
    CONSEQUENCE = "CONSEQUENCE",
}