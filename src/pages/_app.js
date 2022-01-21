import Footer from '../components/Footer';
import '../styles/global/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Footer />
        </>
    );
};