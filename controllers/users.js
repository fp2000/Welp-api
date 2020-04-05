var mongoose = require('mongoose');
var User  = mongoose.model('User');


//
//	Find
//

exports.findAllUsers = function(req, res) {
	User.find(function(err, users) {
		if(err) res.json(500, err.message);
		res.json(users);
	});
};

exports.findUserByNickName = function(req, res) {
	User.findOne({'nickName' : req.params.nickName} , function(err, user) {
    if(err) return res.send(500, err.message);    
	res.status(200).jsonp(user);
	});
};

exports.findUserByUserId = function(req, res) {
	User.findOne({'userId' : req.params.userId} , function(err, user) {
    if(err) return res.send(500, err.message);    
	res.status(200).jsonp(user);
	});
};

//
//	Post
//

exports.postUser = function(req, res) {
	var user = new User({
		firstName:	req.body.firstName,
		lastName:	req.body.lastName,
        nickName:	req.body.nickName,
        birthDate:	req.body.birthDate,
        regDate:	new Date(),
		password:	req.body.password,
		status:		"pending",
		userId:		req.body.userId,
		role:		"common",
	});

	user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(user);
	});
};

exports.upload = function(req, res) {
	if(req.file) {
        console.log(req.file);
        res.json(req.file);

    }
    else throw 'error';
}

//
//	Update
//
 
exports.updateUser = function(req, res) {
	User.find({'nickName' : req.params.nickName} , function(err, user) {
		user.firstName   = req.body.firstName;
		user.lastName    = req.body.lastName;
		user.password    = req.body.password;
		
		user.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(user);
		});
	});
};

exports.adminUpdateUser = function(req, res) {
	User.find({'nickName' : req.params.nickName} , function(err, user) {
		user.firstName   = req.body.firstName;
		user.lastName    = req.body.lastName;
		user.password    = req.body.password;
		user.nickName	 = req.body.nickName;
		user.status		 = req.body.status;		
		user.birthDate 	 = req.body.birthDate;
		user.role 		 = req.body.role;
		user.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(user);
		});
	});
};

exports.adminUpdateUserStatus = function(req, res) {
	User.find({'nickName' : req.params.nickName} , function(err, user) {
		user.status   = req.body.status;
		user.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(user);
		});
	});
};

//
//	Delete
//

exports.deleteUser = function(req, res) {
	User.findOne({'nickName' : req.params.nickName} , req.params.userId, function(err, user) {
		user.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200);
		})
	});
};