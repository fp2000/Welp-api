var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    path = require('path');
    require('dotenv').config();
const cors = require('cors');
const router = express.Router();
const DB_URI = process.env.URI;
const PORT = process.env.PORT || 3000;
const multer = require("multer");



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './.profilePictures');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
});




mongoose.connect(DB_URI,{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },  function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/uploads', express.static('.profilePictures'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// Import Models and controllers
var models      = require('./models/user')(app, mongoose);
var posts       = require('./models/post')(app, mongoose);
var replys       = require('./models/reply')(app, mongoose);
var topic       = require('./models/topic')(app, mongoose);

var usersControl        = require('./controllers/users');
var loginControl        = require('./controllers/login');
var postControl         = require('./controllers/posts');
var replyControl        = require('./controllers/replys');
var topicControl        = require('./controllers/topics');




app.post('/upload', upload.single('photo'), (req, res) => {
    if(req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

router.get('/', function(req, res) {
    res.send("hello there"); 
 }); 
 app.use(router);
 

// User
var users = express.Router();
users.route('/users', cors())
    .get(usersControl.findAllUsers);
users.route('/user')
    .post(usersControl.postUser, upload.single('profilePicture'));
users.route('/user/personalData/:nickName')
    .put(usersControl.modifyPersonalData);
users.route('/user/modifyPassword/:nickName')
    .put(usersControl.modifyPassword);
users.route('/user/delete/:nickName')
    .delete(usersControl.deleteAccount);
users.route('/user/:nickName')
    .get(usersControl.findUserByNickName);
users.route('/user/check/:nickName')
    .get(usersControl.findUserNickName);
users.route('/user/confirmation/')
    .post(usersControl.confirmUser);
app.use(users);





// Auth
var login = express.Router();
login.route('/auth')
    .post(loginControl.loginUser);
app.use(login);





// Post
var post = express.Router();
post.route('/post')
    .post(postControl.postPost);
post.route('/post/:postId')
    .get(postControl.findPostUniqueId)
    .put(postControl.updatePost)
    .delete(postControl.deletePostUser);
post.route('/posts/recommended/')
    .get(postControl.findRecommendedPosts);
post.route('/post/visit/:postId')
    .get(postControl.addVisit);
post.route('/posts/:pos', cors())
    .get(postControl.findIndexPosts);
post.route('/posts/author/:nickName')
    .get(postControl.findPostByAuthor);
post.route('/post/like/:postId/:nickName')
    .get(postControl.addOrRemoveLikeFromUserNickName);
post.route('/search/')
    .get(postControl.findTitleAndPostId);
app.use(post);





// Reply

var reply = express.Router();
reply.route('/replys/postId/:postId')
    .get(replyControl.findReplyByPostId);
reply.route('/reply/:replyId')
    .put(replyControl.updateReply)
    .delete(replyControl.deleteReply);
reply.route('/replys/nickName/:nickName')
    .get(replyControl.findReplyByUserNickName);
reply.route('/reply/')
    .post(replyControl.postReply);
reply.route('/reply/child/')
    .post(replyControl.addChildReply);
reply.route('/reply/child/:replyId')
    .put(replyControl.modifyChildReply)
    .delete(replyControl.deleteChildReply);
app.use(reply);

// delete and update


// Topics

var topic = express.Router();
topic.route('/topics/')
    .get(topicControl.findAllTopics);
topic.route('/topics/:topicName')
    .get(topicControl.findTopicByName);
topic.route('/topic/')
    .post(topicControl.postTopic);
app.use(topic);


app.listen(PORT , function() {
  console.log("Node server running on http://localhost:3000");
});