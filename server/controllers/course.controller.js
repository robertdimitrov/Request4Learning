'use strict'

const striptags = require('striptags')
const cuid = require('cuid')

const Course = require('../models/course')
const CourseAnnouncement = require('../models/courseAnnouncement')
const CourseFeedback = require('../models/courseFeedback')
const httpCodes = require('../utils/httpcodes')

module.exports.getCourseInformation = (req, res, next) => {
	Course.findOne({}).exec( (err, course) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: course })
	})	
}

module.exports.getCourseAnnouncements = (req, res, next) => {
	CourseAnnouncement.find({}).exec( (err, announcements) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: announcements })
	})
}

module.exports.getCourseFeedbacks = (req, res, next) => {
	CourseFeedback.find({}).exec( (err, feedbacks) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		res.status(httpCodes.success).json({ data: feedbacks })
	})
}

module.exports.createCourseFeedback = (req, res, next) => {
	if (!req.body.text || req.body.text.length === 0 || !req.body.rating) {
		return next({message: 'Both text and rating have to be sent', status: httpCodes.badrequest})
	}

	let feedback = new CourseFeedback({
		cuid: cuid(),
		authorID: req.user.id,
		rating: req.body.rating,
		text: striptags(req.body.text)
	})

	feedback.save( (err) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		res.status(httpCodes.created).json({ data: feedback })		
	})
}
