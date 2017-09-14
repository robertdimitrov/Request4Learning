'use strict'

const striptags = require('striptags')
const cuid = require('cuid')
const async = require('async')

const Quest = require('../models/quest')
const QuestProgress = require('../models/questProgress')
const Team = require('../models/team')
const User = require('../models/user')

const httpCodes = require('../utils/httpcodes')

module.exports.getQuests = (req, res, next) => {
	async.waterfall([
		function(query) {
			Quest.find({}, '-_id name maxPoints cuid startDate').exec( (err, quests) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				query(null, quests)
			})
		},
		function(quests, query) {
			User.findOne({ cuid: req.user.id}).exec( (err, user) => {
				if (!user.teamID) {
					return next({ message: 'User doesnt have a team', status: httpCodes.badrequest })
				}
				query(null, quests, user)
			})
		},
		function(quests, user, query) {
			QuestProgress.find({ teamID: user.teamID }).exec( (err, questProgresses) => {
				quests = JSON.parse(JSON.stringify(quests))
				for (let quest of quests) {
					let progress
					for (let qp of questProgresses) {
						if (qp.questID === quest.cuid) {
							progress = qp
							break
						}
					}
					if (!progress) {
						continue
					}
					quest.points = progress.points
					quest.finished = progress.dateFinished ? true : false
				}
				res.status(httpCodes.success).json({ data: quests })
			})
		}
	])
}

module.exports.checkQuestExists = (req, res, next) => {
	Quest.find({ cuid: req.params.id }).exec( (err, quest) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!quest) {
			return next({ message: `Quest with id ${req.params.id} not found`, status: httpCodes.notfound})
		}
		next()
	})
}

module.exports.getQuest = (req, res, next) => {
	
}

module.exports.getQuestProgress = (req, res, next) => {
	
}

module.exports.startWorkOnQuest = (req, res, next) => {
	
}

module.exports.getQuestSolutions = (req, res, next) => {
	
}

module.exports.createQuestSolution = (req, res, next) => {
	
}

module.exports.checkSolutionExists = (req, res, next) => {
	
}

module.exports.getQuestSolution = (req, res, next) => {
	
}

module.exports.getQuestSolutionAssessment = (req, res, next) => {
	
}

module.exports.createQuestSolutionAssessment = (req, res, next) => {
	
}

module.exports.getLeaderboard = (req, res, next) => {
	
}

