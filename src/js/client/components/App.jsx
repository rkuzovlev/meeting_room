import React from 'react'
import { Link } from 'react-router'


export default React.createClass({
	render() {
		return (
			<div>
				<h1>React Router</h1>
				
				<ul role="nav">
					<li><Link to="/" onlyActiveOnIndex>Home</Link></li>
					<li><Link to="/about">About</Link></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
})