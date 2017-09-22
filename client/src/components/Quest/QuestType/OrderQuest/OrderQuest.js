import React from 'react'

import './orderQuest.css'

class OrderQuest extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	render() {

		return (
			<div className='order-quest'>
				OrderQuest
			</div>
		)
	}
}

export default OrderQuest