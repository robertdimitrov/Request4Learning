import React from 'react'

import './profile.css'

class Profile extends React.Component {
	render() {

		let avatar = this.props.user.avatarAssetName
		let publicName = this.props.user.publicName
		let username = this.props.user.username

		return (
			<div className='profile'>
				<div className='avatar'>
					<img src={'public/avatars/' + avatar} alt='avatar'/>
				</div>
				<p className='publicName'>{publicName}</p>
				{ publicName !== username && 
					<p className='smaller-text'>({username})</p>
				}
			</div>
		)
	}
}

export default Profile