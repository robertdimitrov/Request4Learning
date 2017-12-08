'use strict'

const striptags = require('striptags')
const async = require('async')

const User = require('../models/user')
const UserNotification = require('../models/userNotification')
const httpCodes = require('../utils/httpcodes')

let hideUserFields = (user, loggedUserID) => {
	user.publicName = user.publicName || user.username
	user.password = undefined 
	if (user.cuid !== loggedUserID) {
		user.username = undefined
		user.characterAssetName = undefined
		user.stage = undefined
	}
	return user
}

module.exports.sameUserCheck = (req, res, next) => {
	if (req.user.id !== req.params.cuid) {
		return next({ message: 'Unauthorized user', status: httpCodes.unauthorized })
	}
	next()
}

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

		res.status(httpCodes.success).json({ data: hideUserFields(user, req.user.id) })
	})
}

module.exports.updateUser = (req, res, next) => {
	if (!req.body.publicName && !req.body.characterAssetName) {
		return next({ message: 'No user attributes sent', status: httpCodes.badrequest })
	}
	async.series([
		function(query) {
			User.findOne({ publicName: req.body.publicName}).exec( (err, user) => {
				if (err) {
					return next({ message: `Couldn't find user`, status: httpCodes.internalServerError})
				}
				if (user) {
					return next({ message: `User with public name ${req.body.publicName} already exists`, status: httpCodes.conflict})
				}
				query()
			})
		},
		function(query) {
			User.findOne({ cuid: req.params.cuid }).exec( (err, user) => {
				if (err) {
					return next({message: err.message, status: httpCodes.badrequest})
				}

				if (!user) {
					return next({ message: `User with id ${req.params.cuid} not found`, status: httpCodes.notfound })
				}

				user.publicName = striptags(req.body.publicName) || user.publicName
				user.characterAssetName = striptags(req.body.characterAssetName) || user.characterAssetName
				if (user.stage === 0) {
					user.stage = 1
				}

				user.save( (err, updatedUser) => {
					if (err) {
						return next({ message: err.message, status: httpCodes.internalServerError })
					}

					res.status(httpCodes.success).json({ data: hideUserFields(user, req.user.id) })
				})

			})
		}
	])
}

// module.exports.updateUser = (req, res, next) => {
// 	if (!req.body.publicName && !req.body.characterAssetName) {
// 		return next({ message: 'No user attributes sent', status: httpCodes.badrequest })
// 	}

// 	if (req.body.publicName) {
// 		User.findOne({ publicName: req.body.publicName}).exec( (err, user) => {
// 			if (user) {
// 				return next({ message: `User with public name ${req.body.publicName} already exists`, status: httpCodes.conflict})
// 			}
// 		})
// 	}

// 	User.findOne({ cuid: req.params.cuid }).exec( (err, user) => {
// 		if (err) {
// 			return next({message: err.message, status: httpCodes.badrequest})
// 		}

// 		if (!user) {
// 			return next({ message: `User with id ${req.params.cuid} not found`, status: httpCodes.notfound })
// 		}

// 		user.publicName = striptags(req.body.publicName) || user.publicName
// 		user.characterAssetName = striptags(req.body.characterAssetName) || user.characterAssetName

// 		user.save( (err, updatedUser) => {
// 			if (err) {
// 				return next({ message: err.message, status: httpCodes.internalServerError })
// 			}

// 			res.status(httpCodes.success).json({ data: hideUserFields(user, req.user.id) })
// 		})

// 	})
// }

module.exports.updateAvatar = (req, res, next) => {
	if (!req.file) {
		return next({ message: 'Problem while uploading the picture', status: httpCodes.internalServerError })
	} 

	User.findOne({ cuid: req.params.cuid }).exec( (err, user) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		if (!user) {
			return next({ message: `User with id ${req.params.cuid} not found`, status: httpCodes.notfound })
		}

		user.avatarAssetName = req.file.filename

		user.save( (err, updatedUser) => {
			if (err) {
				return next({ message: err.message, status: httpCodes.internalServerError })
			}
			res.status(httpCodes.success).json({ data: hideUserFields(user, req.user.id) })
		})
	})
}

module.exports.getUserNotifications = (req, res, next) => {
	UserNotification.find({}, (err, notifications) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}

		notifications = notifications.filter( n => !n.isSeen && n.userID === req.user.id )

		res.status(httpCodes.success).json({ data: notifications })
	})
}

module.exports.updateUserNotification = (req, res, next) => {
	UserNotification.findOne({ cuid: req.params.nid }).exec( (err, notification) => {
		notification.isSeen = true

		notification.save( (err, updatedNotification ) => {
			if (err) {
				return next({ message: err.message, status: httpCodes.internalServerError })
			}
			res.status(httpCodes.success).json({ data: updatedNotification })
		})
	})
}
