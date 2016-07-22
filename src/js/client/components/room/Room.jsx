import React from 'react'
import Chat from "./Chat.jsx"


export default React.createClass({
	render() {
		// console.log('this.props.RoomStore', this.props.RoomStore);

		let room = this.props.RoomStore.room;
		let roomContent = null

		if (this.props.RoomStore.error) {
			roomContent = <div className="error">
				{this.props.RoomStore.error}
			</div>
		} else if (room) {
			roomContent = <div className="media">
				<div className="player">
					<h1>{room.title}</h1>
					<div className="video">
						<video></video>
					</div>
				</div>
				<Chat {...this.props} />
			</div>
		} else {
			roomContent = <div className="loading">
				Room is loading
			</div>
		}
	

		return (
			<section className="room">
				{roomContent}
			</section>
		)
	}
})