import { createClient, TheOneClient } from '../src/index';

const URL = 'http://localhost:3000';
const KEY = 'some.fake.key';

const client = createClient(KEY);

test('it should create the client', async () => {
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(TheOneClient);
});

test('it should throw an error if no key is provided', async () => {
    expect(() => createClient('')).toThrowError(
        'Authentication key is required; Please go to `https://the-one-api.dev/sign-up` to obtain a key'
    );
});
