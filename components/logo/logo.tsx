import styles from './logo.module.css';

export default function Logo() {
    return (
        <a
            href={process.env.NEXT_PUBLIC_ANAS_ATTOUM_PORTFOLIO}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.containerLogo}
        >
            <div className={styles.logo}>
                <div className={styles.left}>
                    <div className={styles.mid}></div>
                </div>
                <div className={styles.right}>Anas Attoum</div>
            </div>
        </a>
    );
}