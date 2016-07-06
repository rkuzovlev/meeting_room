export let getUser = function(){
	this.status = 200;
	if (this.session){

	}
	this.body = {"id": parseInt(this.params.id), "username": "Ivan Ivanov"};
}

export let getCurrentUser = function(){
	if (this.session && this.session.passport && this.session.passport.user){
		this.status = 200;
		this.body = this.session.passport.user
	} else {
		this.status = 401;
		this.body = 'Unauthorized';
	}
}