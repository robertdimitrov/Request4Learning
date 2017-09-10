'use strict'

const User = require('./models/user')
const UserNotification = require('./models/userNotification')
const Team = require('./models/team')
const TeamComment = require('./models/teamComment')
const TeamTask = require('./models/teamTask')
const TeamInvitation = require('./models/teamInvitation')

module.exports = () => {
	addUsers()
	addUserNotifications()
	addTeams()
	addTeamTasks()
	addTeamInvitations()
	addTeamComments()
}

function addUsers() {
	User.count().exec((err, count) => {
		if (count > 0 ) {
			return
		}

		let user1 = new User({ 
			cuid: 'cj7d7kob70001041a33i0ucr6', 
			username: 'robert', 
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student',
			avatarAssetName: 'avatar1.png',
			teamID: 'cj7erkxk6000104057wc8ba0o'
		})

		let user2 = new User({
			cuid: 'cj7d7mgcj0002041aztfgmx0k', 
			username: 'user123', 
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student',
			teamID: 'cj7erlg3100030405hxwx56c3'
		})

		let user3 = new User({
			cuid: 'cj7esmyoy000a0405duv2v5hz',
			username: 'student1',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student',
			teamID: 'cj7erkxk6000104057wc8ba0o'
		})

		User.collection.insert([user1, user2], (error) => {
			if (error) {
				console.log('Couldnt create dummy User data')
			}
		})
	})
}

function addUserNotifications() {
	UserNotification.count().exec((err, count) => {
		if (count > 0) {
			return
		}

		let userNotification1 = new UserNotification({
			cuid: 'cj7eprjwh000004ujwcp31g08',
			text: 'Someone commented on your forum topic',
			link: 'localhost:3000/forum/abc',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userNotification2 = new UserNotification({
			cuid: 'cj7eptvda000104uj5lltsisi',
			text: 'New quest available',
			link: 'localhost:3000/quests',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userNotification3 = new UserNotification({
			cuid: 'cj7epudtz000204uj86lhxvpu',
			text: 'New quest available',
			link: 'localhost:3000/quests',
			userID: 'cj7d7mgcj0002041aztfgmx0k'
		})

		UserNotification.collection.insert([userNotification1, userNotification2, userNotification3], (error) => {
			if (error) {
				console.log('Couldnt create dummy User Notification data')
			}
		})
	})
}

function addTeams() {
	Team.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let team1 = new Team({
			cuid: 'cj7erkxk6000104057wc8ba0o',
			name: 'Astronaut',
			motto: 'Astronaut'
		})

		let team2 = new Team({
			cuid: 'cj7erlg3100030405hxwx56c3',
			name: 'Gruppe A',
			motto: 'Motto'
		})

		Team.collection.insert([team1, team2], (error) => {
			if (error) {
				console.log('Couldnt create dummy Team data')
			}
		})
	})
}

function addTeamTasks() {
	TeamTask.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let task1 = new TeamTask({
			cuid: 'cj7erp2el00040405d1nx9065',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			text: 'Task 1',
			status: 'open'
		})

		let task2 = new TeamTask({
			cuid: 'cj7erpc1100050405ds2xc8t0',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			text: 'Task 2',
			status: 'open'
		})

		let task3 = new TeamTask({
			cuid: 'cj7erpplw000604051pmhq8ze',
			teamID: 'cj7erlg3100030405hxwx56c3',
			text: 'Another Team Task',
			status: 'closed'
		})

		TeamTask.collection.insert([task1, task2, task3], (error) => {
			if (error) {
				console.log('Couldnt create dummy Team Task data')
			}
		})
	})
}

function addTeamComments() {
	TeamComment.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let comment1 = new TeamComment({
			cuid: 'cj7ers4rp000704054rlhychb',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			authorID: 'cj7d7kob70001041a33i0ucr6',
			text: 'Hello team!'
		})

		let comment2 = new TeamComment({
			cuid: 'cj7erskz100080405csv3sg3m',
			teamID: 'cj7erlg3100030405hxwx56c3',
			authorID: 'cj7d7mgcj0002041aztfgmx0k',
			text: 'Hello another team!'		
		})

		TeamComment.collection.insert([comment1, comment2], (error) => {
			if (error) {
				console.log('Couldnt create dummy Team Comment data')
			}
		})
	})
}

function addTeamInvitations() {
	TeamInvitation.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let invitation1 = new TeamInvitation({
			cuid: 'cj7esl9rr00090405m58g6ptt',
			senderID: 'cj7esmyoy000a0405duv2v5hz',
			receiverID: 'cj7d7kob70001041a33i0ucr6',
			status: 'open'
		})

		TeamInvitation.collection.insert([invitation1], (error) => {
			if (error) {
				console.log('Couldnt create dummy Team Comment data')
			}
		})
	})
}