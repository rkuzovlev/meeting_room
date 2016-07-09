import sequelize from '../sequelize'

const User = sequelize.models.user;


export let getUser = function*(){
	this.status = 200;
	if (this.session){

	}
	this.body = {"id": parseInt(this.params.id), "username": "Ivan Ivanov"};
}


export let getCurrentUserRooms = function*(){
	if (this.req.user){
		this.status = 200;
		
		try {
			var rooms = yield this.req.user.getUserRooms();
		} catch (e) {
			console.log(e);
			this.throw(500, 'Something wrong');
		}

		this.body = rooms;
	} else {
		this.status = 401;
		this.body = 'Unauthorized';
	}
}


export let getCurrentUser = function*(){
	if (this.req.user){
		this.status = 200;
		this.body = this.req.user.toJSON();
	} else {
		this.status = 401;
		this.body = 'Unauthorized';
	}
}


export let putCurrentUser = function*(){
	if (!this.is('application/json')) {
		return
	}

	if (this.req.user){
		this.status = 200;
		try {
			yield User.updateUser(this.req.user.get('id'), this.request.body);
		} catch (e){
			console.error("Can't update user", e);

			this.status = 404;
			this.body = 'Something wrong!';
		}
	} else {
		this.status = 401;
		this.body = 'Unauthorized';
	}
}