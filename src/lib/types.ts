export type TheOneClientOptions = {
    shouldThrowOnError?: boolean;
    fetch?: Fetch;
};

export type Fetch = typeof fetch;

export type Movie = {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
};

export type Quote = {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    id: string;
};

export type OneAPIResponse = {
    docs: Array<Movie | Quote>;
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
};

export type SuccessMetadata = {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
};

export type ErrorMetadata = {
    error: string;
};

export type SucccessResponse = {
    ok: true;
    docs: Array<Movie | Quote>;
    metadata: SuccessMetadata;
};

export type ErrorResponse = {
    ok: false;
    docs: [];
    metadata: ErrorMetadata;
};

export type ApiResponse = SucccessResponse | ErrorResponse;
