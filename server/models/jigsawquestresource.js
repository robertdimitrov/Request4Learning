'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const JigsawQuestResourceSchema = new Schema({
	cuid: { type: String, required: true },
	publicQuestID: { type: String, required: true },
	text: { type: String, required: true },
	teamID: { type: String, required: true }
})

module.exports = mongoose.model('JigsawQuestResource', JigsawQuestResourceSchema)