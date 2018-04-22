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
			<section className='leaderboard'>
				<h1>Leaderboard</h1>
				<div className='leaderboard-item leaderboard-header'>
					<div className='leaderboard-item-team'>Team</div>
					<div className='leaderboard-item-questsSolved'>Quests Solved</div>
					<div className='leaderboard-item-points'>Points</div>
				</div>
				{leaderboardItems}


				<h2 className='group-performance-header'>Group performance</h2>
				<div className='group-performance leaderboard-header leaderboard-item'>
					<div className='leaderboard-item-team'>Group</div>
					<div className='leaderboard-item-points'>Average Points</div>
				</div>
				<LeaderboardItem key='parallelGroup' team={{name: 'Parallel Group', points: '7.9'}} />
				<LeaderboardItem key='yourGroup' team={{name: 'Your Group', points: '6.3'}} />
			</section>
		)
	}
}

export default Leaderboard 