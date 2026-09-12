import type { Id } from "./id.ts";

export enum NodeType {
    STORY = "STORY",
    GAP = "GAP",
}

abstract class Node {
    protected constructor(
        public readonly id: Id,
        public readonly storyLineId: Id,
        public readonly type: NodeType,
    ) {}
}

export class StoryNode extends Node {
    constructor(
        id: Id,
        storyLineId: Id,
        public readonly title: string,
    ) {
        super(id, storyLineId, NodeType.STORY);
    }
}

export class GapNode extends Node {
    constructor(
        id: Id,
        storyLineId: Id,
        public readonly size: GapSize,
    ) {
        super(id, storyLineId, NodeType.GAP);
    }
}

export enum GapSize {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG",
}