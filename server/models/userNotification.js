'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const UserNotificationSchema = new Schema({
	cuid: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now },
	text: { type: String, required: true },
	link: { type: String },
	isSeen: { type: Boolean, default: false },
	userID: { type: String, required: true }
})

module.exports = mongoose.model('UserNotification', UserNotificationSchema)