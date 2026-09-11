import type {CanvasPosition} from "./natlasMatrix.ts";


export class TransposeMatrix {
    constructor(
        private colsWidth: number[],
        private rowsHeight: number[],
        private origin: CanvasPosition = { x: 0, y: 0 },
    ) {}

    transposedPosition(col: number, row: number): CanvasPosition {
        return {
            x: this.origin.x
                + (col - 1) * this.colsWidth[col]
                + this.halfColWidth(col),

            y: this.origin.y
                + (row - 1) * this.rowsHeight[row]
                + this.halfRowHeight(row),
        }
    }

    halfColWidth(col: number): number {
        return Math.floor(this.colsWidth[col] / 2)
    }

    halfRowHeight(row: number): number {
        return Math.floor(this.rowsHeight[row] / 2)
    }
}