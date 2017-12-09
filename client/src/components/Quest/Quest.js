import React from 'react'
import FontAwesome from 'react-fontawesome'
import QuestController from '../../controllers/quest'

import SimpleQuest from './QuestType/SimpleQuest/SimpleQuest'
import PickTheWinnerQuest from './QuestType/PickTheWinnerQuest/PickTheWinnerQuest'
import JigsawQuest from './QuestType/JigsawQuest/JigsawQuest'
import TokenQuest from './QuestType/TokenQuest/TokenQuest'
import EmptyOutlinesQuest from './QuestType/EmptyOutlinesQuest/EmptyOutlinesQuest'
import QuizQuest from './QuestType/QuizQuest/QuizQuest'
import RiddleQuest from './QuestType/RiddleQuest/RiddleQuest'
import OrderQuest from './QuestType/OrderQuest/OrderQuest'

import './quest.css'

class Quest extends React.Component {
	constructor(props) {
		super(props)
		this.questController = new QuestController()
		this.state = { quest: {}, questNotFound: false, showQuestMaterials: false, answerSubmitted: false }
		this.handleStart = this.handleStart.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		this.questController.getQuest(this.props.match.params.id).then( (response) => {
			response = JSON.parse(response.text)
			let quest = response.data
			if (quest) {
				this.setState({ quest: quest, questNotFound: false })
			} else {
				this.setState({ questNotFound: true })
			}
		}).catch( (err) => { this.setState({ questNotFound: true }) })
	}

	handleStart() {
		this.setState({ showQuestMaterials: true })
	}

	handleSubmit() {
		this.setState({ answerSubmitted: true })
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
				<div className='quest-content-wrapper'>
					<div className='quest-content'>
						<h2 className='subtitle'>Description:</h2>
						<p>{this.state.quest.description}</p>
						<h2 className='subtitle'>Criteria:</h2>
						<p>{this.state.quest.criteria}</p>
						<h2 className='subtitle'>Resources:</h2>
						<p>{this.state.quest.resources}</p>
					</div>
					<div className='quest-state'>
						<h1>3d 8h left</h1>
						<h2 className='subtitle'>Submitted:</h2>
						<p>Team A <span className='lighter-text submission-date'>(11.12.2017 20:20)</span></p>
						<p>Team B <span className='lighter-text submission-date'>(12.12.2017 09:31)</span></p>
						<p>Team C <span className='lighter-text submission-date'>(13.12.2017 17:08)</span></p>
					</div>
				</div>
				{ this.state.showQuestMaterials === false && this.state.answerSubmitted === false &&
					<button className='rounded-button' onClick={this.handleStart}>Start Quest</button>
				}
				{ this.state.showQuestMaterials && this.state.answerSubmitted === false &&
					( () => {
					switch(this.state.quest.type) {
						case 'simple': return <SimpleQuest handleSubmit={this.handleSubmit}/>; break
						case 'pickTheWinner': return <PickTheWinnerQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'jigsaw': return <JigsawQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'token': return <TokenQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'emptyOutlines': return <EmptyOutlinesQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'quiz': return <QuizQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'riddle': return <RiddleQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
						case 'order': return <OrderQuest quest={this.state.quest} handleSubmit={this.handleSubmit}/>; break
					}
				})()}
				{ this.state.answerSubmitted &&
					<p className='submitted-info'>
						<FontAwesome className='icon' name='check' size='lg'/>
						Thank you for submitting an answer!
					</p>
				}
			</section>
		)
	}
}

export default Quest