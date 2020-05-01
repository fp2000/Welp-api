exports = module.exports = function(app, mongoose) {

	var userSchema = new mongoose.Schema({
		firstName:   		{ type: String },
		lastName:   		{ type: String },
        nickName: 	        { type: String },
		birthDate:          { type: Date},
		email:				{ type: String},
        regDate:            { type: Date},
		password:           { type: String},
		status:				{ type: String},
		userId:				{ type: String},
		role:				{ type: String},
	});
	mongoose.model('User', userSchema);
};