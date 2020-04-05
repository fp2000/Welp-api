var mongoose = require('mongoose');
var Reply  = mongoose.model('Reply');


//
//	Find
//

exports.findReplyByPostId = function(req, res) {
	Reply.find({'postId' : req.params.postId} , function(err, replys) {
    if(err) return res.send(500, err.message);    
	res.status(200).jsonp(replys);
	});
};

exports.findReplyByUserNickName = function(req, res) {
	Reply.find({'nickName' : req.params.nickName} , function(err, replys) {
    if(err) return res.send(500, err.message);    
	res.status(200).jsonp(replys);
	});
};

//
//	Post
//

exports.postReply = function(req, res) {
	var reply = new Reply({
		text:	    req.body.text,
        date:   	new Date(),
        replyId:    req.body.replyId,
        postId:     req.body.postId,
        nickName:   req.body.nickName,
        status:     "active",
	});

	reply.save(function(err, reply) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(reply);
	});
};

exports.addChildReply = function(req, res) {
	var childReply = new Array({
		text:	    	req.body.text,
        nickName:   	req.body.nickName,
		childReplyId:	req.body.childReplyId,
        date:    		new Date(),
		status:     	"active",
	});

	Reply.updateOne(
		{ "replyId": req.body.replyId }, {
		$push: { "replys": childReply }		   
		}, function(err, reply) {
	if(err) return res.send(500, err.message);    
	res.send('addedreply');			
	});
};

//
//	Update
//

exports.deleteReplyUser = function(req, res) {
	Reply.find({'replyId' : req.params.replyId} , function(err, reply) {
				reply.text 		  = '(deleted)';
                reply.status      = 'hidden';
		reply.save(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200).jsonp(reply);
		});
	});
};

//
//	Delete
//

exports.deleteReply = function(req, res) {
	Reply.findOne({'replyId' : req.params.replyId} , function(err, reply) {
		reply.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200);
		})
	});
};