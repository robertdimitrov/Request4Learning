import React from 'react'

import './forumStats.css'

class ForumStatsMostTutorials extends React.Component {

	render() {
		let items = this.props.data.map( (item) => {
			return (
				<tr key={item.id} className='forum-stats-item'>
					<td className='forum-stats-item-avatar'><img src={'/public/avatars/' + item.avatarAssetName}/></td>
					<td className='forum-stats-item-name'>{item.publicName}</td>
					<td className='forum-stats-item-value'>{item.tutorialsCount}</td>
				</tr>
			)
		})

		items = items.slice(0,Math.min(items.length, 3))

		return (
			<section className='forum-stats-most-tutorials forum-stats-section'>
				<h2 className='subtitle'>Most Tutorials</h2>
				<table>
					<tbody>
						{items}
					</tbody>
				</table>
			</section>
		)
	}
}

export default ForumStatsMostTutorials