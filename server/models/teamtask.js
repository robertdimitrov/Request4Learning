'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TeamTaskSchema = new Schema({
	cuid: { type: String, required: true },
	teamID: { type: String, required: true },
	text: { type: String, required: true },
	assigneeID: { type: String },
	status: { type: String, required: true, enum: ['open', 'closed'] },
	dateAdded: { type: Date, required: true, default: Date.now() }
})

module.exports = mongoose.model('TeamTask', TeamTaskSchema)