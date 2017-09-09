'use strict'

const User = require('./models/user')

module.exports = () => {
	User.count().exec((err, count) => {
		if (count > 0 ) {
			return
		}

		let user1 = new User({ 
			cuid: 'cj7d7kob70001041a33i0ucr6', 
			username: 'robert', 
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student'
		})

		let user2 = new User({
			cuid: 'cj7d7mgcj0002041aztfgmx0k', 
			username: 'user', 
			password: '$2a$06$SQIFnMbp2Dlg7sd46tX2WOafpC9FsnG/22SBp2tm5oe9nllPPcQGS',
			type: 'student'
		})

		User.create([user1, user2], (error) => {
			if (error) {
				console.log("Couldn't create dummy data")
			}
		})
	})
}