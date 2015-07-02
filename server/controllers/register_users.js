require('../config/mongoose.js');
var mongoose=require('mongoose');
var User=mongoose.model('User');
var twilio = require('twilio');
var accountSid = "ACe701a4e2c6cf998a6e4330f367e5e54a";
var authToken = "0cda74fdde03eaa48bcc82ccec986880";

var client = twilio(accountSid, authToken);

var phone = null;
var pin = null;
/*module.exports=(function(){
	return {
		add:function(req,res){
			var new_user=new User({
				name:req.body.name,
				email:req.body.email,
				password:req.body.password,
				phone:req.body.phoneNumber,
				pin:req.body.pin
			});
			//check if email is in use
			User.find({email:new_user.email},function(err,results){
				console.log(results);
				if(err){
					console.log(err);
				}

				else if(results.length===0){
					new_user.save(function(err){
						console.log('added- back end controller');
						if(err){
							console.log(err);
						}
						else{
							console.log('new user added');
						}
					})
				}
				else{
					console.log('user email already in use');
				}
			})
		}
	}
})();*/

exports.textPin = function(req, res){
	client.messages.create({
		to: phone,
		from: "+12513335010",
		body: "Thank you for registering, your pin number is: "+pin
	})
};

exports.add = function(req, res){
	phone = req.body.phoneNumber;
	pin = req.body.pin;
	new User({
		name: req.body.name,
		email:req.body.email,
		password:req.body.password,
		phone:req.body.phoneNumber,
		pin:req.body.pin
	}).save(function(err, result){
			if (err) res.status(400).send(err.errors);
			else res.json(result);
		})
};

// exports.add=function(req,res){
// 	var new_user=new User({
// 				name:req.body.name,
// 				email:req.body.email,
// 				password:req.body.password,
// 				phone:req.body.phone,
// 				pin:req.body.pin
// 			});
// 			//check if email is in use
// 			User.find({name:new_user.email},function(err,results){
// 				console.log(results);
// 				if(err){
// 					console.log(err);
// 				}

// 				else if(results.length===0){
// 					new_user.save(function(err){
// 						if(err){
// 							console.log(err);
// 						}
// 						else{
// 							console.log('new user added TWOTWOTWO');
// 						}
// 					})
// 				}
// 				else{
// 					console.log('user email allready in use');
// 				}
// 			})
// }
