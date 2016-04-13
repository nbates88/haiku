var haiku = require('./haiku');

var structure = JSON.parse(process.argv[2]);
var file = process.argv[3];

haiku.createHaiku(structure, file);

