import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'
import AuthenticationController from './authentication'

class UserController {
	constructor() {
		this.authenticationController = new AuthenticationController()
		this.user = this.userData()
	}

	userData() {
		return this.authenticationController.decodeUser()
	}

	getUsers() {
		return prepareRequest(Request.get(paths.users))
	}

	getUser(userID) {
		return prepareRequest(Request.get(paths.users + '/' + userID))
	}

	getMe(userID) {
		let user = this.userData()
		console.log(user)
		return prepareRequest(Request.get(paths.users + '/' + user.id))
	}

	updateUser(userData) {
		return prepareRequest(Request.patch(paths.users + '/' + this.user.id).send({ characterAssetName: userData.characterAssetName, publicName: userData.publicName }))
	}

	updateAvatar(avatar) {
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