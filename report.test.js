const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test("sorting pages", () => {
    const input = {
        'https://wagslane.dev': 1,
        'https://wagslane.dev/path3': 3,
        'https://wagslane.dev/path2': 2,
        'https://wagslane.dev/path4': 4
    };
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/path4', 4],
        ['https://wagslane.dev/path3', 3],
        ['https://wagslane.dev/path2', 2],
        ['https://wagslane.dev', 1]

    ];
    expect(actual).toEqual(expected)
})