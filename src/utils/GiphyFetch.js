const GIPHY_BASE_URL = 'https://api.giphy.com/v1';
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

export async function giphyFetch(path, params = {}) {
    const url = new URL(`${GIPHY_BASE_URL}${path}`);
    url.searchParams.set('api_key', GIPHY_API_KEY);

    for (const [ key, value ] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value);
        }
    }

    const response = await fetch(url);
    const data = await response.json();

    return { ok: response.ok, status: response.status, data };
}
