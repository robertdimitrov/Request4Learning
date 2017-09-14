'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TokenQuestTeamWorkSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	teamID: { type: String, required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	contributionWordCount: { type: Number }
})

module.exports = mongoose.model('TokenQuestTeamWork', TokenQuestTeamWorkSchema)