import React from 'react'

import QuestController from '../../../../controllers/quest'

import PickTheWinnerQuestSolution from './PickTheWinnerQuestSolution/PickTheWinnerQuestSolution'

import './pickTheWinnerQuest.css'

class PickTheWinnerQuest extends React.Component {
	constructor(props) {
		super(props)
		this.questController = new QuestController()
		this.state = { solutions: [] }
	}

	componentWillMount() {
		this.questController.getQuestSolutions(this.props.quest.cuid).then( (response) => {
			response = JSON.parse(response.text)
			let solutions = response.data
			console.log(solutions)
			if (solutions) {
				this.setState({ solutions: solutions })
			}
		})
	}

	render() {

		let solutions = this.state.solutions.map( s => {
			return <PickTheWinnerQuestSolution key={s.teamID} solution={s}/>
		})

		console.log(solutions)

		return (
			<div className='pick-the-winner-quest'>
				<h2 className='subtitle'>Choose the best solution:</h2>
				{solutions}
			</div>
		)
	}
}

export default PickTheWinnerQuest