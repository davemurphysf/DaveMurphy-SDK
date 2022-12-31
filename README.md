# The Lord of the Rings SDK

An isomorphic JavaScript client for the Movies endpoint of [The One API](https://the-one-api.dev/)

## Usage

1. Install the SDK

```sh
yarn add @davemurphysf/liblab
```

or

```sh
npm install @davemurphysf/liblab
```

2. Create a client instance

```js
import { createClient } from '@davemurphysf/liblab';

const theOneClient = createClient('my-api-key');
```

3. Call an endpoint

```js
const movies = await theOneClient.listMovies();
```

### Setup Options

An optional second parameter can be passed to `createClient` in the form of an object with the following keys (values):

-   `shouldThrowOnError` (boolean): Whether the client should throw an exception when an error is returned from the API or whether it should set `ok` to false and populate the `metadata.error` field instead
-   `fetch` (Fetch): The SDK uses the [`cross-fetch`](https://www.npmjs.com/package/cross-fetch) library to make HTTP requests for both browser and Node environments, but an alternative fetch implementation can be provided as an option (perhaps for Cloudflare Workers).

```js
import { createClient } from '@davemurphysf/liblab';

const theOneClient = createClient('my-api-key', {
    shouldThrowOnError: false,
    fetch: fetch, // Using the Fetch API available already in the environment instead of the cross-fetch library
});
```

## Client APIs

```ts
async listMovies(limit: number = 100, page?: number, offset?: number) : Promise<ApiResponse>
```

### listMovies

Params:

-   `limit` (optional): Maximum number of results to return
-   `page` (optional): Which page to start returning items
-   `offset` (optional): The number of results to skip before returning

```ts
async getMovie(movieId: string) : Promise<ApiResponse>
```

### getMovie

Params:

-   `movieId`: the id of the specific movie to fetch

```ts
async getMovieQuotes(movieId: string, limit: number = 100, page?: number, offset?: number) : Promise<ApiResponse>
```

### getMovieQuotes

Params:

-   `movieId`: the id of the specific movie to fetch
-   `limit` (optional): Maximum number of results to return
-   `page` (optional): Which page to start returning items
-   `offset` (optional): The number of results to skip before returning

## Types

```ts
type Movie = {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
};

type Quote = {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    id: string;
};

type SuccessMetadata = {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
};

type ErrorMetadata = {
    error: string;
};

type SucccessResponse = {
    ok: true;
    docs: Array<Movie | Quote>;
    metadata: SuccessMetadata;
};

type ErrorResponse = {
    ok: false;
    docs: [];
    metadata: ErrorMetadata;
};

type ApiResponse = SucccessResponse | ErrorResponse;
```

## Examples

The SDK includes two sample implementations to aid in starting development (both are written in TypeScript):

-   [Next.js](https://github.com/davemurphysf/DaveMurphy-SDK/tree/main/examples/next-ts)
-   [Node.js](https://github.com/davemurphysf/DaveMurphy-SDK/tree/main/examples/node-ts)
