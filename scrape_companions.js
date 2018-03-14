const { JSDOM } = require('jsdom')

const fetch = require('node-fetch')
const flatten = require('array-flatten')
const fs = require('fs')

const arrayify = (nl) => [].slice.call(nl)

function getEpisodeURLs() {
	const indexURL = 'http://tardis.wikia.com/wiki/Doctor_Who_television_stories'
	return new Promise((resolve, reject) => {
		fetch(indexURL).then(
			(body) => {
				body.text().then((text) => {
					let dom = new JSDOM(text)
					let episodeLinks = arrayify(dom.window.document.querySelectorAll('table.wikitable a[href$="(TV_story)"]')).map((x) => 'http://tardis.wikia.com' + x.href)
					resolve(episodeLinks)
				}).catch((reason) => reject(reason))
			}
		).catch((reason) => reject(reason))

	})
}

function getCompanionListNodes(dom) {
	return arrayify(dom.window.document.getElementsByTagName('h3')).filter((x) => x.textContent === 'Companion(s):')
}

getEpisodeURLs().then((x) => {
	const promises = x.map((url) => {
		return new Promise((resolve, reject) => {
			fetch(url).then(
				(body) => {
					body.text().then((text) => {
						let dom = new JSDOM(text)
						let serialTitle = dom.window.document.querySelector('.pi-title').textContent
						let companions = getCompanionListNodes(dom).length > 0 ? arrayify(getCompanionListNodes(dom)[0].parentElement.querySelectorAll('a')).map((x) => x.textContent) : []
						resolve({ serialTitle, companions })
					}).catch((reason) => reject(reason))
				}
			).catch((reason) => reject(reason))
		})
	})

	Promise.all(promises).then((data) => {
		fs.writeFile('companions.txt', flatten(data.map((x) => {
			return x.companions.map((companion) => { return x.serialTitle.trim() + "," + companion.trim() })
		})).join("\n"), (err) => console.log(err))
	}).catch((reason) => console.log(reason))
}).catch((reason) => console.log(reason))
