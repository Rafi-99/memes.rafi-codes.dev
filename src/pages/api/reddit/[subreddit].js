export default async function handler(request, response) {
    const { subreddit } = request.query;

    try {
        const redditFetch = await fetch(`https://www.reddit.com/r/${subreddit}/random.json`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const data = await redditFetch.json();

        if (redditFetch.ok && data[0] !== undefined) {
            const { title, permalink, url: image, score, num_comments: comments } = data[0].data.children[0].data;
            response.status(200).json({ title, url: `https://www.reddit.com${permalink}`, image, score, comments });
        }
        else {
            const message = redditFetch.status === 403 ? 'Unable to access subreddit. Forbidden response from Reddit.' : 'Subreddit not found. Please try again with a valid query.';
            response.status(500).json({ error: `${redditFetch.status }: ${redditFetch.statusText}`, message });
        }
    }
    catch (error) {
        response.status(500).json({ error: `${error.name}: ${error.message}`, message:'Something went wrong. Please try again with a valid query.' });
    }
};