import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'

class QuestController {
	getQuests() {
		return prepareRequest(Request.get(paths.quests))
	}

	getQuest(questID) {
		return prepareRequest(Request.get(paths.quests + '/' + questID))
	}

	getQuestProgress(questID) {
		return prepareRequest(Request.get(paths.quests + '/' + questID + '/progress'))
	}

	startWorkOnQuest(questID) {
		return prepareRequest(Request.post(paths.quests + '/' + questID + '/progress'))
	}

	getQuestSolutions(questID) {
		return prepareRequest(Request.get(paths.quests + '/' + questID + '/solutions'))
	}

	getQuestSolution(questID, solutionID) {
		return prepareRequest(Request.get(paths.quests + '/' + questID + '/solutions/' + solutionID))
	}

	getQuestSolutionAssessment(questID, solutionID) {
		return prepareRequest(Request.get(paths.quests + '/' + questID + '/solutions/' + solutionID + '/assessments'))
	}

	createQuestSolutionAssessment(questID, solutionID, assessment) {
		return prepareRequest(Request.post(paths.quests + '/' + questID + '/solutions/' + solutionID + '/assessments').send({ points: assessment.points, comment: assessment.comment }))
	}

	getLeaderboard() {
		return prepareRequest(Request.get(paths.leaderboard))
	}
}

export default QuestController