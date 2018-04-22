import React from 'react'

import './awardspodium.css'

class AwardsPodium extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		console.log(this.props.participants)
		return (
			<div className='awards-podium'>
				<div className='awards-second-place'>
					<div className='participant'>
						<img className='podium-avatar' src={'public/avatars/' + this.props.participants[0].avatarAssetName} alt='podium-avatar'/>
						<p className='podium-name'>{this.props.participants[0].name}</p>
					</div>
					<div className='podium-box'>
						<h1>2</h1>
					</div>
				</div>
				<div className='awards-first-place'>
					<div className='participant'>
						<img className='podium-avatar' src={'public/avatars/' + this.props.participants[1].avatarAssetName} alt='podium-avatar'/>
						<p className='podium-name'>{this.props.participants[1].name}</p>
					</div>
					<div className='podium-box'>
						<h1>1</h1>
					</div>
				</div>
				<div className='awards-third-place'>
					<div className='participant'>
						<img className='podium-avatar' src={'public/avatars/' + this.props.participants[2].avatarAssetName} alt='podium-avatar'/>
						<p className='podium-name'>{this.props.participants[2].name}</p>
					</div>
					<div className='podium-box'>
						<h1>3</h1>
					</div>
				</div>
			</div>
		)
	}

}

export default AwardsPodium