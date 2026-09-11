import type { Node } from '@xyflow/react'

export type MatrixPosition = {
    col: number
    row: number
}

export type CanvasPosition = {
    x: number
    y: number
}

export type CellBounds = {
    x: number
    y: number
    width: number
    height: number
}

export type MatrixNodeData = {
    label: string
    matrixCol: number
    matrixRow: number
}

export class NatlasMatrix {
    constructor(public cellsWidth: number,
                public cellsHeight: number) {}

    get halfWidth(): number {
        return Math.floor(this.cellsWidth / 2)
    }

    get halfHeight(): number {
        return Math.floor(this.cellsHeight / 2)
    }

    toCanvas(col: number, row: number): CanvasPosition {
        return {
            x: (col - 1) * this.cellsWidth + this.halfWidth,
            y: (row - 1) * this.cellsHeight + this.halfHeight,
        }
    }

    fromCanvas(x: number, y: number): MatrixPosition {
        return {
            col: Math.floor(x / this.cellsWidth) + 1,
            row: Math.floor(y / this.cellsHeight) + 1,
        }
    }

    getCellBounds(col: number, row: number): CellBounds {
        return {
            x: (col - 1) * this.cellsWidth,
            y: (row - 1) * this.cellsHeight,
            width: this.cellsWidth,
            height: this.cellsHeight,
        }
    }

    addNode(
        col: number,
        row: number,
        data?: Partial<MatrixNodeData>,
    ): Node<MatrixNodeData> {
        const position = this.toCanvas(col, row)

        return {
            id: `matrix-${col}-${row}`,
            position,
            data: {
                label: data?.label ?? `(${col}, ${row})`,
                matrixCol: col,
                matrixRow: row,
            },
        }
    }

    repositionNode(node: Node<MatrixNodeData>): Node<MatrixNodeData> {
        const { matrixCol, matrixRow } = node.data

        return {
            ...node,
            position: this.toCanvas(matrixCol, matrixRow),
        }
    }
}
