import React from 'react'

import './jigsawQuest.css'

class JigsawQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		return (
			<div className='jigsaw-quest'>
				<h2 className='subtitle'>The Resources for Your Team:</h2>
				<p>
					{this.props.quest.questData.resource}
				</p>
				<h2 className='subtitle'>Your solution:</h2>
				<input type='text' placeholder='Your solution'/>
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default JigsawQuest