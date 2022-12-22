import JSZip from "jszip"
import Head from "next/head"
import * as PDFJS from "pdfjs-dist"
import { ChangeEvent, useState } from "react"
import styles from "styles/Pdf2Png.module.css"

// import trimCanvas from "trim-canvas"

// Needed for PDFJS to work
PDFJS.GlobalWorkerOptions.workerSrc =
    "//cdn.jsdelivr.net/npm/pdfjs-dist@3.1.81/build/pdf.worker.js"

export default function PDFtoPNG() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // This function will be called when the user selects a PDF file
    async function handlePdfFile(event: ChangeEvent<HTMLInputElement>) {
        // Get the selected PDF file
        const file = event.target.files![0]
        setFile(file)

        const uri = URL.createObjectURL(file)
        // Load the PDF file using PDF.js
        const pdf = await PDFJS.getDocument({ url: uri }).promise
        // Render each page of the PDF to a canvas element

        const zip = new JSZip()

        const start = +(prompt("Page du premier exercice :", "1") || 1)
        const end = +(
            prompt("Page du dernier exercice :", `${pdf.numPages}`) ||
            pdf.numPages
        )

        setLoading(true)

        for (let i = start; i <= end; i++) {
            // Read page from pdf
            const page = await pdf.getPage(i)

            // Create a canvas element to render the page
            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")
            const viewport = page.getViewport({ scale: 2 })
            canvas.width = viewport.width
            canvas.height = viewport.height

            // Render the page to the canvas
            await page.render({
                canvasContext: context!,
                viewport: viewport
            }).promise

            // Trim the white space from the canvas
            const trimmedCanvas = trimCanvas(canvas)

            // Create a PNG image from the trimmed canvas
            const pngUrl = trimmedCanvas.toDataURL()
            const base64 = pngUrl.replace(/^data:image\/(png|jpg);base64,/, "")

            // Add the image to the zip archive
            zip?.file(`ex${1 + (i - start)}.png`, base64, { base64: true })
        }

        const filename = file.name.replace(".pdf", "")

        await zip.generateAsync({ type: "blob" }).then((blob) => {
            // Create a Blob URL for the file
            const url = URL.createObjectURL(blob)

            // Create a link element
            const a = document.createElement("a")
            a.innerText = "Télécharger"
            a.href = url

            a.download = `${filename}.zip`

            // Trigger a click on the link to start the download
            a.click()

            event.target.value = ""
            setFile(null)
        })

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>PDF vers PNG</title>
                <meta
                    name="description"
                    content="Outil pour isoler les exercices d'un PDF en images PNG"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div>
                    <button
                        className={styles.button}
                        onClick={() => {
                            document.getElementById("file-input")?.click()
                        }}
                        disabled={loading}
                    >
                        {loading ? "Calcul en cours..." : "Choisir un fichier"}
                    </button>
                    <p>{file ? file.name : "Aucun fichier choisi"}</p>
                    <input
                        hidden
                        id="file-input"
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfFile}
                    />
                </div>
            </div>
        </>
    )
}

function trimCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d")

    const pixels = ctx!.getImageData(0, 0, canvas.width, canvas.height)
    const { data } = pixels

    let minX = canvas.width
    let minY = canvas.height
    let maxX = 0
    let maxY = 0

    // Find the bounds of the non-white pixels
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
            continue
        }
        const x = (i / 4) % canvas.width
        const y = ~~(i / 4 / canvas.width)

        if (x < minX) {
            minX = x
        }
        if (x > maxX) {
            maxX = x
        }
        if (y < minY) {
            minY = y
        }
        if (y > maxY) {
            maxY = y
        }
    }

    // Create a new canvas with the same dimensions as the bounds
    const trimmedCanvas = document.createElement("canvas")
    trimmedCanvas.width = maxX - minX + 1
    trimmedCanvas.height = maxY - minY + 1
    const trimmedCtx = trimmedCanvas.getContext("2d")

    // Draw the original canvas onto the trimmed canvas, offsetting the image so that only the non-white pixels are visible
    trimmedCtx?.drawImage(
        canvas,
        minX,
        minY,
        maxX - minX + 1,
        maxY - minY + 1,
        0,
        0,
        maxX - minX + 1,
        maxY - minY + 1
    )

    return trimmedCanvas
}
