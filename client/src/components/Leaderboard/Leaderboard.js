import React from 'react'
import QuestController from '../../controllers/quest'

import LeaderboardItem from './LeaderboardItem/LeaderboardItem'

import './leaderboard.css'

class Leaderboard extends React.Component {
	constructor(props) {
		super(props)
		this.questController = new QuestController()
		this.state = { teams: [] }
	}

	componentWillMount() {
		this.questController.getLeaderboard().then( (response) => {
			response = JSON.parse(response.text)
			let teams = response.data
			console.log(teams)
			if (teams) {
				this.setState({ teams: teams })
			}
		})
	}

	render() {
		let leaderboardItems = this.state.teams.map( (t) => {
			return <LeaderboardItem key={t.cuid} team={t}/>
		})

		return (
			<div className='leaderboard'>
				<h1>Leaderboard</h1>
				<div className='leaderboard-item leaderboard-header'>
					<div className='leaderboard-item-team'>Team</div>
					<div className='leaderboard-item-questsSolved'>Quests Solved</div>
					<div className='leaderboard-item-points'>Points</div>
				</div>
				{leaderboardItems}
			</div>
		)
	}
}

export default Leaderboard 