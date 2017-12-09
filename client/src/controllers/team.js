import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'
import AuthenticationController from './authentication'

class TeamController {
	constructor() {
		this.token = localStorage.getItem('jwt')
		this.authenticationController = new AuthenticationController()
		this.user = this.authenticationController.decodeUser()
	}

	getTeams() {
		return prepareRequest(Request.get(paths.teams))
	}

	getTeam(teamID) {
		return prepareRequest(Request.get(paths.teams + '/' + teamID))
	}

	updateTeam(team) {
		return prepareRequest(Request.patch(paths.teams + '/' + this.user.teamID).send({ name: team.name, motto: team.motto }))
	}

	updateTeamAvatar(teamAvatar) {
		return prepareRequest(Request.patch(paths.teams + '/' + this.user.teamID + '/avatar').send({ teamAvatar }))
	}

	getTeamComments() {
		return prepareRequest(Request.get(paths.teams + '/' + this.user.teamID + '/comments'))
	}

	createTeamComment(text) {
		return prepareRequest(Request.post(paths.teams + '/' + this.user.teamID + '/comments').send({ text }))
	}

	getTeamTasks() {
		return prepareRequest(Request.get(paths.teams + '/' + this.user.teamID + '/tasks'))
	}

	createTeamTask(text) {
		return prepareRequest(Request.post(paths.teams + '/' + this.user.teamID + '/tasks').send({ text }))
	}

	updateTeamTask(taskID, task) {
		return prepareRequest(Request.patch(paths.teams + '/' + this.user.teamID + '/tasks/' + taskID).send({ text: task.text, assignee: task.assignee, status: task.status}))
	}

	deleteTeamTask(taskID) {
		return prepareRequest(Request.delete(paths.teams + '/' + this.user.teamID + '/tasks/' + taskID))
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

	acceptTeamInvitationDemo() {
		console.log('frontend controller sending')
		return prepareRequest(Request.post(paths.acceptTeamInvitationDemo))
	}
}

export default TeamController