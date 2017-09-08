'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const UserSchema = new Schema({
	cuid: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	type: { type: String, required: true, enum: ['teacher', 'student'] },
	teamID: { type: String },
	avatarAssetName: { type: String, default: 'default.png' },
	characterAssetName: { type: String, default: 'default.png' },
	stage: { type: Number, min: 0, max: 7, default: 0 }
})

module.exports = mongoose.model('User', UserSchema)