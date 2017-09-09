'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const OrderQuestUserAnswerSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	pieceID: { type: String, required: true },
	userID: { type: String, required: true },
	position: { type: Number }
})

module.exports = mongoose.model('OrderQuestUserAnswer', OrderQuestUserAnswerSchema)