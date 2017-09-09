'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumTopicReplySchema = new Schema({
	cuid: { type: String, required: true },
	topicID: { type: String, required: true },
	authorID: { type: String, required: true },
	text: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now() },
	isTeacherApproved: { type: Boolean, default: false },
	isAuthorApproved: { type: Boolean, default: false }
})

module.exports = mongoose.model('ForumTopicReply', ForumTopicReplySchema)