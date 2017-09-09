'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema 

const UserSchema = new Schema({
	cuid: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	publicName: { type: String, validate: [ /.{2,30}/, 'Public Name must be between 2 and 30 characters'] },
	type: { type: String, required: true, enum: ['teacher', 'student'] },
	teamID: { type: String },
	avatarAssetName: { type: String, default: 'default.png' },
	characterAssetName: { type: String, default: 'default.png' },
	stage: { type: Number, min: 0, max: 7, default: 0 }
})

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)