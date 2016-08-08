import React from 'react'
import Chat from "./Chat.jsx"
import RaisedButton from 'material-ui/RaisedButton';

const startStreamStyle = {
	"marginTop": "10px"
}

export default React.createClass({
	startStream(){
		this.props.RoomActions.startStream();
	},

	stopStream(){
		this.props.RoomActions.stopStream();
	},

	render() {
		// console.log('this.props.RoomStore', this.props.RoomStore);

		let room = this.props.RoomStore.room;
		let rs = this.props.RoomStore;
		let roomContent = null;
		let streamerPanel = null;

		if (rs.permissions && rs.permissions.stream) {
			streamerPanel = <div className="streamerPanel">
				{(() => {
					if (rs.localVideo){
						return <RaisedButton primary={true} onClick={this.stopStream} label="Stop stream" style={startStreamStyle} />
					}
					return <RaisedButton secondary={true} onClick={this.startStream} label="Start stream" style={startStreamStyle} />
				})()}
			</div>
		}

		let localVideo = null;
		if (rs.localVideo){
			localVideo = <video id={rs.localVideo.id} src={rs.localVideo.src} autoPlay></video>
		}

		if (this.props.RoomStore.error) {
			roomContent = <div className="error">
				{this.props.RoomStore.error}
			</div>
		} else if (room) {
			roomContent = <div className="media">
				<div className="player">
					<h1>{room.title}</h1>
					<div className="video">
						{rs.remoteVideos.map((v, i) => {
							let style = {
								"marginLeft": (160*i).toString() + "px"
							};
							return <video key={v.id} id={v.id} src={v.src} className="small" autoPlay style={style}></video>
						})}

						{localVideo}
					</div>	
					{streamerPanel}
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