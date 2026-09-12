import type {Id} from "./id";
import type {Line} from "./lines.ts";

export abstract class Node {
    protected constructor(
        public readonly id: Id,
        public readonly storyLine: Line,
    ) {}
}


export class StoryNode extends Node {
    constructor(
        id: Id,
        storyLine: Line,
        public readonly title: string,
    ) {
        super(id, storyLine);
    }
}


export class GapNode extends Node {
    constructor(
        id: Id,
        storyLine: Line,
        public readonly size: GapSize,
    ) {
        super(id, storyLine);
    }
}

enum GapSize {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG",
}