import React from 'react'
import TeamController from '../../controllers/team'
import TeamCommentList from './TeamCommentList/TeamCommentList'
import TeamTaskList from './TeamTaskList/TeamTaskList'
import './team.css'

class Team extends React.Component {
	constructor(props) {
		super(props)
		this.teamController = new TeamController()
		this.getTeamTasks = this.getTeamTasks.bind(this)
		this.getTeamComments = this.getTeamComments.bind(this)
		this.state = { tasks: [], comments: [], activePage: 'tasks' }
		this.handleNavClick = this.handleNavClick.bind(this)
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
		this.handleTaskSubmit = this.handleTaskSubmit.bind(this)
		this.handleTaskDelete = this.handleTaskDelete.bind(this)
	}

	componentWillMount() {
		this.getTeamTasks()
		this.getTeamComments()
	}

	getTeamTasks() {
		this.teamController.getTeamTasks().then( (response) => {
			response = JSON.parse(response.text)
			let tasks = response.data
			if (tasks) {
				this.setState({ tasks: tasks })
			}
		})
	}

	getTeamComments() {
		this.teamController.getTeamComments().then( (response) => {
			response = JSON.parse(response.text)
			let comments = response.data
			if (comments) {
				this.setState({ comments: comments })
			}
		})
	}

	handleNavClick(section) {
		this.setState({ activePage: section })
	}

	handleTaskSubmit() {
		this.teamController.createTeamTask(this.refs.taskInput.value).then( () => {
			this.getTeamTasks()
			this.refs.taskInput.value = ''
		})
	}

	handleCommentSubmit() {
		this.teamController.createTeamComment(this.refs.commentInput.value).then( () => {
			this.getTeamComments()
			this.refs.commentInput.value = ''
		})
	}

	handleTaskDelete(taskID) {
		this.teamController.deleteTeamTask(taskID).then( () => {
			this.getTeamTasks()
		})
	}

	render() {
		return (
			<section className='team'>
				<h1>Team</h1>
				<div className='team-nav'>
					<h2 className={'subtitle ' + ((this.state.activePage === 'tasks') ? 'active' : '')} onClick={() => this.handleNavClick('tasks')}>Tasks</h2>
					<h2 className={'subtitle ' + ((this.state.activePage === 'comments') ? 'active' : '')} onClick={() => this.handleNavClick('comments')}>Comments</h2>
				</div>
				{this.state.activePage === 'tasks' &&
					<div className='team-tasks-wrapper'>		
						<TeamTaskList tasks={this.state.tasks} handleTaskDelete={this.handleTaskDelete}/>
						<input className='form-input' type='text' ref='taskInput' placeholder='New Task'/>
						<button className='rounded-button form-button' onClick={this.handleTaskSubmit}>Add a task</button>
					</div>
				}
				{this.state.activePage === 'comments' &&
					<div className='team-comments-wrapper'>
						<TeamCommentList comments={this.state.comments}/>
						<input className='form-input' type='text' ref='commentInput' placeholder='Your comment'/>
						<button className='rounded-button form-button' onClick={this.handleCommentSubmit}>Add a comment</button>
					</div>
				}
			</section>
		)
	}
}

export default Team