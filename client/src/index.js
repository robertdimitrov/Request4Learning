import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, Link } from 'react-router'

class App extends React.Component {
	render() {
		return (<h1>Hello</h1>)
	}
}

ReactDOM.render(<App/>, document.getElementById('root'))