const mongoose = require('mongoose');

//participant Schema
const ParticipantSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
})

const Participant = module.exports = mongoose.model('Participant', ParticipantSchema);
