export let getUser = function(){
	this.status = 200;
	this.body = {"id": parseInt(this.params.id), "username": "Ivan Ivanov"};
}