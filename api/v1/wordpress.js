const axios = require('axios')
const cheerio = require('cheerio')
const { storeURL, currency } = require('../../utils')

const fetchData = async (request_url) => {
	const res = await axios(request_url)
	if (!res) return
	const $ = cheerio.load(res.data)

	let data = $('script[type="application/ld+json"]').html()
	if (!data) return
	const d = JSON.parse(data)[0]

	// get IMAGE
	let image = d.image
	if (Array.isArray(image)) image = image.filter((e) => e.match('icon-256×256'))[0]

	// get AUTHOR
	let author = {}
	author.name = $('.plugin-header .author.vcard>a').text()
	author.url = $('.plugin-header .author.vcard>a').attr('href')

	//get PRICE
	let price = parseFloat(d.offers.price)
	let code = d.offers.priceCurrency
	if (parseFloat(price) === 0) price = 'Free'
	else price = currency(price, code)

	return {
		title: d.name,
		description: d.description,
		image,
		url: d.url,
		category: 'plugin',
		author,
		price,
		rating: d.aggregateRating?.ratingValue?.toString(),
		version: d.softwareVersion,
	}
}

module.exports = async (req, res) => {
	const { id, regn } = req.query
	if (!id) res.status(404).end('ID is not given, can not process request')

	const request_url = storeURL('wordpress', id, regn)
	const result = await fetchData(request_url)

	if (result) res.send(result)
	else res.status(404).send('Unable to process request')
}
