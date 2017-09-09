'use strict'

const express = require('express')
const AuthenticationController = require('../controllers/authentication.controller')

const Router = express.Router()

Router.route('/signin')
	.post(AuthenticationController.signIn)

module.exports = Router