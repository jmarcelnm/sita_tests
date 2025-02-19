async function fetchURLs(urls, maxConcurrency) {
    const responses = new Array(urls.length); // Initializes an array to store the responses for each URL.
    const fetches = new Set(); // Tracks the active fetch promises.

    for (let i = 0; i < urls.length; i++) { // Loops through the URLs array until all the URLs have been fetched.
        const promise = fetch(urls[i]) // Fetches the current URL response.
            .then(response => responses[i] = response) // Stores the current URL response.
            .catch(error => responses[i] = error) // Handles a possible error if the fetch operation fails.
            .finally(() => fetches.delete(promise)); // Removes the promise from the set once it's completed.

        fetches.add(promise); // Adds the promise to the set.

        if (fetches.size >= maxConcurrency) {
            await Promise.race(fetches); // Waits for the fastest fetch operation to finish before scheduling another.
        }
    }

    await Promise.all(fetches); // Waits until all the fetch operations have completed.

    return responses; // The function should return an array of responses for each URL.
}

module.exports = { fetchURLs };
