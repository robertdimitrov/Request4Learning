import React from 'react'

import './leaderboardItem.css'

class LeaderboardItem extends React.Component {

	render() {
		let name = this.props.team.name
		let avatar = this.props.team.avatarAssetName
		let points = this.props.team.points
		let questsSolved = this.props.team.questsSolved

		return (
			<tr className='leaderboard-item'>
				<td><img className='avatar' src={'public/avatars/' + avatar} alt='team-avatar'/></td>
				<td>{name}</td>
				<td>{questsSolved}</td>
				<td>{points}</td>
			</tr>
		)
	}
}

export default LeaderboardItem 