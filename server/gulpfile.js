const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const jshint = require('gulp-jshint')

gulp.task('jshint', () => {
	return gulp.src(['./*.js', '!./node_modules/**'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
})

gulp.task('default', ['jshint'])