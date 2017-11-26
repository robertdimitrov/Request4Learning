import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'normalize.css'
import './style.css'

import Signin from './components/Signin/Signin'
import ProfileConfiguration from './components/ProfileConfiguration/ProfileConfiguration'
import routes from './routes'
import UserController from './controllers/user'

class AppRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {isLoggedIn: false, userStage: 0}
		this.didSignin = this.didSignin.bind(this)
		this.updateStage = this.updateStage.bind(this)
		this.userController = new UserController()

	}

	componentWillMount() {
		let token = localStorage.getItem('jwt')
		if (token && token.length > 0) {
			this.setState({ isLoggedIn: true })
			this.updateStage()
		}
	}

	didSignin() {
		this.setState({ isLoggedIn: true })
	}

	updateStage() {
		this.userController.getMe().then( (response) => {
			response = JSON.parse(response.text)
			let user = response.data
			this.setState({ userStage: user.stage })
		})
	}

	render() {
		if (!this.state.isLoggedIn) {
			return <Signin didSignin={this.didSignin} />
		}
		switch (this.state.userStage) {
			case 0: return <ProfileConfiguration updateStage={this.updateStage} />; break;
			default: return (
				<BrowserRouter>
					{routes}
				</BrowserRouter>
			) 
		}
	}
}

ReactDOM.render(<AppRouter/>, document.getElementById('root'))