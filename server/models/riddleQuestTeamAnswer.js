'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const RiddleQuestTeamAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	teamID: { type: String, required: true },
	riddleID: { type: String, required: true },
	answer: { type: String, required: true },
	dateSubmitted: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('RiddleQuestTeamAnswer', RiddleQuestTeamAnswerSchema)