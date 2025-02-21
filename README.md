# SITA Technical Test

This project contains solutions for two exercises: a **concurrency exercise** and a **license plate generation problem**.

## Concurrency Exercise

### Statement

Given an array of URLs and a `MAX_CONCURRENCY` integer, implement a function that will asynchronously fetch each URL,
not requesting more than `MAX_CONCURRENCY` URLs at the same time. The URLs should be fetched as soon as possible.
The function should return an array of responses for each URL.

### Solution

- I started by creating an array that had the same length as the list of URLs which held the response for each fetched URL, in the same order as they were provided.
- I also created a Set that kept track of how many fetches were running at the same time.
- For each loop over the URLs:
   - It starts fetching a URL.
   - It handles and stores the fetched promise.
   - It handles a possible error if the fetch operation fails.
   - It removes the promise from the Set after the fetch operation.
   - It adds the promise to the Set after it's creation.
- After starting each fetch, I checked if the number of active fetches reached the `MAX_CONCURRENCY` limit, and if so, I paused the loop by using the `Promise.race` function (waits for the fastest of the currently running fetches to complete before starting a new one).
- Finally, I waited for all the fetch operations to finish to then return the result for each URL.

## The License Plate Problem

### Statement

You work for the DMV. You have a specific, sequential way of generating new license plate numbers:

- Each license plate number has 6 alphanumeric characters.
- The numbers always come before the letters.

- The first plate number is 000000, followed by 000001.
- Finally, when you arrive at 999999, the next entry would be 00000A, Followed by 00001A.
- When you arrive at 99999A, the next entry is 00000B.
- After following the pattern to 99999Z, the next in the sequence would be 0000AA.
- When 9999AA is reached, the next in the series would be 0000AB.

The pattern overview looks a bit like the following:

000000 -> 000001 -> ... -> 999999 -> 00000A -> 00001A -> ... -> 99999A -> 00000B -> 00001B -> ... -> 99999Z -> 0000AA -> 0001AA -> ... -> 9999AA -> 0000AB -> 0001AB -> ... -> 9999ZZ -> 000AAA -> 001AAA -> ... -> ZZZZZZ

The goal is to write a function that takes some index n as a parameter and returns the nth element in this license plate sequence.

### Solution

- The license plates start with 6 numbers (like "000000") and no letters. I used two variables to keep track of the current “group”:
   - `numbers` for the 6-digit group.
   - `letters` starts at 0 because for the 6-digit group there are no letters.
- The idea is that each “group” (like all 6-digit plates, or the next group with 5 digits and 1 letter) has a fixed number of plates. For example, when `numbers = 6` and `letters = 0`, there are `10⁶ (1,000,000)` plates.
- Then, I used a loop to figure out if the given index `n` falls in the current group. If `n` is greater than or equals to the number of plates in the group, I subtracted that count from `n` and moved to the next group by:
   - Decreasing `numbers` by 1 (drops a digit)
   - Increasing `letters` by 1 (adds a letter)
- I've updated the `plate` count for the new group, and repeated the process until `n` is within the current group.
- Once I knew the correct group, I had to figure out exactly which plate it was in that group:
   - The numeric base is `10^(numbers)`.
   - The numeric part is the remainder of `n` divided by the numeric base (`10^(numbers)`).
   - The letter base is the quotient of `n` divided by the numeric base (`10^(numbers)`).
- The numeric part was converted to a string and padded with zeros so that it always had the correct number of digits.
- The letter part was built by converting the letter base into a `base‑26` number (because there are 26 letters in the alphabet).
   - I got the remainder of the letter base by dividing it by 26: `0 -> A`, `1 -> B`, `...`, `25 -> Z`
   - I converted that remainder to a letter by adding it to `65` (the ASCII code for `A`) and then converted it back to a character.
   - I built the letter string from right to left by prepending the new letter.
   - I updated the letter base by dividing it by 26 (and taking the floor), moving on to the next "digit" in the `base‑26` number.
- Finally, I concatenated the numeric string with the letter part and returned it, that's the `nth` license plate in the sequence.

## Run the Code

1. Clone the repository:

   ```bash
   git clone https://github.com/jmarcelnm/sita_tests.git
   cd sita_tests
   ```

2. Build the Docker image:

   ```bash
   docker-compose build
   ```

3. Install dependencies inside the Docker container:

   ```bash
   docker-compose run app sh -c "npm install"
   ```

4. Run the tests using Jest:

   ```bash
   docker-compose run app sh -c "npm test"
   ```
