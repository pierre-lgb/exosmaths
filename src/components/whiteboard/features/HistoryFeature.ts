import { fabric } from "fabric"

export default class HistoryExtension {
    canvas: fabric.Canvas
    history: any[]
    currentIndex: number
    isUndoing: boolean
    isRedoing: boolean

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
        this.history = []
        this.currentIndex = -1
        this.isUndoing = false
        this.isRedoing = false

        this.canvas.on("object:added", () => this.recordHistory())
        this.canvas.on("object:modified", () => this.recordHistory())
        this.canvas.on("object:removed", () => this.recordHistory())
    }

    recordHistory() {
        // Don't record history while undoing or redoing
        if (this.isUndoing || this.isRedoing) {
            return
        }

        // Truncate the history array if the current index is not at the end
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1)
        }

        // Record the current state of the canvas
        this.history.push(JSON.stringify(this.canvas))
        this.currentIndex++
    }

    undo() {
        // Don't allow undoing if there is no history
        if (this.currentIndex < 0) {
            return
        }

        this.isUndoing = true

        // Load the previous state of the canvas from the history
        this.currentIndex--
        this.canvas.loadFromJSON(this.history[this.currentIndex], () => {
            this.canvas.renderAll()
            this.isUndoing = false
        })
    }

    redo() {
        // Don't allow redoing if there is no history
        if (this.currentIndex >= this.history.length - 1) {
            return
        }

        this.isRedoing = true

        // Load the next state of the canvas from the history
        this.currentIndex++
        this.canvas.loadFromJSON(this.history[this.currentIndex], () => {
            this.canvas.renderAll()
            this.isRedoing = false
        })
    }
}
