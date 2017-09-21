import React from 'react'

import ForumController from '../../controllers/forum'

import ForumTopicList from './ForumTopicList/ForumTopicList'
import ForumStatsMostReplies from './ForumStats/ForumStatsMostReplies'
import ForumStatsMostTutorials from './ForumStats/ForumStatsMostTutorials'
import ForumStatsMostMarkedAnswers from './ForumStats/ForumStatsMostMarkedAnswers'

import './forum.css'

class Forum extends React.Component {
	constructor(props) {
		super(props)
		this.forumController = new ForumController()
		this.state = { topics: [], mostReplies: [], mostTutorials: [], mostMarkedAnswers: [] }
	}

	componentWillMount() {
		this.forumController.getForumTopics().then( (response) => {
			response = JSON.parse(response.text)
			let topics = response.data
			if (topics) {
				this.setState({ topics: topics })
			}
		}).catch( (err) => { console.log(err) })

		this.forumController.getUsersWithMostReplies().then( (response) => {
			response = JSON.parse(response.text)
			let mostReplies = response.data
			if (mostReplies) {
				this.setState({ mostReplies: mostReplies })
			}
		}).catch( (err) => { console.log(err) })

		this.forumController.getUsersWithMostTutorials().then( (response) => {
			response = JSON.parse(response.text)
			let mostTutorials = response.data
			if (mostTutorials) {
				this.setState({ mostTutorials: mostTutorials })
			}
		}).catch( (err) => { console.log(err) })

		this.forumController.getUsersWithMostMarkedAnswers().then( (response) => {
			response = JSON.parse(response.text)
			let mostMarkedAnswers = response.data
			if (mostMarkedAnswers) {
				this.setState({ mostMarkedAnswers: mostMarkedAnswers })
			}
		}).catch( (err) => { console.log(err) })
	}

	render() {
		return (
			<section className='forum'>
				<h1>Forum</h1>
				<div className='forum-content'>
					<section className='forum-topics'>
						<ForumTopicList topics={this.state.topics}/>
					</section>
					<section className='forum-stats'>
						<h2 className='subtitle'>Statistics</h2>
						{ this.state.mostReplies.length > 0 && 
							<ForumStatsMostReplies data={this.state.mostReplies}/>
						}
						{ this.state.mostTutorials.length > 0 && 
							<ForumStatsMostTutorials data={this.state.mostTutorials}/>
						}
						{ this.state.mostMarkedAnswers.length > 0 && 
							<ForumStatsMostMarkedAnswers data={this.state.mostMarkedAnswers}/>
						}
					</section>
				</div>
			</section>
		)
	}
}

export default Forum