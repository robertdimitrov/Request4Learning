import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'normalize.css'
import './style.css'

import Signin from './components/Signin/Signin'
import ProfileConfiguration from './components/ProfileConfiguration/ProfileConfiguration'
import TeamInvitation from './components/TeamInvitation/TeamInvitation'
import TeamConfiguration from './components/TeamConfiguration/TeamConfiguration'
import routes from './routes'
import UserController from './controllers/user'

class AppRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {isLoggedIn: false, userStage: 0}
		this.didSignin = this.didSignin.bind(this)
		this.updateStage = this.updateStage.bind(this)
		this.demoIncrementUserStage = this.demoIncrementUserStage.bind(this)
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
		console.log('userStage update')

		this.userController.getMe().then( (response) => {
			response = JSON.parse(response.text)
			let user = response.data
			console.log('response')
			console.log(user)
			console.log(this.state.userStage)
			this.setState({ userStage: user.stage })
		})
	}

	demoIncrementUserStage() {
		this.setState({ userStage: this.state.userStage + 1 })
	}

	render() {
		if (!this.state.isLoggedIn) {
			return <Signin didSignin={this.didSignin} />
		}
		switch (this.state.userStage) {
			case 0: return <ProfileConfiguration updateStage={this.updateStage} />; break;
			case 1: return <TeamInvitation demoIncrementUserStage={this.demoIncrementUserStage} />; break;
			case 2: return <TeamConfiguration demoIncrementUserStage={this.demoIncrementUserStage} />; break;
			default: return (
				<BrowserRouter>
					{routes}
				</BrowserRouter>
			) 
		}
	}
}

ReactDOM.render(<AppRouter/>, document.getElementById('root'))