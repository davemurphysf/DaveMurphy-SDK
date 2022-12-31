import crossFetch from 'cross-fetch';
import { API_URL_BASE, DEFAULT_CLIENT_OPTIONS } from './lib/contstants';
import {
    ApiResponse,
    ErrorResponse,
    Fetch,
    OneAPIResponse,
    SucccessResponse,
    TheOneClientOptions,
} from './lib/types';

/**
 * The One Client
 *
 * Isomorphic client for calling The One API
 */
export default class TheOneClient {
    protected authKey: string;
    protected shouldThrowOnError: boolean;
    protected fetch: Fetch;

    /**
     * Create a new instance of TheOneClient
     * @param {string} key - Your authentication key; Please go to `https://the-one-api.dev/sign-up` to obtain a key
     * @param {Object} options - Client creation options
     * @param {boolean} options.shouldThrowOnError - Should the client throw on an error
     * @param {Fetch} options.fetch - A custom fetch implementation.
     */

    constructor(protected key: string, options?: TheOneClientOptions) {
        if (!key)
            throw new Error(
                'Authentication key is required; Please go to `https://the-one-api.dev/sign-up` to obtain a key'
            );

        this.authKey = key;

        const clientOptions: TheOneClientOptions = {
            ...DEFAULT_CLIENT_OPTIONS,
            ...(options ?? {}),
        };

        this.shouldThrowOnError = clientOptions.shouldThrowOnError || false;
        this.fetch = clientOptions.fetch || crossFetch;
    }

    /**
     * Return a list of all movies, including the "The Lord of the Rings" and the "The Hobbit" trilogies
     *
     * @param {number} [limit=100] - Maximum number of items to return; default is 100
     * @param {number} [page] - Which page to start returning items
     * @param {number} [offset] - Number of items to skip before returning results
     * @returns {Promise<ApiResponse>}
     */

    async listMovies(limit: number = 100, page?: number, offset?: number): Promise<ApiResponse> {
        return this.makeAPICall('/movie', limit, page || 0, offset || 0);
    }

    /**
     * Request one specific movie by id
     * @param {string} - The id of the movie to fetch
     * @returns {Promise<ApiResponse>}
     */

    async getMovie(movieId: string): Promise<ApiResponse> {
        return this.makeAPICall(`/movie/${movieId}`, 1, 0, 0);
    }

    /**
     * Request all movie quotes for one specific movie (only working for the LotR trilogy)
     *
     * @param {number} [limit=100] - Maximum number of items to return; default is 100
     * @param {number} [page] - Which page to start returning items
     * @param {number} [offset] - Number of items to skip before returning results
     * @returns {Promise<ApiResponse>}
     */

    async getMovieQuotes(
        movieId: string,
        limit: number = 100,
        page?: number,
        offset?: number
    ): Promise<ApiResponse> {
        return this.makeAPICall(`/movie/${movieId}/quote`, limit, page || 0, offset || 0);
    }

    private async makeAPICall(
        path: string,
        limit: number,
        page: number,
        offset: number
    ): Promise<ApiResponse> {
        try {
            const response = await this.fetch(
                `${API_URL_BASE}/${path}?limit=${limit}&page=${page}&offset=${offset}`,
                { headers: { Authorization: `Bearer ${this.authKey}` } }
            );

            if (!response.ok) {
                const msg = `API returned status ${response.status}; statusText = ${response.statusText}`;

                if (this.shouldThrowOnError) {
                    throw new Error(msg);
                }

                return {
                    ok: false,
                    docs: [],
                    metadata: {
                        error: msg,
                    },
                } as ErrorResponse;
            }

            const body = (await response.json()) as OneAPIResponse;

            return {
                ok: true,
                docs: body.docs,
                metadata: {
                    total: body.total,
                    limit: body.limit,
                    offset: body.offset,
                    page: body.page,
                    pages: body.pages,
                },
            } as SucccessResponse;
        } catch (error) {
            if (this.shouldThrowOnError) {
                throw error;
            }

            return {
                ok: false,
                docs: [],
                metadata: {
                    error: `API returned an error: ${JSON.stringify(error)}`,
                },
            } as ErrorResponse;
        }
    }
}
