const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let FFSchema = new Schema({
	timestamp: {
		type: Date,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	possibleQuotes: {
		type: Array,
		required: true,
		default: []
	},
	LQ: {
		type: String,
		default: ''
	}
});

module.exports = mongoose.model('FF', FFSchema);
