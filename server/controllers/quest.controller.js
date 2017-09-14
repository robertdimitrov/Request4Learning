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
	Quest.findOne({ cuid: req.params.id }).exec( (err, quest) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!quest) {
			return next({ message: `Quest with id ${req.params.id} not found`, status: httpCodes.notfound})
		}
		next()
	})
}

let getJigsawQuestInformation = (quest, teamID, query) => {
	query(null, quest)
}

let getEmptyOutlinesQuestInformation = (quest, teamID, query) => {
	query(null, quest)
}

let getQuizQuestInformation = (quest, teamID, query) => {
	query(null, quest)
}

let getRiddleQuestInformation = (quest, teamID, query) => {
	query(null, quest)
}

let getOrderQuestInformation = (quest, teamID, query) => {
	query(null, quest)
}



module.exports.getQuest = (req, res, next) => {
	async.waterfall([
		function(query) {
			Quest.findOne({ cuid: req.params.id }).exec( (err, quest) => {
				query(null, quest)
			})
		},
		function(quest, query) {
			User.findOne({ cuid: req.user.id}).exec( (err, user) => {
				if (!user.teamID) {
					return next({ message: 'User doesnt have a team', status: httpCodes.badrequest })
				}
				query(null, quest, user.teamID)
			})
		},
		function(quest, teamID, query) {
			QuestProgress.findOne({ questID: req.params.id, teamID: teamID}).exec( (err, qp) => {
				if (!qp || !qp.dateStarted) {
					return res.status(httpCodes.success).json({ data: quest })
				}
				switch(quest.type) {
					case 'jigsaw': getJigsawQuestInformation(quest, teamID, query); break
					case 'jigsaw': getEmptyOutlinesQuestInformation(quest, teamID, query); break
					case 'jigsaw': getQuizQuestInformation(quest, teamID, query); break
					case 'jigsaw': getRiddleQuestInformation(quest, teamID, query); break
					case 'jigsaw': getOrderQuestInformation(quest, teamID, query); break
					default: query(null, quest)
				}
			})
		},
		function(quest, query) {
			res.status(httpCodes.success).json({ data: quest })
		}
	])
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

