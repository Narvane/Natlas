import FlowCanvas from "../../components/FlowCoordinates.tsx";
import {MatrixGrid} from "../../components/MatrixGrid.tsx";
import {type MatrixNodeData, NodeMatrix} from "../../lib/nodeMatrix.ts";
import type {Node} from "@xyflow/react";

const initialNodes: Node<MatrixNodeData>[] = [
    {
        id: 'node-1',
        position: { x: 0, y: 0 },
        data: {
            label: 'A',
            matrixCol: 1,
            matrixRow: 1,
        },
    },
    {
        id: 'node-2',
        position: { x: 0, y: 0 },
        data: {
            label: 'B',
            matrixCol: 2,
            matrixRow: 1,
        },
    },
    {
        id: 'node-3',
        position: { x: 0, y: 0 },
        data: {
            label: 'C',
            matrixCol: 3,
            matrixRow: 1,
        },
    },
    {
        id: 'node-4',
        position: { x: 0, y: 0 },
        data: {
            label: 'D',
            matrixCol: 2,
            matrixRow: 2,
        },
    },
]

const matrix = new NodeMatrix(
    initialNodes,
    {
        cols: 6,
        rows: 3,
    },
)


export default function Board() {
    return (
        <FlowCanvas translateExtent={[[0, 0], [10000, 10000]]} nodes={initialNodes}>
            <MatrixGrid
                matrix={matrix}
            />
        </FlowCanvas>
    )
}