const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strips protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
});

test('normalizeURL strips trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL lowers capital', () => {
    const input = 'https://Blog.Boot.dev/path';
    const actual = normalizeURL(input) //we don't need .toLowerCase() in the logic, URL know url is case insensitive
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
    const input = 'http://Blog.Boot.dev/path';
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})


test('getURLsFromHTML absolute', () => {
    const inputHTMLBod = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">
                Boot.dev BLog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBod, inputBaseURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBod = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev BLog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBod, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML both url types', () => {
    const inputHTMLBod = `
    <html>
        <body>
            <a href="/path1/">
                Boot.dev BLog 1
            </a>
            <a href="https://blog.boot.dev/path2/">
                Boot.dev BLog 2
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBod, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBod = `
    <html>
        <body>
            <a href="invalid">
               invalid
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBod, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})