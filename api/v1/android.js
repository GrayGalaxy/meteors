const axios = require('axios')
const cheerio = require('cheerio')
const getStoreUrl = require('../../utils/storeUrl')

const fetchData = async (request_url) => {
	const res = await axios(request_url)
	if (!res) return
	const $ = cheerio.load(res.data)

	// get TITLE
	let title = $('[itemprop="name"]>div').text()
	title = title || $('h1[itemprop="name"]').text()

	// get IMAGE
	let image = $('img[itemprop="image"][alt*="Cover"]').attr('src')
	image = image || $('img[itemprop="image"]:first').attr('src')
	image = image.replace(/(\/\/.*\.com\/.*)(\=(?:w|s)[0-9]{1,4}(?:-rw)?)/i, '$1=s128')

	// get URL
	let url = $('link[hreflang="x-default"]').attr('src')
	url = url || $('meta[property="og:url"]').attr('content')
	url = url.replace('&rdid=sp0n.citizen&feature=md&offerId', '')

	// get AUTHOR
	let author = {}
	author.name = $('div>span>a[href*="store/apps/dev"]:first').text()
	author.url = $('div>span>a[href*="store/apps/dev"]:first').attr('href')
	if (!author.url.match('play.google.com')) author.url = `https://play.google.com${author.url}`

	// get CATEGORY
	let category = $('[itemprop="genre"]').text()

	// get PRICE
	let price = $('meta[itemprop="price"]').attr('content')
	price = price === '0' ? 'Free' : price

	// get RATING
	let rating = $('.BHMmbe').text()

	return { title, image, url, author, category, price, rating }
}

module.exports = async (req, res) => {
	const { id, regn } = req.query
	if (!id) res.status(404).end('ID is not given, can not process request')

	const request_url = getStoreUrl('android', id, regn)
	const result = await fetchData(request_url)

	if (result) res.send(result)
	else res.status(404).send('Unable to process request')
}
