import type { Alignment } from "./alignment.ts";
import type {Line} from "./lines.ts";
import type { Relation } from "./relation.ts";

export class Story {
    constructor(
        public lines: Line[] = [],
        public nodes: Node[] = [],
        public alignments: Alignment[] = [],
        public relations: Relation[] = [],
    ) {}
}
