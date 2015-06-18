var mongoose=require('mongoose');
var User=mongoose.model('User');
module.exports=(function(){
	return{
		login:function(req,res){
            User.findOne({email:req.body.email},function(err,results){
                if(err){
                    console.log(err);
                }
                else{
                    if(results && results.password===req.body.password){
                        // results.login_status=1;
                        console.log('logged in');
                        res.json(results);
                    }
                    else{
                        console.log('not in DB');
                        console.log(results);
                        res.send(null);
                    }
                }
            });

		}
	}
})();