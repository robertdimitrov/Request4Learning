'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumTopicReplyLikeSchema = new Schema({
	cuid: { type: String, required: true },
	topicID: { type: String, required: true },
	replyID: { type: String, required: true },
	authorID: { type: String, required: true }
})

module.exports = mongoose.model('ForumTopicReplyLike', ForumTopicReplyLikeSchema)