const { normalizeURL } = require('./crawl.js')
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