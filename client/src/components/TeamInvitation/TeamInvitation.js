import React from 'react'
import UserController from '../../controllers/user'
import TeamController from '../../controllers/team'

import './teamInvitation.css'

class TeamInvitation extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = { users: [] }

		this.userController = new UserController()
		this.handleAcceptClick = this.handleAcceptClick.bind(this)
	}

	componentDidMount() {
		this.userController.getUsers().then( (response) => {
			response = JSON.parse(response.text)
			let users = response.data
			this.setState({ users: users })
		})
	}

	handleAcceptClick() {
		// only mockup
		this.props.demoIncrementUserStage()
	}

	render() {
		let userItems = this.state.users.map( (u) => {
			return <div className='invitation-user' key={u.publicName}><div className='invitation-info'><p>{u.publicName}</p></div><div className='invitation-button'><p>Invite</p></div></div> 
		})

		return (
			<div className='team-invitations centered-form'>
				<h1>Find a team</h1>
				<div className='open-invitations'>
					<div className='invitation-info'>
						<p><strong>studentA</strong> asked you to join her and <strong>studentB</strong> in a team</p>
					</div>
					<div className='invitation-button'>
						<p onClick={this.handleAcceptClick}>Accept</p>
					</div>
				</div>
				<h2>All users</h2>
				{userItems}
			</div>
		)
	}


}

export default TeamInvitation