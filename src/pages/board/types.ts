import type {Node as NatlasNode} from "../../models/nodes.ts";
import {type Node as ReactFlowNode} from '@xyflow/react'
import type {Story} from "../../models/story.ts";

export type NatlasFlowNode = ReactFlowNode<{ node: NatlasNode; }>;

export class StoryFlow {
    nodes: NatlasFlowNode[];

    constructor(story: Story) {
        this.nodes = story.getNodes().map(node => ({
            id: node.id,
            position: { x: 0, y: 0 },
            data: {
                node
            }
        }));
    }
}