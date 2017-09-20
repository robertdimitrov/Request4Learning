import React from 'react'

import './teamCommentListItem.css'

class TeamCommentListItem extends React.Component {
	render() {
		let text = this.props.comment.text
		let date = new Date(this.props.comment.dateAdded).toLocaleDateString()

		return (
			<div className='team-comment-list-item'>
				<a href='/team'>
					<div>
						<h4>{text}</h4>
						<span className='smaller-text lighter-text'>{date}</span>
					</div>
				</a>
			</div>
		)
	}
}

export default TeamCommentListItem