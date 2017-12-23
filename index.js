const translate = require('google-translate-api')
const cheerio = require('cheerio')

function translateXML({
	from = 'auto',
	to = null,
	xml = '',
	selector = '*'
}) {
	return new Promise((resolve, reject) => {
		if (!to) {
			reject(`'to' must be provided`)
			return
		}
		if (!translate.languages.isSupported(from) || !translate.languages.isSupported(to)) {
			reject(`'from','to' must be one of ${JSON.stringify(Object.keys(translate.languages).filter(x => x.length < 5))}`)
			return
		}
		const $ = cheerio.load(xml, {
			xmlMode: true,
			decodeEntities: false
		})

		const promises = Array.from($(selector)).map(el => {
			const text = $(el).text()
			return translate(text, { from, to }).then(r => {
				$(el).text(r.text)
			})
		})
		Promise.all(promises).then(_ => {
			resolve($.html())
		}).catch(e => reject(e))
	})
}
module.exports = translateXML
