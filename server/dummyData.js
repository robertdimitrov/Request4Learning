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
const ForumTopic = require('./models/forumTopic')
const ForumTopicReply = require('./models/forumTopicReply')
const ForumTopicReplyLike = require('./models/forumTopicReplyLike')
const ForumPollOption = require('./models/forumPollOption')
const ForumPollAnswer = require('./models/forumPollAnswer')
const Quest = require('./models/quest')
const QuestProgress = require('./models/questProgress')

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
	addForumTopics()
	addForumTopicReplies()
	addForumTopicReplyLikes()
	addForumPollOptions()
	addForumPollAnswers()
	addQuests()
	addQuestProgress()
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


function addForumTopics() {
	ForumTopic.count().exec ( (err, count) => {
		if (count > 0) {
			return 
		}

		let topic1 = new ForumTopic({
			cuid: 'cj7gidv78000004z8w69d84ve',
			type: 'discussion',
			title: 'Title Forum Topic 1',
			authorID: 'cj7d7kob70001041a33i0ucr6'
		})

		let topic2 = new ForumTopic({
			cuid: 'cj7gihkpv000104z8w9voemlx',
			type: 'question',
			title: 'Title Forum Topic 2',
			authorID: 'cj7d7mgcj0002041aztfgmx0k'
		})

		let topic3 = new ForumTopic({
			cuid: 'cj7gihnoo000204z8uiht8rml',
			type: 'tutorial',
			title: 'Title Forum Topic 3',
			authorID: 'cj7d7kob70001041a33i0ucr6'
		})

		let topic4 = new ForumTopic({
			cuid: 'cj7gihqqz000304z8w1rz912k',
			type: 'poll',
			title: 'Title Forum Topic 4',
			authorID: 'cj7f1rqgc000204vcojg8pzb7'
		})

		ForumTopic.collection.insert([topic1, topic2, topic3, topic4], (error) => {
			if (error) {
				console.log('Couldnt create dummy Forum Topic data')
			}
		})
	})
}

function addForumTopicReplies() {
	ForumTopicReply.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let reply1 = new ForumTopicReply({
			cuid: 'cj7giq326000404z8lzvtr1cn',
			topicID: 'cj7gidv78000004z8w69d84ve',
			authorID: 'cj7d7kob70001041a33i0ucr6',
			text: 'Init Reply for Topic 1'
		})

		let reply2 = new ForumTopicReply({
			cuid: 'cj7giq83z000504z849tvrstw',
			topicID: 'cj7gihkpv000104z8w9voemlx',
			authorID: 'cj7d7mgcj0002041aztfgmx0k',
			text: 'Init Reply for Topic 2'
		})

		let reply3 = new ForumTopicReply({
			cuid: 'cj7giqbpq000604z8bqs38kwq',
			topicID: 'cj7gihnoo000204z8uiht8rml',
			authorID: 'cj7d7kob70001041a33i0ucr6',
			text: 'Init Reply for Topic 3'
		})

		let reply4 = new ForumTopicReply({
			cuid: 'cj7giqhf4000704z8rse66m70',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			authorID: 'cj7f1rqgc000204vcojg8pzb7',
			text: 'Init Reply for Topic 4'
		})

		let reply5 = new ForumTopicReply({
			cuid: 'cj7giqllx000804z8o2y81mvt',
			topicID: 'cj7gidv78000004z8w69d84ve',
			authorID: 'cj7d7mgcj0002041aztfgmx0k',
			text: 'Some other reply for Topic 1',
			isTeacherApproved: true,
			isAuthorApproved: true
		})

		ForumTopicReply.collection.insert([reply1, reply2, reply3, reply4, reply5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Forum Topic Reply data')
			}
		})
	})
}

function addForumTopicReplyLikes() {
	ForumTopicReplyLike.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let like1 = new ForumTopicReplyLike({
			cuid: 'cj7givppq000904z8yjcr0dpd',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			replyID: 'cj7giqhf4000704z8rse66m70',
			authorID: 'cj7d7mgcj0002041aztfgmx0k'
		})

		let like2 = new ForumTopicReplyLike({
			cuid: 'cj7giwhlg000a04z8kepzmcbs',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			replyID: 'cj7giqhf4000704z8rse66m70',
			authorID: 'cj7f1rqgc000204vcojg8pzb7'
		})

		let like3 = new ForumTopicReplyLike({
			cuid: 'cj7gix2uq000b04z88kzvzpos',
			topicID: 'cj7gihkpv000104z8w9voemlx',
			replyID: 'cj7giq83z000504z849tvrstw',
			authorID: 'cj7f1rqgc000204vcojg8pzb7'
		})

		ForumTopicReplyLike.collection.insert([like1, like2, like3], (err) => {
			if (err) {
				console.log('Couldnt create dummy Forum Topic Reply Like data')
			}
		})
	})
}


function addForumPollOptions() {
	ForumPollOption.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let option1 = new ForumPollOption({
			cuid: 'cj7gj1zqs000c04z86v05izvn',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			text: 'Yes'
		})

		let option2 = new ForumPollOption({
			cuid: 'cj7gj2318000d04z8id9ir0oi',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			text: 'No'
		})

		ForumPollOption.collection.insert([option1, option2], (err) => {
			if (err) {
				console.log('Couldnt create dummy Forum Poll Option data')
			}
		})
	})
}

function addForumPollAnswers() {
	ForumPollAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let answer1 = new ForumPollAnswer({
			cuid: 'cj7gj4vuc000e04z8squpw766',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			authorID: 'cj7d7kob70001041a33i0ucr6',
			optionID: 'cj7gj1zqs000c04z86v05izvn'
		})

		let answer2 = new ForumPollAnswer({
			cuid: 'cj7gj5d0l000f04z8msiw7x5f',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			authorID: 'cj7d7mgcj0002041aztfgmx0k',
			optionID: 'cj7gj1zqs000c04z86v05izvn'
		})

		let answer3 = new ForumPollAnswer({
			cuid: 'cj7gj5u80000g04z8t9i9gamo',
			topicID: 'cj7gihqqz000304z8w1rz912k',
			authorID: 'cj7f1rvc7000304vcxsfj8j01',
			optionID: 'cj7gj2318000d04z8id9ir0oi'
		})

		ForumPollAnswer.collection.insert([answer1, answer2, answer3], (err) => {
			if (err) {
				console.log('Couldnt create dummy Forum Poll Answer data')
			}
		})
	})
}

function addQuests() {
	Quest.count().exec( (err, count) => {
		if (count > 0) { 
			return
		}

		let date = new Date()

		let quest1 = new Quest({
			cuid: 'cj7kvmnws000304xfymng6rnz',
			name: 'Simple Quest',
			type: 'simple',
			description: 'Simple Quest Description',
			criteria: 'Simple Quest Criteria',
			resources: 'Simple Quest Resources',
			maxPoints: 10,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 7),
			isMandatory: true 
		})

		let quest2 = new Quest({
			cuid: 'cj7kw5m87000404xfe2abb0nj',
			name: 'Pick The Winner Quest',
			type: 'pickTheWinner',
			description: 'Pick The Winner Quest Description',
			criteria: 'Pick The Winner  Quest Criteria',
			resources: 'Pick The Winner  Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 7),
			isMandatory: false 
		})

		let quest3 = new Quest({
			cuid: 'cj7kw6vlu000504xfhmfkdfzs',
			name: 'Jigsaw Quest',
			type: 'jigsaw',
			description: 'Jigsaw Quest Description',
			criteria: 'Jigsaw Quest Criteria',
			resources: 'Jigsaw Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 7),
			isMandatory: true 
		})

		let quest4 = new Quest({
			cuid: 'cj7kw7j0p000604xfo36k2p82',
			name: 'Token Quest',
			type: 'token',
			description: 'Token Quest Description',
			criteria: 'Token Quest Criteria',
			resources: 'Token Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 7),
			isMandatory: false 
		})

		let quest5 = new Quest({
			cuid: 'cj7kw88gv000704xf6igxgchs',
			name: 'Empty Outlines Quest',
			type: 'emptyOutlines',
			description: 'Empty Outlines Quest Description',
			criteria: 'Empty Outlines Quest Criteria',
			resources: 'Empty Outlines Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 1),
			isMandatory: true 
		})

		let quest6 = new Quest({
			cuid: 'cj7kw8zix000804xflu11ldej',
			name: 'Quiz Quest',
			type: 'quiz',
			description: 'Quiz Quest Description',
			criteria: 'Quiz Quest Criteria',
			resources: 'Quiz Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 1),
			isMandatory: true 
		})

		let quest7 = new Quest({
			cuid: 'cj7kw9lwo000904xfyk8crcu9',
			name: 'Riddle Quest',
			type: 'riddle',
			description: 'Riddle Quest Description',
			criteria: 'Riddle Quest Criteria',
			resources: 'Riddle Quest Resources',
			maxPoints: 10,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 7),
			isMandatory: true 
		})

		let quest8 = new Quest({
			cuid: 'cj7kwbavf000a04xfpgviaxtv',
			name: 'Order Quest',
			type: 'order',
			description: 'Order Quest Description',
			criteria: 'Order Quest Criteria',
			resources: 'Order Quest Resources',
			maxPoints: 5,
			startDate: date.setDate(date.getDate() + 1),
			dueDate: date.setDate(date.getDate() + 1),
			isMandatory: true 
		})

		Quest.collection.insert([quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8], (err) => {
			if (err) {
				console.log('Couldnt create dummy Quest data')
			}
		})
	})
}

function addQuestProgress() {
	QuestProgress.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let date = new Date()

		let questProgress1 = new QuestProgress({
			cuid: 'cj7kx13zi000b04xfg3oroa06',
			questID: 'cj7kvmnws000304xfymng6rnz',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			dateStarted: date.setDate(date.getDate() + 1),
			dateFinished: date.setDate(date.getDate() + 2),
			points: 5
		})

		let questProgress2 = new QuestProgress({
			cuid: 'cj7kx2rw4000c04xfsv29q1zi',
			questID: 'cj7kvmnws000304xfymng6rnz',
			teamID: 'cj7erlg3100030405hxwx56c3',
			dateStarted: date.setDate(date.getDate() + 1)
		})

		QuestProgress.collection.insert([questProgress1, questProgress2], (err) => {
			if (err) {
				console.log('Couldnt create dummy Quest data')
			}
		})
	}) 
}