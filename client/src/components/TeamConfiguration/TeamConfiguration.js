import React from 'react'
import TeamController from '../../controllers/team'

import './teamconfiguration.css'

class TeamConfiguration extends React.Component {
	constructor(props) {
		super(props)
		this.teamController = new TeamController()
		this.state = {teamName: '', teamAvatarAsset: '', teamMotto: ''}

		this.handleTeamNameChange = this.handleTeamNameChange.bind(this)
		this.handleTeamMottoChange = this.handleTeamMottoChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleTeamNameChange(event) {
		this.setState({ teamName: event.target.value })
	}

	handleTeamMottoChange(event) {
		this.setState({ teamMoto: event.target.value })
	}

	handleSubmit() {
		this.teamController.updateTeam({ name: this.state.teamName, motto: this.state.teamMotto }).then( (response) => {
			this.props.demoIncrementUserStage()
		}).catch( (err) => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className='team-configuration centered-form'>
				<h1>Set up your team</h1>
				<h2>Team name</h2>
				<div className='teamName-field'>
					<input type='text' id='teamName' ref='teamName' onChange={this.handleTeamNameChange}/>
				</div>
				<h2>Team avatar</h2>
				<div className='avatar-field'>
					<div className='avatar-image-wrapper'>
						<img className='avatar' src='public/avatars/team_default.png' alt='avatar'/>
					</div>
					<div className='avatar-input-wrapper'>
						<label htmlFor='avatar-select'>Select new avatar</label>
						<input id='avatar-select' name='avatar-select' type='file'/>
					</div>
				</div>
				<h2>Team motto</h2>
				<div className='teamMotto-field'>
					<input type='text' id='teamMotto' ref='teamMotto' onChange={this.handleTeamMottoChange}/>
				</div>
				<div className='submit-button'>
					<button className='rounded-button rounder-button-full' onClick={this.handleSubmit}>Submit</button>
				</div>
			</div>
		)
	}
}

export default TeamConfiguration