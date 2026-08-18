import Link from 'next/link';
import { endpoints, groupByProvider } from '@/utils/Endpoints';
import styles from '@styles/page/docs.module.css';

export const metadata = {
    title: 'Docs'
};

export default function Docs() {
    return (
        <div className='page'>
            <h1 className='page-heading'>rafi@meme-api: ~/docs</h1>
            <p className='page-tagline'>Explore the available endpoints. Routes are grouped by their provider.</p>

            {groupByProvider(endpoints).map((group) => {
                return (
                    <section key={group.provider} className={styles.section} style={{ '--accent-color': `var(${group.accentColor})` }}>
                        <h2 className={styles.sectionHeading}>{group.provider}</h2>

                        <div className={styles.list}>
                            {group.items.map((endpoint) => (
                                <div key={endpoint.key} className={styles.card}>
                                    <div className={styles.cardHead}>
                                        <span className={styles.method}>GET</span>
                                        <code>{endpoint.path}</code>
                                    </div>
                                    <p className={styles.description}>{endpoint.description}</p>
                                    {endpoint.params.length > 0 && (
                                        <div className={styles.params}>
                                            {endpoint.params.map((param) => (
                                                <span key={param.name} className={styles.param}>
                                                    <span className={styles.paramName}>{param.name}</span>
                                                    <span className={styles.paramExample}>e.g. {param.placeholder}</span>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}

            <div className='nav-row'>
                <Link href='/' className='nav-link'>← Home</Link>
                <Link href='/test' className='nav-link'>Test it out! →</Link>
            </div>
        </div>
    );
}
