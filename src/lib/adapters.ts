import type {NatlasFlowNode} from "../pages/board/types.ts";
import type {Node as NatlasNode} from "../models/nodes.ts";

export function adaptToReactFlow(node: NatlasNode): NatlasFlowNode {
    return {
        id: node.id,
        position: { x: 0, y: 0 },
        data: {
            node,
        },
    };
}
