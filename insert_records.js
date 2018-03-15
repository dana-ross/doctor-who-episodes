const fs = require('fs')
const Database = require("sqlite3").Database
const Util = require('util')

var connection = new Database('../catalogopolis-api.sqlite')
connection.run('PRAGMA journal_mode = DEL' );

const rf = Util.promisify(fs.readFile)
rf('companions_with_all_ids.txt', 'utf8').then((data) => {
	data.split("\n").filter((x) => x != "").forEach((record) => {
		[serialName, serialID, companionName, companionID] = record.split(',')
		console.log(serialName + "|" + serialID + "|" + companionName + "|" + companionID)
		connection.run('INSERT INTO serials_companions (serial_id, companion_id) VALUES (?,?)', [serialID, companionID], (err) => console.log(err))
	})
}).catch((reason) => console.log(reason))
