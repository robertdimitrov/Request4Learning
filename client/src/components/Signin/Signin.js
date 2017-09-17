import React from 'react'
import AuthenticationController from '../../controllers/authentication'

class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.authenticationController = new AuthenticationController()
	}

	handleClick() {
		this.authenticationController.signin('username','pass').then( (response) => {
			console.log(response)
		}).catch( (err) => console.log(err))
	}

	render() {
		return (
			<button onClick={this.handleClick.bind(this)}>Sign in</button>
		)
	}
}

export default Signin