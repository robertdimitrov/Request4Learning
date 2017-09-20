import React from 'react'

import Navbar from './Navbar/Navbar'
import NotificationBar from './NotificationBar/NotificationBar'

import './header.css'

class Header extends React.Component {
	render() {
		return (
			<header className='header'>
				<a className='logo' href='/'>
					<img src='public/assets/logo.png' alt='logo'/>
				</a>
				<Navbar/>
				<NotificationBar/>
			</header>
		)
	}
}

export default Header