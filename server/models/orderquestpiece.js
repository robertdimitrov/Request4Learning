'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const OrderQuestPieceSchema = new Schema({
	cuid: { type: String, required: true },
	questID: { type: String, required: true },
	position: { type: Number, required: true },
	content: { type: String, required: true }
})

module.exports = mongoose.model('OrderQuestPiece', OrderQuestPieceSchema)