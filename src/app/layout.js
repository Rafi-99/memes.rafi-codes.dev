import { JetBrains_Mono } from 'next/font/google';
import Footer from '@components/Footer';
import '@styles/global/globals.css';

const jetbrainsMono = JetBrains_Mono({ subsets: [ 'latin' ], variable: '--font-jetbrains-mono', display: 'swap' });

export const metadata = {
    title: {
        default: 'Meme API',
        template: 'Meme API | %s',
    },
    description: 'A lightweight API built with Next.js API routes for fetching memes.'
};

export const viewport = {
    themeColor: '#0a0d12',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
};

export default function RootLayout({ children }) {
    return (
        <html lang='en' className={jetbrainsMono.variable}>
            <body>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
