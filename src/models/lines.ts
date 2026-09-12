import type { Id } from "./id";
import type {Node} from "./nodes.ts";


export class Line {
    constructor(
        public readonly id: Id,
        public name: string,
        public readonly nodes: Node[] = [],
    ) {}

    getNode(id: Id): Node | undefined {
        return this.nodes.find(node => node.id === id);
    }
}