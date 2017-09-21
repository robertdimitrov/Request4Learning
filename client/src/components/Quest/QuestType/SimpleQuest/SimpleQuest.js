import React from 'react'

import './simpleQuest.css'

class SimpleQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		return (
			<div className='simple-quest'>
				<div className='simple-quest-upload'>
					<p className='info'>Some additional Information about the quest.</p>
					<span className='choose-file'>Choose a file to upload:</span>
					<input type='file'/>
				</div>
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default SimpleQuest