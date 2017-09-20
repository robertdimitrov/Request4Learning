import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'normalize.css'
import './style.css'

import Signin from './components/Signin/Signin'
import routes from './routes'

class AppRouter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {isLoggedIn: false}
		this.didSignin = this.didSignin.bind(this)
	}

	componentWillMount() {
		let token = localStorage.getItem('jwt')
		if (token && token.length > 0) {
			this.setState({ isLoggedIn: true })	
		}
	}

	didSignin() {
		this.setState({ isLoggedIn: true })
	}

	render() {
		if (!this.state.isLoggedIn) {
			return <Signin didSignin={this.didSignin} />
		}
		return (
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<AppRouter/>, document.getElementById('root'))