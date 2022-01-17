export default async function handler(request, response) {
    const { subreddit } = request.query;
    response.status(200).json({ subreddit });
};