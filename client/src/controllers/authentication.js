import Request from 'superagent'
import paths from './paths'

class AuthenticationController {

	signin(username, password) {
		return Request.post(paths.signin).send({ username: username, password: password }).set('Accept', 'application/json')
	}

}

export default AuthenticationController