'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const CourseFeedbackSchema = new Schema({
	cuid: { type: String, required: true },
	authorID: { type: String, required: true },
	text: { type: String },
	rating: { type: Number, min: 0, max: 5 }
})

module.exports = mongoose.model('CourseFeedback', CourseFeedbackSchema)