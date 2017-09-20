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
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Team</th>
							<th>Quests Solved</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
					{leaderboardItems}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Leaderboard 