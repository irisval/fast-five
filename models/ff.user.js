const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	uid: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	name: {
		type: String,
		required: true
	},
	numWins: {
		type: Number,
		required: true,
		default: 0
	},
	entries: {
		type: Array,
		required: true,
		default: []
	}
});

module.exports = mongoose.model('User', UserSchema);
