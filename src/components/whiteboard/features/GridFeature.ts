import { fabric } from "fabric"

export default class GridExtension {
    canvas: fabric.Canvas
    showGrid: boolean

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
        this.showGrid = false
    }

    toggleGrid() {
        this.showGrid = !this.showGrid
        if (this.showGrid) {
            this.canvas?.setBackgroundColor(
                {
                    source: "./grid.svg",
                    repeat: "repeat"
                } as fabric.Pattern,
                this.canvas.renderAll.bind(this.canvas)
            )
        } else {
            this.canvas?.setBackgroundColor(
                "#ffffff",
                this.canvas.renderAll.bind(this.canvas)
            )
        }
    }
}
