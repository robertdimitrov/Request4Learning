'use strict'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const httpCodes = require('../utils/httpcodes')

module.exports.signIn = (req, res, next) => {
	User.findOne({
		username: req.body.username
	}, (err, user) => {
		if (err){
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		if (!user){
			return next({message: "Username not found", status: httpCodes.unauthorized})
		}
		if (!user.comparePassword(req.body.password)){
			return next({message: "Wrong password", status: httpCodes.unauthorized})
		}
		res.json({token: jwt.sign({
			username: user.username,
			id: user.cuid,
			teamID: user.teamID
		}, 'REQUEST4LEARNING')}) 
	})	
}

module.exports.authCheck = (req, res, next) => {
	if (!req.user) {
		return next({message: "Unauthorized user", status: httpCodes.unauthorized})
	}
	next()
}