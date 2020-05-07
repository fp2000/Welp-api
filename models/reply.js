var uniqueValidator = require('mongoose-unique-validator');
exports = module.exports = function(app, mongoose) {

	var replySchema = new mongoose.Schema({
		text:   		{ type: String, required: true },
		date:   		{ type: Date, 	required: true },
		replyId: 	    { type: String, index: true, unique: true, required : true },
		postId:			{ type: String, required: true },
		nickName:		{ type: String, required: true },
		status:			{ type: String, required: true },
		replys: 		{ type: Array },
	});
	replySchema.plugin(uniqueValidator);
	mongoose.model('Reply', replySchema);
};