const fs = require('fs')
const Database = require("sqlite3").Database
const Util = require('util')

var connection = new Database('../catalogopolis-api.sqlite');

function forSerialTitle(title) {
	return new Promise(function (resolve, reject) {
		connection.all('SELECT id FROM serials WHERE title = ?', [title], function (err, rows, fields) {
			if (!err) {
				if (rows && rows.length) {
					resolve(rows[0].id);
				}
				else {
					resolve([]);
				}
			} else {
				reject({ error: { message: 'Error while performing Query:' + err } });
			}
		});
	});

};

const readFile = Util.promisify(fs.readFile)

readFile('companions.txt', 'utf8').then((rawCompanions) => {
	console.log(rawCompanions)
	let promises = rawCompanions.split("\n").filter((x) => x.trim() != '').map((row) => {
		let [title, companion] = row.split(',')
		console.log(companion)
		return new Promise((resolve, reject) => {
			forSerialTitle(title).then((serialID) => {
				resolve(title + ',' + serialID + ',' + companion)
			}).catch((reason) => reject(reason))
		})
	})
	Promise.all(promises).then((companionsWithSerialIDs) => fs.writeFile('companions_with_serial_ids.txt', companionsWithSerialIDs.join("\n"))).catch((reason) => console.log(reason))
}).catch((reason) => console.log(reason))
