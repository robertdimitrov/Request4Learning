import React from 'react'
import { NavLink } from 'react-router-dom'

import './navbar.css'

class Navbar extends React.Component {
	render() {
		return (
			<nav className={this.props.class} >
				<NavLink to='/quests' activeClassName='selected'>Quests</NavLink>
				<NavLink to='/leaderboard' activeClassName='selected'>Leaderboard</NavLink>
				<NavLink to='/awards' activeClassName='selected'>Awards</NavLink>
				<NavLink to='/team' activeClassName='selected'>Team</NavLink>
				<NavLink to='/forum' activeClassName='selected'>Forum</NavLink>
				<NavLink to='/course' activeClassName='selected'>Course</NavLink>
			</nav>
		)
	}
}

export default Navbar