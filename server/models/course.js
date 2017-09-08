'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const CourseSchema = new Schema({
	cuid: { type: String, required: true },
	courseInfo: { type: String },
	assessmentInfo: { type: String },
	examInfo: { type: String },
	endDate: { type: Date },
	questsOpen: { type: Boolean, default: false }
})

module.exports = mongoose.model('Course', CourseSchema)