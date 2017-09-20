import React from 'react'

import TeamCommentListItem from './TeamCommentListItem/TeamCommentListItem'

import './teamCommentList.css'

class TeamCommentList extends React.Component {
	render() {
		let listItems = this.props.comments.map( (c) => {
			return <TeamCommentListItem key={c.cuid} comment={c}/>
		})

		return (
			<div className='team-comment-list'>
				{listItems}
			</div>
		)
	}
}

export default TeamCommentList