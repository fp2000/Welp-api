var uniqueValidator = require('mongoose-unique-validator');
exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		firstName:   		{ type: String, required: true },
		lastName:   		{ type: String, required: true },
        nickName: 	        { type: String, index: true, unique: true, required : true },
		birthDate:          { type: Date, 	required: true },
		email:				{ type: String, required: true },
        regDate:            { type: Date, 	required: true },
		password:           { type: String, required: true },
		status:				{ type: String, required: true },
		userId:				{ type: String, index: true, unique: true, required : true },
		role:				{ type: String, required: true },
	});
	userSchema.plugin(uniqueValidator);
	mongoose.model('User', userSchema);
};