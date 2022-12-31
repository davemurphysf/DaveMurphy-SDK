import { createClient } from '@davemurphysf/liblab';
import { NextApiRequest, NextApiResponse } from 'next';

const theOneClient = createClient(process.env.THE_ONE_AUTH_KEY || '');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const moviesResposne = await theOneClient.listMovies();

    if (moviesResposne.ok) {
        res.status(200).json({ movies: moviesResposne.docs });
    } else {
        res.status(400).json({ error: moviesResposne.metadata.error });
    }
};
