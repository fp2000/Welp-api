var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');


//
//	Find
//
exports.findAllTopics = function (req, res) {
    Topic.find(function (err, topics) {
        if (err) res.json(500, err.message);
        res.json(topics);
    });
};

exports.findTopicByName = function (req, res) {
    Topic.findOne({ 'topic': req.params.topic }, function (err, topic) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(topic);
    });
};


//
//	Post
//

exports.postTopic = function (req, res) {
    var reply = new Topic({
        topic: req.body.topic,
    });

    reply.save(function (err, topic) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(topic);
    });
};



//
//	Delete
//

exports.deleteTopic = function (req, res) {
    Topic.findOne({ 'topicId': req.params.topicId }, function (err, topicId) {
        topic.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200);
        })
    });
};