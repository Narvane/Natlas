import type { Id } from "./id.ts";

export enum RelationType {
    NODE = "NODE",
    LINE = "LINE"
}

export class Relation {
    constructor(
        public readonly id: Id,
        public readonly sourceNodeId: Id,
        public readonly targetNodeId: Id,
        public readonly type: RelationType,
    ) {}
}