import { fabric } from "fabric"
import { CanvasContext } from "providers/CanvasContextProvider"
import { useContext, useEffect } from "react"

import CopyPasteFeature from "./features/CopyPasteFeature"
import GridFeature from "./features/GridFeature"
import HistoryFeature from "./features/HistoryFeature"
import TextFeature from "./features/TextFeature"

fabric.Object.prototype.noScaleCache = false
fabric.Object.prototype.borderColor = "#2AA5FF"
fabric.Object.prototype.cornerStrokeColor = "#2AA5FF"
fabric.Object.prototype.cornerSize = 8
fabric.Object.prototype.cornerColor = "#FFFFFF"
fabric.Object.prototype.transparentCorners = false

export default function Canvas() {
    const { setCanvas, setFeatures } = useContext(CanvasContext)

    useEffect(() => {
        // Initialize canvas
        const canvas = new fabric.Canvas("canvas", {
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#ffffff",
            selectionColor: "#7BC9FD22",
            selectionBorderColor: "#7BC9FD",
            selectionLineWidth: 1,
            imageSmoothingEnabled: false,
            enableRetinaScaling: true
        })

        // Extensions
        const copyPasteFeature = new CopyPasteFeature(canvas)
        const historyFeature = new HistoryFeature(canvas)
        const gridFeature = new GridFeature(canvas)
        const textFeature = new TextFeature(canvas)

        // Ensure that the canvas is resized to fit the full screen
        // whenever the window is resized.
        function resizeCanvas() {
            canvas!.setWidth(window.innerWidth)
            canvas!.setHeight(window.innerHeight)
        }
        window.addEventListener("resize", resizeCanvas)

        // Handle keyboard shortcuts (e.g. copy-paste)
        function keydownHandler(event: KeyboardEvent) {
            if (event.ctrlKey && event.key === "c") {
                copyPasteFeature.copy()
            } else if (event.ctrlKey && event.key === "v") {
                copyPasteFeature.paste()
            } else if (event.ctrlKey && event.key === "z") {
                historyFeature.undo()
            } else if (event.ctrlKey && event.key === "y") {
                historyFeature.redo()
            } else if (event.key === "Delete") {
                canvas.getActiveObjects().forEach((obj) => {
                    canvas.remove(obj)
                })
                canvas.discardActiveObject().renderAll()
            }
        }
        window.addEventListener("keydown", keydownHandler)

        setCanvas(canvas)
        setFeatures({
            history: historyFeature,
            copyPaste: copyPasteFeature,
            grid: gridFeature,
            text: textFeature
        })

        return () => {
            // Destroy the canvas
            canvas.off()
            canvas.dispose()

            setCanvas(null)
            setFeatures({})

            // Clear event listeners
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("keydown", keydownHandler)
        }
    }, [setCanvas, setFeatures])

    return <canvas id="canvas" />
}
