function prepareRequest(request) {
	request.set('Authorization', localStorage.getItem('jwt'))
	request.set('Accept', 'application/json')
	return request
}

export default prepareRequest