# Meme API | Next.js REST API

## About
Built using Next.js API routes, this custom Meme API fetches content from a variety of sources in order to serve a diverse range of memes to the end user. This project is currently being hosted on Vercel at the following url: https://memes.rafi-codes.dev

## Supported Sources
This API currently supports fetching memes from the following sources:

* [Giphy](https://giphy.com/)
* [Reddit](https://reddit.com/)

## Endpoints
The following endpoints can be used to interact with my API.

* <code>GET</code> /api/giphy/[search_term] 
* <code>GET</code> /api/reddit/[subreddit]