import React from 'react'

import QuizQuestion from './QuizQuestion/QuizQuestion'

import './quizQuest.css'

class QuizQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}
		
	render() {
		let questions = this.props.quest.questData.map( (q,index) => {
			return <QuizQuestion id={index} key={index} data={q}/>
		})

		return (
			<div className='quiz-quest'>
				<h2 className='subtitle'>Questions:</h2>
				{questions}
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default QuizQuest