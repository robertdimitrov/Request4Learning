import React from 'react'
import AwardsPodium from './AwardsPodium/AwardsPodium'

import './awards.css'

// class only for demo purposes

class Awards extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			bestTeams: [
				{ name: 'Team A', avatarAssetName: 'team-1.png' },
				{ name: 'Team B', avatarAssetName: 'team-2.png' },
				{ name: 'Team C', avatarAssetName: 'team-3.png' },
			],
			usersWithMostForumComments: [
				{ name: 'Student A', avatarAssetName: 'avatar1.png' },
				{ name: 'Student B', avatarAssetName: 'default.png' },
				{ name: 'Student C', avatarAssetName: 'team_default.png' }
			]
		}
	}

	render() {
		return (
			<div className='awards'>
				<h1>Awards</h1>
				<section className='awards-best-teams'>
					<h2 className='subtitle'>Best Teams</h2>
					<AwardsPodium participants={this.state.bestTeams}/>
				</section>
				<section className='avards-most-comments'>
					<h2 className='subtitle'>Most Forum Comments</h2>
					<AwardsPodium participants={this.state.usersWithMostForumComments}/>
				</section>
			</div>
			
		)
	}

}

export default Awards