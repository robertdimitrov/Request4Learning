import React from 'react'
import FontAwesome from 'react-fontawesome'

import './pickTheWinnerQuestSolution.css'

class PickTheWinnerQuestSolution extends React.Component {
	constructor(props) {
		super(props)
		this.state = { userHasLiked: false }
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({ userHasLiked: true })
	}

	render() {
		return (
			<div className='pick-the-winner-quest-solution'>
				<div className='team'>
					{this.props.solution.teamName}
				</div>
				<div className='solution'>
					<span><FontAwesome className='icon' name='download'/>
					Download File</span>
				</div>
				<div className='likes'>
					<FontAwesome className='icon' name={this.state.userHasLiked ? 'thumbs-up' : 'thumbs-o-up'} onClick={this.handleClick}/>
					{this.props.solution.points}
				</div>
			</div>
		)
	}
}

export default PickTheWinnerQuestSolution