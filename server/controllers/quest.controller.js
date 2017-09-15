'use strict'

const striptags = require('striptags')
const cuid = require('cuid')
const async = require('async')

const Quest = require('../models/quest')
const QuestProgress = require('../models/questProgress')
const Team = require('../models/team')
const User = require('../models/user')
const JigsawQuestResource = require('../models/jigsawQuestResource')
const TokenQuestTeamWork = require('../models/tokenQuestTeamWork')
const PublicQuestSolution = require('../models/publicQuestSolution')
const PublicQuestAssessment = require('../models/publicQuestAssessment')
const EmptyOutlinesQuest = require('../models/emptyOutlinesQuest')
const EmptyOutlinesQuestRightAnswer = require('../models/emptyOutlinesQuestRightAnswer')
const EmptyOutlinesQuestUserAnswer = require('../models/emptyOutlinesQuestUserAnswer')
const QuizQuestQuestion = require('../models/quizQuestQuestion')
const QuizQuestRightAnswer = require('../models/quizQuestRightAnswer')
const QuizQuestUserAnswer = require('../models/quizQuestUserAnswer')
const RiddleQuest = require('../models/riddleQuest')
const RiddleQuestTeamAnswer = require('../models/riddleQuestTeamAnswer')
const OrderQuestPiece = require('../models/orderQuestPiece')
const OrderQuestUserAnswer = require('../models/orderQuestUserAnswer')

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
	JigsawQuestResource.findOne({ teamID: teamID, questID: quest.cuid }).exec( (err, resource) => {
		if (resource.text) {
			quest.questData = { resource: resource.text }
		}
		query(null, quest)
	})
}

let getTokenQuestInformation = (quest, teamID, query) => {
	async.series([
		function(tokenQuery) {
			PublicQuestSolution.find({ questID: quest.cuid }).sort('dateSubmitted').exec( (err, solutions) => {
				let lastSolution = solutions[solutions.length-1]
				if (lastSolution) {
					quest.questData = {}
					quest.questData.text = lastSolution.text
				}
				tokenQuery()
			})
		},
		function(tokenQuery) {
			TokenQuestTeamWork.findOne({ questID: quest.cuid, teamID: teamID }).exec( (err, teamwork) => {
				if (teamwork) {
					quest.questData.teamStartDate = teamwork.startDate
					quest.questData.teamEndDate = teamwork.endDate
				}
				query(null, quest)
			}) 
		}
	])
}

let getEmptyOutlinesQuestInformation = (quest, teamID, query) => {
	async.waterfall([
		function(emptyOutlinesQuery) {
			EmptyOutlinesQuest.findOne({ questID: quest.cuid }).exec( (err, emptyOutlinesQuest) => {
				if (emptyOutlinesQuest) {
					quest.questData = {}
					quest.questData.text = emptyOutlinesQuest.text
				}
				emptyOutlinesQuery(null, emptyOutlinesQuest.cuid)
			})
		},
		function(emptyOutlinesQuestID, emptyOutlinesQuery) {
			EmptyOutlinesQuestRightAnswer.find({ emptyOutlinesQuestID: emptyOutlinesQuestID }).exec( (err, answers) => {
				if (answers) {
					let fields = answers.map( a => a.field )
					quest.questData.fields = fields
				}
				query(null, quest)
			})
		}
	])
}

let getQuizQuestInformation = (quest, teamID, query) => {
	async.waterfall([
		function(quizQuery) {
			QuizQuestQuestion.find({ questID: quest.cuid }, '-_id -questID').exec( (err, questions) => {
				quizQuery(null, questions)
			})
		},
		function(questions, quizQuery) {
			let questionIDs = questions.map( q => q.cuid )

			QuizQuestRightAnswer.find({ questionID: {$in: questionIDs }}).exec( (err, questAnswers) => {
				let questData = []

				for (let question of questions) {
					let answers = []
					for (let qa of questAnswers) {
						if (qa.questionID === question.cuid) {
							answers.push(qa.answer)
						}
					}
					questData.push({ question, answers })
				}

				quest.questData = questData
				query(null, quest)
			})
		}
	])
}

let getOrderQuestInformation = (quest, teamID, query) => {
	OrderQuestPiece.find({ questID: quest.cuid }, '-position -_id -questID').exec( (err, pieces) => {
		if (pieces) {
			quest.questData = pieces
		}
		query(null, quest)
	})
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
				// if (!qp || !qp.dateStarted) {
				// 	return res.status(httpCodes.success).json({ data: quest })
				// }
				quest = JSON.parse(JSON.stringify(quest))
				switch(quest.type) {
					case 'jigsaw': getJigsawQuestInformation(quest, teamID, query); break
					case 'token': getTokenQuestInformation(quest, teamID, query); break
					case 'emptyOutlines': getEmptyOutlinesQuestInformation(quest, teamID, query); break
					case 'quiz': getQuizQuestInformation(quest, teamID, query); break
					case 'order': getOrderQuestInformation(quest, teamID, query); break
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
	async.waterfall([
		function(query) {
			QuestProgress.find({ questID: req.params.id }).exec( (err, progresses) => {
				progresses = JSON.parse(JSON.stringify(progresses))
				query(null, progresses)
			})
		},
		function(progresses, query) {
			let teamIDs = progresses.map( p => p.teamID )
			Team.find({ cuid: {$in: teamIDs}}).exec( (err, teams) => {

				for (let p of progresses) {
					p.hasFinished = p.dateFinished ? true : false	
					for (let team of teams) {
						if (p.teamID === team.cuid) {
							p.teamName = team.name
							p.teamAvatarAssetName = team.avatarAssetName
						}
					}
				}
				res.status(httpCodes.success).json({ data: progresses })
			})
		}
	])
}

module.exports.startWorkOnQuest = (req, res, next) => {
	async.waterfall([
		function(query) {
			User.findOne({ cuid: req.user.id}).exec( (err, user) => {
				if (!user.teamID) {
					return next({ message: 'User doesnt have a team', status: httpCodes.badrequest })
				}
				query(null, user.teamID)
			})
		},
		function(teamID, query) {
			let progress = new QuestProgress({
				cuid: cuid(),
				teamID: teamID,
				questID: req.params.id
			})

			progress.save( (err) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				res.status(httpCodes.created).json({ data: progress })
			})
		}
	])
}

let getPublicQuestSolutions = (quest, progresses, query) => {
	async.waterfall([
		function(publicQuestQuery) {
			let teamIDs = progresses.map( p => p.teamID )
			Team.find({ cuid: {$in: teamIDs} }).exec( (err, teams) => {
				publicQuestQuery(null, teams)
			})
		},
		function(teams, publicQuestQuery) {
			let solutions = []
			for (let progress of progresses) {
				let solution = {}
				for (let team of teams) {
					if (progress.teamID === team.cuid) {
						solution.teamID = team.cuid
						solution.teamName = team.name
						solution.teamAvatarAssetName = team.avatarAssetName
						solution.points = progress.points || 0
					}
				}
				solutions.push(solution)
			}
			publicQuestQuery(null, teams, solutions)
		},
		function(teams, solutions, publicQuestQuery) {
			let teamIDs = teams.map( t => t.cuid )
			PublicQuestSolution.find({ questID: quest.cuid, teamID: { $in: teamIDs } }).exec( (err, pqSolutions) => {
				for (let solution of solutions) {
					for (let pqSolution of pqSolutions) {
						if (solution.teamID === pqSolution.teamID) {
							solution.id = pqSolution.cuid
						}
					}
				}
				publicQuestQuery(null, teams, solutions)
			})
		},
		function(teams, solutions, publicQuestQuery) {
			let solutionIDs = solutions.map( s => s.id)
			PublicQuestAssessment.find({ cuid: { $in: solutionIDs } }).exec( (err, assessments) => {
				for (let solution of solutions) {
					let score = 0
					let assessmentsCount = 0
					for (let assessment of assessments) {
						if (assessment.solutionID === solution.id) {
							score += assessment.points
							assessmentsCount += 1
						}
					}
					if (quest.type !== 'pickTheWinner' && assessmentsCount > 0) {
						score = score / assessmentsCount 
					}
					solution.score = score
					solution.assessmentsCount = assessmentsCount
				}
				query(null, solutions)
			})
		}
	])
}

let getTokenQuestSolutions = (quest, progresses, query) => {
	PublicQuestSolution.find({ questID: quest.cuid }).sort('dateSubmitted').exec( (err, solutions) => {
		let lastSolution = solutions[solutions.length-1]
		query(null, lastSolution)
	})
}

let getEmptyOutlinesQuestSolutions = (quest, progresses, userID, query) => {
	async.waterfall([
		function(emptyOutlinesQuery) {
			EmptyOutlinesQuest.findOne({ questID: quest.cuid }).exec( (err, emptyOutlinesQuest) => {
				emptyOutlinesQuery(null, emptyOutlinesQuest)
			})
		},
		function(emptyOutlinesQuest, emptyOutlinesQuery) {
			EmptyOutlinesQuestRightAnswer.find({ emptyOutlinesQuestID: emptyOutlinesQuest.cuid }).exec( (err, rightAnswers) => {
				emptyOutlinesQuery(null, emptyOutlinesQuest, rightAnswers)
			})
		},
		function(emptyOutlinesQuest, rightAnswers, emptyOutlinesQuery) {
			EmptyOutlinesQuestUserAnswer.find({ emptyOutlinesQuestID: emptyOutlinesQuest.cuid, userID: userID }).exec( (err, userAnswers) => {
				let solution = {}
				solution.questText = emptyOutlinesQuest.text
				solution.rightAnswers = rightAnswers
				solution.userAnswers = userAnswers
				query(null, solution)
			})
		}
	])
}

let getQuizQuestSolutions = (quest, progresses, userID, query) => {
	async.waterfall([
		function(quizQuery) {
			QuizQuestQuestion.find({ questID: quest.cuid }).exec( (err, questions) => {
				quizQuery(null, questions)
			})
		},
		function(questions, quizQuery) {
			let questionIDs = questions.map( q => q.cuid )
			QuizQuestRightAnswer.find({ questionID: {$in : questionIDs}}).exec( (err, options) => {
				quizQuery(null, questions, questionIDs, options)
			})
		},
		function(questions, questionIDs, options, quizQuery) {
			QuizQuestUserAnswer.find({ questionID: { $in: questionIDs}, userID: userID }).exec( (err, userAnswers) => {
				let solutions = []
				for (let question of questions) {
					let solution = {}
					solution.question = question.question

					let userAnswer

					for (let answer of userAnswers) {
						if (answer.questionID === question.cuid) {
							userAnswer = answer
						}
					}

					for (let option of options) {
						if (option.questionID === question.cuid && option.isCorrect) {
							solution.rightAnswer = option.answer
						}
						if (option.cuid === userAnswer.answerID) {
							solution.userAnswer = option.answer
						}
					}

					solution.isCorrect = solution.userAnswer === solution.rightAnswer
					solutions.push(solution)
				}
				query(null, solutions)
			})
		}
	])
}

let getRiddleQuestSolutions = (quest, progresses, userID, query) => {
	async.waterfall([
		function(riddleQuery) {
			RiddleQuest.findOne({ questID: quest.cuid }).exec( (err, riddleQuest) => {
				riddleQuery(null, riddleQuest)
			})
		},
		function(riddleQuest, riddleQuery) {
			 User.findOne({ cuid: userID }).exec( (err, user) => {
			 	riddleQuery(null, riddleQuest, user.teamID)
			 })
		},
		function(riddleQuest, teamID, riddleQuery) {
			RiddleQuestTeamAnswer.find({ riddleID: riddleQuest.cuid, teamID: teamID }).exec( (err, teamAnswers) => {
				let solution = {}
				solution.rightAnswer = riddleQuest.rightAnswer

				let answers = []
				for (let teamAnswer of teamAnswers) {
					let isCorrect = teamAnswer.answer === solution.rightAnswer
					answers.push({ answer: teamAnswer.answer, isCorrect })
				}

				solution.teamAnswers = answers

				query(null, solution)
			})
		}
	])
}

let getOrderQuestSolutions = (quest, progresses, userID, query) => {
	async.waterfall([
		function(orderQuery) {
			OrderQuestPiece.find({ questID: quest.cuid }).exec( (err, pieces) => {
				orderQuery(null, pieces)
			})
		},
		function(pieces, orderQuery) {
			OrderQuestUserAnswer.find({ questID: quest.cuid, userID: userID }).exec( (err, userAnswers) => {
				let solutions = []
				pieces = JSON.parse(JSON.stringify(pieces))
				pieces = pieces.sort( (a, b) => a.position > b.position)

				userAnswers = JSON.parse(JSON.stringify(userAnswers))

				for (let userAnswer of userAnswers) {
					for (let piece of pieces) {
						if (userAnswer.pieceID === piece.cuid) {
							userAnswer.content = piece.content
						}
					}
				}

				userAnswers = userAnswers.sort( (a, b) => a.position > b.position)

				for (let i = 0; i < pieces.length; i++) {
					let rightAnswer = pieces[i].content
					let userAnswer = userAnswers[i].content || ""

					let isCorrect = userAnswer === rightAnswer
					solutions.push({ position: i + 1, rightAnswer, userAnswer, isCorrect })
				}

				query(null, solutions)
			})
		}
	])
}

module.exports.getQuestSolutions = (req, res, next) => {
	async.waterfall([
		function(query) {
			Quest.findOne({ cuid: req.params.id }).exec( (err, quest) => {
				if (quest.dueDate > Date.now) {
					return next({ message: 'Quest is still open', status: httpCodes.conflict })
				} 
				query(null, quest)
			})
		},
		function(quest, query) {
			QuestProgress.find({ questID: quest.cuid, dateFinished: { $gt: 0 } }).exec( (err, progresses) => {
				progresses = JSON.parse(JSON.stringify(progresses))
				query(null, quest, progresses)
			})
		},
		function(quest, progresses, query) {
			switch (quest.type) {
				case 'simple':
				case 'pickTheWinner':
				case 'jigsaw': getPublicQuestSolutions(quest, progresses, query); break
				case 'token': getTokenQuestSolutions(quest, progresses, query); break
				case 'emptyOutlines': getEmptyOutlinesQuestSolutions(quest, progresses, req.user.id, query); break
				case 'quiz': getQuizQuestSolutions(quest, progresses, req.user.id, query); break
				case 'riddle': getRiddleQuestSolutions(quest, progresses, req.user.id, query); break
				case 'order': getOrderQuestSolutions(quest, progresses, req.user.id, query); break
				default: query(null, null)
			}
		},
		function(solutions, query) {
			res.status(httpCodes.success).json({ data: solutions })
		}
	])
}

module.exports.checkSolutionExists = (req, res, next) => {
	PublicQuestSolution.findOne({ cuid: req.params.solutionid }).exec( (err, solution) => {
		if (err) {
			return next({ message: err.message, status: httpCodes.internalServerError })
		}
		if (!solution) {
			return next({ message: `Solution with id ${req.params.solutionid} not found`, status: httpCodes.notfound})
		}
		next()
	})
}

module.exports.getQuestSolution = (req, res, next) => {
	PublicQuestsolution.findOne({ cuid: req.params.solutionid }).exec( (err, solution) => {
		res.status(httpCodes.success).json({ data: solution })
	})
}

module.exports.getQuestSolutionAssessment = (req, res, next) => {
	
}

module.exports.createQuestSolutionAssessment = (req, res, next) => {
	
}

module.exports.getLeaderboard = (req, res, next) => {
	async.waterfall([
		function(query) {
			Team.find().exec( (err, teams) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				teams = JSON.parse(JSON.stringify(teams))

				for (let team of teams) {
					team.points = 0
					team.questsSolved = 0
				}
				query(null, teams)
			})
		},
		function(teams, query) {
			QuestProgress.find({ points: { $gt: 0 } }).exec( (err, progresses) => {
				if (err) {
					return next({ message: err.message, status: httpCodes.internalServerError })
				}
				for (let progress of progresses) {
					for (let team of teams) {
						if (team.cuid === progress.teamID) {
							team.points += progress.points
							team.questsSolved += 1
						}
					}
				}

				teams = teams.sort( (a,b) => a.points < b.points)

				res.status(httpCodes.success).json({ data: teams })
			})
		}
	])
}

