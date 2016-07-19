import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
	showed(id){
		this.props.NotificationActions.showed(id);
	},

	render() {
		return (
			<section className="notifications">
				{this.props.NotificationStore.notifications.map((n) => {
					this.showed(n.id)
					
					return <div key={n.id} className="row">
						<div className={'notification ' + n.type.name.toLowerCase()}>
							{n.error}
						</div>
					</div>
				})}
			</section>
		)
	}
})