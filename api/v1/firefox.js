const axios = require('axios')
const cheerio = require('cheerio')
const { storeURL } = require('../../utils')

const fetchData = async (request_url) => {
	const res = await axios(request_url)
	if (!res) return
	const $ = cheerio.load(res.data)

	let data = $('script[type="application/ld+json"][data-react-helmet="true"]').html()
	if (!data) return
	const d = JSON.parse(decodeURIComponent(data))

	let author = {}
	author.name = $('.AddonTitle-author>a').text()
	author.url = $('.AddonTitle-author>a').attr('href')
	if (!author.url?.match(/https?\:\/\//)) author.url = `https://addons.mozilla.org${author.url}`

	return {
		title: d.name,
		description: d.description,
		image: d.image,
		url: d.url,
		category: 'plugin',
		author,
		price: 'Free',
		rating: parseFloat(d.aggregateRating.ratingValue).toFixed(1).toString(),
		version: d.version,
	}
}

module.exports = async (req, res) => {
	const { id, regn } = req.query
	if (!id) res.status(404).end('ID is not given, can not process request')

	const request_url = storeURL('firefox', id, regn)
	const result = await fetchData(request_url)

	if (result) res.send(result)
	else res.status(404).send('Unable to process request')
}
