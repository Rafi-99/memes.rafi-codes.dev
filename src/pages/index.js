import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { SiGiphy, SiReddit } from 'react-icons/si';
import styles from '../styles/pages/index.module.css';

export default function Home() {
    return (
        <>
            <Head>
                <title>Meme API | Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.content}>
                <h1>🎉 Welcome!</h1>
                <p>This is my custom Meme API I created using Next.js API routes.</p>
                <p>Supported meme sources are listed below: </p>
                <ul>
                    <li><Link href='https://giphy.com/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Giphy'><SiGiphy />&nbsp;Giphy</a></Link></li>
                    <li><Link href='https://giphy.com/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Reddit'><SiReddit />&nbsp;Reddit</a></Link></li>
                </ul>
                <Image src="https://media.giphy.com/media/IwAZ6dvvvaTtdI8SD5/giphy.gif" alt="Random meme from The Office" width={480} height={400} />
                <p>Enjoy indulging on the memes!</p>
            </div>
        </>
    );
};