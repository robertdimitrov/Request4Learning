import React from 'react'
import FontAwesome from 'react-fontawesome'
import QuestController from '../../controllers/quest'
import './quest.css'

class Quest extends React.Component {
	constructor(props) {
		super(props)
		this.questController = new QuestController()
		this.state = { quest: {}, questNotFound: false }
	}

	componentWillMount() {
		this.questController.getQuest(this.props.match.params.id).then( (response) => {
			response = JSON.parse(response.text)
			let quest = response.data
			console.log(quest)
			if (quest) {
				this.setState({ quest: quest, questNotFound: false })
			} else {
				this.setState({ questNotFound: true })
			}
		}).catch( (err) => { this.setState({ questNotFound: true }) })
	}

	render() {
		return (
			<section className='quest'>
				{ this.state.topicNotFound &&
					<h1>Quest Not Found</h1>
				}
				<h1>{this.state.quest.name}</h1>
				<div className='quest-infobar'>
					<div className='quest-infobar-dueDate'>
						<FontAwesome className='icon' name='calendar-check-o'/>
						{new Date(this.state.quest.dueDate).toLocaleDateString()}
					</div>
					<div className='quest-infobar-mandatory'>
						<FontAwesome className='icon' name='pencil'/>
						{this.state.quest.isMandatory ? 'Mandatory' : 'Bonus'}

					</div>
					<div className='quest-infobar-points'>
						<FontAwesome className='icon' name='trophy'/>
						{this.state.quest.maxPoints}
					</div>
				</div>
				<div className='quest-content'>
					<h2 className='subtitle'>Description:</h2>
					<p>{this.state.quest.description}</p>
					<h2 className='subtitle'>Criteria:</h2>
					<p>{this.state.quest.criteria}</p>
					<h2 className='subtitle'>Resources:</h2>
					<p>{this.state.quest.resources}</p>
				</div>
			</section>
		)
	}
}

export default Quest