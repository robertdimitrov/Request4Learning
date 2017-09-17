import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'normalize.css'

import routes from './routes'

class AppRouter extends React.Component {
	render() {
		return (
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		)
	}
}

ReactDOM.render(<AppRouter/>, document.getElementById('root'))