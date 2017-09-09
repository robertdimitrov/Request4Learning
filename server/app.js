'use strict';

const Express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')

const config = require('./config.js')
const dummyData = require('./dummyData')

const User = require('./models/user')
const AuthenticationRoute = require('./routes/authentication.routes')

const app = new Express()


mongoose.connect(config.mongoURL, (err) => {
	if(err){
		console.log("Please make sure MongoDB is installed and running.")
		throw err
	}
	console.log("Connection to MongoDB established")
	dummyData()
})

app.use(Express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))


app.use((req,res,next) => {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
		jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'REQUEST4LEARNING', (err, decode) => {
			req.user = err ? undefined : decode
		})
	} else {
		req.user = undefined
	}
	next()
})

app.use(AuthenticationRoute)


app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		error: {
			message: err.message
		}
	})
})

// Start app
app.listen(config.port, (error) => {
	if(!error){
		console.log("Node server is now running on port " + config.port)
	}
})
