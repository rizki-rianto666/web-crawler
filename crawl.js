const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentURL = normalizeURL(currentURL)
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }

    pages[normalizeCurrentURL] = 1
    console.log('Actively crawling ' + currentURL)

    try {
        const res = await fetch(currentURL)
        if (res.status > 399) {
            console.log(`error in fetch with status code: ${res.status} on page: ${currentURL}`)
            return pages
        }
        const contentType = res.headers.get("content-type")
        if (!contentType.includes('text/html')) {
            console.log(`non html response, content-type: ${contentType} on page: ${currentURL}`)
            return pages
        }
        const htmlBody = await res.text()

        const nextUrls = getURLsFromHTML(htmlBody, baseURL)
        for (const nextURL of nextUrls) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }

    return pages
}

//get urls from html function
function getURLsFromHTML(htmlBod, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBod);
    const linkElements = dom.window.document.querySelectorAll('a');

    linkElements.forEach(linkElement => {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log('Error found in relative: ' + err.message)
            }
        } else {
            // abs
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log('Error found in absolute: ' + err.message)
            }
        }
    })
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}