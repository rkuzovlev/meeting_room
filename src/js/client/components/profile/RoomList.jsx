import React from 'react'
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


const cardStyle = {
    position: 'relative',
    'paddingBottom': '50px'
}

const cardActionsStyle = {
    position: 'absolute',
    bottom: 0,
}

const cardTextStyle = {
	'paddingTop': 0
}

export default React.createClass({
	getInitialState() {
		return this.props.flux.getStore('CurrentUserStore').getState();
	},

	componentDidMount() {
		this.props.flux.getStore('CurrentUserStore').listen(this.onChange);
	},

	componentWillMount() {
		let state = this.props.flux.getStore('CurrentUserStore').getState();
		this.setState(state);
		
		if (!state.fetched){
			this.props.flux.getActions('CurrentUserActions').fetchRooms();
		}
	},

	componentWillUnmount() {
		this.props.flux.getStore('CurrentUserStore').unlisten(this.onChange);
	},

	onChange(state) {
		this.setState(state);
	},

	editRoom(event) {
		let roomid = event.currentTarget.dataset.roomid
		browserHistory.push('/room/' + roomid + '/edit')
	},

	render() {
		let editButton = (uid, roomid) => {
			if (this.state.user.id == uid){
				return <FlatButton data-roomid={roomid} onClick={this.editRoom} label="Edit" />
			} else {
				return null;
			}
		};

		return (
			<div className="rooms">
				<p className="title">User rooms</p>
				<div className="list">

					{this.state.rooms.map((r) => {
						return <Card key={r.id} style={cardStyle}>
							<CardHeader
								title={r.uname}
								avatar={r.uavatar}
							/>
							<CardMedia>
								<img src={r.image} />
							</CardMedia>
							
							<CardTitle title={r.title} />
							<CardText style={cardTextStyle}>{r.description}</CardText>

							<CardActions style={cardActionsStyle}>
								<FlatButton secondary={true} label="Enter room" />
								{editButton(r.uid, r.id)}
							</CardActions>
						</Card>
					})}


				</div>
			</div>
		)
	}
})