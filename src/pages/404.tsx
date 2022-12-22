import Head from "next/head"
import styles from "styles/404.module.css"

export default function Error404() {
    return (
        <>
            <Head>
                <title>Page introuvable</title>
                <meta
                    name="description"
                    content="Cette page est introuvable. Erreur 404."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <div>
                    <h1 className={styles.errorTitle}>404</h1>

                    <h2 className={styles.errorMessage}>
                        Cette page est introuvable.
                    </h2>
                </div>
            </div>
        </>
    )
}
