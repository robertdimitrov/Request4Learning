import React from 'react'
import ForumController from '../../controllers/forum'
import TeamController from '../../controllers/team'
import UserController from '../../controllers/user'

import ForumTopicList from '../Forum/ForumTopicList/ForumTopicList'
import TeamCommentList from '../Team/TeamCommentList/TeamCommentList'
import Profile from '../Profile/Profile'
import './app.css'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.forumController = new ForumController()
		this.teamController = new TeamController()
		this.userController = new UserController()
		this.state = { lastForumTopics: [], lastTeamComments: [], user: {} }
	}

	componentWillMount() {
		this.forumController.getForumTopics().then( (response) => {
			response = JSON.parse(response.text)
			let forumTopics = response.data
			if (forumTopics) {
				forumTopics = forumTopics.slice(0, Math.min(3, forumTopics.length))
				this.setState({ lastForumTopics: forumTopics })
			}
		}).catch( (err) => {})

		this.teamController.getTeamComments().then( (response) => {
			response = JSON.parse(response.text)
			let comments = response.data
			if (comments) {
				comments = comments.slice(0, Math.min(3, comments.length))
				this.setState({ lastTeamComments: comments })
			}
		}).catch( (err) => {})

		this.userController.getMe().then( (response) => {
			response = JSON.parse(response.text)
			let user = response.data
			if (user) {
				this.setState({ user: user })
			}
		}).catch( (err) => {})
	}

	render() {	
		return (
			<div>
				<h1>Dashboard</h1>
				<div className='dashboard'>
					<div className='newsfeed'>
						{this.state.lastForumTopics.length > 0 &&
							<section className='dashboard-section'>
								<h2 className='subtitle'>Last Forum Topics:</h2>
								<ForumTopicList topics={this.state.lastForumTopics}/>
							</section>
						}
						{this.state.lastTeamComments.length > 0 && 
							<section className='dashboard-section'>
								<h2 className='subtitle'>Last Comments in Team:</h2>
								<TeamCommentList comments={this.state.lastTeamComments}/>
							</section>
						}
					</div>
					<div className='profile'>
						<Profile user={this.state.user}/>
					</div>
				</div>
			</div>
		)
	}
}

export default App