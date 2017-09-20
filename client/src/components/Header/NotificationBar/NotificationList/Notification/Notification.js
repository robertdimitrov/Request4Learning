import React from 'react'

import './notification.css'

class Notification extends React.Component {
	render() {
		let date = new Date(this.props.content.dateAdded).toLocaleDateString()
		let text = this.props.content.text

		return (
			<div className='notification'>
				<a href={this.props.content.link}>
					{text}
					<span className='notification-date'>({date})</span>
				</a>
			</div>
		)
	}
}

export default Notification