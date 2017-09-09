'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const RiddleQuestSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	rightAnswer: { type: String, required: true }
})

module.exports = mongoose.model('RiddleQuest', RiddleQuestSchema)