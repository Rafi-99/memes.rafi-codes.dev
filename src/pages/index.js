import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { SiGiphy, SiReddit } from 'react-icons/si';
import styles from '../styles/index.module.css';

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

            <footer className={styles.footer}>
                <small>Designed by Rafi | &copy; {new Date().getFullYear()}</small>
                <div className={styles.icons}>
                    <Link href='https://www.facebook.com/rafi2022/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Rafi&apos;s Facebook'><FaFacebookSquare /></a></Link>
                    <Link href='https://www.github.com/Rafi-99/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Rafi&apos;s GitHub'><FaGithubSquare /></a></Link>
                    <Link href='https://www.instagram.com/rafi_the_md/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Rafi&apos;s Instagram'><FaInstagramSquare /></a></Link>
                    <Link href='https://www.linkedin.com/in/rafi2018/'><a rel='noopener noreferrer' target='_blank' aria-label='Link to Rafi&apos;s LinkedIn'><FaLinkedin /></a></Link>
                </div>
            </footer>
        </>
    );
}