'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const CourseAnnouncementSchema = new Schema({
	cuid: { type: String, required: true },
	text: { type: String, required: true },
	dateAdded: { type: Date, default: Date.now }
})

module.exports = mongoose.model('CourseAnnouncement', CourseAnnouncementSchema)