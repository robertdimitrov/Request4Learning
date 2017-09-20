import React from 'react'
import FontAwesome from 'react-fontawesome'

import NotificationList from './NotificationList/NotificationList'

import UserController from '../../../controllers/user'
import './notificationBar.css'

class NotificationBar extends React.Component {
	constructor(props) {
		super(props);
		this.userController = new UserController()
		this.state = { hasNotifications: false, notificationsCount: 0, showNotifications: false, notifications: [] }
		this.handleClick = this.handleClick.bind(this)	
	}

	componentWillMount() {
		console.log(this.userController)
		this.userController.getUserNotifications().then( (response) => {
			response = JSON.parse(response.text)
			let notifications = response.data
			if (notifications) {
				console.log(notifications)
				this.setState({ hasNotifications: true, notificationsCount: notifications.length, notifications: notifications })
			}
		}).catch( (err) => {
			this.setState({ hasNotifications: false, notificationsCount: 0 })
		})
	}

	handleClick() {
		this.setState({ showNotifications: !this.state.showNotifications })
	}

	render() {
		return (
			<div className='notificationBar'>
				<FontAwesome className='icon' name={this.state.hasNotifications ? 'bell' : 'bell-o'} size='lg' onClick={this.handleClick}/>
				<div className={this.state.hasNotifications ? 'notification-count' : 'hidden'}>
					{this.state.notificationsCount}
				</div>
				{this.state.showNotifications > 0 &&
					<NotificationList notifications={this.state.notifications}/>
				}
			</div>
		)
	}
}

export default NotificationBar