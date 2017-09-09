'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const QuizQuestQuestionSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	question: { type: String, required: true }
})

module.exports = mongoose.model('QuizQuestQuestion', QuizQuestQuestionSchema)