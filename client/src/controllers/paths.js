const serverURL = 'http://localhost:3000/'

const paths = {
	signin: '/signin',
	course: '/course',
	courseAnnouncements: '/course/announcements',
	courseFeedbacks: '/course/feedbacks',
	forumTopics: '/forum-topics',
	forumMostReplies: '/forum-stats/most-replies',
	forumMostTutorials: '/forum-stats/most-tutorials',
	forumMostMarkedAnswers: '/forum-stats/most-marked-answers',
	quests: '/quests',
	leaderboard: '/leaderboard',
	teams: '/teams',
	teamInvitations: '/team-invitations',
	users: '/users'
}

for (let path in paths) {
	paths[path] = serverURL + path
}

export default paths