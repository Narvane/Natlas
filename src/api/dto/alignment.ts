import type { Id } from "./id.ts";

export class Alignment {
    constructor(
        public readonly id: Id,
        public readonly nodeIds: Id[] = [],
    ) {}
}