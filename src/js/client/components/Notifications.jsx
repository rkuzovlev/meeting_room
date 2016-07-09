import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
	getInitialState() {
		return this.props.flux.getStore('NotificationStore').getState();
	},

	componentDidMount() {
		this.props.flux.getStore('NotificationStore').listen(this.onChange);
	},

	componentWillUnmount() {
		this.props.flux.getStore('NotificationStore').unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

	showed(id){
		this.props.flux.getActions('NotificationActions').showed(id);
	},

	render() {
		return (
			<section className="notifications">
				{this.state.notifications.map((n) => {
					this.showed(n.id)
					
					return <div key={n.id} className="row">
						<div className={'notification ' + n.type.name.toLowerCase()}>
							{n.message}
						</div>
					</div>
				})}
			</section>
		)
	}
})