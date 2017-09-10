'use strict'

const express = require('express')
const CourseController = require('../controllers/course.controller')

const Router = express.Router()

Router.route('/course')
	.get(CourseController.getCourseInformation)

Router.route('/course/announcements')
	.get(CourseController.getCourseAnnouncements)

Router.route('/course/feedbacks')
	.get(CourseController.getCourseFeedbacks)
	.put(CourseController.createCourseFeedback)

module.exports = Router