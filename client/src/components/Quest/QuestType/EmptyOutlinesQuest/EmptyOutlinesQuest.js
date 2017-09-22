import React from 'react'

import './emptyOutlinesQuest.css'

class EmptyOutlinesQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		let inputItems = this.props.quest.questData.fields.map( f => {
			return (
				<div className='empty-otulines-field' key={f}>
					<p>{f}: </p>
					<input type='text'/>
				</div>
			)
		})

		return (
			<div className='empty-outlines-quest'>
				<h2 className='subtitle'>Text to be filled:</h2>
				<p>{this.props.quest.questData.text}</p>
				{inputItems}
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default EmptyOutlinesQuest