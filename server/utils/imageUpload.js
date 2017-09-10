'use strict'

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './public/images')
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

module.exports = multer({
	storage: storage,
	fileFilter: function(req, file, callback) {
		let ext = path.extname(file.originalname)
		if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
			return callback(null, false)
		}
		callback(null, true)
	}
})