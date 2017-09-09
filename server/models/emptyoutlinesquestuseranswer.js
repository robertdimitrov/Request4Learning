'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const EmptyOutlinesQuestUserAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	emptyOutlinesQuestID: { type: String, required: true },
	field: { type: String, required: true },
	answer: { type: String, required: true },
	userID: { type: String, required: true }
})

module.exports = mongoose.model('EmptyOutlinesQuestUserAnswer', EmptyOutlinesQuestUserAnswerSchema)