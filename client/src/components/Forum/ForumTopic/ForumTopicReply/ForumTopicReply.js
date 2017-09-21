import React from 'react'
import FontAwesome from 'react-fontawesome'

import ForumController from '../../../../controllers/forum'

import './forumTopicReply.css'

class ForumTopic extends React.Component {
	constructor(props) {
		super(props)
		this.forumController = new ForumController()
		this.state = { userHasLiked: this.props.data.userHasLiked }
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.setState({ userHasLiked: true })
		this.forumController.createForumTopicReplyLike(this.props.data.topicID, this.props.data.cuid).then( (response) => { })
	}

	render() {
		console.log(this.props.data)

		return (
			<section className='forum-topic-reply'>
				<div className='forum-topic-reply-meta'>
					<div className='avatar'>
						<img src={'/public/avatars/' + this.props.data.avatarAssetName}/>
					</div>
					<p>{this.props.data.publicName}</p>
					<p className='lighter-text smaller-text'>{new Date(this.props.data.dateAdded).toLocaleDateString()}</p>
				</div>
				<div className='forum-topic-reply-content'>
					<div className='comment'>
						<p>{this.props.data.text}</p>
					</div>
					<div className='likes'>
						<FontAwesome className='icon' name={this.state.userHasLiked ? 'thumbs-up' : 'thumbs-o-up'} onClick={this.handleClick}/>
						<span> {this.props.data.likesCount}</span>
					</div>
				</div>
			</section>
		)
	}
}

export default ForumTopic