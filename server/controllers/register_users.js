var mongoose=require('mongoose');
var User=mongoose.model('User');
module.exports=(function(){
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
})();

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
