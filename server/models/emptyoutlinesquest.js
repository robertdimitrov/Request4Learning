'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const EmptyOutlinesQuestSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	text: { type: String, required: true }
})

module.exports = mongoose.model('EmptyOutlinesQuest', EmptyOutlinesQuestSchema)