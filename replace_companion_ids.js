const fs = require('fs')
const Database = require("sqlite3").Database
const Util = require('util')

var connection = new Database('../catalogopolis-api.sqlite');

function forCompanionName(name) {
	return new Promise(function (resolve, reject) {
		connection.all('SELECT id FROM companions WHERE name = ?', [name], function (err, rows, fields) {
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

readFile('companions_with_serial_ids.txt', 'utf8').then((rawCompanions) => {
	console.log(rawCompanions)
	let promises = rawCompanions.split("\n").filter((x) => x.trim() != '').map((row) => {
		let [title, serialID, companion] = row.split(',')
		console.log(companion)
		return new Promise((resolve, reject) => {
			forCompanionName(companion).then((companionID) => {
				resolve(title + ',' + serialID + ',' + companion + ',' + companionID)
			}).catch((reason) => reject(reason))
		})
	})
	Promise.all(promises).then((companionsWithSerialIDs) => fs.writeFile('companions_with_all_ids.txt', companionsWithSerialIDs.join("\n"))).catch((reason) => console.log(reason))
}).catch((reason) => console.log(reason))
