import React from 'react'

export default React.createClass({

	fbLogin() {
		window.location = "/login/facebook";
	},

	render() {
		return (
			<section className="login">
				<div className="loginBlock">
					<h1>Choose your prefered login type</h1>
					<p className="error">{this.props.params.message}</p>
					<ul>
						<li className="icon-facebook2 fb" onClick={this.fbLogin}></li>
						<li className="icon-google-plus3 gp"></li>
						<li className="icon-vk vk"></li>
						<li className="icon-twitter tw"></li>
					</ul>
				</div>
			</section>
		)
	}
})