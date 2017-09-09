'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const QuizQuestRightAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	questionID: { type: String, required: true },
	answer: { type: String, required: true },
	isCorrect: { type: Boolean, default: false }
})

module.exports = mongoose.model('QuizQuestRightAnswer', QuizQuestRightAnswerSchema)