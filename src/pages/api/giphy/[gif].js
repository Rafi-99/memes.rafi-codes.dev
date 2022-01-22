import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyKey = process.env.GIPHY_API_KEY;
const giphyFetch = new GiphyFetch(giphyKey);

export default async function handler(request, response) {
    const { gif } = request.query;

    try {
        const results = await giphyFetch.random({ tag: gif });

        if (results.meta.status === 200  && results.data.id !== 'undefined') {
            const { url } = results.data;
            response.status(200).json({ url });
        }
        else {
            response.status(404).json({ error: '404: Not Found', message: 'GIF not found. Please try again with a valid query.' });
        }
    }
    catch (error) {
        response.status(500).json({ error: `${error.name}: ${error.message}`, message: 'Something went wrong. Please try again with a valid query.' });
    }
};