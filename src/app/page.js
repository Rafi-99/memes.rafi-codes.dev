import Link from 'next/link';
import { SiGiphy } from 'react-icons/si';
import styles from '@styles/page/index.module.css';

export const metadata = {
    title: 'Home'
};

export default function Home() {
    return (
        <div className='page'>
            <h1 className={`page-heading ${styles.heading}`}>
                <Link href='https://www.rafi-codes.dev/' rel='noopener noreferrer' target='_blank'>
                    <span className={styles.user}>rafi@meme-api</span><span className={styles.path}>:~$</span>
                </Link>
            </h1>

            <p className='page-tagline'>Random memes. On demand. For everyone.</p>

            <div className={styles.sources}>
                <Link href='https://giphy.com/' rel='noopener noreferrer' target='_blank' aria-label='Link to Giphy' className={`${styles.source} ${styles.giphy}`}><SiGiphy /></Link>
            </div>

            <pre className={styles.example}>
                <span className={styles.exampleLabel}>Try:</span> <span className={styles.exampleMethod}>GET</span> <span className={styles.examplePath}>/api/giphy/gifs/random/[tag]</span>
            </pre>

            <div className={styles.ctaRow}>
                <Link href='/test' className={styles.ctaButton}>Test it out! →</Link>
                <Link href='/docs' className={styles.ctaButton}>View the docs →</Link>
            </div>
        </div>
    );
}
