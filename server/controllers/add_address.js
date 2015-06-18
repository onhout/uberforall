/**
 * Created by pl on 6/18/15.
 */
var mongoose=require('mongoose');
var User=mongoose.model('User');
module.exports=(function() {
    return {
        add_address: function(req, res){
            User.update({_id: req.body.userID}, {$push: {addresses:req.body.address}}, function(err, result){
                if (err) throw err;
                else {
                    console.log('SUCCESS');
                }
            })
        },
        get_address: function(req, res){
            User.findOne({_id: req.body.userID}, function(err, result){
                if (err) throw err;
                else {
                    res.send(result);
                }
            })
        }
    }
})();