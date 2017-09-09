'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TeamSchema = new Schema({
	cuid: { type: String, required: true },
	name: { type: String, required: true },
	motto: { type: String },
	avatarAssetName: { type: String, default: 'default.png'}
})

module.exports = mongoose.model('Team', TeamSchema)