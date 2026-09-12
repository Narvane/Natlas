import type { Alignment } from "./alignment.ts";
import type { Id } from "./id.ts";
import type {Line} from "./lines.ts";
import type { Relation } from "./relation.ts";
import type {Node} from "./nodes.ts";


export class Story {
    constructor(
        public readonly lines: Line[] = [],
        public readonly alignments: Alignment[] = [],
        public readonly relations: Relation[] = [],
    ) {}

    getNodes(): Node[] {
        return this.lines.flatMap(line => line.nodes);
    }

    getLine(id: Id): Line | undefined {
        return this.lines.find(line => line.id === id);
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