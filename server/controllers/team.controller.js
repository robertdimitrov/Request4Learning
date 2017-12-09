'use strict'

const striptags = require('striptags')
const async = require('async')
const cuid = require('cuid')

const Team = require('../models/team')
const TeamTask = require('../models/teamTask')
const TeamComment = require('../models/teamComment')
const TeamInvitation = require('../models/teamInvitation')
const User = require('../models/user')
const httpCodes = require('../utils/httpcodes')


module.exports.sameTeamCheck = (req, res, next) => {
	User.findOne({ cuid: req.user.id }).exec( (err, user) => {
		if (user) {
			if (!user.teamID) {
				return next({ message: 'The logged user has no team', status: httpCodes.badrequest })
			}

			if (user.teamID !== req.params.teamid) {
				return next({ message: 'Unauthorized user', status: httpCodes.unauthorized })
			} 

			next()
		}
	})
}

module.exports.getTeams = (req, res, next) => {
	Team.find({}, (err, teams) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}

		res.status(httpCodes.success).json({ data: teams })
	})
}

module.exports.getTeam = (req, res, next) => {
	Team.findOne({cuid: req.params.teamid}).exec( (err, team) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}

		if (!team) {
			return next({ message: `Team with id ${req.params.teamid} not found`, status: httpCodes.notfound})
		}

		return res.status(httpCodes.success).json({ data: team })
	})
}

module.exports.updateTeam = (req, res, next) => {
	if (!req.body.name && !req.body.motto) {
		return next({ message: 'No team attributes sent', status: httpCodes.badrequest })
	}

	async.waterfall([
		function(query) {
			if (req.body.name) {
				Team.findOne({ name: req.body.name}).exec( (err, team) => {
					if (team) {
						return next({ message: `Team with name ${req.body.name} already exists`, status: httpCodes.conflict})
					}
					query()
				})
			}
		},
		function(query) {
			User.findOne({ cuid: req.user.id}).exec(query)
		},
		function(user, query) {
			Team.findOne({ cuid: user.teamID }).exec( (err, team) => {
				if (err) {
					return next({message: err.message, status: httpCodes.badrequest})
				}

				if (!team) {
					return next({ message: `Team with id ${req.params.cuid} not found`, status: httpCodes.notfound })
				}

				user.stage += 1
				user.save( (err, updatedUser) => {})

				team.name = striptags(req.body.name) || team.name
				team.motto = striptags(req.body.motto) || team.motto

				team.save( (err, updatedTeam) => {
					if (err) {
						return next({ message: err.message, status: httpCodes.internalServerError })
					}
					res.status(httpCodes.success).json({ data: updatedTeam})
				})
			})
		}
	])
}

module.exports.updateTeamAvatar = (req, res, next) => {
	if (!req.file) {
		return next({ message: 'Problem while uploading the picture', status: httpCodes.internalServerError })
	} 
	Team.findOne({ cuid: req.params.teamid }).exec( (err, team) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		if (!team) {
			return next({ message: `Team with id ${req.params.teamid} not found`, status: httpCodes.notfound })
		}

		team.avatarAssetName = req.file.filename

		team.save( (err, updatedTeam) => {
			if (err) {
				return next({ message: err.message, status: httpCodes.internalServerError })
			}
			res.status(httpCodes.success).json({ data: updatedTeam })
		})
	})		
}

module.exports.getTeamComments = (req, res, next) => {
	async.waterfall([
		function(query) {
			TeamComment.find({ teamID: req.params.teamid }).exec( (err, comments) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				query(null, comments)
			})
		},
		function(comments, query) {
			let authorIDs = comments.map( c => c.authorID )
			User.find({ cuid: {$in: authorIDs}}).exec( (err, users) => {
				comments = JSON.parse(JSON.stringify(comments))
				for (let comment of comments) {
					for (let user of users) {
						if (comment.authorID === user.cuid) {
							comment.avatarAssetName = user.avatarAssetName
							comment.publicName = user.publicName || user.username
						}
					}
				}
				res.status(httpCodes.success).json({ data: comments })
			})
		}
	])
}

module.exports.createTeamComment = (req, res, next) => {
	if (!req.body.text || req.body.text.length === 0) {
		return next({message: 'No comment text sent', status: httpCodes.badrequest})
	}

	let comment = new TeamComment({
		text: striptags(req.body.text),
		cuid: cuid(),
		authorID: req.user.id,
		teamID: req.params.teamid
	})

	comment.save( (err) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		res.status(httpCodes.created).json({ data: comment })
	})
}

module.exports.getTeamTasks = (req, res, next) => {
	TeamTask.find({ teamID: req.params.teamid }).exec( (err, tasks) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}

		res.status(httpCodes.success).json({ data: tasks })
	})
}

module.exports.createTeamTask = (req, res, next) => {
	if (!req.body.text || req.body.text.length === 0) {
		return next({message: 'No task text sent', status: httpCodes.badrequest})
	}

	let task = new TeamTask({
		text: striptags(req.body.text),
		cuid: cuid(),
		authorID: req.user.id,
		teamID: req.params.teamid
	})

	task.save( (err) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		res.status(httpCodes.created).json({ data: task })
	})
}

module.exports.updateTeamTask = (req, res, next) => {
	if ((!req.body.text || req.body.text.length === 0) && !req.body.assignee && !req.body.status) {
		return next({ message: 'No team task attributes sent', status: httpCodes.badrequest })
	}

	TeamTask.findOne({ cuid: req.params.taskid }).exec( (err, task) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}

		if (!task) {
			return next({message: `Task with id ${req.params.teamid} not found`, status: httpCodes.notfound})
		}

		task.text = striptags(req.body.text) || task.text
		task.assignee = req.body.assignee || task.assignee
		task.status = req.body.status || task.status

		task.save( (err) => {
			if (err) {
				return next({message: err.message, status: httpCodes.internalServerError})
			}
			res.status(httpCodes.success).json({ data: task })
		})
	})
}

module.exports.deleteTeamTask = (req, res, next) => {
	async.waterfall([
		function(query) {
			TeamTask.findOne({ cuid: req.params.taskid }).exec( (err, task) => {
				if (!task) {
					return next({ message: `Task with id ${req.params.taskid} not found`, status: httpCodes.notfound })
				}
				query()
			})
		},
		function(query) {
			TeamTask.remove({ cuid: req.params.taskid }).exec( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				} 
				res.status(httpCodes.success).end()
			})
		}
	])
}

module.exports.getTeamInvitations = (req, res, next) => {
	TeamInvitation.find({ receiverID: req.user.id }, (err, invitations) => {
		if (err) {
			return next({message: err.message, status: httpCodes.internalServerError})
		}
		res.status(httpCodes.success).json({ data: invitations })
	})
}

module.exports.createTeamInvitation = (req, res, next) => {
	if (!req.body.receiverID) {
		return next({ message: 'Receiver of invitation not specified', status: httpCodes.badrequest })
	}

	if (req.body.receiverID === req.user.id) {
		return next({ message: 'A user can not invite herself to a team', status: httpCodes.badrequest})
	}

	async.series([
		function(query) {
			User.findOne({ cuid: req.body.receiverID }).exec( (err, user) => {
				if (!user) {
					return next({ message: `User with id ${req.body.receiverID} not found`, status: httpCodes.notfound })
				}
				query()
			})
		},
		function(query) {
			let invitation = new TeamInvitation({
				senderID: req.user.id,
				receiverID: req.body.receiverID,
				cuid: cuid()
			})

			invitation.save( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				res.status(httpCodes.success).json({ data: invitation })
			})
		}
	])
}

module.exports.updateTeamInvitation = (req, res, next) => {
	if (!req.body.status || (req.body.status !== 'accepted' && req.body.status !== 'declined')) {
		return next({ message: 'New status must be accepted or declined', status: httpCodes.badrequest })
	}

	async.waterfall([
		function(query) {
			TeamInvitation.findOne({ cuid: req.params.invitationid }).exec( (err, invitation) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError})
				}
				if (!invitation) {
					return next({ message: `Invitation with id ${req.params.invitationid} not found`, status: httpCodes.notfound })
				}

				if (req.body.status === 'declined') {
					invitation.status = 'declined'
					invitation.save( (err) => {
						if (err) {
							return next({message: err.message, status: httpCodes.internalServerError})
						}
						res.status(httpCodes.success).json({ data: invitation })
					})
				} else {
					query(null, invitation)
				}
			})
		},
		function(invitation, query) {
			invitation.status = 'accepted'
			invitation.save( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError}) 
				}
				query(null, invitation)
			})
		},
		function(invitation, query) {
			let receiverID = req.user.id
			let senderID = invitation.senderID

			TeamInvitation.findOne({ senderID: senderID, receiverID: { $ne: receiverID}, status: 'accepted'}).exec( (err, invitation) => {
				if (invitation) {
					let thirdTeamMemberID = invitation.receiverID
					query(null, [receiverID, senderID, thirdTeamMemberID])
				} else {
					res.status(httpCodes.success).end()
				}
			})
		},
		function(users, query) {
			let team = new Team({
				cuid: cuid(),
				name: cuid()
			})
			team.save( (err) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError}) 
				}
				query(null, users, team.cuid)
			})
		},
		function(users, teamCUID, query) {
			User.update({ cuid: { $in: users }}, { teamID: teamCUID}, {multi: true}, (err, updatedUsers) => {
				if (err) {
					return next({message: err.message, status: httpCodes.internalServerError}) 
				}
				query(null, users)
			})
		},
		function(users, query) {
			TeamInvitation.update({ $or: [{senderID: { $in: users }}, {receiverID: { $in: users }}], status: { $ne: 'accepted'}},
				{status: 'closed'}, {multi: true}, (err, updatedInvitations) => {
					if (err) {
						return next({message: err.message, status: httpCodes.internalServerError})  
					}
					res.status(httpCodes.success).end()
				})
		}
	])
}

module.exports.acceptTeamInvitationDemo = (req, res, next) => {
	console.log('server found')
	// only for demo purposes
	User.findOne({ cuid: req.user.id}).exec( (err, user) => {
		if (user.stage === 1) {
			user.stage = 2
		}

		user.save( (err) => {
			if (err) {
				return next({message: err.message, status: httpCodes.internalServerError})  
			}
			res.status(httpCodes.success).end()
		})
	})

	// User.update({ cuid: req.params.cuid }, { $inc: { stage: 1 } }, (err, updatedUser) => {
	// 	if (err) {
	// 		return next({message: err.message, status: httpCodes.internalServerError})  
	// 	}
	// 	res.status(httpCodes.success).end()
	// })
}