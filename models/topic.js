var uniqueValidator = require('mongoose-unique-validator');
exports = module.exports = function(app, mongoose) {

	var topicSchema = new mongoose.Schema({
        topic:   		{ type: String, index: true, unique: true, required : true },        
	});
	topicSchema.plugin(uniqueValidator);
	mongoose.model('Topic', topicSchema);
};