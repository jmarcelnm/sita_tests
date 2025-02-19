const { fetchURLs } = require('../src/concurrency');

global.fetch = jest.fn();

describe('fetchURLs', () => {
    beforeEach(() => {
        fetch.mockClear(); // Each test will start with a clean slate.
    });

    test('It should fetch all the URLs and return the responses in order', async () => {
        const urls = [
            'https://example.com',
            'https://example.org',
            'https://example.net'
        ]; // URLs to fetch.

        fetch.mockImplementation((url) =>
            new Promise((resolve) => {
                setTimeout(() => resolve({ url }), Math.random() * 50); // Simulates a network latency.
            })
        ); // Mocks the fetch function to return a promise that resolves with an object containing the URL.

        const results = await fetchURLs(urls, 2); // Fetches the URLs with a maximum concurrency of 2.

        expect(results).toHaveLength(urls.length); // Checks if the number of results is equal to the number of URLs.

        urls.forEach((url, index) => {
            expect(results[index]).toEqual({ url });
        }); // Loops over each URL and checks if the result equals to an object with that URL.
    });

    test('It should not allow to exceed the maximum concurrency', async () => {
        const urls = Array.from({ length: 10 }, (_, i) => `url${i + 1}`); // Dummy generated URLs to fetch.
        const maxConcurrency = 3; // Maximum number of concurrent fetches allowed.

        let current = 0; // Tracks how many fetches are running at any moment.
        let maxObservedConcurrency = 0; // Records the highest number of concurrent fetches observed during the test.

        fetch.mockImplementation((url) => {
            current++;
            maxObservedConcurrency = Math.max(maxObservedConcurrency, current); // Updates the maximum observed concurrency.

            return new Promise((resolve) => {
                setTimeout(() => {
                    current--;
                    resolve({ url });
                }, 50); // Simulates a network latency.
            }); // Mocks the fetch function to return a promise that resolves with an object containing the URL.
        });

        await fetchURLs(urls, maxConcurrency); // Fetches the URLs with a maximum concurrency of 3.

        expect(maxObservedConcurrency).toBeLessThanOrEqual(maxConcurrency); // Checks the maximum observed concurrency.
    });
});
