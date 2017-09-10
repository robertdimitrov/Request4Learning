'use strict'

const express = require('express')
const UserController = require('../controllers/user.controller')
const AuthenticationController = require('../controllers/authentication.controller')

const Router = express.Router()

const imageUpload = require('../utils/imageUpload')
const avatar = imageUpload.single('avatar')

Router.all(AuthenticationController.loginCheck)

Router.route('/users')
	.get(UserController.getUsers)

Router.route('/users/:cuid')
	.get(UserController.getUser)
	.patch(UserController.sameUserCheck, UserController.updateUser)

Router.route('/users/:cuid/avatar')
	.patch(UserController.sameUserCheck, avatar, UserController.updateAvatar)

Router.route('/users/:cuid/notifications')
	.get(UserController.sameUserCheck, UserController.getUserNotifications)

Router.route('/users/:cuid/notifications/:nid')
	.patch(UserController.sameUserCheck, UserController.updateUserNotification)

module.exports = Router