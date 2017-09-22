import React from 'react'

import './tokenQuest.css'

class TokenQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		return (
			<div className='token-quest'>
				<h2 className='subtitle'>Text:</h2>
				<p contentEditable='true'>{this.props.quest.questData.text}</p>
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default TokenQuest