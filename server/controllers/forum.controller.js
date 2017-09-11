'use strict'

const striptags = require('striptags')
const cuid = require('cuid')
const async = require('async')

const ForumTopic = require('../models/forumTopic')
const ForumTopicReply = require('../models/forumTopicReply')
const ForumTopicReplyLike = require('../models/forumTopicReplyLike')
const ForumPollOption = require('../models/forumPollOption')
const ForumPollAnswer = require('../models/forumPollAnswer')
const httpCodes = require('../utils/httpcodes')

module.exports.getForumTopics = (req, res, next) => {
	ForumTopic.find({}).exec( (err, topics) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: topics })
	})
}

module.exports.createForumTopic = (req, res, next) => {
	if (!req.body.title || striptags(req.body.title).length == 0) {
		return next({ message: 'Required attribute title not sent', status: httpCodes.badrequest })
	}

	let topic = new ForumTopic({
		cuid: cuid(),
		authorID: req.user.id,
		title: striptags(req.body.title),
		type: req.body.type
	})

	topic.save( (err) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.created).json({ data: topic })
	})
}

module.exports.checkForumTopicExists = (req, res, next) => {
	ForumTopic.findOne({ cuid: req.params.topicid }).exec( (err, topic) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!topic) {
			return next({ message: `Topic with id ${req.params.topicid} not found`, status: httpCodes.notfound})
		}
		next()
	})
}

module.exports.getForumTopic = (req, res, next) => {
	ForumTopic.findOne({ cuid: req.params.topicid }).exec( (err, topic) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!topic) {
			return next({ message: `Topic with id ${req.params.topicid} not found`, status: httpCodes.notfound})
		}

		return res.status(httpCodes.success).json({ data: topic })
	})
}

module.exports.deleteForumTopic = (req, res, next) => {
	async.series([
		function(query) {
			ForumTopic.findOne({ cuid: req.params.topicid }).exec( (err, topic) => {
				if (req.user.id !== topic.authorID) {
					return next({ message: `Unauthorized user`, status: httpCodes.unauthorized})
				}
				query()
			})
		},
		function(query) {
			ForumTopic.remove({ cuid: req.params.topicid }).exec( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				} 
				res.status(httpCodes.success).end()
			})
		}
	])	
}

module.exports.getForumTopicReplies = (req, res, next) => {
	ForumTopicReply.find({ topicID: req.params.topicid }).exec( (err, replies) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: replies })
	})
}

module.exports.createForumTopicReply = (req, res, next) => {
	if (!req.body.text || striptags(req.body.text).length == 0) {
		return next({ message: 'Required attribute text not sent', status: httpCodes.badrequest })
	}

	let reply = new ForumTopicReply({
		cuid: cuid(),
		topicID: req.params.topicid,
		authorID: req.user.id,
		text: striptags(req.body.text)
	})

	reply.save( (err) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: reply })
	})
}

module.exports.deleteForumTopicReply = (req, res, next) => {
	async.series([
		function(query) {
			ForumTopicReply.findOne({ cuid: req.params.replyid }).exec( (err, reply) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				if (!reply) {
					return next({ message: `Reply with id ${req.params.replyid} not found`, status: httpCodes.notfound })
				}
				if (req.user.id !== reply.authorID) {
					return next({ message: `Unauthorized user`, status: httpCodes.unauthorized})
				}
				query()
			})
		},
		function(query) {
			ForumTopicReply.remove({ cuid: req.params.replyid }).exec( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				} 
				res.status(httpCodes.success).end()
			})
		}
	])
}

module.exports.updateForumTopicReply = (req, res, next) => {
	if (req.body.isAuthorApproved === undefined) {
		return next({ message: 'Required attribute isAuthorApproved not sent', status: httpCodes.badrequest })
	}
	if (typeof(req.body.isAuthorApproved) !== 'boolean') {
		return next({ message: 'Required attribute isAuthorApproved must be a boolean', status: httpCodes.badrequest })
	}

	async.series([
		function(query) {
			ForumTopic.findOne({ cuid: req.params.topicid }).exec( (err, topic) => {
				if (topic.authorID !== req.user.id) {
					return next({ message: 'Only the creator of a forum topic can mark an answer', status: httpCodes.unauthorized })
				}
				query()
			})
		},
		function(query) {
			ForumTopicReply.findOne({ cuid: req.params.replyid }).exec( (err, reply) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				if (!reply) {
					return next({ message: `Reply with id ${req.params.replyid} not found`, status: httpCodes.notfound })
				} 
				if (reply.isAuthorApproved === req.body.isAuthorApproved) {
					res.status(200).json({ data: reply })
				}
				reply.isAuthorApproved = req.body.isAuthorApproved
				reply.save( (err) => {
					if (err) {
						return next({message: err.message, status: httpCodes.internalServerError})
					}
					res.status(200).json({ data: reply })
				}) 
			})

		}
	])
}

module.exports.getForumTopicReplyLikes = (req, res, next) => {
	
}

module.exports.createForumTopicReplyLike = (req, res, next) => {
	
}

module.exports.deleteForumTopicReplyLike = (req, res, next) => {
	
}

module.exports.getForumPollOptions = (req, res, next) => {
	
}

module.exports.createForumPollOption = (req, res, next) => {
	
}

module.exports.getForumPollAnswers = (req, res, next) => {
	
}

module.exports.createForumPollanswer = (req, res, next) => {
	
}

module.exports.getUsersWithMostReplies = (req, res, next) => {
	
}

module.exports.getUsersWithMostTutorials = (req, res, next) => {
	
}

module.exports.getUsersWithMostMarkedAnswers = (req, res, next) => {
	
}