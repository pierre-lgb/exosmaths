import { fabric } from "fabric"

export default class TextFeature {
    canvas: fabric.Canvas

    constructor(canvas: fabric.Canvas) {
        this.canvas = canvas
    }

    addText(text: string) {
        const textbox = new fabric.Textbox(text, {
            left: 50,
            top: 50,
            width: 300,
            fontSize: 25,
            fontFamily: "Cambria, Inter"
        })
        this.canvas.add(textbox)
        this.canvas.setActiveObject(textbox)
    }
}
