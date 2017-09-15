'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PublicQuestSolutionSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	fileName: { type: String },
	text: { type: String },
	teamID: { type: String },
	dateSubmitted: { type: Date, default: Date.now }
})

module.exports = mongoose.model('PublicQuestSolution', PublicQuestSolutionSchema)