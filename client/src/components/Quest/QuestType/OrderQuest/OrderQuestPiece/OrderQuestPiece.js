import React from 'react'
import FontAwesome from 'react-fontawesome'

import './orderQuestPiece.css'

class OrderQuestPiece extends React.Component {
	constructor(props) {
		super(props)
		this.handleUp = this.handleUp.bind(this)
		this.handleDown = this.handleDown.bind(this)
	}

	handleUp() {
		let indexA = this.props.index
		let indexB = this.props.index - 1
		this.props.handleSwap(indexA, indexB)
	}

	handleDown() {
		let indexA = this.props.index
		let indexB = this.props.index + 1
		this.props.handleSwap(indexA, indexB)
	}

	render() {
		return (
			<div className='order-quest-piece'>
				<p className='content'>{this.props.piece}</p>
				<div className='arrows'>
				{this.props.index > 0 && 
					<FontAwesome name='chevron-up' className='icon' onClick={this.handleUp}/>
				}
				{this.props.index < this.props.length - 1 && 
					<FontAwesome name='chevron-down' className='icon' onClick={this.handleDown}/>
				}
				</div>
			</div>
		)
	}
}

export default OrderQuestPiece