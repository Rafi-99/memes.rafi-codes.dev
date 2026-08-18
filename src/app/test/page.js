import Link from 'next/link';
import MemeTester from '@components/MemeTester';

export const metadata = {
    title: 'Test'
};

export default function Test() {
    return (
        <div className='page'>
            <h1 className='page-heading'>rafi@meme-api: ~/test</h1>
            <p className='page-tagline'>Run a real request against an endpoint and preview the result. No Postman required.</p>
            <MemeTester />
            <div className='nav-row'>
                <Link href='/' className='nav-link'>← Home</Link>
                <Link href='/docs' className='nav-link'>Docs →</Link>
            </div>
        </div>
    );
}
