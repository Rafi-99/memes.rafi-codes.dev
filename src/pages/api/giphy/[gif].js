import { GiphyFetch } from '@giphy/js-fetch-api';

const giphyKey = process.env.GIPHY_API_KEY;
const giphyFetch = new GiphyFetch(giphyKey);

export default async function handler(request, response) {
    const { gif } = request.query;

    await giphyFetch.random({ tag: gif }).then((results) => {
        const url = results.data.images.original.url;
        response.status(200).json({ url });
    }).catch((error) => {
        response.status(500).json({ error: `${error.name}: ${error.message}`, message:'Something went wrong. Please try again with a valid query.' });
    });
};