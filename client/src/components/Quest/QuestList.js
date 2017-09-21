import React from 'react'
import QuestController from '../../controllers/quest'
import QuestListItem from './QuestListItem/QuestListItem'
import './questList.css'

class QuestList extends React.Component {
	constructor(props) {
		super(props)
		this.questController = new QuestController()
		this.state = { quests: [] }
	}

	componentWillMount() {
		this.questController.getQuests().then( (response) => {
			response = JSON.parse(response.text)
			let quests = response.data
			if (quests) {
				this.setState({ quests: quests })
			}
		}).catch( (err) => { console.log(err) })
	}

	render() {
		let questItems = this.state.quests.map( q => {
			return <QuestListItem key={q.cuid} quest={q}/>
		})

		return (
			<section className='quest'>
				<h1>Quests</h1>
				<div className='quest-list-item quest-list-item-header'>
					<div className='quest-item-name'>Name</div>
					<div className='quest-item-maxPoints'>Max Points</div>
					<div className='quest-item-status'>Status</div>
				</div>
				{questItems}
			</section>
		)
	}
}

export default QuestList