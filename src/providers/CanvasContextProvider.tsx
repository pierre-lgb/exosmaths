import { fabric } from "fabric"
import { createContext, ReactNode, useState } from "react"

type CanvasContextValue = {
    canvas: fabric.Canvas | null
    features: any
    setCanvas: Function
    setFeatures: Function
}

export const CanvasContext = createContext<CanvasContextValue>({
    canvas: null,
    features: {},
    setCanvas: () => {},
    setFeatures: () => {}
})

export default function CanvasContextProvider({
    children
}: {
    children: ReactNode
}) {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [features, setFeatures] = useState({})

    const value = {
        canvas,
        features,
        setCanvas,
        setFeatures
    }

    return (
        <CanvasContext.Provider value={value}>
            {children}
        </CanvasContext.Provider>
    )
}
