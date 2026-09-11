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

export class PositionTransposer {
    constructor(
        private colsWidth: number[],
        private rowsHeight: number[],
        private origin: CanvasPosition = { x: 0, y: 0 },
    ) {}

    getOriginalPosition(col: number, row: number): CanvasPosition {
        return {
            x: this.origin.x
                + this.columnOffset(col)
                + this.halfColWidth(col),

            y: this.origin.y
                + this.rowOffset(row)
                + this.halfRowHeight(row),
        }
    }

    getTransposedPosition(x: number, y: number): MatrixPosition {
        const relativeX = x - this.origin.x
        const relativeY = y - this.origin.y

        return {
            col: this.columnAt(relativeX),
            row: this.rowAt(relativeY),
        }
    }

    transposedBounds(col: number, row: number): CellBounds {
        return {
            x: this.origin.x + this.columnOffset(col),
            y: this.origin.y + this.rowOffset(row),
            width: this.colsWidth[col - 1],
            height: this.rowsHeight[row - 1],
        }
    }

    get width(): number {
        return this.colsWidth.reduce(
            (total, width) => total + width,
            0,
        )
    }

    get height(): number {
        return this.rowsHeight.reduce(
            (total, height) => total + height,
            0,
        )
    }

    private columnOffset(col: number): number {
        return this.colsWidth
            .slice(0, col - 1)
            .reduce((sum, width) => sum + width, 0)
    }

    private rowOffset(row: number): number {
        return this.rowsHeight
            .slice(0, row - 1)
            .reduce((sum, height) => sum + height, 0)
    }

    private halfColWidth(col: number): number {
        return Math.floor(this.colsWidth[col - 1] / 2)
    }

    private halfRowHeight(row: number): number {
        return Math.floor(this.rowsHeight[row - 1] / 2)
    }

    private columnAt(x: number): number {
        let offset = 0

        for (let col = 1; col <= this.colsWidth.length; col++) {
            offset += this.colsWidth[col - 1]

            if (x < offset) {
                return col
            }
        }

        return this.colsWidth.length
    }

    private rowAt(y: number): number {
        let offset = 0

        for (let row = 1; row <= this.rowsHeight.length; row++) {
            offset += this.rowsHeight[row - 1]

            if (y < offset) {
                return row
            }
        }

        return this.rowsHeight.length
    }
}