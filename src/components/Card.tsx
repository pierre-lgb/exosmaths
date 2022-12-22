import styles from "components/Card.module.css"

export default function Card({
    title,
    description
}: {
    title: string
    description: string
}) {
    return (
        <div className={styles.card}>
            <h2>
                {title} <span>{"->"}</span>
            </h2>

            <p>{description}</p>
        </div>
    )
}
