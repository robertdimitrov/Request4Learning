import React from 'react'

import ForumController from '../../../controllers/forum'
import ForumTopicReply from './ForumTopicReply/ForumTopicReply'

import './forumTopic.css'

class ForumTopic extends React.Component {
	constructor(props) {
		super(props)
		this.forumController = new ForumController()
		this.state = { topic: {}, topicNotFound: false, replies: [] }
		this.handleSubmit = this.handleSubmit.bind(this)
		this.getForumTopic = this.getForumTopic.bind(this)
		this.getForumTopicReplies = this.getForumTopicReplies.bind(this)
	}

	componentWillMount() {
		this.getForumTopic()
		this.getForumTopicReplies()
	}

	getForumTopic() {
		let topicID = this.props.match.params.id
		this.forumController.getForumTopic(topicID).then( (response) => {
			response = JSON.parse(response.text)
			let topic = response.data
			// console.log(topic)
			if (topic) {
				this.setState({ topic: topic, topicNotFound: false })
			} else {
				this.setState({ topicNotFound: true })
			}
		}).catch( (err) => {
			this.setState({ topicNotFound: true })
		})
	}

	getForumTopicReplies() {
		let topicID = this.props.match.params.id
		this.forumController.getForumTopicReplies(topicID).then( (response) => {
			response = JSON.parse(response.text)
			let replies = response.data
			// console.log(replies)
			if (replies) {
				this.setState({ replies: replies })
			}
		}).catch( (err) => console.log(err))
	}

	handleSubmit(event) {
		let input = this.refs.commentInput.value
		this.forumController.createForumTopicReply(this.props.match.params.id, input).then( (response) => {
			this.getForumTopicReplies()
			this.refs.commentInput.value = ''
		})
	}

	render() {
		let replies = this.state.replies.map( (r) => {
			return <ForumTopicReply key={r.cuid} data={r}/>
		})

		return (
			<section className='forum-topic'>
				{ this.state.topicNotFound &&
					<h1>Topic Not Found</h1>
				}
				<h1>{this.state.topic.title}</h1>
				{replies}
				<input type='text' className='form-input' ref='commentInput' placeholder='Your comment'/>
				<button className='rounded-button form-button' onClick={this.handleSubmit}>Add a reply</button>
			</section>
		)
	}
}

export default ForumTopic