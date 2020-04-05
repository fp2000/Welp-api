exports = module.exports = function(app, mongoose) {

	var replySchema = new mongoose.Schema({
        topic:   		{ type: String },        
	});
	mongoose.model('Topic', replySchema);
};