function prepareRequest(request) {
	request.set('Authorization', localStorage.getItem('jwt'))
	request.set('Accept', 'application/json')
}

export default prepareRequest