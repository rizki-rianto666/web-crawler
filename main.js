const { crawlPage } = require('./crawl.js')

async function main() {
    if (process.argv.length < 3 || process.argv.length > 3) {
        console.log("Invalid input")
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`Starting Crawl of ${baseURL}`)
    const pages = await crawlPage(baseURL, baseURL, {})

    Object.entries(pages).forEach(page => {
        console.log(page)
    });
}
main()