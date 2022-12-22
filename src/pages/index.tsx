import Card from "components/Card"
import Head from "next/head"
import Link from "next/link"
import styles from "styles/Home.module.css"

export default function Home() {
    return (
        <>
            <Head>
                <title>Accueil</title>
                <meta
                    name="description"
                    content="Lorem ipsum dolor sit amet."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <Link href="/tableau" legacyBehavior>
                        <a>
                            <Card
                                title="Tableau"
                                description="Tableau blanc pour afficher et disposer les exercices"
                            />
                        </a>
                    </Link>
                    <Link href="/pdf2png" legacyBehavior>
                        <a>
                            <Card
                                title="PDF vers PNG"
                                description="Outil pour isoler les exercices d'un PDF en images PNG"
                            />
                        </a>
                    </Link>
                    <Link
                        href="https://github.com/pierre-lgb/exosmaths"
                        legacyBehavior
                    >
                        <a target="_blank">
                            <Card
                                title="Github"
                                description="Code source complet de l'application"
                            />
                        </a>
                    </Link>
                </div>
            </main>
        </>
    )
}
