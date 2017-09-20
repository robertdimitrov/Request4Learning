import React from 'react'

import ForumTopicListItem from './ForumTopicListItem/ForumTopicListItem'
import './forumTopicList.css'

class ForumTopicList extends React.Component {
	render() {
		let listItems = this.props.topics.map( (t) => {
			return <ForumTopicListItem key={t.cuid} topic={t}/>
		})

		return (
			<div className='forum-topic-list'>
				{listItems}
			</div>
		)
	}
}

export default ForumTopicList