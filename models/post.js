exports = module.exports = function(app, mongoose) {

	var postSchema = new mongoose.Schema({
		title:   		{ type: String },
		text:   		{ type: String },
        postId:         { type: String },
        author:         { type: String},
        creationDate:   { type: Date},
        likes:          { type: Array},
        content:        { type: String},
        visits:         { type: Number},
        userId:         { type: String},
        status:         { type: String},
        visits:         { type: Number},
        topic:          { type: String},
	});
	mongoose.model('Post', postSchema);
};