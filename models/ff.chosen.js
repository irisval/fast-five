const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ChosenFFSchema = new Schema({
	week: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	entries: {
		type: Array,
		required: true,
		default: []
	},
});


module.exports = mongoose.model('ChosenFF', ChosenFFSchema);
// module.exports = mongoose.model('User', UserSchema);
