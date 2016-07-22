import * as capi  from '../centrifugo/api'
import sequelize from '../sequelize'

const User = sequelize.models.user;
const Room = sequelize.models.room;

export let newMessage = function*(){
	if (!this.req.user){
		this.status = 401;
		this.body = "Unauthorized";
		return
	}

	try {
		let user = {
			id: this.req.user.get('id'),
			name: this.req.user.get('name'),
			avatar: this.req.user.get('avatar')
		};

		let data = {
			user: user,
			message: this.request.body.message
		};

		yield capi.sendToRoom(parseInt(this.params.roomid), data);
	} catch (e) {
		console.error("can't send message to room", e)
		this.status = 500;
		this.body = "can't send message to room";
		return
	}

	this.status = 201;
	this.body = "ok";
}

export let getRoom = function*(){
	try {
		var room = yield Room.findOne({where: {id: this.params.roomid}})
	} catch(e) {
		console.error(e)
		this.status = 500;
		return
	}

	if (!room) {
		this.status = 404;
		this.body = "Room not found";
		return
	}

	this.status = 200;
	this.body = room.toJSON()
}