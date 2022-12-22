import Toolbar from "components/whiteboard/Toolbar"
import dynamic from "next/dynamic"
import Head from "next/head"
import CanvasContextProvider from "providers/CanvasContextProvider"

const Canvas = dynamic(() => import("components/whiteboard/Canvas"), {
    loading: () => <div>Chargement...</div>,
    ssr: false
})

export default function Whiteboard() {
    return (
        <>
            <Head>
                <title>Tableau</title>
                <meta
                    name="description"
                    content="Tableau blanc pour afficher et disposer les exercices"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <CanvasContextProvider>
                    <Canvas />
                    <Toolbar />
                </CanvasContextProvider>
            </div>
        </>
    )
}
