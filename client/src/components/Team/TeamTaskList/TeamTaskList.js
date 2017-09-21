import React from 'react'
import FontAwesome from 'react-fontawesome'

import './teamTaskList.css'

class TeamTaskList extends React.Component {

	render() {
		let items = this.props.tasks.map( t => {
			return (
				<div key={t.cuid} className='team-task-item'>
					<span>{t.text}</span>
					<FontAwesome className='icon' name='minus-circle' onClick={() => this.props.handleTaskDelete(t.cuid)}/>
				</div>
			)
		})

		return (
			<section className='team-tasks'>
				{items}
			</section>
		)
	}
}

export default TeamTaskList