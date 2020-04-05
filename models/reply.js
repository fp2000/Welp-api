exports = module.exports = function(app, mongoose) {

	var replySchema = new mongoose.Schema({
		text:   		{ type: String },
		date:   		{ type: Date },
		replyId: 	    { type: String },
		postId:			{ type: String },
		nickName:		{ type: String },
		status:			{ type: String },
		replys: 			{ type: Array },
	});
	mongoose.model('Reply', replySchema);
};