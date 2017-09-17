import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'


class ForumController {
	getForumTopics() {
		return prepareRequest(Request.get(paths.forumTopics))
	}

	createForumTopic(title, type) {
		return prepareRequest(Request.post(paths.forumTopics).send({title, type}))
	}

	getForumTopic(topicID) {
		return prepareRequest(Request.get(paths.forumTopics + '/' + topicID))
	}

	deleteForumTopic(topicID) {
		return prepareRequest(Request.delete(paths.forumTopics + '/' + topicID))
	}

	getForumTopicReplies(topicID) {
		return prepareRequest(Request.get(paths.forumTopics + '/' + topicID + '/replies'))
	}

	createForumTopicReply(topicID, text) {
		return prepareRequest(Request.post(paths.forumTopics + '/' + topicID + '/replies').send({ text }))
	}

	deleteForumTopicReply(topicID, replyID) {
		return prepareRequest(Request.delete(paths.forumTopics + '/' + topicID + '/replies/' + replyID))
	}

	updateForumTopicReply(topicID, replyID, isAuthorApproved) {
		return prepareRequest(Request.patch(paths.forumTopics + '/' + topicID + '/replies/' + replyID).send({isAuthorApproved}))
	}

	getForumTopicReplyLikes(topicID, replyID) {
		return prepareRequest(Request.get(paths.forumTopics + '/' + topicID + '/replies/' + replyID))
	}

	createForumTopicReplyLike(topicID, replyID) {
		return prepareRequest(Request.post(paths.forumTopics + '/' + topicID + '/replies/' + replyID + '/likes'))
	}

	deleteForumTopicReplyLike(topicID, replyID, likeID) {
		return prepareRequest(Request.delete(paths.forumTopics + '/' + topicID + '/replies/' + replyID + '/likes/' + likeID))
	}

	getForumPollOptions(topicID) {
		return prepareRequest(Request.get(paths.forumTopics + '/' + topicID + '/poll-options'))
	}

	createForumPollOptions(topicID, options) {
		return prepareRequest(Request.post(paths.forumTopics + '/' + topicID + '/poll-options').send({ options }))
	}

	getForumPollAnswers(topicID) {
		return prepareRequest(Request.get(paths.forumTopics + '/' + topicID + '/poll-answers'))
	}

	createForumPollanswer(topicID, optionID) {
		return prepareRequest(Request.post(paths.forumTopics + '/' + topicID + '/poll-answers').send({ optionID }))
	}

	getUsersWithMostReplies() {
		return prepareRequest(Request.get(paths.forumMostReplies))
	}

	getUsersWithMostTutorials() {
		return prepareRequest(Request.get(paths.forumMostTutorials))
	}

	getUsersWithMostMarkedAnswers() {
		return prepareRequest(Request.get(paths.forumMostMarkedAnswers))
	}
}

export default ForumController