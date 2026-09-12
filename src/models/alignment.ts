import type { Id } from "./id";
import type {Node} from "./nodes.ts";


export class Alignment {
    constructor(
        public readonly id: Id,
        public readonly nodes: Node[] = [],
    ) {}

    getNode(id: Id): Node | undefined {
        return this.nodes.find(node => node.id === id);
    }
}
