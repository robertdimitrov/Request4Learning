import React from 'react'
import AuthenticationController from '../../controllers/authentication'

import './signin.css'

class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.authenticationController = new AuthenticationController()
		this.state = { username: '', password: '', falseCredentials: false }

		this.handleUsernameChange = this.handleUsernameChange.bind(this)
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.cleanInputFields = this.cleanInputFields.bind(this)
	}

	handleUsernameChange(event) {
		this.setState({ username: event.target.value })
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value })
	}

	cleanInputFields() {
		this.refs.username.value = ''
		this.refs.password.value = ''
		this.setState({falseCredentials: false})
	}

	handleSubmit() {
		this.authenticationController.signin(this.state.username,this.state.password).then( (response) => {
			response = JSON.parse(response.text)
			let token = response.data.token
			if (token) {
				localStorage.setItem('jwt', token)
				this.props.didSignin()
				return
			}
			this.cleanInputFields()
		}).catch( (err) => {
			console.log(err)
			this.cleanInputFields()
			this.setState({falseCredentials: true})
		})
	}

	render() {
		return (
			<div className='signin'>
				<img src='public/assets/logo.png' alt='logo'/>
				<p className='center'>Welcome back!</p>
				<p className='center lighter-text'>Please sign in to continue to Request4Learning:</p>
				<div className='signin-field'>
					<label htmlFor='username'>Username: </label>
					<input type='text' id='username' ref='username' placeholder='Your Username' onChange={this.handleUsernameChange}/>
				</div>
				<div className='signin-field'>
					<label htmlFor='password'>Password: </label>
					<input type='password' id='password' ref='password' placeholder='Your Password' onChange={this.handlePasswordChange}/>
				</div>
				<div className={'error' + (this.state.falseCredentials ? '' : ' hidden')}>Wrong username or password.</div>
				<div className='signin-field'>
					<button className='rounded-button rounded-button-full' onClick={this.handleSubmit.bind(this)}>Sign in</button>
				</div>
			</div>
		)
	}
}

export default Signin