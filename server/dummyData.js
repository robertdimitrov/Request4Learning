'use strict'

const User = require('./models/user')
const UserNotification = require('./models/userNotification')
const Team = require('./models/team')
const TeamComment = require('./models/teamComment')
const TeamTask = require('./models/teamTask')
const TeamInvitation = require('./models/teamInvitation')
const Course = require('./models/course')
const CourseAnnouncement = require('./models/courseAnnouncement')
const CourseFeedback = require('./models/courseFeedback')

module.exports = () => {
	addUsers()
	addUserNotifications()
	addTeams()
	addTeamTasks()
	addTeamInvitations()
	addTeamComments()
	addCourseInformation()
	addCourseAnnouncements()
	addCourseFeedbacks()
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

		let user4 = new User({
			cuid: 'cj7f1qr20000104vc72o01zqd',
			username: 'userA',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student'
		})

		let user5 = new User({
			cuid: 'cj7f1rqgc000204vcojg8pzb7',
			username: 'userB',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student'
		})

		let user6 = new User({
			cuid: 'cj7f1rvc7000304vcxsfj8j01',
			username: 'userC',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student'
		})

		User.collection.insert([user1, user2, user3, user4, user5, user6], (error) => {
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

		let invitation2 = new TeamInvitation({
			cuid: 'cj7f1sts2000404vc1tvi71yg',
			senderID: 'cj7f1rvc7000304vcxsfj8j01',
			receiverID: 'cj7f1rqgc000204vcojg8pzb7',
			status: 'accepted'
		})

		let invitation3 = new TeamInvitation({
			cuid: 'cj7f1uqb5000504vcalgg2t0h',
			senderID: 'cj7f1rvc7000304vcxsfj8j01',
			receiverID: 'cj7f1qr20000104vc72o01zqd'
		})

		let invitation4 = new TeamInvitation({
			cuid: 'cj7f1uu99000604vcvsmhl0tu',
			senderID: 'cj7esmyoy000a0405duv2v5hz',
			receiverID: 'cj7f1qr20000104vc72o01zqd'
		})

		TeamInvitation.collection.insert([invitation1, invitation2, invitation3, invitation4], (error) => {
			if (error) {
				console.log('Couldnt create dummy Team Comment data')
			}
		})
	})
}

function addCourseInformation() {
	Course.count().exec( (err, count) => {
		if (count > 0 ) {
			return 
		}

		let date = new Date()
		date.setMonth(date.getMonth() + 5)

		let course = new Course({
			cuid: 'cj7f9litc0000040rzzxkj15o',
			courseInfo: 'Info about this course',
			assessmentInfo: 'Info about assessment',
			examInfo: 'Info about exam',
			endDate: date
		})

		Course.collection.insert(course, (error) => {
			if (error) {
				console.log('Couldnt create dummy Course data')
			}
		})
	})
}

function addCourseAnnouncements() {
	CourseAnnouncement.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let announcement1 = new CourseAnnouncement({
			cuid: 'cj7f9m6yb0001040r53klo0cz',
			text: 'Announcement 1'
		})

		let announcement2 = new CourseAnnouncement({
			cuid: 'cj7f9ms1l0002040r96vbmo85',
			text: 'Announcement 2'
		})

		CourseAnnouncement.collection.insert([announcement1, announcement2], (error) => {
			if (error) {
				console.log('Couldnt create dummy Course Announcement data')
			}
		})
	})
}

function addCourseFeedbacks() {
	CourseFeedback.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let feedback1 = new CourseFeedback({
			cuid: 'cj7f9p2t90003040rv6u5yxf9',
			authorID: 'cj7d7kob70001041a33i0ucr6',
			text: 'Feedback 1 text',
			rating: 5
		})

		let feedback2 = new CourseFeedback({
			cuid: 'cj7f9pviw0004040rydae1d4u',
			authorID: 'cj7esmyoy000a0405duv2v5hz',
			text: 'Feedback 2 text',
			rating: 3
		})

		CourseFeedback.collection.insert([feedback1, feedback2], (error) => {
			if (error) {
				console.log('Couldnt create dummy Course Feedback data')
			}
		})
	})
}





