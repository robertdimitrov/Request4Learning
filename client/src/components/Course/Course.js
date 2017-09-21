import React from 'react'

import CourseController from '../../controllers/course'

import './course.css'

class Course extends React.Component {
	constructor(props) {
		super(props)
		this.courseController = new CourseController()
		this.state = { course: {}, courseAnnouncements: [] }
	}

	componentWillMount() {
		this.courseController.getCourseInformation().then( (response) => {
			response = JSON.parse(response.text)
			let course = response.data
			console.log(course)
			if (course) {
				this.setState({ course: course })
			}
		}).catch( (err) => {
			console.log(err)
		})

		this.courseController.getCourseAnnouncements().then( (response) => {
			response = JSON.parse(response.text)
			let announcements = response.data
			console.log(announcements)
			if (announcements) {
				this.setState({ courseAnnouncements: announcements })
			}
		}).catch( (err) => {
			console.log(err)
		})
	}

	render() {
		let announcements = this.state.courseAnnouncements.map( (a) => {
			return <p className='announcement' key={a.cuid}>{a.text}</p>
		})

		return (
			<section className='course'>
				<div className='informations'>
					<h1>Course</h1>
					<h2 className='subtitle'>Description</h2>
					<p>{this.state.course.courseInfo}</p>
					<h2 className='subtitle'>Assessment</h2>
					<p>{this.state.course.assessmentInfo}</p>
					<h2 className='subtitle'>Exam</h2>
					<p>{this.state.course.examInfo}</p>
				</div>
				<div className='announcements'>
					<h2 className='subtitle'>Course Announcements</h2>
					{announcements}
				</div>
			</section>
		)
	}
}

export default Course