import { ViewportPortal } from '@xyflow/react'
import type { NodeMatrix } from '../lib/nodeMatrix'

type MatrixGridProps = {
    matrix: NodeMatrix
}

export function MatrixGrid({ matrix }: MatrixGridProps) {
    const cells: { col: number; row: number }[] = []

    for (let row = 1; row <= matrix.rows; row += 1) {
        for (let col = 1; col <= matrix.cols; col += 1) {
            cells.push({ col, row })
        }
    }

    return (
        <ViewportPortal>
            <svg
                className="matrix-grid"
                width={matrix.width}
                height={matrix.height}
                aria-hidden="true"
            >
                {cells.map(({ col, row }) => {
                    const bounds = matrix.getCellBounds(col, row)

                    return (
                        <rect
                            key={`${col}-${row}`}
                            x={bounds.x}
                            y={bounds.y}
                            width={bounds.width}
                            height={bounds.height}
                            className="matrix-grid__cell"
                        />
                    )
                })}
            </svg>
        </ViewportPortal>
    )
}