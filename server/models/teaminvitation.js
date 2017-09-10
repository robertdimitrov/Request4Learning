'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const TeamInvitationSchema = new Schema({
	cuid: { type: String, required: true },
	senderID: { type: String, required: true },
	receiverID: { type: String, required: true },
	status: { type: String, enum: ['open', 'accepted', 'declined', 'closed'] }
})

module.exports = mongoose.model('TeamInvitation', TeamInvitationSchema)