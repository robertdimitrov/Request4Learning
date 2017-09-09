'use strict'

const striptags = require('striptags')

const User = require('../models/user')
const httpCodes = require('../utils/httpcodes')

module.exports.getUsers = (req, res, next) => {
	User.find({}, (err, users) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}

		users = users.map( u => {
			return {
				publicName: u.publicName || u.username,
				id: u.cuid,
				teamID: u.teamID,
				type: u.type,
				avatarAssetName: u.avatarAssetName
			}
		})

		res.status(httpCodes.success).json({ data: users })
	})
}

module.exports.getUser = (req, res, next) => {
	User.findOne({ cuid: req.params.cuid }).exec( (err, user) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		if (!user) {
			return next({ message: `User with id ${req.params.cuid} not found`, status: httpCodes.notfound })
		}

		let userInfo = {
			cuid: user.cuid,
			username: user.username,
			publicName: user.publicName || user.username,
			type: user.type,
			teamID: user.teamID,
			avatarAssetName: user.avatarAssetName,
			characterAssetName: user.characterAssetName,
			stage: user.stage
		}

		if (req.user.id === req.params.cuid) {
			res.status(httpCodes.success).json({ data: userInfo })
		} else {
			userInfo.username = undefined
			userInfo.characterAssetName = undefined
			userInfo.stage = undefined
			res.status(httpCodes.success).json({ data: userInfo })
		}
	})
}

module.exports.updateUser = (req, res, next) => {
	if (req.user.id !== req.params.cuid) {
		return next({ message: 'Unauthorized user', status: httpCodes.unauthorized })
	}
	if (!req.body.publicName && !req.body.characterAssetName) {
		return next({ message: 'No user attributes sent', status: httpCodes.badrequest })
	}

	if (req.body.publicName) {
		User.findOne({ publicName: req.body.publicName}).exec( (err, user) => {
			if (user) {
				return next({ message: `User with public name ${req.body.publicName} already exists`, status: httpCodes.conflict})
			}
		})
	}

	User.findOne({ cuid: req.params.cuid }).exec( (err, user) => {
		if (err) {
			return next({message: err.message, status: httpCodes.badrequest})
		}
		if (!user) {
			return next({ message: `User with id ${req.params.cuid} not found`, status: httpCodes.notfound })
		}

		user.publicName = striptags(req.body.publicName) || user.publicName
		user.characterAssetName = striptags(req.body.characterAssetName) || user.characterAssetName

		user.save( (err, updatedUser) => {
			if (err) {
				return next({ message: err.message, status: httpCodes.internalServerError })
			}
			res.status(httpCodes.success).json(updatedUser)
		})

	})

}