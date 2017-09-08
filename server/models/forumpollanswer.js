'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumPollAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	topicID: { type: String, required: true },
	authorID: { type: String, required: true },
	optionID: { type: String, required: true }
})

module.exports = mongoose.model('ForumPollAnswer', ForumPollAnswerSchema)