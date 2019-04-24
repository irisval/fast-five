const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let FFSchema = new Schema({
	week: {
		type: String,
		required: true
	},
	timestamp: {
		type: Date,
		required: true
	},
	uid: {
		type: String,
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
		required: true,
		unique: true,
		index: true
	},
	possibleQuotes: {
		type: Array,
		required: true,
		default: []
	},
	LQ: {
		type: String,
		default: ''
	},
	used: {
		type: Boolean,
		default: false,
		required: true
	},
	weekUsed: {
		type: String,
		default: ' ',
		required: false
	},
	actualQuote: {
		type: String,
		default: ' ',
		required: false
	}
});


module.exports = mongoose.model('FF', FFSchema);
// module.exports = mongoose.model('User', UserSchema);
