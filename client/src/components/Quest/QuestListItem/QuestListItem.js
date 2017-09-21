import React from 'react'
import FontAwesome from 'react-fontawesome'
import './questListItem.css'

class QuestListItem extends React.Component {

	render() {
		console.log(this.props.quest)

		return (
			<a href={'/quests/' + this.props.quest.cuid}>
				<div className='quest-list-item'>
						<div className='quest-item-name'>
							{this.props.quest.name}
						</div>
						<div className='quest-item-maxPoints'>
							{this.props.quest.maxPoints}
						</div>
						<div className='quest-item-status'>
							{this.props.quest.points && 
								<span>
								<FontAwesome className='icon' name='check'/>
								({this.props.quest.points}P)
								</span>
							}
						</div>
				</div>
			</a>
		)
	}
}

export default QuestListItem