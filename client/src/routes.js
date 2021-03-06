import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header/Header'
import App from './components/App/App'
import Forum from './components/Forum/Forum'
import ForumTopic from './components/Forum/ForumTopic/ForumTopic'
import Course from './components/Course/Course'
import Team from './components/Team/Team'
import QuestList from './components/Quest/QuestList'
import Quest from './components/Quest/Quest'
import Leaderboard from './components/Leaderboard/Leaderboard'
import Awards from './components/Awards/Awards'
import NotFound from './components/NotFound/NotFound'

export default (
	<div>
		<Header />
		<div className='content'>
		<Switch>
			<Route exact={true} path='/' component={App}/>
			<Route path='/forum/:id' component={ForumTopic}/>                                                                                     	
			<Route path='/forum' component={Forum}/>
			<Route path='/course' component={Course}/>                                                                                              
			<Route path='/team' component={Team}/>
			<Route path='/quests/:id' component={Quest}/>                                  															
			<Route path='/quests' component={QuestList}/>
			<Route path='/leaderboard' component={Leaderboard}/>																					
			<Route path='/awards' component={Awards}/>
			<Route component={NotFound}/>
		</Switch>
		</div>
	</div>
)