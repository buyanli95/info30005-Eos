// const faker = require('faker');
// const JobArea = [];
// for(i=0; i<10; i++){
//     JobArea[i] = faker.name.jobArea();
// }
// module.exports = JobArea;
const mongoose = require('mongoose');

mongoose.connect('mongodb://eosdev:info30005@ds259119.mlab.com:59119/eosdb', function(err){
	if(err) throw err;

	console.log('connected to mongodb');
})

var userSchema = mongoose.Schema({
	fullname: String,
	email: String,
	password: String
});