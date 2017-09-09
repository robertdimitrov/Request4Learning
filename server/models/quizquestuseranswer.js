'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const QuizQuestUserAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	questionID: { type: String, required: true },
	answerID: { type: String, required: true },
	userID: { type: String, required: true }
})

module.exports = mongoose.model('QuizQuestUserAnswer', QuizQuestUserAnswerSchema)