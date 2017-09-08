'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumPollOptionSchema = new Schema({
	cuid: { type: String, required: true },
	topicID: { type: String, required: true },
	text: { type: String, required: true }
})

module.exports = mongoose.model('ForumPollOption', ForumPollOptionSchema)