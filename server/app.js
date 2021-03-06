'use strict';

const Express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const jsonwebtoken = require('jsonwebtoken')
const cors = require('cors')

const config = require('./config.js')
const exampleData = require('./exampleData')
const httpCodes = require('./utils/httpcodes')

const User = require('./models/user')
const AuthenticationRoute = require('./routes/authentication.routes')
const UserRoute = require('./routes/user.routes')
const TeamRoute = require('./routes/team.routes')
const AuthenticationController = require('./controllers/authentication.controller')
const CourseRoute = require('./routes/course.routes')
const ForumRoute = require('./routes/forum.routes')
const QuestRoute = require('./routes/quest.routes')

const app = new Express()


mongoose.connect(config.mongoURL, (err) => {
	if(err){
		console.log("Please make sure MongoDB is installed and running.")
		throw err
	}
	console.log("Connection to MongoDB established")
	exampleData()
})

app.use(cors())
app.options('*', cors())

app.use(Express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))


app.use( (req, res, next) => {
	if (req.headers && req.headers.authorization) {
		jsonwebtoken.verify(req.headers.authorization, 'REQUEST4LEARNING', (err, decode) => {
			req.user = err ? undefined : decode
		})
	} else {
		req.user = undefined
	}
	next()
})

app.use(AuthenticationRoute)
app.use(AuthenticationController.loginCheck)
app.use(UserRoute)
app.use(TeamRoute)
app.use(CourseRoute)
app.use(ForumRoute)
app.use(QuestRoute)

app.use((err, req, res, next) => {
	res.status(err.status || httpCodes.internalServerError)
	return res.json({
		error: {
			message: err.message
		}
	})
})

app.listen(config.port, (error) => {
	if(!error){
		console.log("Node server is now running on port " + config.port)
	}
})
