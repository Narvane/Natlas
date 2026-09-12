import type { Id } from "./id.ts";

export class Line {
    constructor(
        public readonly id: Id,
        public name: string,
    ) {}
}
