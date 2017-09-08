'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const ForumTopicSchema = new Schema({
	cuid: { type: String, required: true },
	type: { type: String, enum: ['question', 'tutorial', 'discussion', 'poll'], default: 'discussion'},
	title: { type: String, required: true },
	authorID: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('ForumTopic', ForumTopicSchema)