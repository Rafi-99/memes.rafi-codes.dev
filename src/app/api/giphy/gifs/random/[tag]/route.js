import { NextResponse } from 'next/server';
import { giphyFetch } from '@/utils/GiphyFetch';

export async function GET(request, { params }) {
    const { tag } = await params;

    try {
        const { ok, data } = await giphyFetch('/gifs/random', { tag });
        const imageUrl = data?.data?.images?.original?.url;

        if (ok && imageUrl) {
            return NextResponse.json({ success: true, url: imageUrl }, { status: 200 });
        }

        return NextResponse.json({ success: false, error: '404: Not Found', message: 'GIF not found. Please try again with a valid query.' }, { status: 404 });
    }
    catch (error) {
        return NextResponse.json({ success: false, error: `${error.name}: ${error.message}`, message: 'Something went wrong. Please try again with a valid query.' }, { status: 500 });
    }
}
