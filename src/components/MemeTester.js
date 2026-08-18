'use client';

import { useState } from 'react';
import { endpoints, buildPath, buildRequestLine, getByPath, isReady } from '@/utils/Endpoints';
import Dropdown from '@components/Dropdown';
import styles from '@styles/component/MemeTester.module.css';

export default function MemeTester() {
    const [ values, setValues ] = useState({});
    const [ status, setStatus ] = useState('idle');
    const [ result, setResult ] = useState(null);
    const [ imageFailed, setImageFailed ] = useState(false);
    const [ sourceKey, setSourceKey ] = useState(endpoints[0].key);
    const endpoint = endpoints.find((endpoint) => endpoint.key === sourceKey);
    const options = endpoints.map((endpoint) => ({ value: endpoint.key, label: endpoint.label }));

    const changeSource = (key) => {
        setSourceKey(key);
        setValues({});
        setStatus('idle');
        setResult(null);
    };

    const setParams = (name, value) => {
        setValues((previous) => ({ ...previous, [ name ]: value }));
    };

    const runRequest = async (event) => {
        event.preventDefault();

        if (!isReady(endpoint, values)) {
            return;
        }

        setStatus('loading');
        setResult(null);
        setImageFailed(false);

        try {
            const response = await fetch(buildPath(endpoint, values));
            const data = await response.json();

            setResult({ ok: response.ok, status: response.status, data });
            setStatus(response.ok ? 'success' : 'error');
        }
        catch (error) {
            setResult({ ok: false, status: 0, data: { error: error.name, message: error.message } });
            setStatus('error');
        }
    };

    const imageUrl = result?.ok ? getByPath(result.data, endpoint.imageKey) : null;

    return (
        <div className={styles.tester}>
            <form className={styles.form} onSubmit={runRequest}>
                <div className={`${styles.field} ${styles.fieldWide}`}>
                    <span className={styles.label}>Endpoint</span>
                    <Dropdown value={sourceKey} options={options} onChange={changeSource} />
                </div>

                {endpoint.params.map((param) => (
                    <div key={param.name} className={styles.field}>
                        <label htmlFor={param.name} className={styles.label}>{param.name}</label>
                        <input id={param.name} className={styles.input} type='text' value={values[param.name] ?? ''} onChange={(e) => setParams(param.name, e.target.value)} placeholder={param.placeholder} autoComplete='off' />
                    </div>
                ))}

                <button type='submit' className={styles.run} disabled={status === 'loading' || !isReady(endpoint, values)} style={{ '--accent-color': `var(${endpoint.accentColor})` }}>
                    {status === 'Loading…' ? 'Running…' : 'Run →'}
                </button>
            </form>

            <div className='terminal'>
                <div className='terminal-bar'>
                    <span className='terminal-dot' style={{ background: '#ff5f56' }} />
                    <span className='terminal-dot' style={{ background: '#ffbd2e' }} />
                    <span className='terminal-dot' style={{ background: '#27c93f' }} />
                    <span className='terminal-title'>{buildRequestLine(endpoint, values)}</span>
                </div>

                <div className={styles.mediaBox}>
                    {status === 'idle' && <p className={styles.placeholder}>Run a request to see the result here.</p>}
                    {status === 'loading' && <p className={styles.placeholder}>Loading…</p>}
                    {status === 'success' && imageUrl && !imageFailed && ( <img src={imageUrl} alt='Meme preview' className={styles.media} onError={() => setImageFailed(true)} /> )}
                    {status === 'success' && (!imageUrl || imageFailed) && <p className={styles.placeholder}>No previewable image was found in this response.</p>}
                    {status === 'error' && <p className={styles.errorText}>{result?.data?.message ?? 'Request failed.'}</p>}
                </div>
            </div>

            <div className={styles.outputSection}>
                <span className={styles.label}>API Output</span>
                <pre className={`scrollbar-thin ${styles.json} ${status === 'error' ? styles.jsonError : ''} ${!result ? styles.jsonIdle : ''}`}>
                    {result ? JSON.stringify(result.data, null, 2) : 'Responses from the API will appear here.'}
                </pre>
            </div>
        </div>
    );
}
