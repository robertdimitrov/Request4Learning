import React from 'react'

import OrderQuestPiece from './OrderQuestPiece/OrderQuestPiece'

import './orderQuest.css'

class OrderQuest extends React.Component {
	constructor(props) {
		super(props)
		this.state = { pieces: []}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSwap = this.handleSwap.bind(this)
	}

	componentWillMount() {
		let pieces = this.props.quest.questData.map( q => q.content)
		this.setState({ pieces: pieces })
	}

	handleSubmit() {
		this.props.handleSubmit()
	}

	handleSwap(indexA, indexB) {
		let pieces = this.state.pieces
		let c = pieces[indexB]
		pieces[indexB] = pieces[indexA]
		pieces[indexA] = c
		this.setState({ pieces: pieces })
	}

	render() {
		let pieceItems = this.state.pieces.map( (p, i) => {
			return <OrderQuestPiece key={i} index={i} handleSwap={this.handleSwap} length={this.state.pieces.length} piece={p}/>
		})

		return (
			<div className='order-quest'>
				<h2 className='subtitle'>Quest Pieces:</h2>
				{pieceItems}
				<button className='rounded-button' onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
}

export default OrderQuest