import sequelize from '../sequelize'

const User = sequelize.models.user;


export let getUser = function*(){
	this.status = 200;
	if (this.session){

	}
	this.body = {"id": parseInt(this.params.id), "username": "Ivan Ivanov"};
}


export let getCurrentUserRooms = function*(){
	this.assert(this.req.user, 401, 'Unauthorized');
	
	try {
		var rooms = yield this.req.user.getUserRooms();
	} catch (e) {
		console.error(e);
		this.throw(500, "Can't get curent rooms");
	}

	this.status = 200;
	this.body = rooms;
}


export let getCurrentUser = function*(){
	this.assert(this.req.user, 401, 'Unauthorized');
	
	this.status = 200;
	this.body = this.req.user.toJSON();
}


export let putCurrentUser = function*(){
	if (!this.is('application/json')) {
		return
	}

	this.assert(this.req.user, 401, 'Unauthorized');

	this.status = 200;
	
	try {
		yield User.updateUser(this.req.user.get('id'), this.request.body);
	} catch (e){
		console.error("Can't update user", e);

		this.throw(500, "Can't update user");
	}
}