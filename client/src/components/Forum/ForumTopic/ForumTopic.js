import React from 'react'

import ForumController from '../../../controllers/forum'
import ForumTopicReply from './ForumTopicReply/ForumTopicReply'

import './forumTopic.css'

class ForumTopic extends React.Component {
	constructor(props) {
		super(props)
		this.forumController = new ForumController()
		this.state = { topic: {}, topicNotFound: false, replies: [] }
	}

	componentWillMount() {
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

		this.forumController.getForumTopicReplies(topicID).then( (response) => {
			response = JSON.parse(response.text)
			let replies = response.data
			// console.log(replies)
			if (replies) {
				this.setState({ replies: replies })
			}
		}).catch( (err) => console.log(err))
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
			</section>
		)
	}
}

export default ForumTopic