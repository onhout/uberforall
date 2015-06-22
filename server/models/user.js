var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
	name:{type: String, required:true},
	email: {type: String, required:true},
	password:String,
	phone:{type: String, required:true},
	pin:String,
	addresses:[{}]
})

mongoose.model('User',userSchema);