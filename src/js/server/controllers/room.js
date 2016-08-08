import * as capi  from '../centrifugo/api'
import sequelize from '../sequelize'
import * as kurento  from '../kurento'

const User = sequelize.models.user;
const Room = sequelize.models.room;

export let streamMessage = function*(){
	this.status = 200;

	try {
		yield kurento.message(this.req.user, this.params.roomid, this.request.body);
	} catch (e){
		console.error(e);
		this.status = 500;
	}
}

export let streamPermissions = function*(){
	this.status = 200;
	this.body = {
		"stream": true,
		"manage": false
	}
}

export let newMessage = function*(){
	this.assert(this.req.user, 401, 'Unauthorized');

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
		this.throw(500, "can't send message to room");
	}

	this.status = 201;
	this.body = "ok";
}

export let getRoom = function*(){
	try {
		var room = yield Room.findOne({where: {id: this.params.roomid}})
	} catch(e) {
		console.error(e)
		this.throw(500, "Can't get room");
	}

	if (!room) {
		this.status = 404;
		this.body = "Room not found";
		return
	}

	this.status = 200;
	this.body = room.toJSON()
}