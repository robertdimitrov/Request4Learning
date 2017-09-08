'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumTopicMarkedReplySchema = new Schema({
	cuid: { type: String, required: true },
	topicID: { type: String, required: true },
	replyID: { type: String, required: true }
})

module.exports = mongoose.model('ForumTopicMarkedReply', ForumTopicMarkedReplySchema)