require('dotenv').config();
var mongoose = require('mongoose');
var User  = mongoose.model('User');
var nodemailer = require('nodemailer');

const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: EMAIL,
	  pass: PASS
	}
});


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

exports.findUserNickName = function(req, res) {
	User.findOne({'nickName' : req.params.nickName} , function(err, user){
		res.send(isEmpty(user));	
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
		email: 		req.body.email,
		password:	req.body.password,
		status:		"pending",
		userId:		req.body.userId,
		role:		"common",
	});

	var mailOptions = {
		from: 'fpalmaximo@gmail.com',
		to: req.body.email,
		subject: 'Welp, please, confirm your account',
		text: 'Confirm your account with this link: http://welp-main.herokuapp.com/welp/functions/confirmAccountFunction.php?id=' + req.body.userId,
		html: '<p>Welcome to welp</p><p>Account confirmation is required to create an account</p><p>You can confirm yours with this link: http://localhost/welp-frontEnd-master/functions/confirmAccountFunction.php?id=' + req.body.userId + '</p>'
	};

	user.save(function(err, user) {
		if(err) {return res.send(500, err.message)};
		transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			  console.log(error);
			} else {
			  console.log('Email sent: ' + info.response);
			}
		}); 
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
exports.modifyPersonalData = function(req, res) {
	User.updateOne(
		{ 'nickName' : req.params.nickName },
		{ 'firstName' : req.body.firstName, 'lastName' : req.body.lastName }, 
	
	function (err, user) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(user);
	});
};

exports.modifyPassword = function(req, res) {
	User.updateOne(
		{ 'nickName' : req.params.nickName },
		{ 'password' : req.body.password }, 
	
	function (err, user) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(user);
	});
};

exports.deleteAccount = function(req, res) {
	User.updateOne(
		{ 'nickName' : req.params.nickName },
		{ 'status' : 'deleted' }, 
	
	function (err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};

exports.confirmUser = function (req, res) {
	User.updateOne( { 'userId' : req.body.userId }, { $set: { 'status' : "active"} } , function(err, user) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp("updated");
	});
}


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}