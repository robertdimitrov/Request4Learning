import Request from 'superagent'
import jsonwebtoken from 'jsonwebtoken'
import paths from './paths'

class AuthenticationController {
	signin(username, password) {
		return Request.post(paths.signin).send({ username: username, password: password }).set('Accept', 'application/json')
	}

	decodeUser() {
		let token = localStorage.getItem('jwt')
		let decodedUser = jsonwebtoken.verify(token, 'REQUEST4LEARNING')
		return decodedUser
	}
}

export default AuthenticationController