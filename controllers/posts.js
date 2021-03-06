var mongoose = require('mongoose');
var Post  = mongoose.model('Post');
var User  = mongoose.model('User');

//
//      Find
//

exports.findAllPosts = function(req, res) {
	Post.find(function(err, posts) {
		if(err) res.json(500, err.message);
		res.json(posts);
	});
};

exports.findIndexPosts = function(req, res) {
		var pos = parseInt(req.params.pos);
		var order = { creationDate: -1 };
        var limit = 10;
        if (isNaN(pos)) return null;
	Post.find({'status' : 'active'}, function(err, posts) {
                if(err) res.json(500, err.message);
                res.json(posts);
	}).sort( order ).skip(pos).limit(limit);
};

exports.findTitleAndPostId = function(req, res) {
	var order = { creationDate: -1 };
	Post.find(
		{'status' : 'active'},			 
		{ 
			text:0, 
			author:0,
			creationDate:0,
			likes:0,
			content:0,
			visits:0,
			userId:0,
			status:0,
			topic:0
		} ,			
		function(err, posts) {
			if(err) res.json(500, err.message);
			res.json(posts);
	}).sort( order );
};

exports.findPostUniqueId = function(req, res) {
        Post.findOne({'postId' : req.params.postId} , function(err, post) {		
        if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);		
		});
};
exports.addVisit = function(req, res) {
	Post.updateOne (
		{'postId' : req.params.postId},
		{ $inc: {'visits': +1}},
		function (err, post) {
			if(err) return res.send(500, err.message);
			res.status(200).jsonp(post);
		});
};

exports.findPostByAuthor = function(req, res) {
        Post.find({'author' : req.params.nickName} , function(err, post) {
        if(err) return res.send(500, err.message);    
		res.status(200).jsonp(post);
        });
};

exports.findRecommendedPosts = function(req, res) {
		Post.find(function(err, posts) {
			if(err) res.json(500, err.message);
			res.json(posts);
		}).sort( { visits: -1 } ).limit(10);
};


//
//      Insert
//

exports.postPost = function(req, res) {
	var post = new Post({
        title:          req.body.title,
        text:           req.body.text,
        postId:         req.body.postId,
        author:         req.body.author,
        content:        req.body.content,
        creationDate:   new Date(),
        visits:         0,
        userId:         req.body.userId,
		status:         'active',
		likes:			req.body.likes,
		visits:			0,
		topic:			req.body.topic
	});

	post.save(function(err, post) {
		if(err) return res.send(500, err.message);    
        res.status(200).jsonp(post);
    });
};


exports.addOrRemoveLikeFromUserNickName = function (req, res) {	
	Post.findOne(
		{
			'postId' : req.params.postId, 
			'likes.nickName' : req.params.nickName  
		}, function(err, post) {
			if (post == null){
				var like = new Array({
					nickName:	    req.params.nickName,
				});
				Post.updateOne(
					{ "postId": req.params.postId }, 
					{ 
						$push: { "likes":  like }		   
					}, function(err, post) {
						if(err) return res.send(500, err.message);    
						res.send('addedLike');			
				});
			} else {
				Post.updateOne(
					{ "postId": req.params.postId }, 
					{
						$pull: { 'likes' : {'nickName' : req.params.nickName} } 
					}, function(err, post) {
						if(err) return res.send(500, err.message);    
						res.send(post);			
				});
			}
	});
};


//
//      Update
//

exports.updatePost = function(req, res) {
	Post.updateOne(
		{'postId' : req.params.postId},
		{'title' : req.body.title, 'text' : req.body.text, 'content' : req.body.content}, 
	
	function (err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};

exports.deletePostUser = function(req, res) {
	Post.updateOne(
		{ 'postId' : req.params.postId },
		{ 'status' : 'deleted' }, 
	
	function (err, post) {
		if(err) return res.send(500, err.message);
		res.status(200).jsonp(post);
	});
};


//
//      Delete
//

exports.deletePost = function(req, res) {
	Post.findOne({'postId' : req.params.postId} , function(err, post) {
		post.remove(function(err) {
			if(err) return res.send(500, err.message);
      		res.status(200);
		})
	});
};


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}