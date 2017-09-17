import Request from 'superagent'
import paths from './paths'
import prepareRequest from './prepareRequest'

class CourseController {
	getCourseInformation() {
		return prepareRequest(Request.get(paths.course))
	}

	getCourseAnnouncements() {
		return prepareRequest(Request.get(paths.courseAnnouncements))
	}

	getCourseFeedbacks() {
		return prepareRequest(Request.get(paths.courseFeedbacks))
	}

	createCourseFeedback(text, rating) {
		return prepareRequest(Request.post(paths.courseFeedbacks).send({ text, rating }))
	}
}

export default CourseController