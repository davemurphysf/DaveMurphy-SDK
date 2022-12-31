import { createClient } from '@davemurphysf/liblab';
import { NextApiRequest, NextApiResponse } from 'next';

const theOneClient = createClient(process.env.THE_ONE_AUTH_KEY || '');
const LOTR_IDS = [
    '5cd95395de30eff6ebccde5c',
    '5cd95395de30eff6ebccde5b',
    '5cd95395de30eff6ebccde5d',
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
    function getRandomId() {
        return LOTR_IDS[Math.floor(Math.random() * 3)];
    }
    const quotesResponse = await theOneClient.getMovieQuotes(getRandomId());

    if (quotesResponse.ok) {
        res.status(200).json({ movies: quotesResponse.docs });
    } else {
        res.status(400).json({ error: quotesResponse.metadata.error });
    }
};
