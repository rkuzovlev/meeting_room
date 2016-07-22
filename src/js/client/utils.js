export let checkResponseCode = function(response){
	if (!response.ok){
		throw new Error("Bad request '" + response.url + "'");
	}
	return response;
}


export let genUID = function(len = 7){
	return Math.random().toString(36).substring(len);
}