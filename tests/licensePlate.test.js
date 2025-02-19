const { getLicensePlateElement } = require('../src/licensePlate');

describe('getLicensePlateElement', () => {
    test('It should return "000000" for index 0', () => {
        expect(getLicensePlateElement(0)).toBe("000000"); // First plate of 6-number group
    });

    test('It should return "000001" for index 1', () => {
        expect(getLicensePlateElement(1)).toBe("000001"); // Second plate of 6-number group
    });

    test('It should return "999999" for index 999999', () => {
        expect(getLicensePlateElement(999999)).toBe("999999"); // Last plate of 6-number group
    });

    test('It should return "00000A" for index 1000000', () => {
        expect(getLicensePlateElement(1000000)).toBe("00000A"); // First plate of 5-number + 1-letter group
    });

    test('It should return "00001A" for index 1000001', () => {
        expect(getLicensePlateElement(1000001)).toBe("00001A"); // Second plate of 5-number + 1-letter group
    });

    test('It should return "99999Z" for index 3599999', () => {
        expect(getLicensePlateElement(3599999)).toBe("99999Z"); // Last plate of 5-number + 1-letter group
    });

    test('It should return "0000AA" for index 3600000', () => {
        expect(getLicensePlateElement(3600000)).toBe("0000AA"); // First plate of 4-number + 2-letter group
    });
});
