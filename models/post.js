var uniqueValidator = require('mongoose-unique-validator');
exports = module.exports = function(app, mongoose) {

	var postSchema = new mongoose.Schema({
		title:   		{ type: String, required: true },
		text:   		{ type: String, required: true },
        postId:         { type: String, index: true, unique: true, required : true },
        author:         { type: String, required: true },
        creationDate:   { type: Date,   required: true },
        likes:          { type: Array},
        content:        { type: String},
        visits:         { type: Number},
        userId:         { type: String, required: true },
        status:         { type: String, required: true },
        topic:          { type: String, required: true },
	});
	postSchema.plugin(uniqueValidator);
	mongoose.model('Post', postSchema);
};