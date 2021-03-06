const mongoose = require('mongoose');

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
	},
	industry:{
		type: String,
		required: false
	}
})
const Provider = module.exports = mongoose.model('Provider', ProviderSchema);