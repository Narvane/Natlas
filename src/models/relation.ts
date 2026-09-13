import type { Id } from "./id";
import type {Node} from "./nodes.ts";

export class Relation {
    constructor(
        public readonly id: Id,
        public readonly source: Node,
        public readonly target: Node,
        public readonly type: RelationType,
    ) {}
}


enum RelationType {
    NEXT = "NEXT",
    LINE = "LINE",
}