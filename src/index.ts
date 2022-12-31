import { TheOneClientOptions } from './lib/types';
import TheOneClient from './TheOneClient';

export { default as TheOneClient } from './TheOneClient';

/**
 * Creates a new Client.
 */
export const createClient = (key: string, options?: TheOneClientOptions) => {
    return new TheOneClient(key, options);
};
