const region_code = ['us', 'de', 'gb', 'fr', 'es', 'ru', 'tr', 'it', 'at', 'ch', 'jp', 'pl']
// prettier-ignore
const store_urls = {
	amazon: {
		url: 'https://www.amazon.{REGN}/gp/product/{APPID}/?ie=UTF8',
		regn: {1:'com',2:'de',3:'co.uk',4:'fr',5:'es',8:'it',11:'co.jp'},
	},
	apple: {
		url: 'https://apps.apple.com/{REGN}/app/id{APPID}',
		regn:{1:'us',2:'de',3:'gb',4:'fr',5:'es',6:'ru',7:'tr',8:'it',9:'at',10:'ch',11:'jp',},
	},
	firefox: {
		url: 'https://addons.mozilla.org/{REGN}/firefox/addon/{APPID}',
		regn: {1:'de',2:'en-US',4:'fr',5:'es',6:'ru',8:'it',},
	},
	android: {
		url: 'https://play.google.com/store/apps/details?id={APPID}&hl={REGN}',
		regn: {1:'en',2:'de',3:'en',4:'fr',5:'es',6:'ru',7:'tr',8:'it',9:'au',10:'ch',},
	},
	opera: {
		url: 'https://addons.mozilla.org/{REGN}/firefox/addon/{APPID}',
		regn: {1:'en',2:'de',3:'en-gb',4:'fr',5:'es',6:'ru',7:'tr',8:'it',},
	},
	microsoft: {
		url: 'https://www.microsoft.com/{REGN}/store/p/app/{APPID}',
		regn: {1:'en-us',2:'de-de',3:'en-gb',4:'fr-fr',5:'es-es',6:'ru-ru',7:'tr-tr',8:'it-it',9:'de-at',10:'de-ch',12:'pl-pl',},
	},
	wordpress: { url: 'https://wordpress.org/plugins/{APPID}/' },
	xda: { url: 'https://labs.xda-developers.com/store/app/{APPID}' },
	chrome: { url: 'https://chrome.google.com/webstore/detail/{APPID}' },
	gog: { url: 'http://www.gog.com/game/{APPID}' },
}

/**
 * Get the proper url for stores for specific region
 * @param {string} store_id
 * @param {string} app_id
 * @param {string} region
 * @returns {string} store url
 */
const storeURL = (store_id, app_id, region = 'us') => {
	if (!store_id || !app_id) return
	const store = store_urls[store_id]
	let regn,
		link = store.url,
		reg_code = region_code.indexOf(region) + 1

	if (store.regn) regn = store.regn[reg_code] || store.regn[1]

	const store_url = link.replace('{APPID}', app_id).replace('{REGN}', regn)

	return store_url
}

module.exports = storeURL
export default storeURL
