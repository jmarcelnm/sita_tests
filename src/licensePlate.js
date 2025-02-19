function getLicensePlateElement(n) {
    let numbers = 6; // The first plate number is 000000, followed by 000001.
    let letters = 0; // The numbers always come before the letters.

    let plate = Math.pow(10, numbers) * Math.pow(26, letters); // Starting plate: 10^(numbers) * 26^(letters).

    while (n >= plate) { // Finds the group where the nth element is located.
        n -= plate; // Subtracts the full plate of this group.

        numbers--; // Loses one number.
        letters++; // Gains one letter.

        plate = Math.pow(10, numbers) * Math.pow(26, letters); // Updates the plate for the next group.
    }

    const numericBase = Math.pow(10, numbers); // The numeric base is 10^(numbers).
    const numericPart = n % numericBase; // The numeric part is the remainder of n divided by the numeric base.

    let letterBase = Math.floor(n / numericBase); // The letter base is the quotient of n divided by the numeric base.

    const numericStr = numbers > 0 ? numericPart.toString().padStart(numbers, '0') : ''; // Converts the numeric part to a string with the given ammount of numbers.

    let letterPart = ''; // The letter part will be built from the letter base.

    for (let i = 0; i < letters; i++) { // Converts the letter base to a string with the given number of letters.
        const remainder = letterBase % 26; // 0 -> A, 1 -> B, ..., 25 -> Z.

        letterPart = String.fromCharCode(65 + remainder) + letterPart; // Converts a value in the range 0–25 to the ASCII code for the corresponding letter.
        letterBase = Math.floor(letterBase / 26); // Moves on to the next digit.
    }

    return numericStr + letterPart; // Returns the nth element in this license plate sequence.
}

module.exports = { getLicensePlateElement };
