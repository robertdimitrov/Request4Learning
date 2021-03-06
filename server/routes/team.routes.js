'use strict'

const express = require('express')
const AuthenticationController = require('../controllers/authentication.controller')
const TeamController = require('../controllers/team.controller')

const Router = express.Router()

const imageUpload = require('../utils/imageUpload')
const avatar = imageUpload.single('teamAvatar')

Router.route('/teams')
	.get(TeamController.getTeams)

Router.route('/teams/:teamid')
	.get(TeamController.getTeam)
	.patch(TeamController.sameTeamCheck, TeamController.updateTeam)

Router.route('/teams/:teamid/avatar')
	.patch(TeamController.sameTeamCheck, avatar, TeamController.updateTeamAvatar)

Router.route('/teams/:teamid/comments')
	.get(TeamController.sameTeamCheck, TeamController.getTeamComments)
	.post(TeamController.sameTeamCheck, TeamController.createTeamComment)

Router.route('/teams/:teamid/tasks')
	.get(TeamController.sameTeamCheck, TeamController.getTeamTasks)
	.post(TeamController.sameTeamCheck, TeamController.createTeamTask)

Router.route('/teams/:teamid/tasks/:taskid')
	.patch(TeamController.sameTeamCheck, TeamController.updateTeamTask)
	.delete(TeamController.sameTeamCheck, TeamController.deleteTeamTask)

Router.route('/team-invitations')
	.get(TeamController.getTeamInvitations)
	.post(TeamController.createTeamInvitation)

Router.route('/team-invitations/:invitationid')
	.patch(TeamController.updateTeamInvitation)

Router.route('/team-invitations-accept-demo')
	.post(TeamController.acceptTeamInvitationDemo)

module.exports = Router