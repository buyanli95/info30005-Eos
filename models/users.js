const mongoose = require('mongoose');

//user Schema
const UserSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
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
const User = module.exports = mongoose.model('User', UserSchema);

//participant Shcema
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
	}
})
const Participant = module.exports = mongoose.model('Participant', ParticipantSchema);

//provider schema
const ProviderSchema = mongoose.Schema({
	email:{
		type: String,
		required: true
	},
	cname:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
})
const Provider = module.exports = mongoose.model('Provider', ProviderSchema);