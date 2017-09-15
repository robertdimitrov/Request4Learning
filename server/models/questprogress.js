'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const QuestProgressSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	teamID: { type: String, required: true },
	dateStarted: { type: Date, default: Date.now },
	dateFinished: { type: Date },
	points: { type: Number }
})

module.exports = mongoose.model('QuestProgress', QuestProgressSchema)