'use strict'

const express = require('express')
const UserController = require('../controllers/user.controller')
const AuthenticationController = require('../controllers/authentication.controller')

const Router = express.Router()

Router.route('/users')
	.get(AuthenticationController.authCheck, UserController.getUsers)

Router.route('/users/:cuid')
	.get(AuthenticationController.authCheck, UserController.getUser)
	.patch(AuthenticationController.authCheck, UserController.updateUser)

module.exports = Router