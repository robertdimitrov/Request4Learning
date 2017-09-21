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
const PublicQuest = require('./models/publicQuest')
const PublicQuestAssessment = require('./models/publicQuestAssessment')
const JigsawQuestResource = require('./models/jigsawQuestResource')
const TokenQuestTeamWork = require('./models/tokenQuestTeamWork')
const EmptyOutlinesQuest = require('./models/emptyOutlinesQuest')
const EmptyOutlinesQuestRightAnswer = require('./models/emptyOutlinesQuestRightAnswer')
const EmptyOutlinesQuestUserAnswer = require('./models/emptyOutlinesQuestUserAnswer')
const QuizQuestQuestion = require('./models/quizQuestQuestion')
const QuizQuestRightAnswer = require('./models/quizQuestRightAnswer')
const QuizQuestUserAnswer = require('./models/quizQuestUserAnswer')
const RiddleQuest = require('./models/riddleQuest')
const RiddleQuestTeamAnswer = require('./models/riddleQuestTeamAnswer')
const OrderQuestPiece = require('./models/orderQuestPiece')
const OrderQuestUserAnswer = require('./models/orderQuestUserAnswer')
const PublicQuestSolution = require('./models/publicQuestSolution')

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
	addQuestTypes()
	addPublicQuestAssessments()
	addEmptyOutlinesQuestUserAnswers()
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
			type: 'student',
			teamID: 'cj7erlg3100030405hxwx56c3'
		})

		let user5 = new User({
			cuid: 'cj7f1rqgc000204vcojg8pzb7',
			username: 'userB',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student',
			teamID: 'cj7kxpkof000f04xf54f4f0k2'
		})

		let user6 = new User({
			cuid: 'cj7f1rvc7000304vcxsfj8j01',
			username: 'userC',
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student',
			teamID: 'cj7kxpkof000f04xf54f4f0k2'
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
			motto: 'Astronaut',
			avatarAssetName: 'team-1.png'
		})

		let team2 = new Team({
			cuid: 'cj7erlg3100030405hxwx56c3',
			name: 'Gruppe A',
			motto: 'Motto',
			avatarAssetName: 'team-2.png'
		})

		let team3 = new Team({
			cuid: 'cj7kxpkof000f04xf54f4f0k2',
			name: 'Team 3',
			motto: 'Motto Team 3',
			avatarAssetName: 'team-3.png'
		})

		Team.collection.insert([team1, team2, team3], (error) => {
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

		let questProgress3 = new QuestProgress({
			cuid: 'cj7l04sd0001c04xfqp1s0v5u',
			questID: 'cj7kw6vlu000504xfhmfkdfzs',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			dateStarted: date.setDate(date.getDate() + 1),
			dateFinished: date.setDate(date.getDate() + 2),
			points: 2
		})

		let questProgress4 = new QuestProgress({
			cuid: 'cj7logq3g000204266ox2kjex',
			questID: 'cj7kvmnws000304xfymng6rnz',
			teamID: 'cj7kxpkof000f04xf54f4f0k2',
			dateStarted: date.setDate(date.getDate() + 1),
			dateFinished: date.setDate(date.getDate() + 2),
			points: 6
		})

		QuestProgress.collection.insert([questProgress1, questProgress2, questProgress3, questProgress4], (err) => {
			if (err) {
				console.log('Couldnt create dummy Quest data')
			}
		})
	}) 
}

function addQuestTypes() {
	PublicQuest.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let date = new Date()

		let publicQuest1 = new PublicQuest({
			cuid: 'cj7kxynbd000g04xfikqs7p2s',
			questID: 'cj7kvmnws000304xfymng6rnz',
			assessmentUntil: date.setDate(date.getDate() + 21)	
		})

		let publicQuest2 = new PublicQuest({
			cuid: 'cj7kxz5vp000h04xf8dbhx6d2',
			questID: 'cj7kw5m87000404xfe2abb0nj',
			assessmentUntil: date.setDate(date.getDate() + 7)	
		})

		let publicQuest3 = new PublicQuest({
			cuid: 'cj7kxzjew000i04xfryljpl5p',
			questID: 'cj7kw6vlu000504xfhmfkdfzs',
			assessmentUntil: date.setDate(date.getDate() + 7)	
		})

		let publicQuest4 = new PublicQuest({
			cuid: 'cj7ky13hv000j04xf4zy7zl4a',
			questID: 'cj7kw7j0p000604xfo36k2p82',
			assessmentUntil: date.setDate(date.getDate() + 7)	
		})

		PublicQuest.collection.insert([publicQuest1, publicQuest2, publicQuest3, publicQuest4], (err) => {
			if (err) {
				console.log('Couldnt create dummy Public Quest data')
			}
		})
	})

	JigsawQuestResource.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let resource = new JigsawQuestResource({
			cuid: 'cj7kzdrn7001b04xfamzh0vve',
			questID: 'cj7kw6vlu000504xfhmfkdfzs',
			text: 'Some text that needs to be summarized',
			teamID: 'cj7erkxk6000104057wc8ba0o'
		})

		JigsawQuestResource.collection.insert([resource], (err) => {
			if (err) {
				console.log('Couldnt create dummy Public Quest data')
			}
		})
	})

	PublicQuestSolution.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let tokenQuestProgressTeam1 = new PublicQuestSolution({
			cuid: 'cj7ll0n0c0002041mwuznnp54',
			questID: 'cj7kw7j0p000604xfo36k2p82',
			text: 'The contribution of Team A',
			teamID: 'cj7erlg3100030405hxwx56c3'
		})

		let tokenQuestProgressTeam2 = new PublicQuestSolution({
			cuid: 'cj7ll1q7l0003041mv2kdd8nf',
			questID: 'cj7kw7j0p000604xfo36k2p82',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			teamID: 'cj7kxpkof000f04xf54f4f0k2'
		})

		let singleQuestSolution1 = new PublicQuestSolution({
			cuid: 'cj7ma1xq7000004uysn3nzox3',
			questID: 'cj7kvmnws000304xfymng6rnz',
			fileName: 'questSolution1.pdf',
			teamID: 'cj7erkxk6000104057wc8ba0o'
		})

		let singleQuestSolution2 = new PublicQuestSolution({
			cuid: 'cj7mfvpjy000004x63dgxun3z',
			questID: 'cj7kvmnws000304xfymng6rnz',
			fileName: 'questSolution2.pdf',
			teamID: 'cj7erlg3100030405hxwx56c3'
		})

		PublicQuestSolution.collection.insert([tokenQuestProgressTeam1, tokenQuestProgressTeam2, singleQuestSolution1, singleQuestSolution2], (err) => {
			if (err) {
				console.log('Couldnt create dummy Public Quest Solution data')
			}
		})
	})

	TokenQuestTeamWork.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let date = new Date()

		let tokenQuestWork = new TokenQuestTeamWork({
			cuid: 'cj7lkkn570001041mf3bjh5f7',
			questID: 'cj7kw7j0p000604xfo36k2p82',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			startDate: date,
			endDate: date.setDate(date.getDate() + 1)
		})

		TokenQuestTeamWork.collection.insert(tokenQuestWork, (err) => {
			if (err) {
				console.log('Couldnt create dummy Token Quest Team Work data')
			}
		})
	})

	EmptyOutlinesQuest.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let emptyOutlinesQuest = new EmptyOutlinesQuest({
			cuid: 'cj7ky43bv000k04xfy2k89t1t',
			questID: 'cj7kw88gv000704xf6igxgchs',
			text: 'Some text with (1) some empty spaces. The students (2) have to (3) find the right (4) words behind the (5) fields'
		})

		emptyOutlinesQuest.collection.insert([emptyOutlinesQuest], (err) => {
			if (err) {
				console.log('Couldnt create dummy Empty Outlines Quest data')
			}
		})
	})

	EmptyOutlinesQuestRightAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return 
		}

		let emptyOutlinesAnswer1 = new EmptyOutlinesQuestRightAnswer({
			cuid: 'cj7llkfcf0004041m94dtxtz0',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: '(1)',
			answer: 'Answer 1'
		})

		let emptyOutlinesAnswer2 = new EmptyOutlinesQuestRightAnswer({
			cuid: 'cj7lllxze0005041m299806nf',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: '(2)',
			answer: 'Answer 2'
		})

		let emptyOutlinesAnswer3 = new EmptyOutlinesQuestRightAnswer({
			cuid: 'cj7llm2j60006041mg1sky5gf',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: '(3)',
			answer: 'Answer 3'
		})

		let emptyOutlinesAnswer4 = new EmptyOutlinesQuestRightAnswer({
			cuid: 'cj7llm69y0007041mztz4qdqf',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: '(4)',
			answer: 'Answer 4'
		})

		let emptyOutlinesAnswer5 = new EmptyOutlinesQuestRightAnswer({
			cuid: 'cj7llmbjw0008041m99s2bb7u',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: '(5)',
			answer: 'Answer 5'
		})

		EmptyOutlinesQuestRightAnswer.collection.insert([emptyOutlinesAnswer1, emptyOutlinesAnswer2, emptyOutlinesAnswer3, emptyOutlinesAnswer4, emptyOutlinesAnswer5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Empty Outlines Right Answer data')
			}
		})
	})

	QuizQuestQuestion.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let question1 = new QuizQuestQuestion({
			cuid: 'cj7ky9j3o000l04xfzyrcenjl',
			questID: 'cj7kw8zix000804xflu11ldej',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
		})

		let question2 = new QuizQuestQuestion({
			cuid: 'cj7kyaajk000m04xfguhwc0fe',
			questID: 'cj7kw8zix000804xflu11ldej',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
		})

		let question3 = new QuizQuestQuestion({
			cuid: 'cj7kyaddj000n04xfd2hxhaak',
			questID: 'cj7kw8zix000804xflu11ldej',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
		})

		let question4 = new QuizQuestQuestion({
			cuid: 'cj7kyagea000o04xf906mx2n8',
			questID: 'cj7kw8zix000804xflu11ldej',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
		})

		let question5 = new QuizQuestQuestion({
			cuid: 'cj7kyajld000p04xfqm2ql2wz',
			questID: 'cj7kw8zix000804xflu11ldej',
			question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?'
		})

		QuizQuestQuestion.collection.insert([question1, question2, question3, question4, question5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Quiz Question data')
			}
		})
	})

	QuizQuestRightAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let answer1 = new QuizQuestRightAnswer({ cuid: 'cj7kz49wy000w04xf5v3edqos', questionID: 'cj7ky9j3o000l04xfzyrcenjl', answer: 'Answer 1', isCorrect: true })
		let answer2 = new QuizQuestRightAnswer({ cuid: 'cj7kz4dc1000x04xfd7p60x0e', questionID: 'cj7ky9j3o000l04xfzyrcenjl', answer: 'Answer 2', isCorrect: false })
		let answer3 = new QuizQuestRightAnswer({ cuid: 'cj7kz4gpz000y04xf2vac9aiv', questionID: 'cj7ky9j3o000l04xfzyrcenjl', answer: 'Answer 3', isCorrect: false })

		let answer4 = new QuizQuestRightAnswer({ cuid: 'cj7kz5epq000z04xf3np3u28n', questionID: 'cj7kyaajk000m04xfguhwc0fe', answer: 'Answer 1', isCorrect: true })
		let answer5 = new QuizQuestRightAnswer({ cuid: 'cj7kz5isz001004xfv6empkjo', questionID: 'cj7kyaajk000m04xfguhwc0fe', answer: 'Answer 2', isCorrect: false })
		let answer6 = new QuizQuestRightAnswer({ cuid: 'cj7kz5mzq001104xf5h3lim1c', questionID: 'cj7kyaajk000m04xfguhwc0fe', answer: 'Answer 3', isCorrect: false })

		let answer7 = new QuizQuestRightAnswer({ cuid: 'cj7kz5q9w001204xfokw021uq', questionID: 'cj7kyaddj000n04xfd2hxhaak', answer: 'Answer 1', isCorrect: true })
		let answer8 = new QuizQuestRightAnswer({ cuid: 'cj7kz5t88001304xf1n7hdthi', questionID: 'cj7kyaddj000n04xfd2hxhaak', answer: 'Answer 2', isCorrect: false })
		let answer9 = new QuizQuestRightAnswer({ cuid: 'cj7kz5vtn001404xf79vh3ryf', questionID: 'cj7kyaddj000n04xfd2hxhaak', answer: 'Answer 3', isCorrect: false })

		let answer10 = new QuizQuestRightAnswer({ cuid: 'cj7kz6011001504xfn069srbz', questionID: 'cj7kyagea000o04xf906mx2n8', answer: 'Answer 1', isCorrect: true })
		let answer11 = new QuizQuestRightAnswer({ cuid: 'cj7kz639m001604xfsh6rpf5i', questionID: 'cj7kyagea000o04xf906mx2n8', answer: 'Answer 2', isCorrect: false })
		let answer12 = new QuizQuestRightAnswer({ cuid: 'cj7kz660m001704xfeeu8gwb8', questionID: 'cj7kyagea000o04xf906mx2n8', answer: 'Answer 3', isCorrect: false })

		let answer13 = new QuizQuestRightAnswer({ cuid: 'cj7kz6aeu001804xf65kefdd5', questionID: 'cj7kyajld000p04xfqm2ql2wz', answer: 'Answer 1', isCorrect: true })
		let answer14 = new QuizQuestRightAnswer({ cuid: 'cj7kz6d5r001904xflyudxhxm', questionID: 'cj7kyajld000p04xfqm2ql2wz', answer: 'Answer 2', isCorrect: false })
		let answer15 = new QuizQuestRightAnswer({ cuid: 'cj7kz6g6e001a04xfierpthcz', questionID: 'cj7kyajld000p04xfqm2ql2wz', answer: 'Answer 3', isCorrect: false })

		QuizQuestRightAnswer.collection.insert([answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10, answer11, answer12, answer13, answer14, answer15],
			(err) => {
				if (err) {
					console.log('Couldnt create dummy Quiz Answers data')
				}
			})
	})

	QuizQuestUserAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let userAnswer1 = new QuizQuestUserAnswer({
			cuid: 'cj7mbxyif000004tibiffkm5c',
			questionID: 'cj7ky9j3o000l04xfzyrcenjl',
			answerID: 'cj7kz49wy000w04xf5v3edqos',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userAnswer2 = new QuizQuestUserAnswer({
			cuid: 'cj7mby5dg000104ti7xu25r8a',
			questionID: 'cj7kyaajk000m04xfguhwc0fe',
			answerID: 'cj7kz5isz001004xfv6empkjo',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userAnswer3 = new QuizQuestUserAnswer({
			cuid: 'cj7mbyaij000204tiplfqjhj8',
			questionID: 'cj7kyaddj000n04xfd2hxhaak',
			answerID: 'cj7kz5t88001304xf1n7hdthi',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userAnswer4 = new QuizQuestUserAnswer({
			cuid: 'cj7mbye5j000304tip8a8w7ff',
			questionID: 'cj7kyagea000o04xf906mx2n8',
			answerID: 'cj7kz6011001504xfn069srbz',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let userAnswer5 = new QuizQuestUserAnswer({
			cuid: 'cj7mbyhqt000404tis4xb89re',
			questionID: 'cj7kyajld000p04xfqm2ql2wz',
			answerID: 'cj7kz6aeu001804xf65kefdd5',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		QuizQuestUserAnswer.collection.insert([userAnswer1, userAnswer2, userAnswer3, userAnswer4, userAnswer5],  (err) => {
			if (err) {
				console.log('Couldnt create dummy Quiz User Answer data')
			}
		})
	})

	RiddleQuest.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let riddle = new RiddleQuest({
			cuid: 'cj7kydct0000q04xf595pfy61',
			questID: 'cj7kw9lwo000904xfyk8crcu9',
			rightAnswer: 'riddle'
		})

		RiddleQuest.collection.insert([riddle], (err) => {
			if (err) {
				console.log('Couldnt create dummy Riddle Quest data')
			}
		})
	})

	RiddleQuestTeamAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let riddleAnswer1 = new RiddleQuestTeamAnswer({
			cuid: 'cj7md08tk000504tiquora8oj',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			riddleID: 'cj7kydct0000q04xf595pfy61',
			answer: 'first answer'
		})

		let riddleAnswer2 = new RiddleQuestTeamAnswer({
			cuid: 'cj7md117j000604tilb1o00zx',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			riddleID: 'cj7kydct0000q04xf595pfy61',
			answer: 'second answer'
		})

		let riddleAnswer3 = new RiddleQuestTeamAnswer({
			cuid: 'cj7md1443000704timrcmq29o',
			teamID: 'cj7erkxk6000104057wc8ba0o',
			riddleID: 'cj7kydct0000q04xf595pfy61',
			answer: 'riddle'
		})

		RiddleQuestTeamAnswer.collection.insert([riddleAnswer1, riddleAnswer2, riddleAnswer3], (err) => {
			if (err) {
				console.log('Couldnt create dummy Riddle Quest Team Answer data')
			}
		})
	})

	OrderQuestPiece.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let piece1 = new OrderQuestPiece({
			cuid: 'cj7kygaho000r04xfqn5e0w6f',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			position: 1,
			content: 'Single Responsibility'
		})

		let piece2 = new OrderQuestPiece({
			cuid: 'cj7kyxwf4000s04xf2quzuma5',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			position: 2,
			content: 'Open closed'
		})

		let piece3 = new OrderQuestPiece({
			cuid: 'cj7kyy00r000t04xfgmncuzue',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			position: 3,
			content: 'Liskov substitution'
		})

		let piece4 = new OrderQuestPiece({
			cuid: 'cj7kyy36p000u04xfqmsa2ikw',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			position: 4,
			content: 'Interface segregation'
		})

		let piece5 = new OrderQuestPiece({
			cuid: 'cj7kyy669000v04xfd9pa77cf',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			position: 5,
			content: 'Dependency inversion'
		})

		OrderQuestPiece.collection.insert([piece1, piece2, piece3, piece4, piece5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Order Quest data')
			}
		})
	})

	OrderQuestUserAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let userAnswer1 = new OrderQuestUserAnswer({
			cuid: 'cj7mdngcc000804tiqdsk4f0c',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			pieceID: 'cj7kygaho000r04xfqn5e0w6f',
			userID: 'cj7d7kob70001041a33i0ucr6',
			position: 1
		})

		let userAnswer2 = new OrderQuestUserAnswer({
			cuid: 'cj7mdnu29000904tihyamklzi',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			pieceID: 'cj7kyxwf4000s04xf2quzuma5',
			userID: 'cj7d7kob70001041a33i0ucr6',
			position: 2
		})

		let userAnswer3 = new OrderQuestUserAnswer({
			cuid: 'cj7mdnxm6000a04tiqbh0kxmg',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			pieceID: 'cj7kyy00r000t04xfgmncuzue',
			userID: 'cj7d7kob70001041a33i0ucr6',
			position: 3
		})

		let userAnswer4 = new OrderQuestUserAnswer({
			cuid: 'cj7mdo0hw000b04tim7ztzslq',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			pieceID: 'cj7kyy669000v04xfd9pa77cf',
			userID: 'cj7d7kob70001041a33i0ucr6',
			position: 4
		})

		let userAnswer5 = new OrderQuestUserAnswer({
			cuid: 'cj7mdo3lu000c04ti5ttxzlfn',
			questID: 'cj7kwbavf000a04xfpgviaxtv',
			pieceID: 'cj7kyy36p000u04xfqmsa2ikw',
			userID: 'cj7d7kob70001041a33i0ucr6',
			position: 5
		})

		OrderQuestUserAnswer.collection.insert([userAnswer1, userAnswer2, userAnswer3, userAnswer4, userAnswer5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Order Quest User Answer data')
			}
		})
	})
}

function addPublicQuestAssessments() {
	PublicQuestAssessment.count().exec( (err, count) => {
		if (count > 0 ) {
			return
		}
		
		let assessment1 = new PublicQuestAssessment({
			cuid: 'cj7ma7807000104uyfnl1j7qu',
			solutionID: 'cj7ma1xq7000004uysn3nzox3',
			userID: 'cj7f1rqgc000204vcojg8pzb7',
			points: 9,
			comment: 'Some comment about this solution'
		})

		let assessment2 = new PublicQuestAssessment({
			cuid: 'cj7ma8sb5000204uy2lfroijf',
			solutionID: 'cj7ma1xq7000004uysn3nzox3',
			userID: 'cj7f1rvc7000304vcxsfj8j01',
			points: 5,
			comment: 'Another opinion about this solution'
		})

		PublicQuestAssessment.collection.insert([assessment1, assessment2], (err) => {
			if (err) {
				console.log('Couldnt create dummy Public Quest Assessment data')
			}
		})
	})
}

function addEmptyOutlinesQuestUserAnswers() {
	EmptyOutlinesQuestUserAnswer.count().exec( (err, count) => {
		if (count > 0) {
			return
		}

		let answer1 = new EmptyOutlinesQuestUserAnswer({
			cuid: 'cj7mamu3q000304uym0qeoci4',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: 'cj7llkfcf0004041m94dtxtz0',
			answer: 'User Answer 1',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let answer2 = new EmptyOutlinesQuestUserAnswer({
			cuid: 'cj7mamu3q000304uym0qeoci4',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: 'cj7lllxze0005041m299806nf',
			answer: 'Answer 2',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let answer3 = new EmptyOutlinesQuestUserAnswer({
			cuid: 'cj7mamu3q000304uym0qeoci4',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: 'cj7llm2j60006041mg1sky5gf',
			answer: 'Answer 3',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let answer4 = new EmptyOutlinesQuestUserAnswer({
			cuid: 'cj7mamu3q000304uym0qeoci4',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: 'cj7llm69y0007041mztz4qdqf',
			answer: 'Answer 4',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		let answer5 = new EmptyOutlinesQuestUserAnswer({
			cuid: 'cj7mamu3q000304uym0qeoci4',
			emptyOutlinesQuestID: 'cj7ky43bv000k04xfy2k89t1t',
			field: 'cj7llmbjw0008041m99s2bb7u',
			answer: 'User Answer 5',
			userID: 'cj7d7kob70001041a33i0ucr6'
		})

		EmptyOutlinesQuestUserAnswer.collection.insert([answer1, answer2, answer3, answer4, answer5], (err) => {
			if (err) {
				console.log('Couldnt create dummy Public Quest Assessment data')
			}
		})
	})
}