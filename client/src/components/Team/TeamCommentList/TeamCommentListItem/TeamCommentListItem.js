import React from 'react'

import './teamCommentListItem.css'

class TeamCommentListItem extends React.Component {
	render() {
		let text = this.props.comment.text
		let date = new Date(this.props.comment.dateAdded).toLocaleDateString()
		let avatarSrc = '/public/avatars/' + this.props.comment.avatarAssetName
		let publicName = this.props.comment.publicName
		console.log(this.props.comment)

		return (
			<div className='team-comment-list-item'>
				<a href='/team'>
					<h4>{text}</h4>
					<img className='avatar' src={avatarSrc}/>
					<span className='name smaller-text'>{publicName}</span>
					<span className='smaller-text lighter-text'>({date})</span>
				</a>
			</div>
		)
	}
}

export default TeamCommentListItem