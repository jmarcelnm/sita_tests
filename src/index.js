const { fetchURLs } = require('./concurrency');
const { getLicensePlateElement } = require('./licensePlate');

async function runConcurrencyExercise() {
  const urls = [
    'https://example.com',
    'https://example.org',
    'https://example.net'
  ]; // URLs to fetch.

  try {
    const responses = await fetchURLs(urls, 2); // Fetches the URLs with a maximum concurrency of 2.

    console.log('Fetched responses: ', responses); // Logs the fetched responses.
  } catch (error) {
    console.error('Error while fetching URLs: ', error); // Logs the error if the fetch operation fails.
  }
}

function runLicensePlateExercise() {
  console.log('License plate for index 0: ', getLicensePlateElement(0)); // First plate of 6-number group
}

async function main() {
  await runConcurrencyExercise(); // Runs the concurrency exercise.
  runLicensePlateExercise(); // Runs the license plate exercise.
}

main(); // Starts the main function.
