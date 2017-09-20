import React from 'react'

import Navbar from './Navbar/Navbar'
import NotificationBar from './NotificationBar/NotificationBar'

import './header.css'

class Header extends React.Component {
	render() {
		return (
			<header>
				<div className='header'>
					<a className='logo' href='/'>
						<img src='public/assets/logo.png' alt='logo'/>
					</a>
					<Navbar class='navbar-desktop'/>
					<NotificationBar/>
				</div>
				<Navbar class='navbar-responsive'/>
			</header>
		)
	}
}

export default Header