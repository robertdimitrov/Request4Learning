'use strict'

const express = require('express')
const ForumController = require('../controllers/forum.controller')

const Router = express.Router()

Router.route('/forum-topics')
	.get(ForumController.getForumTopics)
	.post(ForumController.createForumTopic)

Router.route('/forum-topics/:topicid')
	.get(ForumController.getForumTopic)
	.delete(ForumController.checkForumTopicExists, ForumController.deleteForumTopic)

Router.route('/forum-topics/:topicid/replies')
	.get(ForumController.checkForumTopicExists, ForumController.getForumTopicReplies)
	.post(ForumController.checkForumTopicExists, ForumController.createForumTopicReply)

Router.route('/forum-topics/:topicid/replies/:replyid')
	.delete(ForumController.checkForumTopicExists, ForumController.deleteForumTopicReply)
	.patch(ForumController.checkForumTopicExists, ForumController.updateForumTopicReply)

Router.route('/forum-topics/:topicid/replies/:replyid/likes')
	.get(ForumController.checkForumTopicExists, ForumController.checkForumTopicReplyExists, ForumController.getForumTopicReplyLikes)
	.post(ForumController.checkForumTopicExists, ForumController.checkForumTopicReplyExists, ForumController.createForumTopicReplyLike)

Router.route('/forum-topics/:topicid/replies/:replyid/likes/:likeid')
	.delete(ForumController.checkForumTopicExists, ForumController.checkForumTopicReplyExists, ForumController.deleteForumTopicReplyLike)

Router.route('/forum-topics/:topicid/poll-options')
	.get(ForumController.checkForumTopicExists, ForumController.getForumPollOptions)
	.post(ForumController.checkForumTopicExists, ForumController.createForumPollOptions)

Router.route('/forum-topics/:topicid/poll-answers')
	.get(ForumController.checkForumTopicExists, ForumController.getForumPollAnswers)
	.post(ForumController.checkForumTopicExists, ForumController.createForumPollanswer)

Router.route('/forum-stats/most-replies')
	.get(ForumController.getUsersWithMostReplies)

Router.route('/forum-stats/most-tutorials')
	.get(ForumController.getUsersWithMostTutorials)

Router.route('/forum-stats/most-marked-answers')
	.get(ForumController.getUsersWithMostMarkedAnswers)
	
module.exports = Router