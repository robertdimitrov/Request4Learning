'use strict'

const express = require('express')
const UserController = require('../controllers/user.controller')
const AuthenticationController = require('../controllers/authentication.controller')

const Router = express.Router()

const multer = require('multer')
const upload = multer({ dest: '../public/images/' })
const imageUpload = require('../utils/imageUpload')
const avatar = imageUpload.single('avatar')

Router.route('/users')
	.get(AuthenticationController.authCheck, UserController.getUsers)

Router.route('/users/:cuid')
	.get(AuthenticationController.authCheck, UserController.getUser)
	.patch(AuthenticationController.authCheck, UserController.updateUser)

Router.route('/users/:cuid/avatar')
	.patch(avatar, AuthenticationController.authCheck, UserController.updateAvatar)

module.exports = Router