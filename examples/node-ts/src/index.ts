import { createClient } from '@davemurphysf/liblab';
import PromptSync from 'prompt-sync';

const go = async () => {
    const prompt = PromptSync({ sigint: true });

    const key = prompt('Hello!  Please enter your One API Key: ');

    if (!key) {
        prompt('Hmmm... That does not look like a valid key; exiting');
        process.exit(1);
    }

    const theOneClient = createClient(key, { shouldThrowOnError: false });

    const movies = await theOneClient.listMovies();

    if (!movies.ok) {
        console.error(`Hmmm... something went wrong; the response was not ok when fetching Movies`);
        console.error(`Error message: ${movies.metadata.error}`);
        process.exit(1);
    }

    console.log('Here is the result of calling the /movie endpoint');
    console.log(JSON.stringify(movies, null, 4));

    const LOTR_IDS = [
        '5cd95395de30eff6ebccde5c',
        '5cd95395de30eff6ebccde5b',
        '5cd95395de30eff6ebccde5d',
    ]; // Need to use this because quotes are not available on the Hobbit movies

    const randomMovieId = LOTR_IDS[Math.floor(Math.random() * 3)];

    const quotes = await theOneClient.getMovieQuotes(randomMovieId);

    if (!quotes.ok) {
        console.error(`Hmmm... something went wrong; the response was not ok when fetching Quotes`);
        console.error(`Error message: ${quotes.metadata.error}`);
        process.exit(1);
    }

    console.log(`Here is the result of calling the /movie/${randomMovieId}/quote endpoint`);
    console.log(JSON.stringify(quotes, null, 4));

    console.log('Remember: not all who wander are lost');

    process.exit();
};

go();
