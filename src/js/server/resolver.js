class Resolver {
	constructor(){
		this._promises = []
	}

	resolve(promise) {
		this._promises.push(promise)
	}

	all(){
		return Promise.all(this._promises)
	}
}

export default Resolver