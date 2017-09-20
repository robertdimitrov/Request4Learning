import React from 'react'

import './forumTopicListItem.css'

class ForumTopicListItem extends React.Component {
	render() {
		let title = this.props.topic.title
		let date = new Date(this.props.topic.dateAdded).toLocaleDateString()
		let id = this.props.topic.cuid 

		return (
			<div className='forum-topic-list-item'>
				<a href={'/forum/' + id}>
					<div>
						<h4>{title}</h4>
						<span className='smaller-text lighter-text'>{date}</span>
					</div>
				</a>
			</div>
		)
	}
}

export default ForumTopicListItem