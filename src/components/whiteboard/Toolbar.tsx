import "tippy.js/dist/tippy.css"
import "tippy.js/themes/light-border.css"
import "tippy.js/animations/shift-away.css"

import styles from "components/whiteboard/Toolbar.module.css"
import { fabric } from "fabric"
import { CanvasContext } from "providers/CanvasContextProvider"
import { ChangeEvent, useContext, useState } from "react"
import {
    RiArrowGoBackLine as UndoIcon,
    RiArrowGoForwardLine as RedoIcon,
    RiCheckboxBlankCircleFill as CircleIcon,
    RiDeleteBin6Line as DeleteIcon,
    RiGridLine as GridIcon,
    RiImage2Line as ImageIcon,
    RiPencilLine as PencilIcon,
    RiText as TextIcon
} from "react-icons/ri"

import Tippy from "@tippyjs/react"

export default function Toolbar() {
    const { canvas, features } = useContext(CanvasContext)

    const [showGrid, setShowGrid] = useState(false)
    const [drawingMode, setDrawingMode] = useState(false)
    const [drawingColor, setDrawingColor] = useState("#474D66")

    const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]

        const reader = new FileReader()
        reader.onload = (f: any) => {
            const data = f.target.result
            fabric.Image.fromURL(data as string, (img) => {
                img.set({
                    left: 0,
                    top: 0,
                    angle: 0,
                    cornerSize: 10
                })
                canvas?.add(img)
                canvas?.setActiveObject(img)
            })
        }
        reader.readAsDataURL(file)
        event.target.value = ""
    }

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.group}>
                    <Tippy content="Image">
                        <button
                            className={styles.button}
                            onClick={() => {
                                document.getElementById("image-input")?.click()
                            }}
                        >
                            <ImageIcon size={20} />
                        </button>
                    </Tippy>
                    <input
                        type="file"
                        id="image-input"
                        hidden
                        accept="image/*"
                        onChange={handleAddImage}
                        style={{ display: "none" }}
                    />
                </div>
                <div className={styles.group}>
                    <Tippy content="Crayon">
                        <button
                            className={styles.button}
                            onClick={() => {
                                if (!canvas) {
                                    return
                                }

                                setDrawingMode(!drawingMode)
                                canvas.isDrawingMode = !canvas.isDrawingMode
                                canvas.freeDrawingBrush.width = 5
                                canvas.freeDrawingBrush.color = drawingColor
                            }}
                            data-active={drawingMode}
                        >
                            <PencilIcon size={20} />
                        </button>
                    </Tippy>
                    <Tippy
                        content={
                            <div className={styles.colorMenu}>
                                {[
                                    "#474D66",
                                    "#3366ff",
                                    "#53B88B",
                                    "#FFFFFF"
                                ].map((color, index) => (
                                    <button
                                        key={index}
                                        className={styles.button}
                                        onClick={() => {
                                            setDrawingColor(color)
                                            canvas!.freeDrawingBrush.color =
                                                color
                                        }}
                                    >
                                        <CircleIcon
                                            size={15}
                                            color={color}
                                            style={
                                                color === "#FFFFFF"
                                                    ? {
                                                          border: "1px solid #CCCCCC",
                                                          borderRadius: "50%"
                                                      }
                                                    : undefined
                                            }
                                        />
                                    </button>
                                ))}
                            </div>
                        }
                        interactive
                        theme="light-border"
                        animation="shift-away"
                        arrow={false}
                        offset={[0, 20]}
                    >
                        <button
                            className={styles.button}
                            style={{
                                cursor: "default"
                            }}
                        >
                            <CircleIcon
                                size={15}
                                color={drawingColor}
                                style={
                                    drawingColor === "#FFFFFF"
                                        ? {
                                              border: "1px solid #CCCCCC",
                                              borderRadius: "50%"
                                          }
                                        : undefined
                                }
                            />
                        </button>
                    </Tippy>
                    <Tippy content="Texte">
                        <button
                            className={styles.button}
                            onClick={() => {
                                features.text.addText("Lorem ipsum")
                            }}
                        >
                            <TextIcon size={20} />
                        </button>
                    </Tippy>
                    <Tippy content="Carreaux">
                        <button
                            className={styles.button}
                            onClick={() => {
                                setShowGrid(!showGrid)
                                features.grid.toggleGrid()
                            }}
                            data-active={showGrid}
                        >
                            <GridIcon size={20} />
                        </button>
                    </Tippy>
                </div>
                <div className={styles.group}>
                    <Tippy content="Annuler">
                        <button
                            className={styles.button}
                            onClick={() => {
                                features.history.undo()
                            }}
                        >
                            <UndoIcon size={20} />
                        </button>
                    </Tippy>
                    <Tippy content="Refaire">
                        <button
                            className={styles.button}
                            onClick={() => {
                                features.history.redo()
                            }}
                        >
                            <RedoIcon size={20} />
                        </button>
                    </Tippy>
                </div>
                <div className={styles.group}>
                    <Tippy content="Tout effacer">
                        <button
                            className={styles.button}
                            onClick={() => {
                                canvas?.clear()
                            }}
                        >
                            <DeleteIcon size={20} />
                        </button>
                    </Tippy>
                </div>
            </div>
        </div>
    )
}
