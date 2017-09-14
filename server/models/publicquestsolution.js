'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PublicQuestSolutionSchema = new Schema({
	cuid: { type: String, required: true },
	publicQuestID: { type: String, required: true },
	fileName: { type: String },
	text: { type: String },
	teamID: { type: String }
})

module.exports = mongoose.model('PublicQuestSolution', PublicQuestSolutionSchema)