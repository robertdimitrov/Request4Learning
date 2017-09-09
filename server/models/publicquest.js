'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PublicQuestSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	assessmentUntil: { type: Date, required: true }
})

module.exports = mongoose.model('PublicQuest', PublicQuestSchema)