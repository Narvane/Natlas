type Id = string;

class Story {
    constructor(
        public readonly branches: Branch[] = [],
        public readonly alignments: Alignment[] = [],
        public readonly relations: Relation[] = [],
    ) {}

    getNodes(): Node[] {
        return this.branches.flatMap(branch => branch.nodes);
    }

    getBranch(id: Id): Branch | undefined {
        return this.branches.find(branch => branch.id === id);
    }

    getNode(id: Id): Node | undefined {
        return this.getNodes().find(node => node.id === id);
    }

    getAlignment(id: Id): Alignment | undefined {
        return this.alignments.find(alignment => alignment.id === id);
    }

    getRelation(id: Id): Relation | undefined {
        return this.relations.find(relation => relation.id === id);
    }
}


class Branch {
    constructor(
        public readonly id: Id,
        public name: string,
        public readonly nodes: Node[] = [],
    ) {}

    getNode(id: Id): Node | undefined {
        return this.nodes.find(node => node.id === id);
    }
}


abstract class Node {
    protected constructor(
        public readonly id: Id,
        public readonly branch: Branch,
    ) {}
}


class StoryNode extends Node {
    constructor(
        id: Id,
        branch: Branch,
        public readonly title: string,
    ) {
        super(id, branch);
    }
}


class GapNode extends Node {
    constructor(
        id: Id,
        branch: Branch,
        public readonly size: GapSize,
    ) {
        super(id, branch);
    }
}


enum GapSize {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG",
}


class Alignment {
    constructor(
        public readonly id: Id,
        public readonly nodes: Node[] = [],
    ) {}

    getNode(id: Id): Node | undefined {
        return this.nodes.find(node => node.id === id);
    }
}


class Relation {
    constructor(
        public readonly id: Id,
        public readonly source: Node,
        public readonly target: Node,
        public readonly type: RelationType,
    ) {}
}


enum RelationType {
    NEXT = "NEXT",
    BRANCH = "BRANCH",
    CONSEQUENCE = "CONSEQUENCE",
}