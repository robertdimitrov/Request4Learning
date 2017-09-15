'use strict'

const express = require('express')
const QuestController = require('../controllers/quest.controller')

const Router = express.Router()

Router.route('/quests')
	.get(QuestController.getQuests)

Router.route('/quests/:id')
	.get(QuestController.checkQuestExists, QuestController.getQuest)

Router.route('/quests/:id/progress')
	.get(QuestController.checkQuestExists, QuestController.getQuestProgress)
	.post(QuestController.checkQuestExists, QuestController.startWorkOnQuest)

Router.route('/quests/:id/solutions')
	.get(QuestController.checkQuestExists, QuestController.getQuestSolutions)

Router.route('/quests/:id/solutions/:solutionid')
	.get(QuestController.checkQuestExists, QuestController.checkSolutionExists, QuestController.getQuestSolution)

Router.route('/quests/:id/solutions/:solutionid/assessments')
	.get(QuestController.checkQuestExists, QuestController.checkSolutionExists, QuestController.getQuestSolutionAssessment)
	.post(QuestController.checkQuestExists, QuestController.checkSolutionExists, QuestController.createQuestSolutionAssessment)

Router.route('/leaderboard')
	.get(QuestController.getLeaderboard)

module.exports = Router