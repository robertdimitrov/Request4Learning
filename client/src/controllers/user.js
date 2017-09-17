import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'

class UserController {
	getUsers() {
		return prepareRequest(Request.get(paths.users))
	}

	getUser(userID) {
		return prepareRequest(Request.get(paths.teams + '/' + userID))
	}

	updateUser(userID, user) {
		return prepareRequest(Request.patch(paths.teams + '/' + userID).send({ characterAssetName: user.characterAssetName, publicName: user.publicName }))
	}

	updateAvatar(userID, avatar) {
		return prepareRequest(Request.patch(paths.teams + '/' + userID + '/avatar').send({ avatar }))
	}

	getUserNotifications() {
		return prepareRequest(Request.get(paths.userNotifications))
	}

	updateUserNotification(notificationID) {
		return prepareRequest(Request.patch(paths.userNotifications + '/' + notificationID))
	}
}

export default UserController