'use strict';

const Express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const config = require('./config.js')

const app = new Express()


mongoose.connect(config.mongoURL, (err) => {
	if(err){
		console.log("Please make sure MongoDB is installed and running.")
		throw err
	}
	console.log("Connection to MongoDB established")
})

app.use(Express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))



app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

// Start app
app.listen(config.port, (error) => {
	if(!error){
		console.log("Node server is now running on port " + config.port)
	}
})
