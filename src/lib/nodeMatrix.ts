import type { Node } from '@xyflow/react'
import {
    type CanvasPosition,
    type CellBounds,
    type MatrixPosition,
    PositionTransposer,
} from './positionTransposer.ts'

export type MatrixSize = {
    cols: number
    rows: number
}

export type MatrixNodeData = {
    label: string
    matrixCol: number
    matrixRow: number
}

const CELL_WIDTH = 200
const EMPTY_COLUMN_WIDTH = 100

const CELL_HEIGHT = 200
const EMPTY_ROW_HEIGHT = 100

export class NodeMatrix {
    private readonly transposer: PositionTransposer

    constructor(
        private readonly nodes: Node<MatrixNodeData>[],
        private readonly size: MatrixSize,
        origin: CanvasPosition = { x: 0, y: 0 },
    ) {
        const colsWidth = this.buildColsWidth()
        const rowsHeight = this.buildRowsHeight()

        this.transposer = new PositionTransposer(
            colsWidth,
            rowsHeight,
            origin,
        )
    }

    get cols(): number {
        return this.size.cols
    }

    get rows(): number {
        return this.size.rows
    }

    get width(): number {
        return this.transposer.width
    }

    get height(): number {
        return this.transposer.height
    }

    toCanvas(col: number, row: number): CanvasPosition {
        return this.transposer.getOriginalPosition(col, row)
    }

    fromCanvas(x: number, y: number): MatrixPosition {
        return this.transposer.getTransposedPosition(x, y)
    }

    getCellBounds(col: number, row: number): CellBounds {
        return this.transposer.transposedBounds(col, row)
    }

    repositionNode(
        node: Node<MatrixNodeData>,
    ): Node<MatrixNodeData> {
        const { matrixCol, matrixRow } = node.data

        return {
            ...node,
            position: this.toCanvas(matrixCol, matrixRow),
        }
    }

    private buildColsWidth(): number[] {
        return Array.from(
            { length: this.size.cols },
            (_, index) => {
                const col = index + 1

                return this.hasNodeInColumn(col)
                    ? CELL_WIDTH
                    : EMPTY_COLUMN_WIDTH
            },
        )
    }

    private buildRowsHeight(): number[] {
        return Array.from(
            { length: this.size.rows },
            (_, index) => {
                const row = index + 1

                return this.hasNodeInRow(row)
                    ? CELL_HEIGHT
                    : EMPTY_ROW_HEIGHT
            },
        )
    }

    private hasNodeInColumn(col: number): boolean {
        return this.nodes.some(
            node => node.data.matrixCol === col,
        )
    }

    private hasNodeInRow(row: number): boolean {
        return this.nodes.some(
            node => node.data.matrixRow === row,
        )
    }
}