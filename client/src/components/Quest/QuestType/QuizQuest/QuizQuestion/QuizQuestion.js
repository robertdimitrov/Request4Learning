import React from 'react'

import './quizQuestion.css'

class QuizQuest extends React.Component {
	render() {
		let answers = this.props.data.answers.map( a => {
			return (
				<div className='quiz-question-answer'><input type='radio' name='answer'/>{a}</div>
			)
		})

		return (
			<div className='quiz-question'>
				<p className='quiz-question-question'>{this.props.data.question.question}</p>
				{answers}
			</div>
		)
	}
}

export default QuizQuest