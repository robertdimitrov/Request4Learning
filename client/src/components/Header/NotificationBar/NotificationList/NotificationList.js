import React from 'react'

import Notification from './Notification/Notification'
import './notificationlist.css'

class NotificationList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let notificationItems = this.props.notifications.map( (n) => {
			return <Notification key={n.cuid} content={n}/>
		})

		return (
			<div className='notification-list'>
				{notificationItems}
			</div>
		)
	}
}

export default NotificationList