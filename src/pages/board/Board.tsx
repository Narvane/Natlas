import FlowCanvas from "../../components/FlowCoordinates.tsx";
import {Background, BackgroundVariant} from "@xyflow/react";


export default function Board() {
    return (
        <FlowCanvas translateExtent={[[0, 0], [1000, 1000]]}>
            <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1}
                color="#d1d5db"
            />
        </FlowCanvas>
    )
}