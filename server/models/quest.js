'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const QuestSchema = new Schema({
	cuid: { type: String, required: true },
	name: { type: String, required: true },
	type: { type: String, required: true, enum: ['simple','pickTheWinner','jigsaw','token','emptyOutlines','quiz','riddle','order']}
	description: { type: String },
	criteria: { type: String },
	resources: { type: String },
	maxPoints: { type: Number, min: 0, required: true },
	startDate: { type: Date, required: true },
	dueDate: { type: Date, required: true },
	mandatory: { type: Boolean, default: true }
})

module.exports = mongoose.model('Quest', QuestSchema)