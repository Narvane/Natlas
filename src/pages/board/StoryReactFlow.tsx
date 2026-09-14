import {useNodesState} from "@xyflow/react";
import type {StoryFlow as Story} from "./types.ts";

export type StoryFlowProps = {
    story: Story
}

export default function StoryReactFlow(props: StoryFlowProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(props.story.nodes);

    return (<></>)
}
