import FlowCanvas from "../../components/FlowCoordinates.tsx";
import {MatrixGrid} from "../../components/MatrixGrid.tsx";
import {NodeMatrix} from "../../lib/nodeMatrix.ts";
import {useMemo} from "react";


export default function Board() {
    const nodes = useMemo(() => [
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
        }
    ], [])

    const matrix = useMemo(() =>
        new NodeMatrix(
            nodes,
            {
                cols: 6,
                rows: 3,
            },
        )
    , [])

    //Wrapped matrix - wrapped.matrix wrapped.nodes - - controller - NatlasCanvas - NatlasMatrix
    // Relations will come from backend
    //Aligner


    // Board story={story}
    // Board >> Matrix(Nodes), AlignController  ou   AlignController(matrix)


    // Board >> StoryRenderer/Drawer (.matrix or from outside) (.nodes)
    // Board constructor new StoryRenderder for each change


    // Board >> node (back + front align attr) = Always born with attrs of alignment



    return (
        <FlowCanvas
            translateExtent={[[0, 0], [10000, 10000]]}
            nodes={matrix.nodes}>
            <MatrixGrid
                matrix={matrix}
            />
        </FlowCanvas>
    )
}