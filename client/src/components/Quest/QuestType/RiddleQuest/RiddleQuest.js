import React from 'react'

import './riddleQuest.css'

class RiddleQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		return (
			<div className='riddle-quest'>
				<h2 className='subtitle'>Additional Information:</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
				<h2 className='subtitle'>Your Answer:</h2>
				<input type='text'/>
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default RiddleQuest