import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'

class TeamController {
	constructor() {
		this.token = localStorage.getItem('jwt')
	}

	getTeams() {
		return prepareRequest(Request.get(paths.teams))
	}

	getTeam(teamID) {
		return prepareRequest(Request.get(paths.teams + '/' + teamID))
	}

	updateTeam(teamID, team) {
		return prepareRequest(Request.patch(paths.teams + '/' + teamID).send({ name: team.name, motto: team.motto }))
	}

	updateTeamAvatar(teamID, teamAvatar) {
		return prepareRequest(Request.patch(paths.teams + '/' + teamID + '/avatar').send({ teamAvatar }))
	}

	getTeamComments(teamID) {
		return prepareRequest(Request.get(paths.teams + '/' + teamID + '/comments'))
	}

	createTeamComment(teamID, text) {
		return prepareRequest(Request.post(paths.teams + '/' + teamID + '/comments').send({ text }))
	}

	getTeamTasks(teamID) {
		return prepareRequest(Request.get(paths.teams + '/' + teamID + '/tasks'))
	}

	createTeamTask(teamID, text) {
		return prepareRequest(Request.post(paths.teams + '/' + teamID + '/tasks').send({ text }))
	}

	updateTeamTask(teamID, taskID, task) {
		return prepareRequest(Request.patch(paths.teams + '/' + teamID + '/tasks/' + taskID).send({ text: task.text, assignee: task.assignee, status: task.status}))
	}

	deleteTeamTask(teamID, taskID) {
		return prepareRequest(Request.delete(paths.teams + '/' + teamID + '/tasks/' + taskID))
	}

	getTeamInvitations() {
		return prepareRequest(Request.get(paths.teamInvitations))
	}

	createTeamInvitation(receiverID) {
		return prepareRequest(Request.post(paths.teamInvitations).send({ receiverID }))
	}

	updateTeamInvitation(invitationID, status) {
		return prepareRequest(Request.post(paths.teamInvitations + '/' + invitationID).send({ status }))
	}
}

export default TeamController