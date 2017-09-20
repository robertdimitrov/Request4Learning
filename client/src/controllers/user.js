import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'
import AuthenticationController from './authentication'

class UserController {
	constructor() {
		this.authenticationController = new AuthenticationController()
		this.user = this.authenticationController.decodeUser()
	}

	getUsers() {
		return prepareRequest(Request.get(paths.users))
	}

	getUser(userID) {
		return prepareRequest(Request.get(paths.users + '/' + userID))
	}

	updateUser(userID, user) {
		return prepareRequest(Request.patch(paths.users + '/' + this.user.id).send({ characterAssetName: user.characterAssetName, publicName: user.publicName }))
	}

	updateAvatar(userID, avatar) {
		return prepareRequest(Request.patch(paths.users + '/' + this.user.id + '/avatar').send({ avatar }))
	}

	getUserNotifications() {
		return prepareRequest(Request.get(paths.users + '/' + this.user.id + '/notifications'))
	}

	updateUserNotification(notificationID) {
		return prepareRequest(Request.patch(paths.userNotifications + '/' + notificationID))
	}
}

export default UserController