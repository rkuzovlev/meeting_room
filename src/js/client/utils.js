export let checkResponseCode = function(response){
	if (!response.ok){
		throw new Error("Bad request '" + response.url + "'");
	}
	return response;
}