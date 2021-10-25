const axios = require('axios')
const cheerio = require('cheerio')
const storeUrl = require('../../utils/storeUrl')

const fetchData = async (request_url) => {
	const res = await axios(request_url)
	const $ = cheerio.load(res.data)

	// get TITLE
	let title = $('meta[name="ms.prod"]').attr('content')

	// get IMAGE
	let image = $('.pi-product-image picture img').attr('src')
	image = image || $('meta[property="og:image"]').attr('content')
	image = image || $('#image:first picture.c-image img').attr('src')

	// get URL
	let url = $('link[rel="canonical"]').attr('content')
	url = url || $('meta[property="og:url"]').attr('content')
	url = url.replace('&rdid=sp0n.citizen&feature=md&offerId', '')

	// get AUTHOR
	let author = {}
	author.name = $('#publisher div span').text()
	author.url = $('[data-m*="Publisher Website Uri"]').attr('href')

	// get CATEGORY
	let category = $('meta[name="ms.prod_cat"]').attr('content')

	// get PRICE
	let price = $('meta[itemprop="price"]').attr('content')
	price = price === '0' ? 'Free' : price
	price = price || $('div#productPrice .pi-price-text s').text()

	// get RATING
	let rating = $('#ratingSummary div.c-rating').attr('data-value')
	rating = parseFloat(rating)

	return { title, image, url, author, category, price, rating }
}

module.exports = async (req, res) => {
	const { id, regn } = req.query

	const url = storeUrl('microsoft', id, regn)
	const result = await fetchData(url)

	res.send(result)
}
