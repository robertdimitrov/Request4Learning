import React from 'react'
import UserController from '../../controllers/user'

import './profileConfiguration.css'

class ProfileConfiguration extends React.Component {
	constructor(props) {
		super(props)
		this.userController = new UserController()
		this.state = { publicName: '', avatarAssetName: '', character: '' }

		this.handlePublicNameChange = this.handlePublicNameChange.bind(this)
		this.handleCharacterSelection = this.handleCharacterSelection.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		this.userController.getMe().then( (response) => {
			response = JSON.parse(response.text)
			let user = response.data
			this.setState({
				publicName: user.publicName,
				avatarAssetName: user.avatarAssetName,
				character: user.characterAssetName
			})
		})
	}

	handlePublicNameChange(event) {
		this.setState({ publicName: event.target.value })
	}

	handleCharacterSelection(event) {
		this.setState({ character: event.target.value })
	}

	handleSubmit() {	
		this.userController.updateUser({ publicName: this.state.publicName, characterAssetName: this.state.character }).then( (response) => {
			this.props.updateStage()
		}).catch( (err) => {
			console.log(err)
		})
	}

	render() {
		return (
			<div className='profile-configuration centered-form'>
				<h1>Set Up Your Profile</h1>
				<h2>Public name</h2>
				<div className='publicName-field'>
					<input type='text' id='publicName' ref='publicName' onChange={this.handlePublicNameChange}/>
				</div>
				<h2>Avatar</h2>
				<div className='avatar-field'>
					<div className='avatar-image-wrapper'>
						<img className='avatar' src={'public/avatars/' + this.state.avatarAssetName} alt='avatar'/>
					</div>
					<div className='avatar-input-wrapper'>
						<label htmlFor='avatar-select'>Select new avatar</label>
						<input id='avatar-select' name='avatar-select' type='file'/>
					</div>
				</div>
				<div className='character-wrapper'>
				<h2>Character</h2>
				<div className='character-field'>
					<div className='character-image-wrapper'>
						<img className='character' src={'public/characters/' + this.state.character} alt='avatar'/>
					</div>
					<div className='character-input-wrapper'>
						<select value={this.state.character} onChange={this.handleCharacterSelection}>
							<option value='default.png'>Character 1</option>
							<option value='character2.png'>Character 2</option>
							<option value='character3.png'>Character 3</option>
						</select>
					</div>	
				</div>
				</div>
				<div className='character-button'>
					<button className='rounded-button rounder-button-full' onClick={this.handleSubmit}>Submit</button>
				</div>
			</div>
		)
	}
}

export default ProfileConfiguration