var mongoose = require('mongoose');
var User  = mongoose.model('User');
var express = require('express');
const app = express();



exports.loginUser = function(req, res) {
    var nickNameIn = req.body.nickName;
    var passwordIn = req.body.password;
    if (nickNameIn && passwordIn) {
        User.findOne({'nickName' : nickNameIn}, function(err, user) {
            if(err) res.json(500, err.message);            
            if (!isEmpty(user)){
                if (user.password === passwordIn){
                    res.status(200).jsonp(user);
                } else {
                    res.send('Incorrect Password')
                }                
            } else {
				res.send('User not found')
            }
            res.end();
        });        
    } else {
		res.send('invalidInput');
		res.end();
	}
};

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}