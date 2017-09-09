'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const PublicQuestAssessmentSchema = new Schema({
	cuid: { type: String, required: true },
	solutionID: { type: String, required: true },
	userID: { type: String, required: true },
	points: { type: Number },
	comment: { type: String }
})

module.exports = mongoose.model('PublicQuestAssessment', PublicQuestAssessmentSchema)