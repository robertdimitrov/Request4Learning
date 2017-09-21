import React from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom'

import UserController from '../../../../controllers/user'
import ForumController from '../../../../controllers/forum'

import './forumTopicListItem.css'

class ForumTopicListItem extends React.Component {
	constructor(props) {
		super(props)
		this.userController = new UserController()
		this.forumController = new ForumController()
		this.state = { author: {}, repliesCount: 0 }
	}

	componentWillMount() {
		this.userController.getUser(this.props.topic.authorID).then( (response) => {
			response = JSON.parse(response.text)
			let author = response.data
			if (author) {
				this.setState({ author: author })
			}
		})

		this.forumController.getForumTopicReplies(this.props.topic.cuid).then( (response) => {
			response = JSON.parse(response.text)
			let replies = response.data
			if (replies) {
				this.setState({ repliesCount: replies.length })
			}
		})
	}

	render() {
		let title = this.props.topic.title
		let type = this.props.topic.type
		let date = new Date(this.props.topic.dateAdded).toLocaleDateString()
		let id = this.props.topic.cuid 

		return (
			<div className='forum-topic-list-item'>
				<Link to={'/forum/' + id}>
					<div>
						<div className='forum-item-header'>
							<h4 className='forum-item-title'>{title}</h4>
							<span className={'smaller-text forum-item-type ' + type }>{type}</span>
						</div>
						<div className='forum-item-footer'>
							<span className='forum-item-avatar'>
								<img src={'/public/avatars/' + this.state.author.avatarAssetName}/>
							</span>
							<span className='forum-item-author smaller-text'>{this.state.author.publicName}</span>
							<span className='smaller-text lighter-text forum-item-date'>({date})</span>
							<FontAwesome className='icon' name='comment-o'/>
							<span className='smaller-text lighter-text'>{this.state.repliesCount}</span>
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

export default ForumTopicListItem