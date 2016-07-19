export let toJSON = function(){
	var v = this.get();

	delete v.created_at;
	delete v.updated_at;
	delete v.deleted_at;
	
	return v;
}