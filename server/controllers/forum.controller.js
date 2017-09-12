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

module.exports.checkForumTopicReplyExists = (req, res, next) => {
	ForumTopicReply.findOne({ cuid: req.params.replyid }).exec( (err, reply) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!reply) {
			return next({ message: `Reply with id ${req.params.topicid} not found`, status: httpCodes.notfound})
		}
		next()
	})
}

module.exports.getForumTopicReplies = (req, res, next) => {
	async.waterfall([
		function(query) {
			ForumTopicReply.find({ topicID: req.params.topicid }).exec( (err, replies) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				query(null, replies)
			})			
		},
		function(dbReplies, query) {
			console.log('test')
			ForumTopicReplyLike.find({ topicID: req.params.topicid}).exec( (err, likes) => {

				let replies = JSON.parse(JSON.stringify(dbReplies))

				replies.forEach( r => {
					r.likesCount = likes.filter(l => l.replyID === r.cuid).length
					r.userHasLiked = likes.filter(l => l.authorID === req.user.id).length > 0
				})

				res.status(200).json({ data: replies })
			})
		}
	])


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
	ForumTopicReplyLike.find({ replyID: req.params.replyid }).exec( (err, likes) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: likes })
	})
}

module.exports.createForumTopicReplyLike = (req, res, next) => {
	async.series([
		function(query) {
			ForumTopicReply.findOne({ cuid: req.params.replyid }).exec( (err, reply) => {
				if (reply.authorID === req.user.id) {
					return next({ message: 'An user can not like their own forum topic reply', status: httpCodes.badrequest })
				}
				query()
			})
		},
		function(query) {
			let like = new ForumTopicReplyLike({
				cuid: cuid(),
				topicID: req.params.topicid,
				replyID: req.params.replyid,
				authorID: req.user.id
			})

			like.save( (err) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				res.status(httpCodes.success).json({ data: like })
			})
		}
	])
}

module.exports.deleteForumTopicReplyLike = (req, res, next) => {
	async.series([
		function(query) {
			ForumTopicReplyLike.findOne({ cuid: req.params.likeid }).exec( (err, like) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				if (!like) {
					return next({ message: `Like with id ${req.params.replyid} not found`, status: httpCodes.notfound })
				}
				if (req.user.id !== like.authorID) {
					return next({ message: `Unauthorized user`, status: httpCodes.unauthorized})
				}
				query()
			})
		},
		function(query) {
			ForumTopicReplyLike.remove({ cuid: req.params.likeid }).exec( (err) => { 
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				} 
				res.status(httpCodes.success).end()
			}) 
		}
	])
}

module.exports.getForumPollOptions = (req, res, next) => {
	ForumPollOption.find({ topicID: req.params.topicid }).exec( (err, options) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: options })
	})
}

module.exports.createForumPollOptions = (req, res, next) => {
	if (!req.body.options || req.body.options.length === 0) {
		return next({ message: 'Required attribute options not sent', status: httpCodes.badrequest })
	}

	async.series([
		function(query) {
			ForumTopic.findOne({ cuid: req.params.topicid }).exec( (err, topic) => {
				if (topic.authorID !== req.user.id) {
					return next({ message: `Only the author of a forum topic can add poll options for it`, status: httpCodes.unauthorized})
				}
				query()
			})
		},
		function(query) {
			let pollOptions = []

			for (let option of req.body.options) {
				if (typeof option !== 'string' || striptags(option).length === 0) {
					continue
				}

				pollOptions.push( new ForumPollOption({
					cuid: cuid(),
					topicID: req.params.topicid,
					text: striptags(option)
				}))
			}

			ForumPollOption.collection.insert(pollOptions, (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				res.status(204).json({ data: pollOptions })
			})
		}	
	])
}

module.exports.getForumPollAnswers = (req, res, next) => {
	ForumPollAnswer.find({ topicID: req.params.topicid }).exec( (err, answers) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}

		let userHasVoted = false 

		for (let answer of answers) {
			if (answer.authorID === req.user.id) {
				userHasVoted = true
				break
			}
		}

		res.status(httpCodes.success).json({ data: answers, userHasVoted })
	})
}

module.exports.createForumPollanswer = (req, res, next) => {
	if (!req.body.optionID) {
		return next({ message: 'Required attribute optionID not sent', status: httpCodes.badrequest })
	}

	async.series([
		function(query) {
			ForumPollOption.findOne({ cuid: req.body.optionID }).exec( (err, option) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}

				if (!option) {
					return next({ message: `Option with id ${req.params.optionid} not found`, status: httpCodes.notfound })
				}

				if (option.topicID !== req.params.topicid) {
					return next({ message: 'Selected option is not available for this topic', status: httpCodes.badrequest })
				}
				query()
			})
		},
		function(query) {
			ForumPollAnswer.findOne({ topicID: req.params.topicid, authorID: req.user.id }).exec( (err, answer) => {
				if (answer) {
					return next({ message: 'The user has already given his vote to the poll', status: httpCodes.badrequest })
				}
				query()
			})
		},
		function(query) {
			let answer = new ForumPollAnswer({
				cuid: cuid(),
				topicID: req.params.topicid,
				authorID: req.user.id,
				optionID: req.body.optionID
			})

			answer.save( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				res.status(204).json({ data: answer })
			})
		}
	])
}

module.exports.getUsersWithMostReplies = (req, res, next) => {
	
}

module.exports.getUsersWithMostTutorials = (req, res, next) => {
	
}

module.exports.getUsersWithMostMarkedAnswers = (req, res, next) => {
	
}