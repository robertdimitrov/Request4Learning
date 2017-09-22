import React from 'react'

import './leaderboardItem.css'

class LeaderboardItem extends React.Component {

	render() {
		let name = this.props.team.name
		let avatar = this.props.team.avatarAssetName
		let points = this.props.team.points
		let questsSolved = this.props.team.questsSolved

		return (
			<div className='leaderboard-item'>
				<div className='leaderboard-item-team'>
					<img className='avatar' src={'public/avatars/' + avatar} alt='team-avatar'/>
					{name}
				</div>
				<div className='leaderboard-item-questsSolved'>
					{questsSolved}
				</div>
				<div className='leaderboard-item-points'>
					{points}
				</div>
			</div>
		)
	}
}

export default LeaderboardItem 