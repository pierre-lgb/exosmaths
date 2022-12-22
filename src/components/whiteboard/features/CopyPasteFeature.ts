import { fabric } from "fabric"

export default class CopyPasteExtension {
    canvas: fabric.Canvas
    clipboard: fabric.Object | undefined

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
    }

    copy() {
        // Get the currently selected object on the canvas
        const selectedObject = this.canvas.getActiveObject()

        // Clone the object in the clipboard
        selectedObject?.clone((cloned: fabric.Object) => {
            this.clipboard = cloned
        })
    }

    paste() {
        if (!this.clipboard) {
            return
        }

        // Add the pasted objects to the canvas
        this.clipboard.clone((cloned: any) => {
            this.canvas.discardActiveObject()

            cloned.set({
                left: cloned.left + 10,
                top: cloned.top + 10,
                evented: true
            })

            if (cloned.type === "activeSelection") {
                // Active selection needs a reference to the canvas.
                cloned.canvas = this.canvas
                cloned.forEachObject((obj: any) => {
                    this.canvas.add(obj)
                })

                // This should solve the unselectability
                cloned.setCoords()
            } else {
                this.canvas.add(cloned)
            }

            this.clipboard!.left = (this.clipboard!.left ?? 0) + 10
            this.clipboard!.top = (this.clipboard!.top ?? 0) + 10

            this.canvas.setActiveObject(cloned)
            this.canvas.requestRenderAll()
        })
    }
}
