const { JSDOM } = require('jsdom')

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
    getURLsFromHTML
}