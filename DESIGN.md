# SDK Design

## Structure

I attempted to follow best practices by having separate top-level folders by concern:

-   `src` - SDK implementation source files
    -   `lib` - supporting/library files
-   `test` - tests
    -   I only included a couple of unit tests but could have had serarate folders for unit and integration/e2e tests
-   `examples` - example client/browswer and server implementation
-   `dist` - compiled/transpiled files for use in distributed package/production

## Dependencies

As a general rule, you should try to have as few dependencies as possible for a SDK (to minimize package size, maintenance, and security surface area). Since I wanted to make this SDK isomorphic (to run on both the browser and server), this SDK includes one dependency, `cross-fetch`, to allow for using a predictable `fetch` implementation on both the browser and server.

## Implementation

I used a class-based approach for two-main reasons: to make it clear and obvious when the SDK is initialzed and used (via the `new` keyword) and for ease of hiding internal implementation details via `protected` and `private` declarations.

I added an optional `options` object to the client initialization (rather than additional function paramters) to allow for ease adding additional inputs in the future.

Developers can be opinionated about error handling and, specifically in JavaScript, should code throw exceptions or not, so I added the ability to control that behavior as an option.

The ability to pass-in and use a custom `Fetch` implementation was something I've needed to use myself recently with Cloudflare Workers, and I included it as an example as much as anything.
