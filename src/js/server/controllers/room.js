import * as capi  from '../centrifugo/api'

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
	this.body = "test";

}